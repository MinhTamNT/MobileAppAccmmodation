import React from "react";
import WelcomeApp from "./src/components/WelcomeApp/WelcomeApp";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import SignUp from "./src/components/Screen/SignInAndUp/SignUp/SignUp.js";
import SignIn from "./src/components/Screen/SignInAndUp/Signin.js";
import Home from "./src/components/Screen/Home/Home.js";
import Notification from "./src/components/Screen/Notification/Notification.js";
import Search from "./src/components/Screen/Search/Search.js";
import { store } from "./src/Redux/store.js";
import { Provider } from "react-redux";
import UserDeatil from "./src/components/Screen/Profle/UserDeatil.js";
import { RequireUsers } from "./src/components/RequireAuth/RequireUser.js";
const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
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
              <RequireUsers navigation={navigation} Component={Home} />
            )}
          </Stack.Screen>
          <Stack.Screen name="Notification">
            {({ navigation }) => (
              <RequireUsers navigation={navigation} Component={Notification} />
            )}
          </Stack.Screen>
          <Stack.Screen name="Search">
            {({ navigation }) => (
              <RequireUsers navigation={navigation} Component={Search} />
            )}
          </Stack.Screen>
          <Stack.Screen name="UserDeatil">
            {({ navigation }) => (
              <RequireUsers navigation={navigation} Component={UserDeatil} />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
