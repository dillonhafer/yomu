import React, { Component } from 'react';
import i18n from 'app/I18n';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ActionSheetIOS,
  Image,
} from 'react-native';
import HeaderIcon from 'app/components/HeaderIcon';

class BookRow extends Component {
  handleOnPress = () => {
    const { book, navigation } = this.props;
    const edit = 1;
    const log = 2;

    ActionSheetIOS.showActionSheetWithOptions(
      {
        title: book.title,
        options: [i18n.t('cancel'), i18n.t('edit.book'), i18n.t('logReading')],
        cancelButtonIndex: 0,
      },
      buttonIndex => {
        switch (buttonIndex) {
          case edit:
            navigation.push('EditBook', { book });
            break;
          case log:
            navigation.push('LogPagesRead', { isbn: book.isbn });
            break;
          default:
        }
      },
    );
  };

  render() {
    const { book } = this.props;

    return (
      <TouchableOpacity onPress={this.handleOnPress}>
        <View style={styles.container} id={book.isbn}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ margin: 10, marginRight: 20 }}>
              <View style={{ width: 67, height: 100 }}>
                {!book.image && (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'white',
                      borderWidth: 1,
                      borderColor: '#ccc',
                      width: 67,
                      borderRadius: 5,
                      height: 100,
                    }}
                  >
                    <HeaderIcon name="ios-book" />
                  </View>
                )}
                {book.image && (
                  <Image
                    resizeMode="contain"
                    style={{ width: 67, height: 100 }}
                    source={book.image}
                  />
                )}
              </View>
            </View>

            <View style={{ flex: 1, paddingRight: 10 }}>
              <Text style={{ fontWeight: '600' }} numberOfLines={2}>
                {book.title}
              </Text>
              <Text style={{ fontSize: 13, color: '#777' }}>
                {i18n.t('by')}
                {book.author}
                {i18n.t('byJP')}
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
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderRadius: 5,
    borderWidth: 1,
    margin: 8,
    marginHorizontal: 16,
    padding: 5,
  },
});

export default BookRow;
