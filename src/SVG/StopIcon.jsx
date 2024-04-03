import Svg, { Path } from "react-native-svg";

const StopIcon = ({ w = 26, h = 26, fill = "#1E1E1E" }) => (
<Svg width={w} height={h} viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M0 4.33333C0 1.94323 1.94323 0 4.33333 0H21.6667C24.0568 0 26 1.94323 26 4.33333V21.6667C26 24.0568 24.0568 26 21.6667 26H4.33333C1.94323 26 0 24.0568 0 21.6667V4.33333Z" fill={fill}/>
</Svg>
);

export default StopIcon;
