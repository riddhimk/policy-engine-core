export const stages = [
 {title:'Ingestion & audit',label:'RAW DATA',count:'2.26M raw loans',output:'1,026,436 mature-cohort loans',rationale:'Apply a domain-first leakage boundary. Only resolved outcomes from 2013–2016 enter the analytical population; active outcomes remain right-censored.',code:"raw = read_csv('accepted_loans.csv')\nresolved = raw[raw.loan_status.isin(terminal_statuses)]\ncohorts = resolved[resolved.issue_year.between(2013, 2016)]\nX = cohorts.drop(columns=target_leakage)"},
 {title:'SQL architecture',label:'DATA LAYER',count:'SQLite star schema',output:'635.32 → 367.84 ms',rationale:'Separate origination facts from borrower dimensions. B-tree indexing prunes issue-year reads; the reported indexed query is 1.73× faster.',code:'CREATE INDEX idx_loans_issue_year\nON fact_loans(issue_year);\nEXPLAIN QUERY PLAN\nSELECT issue_year, AVG(is_default)\nFROM fact_loans WHERE issue_year = 2016;'},
 {title:'Feature guardrails',label:'PREPROCESSING',count:'733k train / 293k test',output:'122 anomalous rows removed',rationale:'Learn caps, medians and encoders exclusively on the 2013–2015 training period. Apply frozen transformations to the 2016 holdout.',code:'train = loans[loans.issue_year < 2016]\ntest = loans[loans.issue_year == 2016]\ncaps = train[numeric].quantile(0.99)\npreprocessor.fit(train)\nX_test = preprocessor.transform(test)'},
 {title:'Decision-driven EDA',label:'RISK INSIGHTS',count:'7 analytical insights',output:'Monotonicity & missingness checks',rationale:'Use borrower-level patterns to defend feature transformations, not to tune on the test set. Employment missingness requires a separate indicator.',code:"train.groupby('fico_band').is_default.mean()\ntrain.groupby('purpose').is_default.mean()\ntrain['emp_length_missing'] = train.emp_length.isna()"},
 {title:'Model benchmarking',label:'PREDICTIVE CORE',count:'LogReg + HGB',output:'Primary OOT AUC: 0.7019',rationale:'Keep balanced logistic regression as the interpretable primary model. HistGradientBoosting is the nonlinear challenger; platform grade/rate is a quarantined benchmark.',code:"primary = LogisticRegression(class_weight='balanced')\nchallenger = HistGradientBoostingClassifier()\nprimary.fit(X_train, y_train)\nscore = primary.predict_proba(X_test)[:, 1]"},
 {title:'Policy optimization',label:'DECISION ENGINE',count:'θ = 0.5306',output:'70.0% approval · 16.43% default',rationale:'Select a score threshold using the reported volume/risk frontier. A balanced model output is not automatically a calibrated probability of default.',code:'approved = model_score <= 0.5306\napproval_rate = approved.mean()\nportfolio_default = y_test[approved].mean()\nscreened_defaults = y_test[~approved].sum() / y_test.sum()'},
 {title:'Live underwriting',label:'VALIDATION',count:'Tests & scoring',output:'Application → decision + drivers',rationale:'Validate input ranges and explain the direction of risk contributions. This interface uses illustrative weights, not the unavailable fitted production artifact.',code:'applicant = ApplicantSchema.parse(payload)\nscore, contributions = score_application(applicant)\ndecision = score <= policy_cutoff\nreturn decision, score, contributions'}
];
export const vintage = [
 {name:'2013',resolved:99.99,default:15.60,status:'Fully mature'}, {name:'2014',resolved:94.68,default:18.45,status:'Fully mature'}, {name:'2015',resolved:89.18,default:20.19,status:'Fully mature'}, {name:'2016',resolved:67.47,default:23.29,status:'Out-of-time test'}, {name:'2017',resolved:38.17,default:0,status:'Dropped · 61.8% active'}, {name:'2018',resolved:11.37,default:0,status:'Dropped · 88.6% active'}
];
export const models = [
 ['Primary: Balanced Logistic Regression','0.7019','0.4137','29.05%','0.2117','3.57s'],
 ['Challenger: HistGradientBoosting','0.7061','0.4162','29.58%','0.1601','8.73s'],
 ['Benchmark: LogReg with LC Grade & Rate','0.7113','0.4285','30.82%','0.2081','6.31s'],
 ['Baseline 2: Single Rule (FICO < 670)','0.5694','0.3014','13.88%','0.2520','0.01s'],
 ['Baseline 1: Majority Class Prior','0.5000','0.2328','0.00%','0.2328','0.01s']
];
export const defense = [
 ['Why not run LASSO / Random Forest feature selection on all 151 columns?','Automated selectors pick target leakage (total_pymnt, last_fico). You must enforce a domain-first boundary.'],
 ["Why drop 915,000 ‘Current’ loans instead of labeling them 0?","Right-censoring. Active loans haven’t reached terminal outcomes; labeling them 0 creates survivorship bias."],
 ['Why exclude Lending Club Grade and Interest Rate?','Grade and rate are platform underwriting outputs, not borrower traits. Using them is circular logic.'],
 ['Why train on 2013–15 and test on 2016 instead of 2018?','2018 is 88.6% active. Evaluating only resolved loans tests an unrepresentative sample of early prepayers and rapid crashes.']
];
export function pageMeta(title:string,description:string) { return {meta:[{title:`${title} | RiskOps`},{name:'description',content:description},{property:'og:title',content:`${title} | RiskOps`},{property:'og:description',content:description},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}; }
