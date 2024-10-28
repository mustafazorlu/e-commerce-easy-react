/* eslint-disable react/prop-types */
import {
    Box,
    Button,
    Heading,
    HStack,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useColorModeValue,
    useDisclosure,
    useToast,
    VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useProductStore } from "../store/product";

const ProductCard = ({ product }) => {
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");
    const [updatedProduct, setUpdatedProduct] = useState(product);
    const { deleteProduct, updateProduct } = useProductStore();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const handleDeleteProduct = async (pid) => {
        const { success, message } = await deleteProduct(pid);
        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 1000,
                isClosable: true,
            });
        } else {
            toast({
                title: "Deleted",
                description: message,
                status: "success",
                duration: 1000,
                isClosable: true,
            });
        }
    };
    const handleUpdateProduct = async (pid, updatedProduct) => {
        const { success, message } = await updateProduct(pid, updatedProduct);

        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 1000,
                isClosable: true,
            });
        } else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                duration: 1000,
                isClosable: true,
            });
        }
        onclose();
    };
    return (
        <Box
            shadow={"lg"}
            rounded={"lg"}
            overflow={"hidden"}
            transition={"all 0.3s"}
            _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
            bg={bg}
        >
            <Image
                src={product.image}
                alt={product.name}
                h={48}
                w={"full"}
                objectFit={"cover"}
            />

            <Box p={4}>
                <Heading as="h3" size="md" mb={2}>
                    {product.name}
                </Heading>

                <Text
                    fontWeight={"bold"}
                    fontSize={"xl"}
                    color={textColor}
                    mb={4}
                >
                    {product.price}
                </Text>
                <HStack spacing={2}>
                    <Button onClick={onOpen}>Edit</Button>
                    <Button onClick={() => handleDeleteProduct(product._id)}>
                        Delete
                    </Button>
                </HStack>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input
                                placeholder="product name"
                                name="name"
                                value={updatedProduct.name}
                                onChange={(e) =>
                                    setUpdatedProduct({
                                        ...updateProduct,
                                        name: e.target.value,
                                    })
                                }
                            />
                            <Input
                                placeholder="price"
                                name="price"
                                type="number"
                                value={updatedProduct.price}
                                onChange={(e) =>
                                    setUpdatedProduct({
                                        ...updateProduct,
                                        price: e.target.value,
                                    })
                                }
                            />
                            <Input
                                placeholder="price"
                                name="price"
                                type="text"
                                value={updatedProduct.image}
                                onChange={(e) =>
                                    setUpdatedProduct({
                                        ...updateProduct,
                                        image: e.target.value,
                                    })
                                }
                            />

                            <Button
                                colorScheme="blue"
                                onClick={() =>
                                    handleUpdateProduct(
                                        product._id,
                                        updatedProduct
                                    )
                                }
                                w="full"
                            >
                                Edit Product
                            </Button>
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant="ghost">Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
    //1.44.30
};

export default ProductCard;
