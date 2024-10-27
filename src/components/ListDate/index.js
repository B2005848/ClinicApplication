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
import formatDate from "../../helpers/format-datetime";
import styles from "./style";

moment.locale("vi");

const ListDate = ({ departmentId, specialtyId, doctorId }) => {
  const [shifts, setShifts] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableShifts, setAvailableShifts] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(moment().format("YYYY-MM"));
  const [showTimePicker, setShowTimePicker] = useState(false); // Trạng thái hiển thị thời gian
  const [selectedShift, setSelectedShift] = useState(null); // Ca làm việc đã chọn
  const [timeOptions, setTimeOptions] = useState([]); // Danh sách giờ
  const [selectedTime, setSelectedTime] = useState(null); // Lưu thời gian đã chọn

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

  const selectTime = (time) => {
    setSelectedTime(time); // Lưu thời gian đã chọn
    Alert.alert("Thời gian khám", `Bạn đã chọn: ${time}`);
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
          <Text style={[{ textAlign: "center", fontSize: 20 }, styles.text]}>
            --- {moment(selectedDate).format("DD/MM/YYYY")} ----
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
                  <Text>Buổi đã chọn: {selectedShift.shift_name}</Text>
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
          <Text>Thời gian đã chọn: {selectedTime}</Text>
          <Button
            title="Chọn lại giờ"
            onPress={() => setShowTimePicker(true)}
          />
        </View>
      )}
      <View style={{ marginTop: 20 }}>
        <TouchableOpacity>
          <Text>TIẾP THEO</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ListDate;
