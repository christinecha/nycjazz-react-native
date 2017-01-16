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


export default class DatePicker extends React.Component {
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
    this.props.updateStore('date', date)
  }

  render() {
    const date = moment(this.props.date).tz('America/New_York').format('dddd, MMMM D, YYYY')

    return (
      <View style={styles.container}>
        <Text style={styles.logo}>NYC JAZZ SHOWS</Text>
        <TouchableHighlight onPress={this.handlePress}>
          <Text style={styles.date}>
            <Text style={styles.date}>{date}</Text>
            <Text style={styles.caret}>&nbsp;&nbsp;&#9660;</Text>
          </Text>
        </TouchableHighlight>

        {this.state.isPickingDate && (
          <View style={styles.datepicker}>
            <DatePickerIOS
              date={this.props.date}
              mode={'date'}
              onDateChange={this.handleChangeDate}
            />
          </View>
        )}
        <Text style={styles.shadow}></Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: -1,
    flexDirection: 'column',
    backgroundColor: '#000000',
    zIndex: 1,
    padding: 20
  },
  logo: {
    fontSize: 10,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 10
  },
  date: {
    lineHeight: 25,
    fontSize: 16,
    marginTop: 10,
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'GothamSSm-Light'
  },
  caret: {
    fontSize: 8,
    marginBottom: 10
  },
  datepicker: {
    height: 200,
    backgroundColor: '#000000'
  },
  shadow: {
    // height: 20
  }
})
