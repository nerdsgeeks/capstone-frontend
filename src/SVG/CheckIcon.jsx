import React from 'react';
import { Svg, Path, Rect, Defs, ClipPath, G } from 'react-native-svg';

const CheckIcon = ({ w = 18, h = 18, fill = "none", stroke = "black" }) => (
  <Svg width={w} height={h} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Defs>
      <ClipPath id="clip0_1770_3111">
        <Rect width="18" height="18" fill={fill} />
      </ClipPath>
      <ClipPath id="clip1_1770_3111">
        <Rect width="18" height="18" fill={fill} />
      </ClipPath>
    </Defs>
    <G clipPath="url(#clip0_1770_3111)">
      <G clipPath="url(#clip1_1770_3111)">
        <Path d="M16.5 9C16.5 13.1421 13.1421 16.5 9 16.5C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5C13.1421 1.5 16.5 4.85786 16.5 9Z" fill={fill} fillOpacity="0.9" />
        <Path d="M6 9L7.90101 10.7109C8.22464 11.0022 8.72744 10.9576 8.99475 10.6139L12 6.75M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </G>
    </G>
  </Svg>
);

export default CheckIcon;
