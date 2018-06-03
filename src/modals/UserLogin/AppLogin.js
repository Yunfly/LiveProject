import React, { Component } from 'react'
import QRCode from 'qrcode.react';

import styles from './index.less'

export default class componentName extends Component {
  render() {
    return (
      <div>
        <div className={styles.qrcode}>
          <QRCode
            value="http://facebook.github.io/react/"
            size={184}
          />
          <p className={styles.openTios}>请打开《梭哈》APP客户端扫一扫 </p>

          <p className={styles.tips}>还没有《梭哈》直播账号？<a>立即注册</a></p>

          <br />
          <br />
          <br />
          <br />
          <p className={styles.tips} style={{ fontSize: 12 }}>copyright© 2017 四川创新客区块链科技有限公司出品</p>

        </div>
      </div>
    )
  }
}
