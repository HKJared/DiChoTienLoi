import React, { useState } from "react";
import { View, StatusBar, StyleSheet } from "react-native";
import HeaderScheduleShopping from "@/components/shopping/HeaderScheduleShopping";
import ShoppingCalender from "@/components/shopping/ShoppingCalender";
import ShoppingScheduleCalender from "@/components/shopping/ShoppingScheduleCalender";
import Header from "@/components/Header";
import Fridge from "@/components/fridge/Fridge";
export default function ShoppingScreen() {
  const [isScheduleMode, setIsScheduleMode] = useState(false); // State Header
  const [selectedDate, setSelectedDate] = useState<string | null>(null); // Lưu ngày đã chọn
  const [itemsByDay, setItemsByDay] = useState<Record<string, any[]>>({}); // Lưu trữ lịch sử theo ngày

  // Lấy ngày từ chuỗi `selectedDate`
  const getDayFromDate = (date: string | null): string | null => {
    return date ? date.split("/")[0] : null; // Lấy phần ngày (trước dấu "/")
  };

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
    // Tạo danh sách các mục mới
    const updatedItems = newItems.map((item) => {
      const unit = selectedUnits[item.id];
      const count = countItem[item.id];
      return {
        ...item,
        quantity: count,
        unit: unit,
      };
    });

    // Lấy ngày từ `selectedDate`
    const day = getDayFromDate(selectedDate);

    if (day) {
      // Lưu trữ theo ngày (chỉ số ngày)
      setItemsByDay((prevItemsByDay) => ({
        ...prevItemsByDay,
        [day]: updatedItems, // Gán các mục vào ngày
      }));
    }

    setIsScheduleMode(false); // Thoát chế độ Schedule
  };

  // Hàm xóa item theo index trong ngày
  const handleDeleteItem = (daySelect: any, itemId: any) => {
    console.log("removeItem", daySelect);
    console.log("id", itemId);

    if (daySelect && itemsByDay[daySelect]) {
      // Lọc bỏ item có itemId cần xóa
      const updatedItems = itemsByDay[daySelect].filter(
        (item) => item.id !== itemId
      );

      // Cập nhật lại danh sách itemsByDay sau khi xóa
      setItemsByDay((prevItemsByDay) => ({
        ...prevItemsByDay,
        [daySelect]: updatedItems, // Cập nhật ngày cụ thể
      }));
    }
  };

  // console.log("Items By Day", itemsByDay);
  // console.log("Selected Day", getDayFromDate(selectedDate));

  return (
    <View>
      <StatusBar hidden={true} />
      <Header title="Tủ lạnh" />
      <View style={styles.containerShoppingCalender}>
        <Fridge
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
          onComplete={handleItemsComplete}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerShoppingCalender: {
    width: "100%",
    paddingHorizontal: 12,
    paddingVertical: 24,
  },
});
