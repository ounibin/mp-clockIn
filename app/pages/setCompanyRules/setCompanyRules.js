//获取应用实例
var app = getApp()
//Page()注册一个页面，接收一个object，指定页面的初始数据、生命周期函数、事件处理函数等
Page({
	// 页面的初始数据
	data:{
		rules:[
		  {value: 'hour', name: '按小时数签到', checked: true},
		  {value: 'weekday', name: '按工作日签到'}
		],
	},
	// 页面加载，一个页面只会调用一次
	onLoad:function(options){
		wx.setStorageSync('rulesType', 'hour')	//根据data中的默认值
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
	radioChange: function(e){
		console.log('radio发生change事件，携带value值为：', e.detail.value)
		wx.setStorageSync('rulesType', e.detail.value)
	},
	next: function(){
		var rulesType = wx.getStorageSync('rulesType')
		console.log('setCompanyRules.js--next--rulesType='+rulesType)
		if (rulesType == 'hour') {
			wx.redirectTo({
			  url: '../forHour/forHour'
			})
		}
		else if (rulesType == 'weekday') {
			wx.redirectTo({
			  url: '../forWeekday/forWeekday'
			})
		}
	}
})		