import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import shoppingCalenderStyle from "@/styles/Shopping/shopping";
import { colors } from "@/styles/variable";
import {
  getMarketCategories,
  getMarketItems,
} from "@/api/marketplaceCategories";
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
  onDate,
}: {
  onCreateNewSchedule: (date: string) => void;
  onDate: string | null;
}) => {
  const days = getDaysInCurrentMonth();
  const today = new Date().getDate();
  const [selectedDay, setSelectedDay] = useState<number | null>(today);

  // Tham chiếu ScrollView
  const scrollViewRef = useRef<ScrollView>(null);

  // Danh sách các ngày đặc biệt
  const specialDays = [];

  // Hàm tạo selectedDate với định dạng "YYYY-MM-DDT00:00:00.000Z"
  const getSelectedDate = (day: number) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const selectedDate = new Date(currentYear, currentMonth, day);
    return selectedDate.toISOString();
  };

  const handleDayPress = (day: number) => {
    setSelectedDay(day);
    setSelectedItem(null);
  };

  // Kiểm tra xem ngày được chọn có phải là ngày đặc biệt không
  const isSpecialDay = (day: number) => {
    return specialDays.includes(day);
  };

  // Kiểm tra xem ngày được chọn có phải là ngày trong tương lai
  const isFutureDaySelected = selectedDay && selectedDay > today;

  // Effect để cuộn đến ngày đã chọn khi `selectedDay` thay đổi
  useEffect(() => {
    if (selectedDay && scrollViewRef.current) {
      const selectedDayIndex = days.indexOf(selectedDay);
      if (selectedDayIndex !== -1) {
        const screenWidth = 360;
        const itemWidth = 50;
        const centerOffset = (screenWidth - itemWidth) / 2;

        scrollViewRef.current.scrollTo({
          x: selectedDayIndex * itemWidth - centerOffset,
          animated: true,
        });
      }
    }
  }, [selectedDay]);
  const getTodayDate = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1; // Tháng bắt đầu từ 0, nên cộng thêm 1
    const year = today.getFullYear();
    return `${day} tháng ${month}, ${year}`;
  };
  const [selectedItem, setSelectedItem] = useState(null);

  const handlePress = (index) => {
    setSelectedItem(index);
  };

  // const getDateOnly = (date: string): string => {
  //   // Kiểm tra xem date có chứa dấu 'T' (dạng ISO) hay không
  //   if (date.includes("T")) {
  //     // Nếu là dạng ISO, tạo đối tượng Date và chuyển đổi về định dạng YYYY-MM-DD
  //     const dateObj = new Date(date);
  //     return dateObj.toLocaleDateString("en-GB"); // Sử dụng 'en-GB' để đảm bảo định dạng ngày là "DD/MM/YYYY"
  //   }
  //   // Nếu là dạng "YYYY-MM-DD", trả về như cũ
  //   return date;
  // };
  // const dateOnly = getDateOnly(onDate); // "30/12/2024"
  // const [day, month, year] = dateOnly.split("/"); // Tách thành [day, month, year]
  // const dayNumber = parseInt(day, 10); // Chuyển ngày thành số nguyên

  // // Thêm ngày vào mảng specialDays nếu chưa có trong đó
  // if (!specialDays.includes(dayNumber)) {
  //   specialDays.push(dayNumber);
  // }

  // console.log("Mảng specialDays sau khi thêm ngày:", specialDays);

  return (
    <View style={shoppingCalenderStyle.container}>
      <View style={shoppingCalenderStyle.containerCalenderToday}>
        <Text>{getTodayDate()}</Text>
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

            {/* Kiểm tra nếu ngày là đặc biệt và thay đổi màu sắc dotSpecial */}
            {isSpecialDay(day) && (
              <View
                style={[
                  shoppingCalenderStyle.dotSpecial,
                  {
                    backgroundColor:
                      day === selectedDay ? colors.white : colors.primary, // Nếu ngày đã chọn thì dùng màu xanh, không thì dùng màu xám
                  },
                ]}
              ></View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {!isSpecialDay(selectedDay) ? (
        <View style={shoppingCalenderStyle.containerNoSchedule}>
          <Image source={require("@/assets/images/shopping/noSchedule.png")} />
          <Text style={shoppingCalenderStyle.textNoSchedule}>
            Chưa có lịch mua sắm
          </Text>
          {isFutureDaySelected && (
            <TouchableOpacity
              style={shoppingCalenderStyle.createButton}
              onPress={() => {
                const selectedDate = getSelectedDate(selectedDay!); // Lấy selectedDate theo định dạng ISO
                onCreateNewSchedule(selectedDate);
              }}
            >
              <Text style={shoppingCalenderStyle.textCreateButton}>
                Tạo mới
              </Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View style={shoppingCalenderStyle.containerBoxData}>
          {/* Xóa sửa */}
          <View style={shoppingCalenderStyle.containerEditData}>
            <TouchableOpacity style={shoppingCalenderStyle.containerImg}>
              <Image
                source={require("@/assets/images/shopping/trash-outline.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity style={shoppingCalenderStyle.containerImg}>
              <Image source={require("@/assets/images/shopping/pencil.png")} />
            </TouchableOpacity>
          </View>
          {/* Data ngày */}
          <View style={shoppingCalenderStyle.containerDataToday}>
            {/* Item data */}
            <TouchableOpacity
              style={[
                shoppingCalenderStyle.containerItemDataToday,
                selectedItem === 1 &&
                  shoppingCalenderStyle.containerSelectedItemDataToday, // Thay đổi màu nếu mục được chọn
              ]}
              onPress={() => handlePress(1)}
            >
              <View style={shoppingCalenderStyle.containerWeight}>
                <Text style={shoppingCalenderStyle.textWeight}>50kg</Text>
              </View>
              <View style={shoppingCalenderStyle.containerDetailProduct}>
                {/* Thông tin */}
                <View style={shoppingCalenderStyle.containerTextDetailProduct}>
                  {/* Tên sản phẩm */}
                  <Text style={shoppingCalenderStyle.textTitleProduct}>
                    Gạo ST25
                  </Text>
                  {/* Loại > Gạo  */}
                  <View style={shoppingCalenderStyle.containerTypeTree}>
                    <Text style={shoppingCalenderStyle.textTypeTree}>
                      Ngũ cốc
                    </Text>
                    <Text style={shoppingCalenderStyle.textTypeTree}>
                      {">"}
                    </Text>
                    <Text style={shoppingCalenderStyle.textTypeTree}>Gạo</Text>
                  </View>
                  {/* Địa chỉ */}
                  <View style={shoppingCalenderStyle.containerAddress}>
                    {/* Địa chỉ-1 */}
                    <View style={shoppingCalenderStyle.containerAddress1}>
                      <View
                        style={shoppingCalenderStyle.containerAddressDot}
                      ></View>
                      <View style={shoppingCalenderStyle.containertextAddress1}>
                        <Text style={shoppingCalenderStyle.textAddress1}>
                          <Text style={{ fontWeight: "bold" }}>
                            Chợ Thịnh Liệt:
                          </Text>{" "}
                          Kho 4 Đ. Giải Phóng, Thịnh Liệt, ...
                        </Text>
                      </View>
                    </View>
                    {/* Địa chỉ-2 */}
                    <View style={shoppingCalenderStyle.containerAddress1}>
                      <View
                        style={shoppingCalenderStyle.containerAddressDot}
                      ></View>
                      <View style={shoppingCalenderStyle.containertextAddress1}>
                        <Text style={shoppingCalenderStyle.textAddress1}>
                          <Text style={{ fontWeight: "bold" }}>Chợ Mơ:</Text> Số
                          459 P. Bạch Mai, Trương Định, Hai Bà Trưng, ...
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                {/* Btn arrow right */}
              </View>
            </TouchableOpacity>
            {/* Item data */}
            <TouchableOpacity
              style={[
                shoppingCalenderStyle.containerItemDataToday,
                selectedItem === 2 &&
                  shoppingCalenderStyle.containerSelectedItemDataToday, // Thay đổi màu nếu mục được chọn
              ]}
              onPress={() => handlePress(2)}
            >
              <View style={shoppingCalenderStyle.containerWeight}>
                <Text style={shoppingCalenderStyle.textWeight}>50kg</Text>
              </View>
              <View style={shoppingCalenderStyle.containerDetailProduct}>
                {/* Thông tin */}
                <View style={shoppingCalenderStyle.containerTextDetailProduct}>
                  {/* Tên sản phẩm */}
                  <Text style={shoppingCalenderStyle.textTitleProduct}>
                    Gạo ST25
                  </Text>
                  {/* Loại > Gạo  */}
                  <View style={shoppingCalenderStyle.containerTypeTree}>
                    <Text style={shoppingCalenderStyle.textTypeTree}>
                      Ngũ cốc
                    </Text>
                    <Text style={shoppingCalenderStyle.textTypeTree}>
                      {">"}
                    </Text>
                    <Text style={shoppingCalenderStyle.textTypeTree}>Gạo</Text>
                  </View>
                  {/* Địa chỉ */}
                  <View style={shoppingCalenderStyle.containerAddress}>
                    {/* Địa chỉ-1 */}
                    <View style={shoppingCalenderStyle.containerAddress1}>
                      <View
                        style={shoppingCalenderStyle.containerAddressDot}
                      ></View>
                      <View style={shoppingCalenderStyle.containertextAddress1}>
                        <Text style={shoppingCalenderStyle.textAddress1}>
                          <Text style={{ fontWeight: "bold" }}>
                            Chợ Thịnh Liệt:
                          </Text>{" "}
                          Kho 4 Đ. Giải Phóng, Thịnh Liệt, ...
                        </Text>
                      </View>
                    </View>
                    {/* Địa chỉ-2 */}
                    <View style={shoppingCalenderStyle.containerAddress1}>
                      <View
                        style={shoppingCalenderStyle.containerAddressDot}
                      ></View>
                      <View style={shoppingCalenderStyle.containertextAddress1}>
                        <Text style={shoppingCalenderStyle.textAddress1}>
                          <Text style={{ fontWeight: "bold" }}>Chợ Mơ:</Text> Số
                          459 P. Bạch Mai, Trương Định, Hai Bà Trưng, ...
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                {/* Btn arrow right */}
              </View>
            </TouchableOpacity>
          </View>
          {/* Button Hoàn Thành */}
          {selectedItem && (
            <View style={shoppingCalenderStyle.containerButtonSuccess}>
              <TouchableOpacity style={shoppingCalenderStyle.ButtonSuccess}>
                <Text style={shoppingCalenderStyle.textButtonSuccess}>
                  Hoàn Thành
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default ShoppingCalender;
