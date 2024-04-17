import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { ColorModeScript } from "@chakra-ui/react";
import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { SocketContextProvider } from "./context/SocketContext";
const style = {
  global: (props) => ({
    body: {
      color: mode("gray.800", "whiteAlpha.900")(props),
      bg: mode("gray.100", "#101010")(props),
    },
  }),
};
const config = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};
const colors = {
  gray: {
    light: "#616161",
    dark: "#1e1e1e",
  },
};

const brandPrimary = defineStyle({
  borderWidth: "10px",
  borderStyle: "solid",
  borderColor: "green",

  // let's also provide dark mode alternatives
  _dark: {
    borderColor: "green.500",
  },
});

export const dividerTheme = defineStyleConfig({
  variants: { brandPrimary },
});

const theme = extendTheme({
  config,
  style,
  colors,
  components: { Divider: dividerTheme },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <SocketContextProvider>
            <App />
          </SocketContextProvider>
        </ChakraProvider>
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>
);
