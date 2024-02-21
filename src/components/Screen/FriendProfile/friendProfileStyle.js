import { StyleSheet } from "react-native";
import { COLOR } from "../../../contants";

export const friendStyle = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  upper: {
    marginHorizontal: 20,
    flexDirection: "row",
    position: "absolute",
    justifyContent: "space-between",
    alignItems: "center",
    top: 70,
    zIndex: 99,
  },
  friendImage: {
    aspectRatio: 1,
    resizeMode: "cover",
  },
  wrapper_content: {
    marginTop: -20,
    backgroundColor: "white",
    width: "100%",
    height: 500,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingVertical: 10,
  },
  introduce: {
    marginHorizontal: 20,
    paddingBottom: 12,
  },
  btnFollowing: {
    padding: 10,
    backgroundColor: COLOR.text_weak_color,
    borderRadius: 10,
  },
  btnFollow: {
    padding: 10,
    backgroundColor: COLOR.PRIMARY,
    borderRadius: 10,
  },
});
