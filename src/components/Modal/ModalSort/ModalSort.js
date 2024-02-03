import { Modal, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { COLOR } from "../../../contants";
import { StyleDefault } from "../../StyleDeafult/StyleDeafult";
import { AntDesign } from "@expo/vector-icons";
import { RadioButton } from "react-native-paper";
const ModalSort = (props) => {
  const { isModal, setModal,onSort } = props;
  const [checked, setChecked] = React.useState("first");
  const handleSort = (option) => {
    setChecked(option);
    onSort(option);
    setModal(false);
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModal}
      backdropOpacity={1}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          backgroundColor: "#000000AA",
        }}
      >
        <View
          style={{
            backgroundColor: COLOR.offWhite,
            height: 150,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            padding: 16,
          }}
        >
          <View
            style={[
              StyleDefault.flexBoxRow,
              { justifyContent: "space-between" },
            ]}
          >
            <Text style={[StyleDefault.FontSizeMedium, { fontWeight: "600" }]}>
              Sort By
            </Text>
            <TouchableOpacity onPress={() => setModal(false)}>
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={StyleDefault.flexBoxRow}>
            <RadioButton
              value="Low"
              status={checked === "Low" ? "checked" : "unchecked"}
              onPress={() => handleSort("low")}
              color={COLOR.PRIMARY}
            />
            <Text>Lowest to highest.</Text>
          </View>
          <View style={StyleDefault.flexBoxRow}>
            <RadioButton
              value="high"
              status={checked === "High" ? "checked" : "unchecked"}
              onPress={() => handleSort("high")}
              color={COLOR.PRIMARY}
              theme={COLOR.bg_color_blue_200}
            />
            <Text>Highest to Lowset</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalSort;

const styles = StyleSheet.create({});
