import React from "react";
import Typography from "../Typography/Typography";

const TextChip = ({ text, backgroundColor }) => {
  const containerStyle = {
    backgroundColor: backgroundColor || "white",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignSelf: 'flex-start',
  };
  return (
      <Typography variant="xs-medium" style={containerStyle}>{text}</Typography>
  );
};

export default TextChip;
