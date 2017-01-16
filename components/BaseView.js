import moment from 'moment-timezone'
import React from 'react'
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  DatePickerIOS,
  Text,
  TouchableHighlight,
  View
} from 'react-native'


export default class BaseView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        {React.cloneElement(this.props.children, this.props)}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#000000',
  }
})
