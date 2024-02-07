import { StyleSheet, Text, View } from "react-native";
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
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft2 color="#697689" />
        </TouchableOpacity>
        <Text style={[StyleDefault.FontSizeMedium, { fontWeight: 500 }]}>
          {user.last_name}
        </Text>
        <TouchableOpacity>
          <Edit2 color="#697689" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UserDeatil;

const styles = StyleSheet.create({});
