import React from "react";
import WelcomeApp from "./src/components/WelcomeApp/WelcomeApp";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import SignUp from "./src/components/Screen/SignInAndUp/SignUp/SignUp.js";
import SignIn from "./src/components/Screen/SignInAndUp/Signin.js";
import Home from "./src/components/Screen/Home/Home.js";
import Notification from "./src/components/Screen/Notification/Notification.js";
import Search from "./src/components/Screen/Search/Search.js";
import { persistor, store } from "./src/Redux/store.js";
import { Provider } from "react-redux";
import { RequireAuth } from "./src/components/RequireAuth/RequireAuth.js";
import { PersistGate } from "redux-persist/integration/react";
import { Text } from "react-native";
import UserDeatil from "./src/components/Screen/Profle/UserDeatil.js";
const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading....</Text>} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="Home"
          >
            <Stack.Screen name="WelcomeApp" component={WelcomeApp} />
            <Stack.Screen name="Login" component={SignIn} />
            <Stack.Screen name="Register" component={SignUp} />
            <Stack.Screen name="Home">
              {({ navigation }) => (
                <RequireAuth navigation={navigation} Component={Home} />
              )}
            </Stack.Screen>
            <Stack.Screen name="Notification">
              {({ navigation }) => (
                <RequireAuth navigation={navigation} Component={Notification} />
              )}
            </Stack.Screen>
            <Stack.Screen name="Search">
              {({ navigation }) => (
                <RequireAuth navigation={navigation} Component={Search} />
              )}
            </Stack.Screen>
            <Stack.Screen name="UserDeatil">
              {({ navigation }) => (
                <RequireAuth navigation={navigation} Component={UserDeatil} />
              )}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
