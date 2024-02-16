import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { styleFields } from "./InputFieldStyle";
import { Feather } from "@expo/vector-icons"; // Import icon từ thư viện react-native-vector-icons

const InputField = ({
  label,
  placeholder,
  error,
  onChangeText,
  secureEntry,
  style,
  keyboardType,
  value,
  onPressIn,
  icon, // Thêm prop icon
  OnPressIncon,
}) => {
  const combinedStyle = StyleSheet.compose(styleFields.inputForm, style);

  return (
    <View>
      <Text style={styleFields.labelText}>{label}</Text>
      {icon && (
        <View style={styleFields.iconContainer}>
          <TouchableOpacity onPress={OnPressIncon}>
            <Feather name={icon} size={24} color="#333" />
          </TouchableOpacity>
        </View>
      )}
      <TextInput
        placeholder={placeholder}
        style={combinedStyle}
        onChangeText={onChangeText}
        secureTextEntry={secureEntry}
        placeholderTextColor="#333"
        keyboardType={keyboardType}
        value={value}
        onPressIn={onPressIn}
      />
      {error && <Text style={styleFields.errorText}>{error}</Text>}
    </View>
  );
};

export default InputField;
