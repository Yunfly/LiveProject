import request from '../utils/request';

// 直播间信息
export async function fetchLiveInfo(body) {
  return request('/api/v1/live/room_info', {
    method: "POST",
    body,
  });
}

// 直播间列表
export async function fetchLiveList(body) {
  return request('/api/v1/live/room_list', {
    method: "POST",
    body,
  });
}