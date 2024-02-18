import { Text, View, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styleProfile } from "./StyleProfile";
import { useSelector } from "react-redux";
import { StyleDefault } from "../../StyleDeafult/StyleDeafult";
import { ArrowLeft2, Edit2 } from "iconsax-react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import TabViewBottom from "../../TabViewTop/TabViewBottom";
import ModalEdit from "../../Modal/ModalEdit";
const UserDeatil = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state?.user.currentUser);
  const [isVissable, setVissable] = useState(false);
  const handlerEdit = () => {
    setVissable(!isVissable);
  };

  return (
    <SafeAreaView style={StyleDefault.container}>
      <View style={styleProfile.HeaderDeatil}>
        <View
          style={[StyleDefault.flexBoxRow, { justifyContent: "space-between" }]}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft2 color="#333" />
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
              source={{
                uri:
                  user.avatar_user === null
                    ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&usqp=CAU"
                    : user.avatar_user,
              }}
              width={100}
              height={100}
              resizeMode="cover"
              style={[styleProfile.ImageUser, { marginTop: 20 }]}
            />
            <TouchableOpacity
              style={[StyleDefault.flexBoxRow, styleProfile.headerEdit]}
              onPress={handlerEdit}
            >
              <Text
                style={[styleProfile.headerText, StyleDefault.FontSizeMedium]}
              >
                Edit
              </Text>
              <Edit2 color="#333" />
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
          <Text style={styleProfile.headerText}>Role : {user.role}</Text>
          <Text style={styleProfile.headerText}>Followers : 20</Text>
        </View>
      </View>
      <TabViewBottom />
      {isVissable && <ModalEdit setVissable={setVissable} />}
    </SafeAreaView>
  );
};

export default UserDeatil;
