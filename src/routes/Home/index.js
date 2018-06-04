import React, { Component } from 'react'
import {Row,Col} from 'antd'
import banner from '@/assets/bg-banner.jpg'
import bg1 from '@/assets/bg-1.jpg'
import bg2 from '@/assets/bg-2.jpg'
import bg3 from '@/assets/bg-3.jpg'
import iphone from '@/assets/icon-i-phone.png'
import android from '@/assets/icon-android.png'
import QRCode from 'qrcode.react';

import styles from './index.less'

export default class componentName extends Component {
  render() {
    return (
      <div className={styles.normal}>
        <img alt="banner" src={banner} className={styles.banner} />
        <div className={styles.content}>
          <p className={styles.title}>币圈活动动态，链圈新闻资讯</p>
          <p className={styles.subtitle}>现场直击，最新热点</p>

          <div className={styles.bggroup}>
            <Row type="flex" justify="center">
              <Col className={styles.box}>
                <img alt="banner" src={bg1} className={styles.bgicon} />
                <p>直击现场活动</p>
              </Col>
              <Col className={styles.box}>
                <img alt="banner" src={bg2} className={styles.bgicon} />
                <p>大佬在线互动</p>
              </Col>
              <Col className={styles.box}>
                <img alt="banner" src={bg3} className={styles.bgicon} />
                <p>圈内直播热点</p>
              </Col>
            </Row>
          </div>
          <p className={styles.downTips}>下载直播，感受不一样的惊喜</p>

          <div className={styles.downGroup}>
            <Row type="flex" justify="center">
              <Col className={styles.box}>
                <img alt="banner" src={android} className={styles.bgicon} />
                <p>Android</p>
              </Col>
              <Col className={styles.box}>
                <QRCode
                  value="http://facebook.github.io/react/"
                  size={134}
                />                
              </Col>
              <Col className={styles.box}>
                <img alt="banner" src={iphone} className={styles.bgicon} />
                <p>iPhone</p>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    )
  }
}
