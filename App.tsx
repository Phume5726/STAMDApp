import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { Image, View } from 'react-native';

import HomeScreen from './src/screens/HomeScreen';
import SixWeekCoursesScreen from './src/screens/SixWeekCoursesScreen';
import SixMonthCoursesScreen from './src/screens/SixMonthCoursesScreen';
import CalculatorScreen from './src/screens/CalculatorScreen';
import { RootStackParamList } from './src/types';

const Stack = createStackNavigator<RootStackParamList>();

const HeaderLogo = () => (
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Image
      source={require('./assets/Empowering the nation logo.png')}
      style={{ width: 30, height: 30, marginRight: 8 }}
      resizeMode="contain"
    />
  </View>
);

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#4A90E2' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Empowering the Nation',
            headerLeft: () => <HeaderLogo />,
          }}
        />
        <Stack.Screen
          name="SixWeekCourses"
          component={SixWeekCoursesScreen}
          options={{ title: 'Six Week Courses', headerLeft: () => <HeaderLogo /> }}
        />
        <Stack.Screen
          name="SixMonthCourses"
          component={SixMonthCoursesScreen}
          options={{ title: 'Six Month Courses', headerLeft: () => <HeaderLogo /> }}
        />
        <Stack.Screen
          name="Calculator"
          component={CalculatorScreen}
          options={{ title: 'Fee Calculator', headerLeft: () => <HeaderLogo /> }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
