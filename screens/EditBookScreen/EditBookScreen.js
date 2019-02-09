import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import i18n from 'app/I18n';
import { ImagePicker, Permissions } from 'expo';

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

const bookValidations = isbns =>
  Yup.object().shape({
    title: Yup.string().required('Title is required'),
    author: Yup.string().required('Author is required'),
    isbn: Yup.string()
      .notOneOf(isbns, 'ISBN already in use')
      .required('ISBN is required'),
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

  handleChangeImage = ({ setFieldValue, setFieldTouched }) => {
    return () => {
      const options = {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        exif: false,
      };

      Permissions.askAsync(Permissions.CAMERA_ROLL).then(({ status }) => {
        if (status === 'granted') {
          ImagePicker.launchImageLibraryAsync(options).then(
            ({ cancelled, uri }) => {
              if (!cancelled) {
                setFieldValue('image', { uri });
                setFieldTouched('image', true);
              }
            },
          );
        }
      });
    };
  };

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
    setFieldValue,
    setFieldTouched,
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
            autoCapitalize="words"
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
            autoCapitalize="words"
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
          <Input
            label="ISBN"
            value={values.isbn}
            placeholder="0000000000"
            ref={input => {
              this.inputs['isbn'] = input;
            }}
            keyboardType="numeric"
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
          title={i18n.t('update.book')}
        />

        <View>
          <Button
            color="red"
            onPress={this.handleDelete}
            title={i18n.t('delete.book')}
          />
        </View>

        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <TouchableOpacity
            onPress={this.handleChangeImage({ setFieldValue, setFieldTouched })}
          >
            <View style={{ width: 100, height: 150 }}>
              {values.image && (
                <Image
                  resizeMode="contain"
                  style={{ width: 100, height: 150 }}
                  source={values.image}
                />
              )}
            </View>
          </TouchableOpacity>
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
    const { isbn } = this.props.navigation.getParam('book');
    this.props.updateBook(values, isbn);
    this.props.navigation.goBack();
  };

  render() {
    const book = this.props.navigation.getParam('book');

    return (
      <FormikContainer maxHeight={500}>
        <Formik
          initialValues={book}
          onSubmit={this.handleSubmit}
          validationSchema={bookValidations(
            this.props.books.filter(b => b.isbn !== book.isbn).map(b => b.isbn),
          )}
          render={this.renderForm}
        />
      </FormikContainer>
    );
  }
}

export default EditBookScreen;
