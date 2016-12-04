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

  constructor(props) {
    super(props)

    this.state = {
      isPickingDate: false
    }

    this.handlePress = this.handlePress.bind(this)
    this.handleChangeDate = this.handleChangeDate.bind(this)
  }

  handlePress() {
    this.setState({ isPickingDate: !this.state.isPickingDate })
  }

  handleChangeDate(date) {
    this.setState({ isPickingDate: false })
    this.props.updateDate(date)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>NYC JAZZ SHOWS</Text>
        <TouchableHighlight onPress={this.handlePress}>
          <Text style={styles.title}>
            {moment(this.props.date).tz('America/New_York').format('dddd, MMMM D')}
          </Text>
        </TouchableHighlight>
        {this.state.isPickingDate && (
          <DatePickerIOS
            style={{ backgroundColor: '#000000'}}
            date={this.props.date}
            mode={'date'}
            minimumDate={new Date(2016, 0)}
            maximumDate={new Date(2017, 11)}
            onDateChange={this.handleChangeDate}
          />
        )}
        <Text style={styles.shadow}></Text>
        {this.props.children}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#000000',
    padding: 10,
  },
  logo: {
    fontSize: 10,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 20
  },
  title: {
    lineHeight: 25,
    fontSize: 18,
    marginTop: 10,
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'GothamSSm-Light'
  },
  shadow: {
    marginBottom: 10,
  }
})
