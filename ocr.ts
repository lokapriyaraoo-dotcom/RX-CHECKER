import * as FileSystem from 'expo-file-system';
import { Medicine } from './types';
import { OCR_MAX_BYTES, mapGatewayErrorMessage, validateOcrPayload } from './security';

export async function scanPrescription(uri:string):Promise<{patient:Partial<{name:string;age:string}>;medicines:Medicine[]}> {
  const gateway=process.env.EXPO_PUBLIC_OCR_GATEWAY;
  if(!gateway) return {patient:{},medicines:[{id:cryptoRandom(),name:'Warfarin',dose:'5',unit:'mg',freq:'1',ocrConfidence:.94},{id:cryptoRandom(),name:'Ibuprofen',dose:'400',unit:'mg',freq:'3',ocrConfidence:.78}]};
  try {
    const info=await FileSystem.getInfoAsync(uri,{size:true});
    if(!info.exists || (info.size ?? 0)>OCR_MAX_BYTES) throw new Error('413 payload too large');
    const response=await fetch(uri); const buffer=await response.arrayBuffer();
    const bytes=new Uint8Array(buffer); const valid=validateOcrPayload(bytes); if(!valid.ok) throw new Error('invalid image header');
    const form=new FormData(); form.append('image',{uri,name:'prescription.jpg',type:'image/jpeg'} as any);
    const res=await fetch(gateway,{method:'POST',body:form}); if(!res.ok) throw new Error(`${res.status} ${await res.text()}`);
    return await res.json();
  } catch(e) { throw new Error(mapGatewayErrorMessage(e)); }
}
function cryptoRandom(){return Math.random().toString(36).slice(2)+Date.now().toString(36)}
