import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text } from 'react-native';
import auth from '@react-native-firebase/auth';
import TodoScreen from '../screens/TodoScreen';

const Tab = createBottomTabNavigator();

// const TodoScreen = () => {
//     return (
//         <View>
//             <Text>Todo Screen</Text>
//         </View>
//     );
// };

const ProfileScreen = () => {
    return (
        <View>
            <Text>Profile Screen</Text>
        </View>
    );
};

const RouteNavigation = () => {
    const user = auth().currentUser;

    return (
        <NavigationContainer>
            {user ? (
                <Tab.Navigator>
                    <Tab.Screen name="Todos" component={TodoScreen} />
                    <Tab.Screen name="Profile" component={ProfileScreen} />
                </Tab.Navigator>
            ) : (<LoginScreen />)}
        </NavigationContainer>
    );
};

export default RouteNavigation;
