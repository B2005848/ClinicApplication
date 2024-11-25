import React, { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  Button,
  Text,
  FlatList, // Sử dụng FlatList thay vì ScrollView
} from "react-native";
import { ListItem } from "react-native-elements";
import { RadioButton } from "react-native-paper";
import { handleGetlistServiceByDepId } from "../../services/handleServices";
import { formatCurrency } from "../../helpers/currencyFormatter";
import styles from "./style";

const ListService = ({ dep_id, services, onServiceSelect, setServices }) => {
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchServices = async (dep_id) => {
    try {
      const result = await handleGetlistServiceByDepId(dep_id);
      if (result && result.success && result.data) {
        setServices(result.data);
      } else {
        console.error("Invalid response from API:", result);
      }
    } catch (error) {
      console.error("Error fetching services by department_id:", error);
    }
  };

  useEffect(() => {
    const initialFetch = async () => {
      setLoading(true);
      await fetchServices(dep_id);
      setLoading(false);
    };
    initialFetch();
  }, [dep_id]);

  const handleSelectService = (serviceId) => {
    const selected = services.find((srv) => srv.service_id === serviceId);
    setSelectedService(selected);
    onServiceSelect({
      ...selected,
      specialty_id: selected.specialty_id,
    });
  };

  const handleResetSelection = () => {
    setSelectedService(null);
  };

  if (loading) {
    return <ActivityIndicator size="36" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={selectedService ? [selectedService] : services}
        keyExtractor={(item) => item.service_id.toString()}
        renderItem={({ item }) => (
          <ListItem
            key={item.service_id}
            bottomDivider
            onPress={() => handleSelectService(item.service_id)}
          >
            <RadioButton
              value={item.service_id}
              status={
                selectedService &&
                selectedService.service_id === item.service_id
                  ? "checked"
                  : "unchecked"
              }
              onPress={() => handleSelectService(item.service_id)}
            />
            <ListItem.Content style={styles.text}>
              <ListItem.Title style={styles.title}>
                {item.service_name}
              </ListItem.Title>
              <ListItem.Subtitle>
                <Text style={{ fontStyle: "italic" }}>
                  ({item.description})
                </Text>
              </ListItem.Subtitle>
              <ListItem.Subtitle>
                <Text>
                  <Text style={[styles.text, styles.title]}>Phí khám: </Text>
                  <Text style={[styles.text, styles.price]}>
                    {formatCurrency(item.service_fee)}
                  </Text>
                </Text>
              </ListItem.Subtitle>
              <ListItem.Subtitle>
                <Text>Thời gian khám ~ {item.duration} phút</Text>
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        )}
        ListFooterComponent={
          selectedService && (
            <Button title="Chọn lại" onPress={handleResetSelection} />
          )
        }
      />
      {loadingMore && <ActivityIndicator size="small" color="#0000ff" />}
    </View>
  );
};

export default ListService;
