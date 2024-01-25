import React from "react";
import { View, Text, TextInput } from "react-native";
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
}) => (
  <View>
    <Text style={styleFields.labelText}>{label}</Text>
    <TextInput
      placeholder={placeholder}
      style={[styleFields.inputForm, error && styleFields.errorInput]}
      onChangeText={onChangeText}
      secureTextEntry={secureEntry}
      placeholderTextColor="#333"
      keyboardType={keyboardType}
      value={value}
    />
    {error && <Text style={styleFields.errorText}>{error}</Text>}
  </View>
);

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChangeText: PropTypes.func.isRequired,
  secureEntry: PropTypes.bool, // Add a prop for secure entry
  style: PropTypes.object,
};

export default InputField;
