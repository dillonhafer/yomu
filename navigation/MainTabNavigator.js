import React from 'react';
import { Platform } from 'react-native';
import i18n from 'app/I18n';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import TabBarIcon from 'app/components/TabBarIcon';

// Books
import BooksScreen from 'app/screens/BooksScreen';
import NewBookScreen from 'app/screens/NewBookScreen';
import EditBookScreen from 'app/screens/EditBookScreen';
import LogPagesReadScreen from 'app/screens/LogPagesReadScreen';

// Stats
import StatsScreen from 'app/screens/StatsScreen';

// Settings
import SettingsScreen from 'app/screens/SettingsScreen';
const BooksStack = createStackNavigator(
  {
    Books: BooksScreen,
    NewBook: NewBookScreen,
    EditBook: EditBookScreen,
    LogPagesRead: LogPagesReadScreen,
  },
  { mode: 'modal' },
);

BooksStack.navigationOptions = {
  tabBarLabel: i18n.t('books'),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-bookmarks` : 'md-bookmarks'}
    />
  ),
};

const StatsStack = createStackNavigator({
  Stats: StatsScreen,
});

StatsStack.navigationOptions = {
  tabBarLabel: i18n.t('stats'),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-trophy' : 'md-trophy'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: i18n.t('settings'),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-cog' : 'md-cog'}
    />
  ),
};

export default createBottomTabNavigator({
  BooksStack,
  StatsStack,
  SettingsStack,
});
