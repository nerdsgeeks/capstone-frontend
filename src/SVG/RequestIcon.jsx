import Svg, { Path } from "react-native-svg";

const RequestIcon = ({ w = 22, h = 18, stroke = "black" }) => (
  <Svg
    width={w}
    height={h}
    viewBox="0 0 30 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M14.2917 2.75V1.75H13.2917H12.375C12.1653 1.75 12 1.58469 12 1.375C12 1.16531 12.1653 1 12.375 1H14.6667H16.9583C17.168 1 17.3333 1.16531 17.3333 1.375C17.3333 1.58469 17.168 1.75 16.9583 1.75H16.0417H15.0417V2.75V4.65781V5.55753L15.9364 5.65226C21.5448 6.24603 25.9855 10.7688 26.4583 16.4167H2.87501C3.3478 10.7688 7.78854 6.24603 13.397 5.65226L14.2917 5.55753V4.65781V2.75ZM1 20.625C1 20.4153 1.16531 20.25 1.375 20.25H27.9583C28.168 20.25 28.3333 20.4153 28.3333 20.625C28.3333 20.8347 28.168 21 27.9583 21H1.375C1.16531 21 1 20.8347 1 20.625Z"
      stroke={stroke}
      stroke-width="2"
      
    />
  </Svg>
);

export default RequestIcon;
