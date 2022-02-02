import { extendTheme, ThemeConfig, theme as base } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

// const styles = {
//   global: (props: any) => ({
//     body: {
//       bg: mode("#f0e7db", "gray.800")(props),
//     },
//   }),
// };

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
  config,
  fonts,
  components,
});

export default theme;
