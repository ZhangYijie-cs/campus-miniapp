// 列表页共享交互：刷新、详情跳转、收藏与分享。
const util = require('./util');
module.exports = {
  openFood(event) { wx.navigateTo({url:'/pages/detail/index?id='+event.currentTarget.dataset.id}); },
  favorite(event) { if(util.toggleFavorite(event.currentTarget.dataset.id)) this.refresh(); },
  onShow() { this.refresh(); },
  onPullDownRefresh() { try { this.refresh(); } finally { wx.stopPullDownRefresh(); } },
  goHome() { wx.switchTab({url:'/pages/index/index'}); },
  onShareAppMessage() { return {title:'食光探店 · 把每一餐过成小确幸',path:'/pages/index/index'}; }
};
