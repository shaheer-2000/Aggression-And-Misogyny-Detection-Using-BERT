import React from "react";
import NavBar from "../components/NavBar";
import heatmap_A from "../assets/heatmap_A.png";
import heatmap_B from "../assets/heatmap_B.png";
import { Grid, Heading, Text, GridItem, Stack } from "@chakra-ui/react";

export default function Methodology() {
  return (
    <div>
      <NavBar />
      <Heading as="h1" marginTop={5} marginLeft={5} textDecoration="underline">
        Bert-based Aggression {"&"} Misogyny Detector
      </Heading>
      <Grid
        templateColumns={"2fr 1fr"}
        marginLeft={5}
        marginRight={5}
        marginBottom={5}
      >
        <GridItem>
          <Stack spacing={5}>
            <Heading as="h3" size="md" textAlign={"left"} marginTop={2}>
              Aggression Classification (Sub-Task A)
            </Heading>
            <Heading as="h5" size="sm">
              Handling Data Imbalance
            </Heading>
            <Text>
              Oversampling the samples of OAG and CAG classes for aggression
              detection and under sampling NAG class samples.
            </Text>
            <Heading as="h3" size="md" textAlign={"left"} marginTop={2}>
              Misogyny Classification (Sub-Task B)
            </Heading>
            <Heading as="h5" size="sm">
              Handling Data Imbalance
            </Heading>
            <Text>Oversampling GEN class samples for misogyny detection.</Text>
          </Stack>
        </GridItem>
        <GridItem>
          <img src={heatmap_A} width={500} height={500} alt="heatmap_A" />
        </GridItem>
        <GridItem>
          <Stack spacing={5}>
            <Heading as="h1" size="lg">
              Model Architecture
            </Heading>
            <Text>The proposed model consists of multiple modules:</Text>
            <Heading as="h2" size="sm">
              BERT Layer
            </Heading>
            <Text>
              Input sequence (of tokens) is passed to the BERT model to extract
              contextualized information.
            </Text>
            <Heading as="h2" size="sm">
              Attention Layer
            </Heading>
            <Text>
              The output of the BERT layer is received as input to the
              “Attention Mechanism”
            </Text>
            <Heading as="h2" size="sm">
              Fully-Connected Layer
            </Heading>
            <Text>
              We pass the output of the attention layer to Fully Connected
              (linear) layers for dimension reduction. There are two linear
              layers with 32 and 16 neurons, respectively.
            </Text>
            <Heading as="h2" size="sm">
              Classification Layer
            </Heading>
            <Text>
              We feed the output of linear layers to two separate classification
              layers, one for predicting aggression class, and another for
              misogyny identification. For both cases, we use a linear layer
              with a softmax activation on top, which gives a probability score
              to the classes. The number of output neurons is three and two for
              sub-tasks A and B, respectively.
            </Text>
            <Heading as="h1" size="lg">
              Results
            </Heading>
            <Text>
              This project's evaluation metric is the weighted F1 score.
              Misogyny is easier to detect in English tweets corpus than
              violence, according to f1-score results. One probable explanation
              is that it is binary and uncomplicated in comparison to sub-task
              A, which has three classes. The best overall f1 score achieved for
              the Aggression Detection Task is close to 70, while the greatest
              overall f1-score achieved for the Misogyny Detection Task is 80.
            </Text>
          </Stack>
        </GridItem>
        <GridItem>
          <img src={heatmap_B} width={500} height={500} alt="heatmap_B" />
        </GridItem>
      </Grid>
    </div>
  );
}
