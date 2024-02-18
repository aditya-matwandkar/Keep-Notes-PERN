import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import SwipeDrawer from "./SwipeDrawer";
import Notes from "./notes/Notes";
import DeleteNotes from "./trash/deleteNotes";
import Archives from "./archive/Archives";

function Home() {
  return (
    <Box style={{ display: "flex", width: "100%" }}>
      <BrowserRouter>
        <SwipeDrawer />
        <Routes>
          <Route path="/" element={<Notes />} />
          <Route path="/archives" element={<Archives />} />
          <Route path="/trash" element={<DeleteNotes />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default Home;
