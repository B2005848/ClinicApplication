import React, { useState, useEffect } from "react";
import { View, Text, Button, FlatList, Alert, ScrollView } from "react-native";
import moment from "moment";
import "moment/locale/vi"; // Import tiếng Việt cho moment
import { Calendar } from "react-native-calendars";
import { getDoctorShifts } from "../../services/shiftService";

moment.locale("vi"); // Thiết lập ngôn ngữ mặc định cho moment

const ListDate = ({ departmentId, specialtyId, doctorId }) => {
  const [shifts, setShifts] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(moment().format("YYYY-MM"));

  useEffect(() => {
    const fetchShifts = async () => {
      const result = await getDoctorShifts(departmentId, specialtyId, doctorId);
      if (result.success) {
        setShifts(result.data);
      } else {
        console.error("Failed to fetch shifts:", result.message);
      }
    };

    if (departmentId && specialtyId && doctorId) {
      fetchShifts();
    }
  }, [departmentId, specialtyId, doctorId]);

  const generateTimes = (start, end) => {
    const startTime = moment(start, "HH:mm");
    const endTime = moment(end, "HH:mm");
    const times = [];

    while (startTime.isBefore(endTime)) {
      times.push(startTime.format("HH:mm"));
      startTime.add(30, "minutes");
    }
    setAvailableTimes(times);
  };

  const onDateSelect = (day) => {
    setSelectedDate(day.dateString);
    const selectedShift = shifts.find((shift) =>
      moment(shift.shift_date).isSame(day.dateString, "day")
    );
    if (selectedShift) {
      generateTimes(selectedShift.start_time, selectedShift.end_time);
    } else {
      setAvailableTimes([]);
    }
  };

  const onMonthChange = (month) => {
    setCurrentMonth(
      `${month.year}-${month.month < 10 ? `0${month.month}` : month.month}`
    );
  };

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
      <Text>Chọn ngày khám:</Text>

      {/* Hiển thị tên các ngày trong tuần bằng tiếng Việt */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          padding: 10,
        }}
      >
        {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((day, index) => (
          <Text
            key={index}
            style={{ width: 30, textAlign: "center", fontWeight: "bold" }}
          >
            {day}
          </Text>
        ))}
      </View>

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
          textDayHeaderFontSize: 14,
        }}
        firstDay={1}
      />

      {selectedDate && (
        <>
          <Text style={{ marginTop: 20 }}>
            Chọn giờ khám cho ngày {moment(selectedDate).format("DD/MM/YYYY")}:
          </Text>
          {availableTimes.length > 0 ? (
            <FlatList
              data={availableTimes}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Button
                  title={item}
                  onPress={() =>
                    Alert.alert("Đặt lịch lúc:", `${selectedDate} - ${item}`)
                  }
                />
              )}
              scrollEnabled={false} // Để FlatList không tự cuộn
            />
          ) : (
            <Text>Không có giờ nào có sẵn cho ngày này.</Text>
          )}
        </>
      )}
    </ScrollView>
  );
};

export default ListDate;
