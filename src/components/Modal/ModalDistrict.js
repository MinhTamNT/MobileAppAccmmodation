import React from "react";
import { View, Modal, Text, TouchableOpacity, FlatList } from "react-native";
import { StyleDefault } from "../StyleDeafult/StyleDeafult";
import { ModalStyle } from "./ModalStyle";
import { SafeAreaView } from "react-native-safe-area-context";

const DistrictModal = ({ visible, onClose, onSelectDistrict, districts }) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <View
          style={{
            paddingVertical: 32,
            paddingHorizontal: 16,
          }}
        >
          <Text style={StyleDefault.FontSizeMedium}>Select District</Text>
          <FlatList
            data={districts}
            keyExtractor={(item) => item.district_id.toString()}
            renderItem={({ item }) => (
              <SafeAreaView>
                <TouchableOpacity onPress={() => onSelectDistrict(item)}>
                  <View style={ModalStyle.selectDistrictItem}>
                    <Text style={{ fontSize: 16 }}>{item.district_name}</Text>
                  </View>
                </TouchableOpacity>
              </SafeAreaView>
            )}
          />
        </View>
        <TouchableOpacity
          style={{
            position: "absolute",
            right: 20,
            top: 35,
            padding: 10,
          }}
          onPress={onClose}
        >
          <Text>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default DistrictModal;
