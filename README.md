# Policy Engine Core

Build a high-impact, analytical credit risk web application called "RiskOps: Lending Club Credit Granting & Policy Engine". 

### 1. DESIGN SYSTEM: "NEO-BRUTALIST GLASS" (NEO-GLASS)
The design must be a synthesis of Neobrutalism (bold, tactile, high-contrast, confident) and Glassmorphism (frosted translucency, specular blur, modern depth). It must look vibrant and punchy, while treating the financial models and data with institutional seriousness.

- Aesthetic Rules & Tailwind Specs:
  * Surfaces / Cards: Translucent frosted white/slate panels with heavy backdrop blur and crisp ink-black borders: `bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-2 border-black dark:border-white shadow-[5px_5px_0px_0px_#000000] dark:shadow-[5px_5px_0px_0px_#FFFFFF] rounded-2xl p-6 transition-all`
  * Buttons & Interactive Tabs: Tactile brutalist blocks with hard offset shadows. On hover/active, simulate physical mechanical depression: `border-2 border-black font-black uppercase tracking-wider shadow-[4px_4px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] hover:translate-x-[3px] hover:translate-y-[3px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all`
  * Vibrant Neo-Pastel Accent Palette:
    - Electric Yellow / Amber: #FFE600 (Primary interactive elements, active tabs)
    - Acid Lime / Emerald: #22C55E & #A3E635 (Approved loans, low risk, positive metrics)
    - Hot Coral / Crimson: #FF3366 & #F43F5E (Defaults, adverse actions, leakage exclusions)
    - Hyper Cyan / Electric Sky: #00F0FF & #38BDF8 (SQL layer, data engineering, primary curves)
    - Ultra Violet / Lavender: #A855F7 & #C084FC (Challenger model, EDA, distributions)
    - Ink Black (#000000) for borders, text, and hard shadows; Frosted Pearl (#F8FAFC with subtle grid pattern) for base background.
  * Typography: JetBrains Mono or Space Mono for numbers, metrics, SQL, and code; Inter or Plus Jakarta Sans (Black/Bold weights) for headings.
  * Badges & Tags: Sticker-style pill tags with solid black outlines: `px-3 py-1 font-mono font-bold text-xs uppercase border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_#000]`

---

### 2. APP HEADER & GLOBAL NAVIGATION
- Top Header:
  * Frosted glass sticky banner (`backdrop-blur-md bg-white/70 border-b-2 border-black`)
  * Brand: "⚡ RiskOps // LendingClub Credit Granting Core"
  * Live Brutalist Status Badges:
    - [🟢 OUT-OF-TIME VALIDATED (2016)]
    - [📊 1,026,436 LOANS ANALYZED]
    - [🛡️ DRIFT PSI: 0.0033 (ZERO STABILITY LOSS)]
    - [🎯 POLICY CUTOFF: θ = 0.5306]
- Nav Switcher (Tabbed pills with physical click animations):
  1. Overview & Pipeline
  2. Data Engineering & SQL (Stages 0–1)
  3. Feature Guardrails & EDA (Stages 2–3)
  4. Models & Diagnostics (Stages 4–5)
  5. Policy Frontier Simulator (Stage 5)
  6. Live Underwriting Terminal
  7. Governance & Interview Defense

---

### 3. VIEWS & QUANTITATIVE CONTENT (STRICT MACHINE-VERIFIED NUMBERS)

#### VIEW 1: EXECUTIVE OVERVIEW & ARCHITECTURE PIPELINE
- Executive KPI Matrix (Neo-glass cards with vibrant counter badges):
  * Total Portfolio Analyzed: 1,026,436 loans (2013–2016 mature cohorts)
  * Pre-Model Baseline Default Rate: 23.28% (2016 Out-of-Time held-out test set)
  * Post-Policy Approved Default Rate: 16.43% (at 70% approval cut-off)
  * Portfolio Risk Reduction: -29.4% relative decrease in default losses
  * Defaulters Avoided: 50.62% of defaulting applicants successfully blocked
  * Population Stability Index (PSI): 0.0033 (Benchmark < 0.10: zero macroeconomic drift)
- Interactive Architectural Pipeline:
  * Visual horizontal step-tracker with brutalist connectors:
    [Stage 0: 2.26M Raw Ingestion & Leakage Audit] 
    ➔ [Stage 1: SQLite Star Schema & B-Tree Index Optimization] 
    ➔ [Stage 2: 99th Pct Capping & Temporal Train (733k)/Test (293k) Split] 
    ➔ [Stage 3: 7 Decision-Driven EDA Insights] 
    ➔ [Stage 4: Balanced Logistic Regression & HistGradientBoosting] 
    ➔ [Stage 5: Policy Frontier Optimization at θ=0.5306] 
    ➔ [Stage 6: Automated Pytest Suite & Real-Time Underwriting Engine]
  * Clicking any stage card opens a glass slide-over drawer with that stage's code snippet, input/output row counts, and architectural rationale.

#### VIEW 2: DATA ENGINEERING & SQL GOVERNANCE (STAGES 0 & 1)
- Card A: The Right-Censoring Hazard Curve & Vintage Resolution
  * Interactive Bar/Line Recharts visual displaying why 2017–2018 must be dropped:
    - 2013: 99.99% resolved (15.60% default rate) -> Fully mature
    - 2014: 94.68% resolved (18.45% default rate) -> Fully mature
    - 2015: 89.18% resolved (20.19% default rate) -> Fully mature
    - 2016: 67.47% resolved (23.29% default rate) -> Out-of-Time Test Set (captures 24-36 mo peak hazard)
    - 2017: 38.17% resolved (Right-censored: 61.8% still active -> Dropped)
    - 2018: 11.37% resolved (Severely truncated: 88.6% still active -> Dropped)
  * Neon-Yellow Callout Banner: "SURVIVOR BIAS WARNING: Testing on 2018 evaluates only rapid prepayers and instant catastrophic defaults. The 88.6% of paying borrowers are dropped, destroying model validity."
- Card B: 4-Tier Governance & Leakage Exclusion Matrix
  * Searchable, filterable neo-glass table with colored tag pills:
    - Excluded Target Leakage (44 columns, Hot Coral tag): e.g. `total_pymnt`, `recoveries`, `last_fico_range_high`, `collection_recovery_fee` (dropped: post-origination information).
    - Quarantined Underwriting Outputs (3 columns, Electric Amber tag): `grade`, `sub_grade`, `int_rate` (quarantined to avoid circularity with Lending Club's own existing model).
    - Approved Application-Time Features (25 columns, Acid Lime tag): `loan_amnt`, `dti`, `annual_inc`, `fico_range_low`, `revol_util`, `mort_acc`, etc.
- Card C: SQLite B-Tree Query Optimization Workbench
  * Interactive code diff card showing `EXPLAIN QUERY PLAN` execution:
    - Unindexed query: `SCAN fact_loans` -> Latency: 635.32 ms
    - Indexed query: `SEARCH fact_loans USING INDEX idx_loans_issue_year` -> Latency: 367.84 ms (1.73x speedup)
  * SQL Workbench tab running CTEs: 3-month rolling default rates, vintage default aggregates, and FICO band window functions.

#### VIEW 3: FEATURE GUARDRAILS & DECISION-DRIVEN EDA (STAGES 2 & 3)
- Card A: Out-of-Time Preprocessing Guardrails (Fitted Strictly on Train 2013-15)
  * Neo-glass metric chips:
    - 99th Percentile Income Cap: $250,000
    - 99th Percentile DTI Cap: 37.56%
    - 99th Percentile Revolving Balance Cap: $93,283.96
    - Accounting Anomalies Removed: 122 rows (1 negative DTI, 86 DTI >= 100%, 35 zero/null income)
    - Medians: DTI=17.81, Revol Util=55.4%, Emp Length=7.0 yrs, Credit History=15.0 yrs
- Card B: Decision-Driven EDA Visual Gallery
  * Render high-contrast Recharts charts with bold black grid lines and neon tooltips:
    1. Default Rate by FICO Band: Linear drop from 35.8% (FICO <670) to 9.2% (FICO >=780). Annotation: "Supports monotonic linear predictor; zero binning required."
    2. Default Rate by DTI: Inflection point at DTI > 25%. Annotation: "Supports 99th percentile cap at 37.56% to protect logistic regression weights."
    3. Purpose Risk Ranking: Small Business (28.4%) & Debt Consolidation (22.8%) vs Car (14.2%). Annotation: "Enforces categorical encoding with frequency grouping."
    4. Missingness & Non-Random Dropout: 6.5% missing employment length. Annotation: "Creates binary missingness indicator flag + median imputation."

#### VIEW 4: MODEL BENCHMARKING & DIAGNOSTICS (STAGES 4 & 5)
- Card A: Out-of-Time (2016) Performance Leaderboard
  Display high-contrast brutalist data table:
  | Model | ROC-AUC | PR-AUC | KS Statistic | Brier Score | Fit Time |
  | Primary: Balanced Logistic Regression | 0.7019 | 0.4137 | 29.05% | 0.2117 | 3.57s |
  | Challenger: HistGradientBoosting | 0.7061 | 0.4162 | 29.58% | 0.1601 | 8.73s |
  | Benchmark: LogReg with LC Grade & Rate | 0.7113 | 0.4285 | 30.82% | 0.2081 | 6.31s |
  | Baseline 2: Single Rule (FICO < 670) | 0.5694 | 0.3014 | 13.88% | 0.2520 | 0.01s |
  | Baseline 1: Majority Class Prior | 0.5000 | 0.2328 | 0.00% | 0.2328 | 0.01s |
  * Key Takeaway Badge: "The primary model captures 98.7% of the total predictive power of the benchmark model WITHOUT relying on Lending Club's proprietary grade outputs."
- Card B: Interactive Diagnostic Curve Switcher
  * Tab 1: ROC Curve (Primary AUC 0.7019 vs Challenger 0.7061 vs Baseline 0.5000).
  * Tab 2: Precision-Recall Curve (Showing lift from baseline prior 0.2328 to PR-AUC 0.4137).
  * Tab 3: Decile Gains Chart (Decile 1 default rate: 49.97% vs Decile 10 default rate: 5.45% -> 9.2x risk separation ratio).
  * Tab 4: Reliability Calibration Curve (10 decile buckets tracking the 45-degree truth line).

#### VIEW 5: CREDIT POLICY FRONTIER SIMULATOR (STAGE 5)
- Header: "Executive Policy Optimization: Volume vs Default Trade-Off"
- Interactive Neo-Glass Slider Card:
  * Cutoff Threshold Slider (θ): Adjustable from 0.10 to 0.90 (Default: 0.5306).
  * Dynamic Reactive Metrics (Updating in real time as user drags slider):
    - Approval Rate: 70.0%
    - Rejection Rate: 30.0%
    - Portfolio Default Rate among Approved: 16.43%
    - Default Defaulters Screened Out: 50.62%
    - Expected Net Dollar Loss Saved (Estimated at $15k avg loan size, 60% LGD): $398,000,000+
- Policy Trade-Off Curve (Area chart with black borders and neon emerald fill):
  * X-axis: Approval Volume (0% to 100%)
  * Y-axis: Default Rate of Approved Portfolio (0% to 25%)
  * Interactive Pin at θ = 0.5306 highlighting the optimal risk/volume frontier.

#### VIEW 6: LIVE UNDERWRITING TERMINAL (INTERACTIVE APPLICANT SCORER)
- Purpose: Interactive loan origination simulator for credit analysts.
- Form Inputs (Styled as high-contrast brutalist input fields with hard shadows):
  * Loan Amount ($1,000 - $40,000 slider; default: $15,000)
  * Loan Term (Dropdown: 36 Months, 60 Months)
  * Annual Income ($15,000 - $300,000; default: $75,000)
  * Debt-to-Income (DTI %) (0% - 40% slider; default: 18.5%)
  * FICO Score (600 - 850 slider; default: 695)
  * Credit History Length (1 - 40 yrs; default: 12 yrs)
  * Employment Length (Dropdown: <1 yr, 1-9 yrs, 10+ yrs, Unknown)
  * Home Ownership (Dropdown: RENT, MORTGAGE, OWN)
  * Verification Status (Dropdown: Not Verified, Source Verified, Verified)
  * Loan Purpose (Dropdown: Debt Consolidation, Credit Card, Small Business, Home Improvement)
  * Revolving Line Utilization (0% - 100% slider; default: 45%)
  * Recent Inquiries past 6 months (0 - 10; default: 1)
- "EVALUATE APPLICATION" Button (Vibrant Yellow, mechanical push animation).
- Decision Output Card:
  * Dynamic calculation using logistic model weights (higher FICO/income decreases PD; high DTI/revol_util/inquiries increases PD).
  * Big Status Stamp:
    - If PD <= 0.5306: Large Acid-Lime badge `[ APPROVED FOR CREDIT ]` with green glow.
    - If PD > 0.5306: Large Hot-Coral badge `[ REJECTED: HIGH RISK ]` with warning icon.
  * Predicted Probability of Default (PD): e.g., "17.4%"
  * Risk Grade Pill: AAA (PD < 8%), AA (8-14%), A (14-20%), B (20-30%), C (30-45%), Subprime (>45%).
  * Top Risk Drivers (Horizontal bars indicating FICO benefit, DTI penalty, Inquiry penalty).

#### VIEW 7: MODEL GOVERNANCE & INTERVIEW DEFENSE
- Section A: SR 11-7 / Basel II Compliance Checklist
  * Population Drift: Train-to-Test PSI = 0.0033 (Status: PASSED, zero macro shift).
  * Protected Class Bias: Excluded state/zip_code to eliminate demographic proxies.
  * Ongoing Monitoring: Automatic retraining alert triggered if monthly PSI > 0.10 or KS drops below 25.0%.
- Section B: Interactive "Interview Defense" Flashcards
  * Flip-cards with brutalist borders:
    1. Trap: "Why not run LASSO / Random Forest feature selection on all 151 columns?"
       -> Counter: "Automated selectors pick target leakage (total_pymnt, last_fico). You must enforce a domain-first boundary."
    2. Trap: "Why drop 915,000 'Current' loans instead of labeling them 0?"
       -> Counter: "Right-censoring. Active loans haven't reached terminal outcomes; labeling them 0 creates survivorship bias."
    3. Trap: "Why exclude Lending Club Grade and Interest Rate?"
       -> Counter: "Grade and rate are platform underwriting outputs, not borrower traits. Using them is circular logic."
    4. Trap: "Why train on 2013-15 and test on 2016 instead of 2018?"
       -> Counter: "2018 is 88.6% active. Evaluating only resolved loans tests an unrepresentative sample of early prepayers and rapid crashes."

---

### 4. TECHNICAL EXECUTION DETAILS
- Framework: React (TypeScript) with Tailwind CSS, Lucide React icons, and Recharts.
- Use `backdrop-blur-md`, `border-2 border-black`, and `shadow-[4px_4px_0px_0px_#000]` extensively on all container cards.
- Ensure all charts, sliders, and form inputs are reactive, smoothly animated, and populated with the exact numerical values provided above.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://policy-engine-core.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/d6ed8d97-8622-4766-b9fc-3ec7e8482dea).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
