import moment from 'moment-timezone'
import React from 'react'
import Show from './Show'
import DatePicker2 from './DatePicker2'
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  Text,
  Image,
  Modal,
  Linking,
  Share,
  ScrollView,
  RefreshControl,
  TouchableHighlight,
  View
} from 'react-native'


export default class ShowList extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      refreshing: false,
      isModalVisible: false,
    }

    this.handleRate = this.handleRate.bind(this)
    this.handleRefresh = this.handleRefresh.bind(this)
    this.handleShare = this.handleShare.bind(this)
  }

  handleRate() {
    const link = 'itms-apps://itunes.apple.com/us/app/id1188163326?mt=8'

    Linking.canOpenURL(link).then(supported => {
      supported && Linking.openURL(link)
    }, (err) => console.log(err))
  }

  handleRefresh() {
    this.setState({ refreshing: true })
    this.props.refresh(() => {
      this.setState({ refreshing: false })
    })
  }

  handleShare() {
    Share.share({
      message: 'Share the NYC Jazz Shows App',
      url: 'https://appsto.re/us/-7E0gb.i',
      title: 'NYC Jazz Shows'
    }, {
      dialogTitle: 'Share the NYC Jazz Shows App',
      tintColor: 'red'
    })
  }

  renderShows() {
    if (this.props.isLoading) {
      return (
        <Text style={styles.loading}>Loading...</Text>
      )
    }

    if (this.props.shows.length < 1) {
      return (
        <Text style={styles.noShows}>We didn't find any shows on this date. Sorry :(</Text>
      )
    }

    return this.props.shows.map((show, i) => {
      return (
        <Show
          key={i}
          title={show.title}
          link={show.link}
          venue={show.venue}
          startDateTime={show.startDateTime}
          {...this.props}
        />
      )
    })
  }

  render() {
    return (
      <View style={styles.view}>
        <View style={{ height: 100 }}>
          <DatePicker2 {...this.props} />
        </View>

        <ScrollView
          style={styles.scrollView}
          refreshControl={(
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.handleRefresh}
            />
          )}
        >
          {this.renderShows()}
        </ScrollView>

        <Modal
          animationType={'fade'}
          transparent={true}
          visible={this.state.isModalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
        >
          <View style={styles.modal}>

            <TouchableHighlight onPress={() => { this.setState({ isModalVisible: false })}}>
              <Image
                style={{ width: 30, height: 30 }}
                source={require('../close-x.png')}
              />
            </TouchableHighlight>

            <Text style={styles.modalText}>
              NYC Jazz Shows is a free app that makes it a little bit easier to
              find and see great live jazz in the city.
              {'\n'}{'\n'}
              {'Questions? Comments? Email nycjazzshows@gmail.com.'}
            </Text>

            <Text style={styles.button} onPress={this.handleShare}>
              SHARE THE LOVE
            </Text>

            <Text style={styles.button} onPress={this.handleRate}>
              RATE THIS APP
            </Text>

          </View>
        </Modal>

        <TouchableHighlight style={styles.info} onPress={() => { this.setState({ isModalVisible: true })}}>
          <Text style={styles.infoText}>•••</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#000000'
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#000000'
  },
  welcome: {
    flex: 1,
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#000000'
  },
  loading: {
    fontFamily: 'GothamSSm-Light',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 10,
    color: '#FFFFFF'
  },
  noShows: {
    fontFamily: 'GothamSSm-Light',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 10,
    color: '#FFFFFF'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  modal: {
    alignItems: 'center',
    flex: 1,
    padding: 50,
    paddingTop: 100,
    backgroundColor: 'rgba(0,0,0,0.9)'
  },
  modalText: {
    marginTop: 50,
    marginBottom: 20,
    lineHeight: 22,
    textAlign: 'center',
    color: '#FFFFFF',
    fontFamily: 'GothamSSm-Light',
  },
  button: {
    width: 260,
    fontFamily: 'GothamSSm-Black',
    backgroundColor: '#FF0000',
    color: '#FFFFFF',
    textAlign: 'center',
    padding: 15,
    borderRadius: 5,
    fontSize: 11,
    lineHeight: 10,
    marginTop: 10
  },
  info: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    width: 50,
    height: 50,
    paddingTop: 15,
    borderRadius: 25,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderColor: '#FFFFFF',
    borderWidth: 0.1
  },
  infoText: {
    fontFamily: 'GothamSSm-Light',
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
  }
})
