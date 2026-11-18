import test from 'node:test';
import assert from 'node:assert/strict';
import {recipeMacros,labelMacros,parseLabel,totals,scaleMacros} from '../dist/core.js';
test('recipes use ingredient weights and cooked yield, not raw batch weight as serving denominator',()=>{
 const {total,portion}=recipeMacros([{id:'rice',grams:100},{id:'oil',grams:10}],300,150);
 assert.equal(total.kcal,453.4);assert.equal(portion.kcal,226.7);assert.equal(portion.fat,5.35);
});
test('invalid yield, empty recipe and portion larger than batch are rejected',()=>{
 assert.throws(()=>recipeMacros([{id:'rice',grams:100}],0,50));
 assert.throws(()=>recipeMacros([],100,50));
 assert.throws(()=>recipeMacros([{id:'rice',grams:100}],100,101));
 assert.throws(()=>recipeMacros([{id:'rice',grams:-1}],100,50));
});
test('per 100g labels and per serving labels are normalized separately',()=>{
 const macros={kcal:400,protein:20,carbs:60,fat:10};
 assert.equal(labelMacros(macros,'100g','',30).kcal,120);
 assert.equal(labelMacros(macros,'serving',40,20).kcal,200);
 assert.throws(()=>labelMacros(macros,'serving','',20));
});
test('missing values remain missing; a genuine zero is allowed',()=>{
 assert.throws(()=>labelMacros({kcal:100,protein:'',carbs:20,fat:2},'100g',100,20));
 assert.equal(labelMacros({kcal:100,protein:0,carbs:20,fat:2},'100g',100,20).protein,0);
});
test('parser retains decimals and does not treat saturated fat as total fat',()=>{
 const result=parseLabel('Per 100 g\nEnergy 380 kcal\nProtein 20.5 g\nCarbohydrate 60 g\nSaturated fat 2 g\nTotal fat 6.5 g');
 assert.deepEqual(result,{kcal:380,protein:20.5,carbs:60,fat:6.5,basis:'100g',basisGrams:''});
 const missing=parseLabel('Energy 1000 kJ\nSaturated fat 2 g');assert.equal(missing.kcal,'');assert.equal(missing.fat,'');
});
test('serving basis requires an explicit serving amount',()=>{
 const result=parseLabel('Per serving\nServing size: 40 g\nEnergy 150 kcal\nProtein 5 g');
 assert.equal(result.basis,'serving');assert.equal(result.basisGrams,40);
});
test('half portions aggregate without per-entry rounding drift',()=>{
 const macros={kcal:151,protein:11.1,carbs:15.5,fat:5.3};
 const t=totals([{macros:scaleMacros(macros,.5)},{macros:scaleMacros(macros,.5)}]);
 assert.deepEqual(t,macros);assert.deepEqual(totals([]),{kcal:0,protein:0,carbs:0,fat:0});
});
