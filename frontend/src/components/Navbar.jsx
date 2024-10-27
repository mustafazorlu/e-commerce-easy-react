import {
    Button,
    Container,
    Flex,
    HStack,
    Text,
    useColorMode,
    useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    
    return (
        <Container
            maxW={"1140"}
            px={4}
            bg={useColorModeValue("gray.100", "gray.900")}
        >
            <Flex
                h={16}
                alignItems={"center"}
                justifyContent={"space-between"}
                flexDir={{
                    base: "column",
                    sm: "row",
                }}
            >
                <Text
                    fontSize={{
                        base: "22",
                        sm: "28",
                    }}
                    fontWeight={"bold"}
                    textTransform={"uppercase"}
                    textAlign={"center"}
                    bgGradient={"linear(to-r, cyan.400, blue.500)"}
                    bgClip={"text"}
                >
                    <Link to={"/"}>Product Store </Link>
                </Text>

                <HStack spacing={2} alignItems={"center"}>
                    <Link to={"/create"}>
                        <Button>+</Button>
                    </Link>
                    <Link to={"/create"}>
                        <Button onClick={toggleColorMode}>
                            {colorMode === "light" ? "Siyah" : "Beyaz"}
                        </Button>
                    </Link>
                </HStack>
            </Flex>
        </Container>
    );
};

export default Navbar;
