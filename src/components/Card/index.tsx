import {
  Card,
  CardBody,
  Text,
  Stack,
  Divider,
  Button,
  Image,
  Icon,
  Box,
  HStack,
  Center,
} from "@chakra-ui/react";
// import axios from "axios";
import React from "react";
import { FiInfo, FiPlus } from "react-icons/fi";

export default function ProductCard(iteminfo: any) {
  // const config = {
  //   headers: {
  //     Authorization: `Bearer sk_test_51JHlAFIlhbmBVpcG5shct1N96HfgNOPPd3ph1hGgmXMiT1gAlRiYotmOdvbTRZe4g87nJrNKi4svBN2oiVNKkjZf00OrcbAMep`,
  //   },
  // };

  // axios
  //   .get(
  //     `https://api.stripe.com/v1/products/${iteminfo.iteminfo.stripe_product_key}`,
  //     config
  //   )
  //   .then((res) => {
  //     console.log("stripe get");
  //     console.log(res.data);
  //   })
  //   .catch(console.log);

  console.log("these bits");
  console.log(iteminfo);
  console.log(iteminfo.iteminfo.id);
  console.log(iteminfo.iteminfo);
  console.log(iteminfo.cart_id);
  return (
    <Box
      width={"100%"}
      // align="center"
      p="4"
      mx="4"
      borderRadius="lg"
      role="group"
      cursor="pointer"
    >
      <Card
        maxH="500px"
        minH="300px"
        minW="300px"
        backgroundColor={"green.200"}
      >
        <>
          <Center p={2}>
            <Image
              objectFit="cover"
              src={iteminfo.iteminfo.image_url}
              alt="No product image."
              borderRadius="lg"
              minH={"200px"}
              maxW={"80%"}
            />
          </Center>
          <CardBody>
            <Center>
              <Box alignItems={"center"} textAlign={"center"}></Box>
              <Stack mt="1" spacing="1" textAlign={"center"}>
                <Text>{iteminfo.iteminfo.artist}</Text>
                <Text>{iteminfo.iteminfo.title}</Text>
                <Text>${iteminfo.iteminfo.price}</Text>
              </Stack>
            </Center>
          </CardBody>
        </>
        <Divider />
        <Center padding={2}>
          <HStack>
            <Button
              onClick={
                () =>
                  iteminfo.handler(
                    iteminfo.iteminfo.id,
                    iteminfo.cart_id,
                    false
                  )
                // handler()
              }
              variant="solid"
              colorScheme="blue"
            >
              <Icon
                _groupHover={{
                  color: "white",
                }}
                as={FiPlus}
              />
            </Button>
            <Button variant="solid" colorScheme="blue">
              <Icon
                _groupHover={{
                  color: "white",
                }}
                as={FiInfo}
              />
            </Button>
          </HStack>
        </Center>
      </Card>
    </Box>
  );
}
