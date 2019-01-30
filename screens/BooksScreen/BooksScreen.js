import React from 'react';
import i18n from 'app/I18n';
import {
  TouchableOpacity,
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';
import Colors from 'app/constants/Colors';
import HeaderIcon from 'app/components/HeaderIcon';
import BookRow from './BookRow';

class BooksScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: i18n.t('books'),
      headerBackTitle: i18n.t('cancel'),
      headerRight: (
        <TouchableOpacity
          style={{ paddingHorizontal: 20 }}
          onPress={navigation.getParam('newBook')}
        >
          <HeaderIcon name="ios-add" />
        </TouchableOpacity>
      ),
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({ newBook: this.newBook });
  }

  newBook = () => {
    this.props.navigation.push('NewBook');
  };

  keyExtractor = (book, index) => book.isbn;

  renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text>You don't have any books yet!</Text>
      <Text>Press + to add one</Text>
    </View>
  );

  renderItem = ({ item }) => (
    <BookRow navigation={this.props.navigation} book={item} />
  );

  render() {
    const { books } = this.props;

    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={{ flexGrow: 1 }}
          data={books}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          ListEmptyComponent={this.renderEmpty}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    color: Colors.activityIndicator,
  },
});

export default BooksScreen;
