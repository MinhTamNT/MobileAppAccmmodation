import HomeScreen from "../Screen/Home/HomeScreen";
import MapScreen from "../Screen/Map/MapScreen";
import MessageScreen from "../Screen/MessgaeScreen/MessageScreen";
import Profile from "../Screen/Profle/Profile";
import Notification from "../Screen/Notification/Notification";
export const tabs = [
  {
    id: 1,
    title: "Home",
    name: "HomeScreen",
    icon: "home",
    screen: "HomeScreen",
    Component: HomeScreen,
  },

  {
    id: 2,
    title: "Message",
    name: "MessageScreen",
    icon: "earth",
    screen: "MessageScreen",
    Component: MessageScreen,
  },
  {
    id: 3,
    name: "ProfileScreen",
    title: "Profile",
    icon: "user",
    screen: "ProfileScreen",
    Component: Profile,
  },
];
