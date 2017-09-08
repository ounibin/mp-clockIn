
var app = getApp()

Page({
  data:{
    companyName: '',
    logoUrl:'../../images/logo.jpg'
  },
  onLoad:function(options){
    var company_name = wx.getStorageSync('companyName')
    console.log('searchResult.js--onLoad--company_name='+company_name)
    this.setData({
      companyName: company_name
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
  joinCompany:function(){
    //公司信息写入本地缓存
    // wx.setStorageSync('companyName',app.globalData.companyName)
    // wx.setStorageSync('companyLogo',app.globalData.logo)
    // wx.setStorageSync('companyRulesType',app.globalData.rulesType)
    
    //链接到员工信息填写页面
    wx.navigateTo({
      url: '../editEmployeeInfo/editEmployeeInfo'
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
        content: '您不是管理员',
        showCancel: false,
        confirmText: '确定',
        confirmColor: '#3CC51F'
      })
    }
    
  }
})