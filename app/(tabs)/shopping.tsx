import {
  Image,
  StyleSheet,
  Platform,
  StatusBar,
  View,
  Text,
} from "react-native";
import Header from "@/components/Header";
import HeaderScheduleShopping from "@/components/shopping/HeaderScheduleShopping";
import ShoppingCalender from "@/components/shopping/ShoppingCalender";
import ShoppingScheduleCalender from "@/components/shopping/ShoppingScheduleCalender";
import React, { useState } from "react";

export default function ShoppingScreen() {
  const [isScheduleMode, setIsScheduleMode] = useState(false); // state Header
  const [selectedDate, setSelectedDate] = useState<string | null>(null); // state lưu ngày đã chọn
  const [items, setItems] = useState<any[]>([]);
  const handleDateChange = (newDate: string) => {
    setSelectedDate(newDate); // Cập nhật ngày khi người dùng chọn ngày mới
  };
  const handleCreateNewSchedule = (date: string) => {
    setSelectedDate(date);
    setIsScheduleMode(!isScheduleMode);
  };
  const handleItemsComplete = (
    newItems: any[],
    selectedUnits: any[],
    countItem: any[]
  ) => {
    setItems(newItems); // Cập nhật items từ component con
    console.log("selectedDate", selectedDate);
    console.log("Danh sách items hoàn thành:", newItems);
    console.log("Danh sách đơn vị items:", selectedUnits);
    console.log("Số lượng mỗi items:", countItem);
    setIsScheduleMode(false); // Thoát chế độ Schedule (nếu cần)
  };
  return (
    <View>
      <StatusBar hidden={true} />
      {isScheduleMode ? (
        <HeaderScheduleShopping onCreateNewSchedule={handleCreateNewSchedule} />
      ) : (
        <Header title="Mua sắm" />
      )}
      <View style={styles.containerShoppingCalender}>
        {!isScheduleMode ? (
          <ShoppingCalender
            onCreateNewSchedule={handleCreateNewSchedule}
            onDate={selectedDate}
          />
        ) : (
          <ShoppingScheduleCalender
            selectedDate={selectedDate}
            onDateChange={handleDateChange}
            onComplete={handleItemsComplete}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerShoppingCalender: {
    width: "100%",
    paddingHorizontal: 12,
    paddingVertical: 24,
    // flexGrow: 1,
  },
});
