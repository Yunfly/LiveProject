import React, { Component } from 'react'
import { Input } from 'antd';
import styles from './index.less'

const Search = Input.Search;

export default class componentName extends Component {
  render() {
    return (
      <div className={styles.Controller}>
        <Search
          placeholder="弹幕，与大家一起互动"
          enterButton="发送"
          size="large"
          onSearch={value => console.log(value)}
        />
      </div>
    )
  }
}
