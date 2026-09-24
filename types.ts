export type Severity = 'error' | 'warning' | 'ok';
export type Patient = { name:string; age:string; weight:string; gender:string; pregnant:boolean; allergy:string; kidney:boolean; liver:boolean };
export type Medicine = { id:string; name:string; dose:string; unit:string; freq:string; ocrConfidence?:number };
export type Finding = { id:string; severity:Severity; title:string; detail:string; evidence?:string; medicine?:string };
export type Analysis = { findings:Finding[]; score:number; risk:'HIGH'|'MODERATE'|'LOW'; alternatives:{from:string; to:string; reason:string}[] };
