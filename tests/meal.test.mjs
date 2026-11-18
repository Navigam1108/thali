import test from 'node:test';
import assert from 'node:assert/strict';
import {estimatePhotoMeal,diaryScenarioRange,rankMealMatches,MEAL_DISHES,OTHER_LABELS} from '../dist/meal-data.js';
test('photo meal estimates combine cooked portions and keep scenario bounds',()=>{
 const e=estimatePhotoMeal([{id:'idli',grams:100},{id:'sambar',grams:150}],0);
 assert.equal(e.midpoint.kcal,228.5);assert.equal(e.midpoint.protein,8.25);
 assert.ok(Math.abs(e.low.kcal-228.5*.68)<1e-8);assert.ok(Math.abs(e.high.kcal-228.5*1.38)<1e-8);
});
test('extra known oil adds calories and fat to every scenario, without adding carbs',()=>{
 const a=estimatePhotoMeal([{id:'rice',grams:150}],0),b=estimatePhotoMeal([{id:'rice',grams:150}],1);
 assert.ok(Math.abs(b.midpoint.kcal-a.midpoint.kcal-39.78)<1e-8);
 assert.equal(b.midpoint.fat-a.midpoint.fat,4.5);assert.equal(b.midpoint.carbs,a.midpoint.carbs);
});
test('unknown dishes, empty plates and invalid amounts cannot be logged as nutrients',()=>{
 for(const args of [[[],0],[[{id:'unknown',grams:100}],0],[[{id:'rice',grams:0}],0],[[{id:'rice',grams:100}],-1]])assert.throws(()=>estimatePhotoMeal(...args));
});
test('diary range combines photo ranges with existing point estimates',()=>{
 const e=estimatePhotoMeal([{id:'idli',grams:100}],0),fixed={kcal:100,protein:2,carbs:10,fat:3};
 const range=diaryScenarioRange([{macros:fixed},{macros:e.midpoint,macroRange:e}]);
 assert.equal(range.low.kcal,100+e.low.kcal);assert.equal(range.high.fat,3+e.high.fat);
});
test('image matches are alternatives, and unsupported top matches require manual review',()=>{
 const r=rankMealMatches([{label:OTHER_LABELS[0],score:.6},{label:MEAL_DISHES[0].label,score:.3}]);
 assert.equal(r.needsManual,true);assert.equal(r.matches[0].dish.id,'idli');
 assert.equal(rankMealMatches([{label:MEAL_DISHES[0].label,score:.8}]).needsManual,false);
 assert.throws(()=>rankMealMatches([]));
});
