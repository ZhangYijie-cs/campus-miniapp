// 榜单页：按未四舍五入的真实均分排名，同分按评价数排序。
const util=require('../../utils/util');
Page(Object.assign({},require('../../utils/list-page'),{data:{foods:[]},refresh(){this.setData({foods:util.getFoods().sort((a,b)=>b.average-a.average||b.reviewCount-a.reviewCount||a.id.localeCompare(b.id)).map((food,index)=>Object.assign({},food,{rank:index+1,medal:['🥇','🥈','🥉'][index]||''}))});}}));
