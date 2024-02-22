import { Svg, Path, Rect, Defs, ClipPath, G } from 'react-native-svg';

const CheckedOutIcon = () => (
  <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Defs>
      <ClipPath id="clip0_1770_3110">
        <Rect width="18" height="18" fill="white" />
      </ClipPath>
    </Defs>
    <G clipPath="url(#clip0_1770_3110)">
      <Path d="M4.5 1.5H13.5C15.1569 1.5 16.5 2.84315 16.5 4.5V13.5C16.5 15.1569 15.1569 16.5 13.5 16.5H4.5C2.84315 16.5 1.5 15.1569 1.5 13.5V4.5C1.5 2.84315 2.84315 1.5 4.5 1.5Z" fill="white" fillOpacity="0.9" />
      <Path d="M11.1213 6.87868L6.87868 11.1213M11.1213 11.1213L6.87868 6.87868M4.5 16.5H13.5C15.1569 16.5 16.5 15.1569 16.5 13.5V4.5C16.5 2.84315 15.1569 1.5 13.5 1.5H4.5C2.84315 1.5 1.5 2.84315 1.5 4.5V13.5C1.5 15.1569 2.84315 16.5 4.5 16.5Z" stroke="#AC0101" strokeWidth="1.5" strokeLinecap="round" />
    </G>
  </Svg>
);

export default CheckedOutIcon;
