import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styleProfile } from "./StyleProfile";
import { useSelector } from "react-redux";
import { StyleDefault } from "../../StyleDeafult/StyleDeafult";
import { ArrowLeft2, Edit2 } from "iconsax-react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const UserDeatil = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.auth?.currentUser);
  return (
    <SafeAreaView style={StyleDefault.container}>
      <View style={styleProfile.HeaderDeatil}>
        <View
          style={[StyleDefault.flexBoxRow, { justifyContent: "space-between" }]}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft2 color="#fff" />
          </TouchableOpacity>
        </View>
        <View>
          <View
            style={[
              StyleDefault.flexBoxRow,
              { justifyContent: "space-between" },
            ]}
          >
            <Image
              source={{ uri: user.avatar_user }}
              width={100}
              height={100}
              resizeMode="cover"
              style={[styleProfile.ImageUser, { marginTop: 20 }]}
            />
            <TouchableOpacity
              style={[StyleDefault.flexBoxRow, styleProfile.headerEdit]}
            >
              <Text
                style={[styleProfile.headerText, StyleDefault.FontSizeMedium]}
              >
                Edit
              </Text>
              <Edit2 color="#fff" />
            </TouchableOpacity>
          </View>
          <Text
            style={[
              StyleDefault.FontSizeMedium,
              styleProfile.headerText,
              { fontWeight: 500 },
            ]}
          >
            {user.last_name} {user.first_name}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UserDeatil;

const styles = StyleSheet.create({});
