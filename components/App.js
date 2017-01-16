import moment from 'moment-timezone'
import firebase from 'firebase'
const firebaseConfig = {
  apiKey: "AIzaSyBAG9Ec95VuFzHOQrcK6j2MZV_x14dRAEA",
  authDomain: "nycjazz.firebaseapp.com",
  databaseURL: "https://nycjazz.firebaseio.com",
  storageBucket: "firebase-nycjazz.appspot.com",
  messagingSenderId: "722481914669"
}
const firebaseApp = firebase.initializeApp(firebaseConfig)

import React from 'react'
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  DatePickerIOS,
  Text,
  View
} from 'react-native'

import ROUTES from './routes'
import BaseView from './BaseView'

const noop = () => {}


export default class NYCJazzApp extends React.Component {
  constructor() {
    super()

    this.updateStore = this.updateStore.bind(this)
    this.cacheShows = this.cacheShows.bind(this)

    this.state = {
      date: new Date(),
      isLoading: true,
      route: 0,
      show: {},
      allShows: {},
      selectedShows: [],
      uri: null
    }
  }

  componentDidMount() {
    this.cacheShows()
  }

  cacheShows(callback = noop) {
    const yesterdayStart = moment().startOf('day').subtract(1, 'days').format('X')
    const todayStart = moment().startOf('day').format('X')
    const selectedDate = moment(this.state.date).startOf('day').format('X')

    firebase.database().ref('/shows')
    .orderByChild('startDateTime')
    .startAt(parseInt(yesterdayStart))
    .once('value', snapshot => {

      let allShows = {}

      snapshot.forEach(child => {
        const show = child.val()
        show.id = child.key

        const day = moment(show.startDateTime, 'X').startOf('day').format('X')
        if (!allShows[day]) allShows[day] = []
        allShows[day].push(show)
      })

      this.setState({
        isLoading: false,
        allShows,
        selectedShows: allShows[selectedDate] || []
      }, callback)
    })
  }

  updateStore(key, value, callback) {
    if (!key || !value) return

    this.setState({ [key]: value }, () => {
      this.updateSelectedShows()
      if (!callback || typeof callback !== 'function') return
      callback()
    })
  }

  updateSelectedShows() {
    const selectedDate = moment(this.state.date).startOf('day').format('X')

    this.setState({
      selectedShows: this.state.allShows[selectedDate] || []
    })
  }

  render() {
    const route = ROUTES[this.state.route]

    return (
      <BaseView
        date={this.state.date}
        route={this.state.route}
        show={this.state.show}
        uri={this.state.uri}
        updateStore={this.updateStore}
        updateRoute={(i) => {
          this.setState({ route: i })
        }}
      >
        <route.view
          date={this.state.date.getTime()}
          shows={this.state.selectedShows}
          isLoading={this.state.isLoading}
          refresh={this.cacheShows}
        />
      </BaseView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  banner: {
    textAlign: 'center',
    backgroundColor: '#000000',
    padding: 10,
    color: '#FFFFFF'
  },
  logo: {
    fontSize: 10
  },
  title: {
    lineHeight: 25,
    fontSize: 14
  },
  welcome: {
    flex: 1,
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#000000'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})
