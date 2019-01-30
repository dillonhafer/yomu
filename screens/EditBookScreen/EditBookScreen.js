import React, { Component } from 'react';
import { View } from 'react-native';
import i18n from 'app/I18n';

// FORM
import {
  FormikContainer,
  InputGroup,
  Input,
  Line,
  Button,
} from 'app/components/Form';
import { Formik } from 'formik';
import * as Yup from 'yup';

const bookValidations = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  author: Yup.string().required('Author is required'),
  isbn: Yup.string().required('ISBN is required'),
});

class EditBookScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      gesturesEnabled: false,
      title: navigation.getParam('book').title,
      headerBackImage: (
        <View
          style={{
            width: 13,
          }}
        />
      ),
    };
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
            value={values.author}
            label={i18n.t('author')}
            placeholder={i18n.t('author')}
            ref={input => {
              this.inputs['author'] = input;
            }}
            onSubmitEditing={handleSubmit}
            returnKeyType="done"
            onChangeText={handleChange('author')}
            onBlur={handleBlur('author')}
            errors={errors.author}
            touched={touched.author}
          />
          <Line />
          <Input label="ISBN" editable={false} value={values.isbn} />
        </InputGroup>

        <Button
          onPress={handleSubmit}
          disabled={isSubmitting}
          title={i18n.t('update.book')}
        />

        <View>
          <Button
            color="red"
            onPress={this.handleDelete}
            title={i18n.t('delete.book')}
          />
        </View>
      </View>
    );
  };

  handleDelete = () => {
    const book = this.props.navigation.getParam('book');
    this.props.deleteBook(book);
    this.props.navigation.goBack();
  };

  handleSubmit = values => {
    this.props.updateBook(values);
    this.props.navigation.goBack();
  };

  render() {
    const book = this.props.navigation.getParam('book');

    return (
      <FormikContainer>
        <Formik
          initialValues={book}
          onSubmit={this.handleSubmit}
          validationSchema={bookValidations}
          render={this.renderForm}
        />
      </FormikContainer>
    );
  }
}

export default EditBookScreen;
