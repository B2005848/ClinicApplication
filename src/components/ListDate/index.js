import React, { useState, useEffect } from "react";
import { View, Text, Button, ScrollView, Alert } from "react-native";
import moment from "moment";
import "moment/locale/vi"; // Import tiếng Việt cho moment
import { Calendar } from "react-native-calendars";
import { getDoctorShifts } from "../../services/shiftService";
import formatDate from "../../helpers/format-datetime";
moment.locale("vi"); // Thiết lập ngôn ngữ mặc định cho moment

const ListDate = ({ departmentId, specialtyId, doctorId }) => {
  const [shifts, setShifts] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableShifts, setAvailableShifts] = useState([]); // Buổi làm việc sẵn có cho ngày chọn
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

  const onDateSelect = (day) => {
    const selectedDateFormatted = moment(day.dateString, "YYYY-MM-DD").format(
      "YYYY-MM-DD"
    );
    setSelectedDate(selectedDateFormatted);

    // Lọc ca làm việc khớp với ngày chọn hoặc ngày trong tuần
    const matchingShifts = shifts.filter((shift) => {
      const shiftStartDate = moment(shift.shift_date).format("YYYY-MM-DD");
      const isWeekdayShift =
        shift.shift_id.trim() === "NT-S" || shift.shift_id.trim() === "NT-C";
      const isSundayShift =
        shift.shift_id.trim() === "CN-S" || shift.shift_id.trim() === "CN-C";
      const selectedDateMoment = moment(selectedDateFormatted);

      return (
        ((isWeekdayShift &&
          selectedDateMoment.isoWeekday() >= 1 &&
          selectedDateMoment.isoWeekday() <= 6) ||
          (isSundayShift && selectedDateMoment.isoWeekday() === 7)) &&
        selectedDateMoment.isSameOrAfter(shiftStartDate)
      );
    });

    setAvailableShifts(matchingShifts);
  };

  const onMonthChange = (month) => {
    setCurrentMonth(
      `${month.year}-${month.month < 10 ? `0${month.month}` : month.month}`
    );
  };

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
      <Text>Chọn ngày khám:</Text>

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

      {selectedDate && (
        <>
          <Text style={{ marginTop: 20 }}>
            Chọn buổi khám cho ngày {moment(selectedDate).format("DD/MM/YYYY")}:
          </Text>
          {availableShifts.length > 0 ? (
            availableShifts.map((shift) => (
              <Button
                key={shift.shift_id}
                title={`${shift.shift_name} (${shift.start_time} - ${shift.end_time})`}
                onPress={() =>
                  Alert.alert(
                    "Chọn buổi",
                    `Bạn đã chọn buổi: ${shift.shift_name}`
                  )
                }
              />
            ))
          ) : (
            <Text>Không có buổi nào có sẵn cho ngày này.</Text>
          )}
        </>
      )}
    </ScrollView>
  );
};

export default ListDate;
