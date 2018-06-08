import React from 'react';
import {TextInput} from "react-native";
import { AppColors } from '../../themes';

const Input = (props) => (
  <TextInput underlineColorAndroid='transparent'
             selectionColor={AppColors.themeColor} {...props} ></TextInput>
);

export default Input;

