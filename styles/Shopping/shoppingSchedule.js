import { StyleSheet } from "react-native";
import { colors } from "@/styles/variable";
const shoppingScheduleStyle = StyleSheet.create({
  container: {
    width: "100%",
    gap: 16,
    display: "flex",
    flexDirection: "column",
  },
  containerCalenderEdit: {
    padding: 10,
    backgroundColor: colors.white,
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  calender: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  iconCalender: {
    width: 20,
    height: 20,
  },
  editCalender: {
    borderRadius: 4,
    width: 24,
    height: 24,
    backgroundColor: colors.white90,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  calendarContainer: {
    position: "absolute",
    width: "100%",
    top: 60,
    overflow: "hidden",
    zIndex: 2,
  },
  containerSearch: {
    width: "100%",
    padding: 10,
    gap: 16,
    display: "flex",
    flexDirection: "column",
    backgroundColor: colors.white,
    borderRadius: 8,
  },
  containerInputSearch: {
    width: "100%",
    borderRadius: 4,
    display: "flex",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.white60,
    borderRadius: 4,
    alignItems: "center",
  },
  input: {
    height: 40,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 4,
    width: "88%",
  },
  containerImgSearch: {
    width: 32,
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  iconSearch: {
    width: 26,
    height: 26,
    marginRight: 4,
  },
  lineHeight: {
    width: 1,
    height: 28,
    backgroundColor: colors.white60,
    marginHorizontal: 4,
  },
  containerFoodCate: {
    width: "100%",
    paddingBottom: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textFoodCate: {
    // fontFamily: "Inter",
    fontSize: 12,
    fontWeight: "medium",
    color: colors.black80,
  },
  textShowFood: {
    // fontFamily: "Inter",
    fontSize: 12,
    fontWeight: "medium",
    color: colors.primary,
  },
  suggestionBox: {
    width: "100%",
    borderRadius: 4,
    borderBottomWidth: 1,
    borderBottomColor: colors.white60,
    display: "flex",
    flexDirection: "column",
  },
  suggestionItem: {
    width: "100%",
    display: "flex",
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
});
export default shoppingScheduleStyle;