import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";
import { colors } from "@/styles/variable";
import {
  getMarketCategories,
  getMarketItems,
} from "@/api/marketplaceCategories";
import React, { useState, useEffect } from "react";
import { Calendar } from "react-native-calendars"; // Thư viện lịch
import shoppingScheduleStyle from "@/styles/Shopping/shoppingSchedule";
import BASE_HOST_URL from "@/api/baseHostUrl";
const getFormattedDate = (date: Date) => {
  const day = date.getDate();
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  return `${day} Tháng ${currentMonth}, ${currentYear}`;
};

const ShoppingScheduleCalender = ({
  selectedDate,
  onDateChange,
  onComplete,
}: {
  selectedDate: string | null;
  onDateChange: (date: string) => void;
  onComplete: (items: any[], selectedUnits: any[], countItem: any[]) => void;
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
  // const toggleSuggestionBox = () => {
  //   setSuggestionBoxVisible(!isSuggestionBoxVisible);
  // };
  const handleShowFoodCate = () => {
    setShowFood(!isShowFood);
    setSuggestionBoxVisible(false);
  };

  const [isUnitBoxVisible, setIsUnitBoxVisible] = useState(false);
  const [selectedUnits, setSelectedUnits] = useState({});

  const handleUnitPress = (itemId: string, unit: string) => {
    console.log(itemId, unit);
    setSelectedUnits((prevUnits) => ({
      ...prevUnits,
      [itemId]: unit, // Cập nhật đơn vị cho item tương ứng
    }));
    // console.log("selectedUnits", selectedUnits);
    setVisibleUnitIndex(null); // Ẩn box lựa chọn sau khi chọn
  };

  const [visibleUnitIndex, setVisibleUnitIndex] = useState<number | null>(null);

  const [items, setItems] = useState([]);
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
  //Search
  const [idSearch, setIdSearch] = useState("");
  const handlePressCategories = (id) => {
    setIdSearch(id);
    setSuggestionBoxVisible(true);
    // console.log("id", idSearch);
  };
  // ===========Gọi api=================
  const [itemsCategories, setItemsCategories] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const getData = async () => {
    const response = await getMarketCategories();
    const responseItem = await getMarketItems(); // Thay bằng hàm API của bạn
    setFilteredItems(responseItem);
    setItemsCategories(responseItem);
    setCategories(response.categories); // Cập nhật state
  };

  // Gọi API khi component được mount
  useEffect(() => {
    getData();
  }, []);

  // Theo dõi giá trị của `categories`
  useEffect(() => {}, [categories, items]);
  useEffect(() => {
    // console.log("date", currentDate);
    // Kiểm tra xem itemsCategories.items có phải là một mảng không
    if (idSearch) {
      const filtered = itemsCategories.items.filter(
        (item) => item.category_id === idSearch
      );
      setFilteredItems(filtered);
    } else if (Array.isArray(itemsCategories.items)) {
      const filtered = itemsCategories.items.filter((item) =>
        item.name.toLowerCase().includes(inputText.toLowerCase())
      );
      setFilteredItems(filtered); // Cập nhật danh sách đã lọc
    } else {
      setFilteredItems([]); // Hoặc có thể là một mảng rỗng nếu không phải mảng
    }
  }, [idSearch, inputText, itemsCategories.items]);
  // ============= Chọn item ===================

  const handleSelectedItems = (id) => {
    if (Array.isArray(itemsCategories.items)) {
      // Tìm phần tử có id khớp
      const selectedItem = itemsCategories.items.find((item) => item.id === id);

      if (selectedItem) {
        // Kiểm tra nếu phần tử đã tồn tại trong danh sách items
        setItems((prevItems) => {
          const isExist = prevItems.some((item) => item.id === selectedItem.id);
          if (!isExist) {
            return [...prevItems, selectedItem];
          }
          return prevItems; // Giữ nguyên nếu đã tồn tại
        });
        // console.log("Selected Item:", selectedItem);
      } else {
        console.log("Không tìm thấy mục nào với id:", id);
      }
    } else {
      console.log("itemsCategories.items không phải là một mảng hợp lệ.");
    }
  };
  useEffect(() => {
    // console.log("categories", items);
  }, [items]);
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      style={shoppingScheduleStyle.container} // Xóa ngoặc {}
      showsVerticalScrollIndicator={true}
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
              onFocus={() => {
                setIdSearch(""); // Đặt idSearch thành chuỗi rỗng khi trường tìm kiếm được nhấn
                setSuggestionBoxVisible(true);
              }}
              // onBlur={() => setSuggestionBoxVisible(false)}
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
            <TouchableWithoutFeedback
              onPress={() => {
                // Đóng bàn phím nếu mở
                setSuggestionBoxVisible(false); // Ẩn suggestionBox
              }}
            >
              <View style={shoppingScheduleStyle.suggestionBox}>
                <ScrollView
                  style={{ maxHeight: 200 }} // Giới hạn chiều cao của ScrollView
                  showsVerticalScrollIndicator={true}
                  nestedScrollEnabled={true} // Hiển thị thanh cuộn dọc
                >
                  {filteredItems.map((item) => {
                    // Tìm category name từ items dựa trên category_id
                    const categoryName =
                      categories.find((i) => i.id === item.category_id)?.name ||
                      "Nhu yếu phẩm"; // Nếu không tìm thấy thì dùng "Nhu yếu phẩm"

                    return (
                      <View
                        key={item.id.toString()}
                        style={shoppingScheduleStyle.suggestionItem}
                      >
                        <View style={shoppingScheduleStyle.suggestionItem_box}>
                          {/* Ảnh và tên */}
                          <View
                            style={shoppingScheduleStyle.containerImgNameFood}
                          >
                            <Image
                              source={require("@/assets/images/shopping/NoItemFood.png")}
                              style={shoppingScheduleStyle.iconNoItemFood}
                            />
                            <View
                              style={shoppingScheduleStyle.containerDetailFood}
                            >
                              <Text style={shoppingScheduleStyle.textNameFood}>
                                {item.name}
                              </Text>
                              <Text style={shoppingScheduleStyle.textTypeFood}>
                                {categoryName} {/* Thay thế đây */}
                              </Text>
                            </View>
                          </View>
                          {/* btn Thêm */}
                          <TouchableOpacity
                            onPress={() => handleSelectedItems(item.id)}
                          >
                            <Text style={shoppingScheduleStyle.textaddFood}>
                              Thêm
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
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
        {/* Box food */}
        {isShowFood ? (
          <View style={shoppingScheduleStyle.boxListFood}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {categories.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={shoppingScheduleStyle.boxItemFood}
                  onPress={() => handlePressCategories(item.id)}
                >
                  <View style={shoppingScheduleStyle.containerImgFood}>
                    <Image
                      source={{ uri: item.image_url }}
                      style={shoppingScheduleStyle.imageCategories}
                    />
                  </View>
                  <View style={shoppingScheduleStyle.containerTextFood}>
                    <Text style={shoppingScheduleStyle.textFood}>
                      {item.name}
                    </Text>
                  </View>
                </TouchableOpacity>
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
        <View style={shoppingScheduleStyle.containerListCateShopping}>
          {items.map((item, index) => {
            // Tìm tên danh mục dựa trên category_id của item
            const categoryName = categories.find(
              (i) => i.id === item.category_id
            )?.name;

            return (
              <View
                key={item.id}
                style={[
                  shoppingScheduleStyle.containerItemCateShopping,
                  index === items.length - 1 && { marginBottom: 20 },
                  visibleUnitIndex === index && { zIndex: 10 }, // Đảm bảo zIndex cao cho item hiện tại
                ]}
              >
                {/* Ảnh và tên */}
                <View style={shoppingScheduleStyle.containerImgNameFood}>
                  <Image
                    source={require("@/assets/images/shopping/NoItemFood.png")}
                    style={shoppingScheduleStyle.iconNoItemFood}
                  />
                  <View style={shoppingScheduleStyle.containerDetailFood}>
                    <Text style={shoppingScheduleStyle.textNameFood}>
                      {item.name}
                    </Text>
                    <Text style={shoppingScheduleStyle.textTypeFood}>
                      {categoryName}
                    </Text>
                  </View>
                </View>
                {/* btn Số lượng */}
                <View style={shoppingScheduleStyle.containerInputCateShopping}>
                  <TextInput
                    style={shoppingScheduleStyle.inputShopping}
                    placeholder="Số lượng"
                    placeholderTextColor={colors.white60}
                    keyboardType="numeric" // Hiển thị bàn phím số
                    value={inputTextShopping[item.id]} // Giá trị riêng biệt cho mỗi item
                    onChangeText={(value) => {
                      // Chỉ chấp nhận số
                      const numericValue = value.replace(/[^0-9]/g, ""); // Loại bỏ các ký tự không phải số
                      handleInputChange(item.id, numericValue); // Cập nhật giá trị
                    }}
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
                        {selectedUnits[item.id] || ""}
                      </Text>
                      <Image
                        source={require("@/assets/images/shopping/arrow_bottom.png")}
                      />
                      {/* Hiển thị box lựa chọn đơn vị nếu isUnitBoxVisible là true */}
                      {visibleUnitIndex === index && (
                        <View style={[shoppingScheduleStyle.unitBox]}>
                          {item.list_units.map((unit) => (
                            <TouchableOpacity
                              key={unit}
                              style={shoppingScheduleStyle.unitItem}
                              onPress={() => handleUnitPress(item.id, unit)}
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
            );
          })}
        </View>
      </View>
      <View style={shoppingScheduleStyle.containerButtonSuccess}>
        <TouchableOpacity
          style={shoppingScheduleStyle.ButtonSuccess}
          onPress={() => onComplete(items, selectedUnits, inputTextShopping)}
        >
          <Text style={shoppingScheduleStyle.textButtonSuccess}>
            Hoàn Thành
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ShoppingScheduleCalender;
