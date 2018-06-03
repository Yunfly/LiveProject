import React, { Component } from 'react'
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import hot from '@/assets/icon-hot.png'
import clock from '@/assets/icon-clock-btn.png'
import creative from '@/assets/icon-creative-nor.png'
import like from '@/assets/icon-like-nor.png'
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
        <div className={styles.menu}>
          <div className={styles.active}><img src={hot} alt="热门" /> <span>热门</span></div>
          <div><img src={clock} alt="预告" /><span>预告</span></div>
          <div><img src={creative} alt="最新" /><span>最新</span></div>
          <div><img src={like} alt="关注" /><span>关注</span></div>
        </div>
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
