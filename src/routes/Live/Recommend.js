import React, { Component } from 'react'
import { Row, Col, Icon } from 'antd'
import styles from './index.less'

export default class componentName extends Component {
  render() {
    const { cover, name, user, onClick, count_online } = this.props
    return (
      <div className={styles.recommendDetail}>
        <Row type="flex" justify="space-between">
          <Col>
            <img onClick={onClick} src={cover} alt='主播信息' />
          </Col>
          <Col className={styles.info}>
            <span>{name}</span>
            <Row type="flex" justify="space-between" align="space-between" className={styles.info2}>
              <Col>
                {user.nickname}
              </Col>
              <Col>
                <Icon type="play-circle" /> {count_online}
              </Col>

            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}
