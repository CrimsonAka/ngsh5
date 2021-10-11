// 业务模块1
import http from '../http';
import qs from 'qs'//引入qs


export default {
  getList(params) {
    return http({
      method: 'get',
      url: `/choujiang/api/v1/list`,
      params
    });
  },
};


// 手机用户获取验证码
export function getphone(data) {
  return http({
    url: '/choujiang/api/sms',
    method: 'post',
    data
  })
}
// {
//   PhoneNumber: '', // 电话号码
// }


// 获取token
export function gettoken(data) {
  data = qs.stringify(data)
  return http({
    url: '/connect/token',
    method: 'post',
    // headers: { 'content-type': '' },
    data
  })
}
// 手机用户端
// {
//   client_id: 'sms.client',
//   grant_type: 'sms',
//   scope: 'eplus.test.scope openid',
//   login_channel: 0, // 登陆渠道
//   phone_number: '', // 手机号码
//   token: '' // 手机短信验证码
// }
// 管理员登录
// {
//   client_id: 'password',
//   grant_type: 'password',
//   scope: 'eplus.test.scope openid',
//   username: '',
//   password: ''
// }


// 获取用户id
export function getuserid(data) {
  return http({
    url: '/connect/userinfo',
    method: 'get',
    // headers: { 'content-type': '' },info
    params: data
  })
}
// 没有参数

// 获取用户信息
// export function getuserinfo(data) {
//   return http({
//     url: '/choujiang/api/user',
//     method: 'get',
//     // headers: { 'content-type': '' },
//     params: data
//   })
// }
// // {
// //   id: '', // 用户id
// //   LoginChannel: '' // 登录渠道
// // }
// 获取用户信息 GetUser
export function getUser(data) {
  return http({
    url: '/choujiang/api/User',
    method: 'get',
    // headers: { 'content-type': '' },
    params: data
  })
}

// 删除用户信息 deleteUser
export function deleteUser(data) {
  return http({
    url: '/choujiang/api/User',
    method: 'delete',
    // headers: { 'content-type': '' },
    data
  })
}


// ========== Address / 地址 ==========
// 获取用户所有地址信息 get AddressUser
export function getAddressUser(data) {
  return http({
    url: '/choujiang/api/Address/list',
    method: 'get',
    params: data
  })
}
// {
//   userId: '',  // 用户id
// }


// 获取地址具体信息 get Address
export function getAddress(data) {
  return http({
    url: '/choujiang/api/Address',
    method: 'get',
    params: data
  })
}
// {
//   id: '',   //  地址id
// }


// 添加新地址 post Address
export function addAddress(data) {
  return http({
    url: '/choujiang/api/Address',
    method: 'post',
    data
  })
}
// {
//   recipient: "string",  // 收货人姓名
//   recipientPhoneNumber: "string",  // 收货人电话
//   country: "string", // 国家
//   province: "string", // 省份
//   city: "string", // 城市
//   detailedAddress: "string",  //详细地址
//   postcode: "string",  // 邮编
//   userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6" // 用户id
// }


// 更新地址 put Address
export function updateAddress(data) {
  return http({
    url: '/choujiang/api/Address',
    method: 'put',
    data
  })
}
// {
//   id: '',  // 地址id
//   recipient: "string",  // 收货人姓名
//   recipientPhoneNumber: "string",  // 收货人电话
//   country: "string", // 国家
//   province: "string", // 省份
//   city: "string", // 城市
//   detailedAddress: "string",  //详细地址
//   postcode: "string",  // 邮编
//   userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6" // 用户id
// }


// 删除地址信息 deleteAddress
export function deleteAddress(data) {
  return http({
    url: '/choujiang/api/Address',
    method: 'delete',
    data
  })
}
// {
//   id: '',   //  地址id
// }

// ==========  lottery / 抽奖 ==========
// 获取用户再指定活动抽奖情况 get lottery records
export function getLotteryRecords(data) {
  return http({
    url: '/choujiang/api/Lottery/lottery-records',
    method: 'get',
    params: data
  })
}
// {
//   userId: '', // 用户id
// }


// 获取用户再指定活动中奖情况 get lottery winning-records
export function getLotteryWinRecords(data) {
  return http({
    url: '/choujiang/api/Lottery/winning-records',
    method: 'get',
    params: data
  })
}
// {
//   userId: '', // 用户id
// }


// 抽奖 post Lottery
export function postLottery(data) {
  return http({
    url: '/choujiang/api/Lottery',
    method: 'post',
    data
  })
}
// {
//   channelCode: '', // 渠道
//   lotteryDisplay: '', // 抽奖类型
//   userId: '', // 用户id
//   activityId: '', // 活动id
//   count: 1 // 抽奖次数
// }

// 更新抽奖记录 put Lottery
export function updateLottery(data) {
  return http({
    url: '/choujiang/api/Lottery',
    method: 'put',
    data
  })
}
// {
//   id: '', // 活动id
//   pickedUp: true, // 是否提取
//   delivered: true, // 是否配送
//   pickedUpTime: '' // 提取时间
// }

// 删除抽奖记录 delete lottery
export function deleteLottery(data) {
  return http({
    url: '/choujiang/api/Lottery',
    method: 'delete',
    // headers: { 'content-type': '' },
    data
  })
}
// {
//   id: '', // 活动id
// }

// ========== Activity // 活动 ==========
// 获取活动信息 get Activity
export function getActivity(data) {
  return http({
    url: '/choujiang/api/Activity',
    method: 'get',
    params: data
  })
}
// {
//   id: '', // 活动id 
// }


