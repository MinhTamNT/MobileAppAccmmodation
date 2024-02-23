import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { StyleDefault } from "../StyleDeafult/StyleDeafult";
import { COLOR } from "../../contants";

const ModalRangePrice = ({
  isVisible,
  onClose,
  onPriceRangeChange,
  setModalRangPrice,
}) => {
  const formatVND = (number) => {
    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    });

    return formatter.format(number);
  };
  const handlerClose = () => {
    setModalRangPrice(false);
  };
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {
      label: `Under ${formatVND(1000000)}`,
      value: { min: 0, max: 1000000 },
      key: 1,
    },
    {
      label: `${formatVND(1000000)} - ${formatVND(2000000)}`,
      value: { min: 1000000, max: 2000000 },
      key: 2,
    },
    {
      label: `${formatVND(2000000)} - ${formatVND(3000000)}`,
      value: { min: 2000000, max: 3000000 },
      key: 3,
    },
    {
      label: `Over ${formatVND(3000000)}`,
      value: { min: 3000000, max: 550000 },
      key: 4,
    },
  ]);

  return (
    <Modal transparent={true} animationType="slide" visible={isVisible}>
      <View
        style={{
          justifyContent: "flex-end",
          backgroundColor: "#000000AA",
          flex: 1,
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            height: 330,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            padding: 10,
          }}
        >
          <Text style={StyleDefault.FontSizeMedium}>Price Range</Text>
          <DropDownPicker
            open={open}
            value={value}
            items={items.map((item, index) => ({
              label: item.label,
              value: item.value,
              key: index,
            }))}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder="Select a price range"
            containerStyle={{ marginTop: 10 }}
            style={{
              borderColor: COLOR.text_weak_color,
              backgroundColor: "#fff",
            }}
            textStyle={{ ...StyleDefault.FontSizeMedium, color: "#333" }}
            dropDownContainerStyle={{ borderColor: "#2ccce4" }}
            arrowColor="#2ccce4"
            onChangeValue={(selectedValue) => {
              console.log("Selected Price Range: ", selectedValue);
            }}
          />
          <TouchableOpacity
            onPress={() => {
              if (value) {
                onPriceRangeChange(value);
                handlerClose();
              }
            }}
            style={{
              backgroundColor: "#2ccce4",
              padding: 10,
              borderRadius: 5,
              marginTop: 10,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#fff" }}>Apply</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalRangePrice;
