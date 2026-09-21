// 收藏页：展示持久化收藏，支持即时取消与下拉刷新。
const util=require('../../utils/util');
Page(Object.assign({},require('../../utils/list-page'),{data:{foods:[]},refresh(){this.setData({foods:util.getFoods().filter(food=>food.favorite)});}}));
