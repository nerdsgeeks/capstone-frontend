import Svg, { Path } from "react-native-svg";

const ClockShiftIcon = ({ w = 22, h = 22, fill = "black" }) => (
  <Svg
    width={w}
    height={h}
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M15.429 0H0v5.143h15.429V0zm-1.715 3.429h-12V1.714h12V3.43zM12 6a5.971 5.971 0 00-3.077.857H5.57a.424.424 0 00-.428.429V8.57H7.08A5.949 5.949 0 006 12c0 .6.094 1.174.249 1.714H2.57V6H.857v9.429H7.08A5.997 5.997 0 0018 12c0-3.317-2.683-6-6-6zm0 10.286A4.287 4.287 0 017.714 12 4.287 4.287 0 0112 7.714 4.287 4.287 0 0116.286 12 4.287 4.287 0 0112 16.286zm.429-4.072l2.451 1.449-.643 1.046-3.094-1.852V8.571h1.286v3.643z"
      fill={fill}
    />
  </Svg>
);

export default ClockShiftIcon;
