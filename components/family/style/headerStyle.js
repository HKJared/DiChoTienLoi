import { StyleSheet } from "react-native";
import { colors } from "@/styles/variable";
const headerStyle = StyleSheet.create({
  containerHeader: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderStyle: "solid",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    elevation: 1, // Độ nổi header
  },
  containerLogo: {
    height: 56,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  textLogo: {
    fontFamily: "Roboto",
    color: "#000000",
    fontSize: 18,
    fontWeight: "bold",
  },
  containerTrangChu: {
    height: 56,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  textTrangChu: {
    fontFamily: "Roboto",
    color: colors.primary,
    fontSize: 18,
    fontWeight: "bold",
  },
  containerNotificationSetting: {
    height: 56,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 12,
  },
  icon: {
    width: 30,
    height: 30,
  },
  iconHeader: {
    width: 24,
    height: 24,
  },
});
export default headerStyle;
