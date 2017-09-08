//获取应用实例
var app = getApp()
//Page()注册一个页面，接收一个object，指定页面的初始数据、生命周期函数、事件处理函数等
Page({
	// 页面的初始数据
	data:{
		hint_companyExist:'',
		hint_getCode:'',
		hint_code:'',
		fetchCodeBtn: '获取验证码',
		code:null,

		input_companyName:'',
		input_adminName:'',
		input_phoneNumber:'',
		logoUrl:'../../images/logo.jpg',
		code_disabled:false,
		next_disabled:true,
		company_name_value:null
		
	},
	// 页面加载，一个页面只会调用一次
	onLoad:function(options){
		//显示注册须知
		wx.showModal({
			title: '注册须知',
			content: 'balabala...',
			showCancel: false,
			confirmText: '知道了',
			confirmColor: '#3CC51F'
		})

		var company_name = app.globalData.searchCompanyName
		this.setData({
			company_name_value: company_name
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
	//检测公司名是否已被注册
	checkAndSaveCompanyName:function(e){
		console.log(e.detail.value)
		var that = this
		var companyName = e.detail.value
		if (companyName) {//公司名非空
			wx.request({//检测公司名是否存在
			  url: 'https://di.imaxgine.net/api/wx-di/companies/index.php',
			  data: {
			  	company_name:companyName
			  },
			  header: {
				  'Content-Type': 'application/json'
			  },
			  method:'GET',
			  success: function(res) {
				console.log(res.data)
				if (res.data.data) {//公司存在
					that.setData({
						hint_companyExist:'公司名已存在'
					})
				}
				else{
					that.data.company_name_value = companyName
					wx.setStorageSync('companyName', companyName)
				}
			  }
			})
		}
		else{//need to input company name
			wx.showModal({//hint input company name
				title: '提示',
				content: '请输入公司名',
				showCancel: false,
				confirmText: '确定',
				confirmColor: '#3CC51F'
			})
		}
	},
	//清除提示“公司名已存在”
	clearHintCompanyExist:function(){
		this.setData({
			hint_companyExist: ''
		})
	},
	saveAdminName:function(e){
		// console.log(e.detail.value)
		this.data.adminName = e.detail.value
	},
	savePhoneNumber:function(e){
		this.data.phoneNumber = e.detail.value
	},
	getCode:function(){
		var that = this
		this.data.code = 1234

		this.setData({
			code_disabled: true,
		})
		var i = 59
		var timer = setInterval(function(){
			that.setData({
				fetchCodeBtn: i+'秒',
			})
			i--;
			if (i < 0) {
				clearInterval(timer)
				that.setData({
					code_disabled: false,
					fetchCodeBtn:'获取验证码'
				})
			}
		},1000)
		// return code
	},
	checkCode:function(e){
		var input_code = e.detail.value
		var realCode = this.data.code
		if (input_code == realCode) {
			this.setData({
				// hint_code:'验证成功',
				next_disabled:false
			})
		}
		else{
			this.setData({
				// hint_code:'',
				next_disabled:true
			})
		}
	},
	
	//选择公司logo图片
	chooseLogoImg:function(){
		var that = this
		console.log('chooseLogoImg')
		wx.chooseImage({
		  count: 1, 
		  sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
		  sourceType: ['album', 'camera'], //可以指定来源是相册还是相机，默认二者都有
		  success: function (res) {
			var tempFilePaths = res.tempFilePaths  //返回图片的临时路径
			console.log('tempFilePaths='+tempFilePaths)

			that.saveFilePath(tempFilePaths[0]);
		  }
		})
	},
	//图片的本地临时路径转为永久路径
	saveFilePath:function(path){
		var that = this
		wx.saveFile({
		  tempFilePath: path,
		  success: function(res) {
		  	that.setData({
				logoUrl: res.savedFilePath	//图片本地永久路径写入临时缓存
			})
		  }
		})
	},
	next:function(){
		//保存信息到local cache
		var companyName = this.data.company_name_value
		var adminName = this.data.adminName
		var phoneNumber = this.data.phoneNumber
		var logoUrl = this.data.logoUrl
		if (!companyName) {
			wx.showModal({
				title: '提示',
				content: '公司名不能为空',
				confirmText: '确定',
				confirmColor: '#3CC51F'
			})
			return false
		}
		if (!adminName) {
			wx.showModal({
				title: '提示',
				content: '联系人姓名不能为空',
				confirmText: '确定',
				confirmColor: '#3CC51F'
			})
			return false
		}
		if (!phoneNumber) {
			wx.showModal({
				title: '提示',
				content: '手机号码不能为空',
				confirmText: '确定',
				confirmColor: '#3CC51F'
			})
			return false
		}
		if (!logoUrl) {
			wx.showModal({
				title: '提示',
				content: 'logo不能为空',
				confirmText: '确定',
				confirmColor: '#3CC51F'
			})
			return false
		}




		wx.setStorageSync('companyName', companyName)
		wx.setStorageSync('adminName', adminName)
		wx.setStorageSync('phoneNumber', phoneNumber)
		wx.setStorageSync('logoUrl', logoUrl)
		//跳转到设置公司地址
		wx.navigateTo({
		  url: '../setCompanyAddress/setCompanyAddress'
		})
		
	}
})