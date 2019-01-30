import React, { Component } from 'react';
import i18n from 'app/I18n';
import { View, StyleSheet } from 'react-native';

// FORM
import { BarCodeScanner } from 'expo';
import {
  FormikContainer,
  InputGroup,
  Input,
  Line,
  Button,
} from 'app/components/Form';
import { Formik } from 'formik';
import * as Yup from 'yup';

const initialBookValues = {
  title: '',
  author: '',
  isbn: '',
};

const bookValidations = isbns =>
  Yup.object().shape({
    title: Yup.string().required('Title is required'),
    author: Yup.string().required('Author is required'),
    isbn: Yup.string()
      .notOneOf(isbns, 'ISBN already in use')
      .required('ISBN is required'),
  });

class NewBookScreen extends Component {
  static navigationOptions = () => {
    return {
      gesturesEnabled: false,
      title: i18n.t('new.book'),
      headerBackImage: (
        <View
          style={{
            width: 13,
          }}
        />
      ),
    };
  };

  state = {
    scanBarCode: false,
  };

  inputs = {};

  focusNextField = key => {
    this.inputs[key].focus();
  };

  renderForm = ({
    values,
    touched,
    errors,
    isSubmitting,
    setFieldValue,
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
        <InputGroup label={i18n.t('book')}>
          <Input
            label={i18n.t('title')}
            placeholder={i18n.t('title')}
            value={values.title}
            ref={input => {
              this.inputs['title'] = input;
            }}
            onSubmitEditing={() => {
              this.focusNextField('author');
            }}
            returnKeyType="next"
            onChangeText={handleChange('title')}
            onBlur={handleBlur('title')}
            errors={errors.title}
            touched={touched.title}
          />
          <Line />
          <Input
            label={i18n.t('author')}
            placeholder={i18n.t('author')}
            onChangeText={handleChange('author')}
            value={values.author}
            ref={input => {
              this.inputs['author'] = input;
            }}
            onSubmitEditing={() => {
              this.focusNextField('isbn');
            }}
            returnKeyType="next"
            onBlur={handleBlur('author')}
            errors={errors.author}
            touched={touched.author}
          />
          <Line />
          <Input
            label="ISBN"
            value={values.isbn}
            placeholder="0000000000"
            ref={input => {
              this.inputs['isbn'] = input;
            }}
            onSubmitEditing={handleSubmit}
            returnKeyType="done"
            onChangeText={handleChange('isbn')}
            onBlur={handleBlur('isbn')}
            errors={errors.isbn}
            touched={touched.isbn}
          />
        </InputGroup>
        <Button
          onPress={handleSubmit}
          disabled={isSubmitting}
          title={i18n.t('add.book')}
        />

        <Button
          onPress={() => {
            this.setState({ scanBarCode: true });
          }}
          title={i18n.t('scanBarcode')}
        />
        {this.state.scanBarCode && (
          <BarCodeScanner
            onBarCodeScanned={({ data }) => {
              this.setState({ scanBarCode: false });
              setFieldValue('isbn', data);
            }}
            style={StyleSheet.absoluteFill}
          />
        )}
      </View>
    );
  };

  handleSubmit = values => {
    this.props.addBook(values);
    this.props.navigation.goBack();
  };

  render() {
    return (
      <FormikContainer>
        <Formik
          initialValues={initialBookValues}
          onSubmit={this.handleSubmit}
          validationSchema={bookValidations(this.props.books.map(b => b.isbn))}
          render={this.renderForm}
        />
      </FormikContainer>
    );
  }
}

export default NewBookScreen;
