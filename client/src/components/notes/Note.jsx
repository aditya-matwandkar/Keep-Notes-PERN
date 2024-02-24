import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material";
import { Card, CardActions, CardContent, Typography } from "@mui/material";
import { ArchiveOutlined, DeleteOutlined } from "@mui/icons-material";
import { DataContext } from "../../context/DataProvider";
import { Slide, toast } from "react-toastify";
import axios from "axios";

const StyledCard = styled(Card)`
  width: 280px;
  margin: 8px;
  box-shadow: none;
  border: 1px solid #e0e0e0;
  border-radius: 8px;

  &:hover {
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  }
`;

function Note({ note }) {
  const { setArchivedNotes, setDeletedNotes } = useContext(DataContext);
  const [loading, setLoading] = useState(true);

  // Function to archive the note
  const archiveNote = async (note) => {
    try {
      const response = await axios.post("http://localhost:3000/archives", {
        id: note.note_id,
      });
      setArchivedNotes(response.data);
      toast.success("Note archived", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: true,
        theme: "colored",
        transition: Slide,
      });
    } catch (err) {
      console.error("Error archiving data:", err);
      toast.error("Error archiving data", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: true,
        theme: "colored",
        transition: Slide,
      });
    } finally {
      setLoading(false);
    }
  };

  // Function to move note in trash
  const deleteNote = async (note) => {
    try {
      const response = await axios.post("http://localhost:3000/trash", {
        id: note.note_id,
      });
      setDeletedNotes(response.data);
      toast.info("Note deleted", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: true,
        theme: "colored",
        transition: Slide,
      });
    } catch (err) {
      console.error("Error deleting data:", err);
      toast.error("Error deleting note", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: true,
        theme: "colored",
        transition: Slide,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <StyledCard>
        <Link
          to={"/" + note.note_id}
          style={{
            textDecoration: "none",
            color: "inherit",
            cursor: "default",
          }}
        >
          <CardContent>
            <Typography
              style={{
                fontSize: "1.5rem",
                marginBottom: "16px",
                fontFamily: "Open sans",
                marginTop: "-8px",
              }}
            >
              {note.title}
            </Typography>
            <Typography
              style={{
                fontFamily: "Open sans",
                whiteSpace: "pre-wrap",
                maxHeight: "380px",
                overflow: "hidden",
              }}
            >
              {note.content}
            </Typography>
          </CardContent>
        </Link>
        <CardActions>
          <ArchiveOutlined
            titleAccess="Archive"
            fontSize="small"
            style={{ marginLeft: "auto", cursor: "pointer" }}
            onClick={() => archiveNote(note)}
          />
          <DeleteOutlined
            titleAccess="Move to trash"
            fontSize="small"
            style={{ cursor: "pointer" }}
            onClick={() => deleteNote(note)}
          />
        </CardActions>
      </StyledCard>
    </>
  );
}

export default Note;
