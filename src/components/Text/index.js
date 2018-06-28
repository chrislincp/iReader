import React from 'react';
import {Text} from "react-native";

const IText = (props) => (
  <Text allowFontScaling={false} {...props} >{props.children}</Text>
);

export default IText;