import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'

import moment from 'moment'

import './index.scss'
import NavigationBar from '../../component/navigationBar'


class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  constructor (props) {
    super(props)
    this.state = {
      countDownTime: '',
      process: ''
    }
  }

  componentDidMount() {
    // 初始化
    const end = moment().endOf('year');
    const timeLeft = moment(end.diff(moment())); // get difference between now and timestamp
    const formatted = timeLeft.format(`DD天HH小时mm分ss秒`); // make pretty
    this.setState({
      countDownTime: formatted
    })
    // 倒计时定时器
    this.countDown()

    let now = new Date()
    this.setState({
      process: (((+now - +new Date(now.getFullYear(), 0, 1)) / (+new Date(now.getFullYear() + 1, 0, 1) - +new Date(now.getFullYear(), 0, 1))) * 100 ).toFixed(2)
    })
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () {
    clearInterval(this.timer) }

  componentDidShow () { }

  componentDidHide () {
  }

  countDown () {
    // create the timestamp here. I use the end of the day here as an example
    const end = moment().endOf('year');
    this.timer = setInterval(() => {
      const timeLeft = moment(end.diff(moment())); // get difference between now and timestamp
      const formatted = timeLeft.format(`DD天HH小时mm分ss秒`); // make pretty
      this.setState({
        countDownTime: formatted
      })
    }, 1000);
  }

  render () {
    return (
      <View className='index'>
        <NavigationBar title={'全部'} />
        <View className='main'>
          <View className='countDown'>
            <View className='countDown__title'>
              {
                `${new Date().getFullYear() + 1}年倒计时`
              }
            </View>
            <View className='countDown__time'>
              {
                this.state.countDownTime
              }
            </View>
          </View>
          <View>
            {/*<View className='yearBar'>*/}
              {/*<View className='bar' style={{width: this.state.process + '%'}} />*/}
              {/*{*/}
                {/*this.state.process*/}
              {/*}*/}
            {/*</View>*/}
          </View>
        </View>
      </View>
    )
  }
}

export default Index
