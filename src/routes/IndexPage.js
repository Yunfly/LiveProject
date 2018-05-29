import React from 'react';
import axios from 'axios';
import styles from './IndexPage.css';

export default class IndexPage extends React.Component {
  state = {
    token: undefined,
    play_url: undefined,
    option:{}
  }
  handleLogin = async () => {
    const response = await axios('/api/v1/user/login', {
      method: 'post',
      data: {
        type: "username",
        username: "admin",
        password: "admin"
      }
    })
    const { token } = response.data.data
    console.log({ token });
    this.setState({ token })
  }
  fetchLiveUrl = async () => {
    const response = await axios('/api/v1/live/push', {
      method: 'post',
      data: {
        token: this.state.token,
        room: 666
      }
    })
    const { play_url } = response.data.data
    console.log({ play_url });
    this.setState({ play_url })

  }
  startLiving = () => {
    const { play_url } = this.state
    console.log({ play_url });
    console.log(play_url[0]);
    var option = {
      "live_url": play_url[0].list[0].url,
      "live_url2": play_url[0].list[1].url,
      "width": 480,
      "height": 320
    };
    const {qcVideo} = window
    var player = new qcVideo.Player("id_video_container", option);
    this.setState({option})
  }
  render() {
    return (
      <div className={styles.normal}>
        <button onClick={this.handleLogin}>登陆</button>
        {
          !!this.state.token?<button onClick={this.fetchLiveUrl}>获取直播地址</button>:null
        }
        {
          !!this.state.play_url?<button onClick={this.startLiving}>进入直播</button>:null
        }
        <div id="id_video_container"></div>
        {JSON.stringify(this.state.option)}
      </div>
    );
  }

}

