import React from "react";
import WelcomeApp from "./src/components/WelcomeApp/WelcomeApp";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import SignUp from "./src/components/Screen/SignInAndUp/SignUp/SignUp.js";
import Home from "./src/components/Screen/Home/Home.js";
import Notification from "./src/components/Screen/Notification/Notification.js";
import Search from "./src/components/Screen/Search/Search.js";
import { persistor, store } from "./src/Redux/store";
import { Provider } from "react-redux";
import UserDeatil from "./src/components/Screen/Profle/UserDeatil.js";
import { RequireUsers } from "./src/components/RequireAuth/RequireUser.js";
import SignIn from "./src/components/Screen/SignInAndUp/SignIn.js";
import MapScreen from "./src/components/Screen/Map/MapScreen.js";
import PostDetail from "./src/components/SuggestPost/PostDeatil.js";
import { PersistGate } from "redux-persist/integration/react";
import Toast from "react-native-toast-message";
import FriendProfile from "./src/components/Screen/FriendProfile/FriendProfile.js";
import RoomChat from "./src/components/Screen/RoomChat/RoomChat.js";
const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="Home"
          >
            <Stack.Screen name="WelcomeApp" component={WelcomeApp} />
            <Stack.Screen name="Login" component={SignIn} />
            <Stack.Screen name="Register" component={SignUp} />
            <Stack.Screen name="Home">
              {({ navigation, route }) => (
                <RequireUsers navigation={navigation} route={route}>
                  <Home />
                </RequireUsers>
              )}
            </Stack.Screen>
            <Stack.Screen name="Notification">
              {({ navigation, route }) => (
                <RequireUsers navigation={navigation} route={route}>
                  <Notification />
                </RequireUsers>
              )}
            </Stack.Screen>
            <Stack.Screen name="Search">
              {({ navigation, route }) => (
                <RequireUsers navigation={navigation} route={route}>
                  <Search />
                </RequireUsers>
              )}
            </Stack.Screen>
            <Stack.Screen name="MapScreen">
              {({ navigation, route }) => (
                <RequireUsers navigation={navigation} route={route}>
                  <MapScreen />
                </RequireUsers>
              )}
            </Stack.Screen>
            <Stack.Screen name="UserDeatil">
              {({ navigation, route }) => (
                <RequireUsers navigation={navigation} route={route}>
                  <UserDeatil />
                </RequireUsers>
              )}
            </Stack.Screen>
            <Stack.Screen name="PostDeatil">
              {({ navigation, route }) => (
                <RequireUsers navigation={navigation} route={route}>
                  <PostDetail />
                </RequireUsers>
              )}
            </Stack.Screen>
            <Stack.Screen name="Friend">
              {({ navigation, route }) => (
                <RequireUsers navigation={navigation} route={route}>
                  <FriendProfile />
                </RequireUsers>
              )}
            </Stack.Screen>
            <Stack.Screen name="ChatRoom">
              {({ navigation, route }) => (
                <RequireUsers navigation={navigation} route={route}>
                  <RoomChat />
                </RequireUsers>
              )}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
      <Toast />
    </Provider>
  );
}
