import React from 'react';
import { Layout, Icon, Dropdown, Menu, Avatar, Row, Col } from 'antd';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import { Route, Redirect, Switch, routerRedux } from 'dva/router';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import pathToRegexp from 'path-to-regexp';

import loginModal from '@/modals/UserLogin/index'

import NotFound from '../routes/Exception/403';
import { getRoutes } from '../utils/utils';
import { getMenuData } from '../common/menu';
import logo from '../assets/logo.png';
import styles from './BasicLayout.less';

const { Content, Header, Footer } = Layout;
const { SubMenu } = Menu;

const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
  },
};

@connect(({ user }) => ({
  user,
}))
export default class BasicLayout extends React.PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'user/fetchCurrent',
    });
  }
  getPageTitle() {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title = 'Ant Design Pro';
    let currRouterData = null;
    // match params path
    Object.keys(routerData).forEach(key => {
      if (pathToRegexp(key).test(pathname)) {
        currRouterData = routerData[key];
      }
    });
    if (currRouterData && currRouterData.name) {
      title = `${currRouterData.name} - 梭哈直播`;
    }
    return title;
  }
  handleClick = ({ key }) => {
    this.props.dispatch(routerRedux.push(key));
  };

  handleMenuClick = ({ key }) => {
    if (key === 'login') {
      return loginModal({
        dispatch: this.props.dispatch
      })
    }
    if (key === 'triggerError') {
      this.props.dispatch(routerRedux.push('/exception/trigger'));
      return;
    }
    if (key === 'logout') {
      this.props.dispatch({
        type: 'login/logout',
      });
    }
  };
  render() {
    const { routerData, match, user: { currentUser } } = this.props;
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.handleMenuClick}>
        <Menu.Item key="login" >
          <Icon type="user" />登录
        </Menu.Item>
        <Menu.Item disabled>
          <Icon type="setting" />设置
        </Menu.Item>
        <Menu.Item key="logout">
          <Icon type="logout" />退出登录
        </Menu.Item>
      </Menu>
    );
    const layout = (
      <Layout>
        <Layout>
          <Header className={styles.header}>
            <img src={logo} alt="logo" style={{ float: 'left', marginTop: 10 }} />
            <Row type="flex" justify="center">
              <Col>
                <Menu
                  mode="horizontal"
                  defaultSelectedKeys={[location.pathname]}
                  onClick={this.handleClick}
                  style={{ lineHeight: '64px' }}
                >
                  {getMenuData().map(x => {
                    if (x.children) {
                      return (
                        <SubMenu
                          key={x.name}
                          title={
                            <span>
                              <Icon type={x.icon} />
                              {x.name}
                            </span>
                          }
                        >
                          {x.children.map(y => <Menu.Item key={y.path}>{y.name}</Menu.Item>)}
                        </SubMenu>
                      );
                    } else {
                      return <Menu.Item key={x.path}>{x.name}</Menu.Item>;
                    }
                  })}
                </Menu>
              </Col>
              <Col style={{ position: "absolute", right: 100 }}>
                <Dropdown overlay={menu}>
                  <div className={`${styles.action} ${styles.account}`}>
                    <Avatar className={styles.avatar} src={currentUser.headimg} />
                    <span className={styles.name}>{currentUser.nickname || '未登录'}</span>
                  </div>
                </Dropdown>
              </Col>
            </Row>
          </Header>
          <Content className={styles[location.pathname==='/home'?'contentBlack':'content']}>
            <div style={{ minHeight: '78vh' }}>
              {currentUser.id ? (
                <Switch>
                  {getRoutes(match.path, routerData).map(item => {
                    return (
                      <Route
                        key={item.key}
                        path={item.path}
                        component={item.component}
                        exact={item.exact}
                        redirectPath="/home"
                      />
                    );
                  })}
                  <Redirect to="/home" />
                  <Route render={NotFound} />
                </Switch>) : (<NotFound />)}

            </div>
          </Content>
          <Footer style={{ textAlign: 'center',background:location.pathname==='/home'?'#fff':'#f4f7fa' }}>
            <Row type="flex" justify="center" style={{fontSize:12}}>
              <Col span={24}>
                信息网络传播视听节目许可证：0908328号 经营证券期货业务许可证编号：913101046312860336
              </Col>
              <Col span={24}>梭哈直播客服电话：021-24099034</Col>
              <Col span={24}>
                沪ICP证:沪B2-20070217 网站备案号:沪ICP备17024345号-1 沪公网安备 31010402002818号
                版权所有:东方财富旗下子公司浪客直播 违法和不良信息举报:021-54509966/021-24099099
              </Col>
            </Row>
          </Footer>
        </Layout>
      </Layout>
    );
    return (
      <DocumentTitle title={this.getPageTitle()}>
        <ContainerQuery query={query}>
          {params => <div className={classNames(params)}>{layout}</div>}
        </ContainerQuery>
      </DocumentTitle>
    );
  }
}

