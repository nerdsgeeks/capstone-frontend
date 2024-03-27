import React from 'react';
import { Svg, Path } from 'react-native-svg';

const InformationIcon = ({ w = 20, h = 20, fill = "#434343" }) => (
<Svg width={w} height={h} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M9.99927 2.18799C5.69146 2.18799 2.18677 5.69268 2.18677 10.0005C2.18677 14.3083 5.69146 17.813 9.99927 17.813C14.3071 17.813 17.8118 14.3083 17.8118 10.0005C17.8118 5.69268 14.3071 2.18799 9.99927 2.18799ZM9.99927 5.39111C10.2001 5.39111 10.3965 5.45068 10.5635 5.56228C10.7305 5.67388 10.8607 5.8325 10.9376 6.01808C11.0145 6.20366 11.0346 6.40787 10.9954 6.60488C10.9562 6.80189 10.8595 6.98286 10.7174 7.1249C10.5754 7.26693 10.3944 7.36366 10.1974 7.40285C10.0004 7.44204 9.79619 7.42193 9.61061 7.34506C9.42503 7.26819 9.26641 7.13801 9.15481 6.97099C9.04321 6.80397 8.98365 6.60761 8.98365 6.40674C8.98365 6.13738 9.09065 5.87905 9.28112 5.68858C9.47158 5.49812 9.72991 5.39111 9.99927 5.39111ZM11.8743 14.2192H8.43677C8.27101 14.2192 8.11204 14.1534 7.99483 14.0362C7.87762 13.919 7.81177 13.76 7.81177 13.5942C7.81177 13.4285 7.87762 13.2695 7.99483 13.1523C8.11204 13.0351 8.27101 12.9692 8.43677 12.9692H9.53052V9.53174H8.90552C8.73976 9.53174 8.58079 9.46589 8.46358 9.34868C8.34637 9.23147 8.28052 9.0725 8.28052 8.90674C8.28052 8.74098 8.34637 8.58201 8.46358 8.4648C8.58079 8.34759 8.73976 8.28174 8.90552 8.28174H10.1555C10.3213 8.28174 10.4803 8.34759 10.5975 8.4648C10.7147 8.58201 10.7805 8.74098 10.7805 8.90674V12.9692H11.8743C12.04 12.9692 12.199 13.0351 12.3162 13.1523C12.4334 13.2695 12.4993 13.4285 12.4993 13.5942C12.4993 13.76 12.4334 13.919 12.3162 14.0362C12.199 14.1534 12.04 14.2192 11.8743 14.2192Z" fill={fill}/>
</Svg>

);

export default InformationIcon;
