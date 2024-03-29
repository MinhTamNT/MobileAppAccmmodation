import { StyleSheet } from "react-native";
import { COLOR } from "../../../contants";

export const Homestyle = StyleSheet.create({
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
  pl_14: {
    paddingLeft: 14,
  },
  pr_14: {
    paddingRight: 14,
  },
  pH_14: {
    paddingHorizontal: 14,
  },
  flex_row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  text_HomeCrad: {
    fontSize: 18,
    fontWeight: "bold",
  },
  text_2: {
    fontSize: 18,
    opacity: 0.2,
  },
  unreadCountContainer: {
    position: "absolute",
    right: 0,
    top: -10,
    backgroundColor: COLOR.PRIMARY,
    paddingHorizontal: 3,
    borderRadius: 10,
  },
  unreadCountText: {
    color: "white",
  },
});
