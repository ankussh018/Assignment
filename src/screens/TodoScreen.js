import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTodoItems, addTodoItem, updateTodoItem, deleteTodoItem } from '../HelperFunc/helper';

const TodoScreen = () => {
  const [todoItems, setTodoItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newTodoTitle, setNewTodoTitle] = useState('');

  useEffect(() => {
    loadTodoItems();
  }, []);

  const loadTodoItems = async () => {
    try {
      setLoading(true);
      const items = await getTodoItems(0, 10); // Example: Load first page with 10 items
      setTodoItems(items);
      setLoading(false);
    } catch (error) {
      setError(error.message || 'Failed to fetch todo items');
      setLoading(false);
    }
  };

  // Function to handle adding a new todo item
  const handleAddTodo = async () => {
    try {
      await addTodoItem(newTodoTitle);
      setNewTodoTitle('');
      await loadTodoItems(); // Refresh todo list after adding
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  // Function to handle updating a todo item
  const handleUpdateTodo = async (updatedTodo) => {
    try {
      await updateTodoItem(updatedTodo);
      await loadTodoItems(); // Refresh todo list after updating
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  // Function to handle deleting a todo item
  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodoItem(id);
      await loadTodoItems(); // Refresh todo list after deleting
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {/* Input for adding new todo item */}
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        value={newTodoTitle}
        onChangeText={text => setNewTodoTitle(text)}
        placeholder="Enter new todo item"
      />
      <Button title="Add Todo" onPress={handleAddTodo} />

      {/* Display todo items */}
      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <FlatList
          data={todoItems}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                // Example: Toggle todo item's 'done' status
                handleUpdateTodo({
                  ...item,
                  done: !item.done,
                });
              }}
              onLongPress={() => {
                Alert.alert(
                  'Delete Todo',
                  `Are you sure you want to delete "${item.title}"?`,
                  [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Delete', onPress: () => handleDeleteTodo(item.id) },
                  ],
                );
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 10,
                borderBottomWidth: 1,
                borderBottomColor: '#ccc',
              }}>
              <Text style={{ flex: 1 }}>{item.title}</Text>
              <Text>{item.done ? 'Done' : 'Pending'}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default TodoScreen;
