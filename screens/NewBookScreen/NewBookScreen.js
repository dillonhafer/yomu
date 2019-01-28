import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// FORM
import { InputGroup, Input, Line, Button } from 'app/components/Form';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Device from 'app/utils/Device';

const initialBookValues = {
  title: '',
  author: '',
  isbn: '',
};

const bookValidations = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  author: Yup.string().required('Author is required'),
  isbn: Yup.string().required('ISBN is required'),
});

class NewBookScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      gesturesEnabled: false,
      title: 'New Book',
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
  }) => {
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <InputGroup label="book">
          <Input
            label="Title"
            placeholder="Title"
            value={values.title}
            onChangeText={handleChange('title')}
            onBlur={handleBlur('title')}
            errors={errors.title}
            touched={touched.title}
          />
          <Line />
          <Input
            label="Author"
            placeholder="John Smith"
            onChangeText={handleChange('author')}
            value={values.author}
            onBlur={handleBlur('author')}
            errors={errors.author}
            touched={touched.author}
          />
          <Line />
          <Input
            label="ISBN"
            value={values.isbn}
            placeholder="0000000000"
            onChangeText={handleChange('isbn')}
            onBlur={handleBlur('isbn')}
            errors={errors.isbn}
            touched={touched.isbn}
          />
        </InputGroup>
        <Button
          onPress={handleSubmit}
          disabled={isSubmitting}
          title="Add Book"
        />
      </View>
    );
  };

  handleSubmit = values => {
    this.props.addBook(values);
    this.props.navigation.goBack();
  };

  render() {
    const baseStyles = { backgroundColor: '#eee', flex: 1 };
    const containerStyles = { flex: 1, backgroundColor: '#f6f6f6' };
    const style = Device.isTablet()
      ? [
          baseStyles,
          {
            maxHeight: 250,
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
            initialValues={initialBookValues}
            onSubmit={this.handleSubmit}
            validationSchema={bookValidations}
            render={this.renderForm}
          />
        </View>
      </View>
    );
  }
}

export default NewBookScreen;
