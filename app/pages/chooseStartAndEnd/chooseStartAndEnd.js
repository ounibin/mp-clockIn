//获取应用实例
var config = require('../../utils/config.js')
var HOST_API_WX_DI = config.HOST_API_WX_DI
var app = getApp()
//Page()注册一个页面，接收一个object，指定页面的初始数据、生命周期函数、事件处理函数等
Page({
	// 页面的初始数据
	data:{
		logoUrl: null,
		companyName: null,
		startDate: null,
		endDate: null
	},
	// 页面加载，一个页面只会调用一次
	onLoad:function(options){
		// console.log(config.HOST_API_WX_DI)

		//设置公司名
		var companyName = wx.getStorageSync('companyName')
		var logoUrl = wx.getStorageSync('logoUrl')
		// var emailArr = wx.getStorageSync('emailList')
		this.setData({
			logoUrl: logoUrl,
			companyName: companyName
			// logoUrl: logoUrl
		})

		//获取当前日期
		var currDate = new Date()
		var year = currDate.getFullYear()
		var month = currDate.getMonth()+1
		var startMonth = (month-1)<10 ? '0'+(month-1) : (month-1)	//默认开始日期
		var endMonth = month<10 ? '0'+month : month-1	//默认结束日期
		this.setData({
			startDate: year+'-'+startMonth+'-01',
			endDate: year+'-'+endMonth+'-01'
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
	chooseStartDate:function(e){
		console.log(e.detail.value)
		this.setData({
			startDate: e.detail.value
		})
		
	},
	chooseEndDate:function(e){
		console.log(e.detail.value)
		this.setData({
			endDate: e.detail.value
		})
	},
	sendExcelToEmail:function(){
		console.log('点击发送到邮箱')
		var emailList = wx.getStorageSync('emailList')
		var startDate = this.data.startDate
		var endDate = this.data.endDate
		console.log('chooseStartAndEnd.js--sendExcelToEmail--emailList='+emailList+',startDate='+startDate+',endDate='+endDate)
		// return
		wx.request({
		  url: HOST_API_WX_DI+'sendReport/index.php',
		  method:'GET',
		  data: {
		  	emailList: emailList,
		  	startDate: startDate,
		  	endDate: endDate
		  },
		  header: {
		    'Content-Type': 'application/json'
		  },
		  //dataType: ,    //默认为 json。如果设置了 dataType 为 json，则会尝试对响应的数据做一次 JSON.parse
		  success: function(res) {
		    //提示报表已发送至邮箱
    		wx.showToast({
    			title: '报表已发送至邮箱',
    			icon: 'success',//仅支持success或者loading
    			duration: 2000
    		})
		  },
		  fail: function(res) {
		    console.log('点击发送到邮箱fail')
		  },
		  complete: function(res) {
		    
		  }
		})
		
	}
})