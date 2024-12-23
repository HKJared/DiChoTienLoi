import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import shoppingCalenderStyle from "@/styles/Shopping/shopping";
import { colors } from "@/styles/variable";
import { getMarketCategories } from "@/api/marketplaceCategories";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Hàm lấy các ngày trong tháng hiện tại
const getDaysInCurrentMonth = () => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const days = [];
  for (
    let day = 1;
    day <= new Date(currentYear, currentMonth + 1, 0).getDate();
    day++
  ) {
    days.push(day);
  }
  return days;
};

const getDateOnly = (date: string): string => {
  if (date.includes("T")) {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString("en-GB"); // Format DD/MM/YYYY
  }
  return date;
};

const ShoppingCalender = ({
  onCreateNewSchedule,
  onDate,
  onItems = [],
  onListItems = [],
  onDeleteItem,
}: {
  onCreateNewSchedule: (date: string) => void;
  onDate: string | null;
  onItems: Array<any>;
  onListItems: Array<any>;
  onDeleteItem: any;
}) => {
  const days = getDaysInCurrentMonth();
  const today = new Date().getDate();
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedDay, setSelectedDay] = useState<number>(today);
  const [specialDays, setSpecialDays] = useState<number[]>([]);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [items, setItems] = useState();
  const [itemIdRemove, setItemIdRemove] = useState<number | null>(null);
  // console.log("onListItems", onListItems);
  // Cập nhật `specialDays` dựa trên `onListItems`
  useEffect(() => {
    if (onListItems) {
      const daysFromList = Object.keys(onListItems).map((day) =>
        parseInt(day, 10)
      );
      setSpecialDays((prevDays) => [
        ...new Set([...prevDays, ...daysFromList]),
      ]);
    }
  }, [onListItems]);
  useEffect(() => {
    // console.log("specialDays:", specialDays); // Log giá trị selectedDay
    // console.log("onItems:", onItems); // Log giá trị onItems

    if (onItems && specialDays) {
      const updatedItems = {
        [specialDays]: onItems,
      };
      // console.log("updatedItems:", updatedItems);
      setItems(updatedItems);
    }
  }, [onItems, specialDays]);
  const scrollViewRef = useRef<ScrollView>(null);

  // Cập nhật specialDays dựa trên onDate
  useEffect(() => {
    if (onDate) {
      const [day] = getDateOnly(onDate).split("/");
      const dayNumber = parseInt(day, 10);
      if (!specialDays.includes(dayNumber)) {
        setSpecialDays((prevDays) => [...prevDays, dayNumber]);
      }
    }
  }, [onDate]);
  // Cuộn đến ngày được chọn
  useEffect(() => {
    if (scrollViewRef.current) {
      const selectedDayIndex = days.indexOf(selectedDay);
      if (selectedDayIndex !== -1) {
        const itemWidth = 50;
        const offset = Math.max(selectedDayIndex * itemWidth - 150, 0);
        scrollViewRef.current.scrollTo({ x: offset, animated: true });
      }
    }
  }, [selectedDay]);

  const handleDayPress = (day: number) => {
    setSelectedDay(day);
    setSelectedItem(null);
  };

  const handlePress = (index: number, idItem) => {
    setSelectedItem(index);
    setItemIdRemove(idItem);
    console.log("index", index);
    console.log("idItem", idItem);
  };

  const isSpecialDay = (day: number) => specialDays.includes(day);
  const handleDelete = (daySelect, itemId) => {
    console.log("daySelect", daySelect, itemId);
    onDeleteItem(daySelect, itemId); // Gọi hàm xóa với daySelect và item.id
  };
  const renderNoSchedule = () => (
    <View style={shoppingCalenderStyle.containerNoSchedule}>
      <Image source={require("@/assets/images/shopping/noSchedule.png")} />
      <Text style={shoppingCalenderStyle.textNoSchedule}>
        Chưa có lịch mua sắm
      </Text>
      {selectedDay > today && (
        <TouchableOpacity
          style={shoppingCalenderStyle.createButton}
          onPress={() => {
            const selectedDate = `${selectedDay}/${new Date().getMonth() + 1}`;
            onCreateNewSchedule(selectedDate);
          }}
        >
          <Text style={shoppingCalenderStyle.textCreateButton}>Tạo mới</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getMarketCategories(); // Gọi API lấy danh sách categories
        setCategories(response); // Lưu kết quả vào state categories
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories(); // Gọi hàm fetchCategories khi component mount
  }, []);

  const renderScheduledItems = (daySelect: number) => {
    return (
      <View style={shoppingCalenderStyle.containerBoxData}>
        <View style={shoppingCalenderStyle.containerEditData}>
          <TouchableOpacity
            style={shoppingCalenderStyle.containerImg}
            onPress={() => handleDelete(daySelect, itemIdRemove)}
          >
            <Image
              source={require("@/assets/images/shopping/trash-outline.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity style={shoppingCalenderStyle.containerImg}>
            <Image source={require("@/assets/images/shopping/pencil.png")} />
          </TouchableOpacity>
        </View>

        <View style={shoppingCalenderStyle.containerDataToday}>
          {onListItems[daySelect].map((item, index) => {
            // Tìm kiếm category tương ứng với item.id
            const category = categories.categories.find(
              (cat) => cat.id === item.category_id
            );
            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  shoppingCalenderStyle.containerItemDataToday,
                  selectedItem === index &&
                    shoppingCalenderStyle.containerSelectedItemDataToday,
                ]}
                onPress={() => handlePress(index, item.id)}
              >
                <View style={shoppingCalenderStyle.containerWeight}>
                  <Text style={shoppingCalenderStyle.textWeight}>
                    {item.quantity} {item.unit}
                  </Text>
                </View>
                <View style={shoppingCalenderStyle.containerDetailProduct}>
                  <View
                    style={shoppingCalenderStyle.containerTextDetailProduct}
                  >
                    <Text style={shoppingCalenderStyle.textTitleProduct}>
                      {item.name}
                    </Text>
                    <View style={shoppingCalenderStyle.containerTypeTree}>
                      {/* Kiểm tra xem category có tồn tại không và hiển thị tên category */}
                      {category && (
                        <>
                          <Text style={shoppingCalenderStyle.textTypeTree}>
                            {category.name} {/* Hiển thị tên category */}
                          </Text>
                          <Text style={shoppingCalenderStyle.textTypeTree}>
                            {">"}
                          </Text>
                        </>
                      )}
                      <Text style={shoppingCalenderStyle.textTypeTree}>
                        {item.name}
                      </Text>
                    </View>
                    <View style={shoppingCalenderStyle.containerAddress}>
                      <View style={shoppingCalenderStyle.containerAddress1}>
                        <View
                          style={shoppingCalenderStyle.containerAddressDot}
                        ></View>
                        <Text style={shoppingCalenderStyle.textAddress1}>
                          <Text style={{ fontWeight: "bold" }}>Chợ Mơ:</Text> Số
                          459 P. Bạch Mai, Trương Định, Hai Bà Trưng, ...
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        {selectedItem !== null && (
          <View style={shoppingCalenderStyle.containerButtonSuccess}>
            <TouchableOpacity style={shoppingCalenderStyle.ButtonSuccess}>
              <Text style={shoppingCalenderStyle.textButtonSuccess}>
                Hoàn Thành
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={shoppingCalenderStyle.container}>
      <View style={shoppingCalenderStyle.containerCalenderToday}>
        <Text>{new Date().toLocaleDateString()}</Text>
      </View>
      <ScrollView
        horizontal
        style={shoppingCalenderStyle.containerCalender}
        showsHorizontalScrollIndicator={false}
        ref={scrollViewRef}
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
            {isSpecialDay(day) && (
              <View
                style={[
                  shoppingCalenderStyle.dotSpecial,
                  {
                    backgroundColor:
                      day === selectedDay ? colors.white : colors.primary,
                  },
                ]}
              ></View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
      {!isSpecialDay(selectedDay)
        ? renderNoSchedule()
        : renderScheduledItems(selectedDay)}
    </View>
  );
};

export default ShoppingCalender;
