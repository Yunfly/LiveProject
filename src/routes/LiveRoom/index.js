import React, { Component } from 'react'
import { Row, Col, Avatar } from 'antd'
import { connect } from 'dva'
import moment from 'moment'
import qq from '@/assets/icon-qq.png'
import wechat from '@/assets/icon-wechat.png'
import adv from '@/assets/bg-adv.jpg'

import styles from './index.less'
import CatRoom from './CatRoom/index'

@connect(({ live }) => ({
  live,
}))
export default class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: ''
    }
  }
  async componentWillMount() {
    const { match: { params }, dispatch } = this.props
    await dispatch({
      type: "live/fetchLiveInfo",
      payload: {
        id: params.id
      }
    })
    const { liveRoomInfo } = this.props.live
    const { cover, play_url } = liveRoomInfo
    const { list } = play_url[0]
    const liveurl = {}
    list.map((x, index) => {
      const key = `live_url${index > 0 ? index + 1 : ''}`
      Object.assign(liveurl, { [key]: x.url })
    })
    console.log({ liveurl })
    const option = {
      ...liveurl,
      "width": 900,
      "height": 580,
      h5_start_patch: {
        url: cover,
        stretch: false
      },
      wording: {
        '2': '您查看的主播暂时没有开播哦~',
      }
    };
    console.log({ option })
    const player = new qcVideo.Player('liveRome', option);
    this.setState({ player })
    const barrage = [
      { "type": "content", "content": "hello world", "time": "1" },
      { "type": "content", "content": "居中显示", "time": "1", "style": "C64B03;30", "position": "center" },
    ];
    setInterval(() => {
      player.addBarrage(barrage);
    }, 3000)

  }
  hideDm = () => {
    const { player } = this.state
    console.log({ player })
    player.closeBarrage()
  }
  render() {
    const { liveRoomInfo } = this.props.live
    const { description, id, name, cover, time_next, user, onClick } = liveRoomInfo
    console.log({ liveRoomInfo })
    console.log({ user })
    return (
      <div className={styles.normal}>
        <div className={styles.roomMes}>
          <img alt='广告位' src={adv} />
        </div>
        {id ? (
          <div className={styles.PlayerCase}>
            <div className={styles.PlayerCaseMain}>
              <div className={styles.content}>
                <Row type="flex" justify="space-between">
                  <Col span={24} className={styles.name}>{name}</Col>
                  <Col className={styles.info}>
                    <Row type="flex">
                      <Col style={{ lineHeight: '45px' }}>
                        <Avatar size="large" src={user.headimg} />
                      </Col>
                      <Col className={styles.liveinfo}>
                        <p>{user.nickname}</p>
                        {moment(time_next * 1000).format('YYYY年M月D日HH:mm:ss')}
                      </Col>
                    </Row>
                  </Col>
                  <Col className={styles.share}>
                    <span>分享：</span>&nbsp;<Avatar src={qq} />&nbsp;&nbsp;&nbsp;<Avatar src={wechat} />
                  </Col>
                </Row>
              </div>
              <div id="liveRome" />
              {/* <div className={styles.control}><button onClick={this.hideDm}>关闭弹幕</button></div> */}
            </div>
            <div className={styles.PlayerCaseLeft} >
              <CatRoom />
            </div>
          </div>
        ) : ('loading')}

      </div>
    )
  }
}
