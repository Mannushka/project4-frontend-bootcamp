import React from "react";
import { CircularProgress, CircularProgressLabel, Box } from "@chakra-ui/react";

const Spinner = () => {
  return (
    <Box
      justifyContent="center"
      alignItems="center"
      position="fixed"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      zIndex="9999"
    >
      <CircularProgress isIndeterminate color="purple.400" thickness="12px" />
    </Box>
  );
};

export default Spinner;
