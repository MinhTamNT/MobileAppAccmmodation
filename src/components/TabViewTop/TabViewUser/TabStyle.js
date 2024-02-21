import { StyleSheet } from "react-native";
import { COLOR } from "../../../contants";

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
    paddingHorizontal: 12,
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

  addCommentContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: 16,
    borderTopColor: "#ccc",
  },
  actionComment: {
    backgroundColor: "#181818",
    padding: 10,
    width: 120,
    borderRadius: 10,
    marginTop: 10,
  },
  commentInput: {
    flex: 1,
    height: 40,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingLeft: 10,
  },
  btnCloseActionComment: {
    position: "absolute",
    right: 12,
    top: -17,
  },
});
