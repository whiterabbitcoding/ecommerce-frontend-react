import { useRouter } from "next/router";
import * as React from "react";
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
  Button,
  Divider,
  Image,
  HStack,
  GridItem,
  Center,
  SimpleGrid,
  Container,
  Icon,
} from "@chakra-ui/react";
import Card from "../../../components/Card";
import { useCallback, useEffect } from "react";
import axios from "axios";
import { FiMinus, FiPlus } from "react-icons/fi";
import { addOrRemoveItemFromCart } from "../../../functions";

function getItem(id: any) {
  return axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/item/${id}`);
}

function getItems() {
  return axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/items/`);
}

export default function PostPage() {
  const router = useRouter();
  const cart_id = router.query.cid as string;

  console.log("cid");
  console.log(cart_id);
  // const cart_id = cid;

  const [cart, setCart] = React.useState([]);
  const [outitems, setItems] = React.useState([]);
  function handleClick(item_id: any, cart_id: any, remove: any) {
    console.log("handling");
    addOrRemoveItemFromCart(item_id, cart_id, remove).then((res) => {
      console.log("result after add product");
      console.log(res);
      getCartCall(cart_id);
      return "ok";
    });
  }

  async function getItemInfoForCart(cart: any) {
    console.log("carter");
    console.log(cart);
    const withCoords = await Promise.all(
      cart.map((place: any) =>
        getItem(place.item_id).then((res) => {
          console.log("gogogogo");
          console.log({ main: place, item: res.data });
          return { main: place, item: res.data };
        })
      )
    );
    console.log("in async function:", withCoords);
    return withCoords;
  }

  const getCartCall = useCallback((cart_id: any) => {
    // function getCart(cart_id: string) {
    console.log("cartid");
    console.log(cart_id);
    const data = {};
    // const url = "${process.env.NEXT_PUBLIC_BACKEND_URI}/cart/1";
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URI}/cart/${cart_id}`;

    axios
      .get(url, data)
      .then((result) => {
        let cart = result.data.cartitems;
        console.log("cart");
        console.log(result.data);
        console.log(cart);
        let cartWithItemInfo = getItemInfoForCart(cart).then((res: any) => {
          console.log("after async function:", res);
          setCart(res);
          return res;
        });
        console.log("heoo");
        console.log(cartWithItemInfo);
      })
      .catch((error) => {
        alert(error);
      });
    // }
  }, []);

  useEffect(() => {
    if (!router.isReady) return;
    return getCartCall(cart_id);

    // codes using router.query
  }, [router.isReady, cart_id, getCartCall]);

  useEffect(() => {
    getItems().then((res: any) => {
      console.log("hi");
      console.log(res.data);
      let output = res.data;
      console.log("output");
      console.log(output);
      setItems(output);
      console.log("outitems");
      console.log(outitems);
    });
  }, [outitems]);

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
                alt="some item"
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
              Total: $
              {cart.reduce((accumulator, object: any) => {
                return accumulator + object.item.price * object.main.quantity;
              }, 0)}
              <Divider />
              {cart != null
                ? cart.map((item: any) => (
                    <Box key={item.main.id} p={2}>
                      <div>
                        <p>item: {item.item.title}</p>
                        <HStack>
                          <p>quantity: {item.main.quantity}</p>
                          <p>price: ${item.main.quantity * item.item.price}</p>
                        </HStack>
                        <HStack>
                          <Button
                            size={"sm"}
                            onClick={() =>
                              handleClick(item.main.id, cart_id, true)
                            }
                          >
                            <Icon
                              _groupHover={{
                                color: "white",
                              }}
                              as={FiMinus}
                            />
                          </Button>
                          <Button
                            size={"sm"}
                            onClick={() =>
                              handleClick(item.main.id, cart_id, false)
                            }
                          >
                            <Icon
                              _groupHover={{
                                color: "white",
                              }}
                              as={FiPlus}
                            />
                          </Button>
                        </HStack>
                      </div>
                    </Box>
                  ))
                : "You have no items in your cart yet."}
              <Button
                aria-label="checkout"
                backgroundColor={"yellow.300"}
                onClick={() =>
                  // console.log("checkout out")
                  axios
                    .post(
                      `${process.env.NEXT_PUBLIC_BACKEND_URI}/create-checkout-session-react/?cart=${cart_id}`
                    )
                    .then((res) => {
                      console.log("okkkk");
                      console.log(res);
                      console.log(res.data);
                      window.location.replace(res.data);
                    })
                }
              >
                Checkout
              </Button>
            </Container>
          </GridItem>
          {/* products */}
          <GridItem colSpan={4} bg="blue.300">
            <SimpleGrid columns={3} spacing="30px" minChildWidth="300px">
              {outitems.map((product: any) => (
                <Card
                  key={product.title}
                  iteminfo={product}
                  cart_id={cart_id}
                  handler={handleClick}
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
