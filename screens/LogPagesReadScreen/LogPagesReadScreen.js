import React, { Component } from 'react';
import { View, Text, Alert, DatePickerIOS } from 'react-native';
import i18n, { locale } from 'app/I18n';

import { Notifications } from 'expo';
// FORM
import {
  DoneAccessory,
  InputGroup,
  Input,
  Line,
  Button,
  FormikContainer,
} from 'app/components/Form';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Reminder } from 'app/constants/PN';

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
    .required(i18n.t('pagesReadRequired')),
  date: Yup.date().required('Date is required'),
});

class LogPagesReadScreen extends Component {
  static navigationOptions = () => {
    return {
      gesturesEnabled: false,
      title: i18n.t('logReading'),
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
    setFieldValue,
  }) => {
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <InputGroup label={i18n.t('logReading')}>
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
            label={i18n.t('pagesRead')}
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
            locale={locale}
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
          title={i18n.t('logReading')}
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
    await Notifications.scheduleLocalNotificationAsync(Reminder, {
      time: date,
      repeat: 'day',
    });
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
          Alert.alert(i18n.t('congrats'), 'You met your daily reading goal!', [
            { text: i18n.t('thanks') },
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

    return (
      <FormikContainer maxHeight={450}>
        <Formik
          initialValues={{ ...initialBookValues, title, isbn }}
          onSubmit={this.handleSubmit}
          validationSchema={logValidations}
          render={this.renderForm}
        />
      </FormikContainer>
    );
  }
}

export default LogPagesReadScreen;
