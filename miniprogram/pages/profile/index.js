// 我的页面：收藏数、已发表评价数与本人评价记录。
const util=require('../../utils/util');
Page(Object.assign({},require('../../utils/list-page'),{data:{favoriteCount:0,reviewCount:0,reviews:[]},refresh(){const state=util.readState();const foods=util.getFoods();this.setData({favoriteCount:state.favorites.length,reviewCount:state.reviews.length,reviews:state.reviews.slice().reverse().map(review=>Object.assign({},review,{name:foods.find(food=>food.id===review.foodId).name,stars:util.renderStars(review.rating)}))});},openFavorites(){wx.switchTab({url:'/pages/favorites/index'});}}));
