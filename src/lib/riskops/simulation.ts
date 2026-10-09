import { z } from 'zod';
export const BASE_CUTOFF = 0.5306;
const exponent = Math.log(16.43 / 23.28) / Math.log(.7);
export function policyAt(cutoff:number) {
 const approval = Math.min(.995,Math.max(.01, cutoff<=BASE_CUTOFF ? .7*Math.pow(cutoff/BASE_CUTOFF,1.55) : .7+.3*Math.pow((cutoff-BASE_CUTOFF)/(.9-BASE_CUTOFF),.75)));
 const defaultRate = 23.28*Math.pow(approval,exponent);
 const screened = 100*(1-approval*defaultRate/23.28);
 return { approval:approval*100,rejection:(1-approval)*100,defaultRate,screened:cutoff===BASE_CUTOFF?50.62:screened,suppliedSavings:398000000*(screened/50.62) };
}
export function frontierData(){return Array.from({length:21},(_,i)=>({name:i*5,value:i===0?0:23.28*Math.pow(i/20,exponent)}));}
export const applicantSchema=z.object({loan:z.number().min(1000).max(40000),term:z.enum(['36','60']),income:z.number().min(15000).max(300000),dti:z.number().min(0).max(40),fico:z.number().min(600).max(850),history:z.number().min(1).max(40),employment:z.enum(['<1','1','2','3','4','5','6','7','8','9','10+','Unknown']),home:z.enum(['RENT','MORTGAGE','OWN']),verification:z.enum(['Not Verified','Source Verified','Verified']),purpose:z.enum(['Debt Consolidation','Credit Card','Small Business','Home Improvement']),utilization:z.number().min(0).max(100),inquiries:z.number().int().min(0).max(10)});
export type Applicant = z.infer<typeof applicantSchema>;
export const defaultApplicant:Applicant={loan:15000,term:'36',income:75000,dti:18.5,fico:695,history:12,employment:'7',home:'MORTGAGE',verification:'Source Verified',purpose:'Debt Consolidation',utilization:45,inquiries:1};
export function scoreApplicant(input:Applicant){
 const a=applicantSchema.parse(input);
 const contributions=[{label:'FICO quality',value:-(a.fico-670)*.018},{label:'Debt-to-income',value:(a.dti-15)*.065},{label:'Recent inquiries',value:a.inquiries*.19},{label:'Annual income',value:-Math.log(a.income/45000)*.48},{label:'Revolving utilization',value:(a.utilization-35)*.014},{label:'Credit history',value:-(a.history-8)*.025},{label:'Loan exposure',value:(a.loan/a.income-.2)*1.8},{label:'Loan term',value:a.term==='60'?.28:0},{label:'Employment',value:a.employment==='Unknown'?.12:a.employment==='<1'?.18:a.employment==='10+'?-.12:-(Number(a.employment)-3)*.015},{label:'Home ownership',value:a.home==='RENT'?.12:a.home==='OWN'?-.08:0},{label:'Verification',value:a.verification==='Verified'?-.06:a.verification==='Not Verified'?.04:0},{label:'Loan purpose',value:a.purpose==='Small Business'?.46:a.purpose==='Credit Card'?-.08:a.purpose==='Home Improvement'?-.03:0}];
 const logit=-1.29+contributions.reduce((sum,c)=>sum+c.value,0);
 const pd=1/(1+Math.exp(-logit));
 const grade=pd<.08?'AAA':pd<.14?'AA':pd<.20?'A':pd<.30?'B':pd<.45?'C':'Subprime';
 return {pd,approved:pd<=BASE_CUTOFF,grade,contributions};
}
