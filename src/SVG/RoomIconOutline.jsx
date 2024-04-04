import Svg, { Path } from "react-native-svg";

const BedIconOutline = ({ w = 40, h = 31, stroke = "#9F9F9F" }) => (
  <Svg
    width={w}
    height={h}
    viewBox="0 0 40 31"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M3 19.3281V20.3281H4H18H19V19.3281V8.61385C19 7.91476 19.5099 7.47099 20 7.47099H34C36.6964 7.47099 39 9.83664 39 12.8996V27.8996C39 28.5986 38.4901 29.0424 38 29.0424C37.5099 29.0424 37 28.5986 37 27.8996V25.7567V24.7567H36H22H20H4H3V25.7567V27.8996C3 28.5986 2.4901 29.0424 2 29.0424C1.5099 29.0424 1 28.5986 1 27.8996V2.18528C1 1.48619 1.5099 1.04242 2 1.04242C2.4901 1.04242 3 1.48619 3 2.18528V19.3281ZM11 7.47099C12.0377 7.47099 13.0482 7.91204 13.8045 8.72238C14.563 9.53505 15 10.6511 15 11.8281C15 13.0051 14.563 14.1212 13.8045 14.9339C13.0482 15.7442 12.0377 16.1853 11 16.1853C9.96227 16.1853 8.95184 15.7442 8.19552 14.9339C7.43703 14.1212 7 13.0051 7 11.8281C7 10.6511 7.43703 9.53505 8.19552 8.72238C8.95184 7.91204 9.96227 7.47099 11 7.47099Z"
      stroke={stroke}
      strokeWidth="2"
    />
  </Svg>
);

export default BedIconOutline;
