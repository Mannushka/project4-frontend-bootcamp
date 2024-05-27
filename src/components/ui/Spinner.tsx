import { CircularProgress, Box } from "@chakra-ui/react";

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
      backgroundColor="rgba(255, 255, 255, 0.8)"
    >
      <CircularProgress isIndeterminate color="#ff9a3c" thickness="12px" />
    </Box>
  );
};

export default Spinner;
