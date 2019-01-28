import React, { Component } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ActionSheetIOS,
} from 'react-native';
import HeaderIcon from 'app/components/HeaderIcon';

class BookRow extends Component {
  handleOnPress = () => {
    const { book, navigation } = this.props;
    const edit = 1;
    const log = 2;

    ActionSheetIOS.showActionSheetWithOptions(
      {
        message: book.title,
        options: ['Cancel', 'Edit Book', 'Log Pages Read'],
        cancelButtonIndex: 0,
      },
      buttonIndex => {
        switch (buttonIndex) {
          case edit:
            navigation.push('EditBook', { book });
            break;
          case log:
            navigation.push('LogPagesRead', { isbn: book.isbn });
          default:
        }
      },
    );
  };

  render() {
    const { book } = this.props;

    return (
      <TouchableOpacity onPress={this.handleOnPress}>
        <View
          style={{
            backgroundColor: '#fff',
            borderColor: '#ccc',
            borderRadius: 5,
            borderWidth: 1,
            margin: 8,
            marginHorizontal: 16,
            padding: 5,
          }}
          id={book.isbn}
        >
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ margin: 10, marginRight: 20 }}>
              <HeaderIcon name="ios-book" />
            </View>

            <View style={{ flex: 1, paddingRight: 10 }}>
              <Text style={{ fontWeight: '600' }} numberOfLines={2}>
                {book.title}
              </Text>
              <Text style={{ fontSize: 13, color: '#777' }}>
                by {book.author}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default BookRow;
