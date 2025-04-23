import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { Button } from "./button";
import { Input } from "./input";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,

};

export const theme = extendTheme({
  config,
  colors: {
    brand: {
      100: "#38A169",
      50: "#F0FFF4",
      200: "#48BB78",
      300: "#38A169",
      400: "#2F855A",
      500: "#276749",
    },
  },
  fonts: {
    body: "Open Sans, sans-serif",
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === "dark" ? "#1A1A1B" : "gray.200",
        color: props.colorMode === "dark" ? "white" : "black",
      },
      "html, body": {
        bg: props.colorMode === "dark" ? "#1A1A1B" : "gray.200",
        color: props.colorMode === "dark" ? "white" : "black",
      },
    }),
  },
  components: {
    Button,
    // Input, // not working for some reason - come back to this
  },
  semanticTokens: {
    colors: {
      "chakra-body-text": { _light: "black", _dark: "white" },
      "chakra-body-bg": { _light: "gray.200", _dark: "#1A1A1B" },
      "chakra-border-color": { _light: "gray.200", _dark: "#343536" },
    },
  },
  layerStyles: {
    card: {
      bg: { _light: "white", _dark: "#1A1A1B" },
      border: "1px solid",
      borderColor: { _light: "gray.200", _dark: "#343536" },
    },
  },
});
