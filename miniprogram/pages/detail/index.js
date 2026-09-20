// 店铺详情：轮播、推荐菜、评价列表，以及收藏和评价入口。
const util=require('../../utils/util');
Page({data:{food:null,loaded:false},onLoad(options){this.foodId=options.id;},onShow(){this.setData({food:util.getFood(this.foodId)||null,loaded:true});},favorite(){if(util.toggleFavorite(this.foodId))this.onShow();},writeReview(){wx.navigateTo({url:'/pages/review/index?id='+this.foodId});},goHome(){wx.switchTab({url:'/pages/index/index'});},onShareAppMessage(){return {title:this.data.food?this.data.food.name+' · 一起去吃点好的':'食光探店',path:this.data.food?'/pages/detail/index?id='+this.foodId:'/pages/index/index'};}});
