import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Platform,
  Text,
  KeyboardAvoidingView,
  Image,
  StyleSheet,
} from "react-native";
import axios from "axios";
import Constants from "expo-constants";
import io from "socket.io-client"; // Import socket.io-client

const { API_URL } = Constants.expoConfig.extra;

const ChatScreen = ({ route }) => {
  const [messages, setMessages] = useState([]); // Dữ liệu tin nhắn
  const [newMessage, setNewMessage] = useState(""); // Tin nhắn mới
  const [isLoading, setIsLoading] = useState(false); // Trạng thái đang tải
  const [page, setPage] = useState(1); // Trạng thái trang hiện tại
  const { senderId } = route.params;
  const receiverId = "Admin"; // Receiver luôn là Admin
  const socket = io(API_URL, { transports: ["websocket"] });

  const flatListRef = useRef(); // Dùng để tham chiếu đến FlatList

  // Lấy tin nhắn từ server
  const fetchMessages = async (page = 1) => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await axios.get(
        `${API_URL}/api/messages/getMessages?senderId=${senderId}&receiverId=${receiverId}&page=${page}`
      );

      if (response.data.status) {
        // Duyệt qua các tin nhắn và phân biệt tin nhắn gửi và nhận
        const newMessages = response.data.listMessages.map((message) => ({
          ...message,
          isSentByMe: message.sender_id === senderId, // Nếu sender_id bằng senderId thì là tin nhắn gửi
        }));

        // Thêm các tin nhắn mới vào state, đảm bảo thứ tự đúng (mới nhất lên đầu)
        setMessages((prevMessages) => [
          ...newMessages.reverse(), // Đảo ngược thứ tự tin nhắn cũ
          ...prevMessages,
        ]);
      }
    } catch (error) {
      console.error("Lỗi lấy tin nhắn: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Gửi tin nhắn
  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const messageData = {
      senderId,
      senderType: "patient",
      receiverId,
      receiverType: "staff",
      content: newMessage,
    };

    try {
      const response = await axios.post(
        `${API_URL}/api/messages/sendMessage`,
        messageData
      );

      if (response.data.status) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            content: newMessage,
            senderId,
            timestamp: new Date().toISOString(),
            isSentByMe: true, // Đánh dấu tin nhắn gửi của mình
          },
        ]);
        setNewMessage(""); // Clear input

        // Phát tin nhắn mới tới server qua WebSocket
        socket.emit("send_message", messageData);
      } else {
        console.error("Gửi tin nhắn không thành công");
      }
    } catch (error) {
      console.error("Lỗi gửi tin nhắn: ", error);
    }
  };

  // Lắng nghe tin nhắn mới qua WebSocket
  useEffect(() => {
    socket.emit("join", { userId: senderId, role: "patient" });

    // Lắng nghe sự kiện 'receive_message' từ server
    socket.on("receive_message", (message) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          content: message.content,
          senderId: message.senderId,
          timestamp: new Date().toISOString(),
          isSentByMe: message.senderId === senderId, // Xác định tin nhắn gửi của mình hay nhận từ Admin
        },
      ]);
    });

    // Cleanup WebSocket khi component bị unmount
    return () => {
      socket.off("receive_message");
      socket.disconnect();
    };
  }, []);

  // Cuộn xuống khi có tin nhắn mới
  const scrollToBottom = () => {
    flatListRef.current?.scrollToEnd({ animated: true });
  };

  // Kiểm tra khi cuộn lên và tải thêm tin nhắn cũ
  const handleScroll = (event) => {
    const contentHeight = event.nativeEvent.contentSize.height;
    const scrollOffset = event.nativeEvent.contentOffset.y;
    const viewportHeight = event.nativeEvent.layoutMeasurement.height;

    // Nếu người dùng cuộn lên gần đầu trang và có thêm tin nhắn cũ
    if (scrollOffset <= 50 && contentHeight > viewportHeight) {
      setPage((prevPage) => {
        const nextPage = prevPage + 1;
        fetchMessages(nextPage); // Lấy thêm trang tin nhắn
        return nextPage;
      });
    }
  };

  useEffect(() => {
    fetchMessages(page); // Lấy tin nhắn khi màn hình được load
  }, [page]); // Khi số trang thay đổi, sẽ gọi lại fetchMessages

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 128 : 0}
      style={styles.container}
    >
      <View style={styles.chatContainer}>
        {/* Hiển thị danh sách tin nhắn */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View
              style={[
                styles.messageContainer,
                item.isSentByMe ? styles.sentMessage : styles.receivedMessage, // Phân biệt tin nhắn gửi và nhận
              ]}
            >
              <View style={styles.messageBubble}>
                <Text style={styles.messageText}>{item.content}</Text>
                <Text style={styles.timestamp}>
                  {new Date(item.timestamp).toLocaleTimeString()}
                </Text>
              </View>
            </View>
          )}
          onScroll={handleScroll} // Lắng nghe sự kiện cuộn
          onContentSizeChange={scrollToBottom} // Cuộn xuống khi tin nhắn mới được gửi
          style={styles.messagesContainer}
        />

        {/* Khung nhập tin nhắn */}
        <View style={styles.inputContainer}>
          <TextInput
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Nhập tin nhắn..."
            style={styles.input}
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>Gửi</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

// Các kiểu dáng cho chat
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  chatContainer: {
    flex: 1,
    padding: 10,
    justifyContent: "space-between",
  },
  messagesContainer: {
    flex: 1,
    marginBottom: 20,
  },
  messageContainer: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "flex-end",
  },
  sentMessage: {
    justifyContent: "flex-end",
    alignSelf: "flex-end",
    backgroundColor: "#0078FF",
    borderRadius: 15,
    padding: 10,
    maxWidth: "80%",
  },
  receivedMessage: {
    justifyContent: "flex-start",
    alignSelf: "flex-start",
    backgroundColor: "#0078FF",
    borderRadius: 15,
    padding: 10,
    maxWidth: "80%",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },

  messageText: {
    color: "#fff",
    fontSize: 16,
  },
  timestamp: {
    fontSize: 12,
    color: "#aaa",
    textAlign: "right",
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  sendButton: {
    backgroundColor: "#0078FF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginLeft: 10,
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ChatScreen;
