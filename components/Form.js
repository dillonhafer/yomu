import React, { Component } from 'react';
import i18n from 'app/I18n';
import {
  Button as RNButton,
  View,
  Text,
  TextInput,
  StyleSheet,
  Switch,
  InputAccessoryView,
  Keyboard,
} from 'react-native';
import Layout from 'app/constants/Layout';
const { isTablet } = Layout;

export const DoneAccessory = ({
  inputAccessoryViewID,
  onPress = Keyboard.dismiss,
}) => (
  <InputAccessoryView nativeID={inputAccessoryViewID}>
    <View
      style={{
        backgroundColor: '#f0f0f1',
        alignItems: 'flex-end',
        paddingRight: 12,
        borderWidth: 1,
        borderColor: '#f0f0f1',
        borderTopColor: '#b9babd',
      }}
    >
      <RNButton
        onPress={onPress}
        style={{ fontWeight: '700' }}
        color="#157efb"
        title={i18n.t('done')}
      />
    </View>
  </InputAccessoryView>
);

export const InputGroup = ({ label, children }) => {
  return (
    <View>
      <Text style={styles.inputGroupLabel}>{label.toUpperCase()}</Text>
      <View style={styles.inputGroupContainer}>{children}</View>
    </View>
  );
};

export const Line = () => <View style={styles.line} />;

export const Button = ({ color, title, onPress, disabled = false }) => (
  <View style={styles.button}>
    <RNButton
      onPress={onPress}
      color={color}
      disabled={disabled}
      title={title}
    />
  </View>
);

export class Input extends Component {
  focus = () => {
    this.input.focus();
  };

  render() {
    const {
      type = 'text',
      editable = true,
      errors,
      touched,
      label,
      value,
      placeholder,
      onBlur,
      onChange,
      ...rest
    } = this.props;
    const showErrors = errors && touched;
    const labelStyles = showErrors
      ? [styles.label, styles.labelError]
      : styles.label;

    const input =
      type === 'switch' ? (
        <Switch
          style={{ marginVertical: 3 }}
          onValueChange={onChange}
          value={value}
        />
      ) : (
        <TextInput
          onChangeText={onChange}
          onBlur={onBlur}
          value={value}
          ref={i => {
            this.input = i;
          }}
          placeholder={placeholder}
          style={[
            styles.input,
            editable ? {} : { opacity: 0.6, color: '#aaa' },
          ]}
          editable={editable}
          {...rest}
        />
      );
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text
            style={[
              labelStyles,
              editable ? {} : { opacity: 0.6, color: '#aaa' },
            ]}
          >
            {label}
          </Text>
          {input}
        </View>
        {showErrors && <Text style={styles.error}>{errors}</Text>}
      </View>
    );
  }
}

export const FormikContainer = ({ children, maxHeight = 300 }) => {
  const style = isTablet
    ? [styles.formContainerBase, styles.formContainerTablet, { maxHeight }]
    : styles.formContainerBase;

  return (
    <View style={styles.formContainer}>
      <View style={style}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingRight: 12,
    backgroundColor: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {},
  input: { flex: 1, paddingVertical: 10, textAlign: 'right', marginLeft: 12 },
  error: {
    fontSize: 10,
    paddingBottom: 5,
    color: 'red',
  },
  labelError: {
    color: 'red',
  },
  line: {
    backgroundColor: '#ccc',
    height: StyleSheet.hairlineWidth,
  },
  button: {
    marginTop: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
    borderLeftColor: '#fff',
    borderRightColor: '#fff',
    backgroundColor: '#fff',
  },
  inputGroupLabel: {
    marginLeft: 12,
    marginTop: 12,
    marginBottom: 6,
    fontSize: 12,
    color: '#666',
  },
  inputGroupContainer: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderLeftColor: '#fff',
    borderRightColor: '#fff',
    borderWidth: StyleSheet.hairlineWidth,
    paddingLeft: 12,
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
  formContainerBase: {
    backgroundColor: '#eee',
    flex: 1,
  },
  formContainerTablet: {
    alignSelf: 'center',
    marginVertical: 24,
    borderRadius: 8,
    borderColor: '#eee',
    borderWidth: StyleSheet.hairlineWidth,
    width: 450,
  },
});
