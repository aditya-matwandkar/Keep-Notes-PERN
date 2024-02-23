import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import SwipeDrawer from "./SwipeDrawer";
import Notes from "./notes/Notes";
import DeleteNotes from "./trash/deleteNotes";
import Archives from "./archive/Archives";
import OpenNote from "./note/Opennote";
import OpenArchive from "./note/OpenArchive";

function Home() {
  return (
    <Box style={{ display: "flex", width: "100%" }}>
      <BrowserRouter>
        <SwipeDrawer />
        <Routes>
          <Route path="/" element={<Notes />} />
          <Route path="/archives" element={<Archives />} />
          <Route path="/trash" element={<DeleteNotes />} />
          <Route path="/:note_id" element={<OpenNote />} />
          <Route path="/archives/:note_id" element={<OpenArchive />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default Home;
