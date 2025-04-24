import { menuAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys)

const baseStyle = definePartsStyle({
  list: {
    bg: "dark.500",
    borderColor: "dark.400",
    padding: "0",
  },
  item: {
    bg: "transparent",
    color: "gray.500",
    fontSize: "10pt",
    fontWeight: 500,
    _hover: {
      bg: "dark.400",
    },
    _dark: {
      color: "whiteAlpha.700",
    }
  },
  divider: {
    borderColor: "dark.400",
  },
})

export const Menu = defineMultiStyleConfig({
  baseStyle,
}) 