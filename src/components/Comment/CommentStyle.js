// CommentStyle.js
import { StyleSheet } from "react-native";
import { COLOR } from "../../contants";

export const styleComment = StyleSheet.create({
  container: {
    marginBottom: 5,
    padding: 6,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderColor: COLOR.border_color,
  },
  userComment: {
    flexDirection: "row",
  },
  avatar_user: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  replyInput: {
    padding: 8,
    borderWidth: 1,
    marginRight: 5,
    borderColor: COLOR.border_color,
    borderRadius: 8,
    width: "80%",
  },
  sendReplyButton: {
    color: COLOR.offWhite,
    fontWeight: "bold",
  },
  replyContainer: {
    marginLeft: 12,
    marginVertical: 5,
  },
  replyContainers: {
    flexDirection: "row",
    gap: 2,
    alignItems: "center",
  },
  btnAction: {
    borderRadius: 10,
    backgroundColor: "#282828",
    padding: 10,
  },
  username: {
    fontWeight: "bold",
    marginLeft: 10,
  },
  timestamp: {
    color: COLOR.text_weak_color,
    marginTop: 5,
  },
  replyButton: {
    color: COLOR.primary_color,
    marginLeft: 10,
  },
});

export default styleComment;
