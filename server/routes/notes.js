import express from "express";
import db from "../configDB.js";

const router = express.Router();

// Middleware to handle errors
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Route to get all notes
router.get("/", async (req, res, next) => {
  try {
    const response = await db.query("SELECT * FROM notes ORDER BY id DESC");
    res.json(response.rows);
  } catch (err) {
    next(err);
  }
});

// Route to create a new note
router.post("/", async (req, res, next) => {
  const { id, title, content } = req.body;
  try {
    await db.query(
      "INSERT INTO notes (id, note_id, title, content, date) VALUES ($1, $2, $3, $4, CURRENT_DATE)",
      [Date.now(), id, title, content]
    );
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

// Route to get a note by ID
router.get("/note/:id", async (req, res, next) => {
  const note_id = req.params.id;
  try {
    const response = await db.query("SELECT * FROM notes WHERE note_id = $1", [
      note_id,
    ]);
    res.json(response.rows);
  } catch (err) {
    next(err);
  }
});

// Route to get a note by ID
router.patch("/note/:id", async (req, res, next) => {
  const note_id = req.params.id;
  const { title, content } = req.body;
  try {
    await db.query(
      `
      UPDATE notes
      SET title = $1, content = $2
      WHERE note_id = $3
    `,
      [title, content, note_id]
    );
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

export default router;
