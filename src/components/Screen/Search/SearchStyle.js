import { Dimensions, Platform, StyleSheet } from "react-native";
import { COLOR } from "../../../contants";

const { width, height } = Dimensions.get("window");
export const SearchStyles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    paddingHorizontal: 16,
    marginTop: 10,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  header_content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  InpuStyle: {
    borderRadius: 10,
    paddingLeft: 12,
    height: 40,
    paddingVertical: 4,
    borderWidth: 1,
    width: "70%",
    borderColor: "gray",
  },
  header_action: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 5,
    borderWidth: 1,
    height: 40,
    borderColor: "gray",
  },
  actionProvince: {
    flexDirection: "row",
    alignItems: "center",
    borderRightWidth: 0.5,
    borderColor: COLOR.text_weak_color,
  },
  actionDistrict: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerAction_Select: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  fakePost: {
    height: 250,
    marginHorizontal: 16,
    borderRadius: 8,
    marginTop: 26,
    justifyContent: "center",
    backgroundColor: "#22222222",
  },
});
