import React from 'react'
import moment from 'moment-timezone'
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  Text,
  TouchableHighlight,
  View
} from 'react-native'


export default class Show extends React.Component {
  constructor(props) {
    super(props)

    this.handlePress = this.handlePress.bind(this)
  }

  handlePress() {
    const { link, title, startDateTime, venue, updateStore, updateRoute } = this.props
    updateStore('show', { title, startDateTime, venue })
    updateStore('uri', link, () => updateRoute(1))
  }

  render() {
    const startMoment = moment(this.props.startDateTime, 'X').tz('America/New_York')
    const hours = startMoment.format('hh:mm')
    const ampm = startMoment.format('A')

    return (
      <TouchableHighlight onPress={this.handlePress}>
        <View style={styles.view}>
          <Text style={styles.time}>
            <Text style={styles.hours}>{hours}</Text>
            {'\n'}
            <Text style={styles.ampm}>{ampm}</Text>
          </Text>

          <View style={styles.info}>
            <Text style={styles.venue} numberOfLines={1} ellipsizeMode='tail'>{this.props.venue.toUpperCase()}</Text>
            <Text style={styles.title} numberOfLines={1} ellipsizeMode='tail'>{this.props.title}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#000000',
    height: 60,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 8,
    marginBottom: 8
  },
  time: {
    backgroundColor: '#FF0000',
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    color: '#FFFFFF',
    paddingTop: 15,
    textAlign: 'center'
  },
  hours: {
    fontSize: 16,
    fontFamily: 'GothamSSm-Light'
  },
  ampm: {
    fontSize: 10,
    fontFamily: 'GothamSSm-Black',
  },
  info: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 15,
  },
  venue: {
    fontFamily: 'GothamSSm-Light',
    color: '#FFFFFF',
    fontSize: 10,
    marginBottom: 5
  },
  title: {
    fontFamily: 'GothamSSm-Light',
    color: '#FFFFFF',
  }
})
