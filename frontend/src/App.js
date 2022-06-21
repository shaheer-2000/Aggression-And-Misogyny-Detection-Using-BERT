import { 
  Box,
  Center,
  Flex,
  Spacer,
  Text,
  Heading,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Link,
  UnorderedList,
  ListItem
} from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import NavBar from './components/NavBar';

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [results, setResults] = useState([]);
  const [isFetchingLabels, setIsFetchingLabels] = useState(false);
  const [text, setText] = useState("");
  const [fetchError, setFetchError] = useState(false);
  const labelMap = {
    "NAG": "Not Aggressive",
    "CAG": "Covertly Aggressive",
    "OAG": "Overtly Aggressive",
    "NGEN": "Non-Gendered",
    "GEN": "Gendered"
  };
  const colorMap = {
    "NAG": "green.300",
    "CAG": "orange.300",
    "OAG": "red.300",
    "NGEN": "green.300",
    "GEN": "red.300"
  };

  const fetchLabels = async () => {
    try {
      setIsFetchingLabels(true);
      const res = await axios.post("/api", { text });
      setResults([res.data.label_A, res.data.label_B]);
    } catch (e) {
      setFetchError(true);
    }

    setIsFetchingLabels(false);
    onOpen();
  };

  const updateText = (e) => {
    setText(e.target.value);
  };

  const closeModal = () => {
    setFetchError(false);
    setResults([]);
    setText("");
    onClose();
  };

  const isError = text === "";

  return (
    <Box style={{ width: "100vw", height: "100vh" }}>
      <NavBar />
      <Center style={{ width: "100vw", height: "85vh" }}>
        <Flex flexDir="column" justifyContent="center" alignItems="center" style={{ width: "60vw" }}>
          <Heading as="h1" size="xl" mb={10}>Aggression {'&'} Misogyny Detection Using BERT</Heading>
          <Spacer />
          { /* Form Here */ }
          <FormControl isRequired>
            <FormLabel htmlFor="text">Text</FormLabel>
            <Input id="text" type="text" placeholder="I am a feminist!" width="full" size="lg" variant="filled" value={text} onChange={updateText} />
            <FormHelperText>Enter the text you want to classify.</FormHelperText>
          </FormControl>
          <Button mt={5} colorScheme="purple" isLoading={isFetchingLabels} onClick={fetchLabels} disabled={isError} size="lg">Submit</Button>
          <Spacer />
          { /* Authors Here */ }
          <Flex flexDir="column">
            <Text mt={20} fontSize="lg">The project repository is available at&nbsp;
              <Link href="https://github.com/shaheer-2000/Aggression-And-Misogyny-Detection-Using-BERT" isExternal>
                https://github.com/shaheer-2000/Aggression-And-Misogyny-Detection-Using-BERT <ExternalLinkIcon mx="2px" />
              </Link>.
            </Text>
            <Text mt={5} fontSize="lg">
              To learn more about the authors, check out our GitHub profiles:
            </Text>
            <UnorderedList>
              <ListItem>
                <Text fontSize="md">
                  <Link href="https://github.com/shaheer-2000" isExternal>
                      Shaheer Ahmed (19K-0233) <ExternalLinkIcon mx="2px" />
                  </Link>
                </Text>
              </ListItem>
              <ListItem>
                <Text fontSize="md">
                  <Link href="https://github.com/Noman-Vadsariya" isExternal>
                    Noman Vadsariya (19K-1432) <ExternalLinkIcon mx="2px" />
                  </Link>
                </Text>
              </ListItem>
            </UnorderedList>
          </Flex>
        </Flex>
      </Center>
      {/* <Spacer /> */}
      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Classification Results</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center>
              { fetchError ? <Text>Unable to fetch classification results, 400 encountered</Text> : (
                <TableContainer>
                  <Table>
                    <Thead>
                      <Tr>
                        <Th>Aggressive Label</Th>
                        <Th>Misogynist Label</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        { results && results.map((result, i) => <Td backgroundColor={colorMap[result]} key={i}>{labelMap[result]}</Td>) }
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
              ) }
            </Center>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="purple" mr={3} onClick={closeModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default App;
