import {pipeline,env} from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.8.1/dist/transformers.min.js';
env.allowLocalModels=false;
env.backends.onnx.wasm.numThreads=1;
let classifier;
let busy=false;
self.onmessage=async ({data})=>{
 if(busy)return;
 busy=true;
 const send=(type,payload={})=>self.postMessage({id:data.id,type,...payload});
 try{
  if(!classifier){
   send('progress',{message:'Downloading the image model. First use is about 155 MB plus the runtime; later scans use the browser cache.'});
   classifier=await pipeline('zero-shot-image-classification','Xenova/clip-vit-base-patch32',{
    revision:'d15189d7028b43f1d3e65039190477f6af591c2a',dtype:'q8',device:'wasm',
    progress_callback:p=>{if(p.status==='progress'&&p.file?.endsWith('.onnx'))send('progress',{message:`Downloading image model · ${Math.round(p.progress)}%`});}
   });
  }
  send('progress',{message:'Comparing your photo with supported dishes on this device…'});
  const results=await classifier(data.image,data.labels,{hypothesis_template:'This is a photo of {}.'});
  send('result',{results});
 }catch(error){
  classifier=null;
  send('error',{message:'The image model could not run on this connection or device. You can select the dishes manually below and still get a portion estimate.'});
 }finally{busy=false;}
};
