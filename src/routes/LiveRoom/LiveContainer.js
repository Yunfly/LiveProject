import React, { Component } from 'react'
import { Row, Col, Avatar } from 'antd'

import styles from './index.less'
import CatRoom from './CatRoom'

export default class componentName extends Component {
  componentDidMount() {
    const option = {
      "channel_id": "16093425727656143421",
      "app_id": "1251132611",
      "width": 900,
      "height": 580,
    };

    const player = new qcVideo.Player('liveRome', option);
    let barrage = [
      { "type": "content", "content": "hello world", "time": "1" },
      { "type": "content", "content": "上方显示", "time": "1", "postion": "center", "style": "C64B03;30", "position": "center" }
    ];
    setInterval(() => {
      player.addBarrage(barrage);
    }, 12)
    // window.addEventListener('resize', this.handleOnResize, true);

  }

  componentWillUnmount() {
    clearTimeout(this.handleOnResize);
  }

  handleOnResize = () => {
    const option = {
      "channel_id": "16093425727656143421",
      "app_id": "1251132611",
      "width": 900,
      "height": 580,
    };

    const player = new qcVideo.Player('liveRome', option);
    let barrage = [
      { "type": "content", "content": "hello world", "time": "1" },
      { "type": "content", "content": "居中显示", "time": "1", "style": "C64B03;30", "position": "center" }
    ];
  }
  render() {
    return (
      <div className={styles.normal}>
        <Row type="flex" justify="center" style={{ maxWidth: 1000, margin: '0 auto' }}>
          <Col span={18}>
            <Row type="flex" justify="space-between">
              <Col span={24}>
                <div className={styles.guangg}>
                  广告
                </div>
              </Col>
              <Col span={10}>
                <Row type="flex">
                  <Col>
                    <Avatar icon="user" />
                  </Col>
                  <Col offset={1}>
                    <h3>直播房间名</h3>
                    <p>2018-05-29　15：30</p>
                    <p>直播用户的名称</p>
                  </Col>
                </Row>
              </Col>
              <Col>
                分享：

              </Col>
            </Row>
            <div id="liveRome" className={styles.liveRoom}>asdasd</div>
          </Col>
          <Col span={6}>
            <CatRoom />
          </Col>
        </Row>
      </div>
    )
  }
}
