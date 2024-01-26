import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { styleFields } from "./InputFieldStyle";

const InputField = ({
  label,
  placeholder,
  error,
  onChangeText,
  secureEntry,
  style,
  keyboardType,
  value,
}) => {
  // Kết hợp kiểu dáng mặc định và kiểu dáng mới từ props
  const combinedStyle = StyleSheet.compose(styleFields.inputForm, style);

  return (
    <View>
      <Text style={styleFields.labelText}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        style={combinedStyle}
        onChangeText={onChangeText}
        secureTextEntry={secureEntry}
        placeholderTextColor="#333"
        keyboardType={keyboardType}
        value={value}
      />
      {error && <Text style={styleFields.errorText}>{error}</Text>}
    </View>
  );
};

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChangeText: PropTypes.func.isRequired,
  secureEntry: PropTypes.bool,
  style: PropTypes.object, // Kiểu dáng mới từ phần JSX
};

export default InputField;
