import { StyleSheet } from "react-native";
import { colors } from "@/styles/variable";
const shoppingCalenderStyle = StyleSheet.create({
  container: {
    width: "100%",
    padding: 12,
    gap: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 8,
  },
  containerCalenderToday: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
  },
  containerCalender: {
    width: "100%",
    // justifyContent: "space-between",
    paddingVertical: 12,
    display: "flex",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#B7B7B7",
  },
  containerItemCalender: {
    marginRight: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white90,
  },
  textItemCalender: {
    // fontFamily: "Inter",
    fontWeight: "regular",
    fontSize: 14,
    color: colors.black80,
  },
  containerNoSchedule: {
    width: "100%",
    padding: 10,
    gap: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#E6EDF5",
    borderRadius: 4,
  },
  textNoSchedule: {
    // fontFamily: "Inter",
    fontWeight: "regular",
    fontSize: 11,
    color: colors.black60,
  },
  createButton: {
    height: 32,
    paddingHorizontal: 24,
    backgroundColor: colors.success, // Hoặc màu nào bạn muốn
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  textCreateButton: {
    // fontFamily: "Inter",
    color: colors.white,
    fontWeight: "regular",
    fontSize: 16,
  },
});
export default shoppingCalenderStyle;
