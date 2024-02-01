import React, { useEffect, useState } from "react";
import {
  Modal,
  FlatList,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { ModalStyle } from "./ModalStyle";
import { StyleDefault } from "../StyleDeafult/StyleDeafult";
import { COLOR } from "../../contants";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export const ProvinceModal = ({
  visible,
  onClose,
  onSelectProvince,
  provinces,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProvinces, setFilteredProvinces] = useState([]);

  useEffect(() => {
    const filter = provinces.filter((province) =>
      province.province_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProvinces(filter);
  }, [searchQuery, provinces]);

  return (
    <Modal visible={visible} animationType="slide">
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            flex: 1,
            padding: 16,
          }}
        >
          <View style={ModalStyle.headerProvince}>
            <View
              style={[
                StyleDefault.flexBoxRow,
                { justifyContent: "space-between" },
              ]}
            >
              <Text style={StyleDefault.FontSizeMedium}>
                Select province/city
              </Text>
              <TouchableOpacity onPress={onClose}>
                <AntDesign name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <View>
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
              >
                <TextInput
                  style={ModalStyle.searchStyle}
                  placeholder="Search province"
                  value={searchQuery}
                  onChangeText={(text) => setSearchQuery(text)}
                />
              </KeyboardAvoidingView>
              <TouchableOpacity
                style={ModalStyle.actionFindProvince}
                onPress={() => {} /* Implement your search logic here */}
              >
                <EvilIcons name="search" size={32} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            data={filteredProvinces}
            showsHorizontalScrollIndicator={false}
            bounces={false}
            renderItem={({ item }) => (
              <View style={{ width: "100%" }}>
                <TouchableOpacity
                  style={{ borderBottomWidth: 0.5, marginBottom: 20 }}
                  onPress={() => onSelectProvince(item)}
                >
                  <Text
                    style={{
                      color: COLOR.text_weak_color,
                      fontSize: 15,
                      marginBottom: 12,
                    }}
                  >
                    {item.province_name}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) => item.province_id.toString()}
          />
        </View>
      </View>
    </Modal>
  );
};
