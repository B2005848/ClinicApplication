import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import moment from "moment-timezone";
import "moment/locale/vi"; // Import tiếng Việt cho moment
import { Calendar } from "react-native-calendars";
import { getDoctorShifts } from "../../services/shiftService";
import { checkAvailableTime } from "../../services/checkAvailableTime";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import formatDate from "../../helpers/format-datetime";
import styles from "./style";

moment.locale("vi");

const ListDate = ({ departmentId, specialtyId, doctorId, serviceId }) => {
  const navigation = useNavigation();
  const [shifts, setShifts] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableShifts, setAvailableShifts] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(moment().format("YYYY-MM"));
  const [showTimePicker, setShowTimePicker] = useState(false); // Trạng thái hiển thị thời gian
  const [selectedShift, setSelectedShift] = useState(null); // Ca làm việc đã chọn
  const [timeOptions, setTimeOptions] = useState([]); // Danh sách giờ
  const [selectedTime, setSelectedTime] = useState(null); // Lưu thời gian đã chọn
  const [bookedTimes, setBookedTimes] = useState([]); // Danh sách các giờ đã đặt
  useEffect(() => {
    const fetchShifts = async () => {
      const result = await getDoctorShifts(departmentId, specialtyId, doctorId);
      if (result.success && Array.isArray(result.data)) {
        setShifts(result.data);
      } else {
        console.error("Failed to fetch shifts:", result.message);
        setShifts([]);
      }
    };

    if (departmentId && specialtyId && doctorId) {
      fetchShifts();
    }
  }, [departmentId, specialtyId, doctorId]);

  const onDateSelect = (day) => {
    const selectedDateFormatted = moment(day.dateString, "YYYY-MM-DD").format(
      "YYYY-MM-DD"
    );
    setSelectedDate(selectedDateFormatted);

    const selectedDateMoment = moment(selectedDateFormatted);

    const matchingShifts = (shifts || []).filter((shift) => {
      const shiftStartDate = moment(shift.start_shift);
      const shiftEndDate = moment(shift.end_shift);
      const isInShiftRange = selectedDateMoment.isBetween(
        shiftStartDate,
        shiftEndDate,
        "day",
        "[]"
      );

      const isWeekdayShift =
        (shift.shift_id.trim() === "NT-S" ||
          shift.shift_id.trim() === "NT-C") &&
        selectedDateMoment.isoWeekday() >= 1 &&
        selectedDateMoment.isoWeekday() <= 6;

      const isSundayShift =
        (shift.shift_id.trim() === "CN-S" ||
          shift.shift_id.trim() === "CN-C") &&
        selectedDateMoment.isoWeekday() === 7;

      return isInShiftRange && (isWeekdayShift || isSundayShift);
    });

    setAvailableShifts(matchingShifts);
  };

  const onMonthChange = (month) => {
    setCurrentMonth(
      `${month.year}-${month.month < 10 ? `0${month.month}` : month.month}`
    );
  };

  const onShiftSelect = (shift) => {
    setSelectedShift(shift);

    // Chuyển đổi start_time và end_time từ UTC sang giờ cục bộ
    const startMoment = moment.utc(shift.start_time);
    const endMoment = moment.utc(shift.end_time);

    // Tạo danh sách giờ cách nhau 30 phút
    const options = [];
    for (
      let m = startMoment.clone();
      m.isBefore(endMoment);
      m.add(30, "minutes")
    ) {
      options.push(m.format("HH:mm"));
    }

    // Thêm giờ kết thúc vào danh sách
    options.push(endMoment.format("HH:mm"));

    setTimeOptions(options);
    setShowTimePicker(true); // Hiển thị danh sách giờ
  };

  const selectTime = async (time) => {
    setSelectedTime(time); // Lưu thời gian đã chọn
    // Tạo đối tượng chi tiết cuộc hẹn

    const appointmentDetails = {
      doctor_id: doctorId,
      department_id: departmentId,
      service_id: serviceId,
      appointment_date: moment(selectedDate).format("YYYY-MM-DD"), // Định dạng ngày
      start_time: time, // Thời gian bắt đầu
      shift_id: selectedShift.shift_id, // ID của ca làm việc đã chọn
    };

    console.log("Appointment Details:", appointmentDetails); // Ghi log để kiểm tra dữ liệu

    // Gọi API để kiểm tra khung giờ
    const isAvailable = await checkAvailableTime(appointmentDetails);
    if (isAvailable && isAvailable.success) {
      Alert.alert("Thành công", "Bạn đã chọn thời gian thành công!");
    } else {
      setSelectedTime(null);
    }

    setShowTimePicker(false); // Ẩn danh sách sau khi chọn
  };

  const handleReSelectDate = () => {
    setSelectedDate(null); // Đặt lại ngày đã chọn
    setAvailableShifts([]); // Đặt lại danh sách ca làm việc
    setSelectedShift(null); // Đặt lại ca đã chọn
    setSelectedTime(null); // Đặt lại thời gian đã chọn
  };

  const handleReSelectShift = () => {
    setSelectedShift(null); // Đặt lại ca đã chọn
    setShowTimePicker(false); // Ẩn danh sách giờ
  };

  const handleGoToPayment = () => {
    // Truyền thông tin khám đến màn hình phương thức thanh toán
    navigation.navigate("PaymentMethodScreen", {
      doctor_id: doctorId,
      department_id: departmentId,
      service_id: serviceId,
      appointment_date: selectedDate, // Ngày khám đã chọn
      start_time: selectedTime, // Thời gian khám đã chọn
      shift_id: selectedShift.shift_id, // ID ca làm việc
    });
  };

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
      <Text style={[{ marginTop: 5, fontWeight: "bold" }, styles.text]}>
        Chọn ngày khám:
      </Text>

      {!selectedDate ? (
        <Calendar
          onDayPress={onDateSelect}
          onMonthChange={onMonthChange}
          markedDates={{
            [selectedDate]: { selected: true, selectedColor: "blue" },
          }}
          minDate={moment().format("YYYY-MM-DD")}
          enableSwipeMonths={true}
          monthFormat={"MMMM - yyyy"}
          renderHeader={() => (
            <Text
              style={{ fontSize: 18, fontWeight: "bold", textAlign: "center" }}
            >
              {moment(currentMonth, "YYYY-MM")
                .format("MMMM - YYYY")
                .replace(/^./, (str) => str.toUpperCase())}
            </Text>
          )}
          theme={{
            todayTextColor: "#ff6347",
            monthTextColor: "#3b5998",
            textDayFontWeight: "500",
            textMonthFontWeight: "bold",
            textDayHeaderFontWeight: "500",
            textDayFontSize: 16,
          }}
          firstDay={1}
        />
      ) : (
        <View>
          <Text style={[{ fontSize: 20 }, styles.text]}>
            Bạn đã chọn ngày: {"   "}
            {moment(selectedDate).format("DD/MM/YYYY")}
          </Text>
          <Button title="Chọn lại ngày" onPress={handleReSelectDate} />
          <Text style={[{ marginTop: 5, fontWeight: "bold" }, styles.text]}>
            Chọn buổi khám:
          </Text>
          {availableShifts.length > 0 && !selectedShift
            ? availableShifts.map((shift) => (
                <View
                  key={`${shift.shift_id}-${shift.start_shift}`}
                  style={{ marginBottom: 10 }}
                >
                  <Button
                    title={`${shift.shift_name} (${formatDate.formatTime(shift.start_time)} - ${formatDate.formatTime(shift.end_time)})`}
                    onPress={() => onShiftSelect(shift)}
                  />
                </View>
              ))
            : selectedShift && (
                <View>
                  <Text style={[{ fontSize: 20 }, styles.text]}>
                    Bạn đã chọn: {"   "}
                    {selectedShift.shift_name}
                  </Text>
                  <Button title="Chọn lại buổi" onPress={handleReSelectShift} />
                </View>
              )}
        </View>
      )}

      {showTimePicker && selectedShift && (
        <View style={{ marginTop: 20 }}>
          <Text style={[{ marginTop: 5, fontWeight: "bold" }, styles.text]}>
            Chọn thời gian khám:
          </Text>
          <ScrollView>
            {timeOptions.map((time, index) => (
              <TouchableOpacity key={index} onPress={() => selectTime(time)}>
                <Text style={{ padding: 10, fontSize: 18 }}>{time}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {selectedTime && (
        <View style={{ marginTop: 20 }}>
          <Text style={[{ fontSize: 20 }, styles.text]}>
            Thời gian khám đã chọn: {"   "} {selectedTime}
          </Text>
          <Button
            title="Chọn lại giờ"
            onPress={() => setShowTimePicker(true)}
          />

          <View
            style={{
              marginTop: 20,
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Nút tiếp tục lấy thông tin khám */}
            <TouchableOpacity
              style={styles.wrapperBtnContinute}
              onPress={handleGoToPayment}
            >
              <Text style={styles.titleBtnContinute}>
                ĐẾN VỚI PHƯƠNG THỨC THANH TOÁN
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default ListDate;
