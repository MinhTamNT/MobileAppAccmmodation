import { View, Text, Modal, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { COLOR } from "../../contants";
import { ModalStyle } from "./ModalStyle";
import InputField from "../InputFields/InputFields";
import { styleFields } from "../InputFields/InputFieldStyle";
import Slider from "@react-native-community/slider";
import { marker } from "../Screen/Map/MapData";
const ModalPrice = (props) => {
  const [markersToShow, setMarkersToShow] = useState(marker);
  const { setModalVisible, modalVisible } = props;
  const [minPrice, setMinPrice] = useState("100");
  const [maxPrice, setMaxPrice] = useState("1000");
  const [value, setValue] = useState(0);
  const filterMarkersByPrice = () => {
    const filteredMarkers = marker.filter(
      (marker) =>
        marker.price >= parseFloat(minPrice) &&
        marker.price <= parseFloat(maxPrice)
    );
    setMarkersToShow(filteredMarkers);
    setModalVisible(false);
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
        }}
      >
        <View style={ModalStyle.content_modal}>
          <Text style={{ fontSize: 20, fontWeight: "500", marginBottom: 10 }}>
            Rent cost
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <InputField
              placeholder="Min Price"
              label="Min Price"
              style={styleFields.PriceFields}
              onChangeText={(text) => {
                setMinPrice(text);
                setValue(
                  parseInt(text) + (parseInt(maxPrice) - parseInt(text)) / 2
                );
              }}
            />
            <InputField
              placeholder="Max Price"
              label="Max Price"
              style={styleFields.PriceFields}
              onChangeText={(text) => {
                setMaxPrice(text);
                setValue(
                  parseInt(text) - (parseInt(text) - parseInt(minPrice)) / 2
                );
              }}
            />
          </View>
          <Text>
            <Text>
              Price Range: ${parseFloat(minPrice).toFixed(2)} - $
              {parseFloat(maxPrice).toFixed(2)}
            </Text>
          </Text>
          <Slider
            style={{ width: "100%", height: 40 }}
            step={10}
            minimumValue={0}
            maximumValue={1000}
            minimumTrackTintColor={COLOR.bg_color_blue_200}
            maximumTrackTintColor="#000000"
            value={parseFloat(maxPrice)} // Add this line
            onSlidingComplete={(value) => {
              setMinPrice(Math.min(value, parseFloat(minPrice)));
              setMaxPrice(Math.max(value, parseFloat(minPrice)));
            }}
          />
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <TouchableOpacity
              style={ModalStyle.btnActionApply}
              onPress={filterMarkersByPrice}
            >
              <Text style={ModalStyle.textApply}>Apply</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={ModalStyle.btnActionCancel}
              onPress={() => setModalVisible(!true)}
            >
              <Text style={ModalStyle.textCancel}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalPrice;
