import { Dimensions, Platform, StyleSheet } from "react-native";
import { COLOR } from "../../contants";
const { width } = Dimensions.get("window");
export const postStyle = StyleSheet.create({
  wrapper: {
    flexDirection: "column",
    backgroundColor:COLOR.offWhite,
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
    marginTop: 10,
    width: 380,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#ccc",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
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
    paddingHorizontal: 10,
  },
  detail: {
    width: "100%",
    padding: 5,
    position: "absolute",
    bottom: 75,
  },

  // Post Detail
  detailConatiner: {
    flex: 1,
  },
  upperRow: {
    marginHorizontal: 20,
    marginTop: 5,
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    top: 40,
    zIndex: 999,
  },
  imageDetail: {
    aspectRatio: 1,
    resizeMode: "cover",
  },

  postDetail: {
    marginTop: -5,
    backgroundColor: "#fff",
    borderTopLeftRadius: 11,
    borderTopRightRadius: 11,
    height: "100%",
  },
  titlecol: {
    marginHorizontal: 20,
    paddingBottom: 12,
    flexDirection: "column",
    top: Platform.OS === "ios" ? 20 : 10,
    width: width - 44,
  },
  onwerPost: {
    marginTop: 10,
    width: 350,
    height: 100,
    backgroundColor: "white",
    marginHorizontal: 10,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  commentPost: {
    borderBottomWidth: 1,
    paddingVertical: 10,
    marginTop: 10,
    borderBottomColor: COLOR.text_weak_color,
  },
  contetPost: {
    borderBottomWidth: 1,
    borderBottomColor: COLOR.text_weak_color,
    paddingVertical: 10,
  },
  postDescription: {
    fontSize: 16,
  },
  postDescriptionCollapsed: {
    overflow: "hidden",
  },
  postDescriptionToggle: {
    color: "#3498db",
    fontWeight: "bold",
    textDecorationLine: "underline",
    marginTop: 5,
  },
  footerPost: {
    height: 80,
    padding: 6,
    borderTopLeftRadius: 11,
    borderTopRightRadius: 11,
    backgroundColor: "#ffff",
  },
  btnAction: {
    backgroundColor: COLOR.PRIMARY,
    padding: 7,
    borderRadius: 10,
  },
});
