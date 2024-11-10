import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import headerStyle from "@/styles/header";
const Header = () => {
  return (
    <View style={headerStyle.containerHeader}>
      <View style={headerStyle.containerLogo}>
        <Text style={headerStyle.textLogo}>Logo</Text>
      </View>
      <View style={headerStyle.containerTrangChu}>
        <Text style={headerStyle.textTrangChu}>Trang Chủ</Text>
      </View>
      <View style={headerStyle.containerNotificationSetting}>
        <Image
          source={require("@/assets/images/header/header-item.png")}
          style={headerStyle.icon}
        />
        <Image
          source={require("@/assets/images/header/gear-settings_svgrepo.png")}
          style={headerStyle.icon}
        />
      </View>
    </View>
  );
};

export default Header;
