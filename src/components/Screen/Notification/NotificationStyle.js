import { StyleSheet } from "react-native";
import { COLOR } from "../../../contants";
export const NotiStyle = StyleSheet.create({
  header: {
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  header_title: {
    textAlign: "center",
    fontSize: 20,
    color: COLOR.bg_color_blue_200,
  },
  imageNoti: { width: "100%", height: 350 },
  message: { fontSize: 16, fontWeight: "500" },
  notificationBadge: {
    position: "absolute",
    right: -3,
    top: -10,
    backgroundColor: COLOR.PRIMARY,
    borderRadius: 10,
    paddingHorizontal: 4,
  },
  notificationText: {
    color: "white",
    fontWeight: "bold",
  },
});
