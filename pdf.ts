import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { Analysis, Medicine, Patient } from './types';
import { pharmacySearchUrls } from './links';

export async function exportReport(patient:Patient,meds:Medicine[],analysis:Analysis){
 const rows=meds.map(m=>`<tr><td>${esc(m.name)}</td><td>${esc(m.dose)} ${esc(m.unit)}</td><td>${esc(m.freq)}/day</td></tr>`).join('');
 const findings=analysis.findings.map(f=>`<li><b>${esc(f.title)}</b> — ${esc(f.detail)}</li>`).join('');
 const alts=analysis.alternatives.map(a=>{const u=pharmacySearchUrls(a.to);return `<li><b>${esc(a.from)} → ${esc(a.to)}</b><br/>${esc(a.reason)}<br/><a href="${u.truemeds}">Truemeds</a> · <a href="${u.tata1mg}">Tata 1mg</a></li>`}).join('');
 const html=`<html><body style="font-family:Arial;padding:28px;color:#20302d"><h1>Rx/Check — AI Prescription Error Detector</h1><p><b>Safety status:</b> ${analysis.risk} risk · score ${analysis.score}/100</p><p>Patient: ${esc(patient.name)} · Age: ${esc(patient.age)} · Weight: ${esc(patient.weight)} kg · Gender: ${esc(patient.gender)}</p><h2>Medicines</h2><table border="1" cellpadding="7" cellspacing="0">${rows}</table><h2>Analysis</h2><ul>${findings}</ul><h2>Alternatives</h2><ul>${alts||'<li>No alternative suggestion generated.</li>'}</ul><hr/><p><b>Important:</b> This report is a decision-support prototype. It does not verify that a prescription is safe or appropriate and must not replace a licensed prescriber/pharmacist or authoritative clinical reference.</p></body></html>`;
 const {uri}=await Print.printToFileAsync({html});
 if(await Sharing.isAvailableAsync()) await Sharing.shareAsync(uri,{mimeType:'application/pdf',dialogTitle:'Share Rx/Check report'});
 return uri;
}
const esc=(x:string)=>x.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
