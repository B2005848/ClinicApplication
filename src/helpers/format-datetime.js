import moment from "moment-timezone";

// Hàm format ngày từ UTC sang múi giờ Việt Nam (Asia/Ho_Chi_Minh)
const formatDate = {
  formatDateTime(datatime) {
    return moment.utc(datatime).format("DD/MM/YYYY - HH:mm:ss");
  },
  formatDateBirth(datatime) {
    return moment.utc(datatime).format("DD/MM/YYYY");
  },
  formatTime(time) {
    return moment.utc(time).format("HH:mm");
  },
};
export default formatDate;
