import React, { useContext, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Box, Grid } from "@mui/material";
import { DataContext } from "../../context/DataProvider";
import DeleteNote from "./DeleteNote";
import IfEmptyNotes from "../IfEmptyNotes";
import axios from "axios";

const DrawerHeader = styled("div")(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

function DeleteNotes() {
  const { notes, archivedNotes, deletedNotes, setDeletedNotes } =
    useContext(DataContext);
  const [loading, setLoading] = useState(true);

  // Fetech data from trash table
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/trash");
        setDeletedNotes(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [notes, archivedNotes]);

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Box sx={{ p: 3, width: "100%" }}>
        <DrawerHeader />

        {deletedNotes.length > 0 ? (
          <Grid container sx={{ marginTop: "20px" }}>
            {deletedNotes.map((note) => (
              <Grid item key={note.id}>
                <DeleteNote note={note} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <IfEmptyNotes iconNum={2} text={"No notes in Trash"} />
        )}
      </Box>
    </Box>
  );
}

export default DeleteNotes;
