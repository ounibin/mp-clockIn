// app.js
var appid = 'wx23de0af2f3aad5e6',
    secret = 'e514da0b3ede744a7efbb0037511ef71'


// App()用来注册一个小程序，接收一个object参数，制定小程序的生命周期函数等
App({
    // 生命周期函数--监听小程序初始化。当小程序初始化完成时，会触发onLaunch()，全局只触发一次
    onLaunch: function() {
        //调用API从本地缓存中获取数据
        /*
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
        */
        //首次将用户状态写入本地缓存
        // var isJoin = wx.getStorageSync('isJoin') || false
        // wx.setStorageSync('isJoin', isJoin)
    },
    // 成员方法：获取用户数据
    getUserInfo: function(cb) {
        var that = this
        if (this.globalData.userInfo) {
            typeof cb == "function" && cb(this.globalData.userInfo)
        } else {
            //调用登录接口
            wx.login({
                success: function() {
                    wx.getUserInfo({
                        success: function(res) {
                            // console.log('app.js--getUserInfo--wx.login--wx.getUserInfo--res='+res)
                            that.globalData.userInfo = res.userInfo
                            typeof cb == "function" && cb(that.globalData.userInfo)
                        }
                    })
                }
            })
        }
    },
    //获取用户openid
    getOpenid: function(cb) {
        console.log('正在获取openid')
        var that = this
        if (this.globalData.openid) {
            typeof cb == "function" && cb(this.globalData.openid)
        } else {
            //调用登录接口
            wx.login({
                success: function(loginRes) {
                    console.log('app.js--getOpenid--js_code:'+loginRes.code)
                    // console.log(loginRes.code)
                    var js_code = loginRes.code
                        //code 换取 openid 和 session_key
                    wx.request({
                        //必需
                        url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' + js_code + '&grant_type=authorization_code',
                        data: {},
                        header: {
                            'Content-Type': 'application/json'
                        },
                        success: function(res) {
                            console.log('成功获取到openid，并执行回调函数--app.js--getOpenid--openid='+res.data.openid)
                            // console.log(res)
                            wx.setStorageSync('employeeID', res.data.openid)
                            that.globalData.openid = res.data.openid
                            typeof cb == "function" && cb(res.data.openid)
                        },
                        fail: function(res) {
                            console.log('app.js--getOpenid--response=' + JSON.stringify(res))
                            var openid = 'get_openid_fail_and_id_1234_by_myself'
                            // console.log('openid='+openid)
                            wx.setStorageSync('employeeID', openid)
                            typeof cb == "function" && cb(openid)
                        },
                        complete: function(res) {

                        }
                    })
                }
            })
        }
    },
    //判断值是否在数组中
    inArray: function(value, array) {
        var i = array.length;
        while (i--) {
            if (array[i] === value) {
                return true;
            }
        }
        return false;
    },
    // 全局数据
    globalData: {
        openid: null,
        companyName: '',
        logo: '',
        rulesType: null,
        searchCompanyName: ''
    }
})
