import moment from 'moment-timezone'
import firebase from 'firebase'
import React from 'react'
import Show from './Show'
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  Text,
  ScrollView
} from 'react-native'

const firebaseConfig = {
  apiKey: "AIzaSyBAG9Ec95VuFzHOQrcK6j2MZV_x14dRAEA",
  authDomain: "nycjazz.firebaseapp.com",
  databaseURL: "https://nycjazz.firebaseio.com",
  storageBucket: "firebase-nycjazz.appspot.com",
  messagingSenderId: "722481914669"
};
const firebaseApp = firebase.initializeApp(firebaseConfig)


export default class ShowList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      shows: []
    }

    this.watchShows()
  }

  watchShows() {
    const nowInSeconds = this.props.date / 1000
    const todayStart = moment(nowInSeconds, 'X').startOf('day').format('X')
    const todayEnd = moment(nowInSeconds, 'X').endOf('day').format('X')

    firebase.database().ref('/shows')
    .orderByChild('startDateTime')
    .startAt(parseInt(todayStart))
    .endAt(parseInt(todayEnd))
    .once('value', snapshot => {
      const data = snapshot.val()
      let shows = []
      for (let i in data) {
        const show = data[i]
        show.id = i
        shows.push(data[i])
      }
      this.setState({ shows })
    })
  }

  componentDidUpdate() {
    this.watchShows()
  }

  renderShows() {
    if (this.state.shows.length < 1) return null

    return this.state.shows.map((show, i) => {
      return <Show key={i} title={show.title} venue={show.venue} startDateTime={show.startDateTime} />
    })
  }

  render() {
    console.log('rerendering')
    return (
      <ScrollView style={styles.view}>
        {this.renderShows()}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#000000',
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
