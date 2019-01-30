import React, { Component } from 'react';
import i18n, { locale } from 'app/I18n';
import {
  LayoutAnimation,
  ActionSheetIOS,
  View,
  StyleSheet,
  DatePickerIOS,
} from 'react-native';

// FORM
import {
  InputGroup,
  Input,
  Line,
  Button,
  DoneAccessory,
} from 'app/components/Form';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Device from 'app/utils/Device';
import { Reminder } from 'app/utils/PN';
import { Permissions, Notifications } from 'expo';

const settingsValidations = Yup.object().shape({
  pageGoal: Yup.number()
    .min(1, 'Have goals!')
    .required('Page Goal is required'),
});

export default class SettingsScreen extends Component {
  static navigationOptions = {
    title: i18n.t('settings'),
  };

  state = {
    notificationsDisabled: true,
  };

  componentDidMount() {
    Permissions.askAsync(Permissions.NOTIFICATIONS);
  }

  handleOnReset = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        title: i18n.t('eraseAllData'),
        message: i18n.t('areYouSure'),
        options: [i18n.t('cancel'), i18n.t('eraseEverything')],
        cancelButtonIndex: 0,
        destructiveButtonIndex: 1,
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 1:
            this.props.reset();
            break;
          default:
        }
      },
    );
  };

  renderForm = ({
    values,
    touched,
    errors,
    setFieldValue,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  }) => {
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <InputGroup label={i18n.t('settings')}>
          <Input
            label={i18n.t('pageGoal')}
            inputAccessoryViewID={'done'}
            value={String(values.pageGoal)}
            placeholder="10"
            keyboardType="phone-pad"
            onChange={handleChange('pageGoal')}
            onBlur={handleBlur('pageGoal')}
            errors={errors.pageGoal}
            touched={touched.pageGoal}
          />
          <Line />
          <Input
            label={i18n.t('dailyReminder')}
            type="switch"
            value={values.reminderEnabled}
            onChange={v => {
              LayoutAnimation.easeInEaseOut();
              setFieldValue('reminderEnabled', v);
            }}
            onBlur={handleBlur('reminderEnabled')}
            errors={errors.reminderEnabled}
            touched={touched.reminderEnabled}
          />
          {values.reminderEnabled && (
            <DatePickerIOS
              date={new Date(values.reminderTime)}
              locale={locale}
              onDateChange={d => {
                d.setSeconds(0);
                setFieldValue('reminderTime', d);
              }}
              mode="time"
            />
          )}
        </InputGroup>
        <Button
          onPress={handleSubmit}
          disabled={isSubmitting}
          title={i18n.t('save')}
        />
        <Button
          onPress={this.handleOnReset}
          color="red"
          title={i18n.t('resetData')}
        />
        <DoneAccessory inputAccessoryViewID="done" />
      </View>
    );
  };

  handleSubmit = async (values, { setSubmitting }) => {
    if (
      values.reminderEnabled !== this.props.settings.reminderEnabled ||
      values.reminderTime !== this.props.settings.reminderTime
    ) {
      if (values.reminderEnabled) {
        await Notifications.cancelAllScheduledNotificationsAsync();
        await Notifications.scheduleLocalNotificationAsync(Reminder, {
          time: values.reminderTime,
          repeat: 'day',
        });
      } else {
        await Notifications.cancelAllScheduledNotificationsAsync();
      }
    }

    this.props.updateSettings(values);
    setSubmitting(false);
  };

  render() {
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
            initialValues={this.props.settings}
            onSubmit={this.handleSubmit}
            validationSchema={settingsValidations}
            render={this.renderForm}
          />
        </View>
      </View>
    );
  }
}
