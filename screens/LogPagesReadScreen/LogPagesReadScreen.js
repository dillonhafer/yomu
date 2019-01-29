import React, { Component } from 'react';
import { View, Text, Alert, StyleSheet, DatePickerIOS } from 'react-native';

import { Notifications } from 'expo';
// FORM
import {
  DoneAccessory,
  InputGroup,
  Input,
  Line,
  Button,
} from 'app/components/Form';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Device from 'app/utils/Device';

const dateString = date => {
  let d = date;
  if (typeof d === 'string') {
    d = new Date(date);
  }
  return [d.getFullYear(), d.getMonth(), d.getDate()].join('-');
};

const initialBookValues = {
  pages: 0,
  date: new Date(),
};

const logValidations = Yup.object().shape({
  pagesRead: Yup.number()
    .min(1, 'You must read at least one page')
    .required('Pages Read is required'),
  date: Yup.date().required('Date is required'),
});

class LogPagesReadScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      gesturesEnabled: false,
      title: 'Log Reading',
      headerBackImage: (
        <View
          style={{
            width: 13,
          }}
        />
      ),
    };
  };

  renderForm = ({
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    setFieldValue,
  }) => {
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <InputGroup label="reading log">
          <Text
            style={{
              marginTop: 12,
              marginBottom: 6,
              fontSize: 12,
              marginRight: 12,
              color: '#666',
            }}
          >
            {values.title}
          </Text>
          <Line />
          <Input
            label="Pages Read"
            keyboardType="phone-pad"
            inputAccessoryViewID="done"
            value={values.pagesRead}
            placeholder="1"
            autoFocus
            onChangeText={handleChange('pagesRead')}
            onBlur={handleBlur('pagesRead')}
            errors={errors.pagesRead}
            touched={touched.pagesRead}
          />
          <Line />
          <DatePickerIOS
            date={values.date}
            maximumDate={new Date()}
            mode="date"
            onDateChange={date => {
              setFieldValue('date', date);
            }}
          />
        </InputGroup>
        <Button
          onPress={handleSubmit}
          disabled={isSubmitting}
          title="Log Reading"
        />
        <DoneAccessory inputAccessoryViewID="done" />
      </View>
    );
  };

  rescheduleNotifications = async () => {
    if (!this.props.reminderEnabled) {
      return;
    }

    const date = new Date(this.props.reminderTime);
    date.setDate(date.getDate() + 1);

    await Notifications.cancelAllScheduledNotificationsAsync();
    await Notifications.scheduleLocalNotificationAsync(
      {
        title: '📖 Reading Reminder',
        body: `📚 Don't forget to read today!!!`,
        ios: { sound: true },
      },
      {
        time: date,
        repeat: 'day',
      },
    );
  };

  handleSubmit = async values => {
    const today = dateString(new Date());
    const goal = parseInt(this.props.pageGoal, 10);
    const currentPageCount = this.props.readingLogs
      .filter(l => dateString(l.date) === today)
      .reduce((acc, l) => acc + parseInt(l.pagesRead, 10), 0);

    if (currentPageCount < goal) {
      if (dateString(values.date) === today) {
        if (currentPageCount + parseInt(values.pagesRead, 10) >= goal) {
          await this.rescheduleNotifications();
          Alert.alert('🎉 You Did It! 🎉', 'You met your daily reading goal!', [
            { text: 'Thanks' },
          ]);
        }
      }
    }

    this.props.logPages(values);
    this.props.navigation.goBack();
  };

  render() {
    const isbn = this.props.navigation.getParam('isbn');
    const title = this.props.books.find(b => b.isbn === isbn).title;

    const baseStyles = { backgroundColor: '#eee', flex: 1 };
    const containerStyles = { flex: 1, backgroundColor: '#f6f6f6' };
    const style = Device.isTablet()
      ? [
          baseStyles,
          {
            maxHeight: 450,
            alignSelf: 'center',
            marginVertical: 24,
            borderRadius: 8,
            borderColor: '#eee',
            borderWidth: StyleSheet.hairlineWidth,
            width: 450,
          },
        ]
      : baseStyles;

    return (
      <View style={containerStyles}>
        <View style={style}>
          <Formik
            initialValues={{ ...initialBookValues, title, isbn }}
            onSubmit={this.handleSubmit}
            validationSchema={logValidations}
            render={this.renderForm}
          />
        </View>
      </View>
    );
  }
}

export default LogPagesReadScreen;
