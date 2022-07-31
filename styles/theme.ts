import { extendTheme, ThemeConfig, theme as base } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

// const styles = {
//   global: (props: any) => ({
//     body: {
//       bg: mode("#f0e7db", "gray.800")(props),
//     },
//   }),
// };

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const fonts = {
  heading: `Barlow  ${base.fonts.heading}`,
  body: `Inter  ${base.fonts.body}`,
};

const components = {
  Link: {
    baseStyle: {
      _hover: {
        textDecoration: "none",
      },
    },
  },
  Text: {
    baseStyle: {
      fontFamily: "Inter",
    },
  },
  Heading: {
    baseStyle: {
      fontFamily: "Barlow",
    },
  },
};

const theme = extendTheme({
  colors,
  config,
  fonts,
  components,
});

export default theme;
