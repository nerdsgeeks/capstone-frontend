import Svg, { Path, Rect } from "react-native-svg";

const BackIcon = ({ w = 24, h = 24, fill = "#434343" }) => (
  <Svg
    width={w}
    height={h}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Rect width="24" height="24" rx="12" fill="white" />
    <Path
      d="M9.21953 11.4959C8.92662 11.7748 8.92662 12.2278 9.21953 12.5067L13.7187 16.791C14.0116 17.0699 14.4873 17.0699 14.7802 16.791C15.0731 16.512 15.0731 16.0591 14.7802 15.7801L10.8106 12.0002L14.7778 8.22017C15.0707 7.94124 15.0707 7.48827 14.7778 7.20934C14.4849 6.93042 14.0092 6.93042 13.7163 7.20934L9.21719 11.4936L9.21953 11.4959Z"
      fill={fill}
    />
  </Svg>
);

export default BackIcon;
