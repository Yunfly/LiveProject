import React, { Component } from 'react'
import { Button } from 'antd'

export default class componentName extends Component {
  static defaultProps = {
    onClick: () => { },
    btnText: '获取验证码',
  }
  state = {
    count: 0,
    loading: false
  }
  onGetCaptcha = async () => {

    this.setState({ loading: true })
    const response = await this.props.onClick()
    this.setState({ loading: false })
    let count = response || 59;
    this.setState({ count });
    this.interval = setInterval(() => {
      count -= 1;
      this.setState({ count });
      if (count === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  }
  render() {
    const { count, loading } = this.state
    const { btnText, className } = this.props
    return (
      <Button
        disabled={count}
        loading={loading}
        className={className}
        type={count ? 'default' : 'primary'}
        onClick={this.onGetCaptcha}
      >
        {count ? `验证(${count})` : `${btnText}`}
      </Button>
    )
  }
}
