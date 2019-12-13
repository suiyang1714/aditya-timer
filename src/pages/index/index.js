import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'

import moment from 'moment'
import _ from 'lodash'

import './index.scss'
import NavigationBar from '../../component/navigationBar'


class Index extends Component {

  config = {
    navigationBarTitleText: '',
    disableScroll: true
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
  _renderHtml () {
    let words = 'aditya sui'.split(" ");
    let result = []
    words.forEach( (word) =>  {
      let _a = word.split(""), initial = _a[0], restLetters = _a.slice(1);
      result.push({
        type: 'initial',
        value: initial
      })
      restLetters.forEach((letter) => {
        result.push({
          type: 'hidden',
          value: letter
        })
      });
    });
    return result.map((item, index) => {
      return <Text className={item.type} key={index}>{item.value}</Text>
    })
  }
  onTouchMove(){
    console.log(1)
  }

  render () {
    // const letters = this.state.countDownTime.split("");
    //
    // const html = letters
    //   .map((item, index) => {
    //     return <View className='span' key={index} style={{animationDelay: _.random(1, 1000) + "ms"}}>{item}</View>
    //   })
    let words = 'Aditya Sui'.split(" ");
    let result = []
    words.forEach( (word) =>  {
      let _a = word.split(""), initial = _a[0], restLetters = _a.slice(1);
      result.push({
        type: 'initial',
        value: initial
      })
      restLetters.forEach((letter) => {
        result.push({
          type: 'hidden',
          value: letter
        })
      });
    });
    const html =  result.map((item, index) => {
      return <Text className={item.type} key={index}>{item.value}</Text>
    })
    return (
      <View className='index'>
        {/*<NavigationBar title={'全部'} add={'/pages/add/index'} />*/}
        <NavigationBar />
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
            <View className='abbr' onTouchMove={this.onTouchMove.bind(this)}>
              {
                html
                // this._renderHtml.bind(this)
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
