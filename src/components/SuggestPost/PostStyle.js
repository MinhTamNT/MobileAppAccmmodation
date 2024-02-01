import { Platform, StyleSheet } from "react-native";
import { COLOR } from "../../contants";
export const postStyle = StyleSheet.create({
  wrapper: {
    flexDirection: "column",

    paddingHorizontal: 16,
    marginTop: 32,
  },
  headerItem: {
    marginTop: 10,
  },
  headerItem_content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  contentItems: {
    marginTop: 12,
    borderRadius: 10,
    height: 250,
    width: 350,
    backgroundColor: "#ddd",
  },
  posItem: {
    width: 380,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#ccc",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
      },
      android: {
        elevation: 10,
      },
    }),
    marginBottom: 20,
  },
  image: {
    flex: 2,
    width: "100%",
    height: "100%",
  },
  descripitonItem: {
    paddingVertical: 16,
    paddingHorizontal: 2,
  },
  detail: {
    width: "100%",
    padding: 5,
    position: "absolute",
    bottom: 75,
  },
});
