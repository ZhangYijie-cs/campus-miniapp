// 首页：按店名和分类实时检索，支持分类筛选与收藏。
const util=require('../../utils/util');
const common=require('../../utils/list-page');
const {categories}=require('../../data/food-data');
Page(Object.assign({},common,{
 data:{categories,category:'全部',keyword:'',foods:[]},
 refresh(){ const keyword=this.data.keyword.trim().toLowerCase(); this.setData({foods:util.getFoods().filter(food=>(this.data.category==='全部'||food.category===this.data.category)&&(!keyword||(food.name+food.category).toLowerCase().includes(keyword)))}); },
 search(event){this.setData({keyword:event.detail.value});this.refresh();},
 selectCategory(event){this.setData({category:event.currentTarget.dataset.category});this.refresh();},
 clearSearch(){this.setData({keyword:'',category:'全部'});this.refresh();}
}));
