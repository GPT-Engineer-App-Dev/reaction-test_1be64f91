import { Box, Button, Center, Text, VStack, useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { FaRedo } from "react-icons/fa";

const Index = () => {
  const [status, setStatus] = useState("waiting"); // 'waiting', 'ready', 'clicked'
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [reactionTime, setReactionTime] = useState(null);
  const toast = useToast();

  useEffect(() => {
    if (status === "ready") {
      const timer = setTimeout(
        () => {
          setStatus("clicked");
          setStartTime(Date.now());
        },
        Math.floor(Math.random() * 2000) + 1000,
      ); // Random time between 1-3 seconds
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleButtonClick = () => {
    if (status === "waiting") {
      setStatus("ready");
      toast({
        title: "Get ready!",
        description: "Wait for the color to change, then click as fast as you can!",
        status: "info",
        duration: 2000,
        isClosable: true,
      });
    } else if (status === "ready") {
      toast({
        title: "Too soon!",
        description: "You clicked too soon! Wait for the color to change next time.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setStatus("waiting");
    } else if (status === "clicked") {
      setEndTime(Date.now());
      const reaction = Date.now() - startTime;
      setReactionTime(reaction);
      setStatus("waiting");
      toast({
        title: "Good job!",
        description: `Your reaction time is ${reaction} ms`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleReset = () => {
    setStatus("waiting");
    setReactionTime(null);
  };

  return (
    <Center height="100vh">
      <VStack spacing={8}>
        <Box width="300px" height="300px" bg={status === "ready" ? "red.500" : "green.500"} borderRadius="md" display="flex" alignItems="center" justifyContent="center">
          <Button colorScheme="whiteAlpha" onClick={handleButtonClick}>
            {status === "waiting" ? "Click to start" : "Click!"}
          </Button>
        </Box>
        {reactionTime !== null && <Text fontSize="xl">Reaction Time: {reactionTime} ms</Text>}
        <Button leftIcon={<FaRedo />} colorScheme="teal" variant="outline" onClick={handleReset}>
          Reset
        </Button>
      </VStack>
    </Center>
  );
};

export default Index;
