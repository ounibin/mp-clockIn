//获取应用实例
var app = getApp()
//Page()注册一个页面，接收一个object，指定页面的初始数据、生命周期函数、事件处理函数等
Page({
  data:{
    companyName:''
  },
  onLoad:function(options){
    this.setData({
      companyName: wx.getStorageSync('companyName')
    })
  },
  onReady:function(){
    
  },
  onShow:function(){
    
  },
  onHide:function(){
    
  },
  onUnload:function(){
    
  },
  onPullDownRefresh:function(){
    
  },
  onReachBottom:function(){
    
  },
  setName:function(e){
    console.log(e.detail.value)
    wx.setStorageSync('name', e.detail.value)
  },
  setPhoneNumber:function(e){
    console.log(e.detail.value)
    wx.getStorageSync('phone_number',e.detail.value)
  },
  submitEmployeeInfo:function(){
    var employee_id = wx.getStorageSync('employeeID')
    var department_id = 0
    var company_name = wx.getStorageSync('companyName')
    var name = wx.getStorageSync('name')
    var phone_number = wx.getStorageSync('phone_number')
    wx.request({
      url: 'https://di.imaxgine.net/api/wx-di/employees/index.php',
      method:'POST',
      data: {
        employee_id: employee_id,
        department_id: department_id,
        company_name: company_name,
        name: name,
        phone_number: phone_number,
        is_admin: 0
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded' //$_POST才能拿到数据
      },
      //dataType: ,    //默认为 json。如果设置了 dataType 为 json，则会尝试对响应的数据做一次 JSON.parse
      success: function(res) {
        // console.log(res)
        //提示成功后跳转
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000
        })
        setTimeout(function(){
          //链接页面
          wx.navigateTo({
            url: '../record/record'
          })
        },2000)
      },
      fail: function(res) {
        
      },
      complete: function(res) {
        
      }
    })
    
  }
})    