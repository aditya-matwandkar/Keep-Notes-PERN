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
    const response = await db.query("SELECT * FROM trash ORDER BY id DESC");
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
    const trashedNotes = deleteResponse.rows[0];
    const insertResponse = await db.query(
      "INSERT INTO trash (id, note_id, title, content, date) VALUES ($1, $2, $3, $4, $5)",
      [
        trashedNotes.id,
        trashedNotes.note_id,
        trashedNotes.title,
        trashedNotes.content,
        trashedNotes.date,
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

// Route to restore a note
router.post("/restore", async (req, res, next) => {
  const { id } = req.body;
  try {
    // Begin transaction
    await db.query("BEGIN");

    // Delete note from archives table
    const deleteResponse = await db.query(
      "DELETE FROM trash WHERE note_id=$1 RETURNING *",
      [id]
    );

    // Insert into notes table
    const restoredNote = deleteResponse.rows[0];
    const insertResponse = await db.query(
      "INSERT INTO notes (id, note_id, title, content, date) VALUES ($1, $2, $3, $4, $5)",
      [
        restoredNote.id,
        restoredNote.note_id,
        restoredNote.title,
        restoredNote.content,
        restoredNote.date,
      ]
    );

    // Commit transaction
    await db.query("COMMIT");

    // Get data from notes table and send to client
    const notesDB = await db.query("SELECT * FROM notes ORDER BY id DESC");
    res.json(notesDB.rows);
  } catch (err) {
    // Rollback transaction if error occurs
    await db.query("ROLLBACK");
    next(err);
  }
});

// Route to permanently delete a note
router.delete("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    // Begin transaction
    await db.query("BEGIN");

    // Delete note from archives table
    const deleteResponse = await db.query(
      "DELETE FROM trash WHERE note_id=$1",
      [id]
    );

    // Commit transaction
    await db.query("COMMIT");

    // Get data from notes table and send to client
    const trashDB = await db.query("SELECT * FROM trash ORDER BY id DESC");
    res.json(trashDB.rows);
  } catch (err) {
    // Rollback transaction if error occurs
    await db.query("ROLLBACK");
    next(err);
  }
});

export default router;
