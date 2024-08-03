import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack } from '@chakra-ui/react';
import React, { useState } from 'react'
import { useProductStore } from '../store/product';

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name:"",
    price:"",
    image:"",
  });

  const {createProduct} = useProductStore();
  const toast = useToast();

  const handleAddProduct = async () => {
    const {success, msg} = await createProduct(newProduct);
    if(!success){
      toast({
        "title": "Error",
        description: msg,
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    } else{
      toast({
        "title": "Success",
        description: msg,
        status: "success",
        duration: 3000,
        isClosable: true,
      })
    }
    // after create => reset state
    setNewProduct({name:"",  price:"",  image:"",})
  }
  return <Container maxW={"container.sm"}>
    <VStack spacing={8}>
      <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
        Create new Product
      </Heading>
      
      <Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
        <VStack spacing={4}>
          <Input placeholder='Product Name' name='name' value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}/>
          
          <Input placeholder='Product price' price='price' value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}/>

          <Input placeholder='Product image' image='image' value={newProduct.image} onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}/>

          <Button colorScheme='blue' onClick={handleAddProduct} w={'full'}>
            Add Product
          </Button>
         
        </VStack>
      </Box>
    </VStack> 
  </Container>
    
  
}

export default CreatePage