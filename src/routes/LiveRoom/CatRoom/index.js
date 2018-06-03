import React, { Component } from 'react'
import styles from './index.less'

import Controller from './Controller'


export default class componentName extends Component {
  render() {
    return (
      <div className={styles.catRoom}>
        弹幕滚动区域

        <Controller />
      </div>
    )
  }
}
