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
    title: "Notification",
    name: "Notification",
    icon: "bell",
    screen: "Notification",
    Component: Notification,
  },
  {
    id: 3,
    title: "Message",
    name: "MessageScreen",
    icon: "message-text-outline",
    screen: "MessageScreen",
    Component: MessageScreen,
  },
  {
    id: 4,
    name: "ProfileScreen",
    title: "Profile",
    icon: "user",
    screen: "ProfileScreen",
    Component: Profile,
  },
];
