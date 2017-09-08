//获取应用实例
var app = getApp()
var forHourRule = 'week'	//defalut rule choose
var hours_for_work_least = 30
//Page()注册一个页面，接收一个object，指定页面的初始数据、生命周期函数、事件处理函数等
Page({
	// 页面的初始数据
	data:{
		day_checked:true,
		week_checked:false,
		month_checked:true,
		hoursForDay:7,
		hoursForWeek:30,
		hoursForMonth:210
	},
	// 页面加载，一个页面只会调用一次
	onLoad:function(){
		wx.setStorageSync('forHourRule', forHourRule)
		wx.setStorageSync('hours_for_work_least', hours_for_work_least)
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
	radioChange(e){
		console.log(e)
		forHourRule = e.detail.value
		wx.setStorageSync('forHourRule', forHourRule)
		switch(forHourRule){
			case 'day':
				this.setData({
					day_checked:false,
					week_checked:true,
					month_checked:true
				})
				break;
			case 'week':
				this.setData({
					day_checked:true,
					week_checked:false,
					month_checked:true
				})
				break;
			case 'month':
				this.setData({
					day_checked:true,
					week_checked:true,
					month_checked:false
				})
				break;

		}
		// this.setData({
		// 	hoursForDay,
		// 	hoursForWeek,
		// 	hoursForMonth
		// })
		// console.log(forHourRule)
	},
	setHourForDay(e){
		console.log(e.detail.value)
		wx.setStorageSync('hours_for_work_least', e.detail.value)
	},
	setHourForWeek(e){
		console.log(e.detail.value)
		wx.setStorageSync('hours_for_work_least', e.detail.value)
	},
	setHourForMonth(e){
		console.log(e.detail.value)
		wx.setStorageSync('hours_for_work_least', e.detail.value)
	},
	next:function(){
		console.log('next')
		wx.redirectTo({
		  url: '../hourExportRule/hourExportRule'
		})
		// wx.navigateTo({
		//   url: '../hourExportRule/hourExportRule',
		//   complete:function(res){
		//   	console.log(res)
		//   }

		// })
	}
})