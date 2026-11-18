import {KEYS,positive} from './core.js';
// Illustrative prepared-food references per 100 g. They are not measured from photos.
export const MEAL_DISHES=[
 {id:'idli',name:'Idli',label:'South Indian white steamed idli rice cakes',grams:100,portion:'about 2 medium idlis',kcal:146,protein:4.5,carbs:30,fat:0.7},
 {id:'sambar',name:'Sambar',label:'sambar lentil vegetable stew',grams:150,portion:'about 1 small bowl',kcal:55,protein:2.5,carbs:8,fat:1.5},
 {id:'dosa',name:'Dosa',label:'a South Indian dosa pancake',grams:120,portion:'about 1 medium dosa',kcal:180,protein:4,carbs:30,fat:5},
 {id:'roti',name:'Roti or chapati',label:'brown wheat Indian roti chapati flatbread',grams:35,portion:'about 1 medium roti',kcal:285,protein:9,carbs:52,fat:5},
 {id:'rice',name:'Cooked white rice',label:'a bowl of cooked white rice',grams:150,portion:'about 1 small bowl',kcal:130,protein:2.7,carbs:28,fat:0.3},
 {id:'dal',name:'Cooked dal',label:'Indian dal cooked lentil curry',grams:150,portion:'about 1 small bowl',kcal:110,protein:6,carbs:17,fat:2},
 {id:'rajma',name:'Rajma',label:'rajma kidney bean curry',grams:150,portion:'about 1 small bowl',kcal:127,protein:7,carbs:20,fat:2.2},
 {id:'chole',name:'Chole',label:'chole chickpea curry',grams:150,portion:'about 1 small bowl',kcal:164,protein:8,carbs:24,fat:4},
 {id:'paneer',name:'Paneer curry',label:'Indian paneer cheese curry',grams:150,portion:'about 1 small bowl',kcal:210,protein:11,carbs:8,fat:15},
 {id:'biryani',name:'Biryani',label:'Indian biryani rice',grams:250,portion:'about 1 regular bowl',kcal:180,protein:8,carbs:23,fat:6},
 {id:'poha',name:'Poha',label:'Indian poha flattened rice',grams:180,portion:'about 1 bowl',kcal:160,protein:3,carbs:27,fat:5},
 {id:'samosa',name:'Samosa',label:'Indian samosa fried pastry',grams:80,portion:'about 1 large samosa',kcal:300,protein:5,carbs:32,fat:17},
 {id:'omelette',name:'Omelette',label:'an egg omelette',grams:100,portion:'about 1 two egg omelette',kcal:154,protein:11,carbs:2,fat:12},
 {id:'chicken',name:'Chicken curry',label:'Indian chicken curry',grams:150,portion:'about 1 small bowl',kcal:180,protein:17,carbs:6,fat:10},
 {id:'salad',name:'Vegetable salad',label:'a fresh vegetable salad',grams:150,portion:'about 1 bowl without dressing',kcal:35,protein:1.3,carbs:6,fat:0.5},
 {id:'pizza',name:'Pizza',label:'a slice of pizza',grams:120,portion:'about 1 large slice',kcal:266,protein:11,carbs:33,fat:10},
 {id:'oats',name:'Cooked oats',label:'a bowl of oatmeal porridge',grams:200,portion:'about 1 bowl',kcal:120,protein:4,carbs:20,fat:3},
 {id:'sandwich',name:'Sandwich',label:'a sandwich with bread and filling',grams:150,portion:'about 1 sandwich',kcal:200,protein:7,carbs:27,fat:7},
 {id:'fruit',name:'Fresh fruit',label:'a bowl of fresh fruit',grams:150,portion:'about 1 small bowl',kcal:80,protein:0.8,carbs:20,fat:0.3},
 {id:'curd',name:'Plain curd',label:'a bowl of plain yogurt curd',grams:100,portion:'about 1 small bowl',kcal:60,protein:3.5,carbs:4.7,fat:3.3},
];
export const OTHER_LABELS=['a mixed Indian thali with several different dishes','a drink in a glass','an empty plate with no food','a printed nutrition facts label with text','a computer screen or a document','a non-food object'];
export function estimatePhotoMeal(rows,extraOilTsp=0){
 if(!rows.length)throw new Error('Confirm at least one dish on your plate.');
 const oil=Number(extraOilTsp);
 if(!Number.isFinite(oil)||oil<0||oil>20)throw new Error('Extra oil must be between 0 and 20 teaspoons.');
 const midpoint=Object.fromEntries(KEYS.map(k=>[k,0]));
 for(const row of rows){
  const dish=MEAL_DISHES.find(d=>d.id===row.id);
  if(!dish)throw new Error('Choose a supported dish, or use the ingredient calculator.');
  const grams=positive(row.grams,'Portion weight');
  if(grams>5000)throw new Error('Use a portion of 5000 g or less for each dish.');
  for(const key of KEYS)midpoint[key]+=dish[key]*grams/100;
 }
 // Scenario bounds: +/-20% portion and +/-15% recipe variation, not calibrated confidence.
 const low=Object.fromEntries(KEYS.map(k=>[k,midpoint[k]*0.8*0.85]));
 const high=Object.fromEntries(KEYS.map(k=>[k,midpoint[k]*1.2*1.15]));
 const oilMacros={kcal:oil*4.5*8.84,protein:0,carbs:0,fat:oil*4.5};
 for(const key of KEYS){midpoint[key]+=oilMacros[key];low[key]+=oilMacros[key];high[key]+=oilMacros[key];}
 return {midpoint,low,high};
}
export function diaryScenarioRange(entries){
 return entries.reduce((sum,e)=>{for(const k of KEYS){sum.low[k]+=e.macroRange?.low?.[k]??e.macros[k];sum.high[k]+=e.macroRange?.high?.[k]??e.macros[k];}return sum;},{low:Object.fromEntries(KEYS.map(k=>[k,0])),high:Object.fromEntries(KEYS.map(k=>[k,0]))});
}
export function rankMealMatches(results){
 if(!Array.isArray(results)||!results.length)throw new Error('The image model returned no matches.');
 const valid=results.filter(r=>Number.isFinite(r.score)&&r.score>=0).sort((a,b)=>b.score-a.score);
 const first=valid[0];
 const matches=valid.map(r=>({...r,dish:MEAL_DISHES.find(d=>d.label===r.label)})).filter(r=>r.dish).slice(0,3);
 // Relative ranking only. A top result never certifies that an image is food.
 return {matches,needsManual:!first||!MEAL_DISHES.some(d=>d.label===first.label)};
}
