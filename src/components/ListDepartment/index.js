import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Button, FlatList } from "react-native";
import { ListItem } from "react-native-elements";
import { RadioButton } from "react-native-paper";
import { handleGetlistDepartments } from "../../services/handleDepartments";
import styles from "./style";

const ListDepartment = ({ onDepartmentSelect, resetDepartments }) => {
  const [departments, setDepartments] = useState([]);
  const [displayDepartments, setDisplayDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const fetchDepartments = async (page) => {
    try {
      const result = await handleGetlistDepartments(page);
      if (result && result.success && result.data) {
        const { totalPages, listDepartments } = result.data;
        setDepartments((prevDepartments) => [
          ...prevDepartments,
          ...listDepartments,
        ]);
        setTotalPages(totalPages || 1);
        setDisplayDepartments((prevDisplay) => [
          ...prevDisplay,
          ...listDepartments,
        ]);
      } else {
        console.error("Invalid response from API:", result);
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  useEffect(() => {
    const initialFetch = async () => {
      setLoading(true);
      await fetchDepartments(1);
      setLoading(false);
    };
    initialFetch();
  }, []);

  useEffect(() => {
    if (resetDepartments) {
      setDepartments([]);
      setDisplayDepartments([]);
      setSelectedDepartment(null);
      setCollapsed(false);
      setPage(1);
      fetchDepartments(1);
    }
  }, [resetDepartments]);

  const handleLoadMore = async () => {
    if (page < totalPages && !loadingMore) {
      setLoadingMore(true);
      const nextPage = page + 1;
      await fetchDepartments(nextPage);
      setPage(nextPage);
      setLoadingMore(false);
    }
  };

  const handleCollapse = () => {
    setCollapsed(true);
    setDisplayDepartments(departments.slice(0, 10));
    setPage(1);
  };

  const handleSelectDepartment = (departmentId) => {
    onDepartmentSelect(departmentId);
    const selected = departments.find(
      (dep) => dep.department_id === departmentId
    );
    setSelectedDepartment(selected);
    setCollapsed(true);
  };

  if (loading) {
    return <ActivityIndicator size="36" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={
          collapsed && selectedDepartment
            ? [selectedDepartment]
            : displayDepartments
        }
        keyExtractor={(item) => item.department_id.toString()}
        renderItem={({ item }) => (
          <ListItem
            key={item.department_id}
            bottomDivider
            onPress={() => handleSelectDepartment(item.department_id)}
          >
            <RadioButton
              value={item.department_id}
              status={
                selectedDepartment &&
                selectedDepartment.department_id === item.department_id
                  ? "checked"
                  : "unchecked"
              }
              onPress={() => handleSelectDepartment(item.department_id)}
            />
            <ListItem.Content>
              <ListItem.Title style={styles.title}>
                {item.department_name}
              </ListItem.Title>
              <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        )}
        ListFooterComponent={
          <>
            {!collapsed && page > 1 && (
              <Button title="Thu gọn" onPress={handleCollapse} />
            )}
            {page < totalPages && !collapsed && (
              <Button title="Xem thêm" onPress={handleLoadMore} />
            )}
          </>
        }
      />
      {loadingMore && <ActivityIndicator size="small" color="#0000ff" />}
    </View>
  );
};

export default ListDepartment;
