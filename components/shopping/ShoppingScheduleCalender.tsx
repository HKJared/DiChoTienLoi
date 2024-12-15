import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { colors } from "@/styles/variable";
import React, { useState, useEffect } from "react";
import { Calendar } from "react-native-calendars"; // Thư viện lịch
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
    if (day && day.dateString) {
      onDateChange(day.dateString);
      setShowCalendar(false);
    } else {
      // Handle the case when day or day.dateString is not available
      console.error("Invalid day object", day);
    }
  };

  // Chuyển đổi selectedDate sang đối tượng Date nếu có
  const selectedDateObject = selectedDate ? new Date(selectedDate) : null;

  // Cập nhật current để hiển thị đúng tháng của selectedDate hoặc ngày hiện tại nếu chưa chọn
  const currentDate = selectedDate || new Date().toISOString().split("T")[0];
  const [inputText, setInputText] = useState("");
  // const [inputTextShopping, setInputTextShopping] = useState("");
  const [isSuggestionBoxVisible, setSuggestionBoxVisible] = useState(false);
  const [isShowFood, setShowFood] = useState(false);
  const toggleSuggestionBox = () => {
    setSuggestionBoxVisible(!isSuggestionBoxVisible);
  };
  const handleShowFoodCate = () => {
    setShowFood(!isShowFood);
  };

  const foodItems = [
    {
      id: 1,
      name: "Thực phẩm tươi sống",
      image: require("@/assets/images/shopping/nocatefood.png"),
    },
    {
      id: 2,
      name: "Rau củ quả",
      image: require("@/assets/images/shopping/nocatefood.png"),
    },
    {
      id: 3,
      name: "Thực phẩm chế biến sẵn",
      image: require("@/assets/images/shopping/nocatefood.png"),
    },
    {
      id: 4,
      name: "Gia vị",
      image: require("@/assets/images/shopping/nocatefood.png"),
    },
    {
      id: 5,
      name: "Trái cây",
      image: require("@/assets/images/shopping/nocatefood.png"),
    },
    {
      id: 6,
      name: "Táo",
      image: require("@/assets/images/shopping/nocatefood.png"),
    },
    {
      id: 7,
      name: "Lê",
      image: require("@/assets/images/shopping/nocatefood.png"),
    },
    {
      id: 8,
      name: "Ổi",
      image: require("@/assets/images/shopping/nocatefood.png"),
    },
    {
      id: 9,
      name: "Bưởi",
      image: require("@/assets/images/shopping/nocatefood.png"),
    },
    {
      id: 10,
      name: "Thịt kho tàu",
      image: require("@/assets/images/shopping/nocatefood.png"),
    },
  ];
  const [isUnitBoxVisible, setIsUnitBoxVisible] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState("kg");

  const units = ["kg", "lạng", "gram", "đôi", "lít"];

  const handleUnitPress = (unit: string) => {
    setSelectedUnit(unit); // Cập nhật đơn vị đã chọn
    setIsUnitBoxVisible(false); // Ẩn box lựa chọn khi đã chọn đơn vị
  };

  const [visibleUnitIndex, setVisibleUnitIndex] = useState<number | null>(null);

  const items = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    name: `Gạo ${index + 1}`,
    type: "Nhu yếu phẩm",
    image: require("@/assets/images/shopping/NoItemFood.png"),
  }));
  interface Item {
    id: number;
    name: string;
    type: string;
    image: any;
  }
  // Gạo
  const [inputTextShopping, setInputTextShopping] = useState<
    Record<number, string>
  >(items.reduce((acc, item) => ({ ...acc, [item.id]: "" }), {}));

  // Hàm cập nhật giá trị của TextInput
  const handleInputChange = (id: number, value: string) => {
    setInputTextShopping((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      style={shoppingScheduleStyle.container}
      showsVerticalScrollIndicator={false}
    >
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

      {/* Hiển thị lịch khi showCalendar */}
      {showCalendar && (
        <View style={shoppingScheduleStyle.calendarContainer}>
          <Calendar
            // Sử dụng selectedDate nếu đã chọn, nếu không thì dùng currentDate
            current={selectedDate || currentDate}
            onDayPress={handleDayPress}
            markedDates={
              selectedDate
                ? {
                    [selectedDate]: {
                      selected: true,
                      selectedColor: "blue",
                      selectedTextColor: "white",
                    },
                  }
                : {}
            }
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
              {/* item */}
              <View style={shoppingScheduleStyle.suggestionItem}>
                <View style={shoppingScheduleStyle.suggestionItem_box}>
                  {/* Ảnh và tên */}
                  <View style={shoppingScheduleStyle.containerImgNameFood}>
                    <Image
                      source={require("@/assets/images/shopping/NoItemFood.png")}
                      style={shoppingScheduleStyle.iconNoItemFood}
                    />
                    <View style={shoppingScheduleStyle.containerDetailFood}>
                      <Text style={shoppingScheduleStyle.textNameFood}>
                        Gạo
                      </Text>
                      <Text style={shoppingScheduleStyle.textTypeFood}>
                        Nhu yếu phẩm
                      </Text>
                    </View>
                  </View>
                  {/* btn Thêm */}
                  <TouchableOpacity>
                    <Text style={shoppingScheduleStyle.textaddFood}>Thêm</Text>
                  </TouchableOpacity>
                </View>
              </View>
              {/* item */}
              <View style={shoppingScheduleStyle.suggestionItem}>
                <View style={shoppingScheduleStyle.suggestionItem_box}>
                  {/* Ảnh và tên */}
                  <View style={shoppingScheduleStyle.containerImgNameFood}>
                    <Image
                      source={require("@/assets/images/shopping/NoItemFood.png")}
                      style={shoppingScheduleStyle.iconNoItemFood}
                    />
                    <View style={shoppingScheduleStyle.containerDetailFood}>
                      <Text style={shoppingScheduleStyle.textNameFood}>
                        Gạo
                      </Text>
                      <Text style={shoppingScheduleStyle.textTypeFood}>
                        Nhu yếu phẩm
                      </Text>
                    </View>
                  </View>
                  {/* btn Thêm */}
                  <TouchableOpacity>
                    <Text style={shoppingScheduleStyle.textaddFood}>Thêm</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </View>

        {/* Danh mục thực phẩm */}
        <View style={shoppingScheduleStyle.containerFoodCate}>
          <Text style={shoppingScheduleStyle.textFoodCate}>
            Danh mục mua sắm
          </Text>
          <TouchableOpacity onPress={handleShowFoodCate}>
            <Text style={shoppingScheduleStyle.textShowFood}>
              {isShowFood ? "Ẩn" : "Hiện"}
            </Text>
          </TouchableOpacity>
        </View>
        {/* Box food*/}
        {isShowFood ? (
          <View style={shoppingScheduleStyle.boxListFood}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {foodItems.map((item) => (
                <View key={item.id} style={shoppingScheduleStyle.boxItemFood}>
                  <View style={shoppingScheduleStyle.containerImgFood}>
                    <Image source={item.image} />
                  </View>
                  <View style={shoppingScheduleStyle.containerTextFood}>
                    <Text style={shoppingScheduleStyle.textFood}>
                      {item.name}
                    </Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        ) : (
          ""
        )}
      </View>
      {/* Danh sách mua sắm */}
      <View style={shoppingScheduleStyle.containerCateShopping}>
        <Text style={shoppingScheduleStyle.textShoppingCate}>
          Danh sách mua sắm
        </Text>
        <ScrollView style={shoppingScheduleStyle.containerListCateShopping}>
          {items.map((item, index) => (
            <View
              key={item.id}
              style={[
                shoppingScheduleStyle.containerItemCateShopping,
                index === items.length - 1 && { marginBottom: 20 },
              ]}
            >
              {/* Ảnh và tên */}
              <View style={shoppingScheduleStyle.containerImgNameFood}>
                <Image
                  source={item.image}
                  style={shoppingScheduleStyle.iconNoItemFood}
                />
                <View style={shoppingScheduleStyle.containerDetailFood}>
                  <Text style={shoppingScheduleStyle.textNameFood}>
                    {item.name}
                  </Text>
                  <Text style={shoppingScheduleStyle.textTypeFood}>
                    {item.type}
                  </Text>
                </View>
              </View>
              {/* btn Số lượng */}
              <View style={shoppingScheduleStyle.containerInputCateShopping}>
                <TextInput
                  style={shoppingScheduleStyle.inputShopping}
                  placeholder="Số lượng"
                  placeholderTextColor={colors.white60}
                  value={inputTextShopping[item.id]} // Giá trị riêng biệt cho mỗi item
                  onChangeText={(value) => handleInputChange(item.id, value)} // Cập nhật giá trị tương ứng
                />
                <View style={shoppingScheduleStyle.countFood}>
                  <View style={shoppingScheduleStyle.lineHeight}></View>
                  <TouchableOpacity
                    style={shoppingScheduleStyle.countUnit}
                    onPress={() => {
                      // Toggle visibility cho phần tử hiện tại
                      setVisibleUnitIndex(
                        visibleUnitIndex === index ? null : index
                      );
                    }}
                  >
                    <Text style={shoppingScheduleStyle.unitText}>
                      {selectedUnit}
                    </Text>
                    <Image
                      source={require("@/assets/images/shopping/arrow_bottom.png")}
                    />
                    {/* Hiển thị box lựa chọn đơn vị nếu isUnitBoxVisible là true */}
                    {visibleUnitIndex === index && (
                      <View style={shoppingScheduleStyle.unitBox}>
                        {units.map((unit) => (
                          <TouchableOpacity
                            key={unit}
                            style={shoppingScheduleStyle.unitItem}
                            onPress={() => handleUnitPress(unit)}
                          >
                            <Text style={shoppingScheduleStyle.unitText}>
                              {unit}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default ShoppingScheduleCalender;
