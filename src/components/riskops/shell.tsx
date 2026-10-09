import { Link } from '@tanstack/react-router';
import { Activity, ArrowUpRight, ChartNoAxesCombined, Database, FlaskConical, GitBranch, LayoutDashboard, ShieldCheck, SlidersHorizontal, Terminal, Zap } from 'lucide-react';
import type { ReactNode } from 'react';
import { Sticker } from './shared';
const links = [
 {to:'/',label:'Overview & Pipeline',icon:LayoutDashboard},
 {to:'/data-engineering',label:'Data Engineering & SQL',icon:Database},
 {to:'/features',label:'Feature Guardrails & EDA',icon:FlaskConical},
 {to:'/models',label:'Models & Diagnostics',icon:ChartNoAxesCombined},
 {to:'/policy',label:'Policy Frontier Simulator',icon:SlidersHorizontal},
 {to:'/underwriting',label:'Live Underwriting',icon:Terminal},
 {to:'/governance',label:'Governance & Defense',icon:ShieldCheck}
] as const;
export function RiskShell({ children }: {children:ReactNode}) { return <div className="risk-shell"><header className="global-header"><div className="header-inner"><Link to="/" className="brand"><span className="brand-mark"><Zap fill="currentColor" size={25}/></span><span className="brand-name">RiskOps<span className="brand-divider">//</span><span className="brand-subtitle">LENDINGCLUB CREDIT GRANTING CORE</span></span></Link><div className="header-right"><span className="environment"><span className="live-dot"/>RESEARCH ENVIRONMENT</span><span className="header-version">v1.0</span><span className="analyst-avatar" title="Risk analyst">RA</span></div></div></header><div className="global-content"><div className="status-strip"><Sticker tone="lime"><span className="live-dot"/> OUT-OF-TIME VALIDATED · 2016</Sticker><Sticker tone="cyan"><Database size={12}/> 1,026,436 LOANS ANALYZED</Sticker><Sticker tone="violet"><ShieldCheck size={12}/> DRIFT PSI: 0.0033</Sticker><Sticker tone="yellow"><SlidersHorizontal size={12}/> POLICY CUTOFF: θ = 0.5306</Sticker><span className="status-caption"><Activity size={13}/> Reported model results</span></div><nav className="nav-switcher" aria-label="Primary navigation">{links.map(({to,label,icon:Icon},i)=><Link key={to} to={to} activeOptions={{exact:true}} className="nav-tab" activeProps={{className:'nav-tab nav-active'}}><Icon size={16}/><span>{label}</span><span className="nav-index">0{i+1}</span></Link>)}</nav><main id="main-content">{children}</main><footer className="app-footer"><span><GitBranch size={13}/> RiskOps / Lending Club Credit Granting & Policy Engine</span><span>2013–2016 mature cohorts <span className="footer-separator">·</span> Research use only <ArrowUpRight size={13}/></span></footer></div></div>; }
