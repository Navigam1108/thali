export const KEYS = ['kcal', 'protein', 'carbs', 'fat'];
// Illustrative reference values per 100 g raw ingredient, not a verified food database.
export const INGREDIENTS = [
  {id:'oats',name:'Rolled oats',kcal:389,protein:16.9,carbs:66.3,fat:6.9},
  {id:'milk',name:'Milk',kcal:61,protein:3.2,carbs:4.8,fat:3.3},
  {id:'banana',name:'Banana',kcal:89,protein:1.1,carbs:22.8,fat:0.3},
  {id:'rice',name:'Rice, uncooked',kcal:365,protein:7.1,carbs:80,fat:0.7},
  {id:'dal',name:'Moong dal, dry',kcal:347,protein:24,carbs:63,fat:1.2},
  {id:'paneer',name:'Paneer',kcal:265,protein:18.3,carbs:1.2,fat:20.8},
  {id:'tofu',name:'Tofu',kcal:76,protein:8.1,carbs:1.9,fat:4.8},
  {id:'chickpeas',name:'Chickpeas, dry',kcal:364,protein:19.3,carbs:60.7,fat:6},
  {id:'flour',name:'Whole wheat flour',kcal:340,protein:13.2,carbs:72,fat:2.5},
  {id:'curd',name:'Plain curd',kcal:61,protein:3.5,carbs:4.7,fat:3.3},
  {id:'egg',name:'Whole egg',kcal:143,protein:12.6,carbs:0.7,fat:9.5},
  {id:'chicken',name:'Chicken breast, raw',kcal:120,protein:22.5,carbs:0,fat:2.6},
  {id:'tomato',name:'Tomato',kcal:18,protein:0.9,carbs:3.9,fat:0.2},
  {id:'onion',name:'Onion',kcal:40,protein:1.1,carbs:9.3,fat:0.1},
  {id:'spinach',name:'Spinach',kcal:23,protein:2.9,carbs:3.6,fat:0.4},
  {id:'oil',name:'Cooking oil',kcal:884,protein:0,carbs:0,fat:100},
];
export function positive(value, name) {
  const n=Number(value);
  if(!Number.isFinite(n) || n<=0) throw new Error(`${name} must be greater than zero.`);
  return n;
}
export function validateMacros(values) {
  const out={};
  for(const key of KEYS){
    if(values[key]==='' || values[key]===null || values[key]===undefined) throw new Error('Review and enter all four nutrition values. Missing values are not zero.');
    const n=Number(values[key]);
    if(!Number.isFinite(n)||n<0) throw new Error('Nutrition values must be zero or greater.');
    out[key]=n;
  }
  return out;
}
export function scaleMacros(macros, multiplier){
  if(!Number.isFinite(multiplier)||multiplier<=0)throw new Error('Choose a valid amount.');
  return Object.fromEntries(KEYS.map(k=>[k,Number(macros[k])*multiplier]));
}
export function recipeMacros(rows, yieldGrams, portionGrams){
  const yieldG=positive(yieldGrams,'Cooked recipe weight');
  const portionG=positive(portionGrams,'Portion weight');
  if(portionG>yieldG)throw new Error('Your portion cannot exceed the cooked recipe weight.');
  if(!rows.length)throw new Error('Add at least one ingredient.');
  const total=Object.fromEntries(KEYS.map(k=>[k,0]));
  for(const row of rows){
    const ref=INGREDIENTS.find(i=>i.id===row.id);
    if(!ref)throw new Error('Choose an ingredient from the list.');
    const grams=positive(row.grams,'Ingredient weight');
    for(const k of KEYS)total[k]+=ref[k]*grams/100;
  }
  return {total,portion:scaleMacros(total,portionG/yieldG),yieldG,portionG};
}
export function labelMacros(values,basis,basisGrams,consumedGrams){
  const macros=validateMacros(values);
  const base=basis==='100g'?100:positive(basisGrams,'Label serving weight');
  const amount=positive(consumedGrams,'Amount eaten');
  return scaleMacros(macros,amount/base);
}
export function totals(entries){
  return entries.reduce((sum,e)=>{
    for(const key of KEYS)sum[key]+=Number(e.macros[key]);
    return sum;
  },Object.fromEntries(KEYS.map(k=>[k,0])));
}
// Conservative, single-column parser. Multi-column panels require manual review.
export function parseLabel(text){
  const clean=text.replace(/\r/g,'').replace(/,/g,'.');
  const number='([0-9]+(?:\\.[0-9]+)?)';
  const take=(regex)=>{const m=clean.match(regex);return m?Number(m[1]):'';};
  const kcal=take(new RegExp('(?:energy|calories)\\s*[:\\-]?\\s*'+number+'\\s*(?:kcal|cal)','i'));
  const protein=take(new RegExp('protein\\s*(?:\\(g\\))?\\s*[:\\-]?\\s*'+number+'\\s*g?','i'));
  const carbs=take(new RegExp('(?:total\\s+)?carbohydrates?\\s*(?:\\(g\\))?\\s*[:\\-]?\\s*'+number+'\\s*g?','i'));
  const fat=take(new RegExp('(?:^|\\n)\\s*(?:total\\s+)?fat\\s*(?:\\(g\\))?\\s*[:\\-]?\\s*'+number+'\\s*g?','i'));
  const basis=/per\s*100\s*g/i.test(clean)?'100g':(/per\s+serv(?:ing|e)/i.test(clean)?'serving':'');
  const basisGrams=take(/serving\s*(?:size)?\s*[:\-]?\s*([0-9]+(?:\.[0-9]+)?)\s*g/i);
  return {kcal,protein,carbs,fat,basis,basisGrams};
}
export function localDay(date=new Date()){
  return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
}
export const SAMPLE_ORDERS=[
  {id:'order1',name:'Paneer tikka bowl',restaurant:'The Green Kitchen',time:'12:40 PM',meal:'Lunch',macros:{kcal:510,protein:28,carbs:49,fat:22},kind:'veg'},
  {id:'order2',name:'Grilled chicken rice bowl',restaurant:'Everyday Bowls',time:'Yesterday',meal:'Dinner',macros:{kcal:540,protein:39,carbs:57,fat:17},kind:'nonveg'},
  {id:'order3',name:'Chole rice bowl',restaurant:'Ghar Ka Kitchen',time:'Yesterday',meal:'Lunch',macros:{kcal:495,protein:17,carbs:78,fat:13},kind:'veg'},
];
export const SEED_RECIPES=[
  {id:'recipe1',name:'Moong dal chilla',author:'Aditi',region:'North Indian',description:'A quick breakfast with dal, vegetables and a little oil.',rows:[{id:'dal',grams:70},{id:'onion',grams:30},{id:'tomato',grams:40},{id:'oil',grams:5}],yieldG:230,portionG:230,color:'yellow',saved:false},
  {id:'recipe2',name:'Palak paneer bowl',author:'Rohan',region:'North Indian',description:'A simple spinach and paneer recipe. Weigh your cooked batch to portion it.',rows:[{id:'paneer',grams:100},{id:'spinach',grams:100},{id:'tomato',grams:70},{id:'oil',grams:5}],yieldG:260,portionG:260,color:'green',saved:false},
  {id:'recipe3',name:'Banana overnight oats',author:'Meera',region:'Everyday breakfast',description:'Oats, milk and banana, ready for a busy morning.',rows:[{id:'oats',grams:40},{id:'milk',grams:150},{id:'banana',grams:60}],yieldG:250,portionG:250,color:'orange',saved:true},
];
