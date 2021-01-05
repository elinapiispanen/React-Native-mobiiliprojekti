import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import NewsFeed from './src/components/Newsfeed';
import Weather from './src/components/Weather'
import Emergency from './src/components/Emergency'
import styles from './src/styles/index'
import { Icon } from "react-native-elements";
import ThingsToDo from './src/components/ThingsToDo'
import Stt from './src/components/Stt'

const Tab = createMaterialTopTabNavigator();

export default function App() {

  return (
    <NavigationContainer theme={myTheme}>
      <Tab.Navigator style={styles.tabBar} screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconColor;

          if (route.name === "Uutiset") {
            iconName = 'library-books';
            iconColor = navIconColor(focused);
          } else if (route.name === "Tekemistä vailla?") {
            iconName = "extension";
            iconColor = navIconColor(focused);
          } else if (route.name === "Sää") {
            iconName = 'wb-sunny';
            iconColor = navIconColor(focused);
          } else if (route.name === "Stt") {
            iconName = "info";
            iconColor = navIconColor(focused);
          } else if (route.name === "Hätätiedotteet") {
            iconName = 'warning';
            iconColor = navIconColor(focused);
          }
          return <Icon color={iconColor} size={26} name={iconName} />;
        },
      })}
        tabBarOptions={{
          activeTintColor: '#8db596',
          inactiveTintColor: '#707070',
          showIcon: true,
          showLabel: false,
        }}>
        <Tab.Screen name='Uutiset' component={NewsFeed} />
        <Tab.Screen name='Sää' component={Weather} />
        <Tab.Screen name='Stt' component={Stt} />
        <Tab.Screen name='Hätätiedotteet' component={Emergency} />
        <Tab.Screen name='Tekemistä vailla?' component={ThingsToDo} />
      </Tab.Navigator>
    </NavigationContainer>

  );
}
