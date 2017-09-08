var app = getApp()

Page({
  data:{
    input_companyName:'',

  },
  onLoad:function(options){

  },
  onReady:function(){
    wx.hideLoading()
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
  listenCompanyInput:function(e){
    this.data.input_companyName = e.detail.value
  },
  searchCompany:function(){
    var that = this
    if (this.data.input_companyName) {
      wx.request({
        url: 'https://di.imaxgine.net/api/wx-di/companies/index.php?company_name='+that.data.input_companyName,
        method: 'GET',
        header: {
            'Content-Type': 'application/json'
        },
        success: function(res) {
          
          if (res.data.data) {//存在被搜索的公司
            //写入公司信息到globalData
            console.log('search.js--searchCompany--res:')
            console.log(res)
            wx.setStorageSync('companyName', res.data.data[0].companyName)
            wx.setStorageSync('logoUrl', res.data.data[0].logo)
            wx.setStorageSync('rulesType', res.data.data[0].rulesType)
            //连接到搜索结果
            wx.navigateTo({
              url: '../searchResult/searchResult'
            })
          }
          else{//不存在该公司
            wx.showModal({
              title: '抱歉，未搜索到该公司',
              content: '请确保输入正确，如您输入公司名正确，可能是该公司未注册，可点击“去注册”进行公司注册',
              showCancel: true,
              cancelText: '取消',
              cancelColor: '#000000',
              confirmText: '去注册',
              confirmColor: '#3CC51F',
              success: function(res) {
                if (res.confirm) {
                  app.globalData.searchCompanyName = that.data.input_companyName
                  wx.navigateTo({
                    url: '../registerCompany/registerCompany'
                  })
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            });
          }   
        },
        fail: function(res) {
          console.log('search.js--searchCompany--res='+JSON.stringify(res))
        },
        complete: function(res) {

        }
      })
    }
  },
  signUp:function(){
    wx.navigateTo({
      url: '../registerCompany/registerCompany'
    })
  }
})