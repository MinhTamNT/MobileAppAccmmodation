import { StyleSheet } from "react-native";

export const styleTab = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  btnCreatePost: {
    backgroundColor: "#333",
    position: "absolute",
    bottom: 50,
    padding: 10,
    right: 12,
    borderRadius: 10,
    zIndex: 999,
  },
  postWrapper: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginBottom: 10,
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  ownerPost: {},
});
