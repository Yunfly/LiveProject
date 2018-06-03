import React, { Component } from 'react'
import { Row, Col, Avatar } from 'antd'
import { connect } from 'dva'

import styles from './index.less'
import CatRoom from './CatRoom/index'

@connect(({ live }) => ({
  live,
}))
export default class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  async componentDidMount() {
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
      wording:{
        '2' : '您查看的主播暂时没有开播哦~',
      }
    };
    console.log({ option })
    const player = new qcVideo.Player('liveRome', option);
    const barrage = [
      { "type": "content", "content": "hello world", "time": "1" },
      { "type": "content", "content": "居中显示", "time": "1", "style": "C64B03;30", "position": "center" },
    ];
    setInterval(() => {
      player.addBarrage(barrage);
    }, 3000)

  }

  render() {
    return (
      <div className={styles.normal}>
        <div className={styles.PlayerCase}>
          <div className={styles.PlayerCaseMain}>
            <div className={styles.roomMes}>
              asd
            </div>
            <div className={styles.roomMes}>
              asd
            </div>
            <div id="liveRome" />
          </div>
          <div className={styles.PlayerCaseLeft} >
            <CatRoom />
          </div>
        </div>
      </div>
    )
  }
}
