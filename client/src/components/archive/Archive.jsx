import React, { useContext, useState } from "react";
import { styled } from "@mui/material";
import { Card, CardActions, CardContent, Typography } from "@mui/material";
import { UnarchiveOutlined, DeleteOutlined } from "@mui/icons-material";
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

function Archive({ note }) {
  const { setNotes, archivedNotes, setArchivedNotes, setDeletedNotes } =
    useContext(DataContext);

  const [loading, setLoading] = useState(true);

  const unarchiveNote = async(note) => {
    try {
      const response = await axios.post("http://localhost:3000/archives/unarchive", {
        id: note.note_id,
      });
      setNotes(response.data);
      toast.success("Note unarchived", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: true,
        theme: "colored",
        transition: Slide,
      });
    } catch (err) {
      console.error("Error archiving data:", err);
      toast.error("Error unarchiving data", {
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

  const deleteNote = async(note) => {
    try {
      const response = await axios.post("http://localhost:3000/archives/trash", {
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
            style={{ fontFamily: "Open sans", whiteSpace: "pre-wrap" }}
          >
            {note.content}
          </Typography>
        </CardContent>
        <CardActions>
          <UnarchiveOutlined
            fontSize="small"
            style={{ marginLeft: "auto", cursor: "pointer" }}
            onClick={() => unarchiveNote(note)}
          />
          <DeleteOutlined
            fontSize="small"
            style={{ cursor: "pointer" }}
            onClick={() => deleteNote(note)}
          />
        </CardActions>
      </StyledCard>
    </>
  );
}

export default Archive;
