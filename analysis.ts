import { Analysis, Finding, Medicine, Patient } from './types';

const norm=(s:string)=>s.toLowerCase().replace(/[^a-z0-9]/g,'');

export function analyze(patient:Patient, meds:Medicine[]):Analysis {
  const findings:Finding[]=[];
  const names=meds.map(m=>norm(m.name));
  const add=(f:Finding)=>findings.push(f);
  meds.forEach(m=>{
    const dose=parseFloat(m.dose);
    if (!m.name.trim() || !Number.isFinite(dose) || dose<=0) add({id:`dose-${m.id}`,severity:'error',title:'Invalid dosage input',detail:'Dose must be a positive number with a standard unit.',medicine:m.name||'Unnamed medicine'});
    if (m.ocrConfidence !== undefined && m.ocrConfidence < 0.85) add({id:`ocr-${m.id}`,severity:'warning',title:'Low OCR confidence',detail:`OCR confidence ${(m.ocrConfidence*100).toFixed(0)}%. Verify the medicine and dose against the prescription.`,medicine:m.name});
  });
  const dup=new Set<string>();
  names.forEach((n,i)=>{ if(n && names.indexOf(n)!==i) dup.add(n); });
  dup.forEach(n=>add({id:`dup-${n}`,severity:'error',title:'Duplicate therapy',detail:'The same medicine appears more than once. Confirm intended duplication before dispensing.',medicine:meds.find(m=>norm(m.name)===n)?.name}));
  const hasWarfarin=names.includes('warfarin'); const hasIbuprofen=names.includes('ibuprofen');
  if(hasWarfarin && hasIbuprofen) add({id:'ddi-warfarin-ibuprofen',severity:'error',title:'Drug interaction',detail:'Warfarin + ibuprofen can increase bleeding risk. Clinical review is required.',evidence:'Demo rule: replace this rule set with a licensed/authoritative interaction database for clinical deployment.',medicine:'Warfarin + Ibuprofen'});
  if(patient.allergy.trim()) add({id:'allergy-review',severity:'warning',title:'Allergy review',detail:`Patient allergy listed as “${patient.allergy}”. Match every prescribed medicine against the allergy record.`,evidence:'Patient-entered allergy data; pharmacist verification required.'});
  if(patient.pregnant) add({id:'pregnancy-review',severity:'warning',title:'Pregnancy safety review',detail:'Pregnancy is marked yes. Verify pregnancy-specific safety information for each medicine before use.'});
  if(patient.kidney) add({id:'kidney-review',severity:'warning',title:'Kidney dose review',detail:'Kidney disease is marked yes. Confirm renal dosing using current clinical references.'});
  if(patient.liver) add({id:'liver-review',severity:'warning',title:'Liver dose review',detail:'Liver disease is marked yes. Confirm hepatic dosing/contraindications using current clinical references.'});
  if(findings.length===0) add({id:'all-clear',severity:'ok',title:'No demo rules triggered',detail:'The entered prescription passed the demo checks. This does not establish clinical safety.'});
  const errors=findings.filter(x=>x.severity==='error').length; const warnings=findings.filter(x=>x.severity==='warning').length;
  const score=Math.max(0,Math.min(100,100-errors*28-warnings*10));
  const risk=score<55?'HIGH':score<80?'MODERATE':'LOW';
  const alternatives=[] as Analysis['alternatives'];
  if(hasWarfarin&&hasIbuprofen) alternatives.push({from:'Ibuprofen',to:'Ask prescriber/pharmacist for a safer analgesic option',reason:'Avoid making an automatic therapeutic substitution; select an alternative based on indication, bleeding risk and patient factors.'});
  return {findings,score,risk,alternatives};
}
