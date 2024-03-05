import React from "react";
import { Text } from "react-native";

const Typography = ({ variant = "body-regular", children, style }) => {
  const variants = variant.split("-");

  const textStyles = variants.map((v) => {
    let styleObject = fontWeights[v] || fontSizes[v];
    return styleObject ? styleObject : null;
  });

  const mergedStyles = [style, ...textStyles.filter((s) => s !== null)];

  return <Text style={mergedStyles}>{children}</Text>;
};

const fontWeights = {
  black: {
    fontFamily: "SatoshiBlack",
  },
  medium: {
    fontFamily: "SatoshiMedium",
  },
  regular: {
    fontFamily: "SatoshiRegular",
  },
};

const fontSizes = {
  h1: {
    fontSize: 60,
  },
  h2: {
    fontSize: 48,
  },
  h3: {
    fontSize: 40,
  },
  h4: {
    fontSize: 30,
  },
  h5: {
    fontSize: 23,
  },
  title: {
    fontSize: 19,
  },
  body: {
    fontSize: 17,
  },
  small: {
    fontSize: 16,
  },
  xs: {
    fontSize: 14,
  },
};

export default Typography;
