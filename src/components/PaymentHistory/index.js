// /components/PaymentHistory.js
import React from "react";
import { FlatList, View, Text } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";

const PaymentHistory = ({ data }) => {
  const renderItem = ({ item }) => (
    <Card style={{ marginBottom: 10 }}>
      <Card.Content>
        <Title>{item.service_name}</Title>
        <Paragraph>Tổng tiền: {item.amount} VND</Paragraph>
        <Paragraph>
          Ngày giao dịch: {new Date(item.transaction_date).toLocaleString()}
        </Paragraph>
        <Paragraph>
          Ngày đặt lịch hẹn:{" "}
          {new Date(item.appointment_date).toLocaleDateString()}
        </Paragraph>
        <Paragraph>
          Trạng thái: {item.payment_status === "P" ? "Paid" : "Pending"}
        </Paragraph>
      </Card.Content>
    </Card>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.transaction_id.toString()}
    />
  );
};

export default PaymentHistory;
