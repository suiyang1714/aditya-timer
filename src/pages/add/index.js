import Taro, { Component } from '@tarojs/taro'
import { View, Picker, Text } from '@tarojs/components'

import moment from 'moment'

import './index.scss'
import NavigationBar from '../../component/navigationBar'


class Index extends Component {

  config = {
    navigationBarTitleText: ''
  }

  constructor (props) {
    super(props)
    this.state = {
      countDownTime: '',
      process: '',
      startTime: ''
    }
  }

  componentDidMount() {
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () {
    clearInterval(this.timer) }

  componentDidShow () { }

  componentDidHide () {
  }

  onStartTime (event) {
    this.setState({
      startTime: event.detail.value
    })
  }


  render () {
    return (
      <View className='index'>
        <NavigationBar title={'new process'} backVisible={true} />
        <View className='main'>
          <View>
            <Picker  mode={'date'}  onChange={this.onStartTime.bind(this)}>time</Picker>
            {
              this.state.startTime
            }
          </View>
        </View>
      </View>
    )
  }
}

export default Index
