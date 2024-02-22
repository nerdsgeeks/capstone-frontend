import { Svg, Path, Rect, G, Defs, ClipPath } from 'react-native-svg';

const DueOutIcon = () => (
  <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Defs>
      <ClipPath id="clip0_1770_3106">
        <Rect width="18" height="18" fill="white" />
      </ClipPath>
    </Defs>
    <G clipPath="url(#clip0_1770_3106)">
      <Path d="M1.5 4.5C1.5 2.84315 2.84315 1.5 4.5 1.5H13.5C15.1569 1.5 16.5 2.84315 16.5 4.5V13.5C16.5 15.1569 15.1569 16.5 13.5 16.5H4.5C2.84315 16.5 1.5 15.1569 1.5 13.5V4.5Z" fill="white" fillOpacity="0.9" />
      <Path d="M6 12C6 9 9 7.5 12 7.5M12 7.5L10.5 9.75M12 7.5L9.75 6M4.5 16.5H13.5C15.1569 16.5 16.5 15.1569 16.5 13.5V4.5C16.5 2.84315 15.1569 1.5 13.5 1.5H4.5C2.84315 1.5 1.5 2.84315 1.5 4.5V13.5C1.5 15.1569 2.84315 16.5 4.5 16.5Z" stroke="#E86048" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </G>
  </Svg>
);

export default DueOutIcon;
