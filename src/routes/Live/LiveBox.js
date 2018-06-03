import React, { Component } from 'react'
import { Row, Col, Avatar } from 'antd'
import qq from '@/assets/icon-qq.png'
import moment from 'moment'
import wechat from '@/assets/icon-wechat.png'

import styles from './index.less'

export default class componentName extends Component {
  static defaultProps = {
    status: 1,
    name: "test",
    "cover": "http://zb.my.com/images/nopic.jpg",
  }
  render() {
    const { name, status, cover, time_next, user, onClick } = this.props
    return (
      <div className={styles.livebox}>
        <div className={styles.live}>
          <div className={styles.livePic}>
            <img onClick={onClick} src={cover} alt="直播间背景图" />
          </div>
          <div className={styles.status}>
            {status ? '直播中' : '未开播'}
          </div>
        </div>
        <div className={styles.content}>
          <Row type="flex" justify="space-between">
            <Col span={24} className={styles.name}>{name}</Col>
            <Col className={styles.info}>
              <Row type="flex">
                <Col style={{ lineHeight: '45px' }}>
                  <Avatar size="large" src={user.headimg} />
                </Col>
                <Col style={{ marginLeft: 10 }}>
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
      </div >
    )
  }
}
