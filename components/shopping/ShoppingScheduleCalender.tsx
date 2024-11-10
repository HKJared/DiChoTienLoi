import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { Calendar } from "react-native-calendars"; 
import shoppingScheduleStyle from "@/styles/Shopping/shoppingSchedule";

const getFormattedDate = (date: Date) => {
  const day = date.getDate();
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  return `${day} Tháng ${currentMonth}, ${currentYear}`;
};

const ShoppingScheduleCalender = ({
  selectedDate,
  onDateChange,
}: {
  selectedDate: string | null;
  onDateChange: (date: string) => void;
}) => {
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDayPress = (day: any) => {
    onDateChange(day.dateString);
    setShowCalendar(false);
  };

  // Chuyển đổi selectedDate sang đối tượng Date nếu có
  const selectedDateObject = selectedDate ? new Date(selectedDate) : null;

  // Cập nhật current để hiển thị đúng tháng của selectedDate hoặc ngày hiện tại nếu chưa chọn
  const currentDate = selectedDate || new Date().toISOString().split("T")[0];
  const [inputText, setInputText] = useState("");
  const [isSuggestionBoxVisible, setSuggestionBoxVisible] = useState(false);
  const toggleSuggestionBox = () => {
    setSuggestionBoxVisible(!isSuggestionBoxVisible);
  };
  return (
    <View style={shoppingScheduleStyle.container}>
      <View style={shoppingScheduleStyle.containerCalenderEdit}>
        <View style={shoppingScheduleStyle.calender}>
          <Image
            source={require("@/assets/images/shopping/today-outline.png")}
            style={shoppingScheduleStyle.iconCalender}
          />
          <Text>
            {selectedDateObject
              ? getFormattedDate(selectedDateObject)
              : "Chưa chọn ngày"}
          </Text>
        </View>

        <TouchableOpacity
          style={shoppingScheduleStyle.editCalender}
          onPress={() => setShowCalendar(!showCalendar)}
        >
          <Image
            source={require("@/assets/images/shopping/pencil.png")}
            style={shoppingScheduleStyle.iconCalender}
          />
        </TouchableOpacity>
      </View>

      {/* Hiển thị lịch khi showCalendar*/}
      {showCalendar && (
        <View style={shoppingScheduleStyle.calendarContainer}>
          <Calendar
            current={currentDate}
            onDayPress={handleDayPress}
            markedDates={{
              [selectedDate || ""]: {
                selected: true,
                selectedColor: "blue",
                selectedTextColor: "white",
              },
            }}
          />
        </View>
      )}
      {/* Search */}
      <View style={shoppingScheduleStyle.containerSearch}>
        {/* Thanh search */}
        <View style={shoppingScheduleStyle.containerInputSearch}>
          <View style={shoppingScheduleStyle.containerInput}>
            <TextInput
              style={shoppingScheduleStyle.input}
              placeholder="Tìm kiếm thực phẩm"
              value={inputText}
              onChangeText={setInputText}
              onFocus={() => setSuggestionBoxVisible(true)}
              onBlur={() => setSuggestionBoxVisible(false)}
            />
            <View style={shoppingScheduleStyle.lineHeight}></View>
            <TouchableOpacity
              style={shoppingScheduleStyle.containerImgSearch}
              onPress={() => setSuggestionBoxVisible(false)}
            >
              <Image
                source={require("@/assets/images/shopping/search-outline.png")}
                style={shoppingScheduleStyle.iconSearch}
              />
            </TouchableOpacity>
          </View>

          {/* Hộp gợi ý */}
          {isSuggestionBoxVisible && (
            <View style={shoppingScheduleStyle.suggestionBox}>
              <View style={shoppingScheduleStyle.suggestionItem}>
                <Text>Gợi ý 1</Text>
              </View>
              <Text style={shoppingScheduleStyle.suggestionItem}>Gợi ý 2</Text>
              <Text style={shoppingScheduleStyle.suggestionItem}>Gợi ý 3</Text>
            </View>
          )}
        </View>

        {/* Danh mục thực phẩm */}
        <View style={shoppingScheduleStyle.containerFoodCate}>
          <Text style={shoppingScheduleStyle.textFoodCate}>
            Danh mục thực phẩm
          </Text>
          <TouchableOpacity>
            <Text style={shoppingScheduleStyle.textShowFood}>Hiện</Text>
          </TouchableOpacity>
        </View>
        {/* Box food*/}
        <View></View>
      </View>
    </View>
  );
};

export default ShoppingScheduleCalender;
