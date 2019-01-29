import React, { Component } from 'react';
import { View, Text, StyleSheet, DatePickerIOS } from 'react-native';

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

  handleSubmit = values => {
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
