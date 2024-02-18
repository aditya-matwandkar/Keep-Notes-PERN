import React, { useContext, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import { Box, TextField, ClickAwayListener, Button } from "@mui/material";
import { DataContext } from "../../context/DataProvider";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const BoxContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "600px",
  boxShadow:
    "0 1px 2px 0 rgba(60, 64, 67, 0.3), 0 2px 6px 2px rgba(60, 64, 67, 0.15)",
  padding: "10px 15px",
  borderColor: "#e0e0e0",
  borderRadius: "8px",
  minHeight: "30px",
  margin: "auto",
});

const note = {
  id: "",
  title: "",
  content: "",
};

function Form() {
  const [showTitleForm, setShowTitleForm] = useState(false);
  const adjustHeight = useRef();

  const { notes, setNotes } = useContext(DataContext);
  const [addNote, setAddNote] = useState({ ...note, id: uuidv4() });

  const handelTitleForm = () => {
    setShowTitleForm(true);
    adjustHeight.current.style.minHeight = "150px";
  };

  const handelClickAway = async () => {
    setShowTitleForm(false);
    adjustHeight.current.style.minHeight = "30px";

    // Check if either title or content is not empty
    if (addNote.title || addNote.content) {
      try {
        const response = await axios.post("http://localhost:3000/", {
          id: addNote.id,
          title: addNote.title,
          content: addNote.content,
        });
        // Update notes state with existing notes plus the newly added note
        setNotes([...notes, response.data]);
      } catch (error) {
        console.error("Error adding note:", error);
        toast.error("Error saving note", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: true,
          theme: "colored",
          transition: Slide,
        });
      }
    }

    // Reset addNote state to initial values
    setAddNote({ ...note, id: uuidv4(), title: "", content: "" });
  };

  const handelChange = (e) => {
    setAddNote({ ...addNote, [e.target.name]: e.target.value });
  };

  return (
    <ClickAwayListener onClickAway={handelClickAway}>
      <BoxContainer ref={adjustHeight}>
        {showTitleForm && (
          <TextField
            placeholder="Title"
            variant="standard"
            autoComplete="off"
            InputProps={{ disableUnderline: true }}
            style={{ marginBottom: "10px" }}
            onChange={(e) => handelChange(e)}
            name="title"
            value={addNote.title}
          />
        )}
        <TextField
          placeholder="Take a note..."
          variant="standard"
          InputProps={{ disableUnderline: true }}
          multiline
          maxRows={Infinity}
          onClick={handelTitleForm}
          onChange={(e) => handelChange(e)}
          name="content"
          value={addNote.content}
        />
        {showTitleForm && (
          <Button
            style={{
              width: "32px",
              marginTop: "auto",
              marginLeft: "auto",
              color: "#606060",
              fontSize: "14px",
            }}
            onClick={handelClickAway}
          >
            Add
          </Button>
        )}
      </BoxContainer>
    </ClickAwayListener>
  );
}

export default Form;
