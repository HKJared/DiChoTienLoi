import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import shoppingCalenderStyle from "@/styles/Shopping/shopping";
import { colors } from "@/styles/variable";

const getTodayDate = () => {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  return `${day} tháng ${month}, ${year}`;
};

// Hàm lấy các ngày trong tháng hiện tại
const getDaysInCurrentMonth = () => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

  const days = [];
  for (
    let day = firstDayOfMonth.getDate();
    day <= lastDayOfMonth.getDate();
    day++
  ) {
    days.push(day);
  }

  return days;
};

const ShoppingCalender = ({
  onCreateNewSchedule,
}: {
  onCreateNewSchedule: (date: string) => void; // Truyền ngày đã chọn vào hàm này
}) => {
  const days = getDaysInCurrentMonth();
  const today = new Date().getDate();
  const [selectedDay, setSelectedDay] = useState<number | null>(today);

  // Hàm tạo selectedDate với định dạng "YYYY-MM-DDT00:00:00.000Z"
  const getSelectedDate = (day: number) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Cài đặt lại ngày, tháng, năm cho selectedDate
    const selectedDate = new Date(currentYear, currentMonth, day);
    return selectedDate.toISOString(); // Trả về định dạng ISO 8601 "YYYY-MM-DDT00:00:00.000Z"
  };

  const handleDayPress = (day: number) => {
    setSelectedDay(day);
  };

  // Kiểm tra xem ngày được chọn có phải là ngày sau hôm nay hay không
  const isFutureDaySelected = selectedDay && selectedDay > today;

  return (
    <View style={shoppingCalenderStyle.container}>
      <View style={shoppingCalenderStyle.containerCalenderToday}>
        <Text>{getTodayDate()}</Text>
      </View>
      {/* Lịch các ngày */}
      <ScrollView
        horizontal
        style={shoppingCalenderStyle.containerCalender}
        showsHorizontalScrollIndicator={false}
      >
        {days.map((day, index) => (
          <TouchableOpacity
            key={index}
            style={[
              shoppingCalenderStyle.containerItemCalender,
              {
                backgroundColor:
                  day === selectedDay ? colors.bluebg : colors.white90,
              },
            ]}
            activeOpacity={0.7}
            onPress={() => handleDayPress(day)}
          >
            <Text style={shoppingCalenderStyle.textItemCalender}>{day}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={shoppingCalenderStyle.containerNoSchedule}>
        <Image source={require("@/assets/images/shopping/noSchedule.png")} />
        <Text style={shoppingCalenderStyle.textNoSchedule}>
          Chưa có lịch mua sắm
        </Text>
        {/* Hiển thị button "Tạo mới" nếu có ngày nào sau hôm nay được chọn */}
        {isFutureDaySelected && (
          <TouchableOpacity
            style={shoppingCalenderStyle.createButton}
            onPress={() => {
              const selectedDate = getSelectedDate(selectedDay); // Lấy selectedDate theo định dạng ISO
              onCreateNewSchedule(selectedDate);
            }}
          >
            <Text style={shoppingCalenderStyle.textCreateButton}>Tạo mới</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ShoppingCalender;
