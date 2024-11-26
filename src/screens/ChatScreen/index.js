import React, { useState, useEffect, useRef } from "react";
import { View, TextInput, Button, FlatList, Text } from "react-native";
import axios from "axios";
import Constants from "expo-constants";
import io from "socket.io-client"; // Import socket.io-client

const { API_URL } = Constants.expoConfig.extra;

const ChatScreen = () => {
  const [messages, setMessages] = useState([]); // Dữ liệu tin nhắn
  const [newMessage, setNewMessage] = useState(""); // Tin nhắn mới
  const [isLoading, setIsLoading] = useState(false); // Trạng thái đang tải
  const [page, setPage] = useState(1); // Trạng thái trang hiện tại
  const senderId = "0969229338"; // ID của bệnh nhân
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
        setMessages((prevMessages) => [
          ...response.data.listMessages.reverse(), // Đảo ngược thứ tự tin nhắn cũ
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
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <Text>{item.content}</Text>
            <Text style={{ fontSize: 12, color: "#aaa" }}>
              {new Date(item.timestamp).toLocaleTimeString()}
            </Text>
          </View>
        )}
        onScroll={handleScroll} // Lắng nghe sự kiện cuộn
        onContentSizeChange={scrollToBottom} // Cuộn xuống khi tin nhắn mới được gửi
      />
      <TextInput
        value={newMessage}
        onChangeText={setNewMessage}
        placeholder="Nhập tin nhắn..."
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
        }}
      />
      <Button title="Gửi tin nhắn" onPress={sendMessage} />
    </View>
  );
};

export default ChatScreen;
