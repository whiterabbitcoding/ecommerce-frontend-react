import { useRouter } from "next/router";
import * as React from "react";
import {
  ChakraProvider,
  Grid,
  theme,
  Divider,
  Image,
  GridItem,
  Center,
  SimpleGrid,
  Container,
} from "@chakra-ui/react";
import Card from "../components/Card";
import { useEffect } from "react";
import axios from "axios";
import { addOrRemoveItemFromCart } from "../functions";

const { NEXT_PUBLIC_BACKEND_URI } = process.env;

function getItems() {
  console.log(NEXT_PUBLIC_BACKEND_URI);
  return axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/items/`);
}

export default function PostPage() {
  const [outitems, setItems] = React.useState([]);

  const { push } = useRouter();
  const cart_id = null;

  console.log("We're in Next");
  console.log(process.env.NEXT_PUBLIC_BACKEND_URI);
  console.log(process.env.NEXT_PUBLIC_BACKEND_URI);

  console.log("cid");
  console.log(cart_id);
  function UpdateItemInCart(item_id: any, cart_id: any, remove: any) {
    console.log("item_idddd");
    console.log(item_id);
    console.log("handle click");
    console.log(cart_id);

    addOrRemoveItemFromCart(item_id, cart_id, remove).then((res) => {
      push(`/cart/${res.data[0].cart_id}`);
    });
  }

  useEffect(() => {
    getItems().then((res: any) => {
      let output = res.data;
      setItems(output);
    });
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <>
        <Grid
          templateColumns="repeat(5, 1fr)"
          gap="1"
          color="blackAlpha.700"
          fontWeight="bold"
        >
          {/* header */}
          <GridItem pl="2" bg="orange.300" colSpan={5}>
            <Center>
              <Image
                src="/uk-lofi-logo-5.png"
                maxW="250px"
                padding={"2"}
                alt="something"
              />
            </Center>
          </GridItem>
          {/* cart */}
          <GridItem pl={2} bg="green.300" colSpan={1}>
            <Center>
              <h2>
                <b>Cart</b>
              </h2>
            </Center>
            <Container>
              Total: $0
              <Divider />
              You have no items in your cart yet.
            </Container>
          </GridItem>
          {/* products */}
          <GridItem colSpan={4} bg="blue.300">
            <SimpleGrid columns={3} spacing="30px" minChildWidth="300px">
              {outitems.map((product: any) => (
                <Card
                  key={product.id}
                  iteminfo={product}
                  cart_id={cart_id}
                  handler={UpdateItemInCart}
                />
              ))}
            </SimpleGrid>
            {/* footer */}
            <GridItem colSpan={3} bg="red.300" minH={"10vh"}></GridItem>
          </GridItem>
        </Grid>
      </>
    </ChakraProvider>
  );
}
