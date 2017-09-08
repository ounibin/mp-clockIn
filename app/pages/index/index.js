//获取应用实例
var app = getApp()

    //Page()注册一个页面，接收一个object，指定页面的初始数据、生命周期函数、事件处理函数等
Page({
    // 页面的初始数据
    data: {},
    // 页面加载，一个页面只会调用一次
    onLoad: function() {
        var that = this
        // wx.showLoading();
        wx.showLoading({
            title: '加载中',
            mask: false
        })

        app.getOpenid(function(openid){
            //查询当前openid是否已经加入公司,如已经加入，将相关信息写入本地缓存
            console.log('执行回调函数ing,发起请求，查询当前openid是否已经加入公司')
            wx.request({
                url: 'https://di.imaxgine.net/api/wx-di/employees/index.php',
                method: 'GET',
                data: {
                    employee_id: openid
                },
                header: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                //dataType,,默认为 json。如果设置了 dataType 为 json，则会尝试对响应的数据做一次 JSON.parse
                success: function(res) {
                    console.log('index.js--onLoad--/employees/index.php--res=')
                    console.log(res)
                    var employeeExist = res.data.data ? true : false
                    console.log('当前openid状态为：'+employeeExist)
                    if (employeeExist) {//当前openid已经加入公司
                        var department_id = res.data.data[0].department_id
                        var company_name = res.data.data[0].companyName
                        var name = res.data.data[0].name
                        var isAdmin = res.data.data[0].isAdmin

                        // console.log('index.js--onLoad--/employees/index.php--company_name='+company_name)
                        wx.setStorageSync('department_id', department_id)
                        wx.setStorageSync('companyName', company_name)
                        wx.setStorageSync('name', name)
                        wx.setStorageSync('isAdmin', isAdmin)
                        //set公司logoUrl
                        console.log('发起请求，查询当前openid所在公司的logo')
                        wx.request({
                          url: 'https://di.imaxgine.net/api/wx-di/companies/index.php',
                          method:'GET',
                          data: {
                            company_name: company_name
                          },
                          header: {
                            'Content-Type': 'application/x-www-form-urlencoded'    //才能拿到数据
                          },
                          //dataType: ,    //默认为 json。如果设置了 dataType 为 json，则会尝试对响应的数据做一次 JSON.parse
                          success: function(res) {
                            console.log('index.js--onLoad--/companies/index.php--res=')
                            console.log(res)
                            var companyExist = res.data.data ? true :false
                            console.log('当前openid所在公司的注册状态为：'+companyExist)
                            if (companyExist){//存在该公司
                                console.log('将logoUrl保存在本地缓存，然后跳转到打卡页')
                                var logoUrl = res.data.data[0].logoUrl
                                wx.setStorageSync('logoUrl', logoUrl)
                                wx.redirectTo({
                                    url: '../record/record'
                                })
                            }
                            else{//不存在该公司
                                wx.redirectTo({
                                    url: '../search/search'
                                })
                            }
                          },
                          fail: function(res) {
                            console.log('查询公司fail')
                          },
                          complete: function(res) {
                            
                          }
                        })
                    }
                    else{//当前openid未加入公司
                        // wx.setStorageSync('isJoin',false)
                        wx.redirectTo({
                            url: '../search/search'
                        })
                    }
                },
                fail: function(res) {
                    console.log('查询当前openid是否已经加入公司fail')
                },
                complete: function(res) {

                }
            }) 
        })
    }


})
