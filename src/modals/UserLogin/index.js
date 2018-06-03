import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Modal, Tabs } from 'antd'

import AccountLogin from './AccountLogin'
import Register from './Register'
import ForgetAccount from './ForgetAccount'
import AppLogin from './AppLogin'


import styles from './index.less'

const TabPane = Tabs.TabPane;

const div = document.createElement('div');
function callback(key) {
  console.log(key);
}
class MyModal extends Component {
  state = {
    visible: true,
    route: 'account',
  }

  handleCancelBtn = () => {
    this.setState({ visible: false }, this.destory)
  }

  // dispatchTableRefresh
  destory = () => {
    setTimeout(() => {
      const unmountResult = ReactDOM.unmountComponentAtNode(div);
      if (unmountResult && div.parentNode) {
        div.parentNode.removeChild(div);
      }
    }, 300)
  }


  render() {
    const { visible, route } = this.state
    return (
      <div>
        <Modal
          visible={visible}
          className={styles.normal}
          footer={null}
          width={400}
          onCancel={this.handleCancelBtn}
        >
          {route === 'account' ? (
            <Tabs defaultActiveKey="1" onChange={callback}>
              <TabPane tab="账号密码登录" key="1">
                <AccountLogin
                  {...this.props}
                  onForget={() => this.setState({ route: 'ForgetAccount' })}
                  toRegister={() => this.setState({ route: 'register' })}
                  onOk={this.handleCancelBtn}
                />
              </TabPane>
              <TabPane tab="APP扫码登录" key="2">
                <AppLogin
                  {...this.props}
                />
              </TabPane>
            </Tabs>) : null}
          {route === 'register' ? (<Register {...this.props} onOk={() => this.setState({ route: 'account' })} />) : null}
          {route === 'ForgetAccount' ? (<ForgetAccount {...this.props} onOk={() => this.setState({ route: 'account' })} />) : null}
        </Modal>
      </div>
    )
  }
}


export default (props) => {
  ReactDOM.render(
    <MyModal {...props} />,
    div
  );
}
