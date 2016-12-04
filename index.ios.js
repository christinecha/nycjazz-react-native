import React from 'react'
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  DatePickerIOS,
  Text,
  View
} from 'react-native'

import ROUTES from './components'
import BaseView from './components/BaseView'


export default class NYCJazzApp extends React.Component {

  constructor() {
    super()

    this.state = {
      date: new Date()
    }
  }

  render() {
    return (
      <Navigator
        style        = {styles.container}
        initialRoute = {ROUTES[0]}
        renderScene  = {(route, navigator) => {
          return (
            <BaseView date={this.state.date} title={route.title} updateDate={(date) => {
                this.setState({ date })
              }}
            >
              <route.view date={this.state.date.getTime()} />
            </BaseView>
          )
        }}
      />
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

AppRegistry.registerComponent('nycjazzapp', () => NYCJazzApp)
