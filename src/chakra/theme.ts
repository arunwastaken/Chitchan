import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { Button } from "./button";
import { Input } from "./input";
import { Menu } from "./menu";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

export const theme = extendTheme({
  config,
  colors: {
    brand: {
      50: "#F0FFF4",
      100: "#38A169",
      200: "#48BB78",
      300: "#38A169",
      400: "#2F855A",
      500: "#276749",
    },
    dark: {
      100: "#D7DADC",
      200: "#818384",
      300: "#343536",
      400: "#272729",
      500: "#1A1A1B",
      600: "#030303",
      card: "#1E1F20",
    },
  },
  fonts: {
    body: "Open Sans, sans-serif",
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === "dark" ? "dark.500" : "gray.200",
        color: props.colorMode === "dark" ? "dark.100" : "gray.900",
      },
      "html, body": {
        bg: props.colorMode === "dark" ? "dark.500" : "gray.200",
        color: props.colorMode === "dark" ? "dark.100" : "gray.900",
      },
    }),
  },
  components: {
    Button,
    Menu,
    // Input, // not working for some reason - come back to this
  },
  semanticTokens: {
    colors: {
      "chakra-body-text": { _light: "gray.900", _dark: "dark.100" },
      "chakra-body-bg": { _light: "gray.200", _dark: "dark.500" },
      "chakra-border-color": { _light: "gray.200", _dark: "dark.300" },
      "chakra-placeholder-color": { _light: "gray.500", _dark: "dark.200" },
    },
  },
  layerStyles: {
    card: {
      bg: { _light: "white", _dark: "dark.card" },
      border: "1px solid",
      borderColor: { _light: "gray.200", _dark: "dark.300" },
    },
    cardHover: {
      _hover: {
        bg: { _light: "gray.50", _dark: "dark.400" },
      }
    }
  },
});
