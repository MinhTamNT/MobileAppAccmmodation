import { StyleSheet } from "react-native";

export const StyleDefault = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#fff",
  },
  fontSizeDeault: {
    fontSize: 14,
  },
  flexBoxRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  flexBoxCol: {
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
  },
  FontSizeLarge: {
    fontSize: 24,
  },
  FontSizeMedium: {
    fontSize: 16,
  },
  fontSizeSmail: {
    fontSize: 14,
  },
  textCenter: {
    textAlign: "center",
  },
  bold700: {
    fontWeight: "700",
  },
  imageUsers: {
    width: 50,
    height: 50,
    borderRadius: 50,
    resizeMode: "cover",
  },
  imageUserPost:{
    width: 40,
    height: 40,
    borderRadius: 50,
    resizeMode: "cover",
  }
});
