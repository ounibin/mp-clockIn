//获取应用实例
var app = getApp()
//Page()注册一个页面，接收一个object，指定页面的初始数据、生命周期函数、事件处理函数等
Page({
    // 页面的初始数据
    data: {
        options: [{
            name: '考勤详细记录',
            checked: true
        }, {
            name: '出勤统计',
            checked: false
        }, {
            name: '异常统计',
            checked: false
        }, {
            name: '请假统计',
            checked: false
        }],
        email_value: null,
        emailList: [],
    },
    // 页面加载，一个页面只会调用一次
    onLoad: function(options) {
        //第一次注册时
        if (!wx.setStorageSync('export_rule_list')) {
            wx.setStorageSync('export_rule_list', ['考勤详细记录'])
        }
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    saveOptions(e) {
        // console.log(e)
        console.log(e.detail.value)
        var export_rule_list = e.detail.value
        wx.setStorageSync('export_rule_list', export_rule_list)
    },
    setEmail(e) {
        // console.log(e.detail.value)
        this.data.email_value = e.detail.value
    },
    addEmail() {
        var email = this.data.email_value
        if (!email) {
            return false
        }
        var emailList = this.data.emailList
        //check if exist or not
        var emailExist = app.inArray(email, emailList)
        if (emailExist) {
            return false;
        }
        emailList.push(email)
        this.setData({
            emailList: emailList,
            email_value: null
        })
        wx.setStorageSync('emailList', emailList)
    },
    delEnmail(e) {
        // console.log(e)
        // console.log(e.target.dataset.iconIndex)
        var emailListIndex = e.target.dataset.iconIndex
        var emailList = this.data.emailList
        emailList.splice(emailListIndex, 1)
        this.setData({
            emailList: emailList
        })
        wx.setStorageSync('emailList', emailList)
    },
    finish:function() {
        console.log('this.data.emailList.length='+this.data.emailList.length)

        wx.showLoading({
            title: '正在注册',
            mask: false
        })

        var companies_flag = false
        var company_address_flag = false
        var rules_flag = false
        var employees_flag = false
        //php companies
        var companyName = wx.getStorageSync('companyName')
        var logoUrl = wx.getStorageSync('logoUrl')
        var rulesType = wx.getStorageSync('rulesType')
        wx.request({
            url: 'https://di.imaxgine.net/api/wx-di/companies/index.php',
            method: 'POST',
            data: {
                company_name: companyName,
                logo: logoUrl,
                rules_type: rulesType
            },
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            //dataType,,默认为 json。如果设置了 dataType 为 json，则会尝试对响应的数据做一次 JSON.parse
            success: function(res) {
                console.log('php companies')
                console.log(res)
                if (res.data.data) {
                    companies_flag = true
                }
            }
        })
        //php company_address
        var addressList = wx.getStorageSync('addressList')
        for (var i = 0, len = addressList.length; i < len; i++) {
            console.log('i=' + i)
            wx.request({
                url: 'https://di.imaxgine.net/api/wx-di/company_address/index.php',
                method: 'POST',
                data: {
                    // address_id: i,
                    company_name: companyName,
                    name: addressList[i].name,
                    latitude: addressList[i].latitude,
                    longitude: addressList[i].longitude
                },
                header: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                //dataType,,默认为 json。如果设置了 dataType 为 json，则会尝试对响应的数据做一次 JSON.parse
                success: function(res) {
                    console.log('php company_address')
                    console.log(res)
                    if (res.data.data) {
                        company_address_flag = true
                    }
                },
                fail: function(res) {},
                complete: function(res) {}
            })
        }
        
        //php rules
        var forHourRule = wx.getStorageSync('forHourRule') //day or week or month
        var time_on_duty = 0
        var time_off_duty = 0
        var duration_of_late = 0
        var duration_of_leave_early = 0
        var duration_of_work_least = wx.getStorageSync('hours_for_work_least')
        var export_rule_list = wx.getStorageSync('export_rule_list')
        export_rule_list = export_rule_list.join()
        var email_list = wx.getStorageSync('emailList')
        email_list = email_list.join()
        if (!email_list) {
            wx.showToast({
                title: '请添加邮箱',
                icon: 'loading', //仅支持success或者loading
                duration: 2000
            })
        } else {
            wx.request({
                url: 'https://di.imaxgine.net/api/wx-di/rules/index.php',
                method: 'POST',
                data: {
                    company_name: companyName,
                    rule_name: rulesType,
                    day_week_month: forHourRule,
                    time_on_duty: time_on_duty,
                    time_off_duty: time_off_duty,
                    duration_of_late: duration_of_late,
                    duration_of_leave_early: duration_of_leave_early,
                    duration_of_work_least: duration_of_work_least,
                    export_rule_list: export_rule_list,
                    email_list: email_list
                },
                header: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                //dataType,,默认为 json。如果设置了 dataType 为 json，则会尝试对响应的数据做一次 JSON.parse
                success: function(res) {
                    console.log('rules')
                    console.log(res)
                    if (res.data.data) {
                        rules_flag = true
                    }
                }
            })
        }

        //php employees admin
        var employeeID = wx.getStorageSync('employeeID')
        var adminName = wx.getStorageSync('adminName')
        var phoneNumber = wx.getStorageSync('phoneNumber')
        var is_admin = 1
        wx.request({
            url: 'https://di.imaxgine.net/api/wx-di/employees/index.php',
            method: 'POST',
            data: {
                employee_id: employeeID,
                department_id: 0,
                company_name: companyName,
                name: adminName,
                phone_number: phoneNumber,
                is_admin: is_admin
            },
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            //dataType,,默认为 json。如果设置了 dataType 为 json，则会尝试对响应的数据做一次 JSON.parse
            success: function(res) {
                console.log('employees')
                console.log(res)
                if (res.data.data) {
                    employees_flag = true
                }
                
                // console.log('join')
                //设置加入状态
                // wx.setStorageSync('isJoin', true)
                // wx.redirectTo({
                //     url: '../index/index'
                // })
            }
        })
        // return false
        var i = 0
        var timer = setInterval(function(){
            console.log('wait'+(i++))
            if (companies_flag && company_address_flag && rules_flag && employees_flag) {
                console.log('success')
                clearInterval(timer)
                wx.hideLoading()
                wx.redirectTo({
                  url: '../index/index'
                })
            }
        },500)
    }
})