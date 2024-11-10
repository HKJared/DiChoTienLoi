// HeaderScheduleShopping.tsx
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import headerScheduleStyle from "@/styles/Shopping/headerScheduleShopping";

const HeaderScheduleShopping = ({
  onCreateNewSchedule,
}: {
  onCreateNewSchedule: (date: string) => void; // Thay đổi kiểu nhận tham số
}) => {
  return (
    <View style={headerScheduleStyle.containerHeader}>
      <TouchableOpacity
        style={headerScheduleStyle.containerLogo}
        onPress={() => onCreateNewSchedule("some_date_string")} // Truyền giá trị ngày
      >
        <Image
          source={require("@/assets/images/shopping/left-2_svgrepo.png")}
          style={headerScheduleStyle.iconHeader}
        />
      </TouchableOpacity>
      <View style={headerScheduleStyle.containerTrangChu}>
        <Text style={headerScheduleStyle.textTrangChu}>Lên lịch mua sắm</Text>
      </View>
      <View style={headerScheduleStyle.containerNotificationSetting}>
        <Image
          source={require("@/assets/images/header/header-item.png")}
          style={headerScheduleStyle.icon}
        />
        <Image
          source={require("@/assets/images/header/gear-settings_svgrepo.png")}
          style={headerScheduleStyle.icon}
        />
      </View>
    </View>
  );
};

export default HeaderScheduleShopping;
