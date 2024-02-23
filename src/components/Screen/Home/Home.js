import { createStackNavigator } from "@react-navigation/stack";
import BottomNavigation from "../../Navigation/BottomNavigation";
import { useDispatch, useSelector } from "react-redux";
import { View, Image, SafeAreaView, Text } from "react-native";
import { StyleDefault } from "../../StyleDeafult/StyleDeafult";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLOR } from "../../../contants";
import { TabViewBottom } from "../../TabViewTop/TabViewBottom";
import { logout } from "../../../Redux/store";
import { useNavigation } from "@react-navigation/native";

const Stack = createStackNavigator();

const Home = () => {
  const user = useSelector((state) => state?.user?.currentUser);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handlerLogout = async () => {
    dispatch(logout());
    navigation.navigate("Login");
  };
  return (
    <>
      {user?.role === "ADMIN" ? (
        <SafeAreaView style={StyleDefault.container}>
          <View
            style={{
              marginHorizontal: 16,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={StyleDefault.flexBoxRow}>
              <Image
                source={{
                  uri:
                    user?.avatar_user !== null
                      ? user?.avatar_user
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&usqp=CAU",
                }}
                style={StyleDefault.imageUsers}
              />
              <View>
                <Text
                  style={[StyleDefault.FontSizeMedium, { fontWeight: "500" }]}
                >
                  {user?.first_name} {user?.last_name}
                </Text>
                <Text
                  style={[StyleDefault.FontSizeMedium, { fontWeight: "500" }]}
                >
                  Role:{user?.role}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: COLOR.PRIMARY,
                padding: 10,
                borderRadius: 10,
              }}
              onPress={handlerLogout}
            >
              <Text style={{ color: "white" }}>LOG OUT</Text>
            </TouchableOpacity>
          </View>
          <TabViewBottom />
        </SafeAreaView>
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Bottom Navigation" component={BottomNavigation} />
        </Stack.Navigator>
      )}
    </>
  );
};

export default Home;
