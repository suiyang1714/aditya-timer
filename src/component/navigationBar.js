import Taro, {Component} from "@tarojs/taro";
import {Image, View} from "@tarojs/components";

import back from '../images/btn_back@2x.png'
import home from '../images/btn_homepage@2x.png'
import './navigationBar.scss'

class Default extends Component {
  state = {
    navBarHeight: 0,
    statusBarHeight: 0,
    titleBarHeight: 0,
  }
  componentWillMount() {
    const self = this
    Taro.getSystemInfo({
      success (system) {
        self.setState({
          statusBarHeight: system.statusBarHeight,
        })
        const capsule = wx.getMenuButtonBoundingClientRect()

        self.setState({
          navBarHeight: capsule.height + (capsule.top - Number(system.statusBarHeight)) * 2 + Number(system.statusBarHeight),
          titleBarHeight: capsule.height + (capsule.top - Number(system.statusBarHeight)) * 2
        })
      }
    })
  }

  backClick () {
    Taro.navigateBack()
  }

  homeClick () {
    Taro.navigateTo({url: this.props.add})

  }

  render() {
    const {navBarHeight, statusBarHeight, titleBarHeight} = this.state
    const { add, backVisible, titleColor, title, navBackgroundColor } = this.props

    return (
      <View className='navigatorBar'>
        <View className='navigatorBar__placeholder' style={{height: navBarHeight + 'px'}} />

        <View className='navigatorBar__main' style={{height: navBarHeight + 'px', backgroundColor: navBackgroundColor}}>

          <View className='navigatorBar__statusBar' style={{height: statusBarHeight + 'px'}} />

          <View className='navigatorBar__titleBar' style={{height: titleBarHeight + 'px'}}>
            <View className='capsule'>
              {
                backVisible &&
                <View className='capsule__item back' onClick={this.backClick.bind()}>
                  <Image className='capsule__item--img' src={back} />
                </View>
              }
              {
                add &&
                <View className='capsule__item add' onClick={this.homeClick.bind()}>
                  {/*<Image className='capsule__item--img' src={home} />*/}
                  +
                </View>
              }
            </View>
            <View className='title' style={{color: titleColor}}>{title}</View>
          </View>
        </View>
      </View>
    )
  }
}

Default.defaultProps = {
  // 导航栏背景色
  navBackgroundColor: false,
  // 标题颜色
  titleColor: '#ffffff',
  // 标题文字
  title: '',
  // 是否显示后退按钮
  backVisible: false,
  // home按钮的路径
  addPath: ''
}

export default Default
