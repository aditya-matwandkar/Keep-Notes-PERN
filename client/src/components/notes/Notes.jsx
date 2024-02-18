import React, { useContext, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Box, Grid } from "@mui/material";
import Form from "./Form";
import Note from "./Note";
import { DataContext } from "../../context/DataProvider";
import IfEmptyNotes from "../IfEmptyNotes";
import axios from "axios";

const DrawerHeader = styled("div")(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

function Notes() {
  const { notes, setNotes, archivedNotes, deletedNotes } =
    useContext(DataContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/");
        setNotes(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [setNotes, notes, archivedNotes, deletedNotes]);

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Box sx={{ p: 3, width: "100%" }}>
        <DrawerHeader />
        <Form />

        {loading ? (
          <p>Loading...</p>
        ) : notes.length > 0 ? (
          <Grid container sx={{ marginTop: "20px" }}>
            {notes.map((note) => (
              <Grid item key={note.note_id}>
                <Note note={note} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <IfEmptyNotes iconNum={0} text={"Notes you add appear here"} />
        )}
      </Box>
    </Box>
  );
}

export default Notes;
