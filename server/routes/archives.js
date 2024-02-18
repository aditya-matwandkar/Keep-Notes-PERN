import express from "express";
import db from "../configDB.js";

const router = express.Router();

// Middleware to handle errors
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Route to get all archives
router.get("/", async (req, res) => {
  try {
    const response = await db.query("SELECT * FROM archives ORDER BY id DESC");
    res.json(response.rows);
  } catch (err) {
    next(err);
  }
});

// Route to archive a note
router.post("/", async (req, res, next) => {
  const { id } = req.body;
  try {
    // Begin transaction
    await db.query("BEGIN");

    // Delete note from notes table
    const deleteResponse = await db.query(
      "DELETE FROM notes WHERE note_id=$1 RETURNING *",
      [id]
    );

    // Insert into archives table
    const archivedNote = deleteResponse.rows[0];
    const insertResponse = await db.query(
      "INSERT INTO archives (id ,note_id, title, content, date) VALUES ($1, $2, $3, $4, $5)",
      [
        archivedNote.id,
        archivedNote.note_id,
        archivedNote.title,
        archivedNote.content,
        archivedNote.date,
      ]
    );

    // Commit transaction
    await db.query("COMMIT");

    res.redirect("/");
  } catch (err) {
    // Rollback transaction if error occurs
    await db.query("ROLLBACK");
    next(err);
  }
});

// Route to unarchive a note
router.post("/unarchive", async (req, res, next) => {
  const { id } = req.body;
  try {
    // Begin transaction
    await db.query("BEGIN");

    // Delete note from archives table
    const deleteResponse = await db.query(
      "DELETE FROM archives WHERE note_id=$1 RETURNING *",
      [id]
    );

    // Insert into notes table
    const unarchivedNote = deleteResponse.rows[0];
    const insertResponse = await db.query(
      "INSERT INTO notes (id, note_id, title, content, date) VALUES ($1, $2, $3, $4, $5)",
      [
        unarchivedNote.id,
        unarchivedNote.note_id,
        unarchivedNote.title,
        unarchivedNote.content,
        unarchivedNote.date,
      ]
    );

    // Commit transaction
    await db.query("COMMIT");

    res.redirect("/");
  } catch (err) {
    // Rollback transaction if error occurs
    await db.query("ROLLBACK");
    next(err);
  }
});

// Route to delete a note from archives
router.post("/trash", async (req, res, next) => {
  const { id } = req.body;
  try {
    // Begin transaction
    await db.query("BEGIN");

    // Delete note from archives table
    const deleteResponse = await db.query(
      "DELETE FROM archives WHERE note_id=$1 RETURNING *",
      [id]
    );

    // Insert into notes table
    const deletedNote = deleteResponse.rows[0];
    const insertResponse = await db.query(
      "INSERT INTO trash (id, note_id, title, content, date) VALUES ($1, $2, $3, $4, $5)",
      [
        deletedNote.id,
        deletedNote.note_id,
        deletedNote.title,
        deletedNote.content,
        deletedNote.date,
      ]
    );

    // Commit transaction
    await db.query("COMMIT");

    // Get data from trash table and send to client
    const trashDB = await db.query("SELECT * FROM trash ORDER BY id DESC");
    res.json(trashDB.rows);
  } catch (err) {
    // Rollback transaction if error occurs
    await db.query("ROLLBACK");
    next(err);
  }
});

export default router;
