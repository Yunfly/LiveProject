import { isUrl } from '../utils/utils';

const menuData = [
  {
    name: '首页',
    path: 'home',
  },{
    name: '用户中心',
    path: 'client',
  },{
    name: '充值',
    path: 'charge',
  },{
    name: '直播',
    path: 'live',
  },{
    name: '客服',
    path: 'customService',
  }
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
