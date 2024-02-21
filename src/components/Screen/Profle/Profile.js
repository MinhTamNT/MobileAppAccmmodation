import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleDefault } from "../../StyleDeafult/StyleDeafult";
import { useDispatch, useSelector } from "react-redux";
import { styleProfile } from "./StyleProfile";
import {
  ArrowLeft,
  Building,
  ArrowRight2,
  User,
  Security,
  Document,
  InfoCircle,
  Logout,
} from "iconsax-react-native";
import { COLOR } from "../../../contants";
import { FacebookLogo, GoogleLogo } from "../../../assets/image/image";
import { logout } from "../../../Redux/store";

const Profile = ({ navigation }) => {
  const current_user = useSelector((state) => state?.user?.currentUser);
  const auth = useSelector((state) => state?.auth?.currentUser);
  const token = auth?.access_token;
  const dispatch = useDispatch();
  const handlerLogout = async () => {
    dispatch(logout());
    navigation.navigate("Login");
  };
  const handlerNavigate = () => {
    navigation.navigate("UserDeatil");
  };
  const handlerPrivacy = () => {
    const privacyPolicyURL =
      "https://docs.google.com/document/d/1nmkipv_MWTI3LdWDfvpS0PqojZqRZLL0pBwkWoHLRQE/edit#heading=h.42x4cq6r7kqw";

    Linking.openURL(privacyPolicyURL)
      .then((supported) => {
        if (!supported) {
          console.log("Opening URL is not supported");
        }
      })
      .catch((err) => console.error("An error occurred", err));
  };

  const data = [
    {
      id: 1,
      title: "Person Information",
      iconLeft: <User color="#697689" />,
      icon: <ArrowRight2 color="#697689" />,
      handler: handlerNavigate,
    },
    {
      id: 2,
      title: "Security",
      iconLeft: <Security color="#697689" />,
      icon: <ArrowRight2 color="#697689" />,
      handler: null,
    },
    {
      id: 3,
      title: "Privacy policy",
      iconLeft: <Document color="#697689" />,
      icon: <ArrowRight2 color="#697689" />,
      handler: handlerPrivacy,
    },
    {
      id: 4,
      title: "Contact",
      iconLeft: <InfoCircle color="#697689" />,
      icon: <ArrowRight2 color="#697689" />,
      handler: null,
    },
  ];
  const handlerGoBack = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView style={StyleDefault.container}>
      <View style={styleProfile.wrapper}>
        <View
          style={[StyleDefault.flexBoxRow, { justifyContent: "space-between" }]}
        >
          <TouchableOpacity onPress={handlerGoBack}>
            <ArrowLeft size="24" color="#697689" />
          </TouchableOpacity>
          <Text>Personal information</Text>
          <Building size="24" color="#697689" />
        </View>
        <View style={styleProfile.content}>
          <View style={[styleProfile.ImageUser, StyleDefault.flexBoxRow]}>
            <Image
              source={{
                uri:
                  current_user.avatar_user === null
                    ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&usqp=CAU"
                    : current_user.avatar_user,
              }}
              width={100}
              height={100}
              resizeMode="cover"
              style={{ borderRadius: 50 }}
            />

            <View style={styleProfile.inforUser}>
              <Text style={[StyleDefault.FontSizeLarge, { fontWeight: "700" }]}>
                {current_user.first_name} {current_user.last_name}
              </Text>
              <Text
                style={[
                  StyleDefault.fontSizeSmail,
                  { color: COLOR.text_weak_color },
                ]}
              >
                {current_user.phone}
              </Text>
            </View>
          </View>
          <View style={styleProfile.content_infor}>
            {data.map((item) => (
              <TouchableOpacity key={item.id} onPress={item.handler}>
                <View style={styleProfile.listItem}>
                  <View style={StyleDefault.flexBoxRow}>
                    <View style={styleProfile.listItemIcon}>
                      {item.iconLeft}
                    </View>
                    <Text>{item.title}</Text>
                  </View>
                  <View>{item.icon}</View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styleProfile.fotter}>
          <View>
            <Text style={[StyleDefault.FontSizeMedium, { fontWeight: "600" }]}>
              Our community
            </Text>
            <View style={[StyleDefault.flexBoxRow, { marginTop: 10 }]}>
              <GoogleLogo />
              <FacebookLogo />
            </View>
          </View>
          <View>
            <TouchableOpacity
              style={styleProfile.btnAction}
              onPress={handlerLogout}
            >
              <Logout color="#f47373" size={24} />
              <Text
                style={[StyleDefault.FontSizeMedium, { color: COLOR.PRIMARY }]}
              >
                Log out
              </Text>
            </TouchableOpacity>
            <Text style={styleProfile.footerText}>Version 1.0.0</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
