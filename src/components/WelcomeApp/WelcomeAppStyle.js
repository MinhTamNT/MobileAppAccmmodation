import { StyleSheet } from "react-native";
import { COLOR } from "../../contants";

export const style = StyleSheet.create({
  image: {
    flex: 0.7,
    justifyContent: "center",
  },
  containItems: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contain: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffff",
  },
  text: {
    flex: 0.3,
  },
  title: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 10,
    color: COLOR.PRIMARY,
  },
  description: {
    textAlign: "center",
    paddingHorizontal: 65,
    fontSize: 16,
    color: COLOR.text_weak_color,
  },
  pagationContain: {
    flexDirection: "row",
    height: 64,
    justifyContent: "center",
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "#f47373",
    width: 10,
    marginHorizontal: 8,
  },
  btn: {
    position: "absolute",
    backgroundColor: "#f4338f",
    padding: 20,
    borderRadius: 100,
  },
});
