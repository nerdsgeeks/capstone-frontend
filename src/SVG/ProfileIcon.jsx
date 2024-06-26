import Svg, { Path } from "react-native-svg";

const ProfileIcon = ({ w = 22, h = 22, stroke = "white", fill = "none" }) => (
  <Svg
    width={w}
    height={h}
    viewBox="0 0 22 22"
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M14.6681 9.85562C13.6953 10.8285 12.3758 11.375 11 11.375C9.62419 11.375 8.30473 10.8285 7.33188 9.85562C6.35904 8.88277 5.8125 7.56331 5.8125 6.1875C5.8125 4.81169 6.35904 3.49223 7.33188 2.51938C8.30473 1.54654 9.62419 1 11 1C12.3758 1 13.6953 1.54654 14.6681 2.51938C15.641 3.49223 16.1875 4.81169 16.1875 6.1875C16.1875 7.56331 15.641 8.88277 14.6681 9.85562ZM1 20.6809C1 17.4046 3.65463 14.75 6.93086 14.75H15.0691C18.3454 14.75 21 17.4046 21 20.6809C21 20.8569 20.8569 21 20.6809 21H1.31914C1.14313 21 1 20.8569 1 20.6809Z"
      stroke={stroke}
      strokeWidth="2"
    />
  </Svg>
);

export default ProfileIcon;
