import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";

export default function InputField({
  label,
  icon,
  inputType,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
  onChangeText,
  error, // Add error prop
}) {
  const [value, setValue] = useState("");

  // Define dynamic styles based on the presence of an error
  const inputStyle = {
    flex: 1,
    paddingVertical: 0,
    borderBottomColor: error ? "red" : "#ccc",
    borderBottomWidth: 1,
    marginBottom: 25,
  };

  const validateInput = () => {
    if (!value.trim()) {
      error("This field is required");
      return false;
    }

    error(""); // Clear error if validation passes
    return true;
  };

  return (
    <View style={{ flexDirection: "row" }}>
      {icon}
      {inputType == "password" ? (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={inputStyle}
          secureTextEntry={true}
          placeholderTextColor="#333"
          onChangeText={(text) => {
            setValue(text);
            onChangeText(text);
          }}
          onBlur={validateInput}
        />
      ) : (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={inputStyle}
          placeholderTextColor="#333"
          onChangeText={(text) => {
            setValue(text);
            onChangeText(text);
          }}
          onBlur={validateInput}
        />
      )}

      <TouchableOpacity onPress={fieldButtonFunction}>
        <Text style={{ color: "#AD40AF", fontWeight: "700" }}>
          {fieldButtonLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