// 获取活动列表  get Activity/Available
export function getActivityAvailable(data) {
  return http({
    url: '/choujiang/api/Activity/list',
    method: 'get',
    // headers: { 'content-type': 'x-www-form-urlencoded' },
    // params: { 'startTime': data }
    params: data
  })
}
// {
//   StartTime: '', // 开始时间
//   EndTime: '', // 结束时间, 不传表示至今
//   AvailableChannels: '' // Ngs, NgsPlaza, Alldays
// }

// 创建活动 post Activity
export function postActivity(data) {
  return http({
    url: '/choujiang/api/Activity',
    method: 'post',
    data
  })
}
// {
//   name: '', // 活动名称
//   limit: 0, // 次数限制
//   dailyLimit: 0, // 每日抽奖次数限制，
//   availableChannels: [''], // 抽奖渠道
//   lotteryDisplay: '', // 抽奖方式
//   activityType: '', // 活动类型
//   startTime: '', // 开始时间
//   endTime: '', // 结束时间 
// }

// 修改活动信息 put Activity
export function updateActivity(data) {
  return http({
    url: '/choujiang/api/Activity',
    method: 'put',
    data
  })
}


// 删除活动 delete Activity
export function deleteActivity(data) {
  return http({
    url: '/choujiang/api/Activity',
    method: 'delete',
    data
  })
}

// ========== ActivityUser / 用户活动 ==========
// 获取活动与用户的绑定关系 get ActivityUser
export function getActivityUser(data) {
  return http({
    url: '/choujiang/api/ActivityUser',
    method: 'get',
    params: data
  })
}


// 获取某个用户正在参加的活动  get ActivityUser/user
export function getActivityUserUser(data) {
  return http({
    url: '/choujiang/api/ActivityUser/user',
    method: 'get',
    // params: { 'startTime': data }
    params: data
  })
}

// 绑定用户与活动 post ActivityUser
export function postActivityUser(data) {
  return http({
    url: '/choujiang/api/ActivityUser',
    method: 'post',
    data
  })
}

// 为某个用户绑定所有可参与活动 post ActivityUser / bindAvailable
export function postActivityUserBindAvailable(data) {
  return http({
    url: '/choujiang/api/ActivityUser/bindAvailable',
    method: 'post',
    data
  })
}


// 用户兑换抽奖次数 patch ActivityUser/redeeming
export function patchActivityUser(data) {
  return http({
    url: '/choujiang/api/ActivityUser/redeeming',
    method: 'patch',
    data
  })
}

// ========== Attendance / 签到 ==========
// 获取用户某个时间段内的签到记录 get Attendance/user
export function getAttendanceUser(data) {
  return http({
    url: '/choujiang/api/Attendance/user',
    method: 'get',
    params: data
  })
}


// 获取用户签到记录  get Attendance
export function getAttendance(data) {
  return http({
    url: '/choujiang/api/Attendance',
    method: 'get',
    // params: { 'startTime': data }
    params: data
  })
}

// 签到 post Attendance
export function postAttendance(data) {
  return http({
    url: '/choujiang/api/Attendance',
    method: 'post',
    data
  })
}

// ========== 注册管理员账号 ==========
// 注册管理员账号
export function postUser(data) {
  return http({
    url: '/choujiang/api/User',
    method: 'post',
    data
  })
}


// ========== 奖品 / PrizeItem ==========
// 添加商品
export function postPrizeItem(data) {
  return http({
    url: '/choujiang/api/PrizeItem',
    method: 'post',
    data
  })
}

// 通过商品名 == 获取商品商品
export function getPrizeItemByName(data) {
  return http({
    url: '/choujiang/api/PrizeItem/name',
    method: 'get',
    params: data
  })
}

// 通过id == 获取商品商品
export function getPrizeItemById(data) {
  return http({
    url: '/choujiang/api/PrizeItem',
    method: 'get',
    params: data
  })
}

// 通过ids == 获取商品商品
export function getPrizeItemByIds(data) {
  return http({
    url: '/choujiang/api/PrizeItem/list',
    method: 'get',
    params: data
  })
}

// 获取商品列表
export function getPrizeItemAll(data) {
  return http({
    url: '/choujiang/api/PrizeItem/all',
    method: 'get',
    params: data
  })
}

// 删除商品 deleteItem
export function deletePrizeItem(data) {
  return http({
    url: '/choujiang/api/PrizeItem',
    method: 'delete',
    // headers: { 'content-type': '' },
    data
  })
}

// 修改商品
export function updatePrizeItem(data) {
  return http({
    url: '/choujiang/api/PrizeItem',
    method: 'put',
    // headers: { 'content-type': '' },
    data
  })
}


// ========== 奖品档次 / PrizeTier ==========
// 添加商品
export function postPrizeTier(data) {
  return http({
    url: '/choujiang/api/PrizeTier',
    method: 'post',
    data
  })
}

// 获取
export function getPrizeTier(data) {
  return http({
    url: '/choujiang/api/PrizeTier',
    method: 'get',
    params: data
  })
}

// 获取商品列表
export function getPrizeTierActivity(data) {
  return http({
    url: '/choujiang/api/PrizeTier/activity',
    method: 'get',
    params: data
  })
}

// 删除商品 deleteItem
export function deletePrizeTier(data) {
  return http({
    url: '/choujiang/api/PrizeTier',
    method: 'delete',
    // headers: { 'content-type': '' },
    data
  })
}

// 修改商品
export function updatePrizeTier(data) {
  return http({
    url: '/choujiang/api/PrizeTier',
    method: 'put',
    // headers: { 'content-type': '' },
    data
  })
}