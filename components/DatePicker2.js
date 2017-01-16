import moment from 'moment-timezone'
import React from 'react'
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  Image,
  Text,
  TouchableHighlight,
  View
} from 'react-native'


export default class DatePicker2 extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isPickingDate: false
    }

    this.handlePrev = this.handlePrev.bind(this)
    this.handleNext = this.handleNext.bind(this)
    this.handleBackToToday = this.handleBackToToday.bind(this)
  }

  handlePrev() {
    const date = moment(this.props.date).tz('America/New_York').subtract(1, 'days').toDate()
    this.props.updateStore('date', date)
  }

  handleNext() {
    const date = moment(this.props.date).tz('America/New_York').add(1, 'days').toDate()
    this.props.updateStore('date', date)
  }

  handleBackToToday() {
    const date = moment().tz('America/New_York').toDate()
    this.props.updateStore('date', date)
  }

  render() {
    const date = moment(this.props.date).startOf('day')
    const formattedDate = date.tz('America/New_York').format('dddd, MMMM D, YYYY')

    const isYesterday = date.diff(moment().startOf('day'), 'days') === -1

    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this.handleBackToToday}>
          <Text style={styles.logo}>NYC JAZZ SHOWS</Text>
        </TouchableHighlight>

        <View style={{ flexDirection: 'row' }}>

          <View style={{ flex: 0.1 }}>
            {!isYesterday && (
              <TouchableHighlight onPress={this.handlePrev}>
                <Image
                  style={{ width: 30, height: 30 }}
                  source={require('../prev-arrow.png')}
                  />
              </TouchableHighlight>
            )}
          </View>

          <View style={{ flex: 0.8 }}>
            <Text style={styles.date}>{formattedDate}</Text>
          </View>

          <TouchableHighlight style={{ flex: 0.1 }} onPress={this.handleNext}>
            <Image
              style={{ width: 30, height: 30 }}
              source={require('../next-arrow.png')}
            />
          </TouchableHighlight>
        </View>

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
  arrow: {
    fontSize: 8,
    marginBottom: 10,
    color: '#FFFFFF',
    fontFamily: 'GothamSSm-Light'
  },
  datepicker: {
    height: 200,
    backgroundColor: '#000000'
  },
  shadow: {
    // height: 20
  }
})
