import React from 'react';
import { Layout, Icon, Dropdown, Menu, Avatar, Row, Col } from 'antd';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import { Route, Redirect, Switch, routerRedux } from 'dva/router';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import pathToRegexp from 'path-to-regexp';
import NotFound from '../routes/Exception/404';
import { getRoutes } from '../utils/utils';
import { getMenuData } from '../common/menu';
import logo from '../assets/logo.svg';
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

class BasicLayout extends React.PureComponent {
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
    const { currentUser, routerData, match } = this.props;
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.handleMenuClick}>
        <Menu.Item disabled>
          <Icon type="user" />个人中心
        </Menu.Item>
        <Menu.Item disabled>
          <Icon type="setting" />设置
        </Menu.Item>
        <Menu.Item key="triggerError">
          <Icon type="close-circle" />触发报错
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">
          <Icon type="logout" />退出登录
        </Menu.Item>
      </Menu>
    );
    const layout = (
      <Layout>
        <Layout>
          <Header className={styles.header}>
            <Row type="flex" justify="space-between">
              <Col>
                <Menu
                  theme="dark"
                  mode="horizontal"
                  onClick={this.handleClick}
                  defaultSelectedKeys={['2']}
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
              <Col>
                <Dropdown overlay={menu}>
                  <div className={`${styles.action} ${styles.account}`}>
                    <Avatar size="small" className={styles.avatar} src={currentUser.avatar} />
                    <span className={styles.name}>{currentUser.name}</span>
                  </div>
                </Dropdown>
              </Col>
            </Row>
          </Header>
          <Content className={styles.content} style={{ padding: '0 50px', marginTop: 84 }}>
            <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
              <Switch>
                {getRoutes(match.path, routerData).map(item => {
                  return (
                    <Route
                      key={item.key}
                      path={item.path}
                      component={item.component}
                      exact={item.exact}
                      redirectPath="/exception/404"
                    />
                  );
                })}
                <Redirect to="/exception/404" />
                <Route render={NotFound} />
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            <Row type="flex" justify="center">
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

export default connect(({ user, global, loading }) => ({
  currentUser: user.currentUser,
  collapsed: global.collapsed,
  fetchingNotices: loading.effects['global/fetchNotices'],
  notices: global.notices,
}))(BasicLayout);
