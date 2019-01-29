import React, { Component } from 'react';
import {
  Button as RNButton,
  View,
  Text,
  TextInput,
  StyleSheet,
  Switch,
  DatePickerIOS,
} from 'react-native';

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

export const Input = ({
  type = 'text',
  errors,
  touched,
  label,
  value,
  placeholder,
  onBlur,
  onChange,
  ...rest
}) => {
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
        placeholder={placeholder}
        style={styles.input}
        {...rest}
      />
    );
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={labelStyles}>{label}</Text>
        {input}
      </View>
      {showErrors && <Text style={styles.error}>{errors}</Text>}
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
    paddingVertical: 5,
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
});
