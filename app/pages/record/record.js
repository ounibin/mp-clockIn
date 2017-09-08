//获取应用实例
var app = getApp()
require('../../utils/date.js')



//Page()注册一个页面，接收一个object，指定页面的初始数据、生命周期函数、事件处理函数等
Page({
    // 页面的初始数据
    data: {
        companyName: '',
        timeString: '',
        day: '',
        location_address_name: '',
        postInfo: null,
        remark: ''
    },
    // 页面加载，一个页面只会调用一次
    onLoad: function(options) {
        this.setAddressList()
        //show company name
        this.showCompanyName()
        //show time
        this.showCurrentTime()
    },
    onReady: function() {

    },
    onShow: function() {

    },
    onHide: function() {

    },
    onUnload: function() {

    },
    onPullDownRefresh: function() {

    },
    onReachBottom: function() {

    },
    //点击上班
    onDuty: function() {
        var that = this
        console.log(wx.getStorageSync('employeeID'))
        console.log(that.data.location_address_name)
        console.log(that.data.timeString)
        console.log(that.data.remark)
            // console.log(that.data.currentAddress.name)
        wx.request({
            url: 'https://di.imaxgine.net/api/wx-di/sign_in_records/index.php',
            method: 'POST',
            data: {
                employee_id: wx.getStorageSync('employeeID'),
                sign_in_address: that.data.location_address_name,
                sign_in_time: that.data.timeString,
                is_on_duty: 1,
                remark: that.data.remark
            },
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            //dataType,,默认为 json。如果设置了 dataType 为 json，则会尝试对响应的数据做一次 JSON.parse
            success: function(res) {
                console.log(res)
                if (res.data.data) {
                    wx.showToast({
                        title: '上班打卡成功',
                        icon: 'success', //仅支持success或者loading
                        duration: 2000
                    })
                }
                
            }
        })
    },
    //点击下班
    offDuty: function() {
        console.log('offDuty')
        var that = this
        wx.request({
            url: 'https://di.imaxgine.net/api/wx-di/sign_in_records/index.php',
            method: 'POST',
            data: {
                employee_id: wx.getStorageSync('employeeID'),
                sign_in_address: that.data.location_address_name,
                sign_in_time: that.data.timeString,
                is_on_duty: 0,
                remark: that.data.remark
            },
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            //dataType,,默认为 json。如果设置了 dataType 为 json，则会尝试对响应的数据做一次 JSON.parse
            success: function(res) {
                console.log(res)
                if (res.data.data) {
                    wx.showToast({
                        title: '下班打卡成功',
                        icon: 'success', //仅支持success或者loading
                        duration: 2000
                    })
                }
            }
        })
    },
    getCurrentAddress: function() {
        var that = this
        //获取当前位置名称
        wx.getLocation({
            type: 'gcj02',
            success: function(res) {
                console.log('record.js--getCurrentAddress--纬度latitude=' + res.latitude + ',经度longitude=' + res.longitude)
                var location_latitude = res.latitude
                var location_longitude = res.longitude
                var addressList = wx.getStorageSync('addressList')
                // console.log(addressList)
                var company_lat = addressList[0].latitude
                var company_lng = addressList[0].longitude
                if (!that.isInCompany(location_latitude, location_longitude, company_lat, company_lng)) {
                    wx.showToast({
                        title: '您不在公司范围内，即将跳转到请假页',
                        icon: 'loading', //仅支持success或者loading
                        duration: 2000
                    })
                    setTimeout(function() {
                        wx.redirectTo({
                            url: '../askForLeave/askForLeave'
                        })
                    }, 2000)
                }

                //百度地图经纬度反查路径
                wx.request({
                    url: 'https://api.map.baidu.com/geocoder/v2/?ak=btsVVWf0TM1zUBEbzFz6QqWF&location=' + location_latitude + ',' + location_longitude + '&output=json&pois=0',
                    data: {},
                    method: 'GET',
                    header: { 'Content-Type': 'application/json' },
                    success: function(res) {
                        //成功返回一个result集合
                        console.log('record.js--getCurrentAddress--百度地图经纬度反查路径--')
                        console.log(res)
                        var location_address_name = res.data.result.formatted_address
                        that.setData({
                            location_address_name: location_address_name
                        })
                        wx.setStorageSync('location_address_name', location_address_name)
                    }
                })

            }
        })
    },
    //show current time to page
    showCurrentTime: function() {
        var that = this
            //获取当前时间
        var currTime = new Date()
        var dayArr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
        var tmpDay = dayArr[currTime.getDay()]
            //show time to page
        this.setData({
            timeString: currTime.format('yyyy-MM-dd hh:mm'),
            day: tmpDay
        })
        setTimeout(function() { that.showCurrentTime() }, 60000)
    },
    //show company name to page
    showCompanyName: function() {
        this.setData({
            companyName: wx.getStorageSync('companyName')
        })
    },
    //判断是否在可打卡的范围内
    isInCompany: function(location_latitude, location_longitude, companyLocation_latitude, companyLocation_longitude) {
        var flag = false
        const RANGE = 300 //sign in range
        const EARTH_RADIUS = 6378.137; //地球半径  
        //将用角度表示的角转换为近似相等的用弧度表示的角 java Math.toRadians  
        function rad(d) {
            return d * Math.PI / 180.0;
        }
        /** 
         * 谷歌地图计算两个坐标点的距离 
         * @param lng1  经度1 
         * @param lat1  纬度1 
         * @param lng2  经度2 
         * @param lat2  纬度2 
         * @return 距离（千米） 
         */
        function getDistance(lng1, lat1, lng2, lat2) {
            var radLat1 = rad(lat1);
            var radLat2 = rad(lat2);
            var a = radLat1 - radLat2;
            var b = rad(lng1) - rad(lng2);
            var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
            s = s * EARTH_RADIUS;
            s = Math.round(s * 10000) / 10000;
            return s;
        }

        var distance = getDistance(location_longitude, location_latitude, companyLocation_longitude, companyLocation_latitude)
        console.log('distance is ' + distance + 'm')
        if (distance <= RANGE) { flag = true }
        return flag
    },
    //remark write to data when blur
    remarkBlur: function(e) {
        this.setData({
            remark: e.detail.value
        })
    },
    setAddressList:function() {
    	var that = this
        var company_name = wx.getStorageSync('companyName')
        console.log('record.js--setAddressList--company_name='+company_name)
        wx.request({
            url: 'https://di.imaxgine.net/api/wx-di/company_address/index.php',
            method: 'GET',
            data: {
                company_name: company_name
            },
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            dataType: 'json',	//默认为 json。如果设置了 dataType 为 json，则会尝试对响应的数据做一次 JSON.parse
            success: function(res) {
            	console.log('record.js--setAddressList--/company_address/index.php')
                console.log(res)
                var addressList = []
                for (var i = 0, len = res.data.data.length; i < len; i++) {
                    var obj = {
                        name: res.data.data[i].name,
                        latitude: res.data.data[i].latitude,
                        longitude: res.data.data[i].longitude
                    }
                    addressList.push(obj)
                }
                console.log(addressList)
                wx.setStorageSync('addressList', addressList)
                that.getCurrentAddress()
            }
        })
    },
    toAdmin:function(){
      var isAdmin = wx.getStorageSync('isAdmin')
      if (isAdmin == 1) {
        wx.navigateTo({
          url: '../adminIndex/adminIndex'
        })
      }
      else if (isAdmin == 0){
        wx.showModal({
          title: '提示',
          content: '别骗我，您才不是管理员咧',
          showCancel: false,
          confirmText: '确定',
          confirmColor: '#3CC51F'
        })
      }
      
    }
})
