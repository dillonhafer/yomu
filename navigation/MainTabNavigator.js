import React from "react";
import { View, Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "app/components/TabBarIcon";
// Books
import BooksScreen from "app/screens/BooksScreen";
import NewBookScreen from "app/screens/NewBookScreen";
import EditBookScreen from "app/screens/EditBookScreen";
import LogPagesReadScreen from "app/screens/LogPagesReadScreen";

// Stats
import StatsScreen from "app/screens/StatsScreen";

// Settings
import SettingsScreen from "app/screens/SettingsScreen";

const BooksStack = createStackNavigator(
  {
    Books: BooksScreen,
    NewBook: NewBookScreen,
    EditBook: EditBookScreen,
    LogPagesRead: LogPagesReadScreen
  },
  { mode: "modal" }
);

BooksStack.navigationOptions = {
  tabBarLabel: "Books",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? `ios-bookmarks` : "md-bookmarks"}
    />
  )
};

const StatsStack = createStackNavigator({
  Stats: StatsScreen
});

StatsStack.navigationOptions = {
  tabBarLabel: "Stats",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-trophy" : "md-trophy"}
    />
  )
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
});

SettingsStack.navigationOptions = {
  tabBarLabel: "Settings",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-cog" : "md-cog"}
    />
  )
};

export default createBottomTabNavigator({
  BooksStack,
  StatsStack,
  SettingsStack
});
