import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import Auth from './Auth';
const App = () => {
  return (
    <View style={styles.container}>
      <Auth />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 60,
    paddingRight: 60,
  },
});
//
export default App;
