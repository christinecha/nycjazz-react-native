import moment from 'moment-timezone'
import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  WebView
} from 'react-native'

export default class WebViewWrapper extends React.Component {
  constructor(props) {
    super(props)

    this.handlePress = this.handlePress.bind(this)
    this.handleWebViewLoad = this.handleWebViewLoad.bind(this)

    this.state = {
      isLoaded: false
    }
  }

  handlePress() {
    this.props.updateRoute(0)
  }

  handleWebViewLoad() {
    this.setState({ isLoaded: true })
  }

  render() {
    const { show, uri } = this.props

    const startMoment = moment(show.startDateTime, 'X').tz('America/New_York')
    const date = startMoment.format('ddd, MMMM D | h:mm A')

    const hiddenStyles = {
      opacity: 0,
      height: 0
    }

    return (
      <View style={styles.container}>
        <TouchableHighlight style={styles.info} onPress={this.handlePress}>
          <Text style={styles.back}>&larr; BACK TO ALL SHOWS</Text>
        </TouchableHighlight>

        <View style={styles.info}>
          <Text style={styles.date}>{date}</Text>
          <Text style={styles.venue} numberOfLines={1} ellipsizeMode='tail'>{show.venue.toUpperCase()}</Text>
          <Text style={styles.title}>{show.title}</Text>
        </View>

        <View style={styles.webview}>
          <WebView
            style={this.state.isLoaded ? {} : hiddenStyles}
            onError={this.handleWebViewError}
            onLoad={this.handleWebViewLoad}
            ref={(ref) => { this.webview = ref }}
            source={{ uri: uri }}
          />
          {!this.state.isLoaded && (
            <Text style={styles.loadingText}>LOADING VENUE WEBSITE ...</Text>
          )}
        </View>
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
    paddingTop: 20
  },
  loadingText: {
    color: '#FFFFFF',
    fontFamily: 'GothamSSm-Light',
    textAlign: 'center',
    flex: 1,
    marginTop: -200
  },
  webview: {
    flex: 1,
    backgroundColor: '#000000',
    flexDirection: 'column',
  },
  logo: {
    fontSize: 10,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 20
  },
  back: {
    color: '#FFFFFF',
    fontFamily: 'GothamSSm-Light',
    fontSize: 8,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    textAlign: 'left'
  },
  info: {
    flex: -1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontFamily: 'GothamSSm-Light',
    lineHeight: 25,
    fontSize: 14,
    marginBottom: 15,
    textAlign: 'right'
  },
  venue: {
    color: '#FFFFFF',
    fontFamily: 'GothamSSm-Light',
    fontSize: 11,
    marginBottom: 5,
    textAlign: 'right'
  },
  date: {
    fontFamily: 'GothamSSm-Light',
    color: '#FFFFFF',
    fontSize: 11,
    marginBottom: 5,
    textAlign: 'right'
  },
  shadow: {
    height: 15
  }
})
