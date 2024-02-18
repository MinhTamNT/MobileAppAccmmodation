import { StyleSheet } from "react-native";

export const postapproved = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  postContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  postImage: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginRight: 10,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  postContent: {
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    paddingHorizontal: 12,
    flexDirection: "row",
    gap: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
