import { StyleSheet } from "react-native";
import { COLOR } from "../../../contants";

export const styleRoomChat = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  header: {
    flex: 0.2,
    paddingHorizontal: 12,
    paddingVertical: 15,
    backgroundColor: "#AF0C6E",
  },
  header_content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 8,
    paddingVertical: 48,
  },
  wrapper_content: {
    width: "100%",
    backgroundColor: "white",
    paddingHorizontal: 8,
    paddingVertical: 12,
    flex: 1,
    borderRadius: 35,
    marginTop: -30,
  },

  contentAction: {
    position: "relative",
  },
});
