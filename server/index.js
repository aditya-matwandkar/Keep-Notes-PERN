import express from "express";
import cors from "cors";

const app = express();
const port = 3000;

import notesRoute from "./routes/notes.js";
import archivesRoute from "./routes/archives.js";
import trashRoute from "./routes/trash.js";

app.use(express.json());
app.use(cors());

app.use("/", notesRoute);
app.use("/archives", archivesRoute);
app.use("/trash", trashRoute);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
