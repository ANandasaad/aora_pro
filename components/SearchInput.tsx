import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons, images } from "../constants";
const SearchInput = ({
  title,
  value,
  handleChangeText,
  keyboardType,
  otherStyle,
  placeholder,
  ...props
}: any) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View
      className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center
      flex-row space-x-4"
    >
      <TextInput
        className="flex-1  text-base mt-0.5 text-white font-pregular"
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#7b7b8b"
        onChangeText={handleChangeText}
        secureTextEntry={title === "Password" && !showPassword}
      />
      <TouchableOpacity>
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
