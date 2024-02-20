import { StyleSheet } from "react-native";
import { COLOR } from "../../../contants";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content_header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 30,
  },
  header_title: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },

  title_hello: {
    flexDirection: "row",
    gap: 4,
  },

  text_title: {
    fontSize: 14,
    fontWeight: "500",
  },
  text_titleAdmin: {
    fontSize: 20,
    fontWeight: "500",
  },
  address: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  header_action: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  headerAction: {
    backgroundColor: COLOR.PRIMARY,
    padding: 10,
    marginHorizontal: 12,
    borderRadius: 10,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 5,
  },
  action_search: {
    padding: 12,
  },
  inputSearch: {
    backgroundColor: COLOR.offWhite,
    marginTop: 10,
  },
});
