import React, { Component } from 'react'
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import LiveBox from './LiveBox';
import Recommend from './Recommend';
import styles from './index.less'

@connect(({ live }) => ({
  live,
}))
export default class componentName extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: "live/fetchLiveList"
    })
  }
  render() {
    const { live: { liveroomList } } = this.props
    return (
      <div className={styles.normal}>
        {liveroomList.map(
          x => <LiveBox onClick={() => this.props.dispatch(routerRedux.push(`/${x.id}`))} key={x.id} {...x} />
        )}
        <div className={styles.recommend}>
          <p className={styles.title}>相关推荐</p>
          {liveroomList.map(
            x => <Recommend onClick={() => this.props.dispatch(routerRedux.push(`/${x.id}`))} key={x.id} {...x} />
          )}
        </div>
      </div>
    )
  }
}