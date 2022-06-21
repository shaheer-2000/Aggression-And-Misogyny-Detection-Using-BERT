import { Link as ReachLink } from "react-router-dom";
import { Link, Box, Flex } from "@chakra-ui/react";

export default function NavBar() {
  return (
    <Flex
      color="white"
      bg="purple.500"
      justifyContent={"space-between"}
      py={3}
      px={10}
    >
      <Box flex="1">
        <Flex gap={5} justifyContent={"flex-end"}>
          {/* add routing */}
          <Link as={ReachLink} to="/" fontSize={"xl"}>
            Home
          </Link>
          <Link as={ReachLink} to="/methodology" fontSize={"xl"}>
            Methodology
          </Link>
        </Flex>
      </Box>
    </Flex>
  );
}
