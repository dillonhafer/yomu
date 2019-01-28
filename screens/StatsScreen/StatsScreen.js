import React from 'react';
import {
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Colors from 'app/constants/Colors';
import { Octicons } from '@expo/vector-icons';

const weekDays = ['S', 'M', 'T', 'W', 'R', 'F', 'S'];
const dateString = date => {
  return [date.getFullYear(), date.getMonth(), date.getDate()].join('-');
};

export default class StatsScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    const { readingLogs, pageGoal } = this.props;

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.contentContainer}>
            <View style={styles.iconContainer}>
              <Octicons name="flame" size={62} color={Colors.flame} />
              <Text
                style={{
                  fontWeight: '600',
                  color: Colors.flame,
                  marginVertical: 8,
                }}
              >
                Weekly Streak
              </Text>
            </View>

            <View style={styles.weekStreak}>
              {[0, -1, -2, -3, -4, -5, -6].map(d => {
                const date = new Date();
                date.setDate(date.getDate() + d);

                const pagesRead = readingLogs
                  .filter(l => dateString(l.date) === dateString(date))
                  .reduce((acc, l) => acc + parseInt(l.pagesRead, 10), 0);

                const complete = pagesRead >= pageGoal;
                const size = 100;
                const color = complete ? Colors.success : Colors.grayText;

                return (
                  <TouchableOpacity key={date} onPress={() => {}}>
                    <View
                      style={{
                        borderWidth: 8,
                        height: size,
                        width: size,
                        margin: 8,
                        borderRadius: size / 2,
                        borderColor: color,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Text
                        style={{
                          textAlign: 'center',
                          color,
                        }}
                      >
                        {weekDays[date.getDay()]}
                      </Text>
                      <Text
                        style={{
                          textAlign: 'center',
                          color,
                        }}
                      >
                        {pagesRead}/{pageGoal}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  weekStreak: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
});
