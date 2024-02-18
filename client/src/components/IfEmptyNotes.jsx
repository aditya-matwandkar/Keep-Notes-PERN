import React from "react";
import {
  ArchiveOutlined,
  DeleteOutlined,
  LightbulbOutlined,
} from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const iconStyle = {
  fontSize: "120px",
  color: "#F0F0F0",
};

const BulbIcon = styled(LightbulbOutlined)(iconStyle);

const ArchiveIcon = styled(ArchiveOutlined)(iconStyle);

const DeleteIcon = styled(DeleteOutlined)(iconStyle);

const iconList = [<BulbIcon />, <ArchiveIcon />, <DeleteIcon />];

const Text = styled(Typography)({
  fontSize: "20px",
  color: "#80868B",
});

const BoxContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "20vh",
});

function IfEmptyNotes({ iconNum, text }) {
  return (
    <BoxContainer>
      {iconList[iconNum]}
      <Text>{text}</Text>
    </BoxContainer>
  );
}

export default IfEmptyNotes;
