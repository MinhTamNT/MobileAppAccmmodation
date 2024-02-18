import { createStackNavigator } from "@react-navigation/stack";
import BottomNavigation from "../../Navigation/BottomNavigation";

const Stack = createStackNavigator();

const Home = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Bottom Navigation" component={BottomNavigation} />
    </Stack.Navigator>
  );
};

export default Home;
