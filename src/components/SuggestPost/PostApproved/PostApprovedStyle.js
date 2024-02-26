import { StyleSheet } from "react-native";

export const postapproved = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  postContainer: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageUser: {
    width: 50,
    height: 50,
    resizeMode: "cover",
    borderRadius: 50,
    marginBottom: 10,
  },
  postImage: {
    width: 150,
    height: 150,
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
