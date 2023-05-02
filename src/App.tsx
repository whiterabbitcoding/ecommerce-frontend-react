import * as React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";

export default function App() {
  return <ChakraProvider theme={theme}></ChakraProvider>;
}
