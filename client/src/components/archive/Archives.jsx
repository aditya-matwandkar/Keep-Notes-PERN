import React, { useContext, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Box, Grid } from "@mui/material";
import { DataContext } from "../../context/DataProvider";
import Archive from "./Archive";
import IfEmptyNotes from "../IfEmptyNotes";
import axios from "axios";

const DrawerHeader = styled("div")(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

function Archives() {
  const { notes, archivedNotes, setArchivedNotes, deletedNotes } =
    useContext(DataContext);
  const [Loading, setLoading] = useState(true);

  // Fetch the data from archives table
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/archives");
        setArchivedNotes(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [notes, deletedNotes]);

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Box sx={{ p: 3, width: "100%" }}>
        <DrawerHeader />

        {archivedNotes.length > 0 ? (
          <Grid container sx={{ marginTop: "20px" }}>
            {archivedNotes.map((note) => (
              <Grid item key={note.note_id}>
                <Archive note={note} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <IfEmptyNotes iconNum={1} text={"Your archived notes appear here"} />
        )}
      </Box>
    </Box>
  );
}

export default Archives;
