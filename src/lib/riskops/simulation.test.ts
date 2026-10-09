import {describe,it,expect} from 'vitest';
import {BASE_CUTOFF,policyAt,scoreApplicant,defaultApplicant,applicantSchema} from './simulation';
describe('RiskOps illustrative simulations',()=>{
 it('retains exact supplied operating point',()=>{const p=policyAt(BASE_CUTOFF);expect(p.approval).toBeCloseTo(70);expect(p.defaultRate).toBeCloseTo(16.43);expect(p.screened).toBe(50.62);expect(p.suppliedSavings).toBeCloseTo(398000000)});
 it('moves volume and risk monotonically',()=>{const low=policyAt(.2),high=policyAt(.8);expect(low.approval).toBeLessThan(high.approval);expect(low.defaultRate).toBeLessThan(high.defaultRate);expect(low.screened).toBeGreaterThan(high.screened)});
 it('approves default and rejects adverse borrower',()=>{expect(scoreApplicant(defaultApplicant).approved).toBe(true);expect(scoreApplicant({...defaultApplicant,fico:600,dti:40,income:15000,loan:40000,inquiries:10,utilization:100,history:1}).approved).toBe(false)});
 it('increasing FICO reduces risk',()=>{expect(scoreApplicant({...defaultApplicant,fico:800}).pd).toBeLessThan(scoreApplicant(defaultApplicant).pd)});
 it('rejects invalid applicant input',()=>{expect(applicantSchema.safeParse({...defaultApplicant,income:0}).success).toBe(false)});
});
