import { Text, View, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styleProfile } from "./StyleProfile";
import { useSelector } from "react-redux";
import { StyleDefault } from "../../StyleDeafult/StyleDeafult";
import { ArrowLeft2, Edit2 } from "iconsax-react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import ModalEdit from "../../Modal/ModalEdit";
import DropDownPicker from "react-native-dropdown-picker";
import { TabViewBottom } from "../../TabViewTop/TabViewBottom";
import PostUser from "../../TabViewTop/TabViewUser/PostUser";
const UserDeatil = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state?.user.currentUser);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Your Post", value: "Post" },
    { label: "Your Accommodation", value: "Accommodation" },
  ]);
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
          <Text style={styleProfile.headerText}>
            Followers : {user.followers}
          </Text>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <View
          style={{
            zIndex: 999,
            width: 200,
            marginLeft: 10,
            borderRadius: 10,
            marginBottom: 10,
          }}
        >
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder={"Your Data"}
          />
        </View>
        <PostUser />
      </View>
      {isVissable && <ModalEdit setVissable={setVissable} />}
    </SafeAreaView>
  );
};

export default UserDeatil;
