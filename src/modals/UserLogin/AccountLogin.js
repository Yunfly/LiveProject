import React, { Component } from 'react'
import { Form, Icon, Input, Button, Alert } from 'antd';

import styles from './index.less'

const FormItem = Form.Item;

@Form.create()
export default class NormalLoginForm extends Component {
  state = {
    loading: false,
    errorAlert: false,
    message: ''
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const { dispatch } = this.props
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log({ values })
        this.setState({ loading: true })
        const response = await dispatch({
          type: "user/userLogin",
          payload: {
            ...values,
            type: "mobile"
          }
        })
        if (response.success) return this.props.onOk()
        let props = { errorAlert: false }
        if (response.code === 110003) {
          props = {
            errorAlert: true,
            message: "登录验证失败（用户名、密码、验证码其中一项有误）"
          }
        }
        this.setState({
          ...props,
          loading: false,
        })

      }
    });
  }

  handleClose = () => {
    this.setState({ errorAlert: false });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { toRegister, onForget } = this.props
    const { loading, message, errorAlert } = this.state
    return (
      <div className={styles.account}>
        <Form onSubmit={this.handleSubmit} className={styles['login-form']}>
          {errorAlert ? (
            <Alert
              message={message}
              type="error" class={styles.alert}
              closable
              afterClose={this.handleClose}
            />
          ) : null}
          <FormItem>
            {getFieldDecorator('mobile', {
              rules: [
                { required: true, message: '请输入手机号' },
                { pattern: /^1\d{10}$/, message: '手机号格式错误！' },
              ],
            })(
              <Input prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="手机号" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码' }, {
                pattern: /^(?=.*[a-zA-Z])(?=.*\d)[^]{8,16}$/, message: '密码长度限制为 8 - 16 个字符，且数字、字母、字符至少包含 2 种',
              }],
            })(
              <Input type="password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入密码" />
            )}
          </FormItem>
          <FormItem>
            <Button loading={loading} type="primary" htmlType="submit" className={styles['login-form-button']} >
              登 录
            </Button>
            <a onClick={onForget}>忘记密码</a>
            <a className={styles['login-form-forgot']} onClick={toRegister}>注册账户</a>
          </FormItem>
        </Form>
        <br />
        <br />
        <br />
        <br />
        <p className={styles.tips} style={{ fontSize: 12 }}>copyright© 2017 四川创新客区块链科技有限公司出品</p>
      </div>
    );
  }
}
