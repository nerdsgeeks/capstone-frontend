import Svg, { Path } from "react-native-svg";

const CartIcon = ({ w = 26, h = 23, fill = "none", stroke = "white" }) => (
  <Svg
    width={w}
    height={h}
    viewBox="0 0 26 23"
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M9.43779 22.0001C10.3076 22.0001 11.0128 21.2949 11.0128 20.4251C11.0128 19.5552 10.3076 18.8501 9.43779 18.8501C8.56794 18.8501 7.86279 19.5552 7.86279 20.4251C7.86279 21.2949 8.56794 22.0001 9.43779 22.0001Z"
      fill={fill}
      stroke={stroke}
      stroke-width="1.2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M20.993 22.0001C21.8628 22.0001 22.568 21.2949 22.568 20.4251C22.568 19.5552 21.8628 18.8501 20.993 18.8501C20.1231 18.8501 19.418 19.5552 19.418 20.4251C19.418 21.2949 20.1231 22.0001 20.993 22.0001Z"
      fill={fill}
      stroke={stroke}
      stroke-width="1.2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M1 1H4.70232L7.47905 16.7348H22.2883"
      stroke={stroke}
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M7.48202 13.0331H21.9118C22.0188 13.0332 22.1226 12.9962 22.2054 12.9284C22.2882 12.8605 22.3449 12.7661 22.3659 12.6612L24.0319 4.33096C24.0454 4.26378 24.0438 4.19447 24.0272 4.128C24.0106 4.06154 23.9794 3.99959 23.936 3.94663C23.8925 3.89367 23.8379 3.85101 23.7759 3.82173C23.714 3.79246 23.6463 3.7773 23.5778 3.77734H5.63086"
      stroke={stroke}
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);

export default CartIcon;
