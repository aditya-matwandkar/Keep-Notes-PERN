import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material";
import { Card, Button, TextField, CardActions } from "@mui/material";
import "./openNote.css";
import axios from "axios";
import { DataContext } from "../../context/DataProvider";
import { Slide, toast } from "react-toastify";

const StyledCard = styled(Card)({
  display: "flex",
  flexDirection: "column",
  width: "600px",
  boxShadow:
    "0 1px 2px 0 rgba(60, 64, 67, 0.3), 0 2px 6px 2px rgba(60, 64, 67, 0.15)",
  border: "1px solid #e0e0e0",
  padding: "10px 15px",
  borderColor: "#e0e0e0",
  borderRadius: "8px",
  minHeight: "30px",
  margin: "auto",
  marginTop: "100px",
  maxHeight: "560px",
});

function OpenArchive() {
  const { note_id } = useParams();

  const { archivedNotes, setArchivedNotes } = useContext(DataContext);

  const [editArchive, setEditArchive] = useState({
    id: "",
    note_id: "",
    date: "",
    title: "",
    content: "",
  });

  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/archives/${note_id}`
        );
        setEditArchive(response.data[0]);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setEditArchive({ ...editArchive, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/archives/${note_id}`,
        {
          title: editArchive.title,
          content: editArchive.content,
        }
      );
      setArchivedNotes([...archivedNotes, response.data]);
      toast.success("Note updated", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: true,
        theme: "colored",
        transition: Slide,
      });
    } catch (err) {
      console.log("Error updating note: " + err);
      toast.error("Error updating note", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: true,
        theme: "colored",
        transition: Slide,
      });
    }
  };

  return (
    <>
      <StyledCard>
        <TextField
          style={{
            marginBottom: "16px",
          }}
          InputProps={{
            style: {
              fontSize: "1.6rem",
              fontFamily: "Open sans",
            },
            disableUnderline: true,
          }}
          placeholder="Title"
          autoComplete="false"
          name="title"
          value={editArchive.title}
          variant="standard"
          onChange={handleChange}
        />
        <TextField
          className="updateTextField"
          style={{
            fontFamily: "Open sans",
            whiteSpace: "pre-wrap",
            overflow: "auto",
            overflowY: "auto",
          }}
          InputProps={{
            disableUnderline: true,
          }}
          autoComplete="false"
          name="content"
          value={editArchive.content}
          variant="standard"
          multiline
          maxRows={Infinity}
          onChange={handleChange}
        />
        <Link to={"/archives"} style={{ alignSelf: "flex-end", justifySelf: "end" }}>
          <Button
            style={{
              width: "38px",
              color: "#606060",
              fontSize: "14px",
            }}
            onClick={handleUpdate}
          >
            Update
          </Button>
        </Link>
      </StyledCard>
    </>
  );
}

export default OpenArchive;
