// 公共逻辑：缓存校验、评分计算、星级渲染与页面数据派生。
const { foods } = require('../data/food-data');
const STORAGE_KEY = 'shiguang-food-v1';
function readState() {
  try {
    const saved = wx.getStorageSync(STORAGE_KEY) || {};
    const validIds = foods.map(food => food.id);
    return {
      favorites: Array.isArray(saved.favorites) ? saved.favorites.filter(id => validIds.includes(id)) : [],
      reviews: Array.isArray(saved.reviews) ? saved.reviews.filter(r => r && validIds.includes(r.foodId) && Number.isInteger(r.rating) && r.rating >= 1 && r.rating <= 5 && typeof r.content === 'string' && typeof r.nickname === 'string' && typeof r.time === 'string').map(r => Object.assign({}, r, {mine:true})) : []
    };
  } catch (error) { wx.showToast({title:'缓存读取失败，请重试',icon:'none'}); return {favorites:[], reviews:[]}; }
}
function writeState(state) {
  // 同步写入成功后页面才更新，避免存储失败时误报成功。
  try { wx.setStorageSync(STORAGE_KEY, state); return true; }
  catch (error) { wx.showToast({title:'保存失败，请检查存储空间',icon:'none'}); return false; }
}
function renderStars(score) { return [1,2,3,4,5].map(value => ({value, filled: value <= Math.round(Number(score))})); }
function averageScore(reviews) {
  // 原始评价与用户新增评价共同参与算术平均，仅展示时保留一位小数。
  return reviews.length ? reviews.reduce((sum,r) => sum + r.rating,0) / reviews.length : 0;
}
function getFoods() {
  const state = readState();
  return foods.map(food => {
    const reviews = state.reviews.filter(r=>r.foodId===food.id).slice().reverse().concat(food.reviews).map(r=>Object.assign({},r,{stars:renderStars(r.rating)}));
    const average = averageScore(reviews);
    return Object.assign({},food,{reviews,average,score:average.toFixed(1),stars:renderStars(average),reviewCount:reviews.length,favorite:state.favorites.includes(food.id)});
  });
}
function getFood(id) { return getFoods().find(food=>food.id===id); }
function toggleFavorite(id) {
  if (!foods.some(food=>food.id===id)) return false;
  const state=readState();
  state.favorites=state.favorites.includes(id)?state.favorites.filter(value=>value!==id):state.favorites.concat(id);
  return writeState(state);
}
function formatTime(date) { const pad=n=>String(n).padStart(2,'0'); return `${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`; }
function addReview(foodId,rating,content,nickname) {
  if (!foods.some(food=>food.id===foodId) || !Number.isInteger(rating) || rating<1 || rating>5 || !content.trim() || content.trim().length>300 || !nickname.trim() || nickname.trim().length>16) return false;
  const state=readState();
  state.reviews.push({id:'review-'+Date.now()+'-'+Math.random().toString(36).slice(2,8),foodId,rating,content:content.trim(),nickname:nickname.trim(),time:formatTime(new Date()),mine:true});
  return writeState(state);
}
module.exports={readState,getFoods,getFood,toggleFavorite,renderStars,averageScore,formatTime,addReview};
