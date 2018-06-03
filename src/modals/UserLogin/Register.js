import React, { Component } from 'react'
import { Form, Icon, Input, Button, Row, Col, message } from 'antd';
import Captcha from 'components/Captcha'

import styles from './index.less'

const FormItem = Form.Item;

@Form.create()
export default class NormalLoginForm extends Component {
  constructor(props) {
    super(props)
    const sid = Date.parse(new Date()) / 1000 + parseInt(Math.random() * 1000, 10)

    this.state = {
      captchaUrl: `http://zb-admin.runger.net/site/captcha?sid=${sid}`,
      sid,
      loading: false,
      imgCode: false
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const { dispatch, onOk } = this.props
    const { sid } = this.state
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const { password1: password2 } = values
        this.setState({ loading: true })
        const response = await dispatch({
          type: "user/userSignUp",
          payload: {
            ...values,
            password2,
            sid
          }
        })
        if (response.success) {
          message.success('注册成功')
          onOk()
        }
        this.setState({ loading: false })
      }
    });
  }
  handleRefresh = () => {
    const sid = Date.parse(new Date()) / 1000 + parseInt(Math.random() * 1000, 10)
    this.setState({
      captchaUrl: `http://zb-admin.runger.net/site/captcha?sid=${sid}`,
      sid
    })
  }
  handleClick = () => {
    const { getFieldsValue } = this.props.form;
    const { sid } = this.state
    const { mobile, code } = getFieldsValue()

    const { dispatch } = this.props
    dispatch({
      type: "user/fetchSmsCode",
      payload: {
        mobile,
        code,
        sid
      }
    })
  }

  showcodeImg = (rule, value, callback) => {
    const form = this.props.form;
    console.log(rule, value, callback)
    this.setState({ imgCode: /^1\d{10}$/.test(form.getFieldValue('mobile')) })
    callback();
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { captchaUrl, loading, imgCode } = this.state
    return (
      <div className={styles.Register}>
        <h1>注册账号</h1>

        <Form onSubmit={this.handleSubmit} className={styles['login-form']}>
          <FormItem>
            {getFieldDecorator('mobile', {
              rules: [
                { required: true, message: '请输入手机号' },
                { pattern: /^1\d{10}$/, message: '手机号格式错误！' },
                { validator: this.showcodeImg }
              ],
            })(
              <Input prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="手机号（国际号码请加区号）" />
            )}
          </FormItem>
          <FormItem>
            <Row gutter={6}>
              <Col span={16}>
                {getFieldDecorator('code', {
                  rules: [{ required: true, message: '请输入右侧字母' }],
                })(
                  <Input prefix={<Icon type="picture" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入图形验证码" />
                )}
              </Col>
              <Col span={7}>
                {imgCode ? (<img onClick={this.handleRefresh} style={{ width: "100%" }} src={captchaUrl} alt="图形验证码" />) : null}
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            <Row gutter={8}>
              <Col span={16}>
                {getFieldDecorator('smscode', {
                  rules: [{ required: true, message: '请输入验证码' }],
                })(
                  <Input prefix={<Icon type="safety" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="验证码" />
                )}
              </Col>
              <Col span={7}>
                <Captcha
                  btnText="发送验证"
                  onClick={this.handleClick}
                />
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            {getFieldDecorator('password1', {
              rules: [{ required: true, message: '请输入密码' }, {
                pattern: /^(?=.*[a-zA-Z])(?=.*\d)[^]{8,16}$/, message: '密码长度限制为 8 - 16 个字符，且数字、字母、字符至少包含 2 种',
              }],
            })(
              <Input type="password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入密码" />
            )}
          </FormItem>
          <FormItem>
            <Button loading={loading} type="primary" htmlType="submit" className={styles['login-form-button']} >
              确认
            </Button>

          </FormItem>
        </Form>
        <br />
        <br />
        <br />
        <p className={styles.tips} style={{ fontSize: 12 }}>copyright© 2017 四川创新客区块链科技有限公司出品</p>
      </div>
    );
  }
}
