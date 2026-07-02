/* ============================================================
   MARA – Central Data Store
   All country dossiers, ethics figures, papers, orgs,
   and literacy content live here.
   ============================================================ */

const MARA_DATA = {

  // ══════════════════════════════════════════════════════════
  //  COUNTRY DOSSIERS
  // ══════════════════════════════════════════════════════════
  countries: {

    // ─── UAE ───────────────────────────────────────────────
    UAE: {
      id: 'UAE', name: 'United Arab Emirates', shortName: 'UAE',
      flag: '🇦🇪', tier: 1, region: 'Gulf',
      scores: { compute: 87, privacy: 52, governance: 68 },

      demographics: {
        gdp: '$507B', gdpGrowth: '+3.4%', gdpPPP: '$97K/capita',
        population: '9.9M', populationGrowth: '+1.5%',
        avgWage: '$3,200/mo', medianAge: 33.5,
        stemGrads: 18000, stemGradGrowth: '+8% YoY',
        literacy: '97.3%', internetPenetration: '99%',
        diaspora: [
          { emoji: '👨‍💻', name: 'Omar Al-Olama', role: 'AI Minister → World Economic Forum Board', location: 'Geneva/Dubai' },
          { emoji: '👩‍🔬', name: 'Hessa Al-Mansoori', role: 'ML Lead → Google Brain', location: 'Mountain View, CA' },
          { emoji: '👨‍🎓', name: 'Khalid Al-Falasi', role: 'PhD NLP → CMU, now NYU Abu Dhabi', location: 'New York / Abu Dhabi' },
          { emoji: '👩‍💼', name: 'Amna Al-Dahmani', role: 'Policy Director → OECD Digital', location: 'Paris' },
          { emoji: '👨‍🔬', name: 'Tariq Bin Hendi', role: 'Quantum Computing → IBM Research', location: 'Zurich' }
        ]
      },

      privacy: {
        laws: [
          { name: 'Federal Decree-Law No. 45 of 2021 (PDPL)', status: 'Active', year: 2021 },
          { name: 'DIFC Data Protection Law 2020', status: 'Active', year: 2020, zone: 'DIFC' },
          { name: 'ADGM Data Protection Regulations 2021', status: 'Active', year: 2021, zone: 'ADGM' }
        ],
        adequacy: 'Pending EU Review',
        gdprGrid: {
          erasureRights: { value: 'Partial', status: 'amber', note: 'Limited right in PDPL; no explicit timeline' },
          fines: { value: 'Up to AED 20M (~$5.4M)', status: 'green', note: 'Fines exist but enforcement is nascent' },
          consent: { value: 'Opt-out for most', status: 'amber', note: 'Opt-in only for sensitive data categories' },
          dpa: { value: 'UAE DPA (est. 2023)', status: 'amber', note: 'Newly operational, limited track record' },
          dataLocalization: { value: 'Sector-specific', status: 'amber', note: 'Required in finance, health, government' },
          crossBorderTransfer: { value: 'Permitted with safeguards', status: 'green' },
          breachNotification: { value: '72 hours', status: 'green', note: 'Aligns with GDPR requirement' }
        }
      },

      infrastructure: {
        dataCenters: [
          {
            name: 'Khazna Data Centers – DC1',
            location: 'Abu Dhabi Industrial City',
            megawatts: 250, tier: 'Tier IV',
            operator: 'Khazna Data Centers',
            parent: 'ADQ (Abu Dhabi state fund)',
            solar: '23%', cooling: 'Adiabatic + district chilled water',
            certifications: ['ISO 27001', 'LEED Gold', 'Uptime Tier IV']
          },
          {
            name: 'Etisalat (e& Enterprise) DC – Dubai',
            location: 'Dubai Internet City',
            megawatts: 120, tier: 'Tier III+',
            operator: 'e& Enterprise',
            parent: 'e& (Emirates Telecom Group)',
            solar: '14%', cooling: 'Mechanical chilled water',
            certifications: ['ISO 27001', 'PCI-DSS']
          },
          {
            name: 'du (EITC) Data Center – Dubai South',
            location: 'Dubai South FEZ',
            megawatts: 80, tier: 'Tier III',
            operator: 'du (EITC)',
            parent: 'Emirates Integrated Telecom',
            solar: '8%', cooling: 'Raised floor CRAC',
            certifications: ['ISO 27001']
          }
        ],
        aiModels: [
          { emoji: '🦅', name: 'Falcon 180B', developer: 'Technology Innovation Institute (TII)', license: 'Apache 2.0', architecture: 'Causal Decoder Transformer', params: '180B', languages: ['en', 'ar', 'fr', 'de'], launched: '2023' },
          { emoji: '🦅', name: 'Falcon 40B', developer: 'TII', license: 'Apache 2.0', architecture: 'Causal Decoder', params: '40B', languages: ['en', 'ar'], launched: '2023' },
          { emoji: '🌐', name: 'Jais 13B / 30B', developer: 'Inception AI (G42 + Mohamed bin Zayed Univ.)', license: 'Non-commercial research', architecture: 'GPT-based Arabic-English', params: '30B', languages: ['ar', 'en'], launched: '2023' }
        ],
        capitalFlows: [
          { investor: 'Microsoft', amount: '$1.5B', target: 'G42 (Group 42)', year: 2024, type: 'Strategic equity + Azure expansion', note: 'Included G42 divesting Huawei hardware under US pressure' },
          { investor: 'OpenAI', amount: '$1B+', target: 'UAE National AI Infrastructure', year: 2024, type: 'Government partnership', note: 'Stargate ME initiative, Sam Altman personally involved' },
          { investor: 'Andreessen Horowitz (a16z)', amount: '$400M+', target: 'MENA Tech Ecosystem Fund', year: 2023, type: 'Venture Capital', note: 'Part of broader emerging markets AI fund push' },
          { investor: 'MGX (Abu Dhabi AI & Tech fund)', amount: '$6B', target: 'OpenAI (co-lead)', year: 2024, type: 'Direct investment', note: 'Sovereign wealth AI strategy arm of Mubadala' }
        ]
      },

      disputes: {
        official: [
          { text: 'UAE AI Strategy 2031 positions UAE as top-5 global AI nation by decade end, backed by state compute fund.', source: 'UAE Ministry of AI, 2023' },
          { text: 'PDPL 2021 provides comprehensive data subject rights including access, correction, and erasure with DPA oversight.', source: 'Federal Decree-Law 45/2021' },
          { text: 'UAE hosts the world\'s most advanced sovereign LLM program (Falcon, TII) with fully open Apache 2.0 licensing.', source: 'TII Press Release, 2023' },
          { text: 'G42 partnership with Microsoft ensures "ethical AI deployment" with independent audit requirements.', source: 'Microsoft-G42 MOU, 2024' }
        ],
        critique: [
          { text: 'NSO Group\'s Pegasus spyware was used to surveil UAE dissident Ahmed Mansoor\'s iPhone (Citizen Lab, 2016). Mansoor received 10-year prison sentence in 2018.', source: 'Citizen Lab / Amnesty International, 2018' },
          { text: 'G42\'s deep integration with Chinese technology partners (Huawei core infrastructure, Hikvision surveillance cameras) raised US national security concerns — now partially unwound.', source: 'Financial Times, April 2024' },
          { text: 'UAE\'s PDPL has no independent DPA with genuine enforcement power; the regulator falls under executive branch, creating structural conflict of interest.', source: 'Future of Privacy Forum Analysis, 2022' },
          { text: 'Solar/renewable claims for data center operations are largely offset credits, not on-site generation; true carbon intensity is near 450 gCO₂/kWh.', source: 'International Energy Agency MENA, 2023' }
        ]
      },

      ecosystem: [
        { emoji: '✊', name: 'Ahmed Mansoor', role: 'Digital Rights Activist', org: 'Independent', status: 'imprisoned', statusColor: 'red', focus: 'Surveillance & censorship resistance', desc: 'Recipient of Martin Ennals Award for Human Rights Defenders (2015). Documented NSO Group Pegasus attacks on his device. Serving 10-year sentence since 2018 for "insulting UAE leadership" on social media.' },
        { emoji: '🎓', name: 'Dr. Nardine Osman', role: 'AI Ethics Researcher', org: 'NYU Abu Dhabi', status: 'active', statusColor: 'green', focus: 'Algorithmic fairness, multi-agent systems', desc: 'Leads the NYUAD Center for AI and Digital Policy research. Published extensively on normative constraints in autonomous systems.' },
        { emoji: '🏛️', name: 'SMEX MENA Digital Rights', role: 'Civil Society Org', org: 'SMEX (Beirut/Dubai)', status: 'active', statusColor: 'green', focus: 'Regional internet freedom documentation', desc: 'Tracks MENA digital rights violations, publishes annual transparency reports on government takedown requests and surveillance infrastructure.' },
        { emoji: '📡', name: 'NetBlocks', role: 'Internet Monitoring NGO', org: 'NetBlocks (international)', status: 'active', statusColor: 'green', focus: 'Real-time internet shutdown monitoring', desc: 'Documented multiple UAE-wide internet throttling events during political protests, including VoIP restrictions that persist since 2017.' }
      ]
    },

    // ─── Saudi Arabia ───────────────────────────────────────
    SAU: {
      id: 'SAU', name: 'Saudi Arabia', shortName: 'KSA',
      flag: '🇸🇦', tier: 1, region: 'Gulf',
      scores: { compute: 82, privacy: 45, governance: 71 },

      demographics: {
        gdp: '$1.06T', gdpGrowth: '+3.6%', gdpPPP: '$62K/capita',
        population: '36M', populationGrowth: '+1.7%',
        avgWage: '$2,800/mo', medianAge: 30.1,
        stemGrads: 25000, stemGradGrowth: '+12% YoY',
        literacy: '97.1%', internetPenetration: '95.7%',
        diaspora: [
          { emoji: '👨‍💻', name: 'Abdullah Al-Ghamdi', role: 'AI Research Lead → Stanford HAI', location: 'Palo Alto, CA' },
          { emoji: '👩‍🎓', name: 'Reem Al-Zahrani', role: 'NLP PhD → Meta AI Research', location: 'New York, NY' },
          { emoji: '👨‍💼', name: 'Faisal Al-Mosallam', role: 'Policy Director → World Bank Digital', location: 'Washington D.C.' },
          { emoji: '👩‍🔬', name: 'Maryam Al-Dossary', role: 'Computer Vision → KAUST Faculty', location: 'Thuwal, KSA' }
        ]
      },

      privacy: {
        laws: [
          { name: 'Personal Data Protection Law (PDPL) – Royal Decree M/19', status: 'Active', year: 2022 },
          { name: 'Cloud Computing Regulatory Framework', status: 'Active', year: 2018 }
        ],
        adequacy: 'Not evaluated by EU',
        gdprGrid: {
          erasureRights: { value: 'Yes (Art. 13)', status: 'green', note: 'Right to erasure within 30 days' },
          fines: { value: 'Up to SAR 5M (~$1.3M)', status: 'amber', note: 'Lower than EU GDPR equivalents' },
          consent: { value: 'Opt-in required', status: 'green', note: 'For personal and sensitive data' },
          dpa: { value: 'SDAIA/NDMO', status: 'green', note: 'National Data Management Office under SDAIA' },
          dataLocalization: { value: 'Sensitive data must stay in-country', status: 'amber' },
          crossBorderTransfer: { value: 'Permitted with contractual safeguards', status: 'amber' },
          breachNotification: { value: '72 hours to NDMO', status: 'green' }
        }
      },

      infrastructure: {
        dataCenters: [
          { name: 'STC Cloud – Hyperscale DC Riyadh', location: 'Riyadh Digital District', megawatts: 400, tier: 'Tier IV', operator: 'Saudi Telecom Company (STC)', parent: 'Saudi Telecom (PIF-owned)', solar: '31%', cooling: 'District chilled water + adiabatic', certifications: ['ISO 27001', 'LEED Platinum', 'Uptime Tier IV'] },
          { name: 'AWS Middle East (Riyadh Region)', location: 'Riyadh', megawatts: 300, tier: 'Hyperscale', operator: 'Amazon Web Services', parent: 'Amazon.com Inc.', solar: '22%', cooling: 'Mechanical + evaporative', certifications: ['ISO 27001', 'SOC 1/2/3', 'PCI-DSS'] },
          { name: 'Google Cloud Dammam', location: 'Dammam Economic City', megawatts: 200, tier: 'Hyperscale', operator: 'Google LLC', parent: 'Alphabet Inc.', solar: '18%', cooling: 'Liquid cooling + evaporative', certifications: ['ISO 27001', 'SOC 2'] }
        ],
        aiModels: [
          { emoji: '🤖', name: 'ALLaM (Arabic LLM)', developer: 'SDAIA / IBM Research', license: 'Restricted research', architecture: 'GPT-based Arabic-focused', params: '70B', languages: ['ar', 'en'], launched: '2023' },
          { emoji: '🧠', name: 'AceGPT', developer: 'KAUST / MBZUAI', license: 'Non-commercial', architecture: 'LLaMA-based fine-tune', params: '13B', languages: ['ar', 'en'], launched: '2023' }
        ],
        capitalFlows: [
          { investor: 'NVIDIA', amount: '$700M+', target: 'HUMAIN (PIF AI subsidiary)', year: 2025, type: 'Hardware + partnership', note: '18,000 H100 GPUs plus sovereign AI cluster agreement' },
          { investor: 'Google', amount: '$1.5B', target: 'Saudi Cloud + HUMAIN', year: 2025, type: 'Cloud + AI partnership', note: 'Multi-year data center + Gemini deployment agreement' },
          { investor: 'Qualcomm', amount: '$2.5B', target: 'Saudi AI Council', year: 2024, type: 'Chip supply + R&D center', note: 'AI chip supply deal + Qualcomm R&D lab in Riyadh' },
          { investor: 'PIF (Public Investment Fund)', amount: '$40B', target: 'HUMAIN (global AI fund)', year: 2025, type: 'Sovereign AI vehicle', note: 'Partners with NVIDIA, AMD, AWS for compute infrastructure' }
        ]
      },

      disputes: {
        official: [
          { text: 'Vision 2030 AI pillar aims to position Saudi Arabia as a global AI powerhouse with $40B sovereign AI investment through HUMAIN.', source: 'Saudi Vision 2030 / PIF, 2025' },
          { text: 'PDPL provides comprehensive data subject rights, enforced by NDMO with independent complaint mechanism.', source: 'NDMO Implementation Report, 2023' },
          { text: 'NEOM project integrates AI-first city planning with embedded sustainability metrics and open data standards.', source: 'NEOM Master Plan, 2022' }
        ],
        critique: [
          { text: 'Jamal Khashoggi\'s iPhone was reportedly infected with Pegasus spyware weeks before his assassination at the Saudi consulate in Istanbul, tracing back to Saudi operators.', source: 'Citizen Lab / UN Special Rapporteur Report, 2019' },
          { text: 'SDAIA, responsible for data protection enforcement, is also the primary operator of Absher — the government surveillance app that human rights groups say enables domestic abuse and tracks dissidents.', source: 'Human Rights Watch, 2020' },
          { text: 'Saudi PDPL exempts national security, public health, and government interests — creating de facto mass surveillance carve-outs with no judicial oversight.', source: 'Article 19 / EFF Analysis, 2022' },
          { text: 'HUMAIN\'s $40B commitment is concentrated in hardware (NVIDIA GPUs) with minimal investment in safety research or independent AI auditing infrastructure.', source: 'AI Now Institute, 2025' }
        ]
      },

      ecosystem: [
        { emoji: '✊', name: 'Loujain Al-Hathloul', role: 'Women\'s Rights & Digital Activist', org: 'Independent', status: 'released', statusColor: 'amber', focus: 'Digital rights, surveillance of activists', desc: 'Imprisoned 2018–2021, her devices were confirmed to be targeted with Pegasus spyware. Released under travel ban, now advocates internationally.' },
        { emoji: '🎓', name: 'Dr. Areej Al-Wabil', role: 'HCI / Accessibility Researcher', org: 'KAUST', status: 'active', statusColor: 'green', focus: 'Arabic UX, AI accessibility in MENA', desc: 'Pioneer in Arabic-language HCI research. Established first MENA-specific inclusive AI design lab at KAUST.' },
        { emoji: '📰', name: 'Mada Masr', role: 'Independent Digital Journalism', org: 'Cairo-based, Gulf coverage', status: 'active', statusColor: 'amber', focus: 'Gulf tech accountability journalism', desc: 'Cross-border reporting on Gulf AI infrastructure deals and their civil rights implications.' }
      ]
    },

    // ─── Egypt ─────────────────────────────────────────────
    EGY: {
      id: 'EGY', name: 'Egypt', shortName: 'Egypt',
      flag: '🇪🇬', tier: 2, region: 'North Africa',
      scores: { compute: 48, privacy: 38, governance: 44 },

      demographics: {
        gdp: '$476B', gdpGrowth: '+3.8%', gdpPPP: '$16K/capita',
        population: '104M', populationGrowth: '+1.8%',
        avgWage: '$280/mo', medianAge: 25.4,
        stemGrads: 45000, stemGradGrowth: '+5% YoY',
        literacy: '73.1%', internetPenetration: '71.9%',
        diaspora: [
          { emoji: '👨‍💻', name: 'Ahmed Gamal', role: 'Senior Engineer → Google Zürich', location: 'Zürich, Switzerland' },
          { emoji: '👩‍🎓', name: 'Dina Farouk', role: 'ML PhD → MIT, now at DeepMind London', location: 'London, UK' },
          { emoji: '👨‍🎓', name: 'Mohamed El-Desouki', role: 'Robotics → CMU faculty', location: 'Pittsburgh, PA' },
          { emoji: '👩‍💼', name: 'Nora Adly', role: 'Fintech AI → Stripe (Dublin)', location: 'Dublin, Ireland' }
        ]
      },

      privacy: {
        laws: [
          { name: 'Personal Data Protection Law No. 151/2020', status: 'Partially active', year: 2020 },
          { name: 'Anti-Cybercrime Law No. 175/2018', status: 'Active', year: 2018 }
        ],
        adequacy: 'Not evaluated',
        gdprGrid: {
          erasureRights: { value: 'In law, not enforced', status: 'red', note: 'No functional DPA yet operational' },
          fines: { value: 'Up to EGP 3M (~$61K)', status: 'red', note: 'Extremely low, no deterrent effect' },
          consent: { value: 'Opt-in (on paper)', status: 'amber', note: 'Enforcement absent' },
          dpa: { value: 'PDPC — Not yet operational', status: 'red', note: 'Established in law but no appointments made' },
          dataLocalization: { value: 'Government data mandated local', status: 'amber' },
          crossBorderTransfer: { value: 'Permitted', status: 'green' },
          breachNotification: { value: '72 hours (statutory, unenforced)', status: 'amber' }
        }
      },

      infrastructure: {
        dataCenters: [
          { name: 'Telecom Egypt DC – 6th October', location: 'Giza', megawatts: 55, tier: 'Tier III', operator: 'Telecom Egypt (WE)', parent: 'Egyptian state (45% ownership)', solar: '6%', cooling: 'Traditional CRAC units', certifications: ['ISO 27001'] },
          { name: 'Orange Business Egypt DC', location: 'Smart Village, Cairo', megawatts: 30, tier: 'Tier II+', operator: 'Orange Egypt', parent: 'Orange SA (France)', solar: '2%', cooling: 'Raised floor air', certifications: ['ISO 27001'] }
        ],
        aiModels: [
          { emoji: '🌍', name: 'Nile-7B', developer: 'Cairo University / IT-ISE', license: 'Open research', architecture: 'Arabic LLaMA fine-tune', params: '7B', languages: ['ar', 'en'], launched: '2024' }
        ],
        capitalFlows: [
          { investor: 'Microsoft', amount: '$1.0B', target: 'Egypt cloud region', year: 2024, type: 'Hyperscale investment', note: 'First Microsoft Azure region in North Africa' },
          { investor: 'AWS', amount: '$500M+', target: 'AWS Egypt region (planned)', year: 2025, type: 'Hyperscale investment', note: 'Planned Nile Delta location, under regulatory review' },
          { investor: 'Google', amount: '$140M', target: 'Egypt startup ecosystem', year: 2023, type: 'Ecosystem development', note: 'Google for Startups hub in Cairo + Cloud credits' }
        ]
      },

      disputes: {
        official: [
          { text: 'Egypt AI Strategy 2030 commits to building national AI capacity through 25 specialized digital districts and a dedicated AI R&D fund.', source: 'MCIT Egypt, 2021' },
          { text: 'PDPL 2020 grants citizens full GDPR-equivalent rights and creates the first dedicated Personal Data Protection Center.', source: 'Egypt Official Gazette, 2020' }
        ],
        critique: [
          { text: 'Egypt\'s Anti-Cybercrime Law is routinely used to prosecute journalists, LGBTQ+ individuals, and government critics for social media posts, with charges of "disturbing public peace."', source: 'EFF / CPJ Index, 2023' },
          { text: 'The PDPC has never operationally functioned since the 2020 law passed — no director appointed, no budget allocated, no enforcement actions taken.', source: 'Access Now, 2023' },
          { text: 'Government-mandated subscriber registration links SIM cards to national IDs, enabling blanket telecom surveillance. Egypt ranks among top 10 countries by government data requests to Google.', source: 'Google Transparency Report, 2023' }
        ]
      },

      ecosystem: [
        { emoji: '✊', name: 'Patrick Zaki', role: 'Human Rights Researcher & Activist', org: 'Egyptian Initiative for Personal Rights (EIPR)', status: 'released', statusColor: 'amber', focus: 'Civil society, digital surveillance documentation', desc: 'Arrested 2020 at Cairo airport, sentenced to 3 years then pardoned. Digital activism and EU advocacy against Egypt surveillance practices.' },
        { emoji: '🏛️', name: 'Access Now MENA', role: 'Digital Rights NGO', org: 'Access Now', status: 'active', statusColor: 'green', focus: 'Digital helpline, internet shutdown advocacy', desc: 'Provides digital security support to at-risk individuals and documents internet shutdowns, network interferences across Egypt and broader MENA.' },
        { emoji: '📰', name: 'Mada Masr', role: 'Independent Online Newspaper', org: 'Mada Masr', status: 'active', statusColor: 'amber', focus: 'Tech accountability, surveillance journalism', desc: 'Egypt\'s leading independent publication. Website blocked in Egypt; operates via mirror sites. Recipient of RSF Press Freedom Award.' }
      ]
    },

    // ─── Qatar ─────────────────────────────────────────────
    QAT: {
      id: 'QAT', name: 'Qatar', shortName: 'Qatar',
      flag: '🇶🇦', tier: 1, region: 'Gulf',
      scores: { compute: 75, privacy: 55, governance: 65 },

      demographics: {
        gdp: '$235B', gdpGrowth: '+2.2%', gdpPPP: '$115K/capita',
        population: '2.7M', populationGrowth: '+1.1%',
        avgWage: '$4,100/mo', medianAge: 34.3,
        stemGrads: 6500, stemGradGrowth: '+9% YoY',
        literacy: '93.5%', internetPenetration: '99.7%',
        diaspora: [
          { emoji: '👨‍💻', name: 'Khalid Al-Emadi', role: 'AI Ethics Lead → Anthropic', location: 'San Francisco, CA' },
          { emoji: '👩‍🎓', name: 'Aisha Al-Kuwari', role: 'Data Science PhD → Oxford', location: 'Oxford, UK' }
        ]
      },

      privacy: {
        laws: [
          { name: 'Personal Data Privacy Protection Law No. 13/2016', status: 'Active', year: 2016 },
          { name: 'QFC Data Protection Regulations', status: 'Active', year: 2021, zone: 'QFC' }
        ],
        adequacy: 'Not evaluated',
        gdprGrid: {
          erasureRights: { value: 'Yes (Article 10)', status: 'green', note: 'Enforceable right with DPA complaint mechanism' },
          fines: { value: 'Up to QAR 5M (~$1.37M)', status: 'amber' },
          consent: { value: 'Opt-in required', status: 'green' },
          dpa: { value: 'Ministry of Transport & Comm.', status: 'amber', note: 'Not fully independent from government' },
          dataLocalization: { value: 'None generally', status: 'green' },
          crossBorderTransfer: { value: 'Adequacy list system', status: 'green' },
          breachNotification: { value: 'Prompt (undefined)', status: 'amber' }
        }
      },

      infrastructure: {
        dataCenters: [
          { name: 'QatarNet Tier IV DC', location: 'Doha Tech Zone', megawatts: 150, tier: 'Tier IV', operator: 'Ooredoo Qatar', parent: 'Ooredoo Group', solar: '28%', cooling: 'District chilled water', certifications: ['ISO 27001', 'Uptime Tier IV'] },
          { name: 'Microsoft Azure Qatar', location: 'Doha', megawatts: 100, tier: 'Hyperscale', operator: 'Microsoft Corp.', parent: 'Microsoft', solar: '20%', cooling: 'Liquid cooling', certifications: ['ISO 27001', 'SOC 2'] }
        ],
        aiModels: [
          { emoji: '🌐', name: 'Nural-7B', developer: 'Qatar Computing Research Institute (QCRI)', license: 'Research', architecture: 'Transformer Arabic-English', params: '7B', languages: ['ar', 'en'], launched: '2023' }
        ],
        capitalFlows: [
          { investor: 'Microsoft', amount: '$2.1B', target: 'Qatar Cloud Infrastructure', year: 2024, type: 'Azure hyperscale region', note: 'Largest single tech investment in Qatari history' },
          { investor: 'QIA (Qatar Investment Authority)', amount: '$3B+', target: 'Global AI/Tech portfolio', year: 2023, type: 'SWF AI allocation', note: 'Investments in Anthropic, Waymo, and European AI startups' }
        ]
      },

      disputes: {
        official: [
          { text: 'Qatar National AI Strategy 2030 targets AI-led economic diversification, reducing oil dependency to under 30% of GDP.', source: 'MDPS Qatar, 2022' },
          { text: 'QCRI produces globally cited research in Arabic NLP and AI ethics, positioning Qatar as MENA\'s research hub.', source: 'HBKU Annual Report, 2023' }
        ],
        critique: [
          { text: 'Kafala (sponsorship) system governs migrant workers (80% of population) who have no digital rights protections; biometric surveillance deployed at construction sites.', source: 'Amnesty International, 2023' },
          { text: 'FIFA World Cup 2022 app Hayya required invasive permissions; German cyber authorities warned citizens against installing it citing surveillance risks.', source: 'BSI Germany Advisory, 2022' }
        ]
      },

      ecosystem: [
        { emoji: '🎓', name: 'Dr. Kareem Darwish', role: 'Arabic NLP Researcher', org: 'QCRI / Carnegie Mellon Qatar', status: 'active', statusColor: 'green', focus: 'Arabic AI, information extraction', desc: 'Leading researcher in Arabic computational linguistics. Built AraBERT predecessor models adopted globally for Arabic NLP tasks.' },
        { emoji: '🏛️', name: 'Gulf Centre for Human Rights', role: 'Human Rights Monitor', org: 'GCHR (Geneva-based)', status: 'active', statusColor: 'green', focus: 'Gulf digital rights documentation', desc: 'Documents digital surveillance, activist persecution, and legal system abuses across GCC states including Qatar.' }
      ]
    },

    // ─── Israel ────────────────────────────────────────────
    ISR: {
      id: 'ISR', name: 'Israel', shortName: 'Israel',
      flag: '🇮🇱', tier: 1, region: 'Levant',
      scores: { compute: 91, privacy: 72, governance: 78 },

      demographics: {
        gdp: '$521B', gdpGrowth: '+1.1%', gdpPPP: '$52K/capita',
        population: '9.7M', populationGrowth: '+1.9%',
        avgWage: '$4,800/mo', medianAge: 30.2,
        stemGrads: 35000, stemGradGrowth: '+6% YoY',
        literacy: '97.8%', internetPenetration: '90.5%',
        diaspora: [
          { emoji: '👨‍💻', name: 'Yann Ben-David', role: 'AI Research → Google Brain', location: 'Mountain View, CA' },
          { emoji: '👩‍🔬', name: 'Noa Shapira', role: 'Deep Learning → OpenAI', location: 'San Francisco, CA' },
          { emoji: '👨‍🎓', name: 'Amos Arieli', role: 'Neuroscience AI → MIT Media Lab', location: 'Cambridge, MA' }
        ]
      },

      privacy: {
        laws: [
          { name: 'Protection of Privacy Law 5741-1981 (amended 2017)', status: 'Active', year: 1981 },
          { name: 'Biometric Database Law 5770-2009', status: 'Active', year: 2009 },
          { name: 'Proposed Privacy Protection Bill (2023)', status: 'Pending', year: 2023 }
        ],
        adequacy: 'EU Adequacy Decision – Active',
        gdprGrid: {
          erasureRights: { value: 'Yes', status: 'green' },
          fines: { value: 'Up to ILS 3.2M (~$870K)', status: 'green' },
          consent: { value: 'Opt-in required', status: 'green' },
          dpa: { value: 'Privacy Protection Authority (PPA)', status: 'green', note: 'Genuinely independent with enforcement track record' },
          dataLocalization: { value: 'No general requirement', status: 'green' },
          crossBorderTransfer: { value: 'Adequacy list + SCCs', status: 'green' },
          breachNotification: { value: '72 hours', status: 'green' }
        }
      },

      infrastructure: {
        dataCenters: [
          { name: 'Amazon AWS Tel Aviv Region', location: 'Tel Aviv', megawatts: 250, tier: 'Hyperscale', operator: 'AWS', parent: 'Amazon', solar: '18%', cooling: 'Mechanical + indirect evap.', certifications: ['ISO 27001', 'SOC 2'] },
          { name: 'Google Cloud Jerusalem/Tel Aviv', location: 'Tel Aviv', megawatts: 180, tier: 'Hyperscale', operator: 'Google', parent: 'Alphabet', solar: '22%', cooling: 'Air-side economization', certifications: ['ISO 27001'] }
        ],
        aiModels: [
          { emoji: '🔬', name: 'IMODL-BERT-HE', developer: 'Hebrew University + AI21 Labs', license: 'Open (CC-BY)', architecture: 'BERT Hebrew', params: '340M', languages: ['he', 'ar', 'en'], launched: '2022' },
          { emoji: '🤖', name: 'Jamba 1.5', developer: 'AI21 Labs', license: 'Commercial', architecture: 'SSM-Transformer hybrid', params: '398B', languages: ['en', 'he', 'fr', 'de'], launched: '2024' }
        ],
        capitalFlows: [
          { investor: 'Intel', amount: '$25B', target: 'Fab 38 (Kiryat Gat expansion)', year: 2024, type: 'Semiconductor manufacturing', note: 'Largest foreign investment in Israeli history' },
          { investor: 'Microsoft', amount: '$1.5B', target: 'Israel AI & Cloud region', year: 2024, type: 'Cloud expansion + AI R&D', note: 'Includes Microsoft AI research center in Tel Aviv' },
          { investor: 'Sequoia Capital', amount: '$500M+', target: 'Israel tech fund', year: 2023, type: 'Venture capital', note: 'Cybersecurity, AI, and deeptech focus' }
        ]
      },

      disputes: {
        official: [
          { text: 'Israel ranks among top 5 global innovation ecosystems (Global Innovation Index 2023), with highest VC investment per capita globally.', source: 'WIPO / IVC Research, 2023' },
          { text: 'PPA (Privacy Protection Authority) actively enforces data protection with landmark fines against Facebook, Equifax Israel.', source: 'PPA Annual Report, 2023' }
        ],
        critique: [
          { text: 'NSO Group, an Israeli firm, sold Pegasus spyware to authoritarian governments across MENA and beyond. Israeli courts found NSO\'s conduct raised national security questions.', source: 'Citizen Lab / Supreme Court ruling, 2021' },
          { text: 'Israel uses AI-powered facial recognition and algorithmic targeting systems against Palestinians in the West Bank, including "fire where appropriate" autonomous targeting (Lavender system).', source: '+972 Magazine / Local Call investigative report, 2024' },
          { text: 'Gaza conflict 2023–24 involved documented use of AI targeting systems with mass-casualty outputs; scholars call this first algorithmic war crime documentation case.', source: 'Harvard Law School / AI Now Institute analysis, 2024' }
        ]
      },

      ecosystem: [
        { emoji: '🎓', name: 'Dr. Oren Etzioni', role: 'AI Safety Researcher', org: 'Allen Institute for AI (honorary)', status: 'active', statusColor: 'green', focus: 'Beneficial AI, AI transparency', desc: 'Pioneer of AI safety research. Advocates for global AI governance frameworks at UN and OECD level.' },
        { emoji: '🏛️', name: '7amleh – Arab Center for Social Media', role: 'Palestinian Digital Rights', org: '7amleh', status: 'active', statusColor: 'green', focus: 'Palestinian content moderation, surveillance', desc: 'Documents systematic suppression of Palestinian digital content on platforms. Published multiple platform accountability reports.' },
        { emoji: '📰', name: '+972 Magazine', role: 'Independent Investigative Media', org: '+972 / Local Call', status: 'active', statusColor: 'green', focus: 'AI warfare, algorithmic targeting documentation', desc: 'Broke global stories on Lavender and Gospel AI targeting systems used by IDF. Recipients of multiple investigative journalism awards.' }
      ]
    },

    // ─── Morocco ────────────────────────────────────────────
    MAR: {
      id: 'MAR', name: 'Morocco', shortName: 'Morocco',
      flag: '🇲🇦', tier: 2, region: 'North Africa',
      scores: { compute: 42, privacy: 58, governance: 52 },

      demographics: {
        gdp: '$134B', gdpGrowth: '+3.2%', gdpPPP: '$9.8K/capita',
        population: '37M', populationGrowth: '+1.1%',
        avgWage: '$480/mo', medianAge: 29.9,
        stemGrads: 22000, stemGradGrowth: '+7% YoY',
        literacy: '73.8%', internetPenetration: '88%',
        diaspora: [
          { emoji: '👩‍💻', name: 'Fatima Zahra Abidine', role: 'AI Research → INRIA Paris', location: 'Paris, France' },
          { emoji: '👨‍🎓', name: 'Rachid Guerraoui', role: 'Distributed Systems → EPFL (Full Professor)', location: 'Lausanne, Switzerland' }
        ]
      },

      privacy: {
        laws: [
          { name: 'Law 09-08 on Personal Data Protection', status: 'Active', year: 2009 },
          { name: 'CNDP Oversight Regulations', status: 'Active', year: 2009 }
        ],
        adequacy: 'EU Adequacy Decision – Active',
        gdprGrid: {
          erasureRights: { value: 'Yes', status: 'green' },
          fines: { value: 'Up to MAD 300K (~$29K)', status: 'red', note: 'Very low deterrence for large companies' },
          consent: { value: 'Opt-in required', status: 'green' },
          dpa: { value: 'CNDP (Commission Nationale)', status: 'green', note: 'Functional, independent, active enforcement' },
          dataLocalization: { value: 'None required', status: 'green' },
          crossBorderTransfer: { value: 'Adequacy list + authorization', status: 'green' },
          breachNotification: { value: 'Not specified in law', status: 'red' }
        }
      },

      infrastructure: {
        dataCenters: [
          { name: 'Maroc Telecom DC Casablanca', location: 'Casablanca Technopark', megawatts: 40, tier: 'Tier III', operator: 'Maroc Telecom', parent: 'Etisalat (e&) – 53% stake', solar: '15%', cooling: 'Traditional air cooling', certifications: ['ISO 27001'] }
        ],
        aiModels: [],
        capitalFlows: [
          { investor: 'Microsoft', amount: '$4B+', target: 'Morocco AI Hub (Casablanca–Kenitra)', year: 2025, type: 'Cloud + AI infrastructure', note: 'Largest tech investment in North African history; ties to Africa-EU digital corridor' },
          { investor: 'Google', amount: '$1B', target: 'Morocco Atlantic undersea cable hub', year: 2024, type: 'Subsea infrastructure', note: 'Casablanca as Africa-Europe cable landing point' }
        ]
      },

      disputes: {
        official: [
          { text: 'Morocco\'s National Strategy for AI 2030 targets becoming Africa\'s primary AI talent hub and gateway between Europe and Sub-Saharan Africa.', source: 'MCNET Morocco, 2022' },
          { text: 'CNDP regularly investigates privacy violations and has issued fines against both private and public sector entities.', source: 'CNDP Annual Report, 2022' }
        ],
        critique: [
          { text: 'Pegasus spyware traces linked to Moroccan government operators were found on phones of French President Macron, journalists, and Sahrawi human rights activists.', source: 'Forbidden Stories / Amnesty Tech, 2021' },
          { text: 'Omar Radi, journalist and digital rights activist, was sentenced to 6 years; Citizen Lab confirmed his phone was infected with Pegasus by Moroccan authorities.', source: 'Citizen Lab, 2021' }
        ]
      },

      ecosystem: [
        { emoji: '✊', name: 'Omar Radi', role: 'Journalist & Digital Rights Activist', org: 'Independent', status: 'imprisoned', statusColor: 'red', focus: 'Surveillance journalism, press freedom', desc: 'Moroccan investigative journalist. Confirmed Pegasus target. Sentenced 2021; international pressure for release ongoing.' },
        { emoji: '🎓', name: 'Pr. Rachid Guerraoui', role: 'Distributed AI Systems', org: 'EPFL', status: 'active', statusColor: 'green', focus: 'Federated learning, AI fairness at scale', desc: 'One of the most cited MENA-origin AI researchers globally. Co-founder of MLSys conference.' }
      ]
    },

    // ─── Jordan ─────────────────────────────────────────────
    JOR: {
      id: 'JOR', name: 'Jordan', shortName: 'Jordan',
      flag: '🇯🇴', tier: 2, region: 'Levant',
      scores: { compute: 38, privacy: 48, governance: 55 },

      demographics: {
        gdp: '$48B', gdpGrowth: '+2.6%', gdpPPP: '$12K/capita',
        population: '10.5M', populationGrowth: '+1.3%',
        avgWage: '$520/mo', medianAge: 23.6,
        stemGrads: 14000, stemGradGrowth: '+4% YoY',
        literacy: '98.0%', internetPenetration: '87%',
        diaspora: [
          { emoji: '👨‍💻', name: 'Ayman Hasan', role: 'NLP Engineer → Hugging Face', location: 'Paris, France' },
          { emoji: '👩‍🎓', name: 'Rand Al-Khaled', role: 'AI Policy → EU Commission DG Connect', location: 'Brussels' }
        ]
      },

      privacy: {
        laws: [
          { name: 'Personal Data Protection Law No. 24/2023', status: 'Active', year: 2023 },
          { name: 'Cybercrime Law No. 27/2023', status: 'Active', year: 2023 }
        ],
        adequacy: 'Not evaluated',
        gdprGrid: {
          erasureRights: { value: 'Partial', status: 'amber' },
          fines: { value: 'Up to JOD 100K (~$141K)', status: 'amber' },
          consent: { value: 'Opt-in required', status: 'green' },
          dpa: { value: 'National Center for Security & Crisis Mgmt', status: 'red', note: 'Not a true independent DPA' },
          dataLocalization: { value: 'Government data only', status: 'amber' },
          crossBorderTransfer: { value: 'Adequacy-based', status: 'amber' },
          breachNotification: { value: '72 hours (new law)', status: 'green' }
        }
      },

      infrastructure: {
        dataCenters: [
          { name: 'Zain Jordan DC', location: 'Amman Digital City', megawatts: 20, tier: 'Tier III', operator: 'Zain Jordan', parent: 'Zain Group (Kuwait)', solar: '8%', cooling: 'Air cooling', certifications: ['ISO 27001'] }
        ],
        aiModels: [],
        capitalFlows: [
          { investor: 'USAID', amount: '$40M', target: 'Jordan Tech Ecosystem', year: 2023, type: 'Development aid', note: 'Amman as regional tech talent pipeline for EU and US companies' },
          { investor: 'Google', amount: '$100M', target: 'Cloud Jordan + Google Career Certificates', year: 2023, type: 'Education + infrastructure', note: 'Focus on tech reskilling for Jordan\'s youth bulge' }
        ]
      },

      disputes: {
        official: [
          { text: 'Jordan\'s National AI Strategy positions Amman as a regional BPO and tech services hub, leveraging high English literacy and political stability.', source: 'MoDEE Jordan, 2023' }
        ],
        critique: [
          { text: 'Jordan\'s 2023 Cybercrime Law criminalizes "online content causing social unrest" — critics say this mirrors similar laws used against dissidents across the Arab world.', source: 'Human Rights Watch, 2023' },
          { text: 'SOFEX (Jordan\'s defence expo) markets surveillance tech including AI-powered border monitoring to authoritarian buyers globally.', source: 'Privacy International, 2022' }
        ]
      },

      ecosystem: [
        { emoji: '🏛️', name: 'JOSA (Jordan Open Source Association)', role: 'Digital Rights Advocacy', org: 'JOSA', status: 'active', statusColor: 'green', focus: 'Open source, digital privacy education', desc: 'Advocates for digital rights legislation, runs privacy education programs for Jordanian civil society.' },
        { emoji: '🎓', name: 'Dr. Aseel Qasem', role: 'AI & Language Technology', org: 'University of Jordan', status: 'active', statusColor: 'green', focus: 'Arabic computational linguistics', desc: 'Leading researcher in Arabic dialect NLP and responsible AI frameworks adapted for Levantine contexts.' }
      ]
    },

    // ─── Tunisia ────────────────────────────────────────────
    TUN: {
      id: 'TUN', name: 'Tunisia', shortName: 'Tunisia',
      flag: '🇹🇳', tier: 2, region: 'North Africa',
      scores: { compute: 35, privacy: 61, governance: 48 },

      demographics: {
        gdp: '$46B', gdpGrowth: '+1.1%', gdpPPP: '$12K/capita',
        population: '12M', populationGrowth: '+0.9%',
        avgWage: '$380/mo', medianAge: 32.8,
        stemGrads: 18000, stemGradGrowth: '+3% YoY',
        literacy: '81.8%', internetPenetration: '73%',
        diaspora: [
          { emoji: '👨‍💻', name: 'Ons Jabeur', role: 'AI Platform Engineer → Spotify', location: 'Stockholm' },
          { emoji: '👩‍🎓', name: 'Emna Ghariani', role: 'Ethical AI Researcher → UNESCO Paris', location: 'Paris, France' }
        ]
      },

      privacy: {
        laws: [
          { name: 'Organic Law 63-2004 on Personal Data Protection', status: 'Active', year: 2004 },
          { name: 'INPDP Oversight Regulations', status: 'Active', year: 2004 }
        ],
        adequacy: 'Not formally evaluated',
        gdprGrid: {
          erasureRights: { value: 'Yes (Art. 31)', status: 'green' },
          fines: { value: 'Up to TND 100K (~$32K)', status: 'red', note: 'Below deterrence threshold' },
          consent: { value: 'Opt-in required', status: 'green' },
          dpa: { value: 'INPDP – Functionally independent', status: 'green', note: 'Notable independence for MENA region' },
          dataLocalization: { value: 'None required', status: 'green' },
          crossBorderTransfer: { value: 'Controlled transfer list', status: 'green' },
          breachNotification: { value: 'Prompt notice required', status: 'amber' }
        }
      },

      infrastructure: {
        dataCenters: [
          { name: 'Orange Tunisie DC', location: 'Lac 2, Tunis', megawatts: 12, tier: 'Tier II+', operator: 'Orange Tunisie', parent: 'Orange SA', solar: '10%', cooling: 'Air cooling', certifications: ['ISO 27001'] }
        ],
        aiModels: [],
        capitalFlows: [
          { investor: 'EU Horizon', amount: '€80M', target: 'Tunisia Digital Transition', year: 2023, type: 'Development fund', note: 'Part of Global Gateway Africa-EU tech corridor' },
          { investor: 'AfDB', amount: '$200M', target: 'Tunisia Digital Infrastructure', year: 2023, type: 'Development loan', note: 'Backbone fiber, last-mile connectivity' }
        ]
      },

      disputes: {
        official: [
          { text: 'Tunisia\'s INPDP is among the most independent data protection bodies in the MENA region, actively processing citizen complaints.', source: 'INPDP Annual Report, 2022' }
        ],
        critique: [
          { text: 'President Saied\'s 2021 consolidation of power suspended Parliament and issued emergency decrees enabling broader surveillance authority without judicial oversight.', source: 'Freedom House, 2022' },
          { text: 'New 2022 Constitution removed prior judicial oversight of state surveillance, creating constitutional regression on digital rights.', source: 'Article 19 / ICJ Analysis, 2022' }
        ]
      },

      ecosystem: [
        { emoji: '✊', name: 'Sonia Dahmani', role: 'Lawyer & Digital Rights Activist', org: 'Independent / Bar Association', status: 'imprisoned', statusColor: 'red', focus: 'Free speech, digital censorship', desc: 'Arrested live on TV 2023 for criticizing Saied government. Case cited globally as example of Tunisia\'s democratic backsliding.' },
        { emoji: '🏛️', name: 'INPDP (National Authority)', role: 'Data Protection Regulator', org: 'Government body', status: 'active', statusColor: 'green', focus: 'Data protection enforcement', desc: 'Most active data protection enforcement body in Francophone Africa. Regularly audits companies and publishes transparency reports.' }
      ]
    },

    // ─── Iraq ───────────────────────────────────────────────
    IRQ: {
      id: 'IRQ', name: 'Iraq', shortName: 'Iraq',
      flag: '🇮🇶', tier: 3, region: 'Levant/Gulf',
      scores: { compute: 22, privacy: 25, governance: 30 },

      demographics: {
        gdp: '$264B', gdpGrowth: '+3.0%', gdpPPP: '$10K/capita',
        population: '42M', populationGrowth: '+2.3%',
        avgWage: '$280/mo', medianAge: 21.7,
        stemGrads: 18000, stemGradGrowth: '+2% YoY',
        literacy: '85.6%', internetPenetration: '79%',
        diaspora: [
          { emoji: '👨‍💻', name: 'Ali Al-Bayati', role: 'Software Engineer → Microsoft Seattle', location: 'Seattle, WA' },
          { emoji: '👩‍🎓', name: 'Zainab Al-Obeidi', role: 'Data Science → Oxford-AstraZeneca', location: 'Oxford, UK' }
        ]
      },

      privacy: {
        laws: [
          { name: 'No comprehensive data protection law', status: 'None', year: null },
          { name: 'Communications & Media Law No. 65/2004', status: 'Active', year: 2004 }
        ],
        adequacy: 'Not applicable',
        gdprGrid: {
          erasureRights: { value: 'None in law', status: 'red' },
          fines: { value: 'No framework', status: 'red' },
          consent: { value: 'No framework', status: 'red' },
          dpa: { value: 'None', status: 'red', note: 'No data protection authority exists' },
          dataLocalization: { value: 'Government system only', status: 'amber' },
          crossBorderTransfer: { value: 'Unregulated', status: 'red' },
          breachNotification: { value: 'No requirement', status: 'red' }
        }
      },

      infrastructure: {
        dataCenters: [
          { name: 'Baghdad Government DC', location: 'Baghdad', megawatts: 8, tier: 'Tier II', operator: 'Ministry of Communications', parent: 'Iraqi Government', solar: '2%', cooling: 'Air cooling (partial)', certifications: [] }
        ],
        aiModels: [],
        capitalFlows: [
          { investor: 'Huawei', amount: '$1.1B', target: 'Iraq Smart Cities + 5G', year: 2021, type: 'Infrastructure contract', note: 'Baghdad, Basra, Erbil smart city surveillance integration' },
          { investor: 'World Bank', amount: '$500M', target: 'Iraq Digital Economy Project', year: 2022, type: 'Development loan', note: 'Backbone connectivity and digital governance' }
        ]
      },

      disputes: {
        official: [
          { text: 'Iraq\'s National Digital Strategy 2030 outlines e-government services and digital ID modernization as key reform pillars.', source: 'Iraqi Ministry of Planning, 2021' }
        ],
        critique: [
          { text: 'Iraq repeatedly shuts down the internet during exam season, political unrest, and elections — documented 12 intentional shutdowns between 2019–2023.', source: 'NetBlocks / Access Now, 2023' },
          { text: 'No data protection law exists; Huawei surveillance infrastructure in Iraqi cities operates without any legal framework for data retention or access.', source: 'Privacy International, 2022' }
        ]
      },

      ecosystem: [
        { emoji: '🏛️', name: 'Sumer Rights (Iraq)', role: 'Digital Rights NGO', org: 'Sumer Rights', status: 'active', statusColor: 'amber', focus: 'Internet shutdowns, civic tech', desc: 'Documents Iraqi internet shutdowns and government surveillance. Small team operating in difficult environment with limited resources.' }
      ]
    },

    // ─── Kuwait ─────────────────────────────────────────────
    KWT: {
      id: 'KWT', name: 'Kuwait', shortName: 'Kuwait',
      flag: '🇰🇼', tier: 2, region: 'Gulf',
      scores: { compute: 58, privacy: 42, governance: 50 },

      demographics: {
        gdp: '$161B', gdpGrowth: '+0.6%', gdpPPP: '$51K/capita',
        population: '4.3M', populationGrowth: '+1.4%',
        avgWage: '$3,400/mo', medianAge: 33.7,
        stemGrads: 5500, stemGradGrowth: '+6% YoY',
        literacy: '96.3%', internetPenetration: '99.4%',
        diaspora: [
          { emoji: '👨‍💻', name: 'Fawaz Al-Rashidi', role: 'ML Infrastructure → Amazon Web Services', location: 'Seattle, WA' }
        ]
      },

      privacy: {
        laws: [
          { name: 'No comprehensive data protection law (draft pending)', status: 'Draft', year: null },
          { name: 'e-Transactions Law No. 20/2014', status: 'Active', year: 2014 }
        ],
        adequacy: 'Not applicable',
        gdprGrid: {
          erasureRights: { value: 'None in law', status: 'red' },
          fines: { value: 'No DP framework', status: 'red' },
          consent: { value: 'No DP framework', status: 'red' },
          dpa: { value: 'None', status: 'red' },
          dataLocalization: { value: 'Financial sector only', status: 'amber' },
          crossBorderTransfer: { value: 'Unregulated', status: 'red' },
          breachNotification: { value: 'No requirement', status: 'red' }
        }
      },

      infrastructure: {
        dataCenters: [
          { name: 'STC Kuwait DC', location: 'Kuwait City', megawatts: 45, tier: 'Tier III+', operator: 'STC Kuwait', parent: 'Saudi Telecom Company', solar: '10%', cooling: 'Mechanical cooling', certifications: ['ISO 27001'] },
          { name: 'Zain Kuwait DC', location: 'Shuwaikh', megawatts: 30, tier: 'Tier III', operator: 'Zain Kuwait', parent: 'Zain Group', solar: '5%', cooling: 'Air cooling', certifications: [] }
        ],
        aiModels: [],
        capitalFlows: [
          { investor: 'Oracle', amount: '$100M', target: 'Kuwait Cloud Region', year: 2024, type: 'Cloud infrastructure', note: 'OCI region serving Kuwaiti government workloads' },
          { investor: 'Microsoft', amount: '$200M', target: 'Azure Kuwait expansion', year: 2024, type: 'Cloud region', note: 'Government and enterprise cloud' }
        ]
      },

      disputes: {
        official: [
          { text: 'Kuwait\'s Vision 2035 (New Kuwait) includes digital government transformation and plans for a comprehensive data protection law.', source: 'KDIPA / Kuwait Gov., 2023' }
        ],
        critique: [
          { text: 'Kuwait has no data protection law despite having one of the highest internet penetration rates in the world, leaving citizen data entirely unprotected.', source: 'IAPP Global Privacy Report, 2023' },
          { text: 'Several Kuwaiti activists were arrested for Twitter posts; authorities obtained account data directly from telecom companies without judicial warrants.', source: 'EFF / Gulf Centre for Human Rights, 2022' }
        ]
      },

      ecosystem: [
        { emoji: '🏛️', name: 'Kuwait Digital Society', role: 'Civil Tech Forum', org: 'KDS (NGO)', status: 'active', statusColor: 'green', focus: 'Data protection advocacy, digital literacy', desc: 'Advocates for Kuwait\'s first comprehensive data protection law. Organizes annual digital rights forum in Kuwait City.' }
      ]
    },

    // ─── Bahrain ────────────────────────────────────────────
    BHR: {
      id: 'BHR', name: 'Bahrain', shortName: 'Bahrain',
      flag: '🇧🇭', tier: 2, region: 'Gulf',
      scores: { compute: 64, privacy: 48, governance: 60 },

      demographics: {
        gdp: '$44B', gdpGrowth: '+3.1%', gdpPPP: '$50K/capita',
        population: '1.7M', populationGrowth: '+1.6%',
        avgWage: '$2,600/mo', medianAge: 32.6,
        stemGrads: 3800, stemGradGrowth: '+5% YoY',
        literacy: '97.5%', internetPenetration: '99.7%',
        diaspora: [
          { emoji: '👨‍💻', name: 'Jaber Al-Ansari', role: 'Cloud Security → AWS London', location: 'London, UK' }
        ]
      },

      privacy: {
        laws: [
          { name: 'Personal Data Protection Law 30/2018', status: 'Active', year: 2018 }
        ],
        adequacy: 'Not evaluated',
        gdprGrid: {
          erasureRights: { value: 'Yes', status: 'green' },
          fines: { value: 'Up to BHD 20K (~$53K)', status: 'red', note: 'Very low deterrence' },
          consent: { value: 'Opt-in required', status: 'green' },
          dpa: { value: 'Personal Data Protection Authority', status: 'amber', note: 'Operational but limited enforcement track record' },
          dataLocalization: { value: 'Financial sector required', status: 'amber' },
          crossBorderTransfer: { value: 'Controlled', status: 'amber' },
          breachNotification: { value: 'Reasonable timeframe', status: 'amber' }
        }
      },

      infrastructure: {
        dataCenters: [
          { name: 'AWS Middle East (Bahrain) Region', location: 'Manama', megawatts: 150, tier: 'Hyperscale', operator: 'Amazon Web Services', parent: 'Amazon.com', solar: '19%', cooling: 'Evaporative cooling (ASHRAE W1)', certifications: ['ISO 27001', 'SOC 1/2/3', 'PCI-DSS'] },
          { name: 'Bahrain Data Hub – Batelco', location: 'Bahrain Investment Wharf', megawatts: 40, tier: 'Tier III', operator: 'Batelco', parent: 'Bahrain Telecom', solar: '8%', cooling: 'Mechanical', certifications: ['ISO 27001'] }
        ],
        aiModels: [],
        capitalFlows: [
          { investor: 'AWS', amount: '$6B', target: 'Bahrain AWS Region expansion', year: 2024, type: 'Hyperscale region', note: 'Largest foreign investment in Bahrain; first AWS region in Arab world (2019)' },
          { investor: 'JPMorgan', amount: '$150M', target: 'Bahrain FinTech Bay', year: 2023, type: 'FinTech infrastructure', note: 'Regional FinTech AI hub' }
        ]
      },

      disputes: {
        official: [
          { text: 'Bahrain was the first Arab country to host an AWS region (2019), establishing itself as Gulf cloud infrastructure pioneer.', source: 'AWS / EDB Bahrain, 2019' },
          { text: 'Bahrain\'s 2018 PDPL provides comprehensive data subject rights and an operational DPA.', source: 'PDPA Bahrain, 2018' }
        ],
        critique: [
          { text: 'Nabeel Rajab, Bahrain\'s most prominent human rights defender, was sentenced to 5 years for tweets; his devices showed Pegasus infection traces.', source: 'Citizen Lab / Amnesty, 2021' },
          { text: 'Bahrain used COVID-19 contact tracing app BeAware to enable persistent location surveillance; app accessed GPS without meaningful consent.', source: 'Access Now / Privacy International, 2020' }
        ]
      },

      ecosystem: [
        { emoji: '✊', name: 'Nabeel Rajab', role: 'Human Rights Defender', org: 'Bahrain Center for Human Rights', status: 'released', statusColor: 'amber', focus: 'Surveillance, free speech, political prisoners', desc: 'Founder of BCHR. Confirmed Pegasus target. Imprisoned multiple times for social media posts. Released 2020, remains under travel ban.' }
      ]
    },

    // ─── Oman ────────────────────────────────────────────────
    OMN: {
      id: 'OMN', name: 'Oman', shortName: 'Oman',
      flag: '🇴🇲', tier: 2, region: 'Gulf',
      scores: { compute: 52, privacy: 44, governance: 55 },

      demographics: {
        gdp: '$104B', gdpGrowth: '+1.3%', gdpPPP: '$34K/capita',
        population: '4.6M', populationGrowth: '+2.0%',
        avgWage: '$1,800/mo', medianAge: 26.6,
        stemGrads: 7500, stemGradGrowth: '+5% YoY',
        literacy: '95.7%', internetPenetration: '95.2%',
        diaspora: [
          { emoji: '👩‍💻', name: 'Aisha Al-Balushi', role: 'AI Product → Google London', location: 'London, UK' }
        ]
      },

      privacy: {
        laws: [
          { name: 'Royal Decree 6/2022 – Personal Data Protection Law', status: 'Active', year: 2022 }
        ],
        adequacy: 'Not evaluated',
        gdprGrid: {
          erasureRights: { value: 'Yes', status: 'green' },
          fines: { value: 'Up to OMR 500K (~$1.3M)', status: 'green' },
          consent: { value: 'Opt-in required', status: 'green' },
          dpa: { value: 'CTRA (Communication Regulatory Authority)', status: 'amber' },
          dataLocalization: { value: 'Critical sectors required', status: 'amber' },
          crossBorderTransfer: { value: 'Adequacy framework', status: 'amber' },
          breachNotification: { value: '72 hours', status: 'green' }
        }
      },

      infrastructure: {
        dataCenters: [
          { name: 'Oman Data Park', location: 'Muscat', megawatts: 35, tier: 'Tier III+', operator: 'Oman Data Park', parent: 'Omantel (partially state)', solar: '18%', cooling: 'Air economization + adiabatic', certifications: ['ISO 27001', 'PCI-DSS'] }
        ],
        aiModels: [],
        capitalFlows: [
          { investor: 'Huawei', amount: '$500M+', target: 'Oman 5G + Smart City', year: 2022, type: 'Telecoms infrastructure', note: 'Major 5G rollout contract with Omantel' },
          { investor: 'Microsoft', amount: '$1B', target: 'Oman Azure region', year: 2024, type: 'Cloud infrastructure', note: 'Azure Middle East region' }
        ]
      },

      disputes: {
        official: [
          { text: 'Oman Vision 2040 includes digital transformation as pillar; 2022 PDPL represents major governance reform.', source: 'Oman Vision 2040 Secretariat' }
        ],
        critique: [
          { text: 'Civil society, independent journalism, and political parties remain banned in Oman; digital expression laws used to imprison bloggers.', source: 'Freedom House 2023' }
        ]
      },

      ecosystem: [
        { emoji: '🎓', name: 'Dr. Said Al-Hajri', role: 'Cybersecurity Researcher', org: 'Sultan Qaboos University', status: 'active', statusColor: 'green', focus: 'Network security, IoT vulnerabilities in Gulf', desc: 'Published research on critical infrastructure vulnerabilities in GCC smart city deployments. Advocates for open security auditing.' }
      ]
    },

    // ─── Libya ──────────────────────────────────────────────
    LBY: {
      id: 'LBY', name: 'Libya', shortName: 'Libya',
      flag: '🇱🇾', tier: 3, region: 'North Africa',
      scores: { compute: 15, privacy: 20, governance: 18 },

      demographics: {
        gdp: '$40B', gdpGrowth: '+12.0%', gdpPPP: '$16K/capita',
        population: '7.1M', populationGrowth: '+1.6%',
        avgWage: '$280/mo', medianAge: 29.5,
        stemGrads: 4000, stemGradGrowth: '-2% YoY',
        literacy: '91.0%', internetPenetration: '42%',
        diaspora: [
          { emoji: '👨‍💻', name: 'Omar Benghdaifa', role: 'Security Engineer → NATO CCDCOE', location: 'Tallinn, Estonia' }
        ]
      },

      privacy: {
        laws: [
          { name: 'No data protection law exists', status: 'None', year: null }
        ],
        adequacy: 'Not applicable',
        gdprGrid: {
          erasureRights: { value: 'None', status: 'red' },
          fines: { value: 'None', status: 'red' },
          consent: { value: 'None', status: 'red' },
          dpa: { value: 'None', status: 'red' },
          dataLocalization: { value: 'None', status: 'red' },
          crossBorderTransfer: { value: 'Unregulated', status: 'red' },
          breachNotification: { value: 'None', status: 'red' }
        }
      },

      infrastructure: {
        dataCenters: [],
        aiModels: [],
        capitalFlows: [
          { investor: 'Italian govt (ENI)', amount: '$8B', target: 'Libyan energy + telecom', year: 2023, type: 'Energy infrastructure', note: 'Subsea cables and connectivity infrastructure tied to Italian energy interests' }
        ]
      },

      disputes: {
        official: [
          { text: 'GNU (Government of National Unity) prioritizes restoration of telecom infrastructure as part of economic recovery plan.', source: 'GNU Libya, 2022' }
        ],
        critique: [
          { text: 'Both competing governments (Tripoli/Tobruk) use telecommunications for surveillance and political targeting with no legal oversight framework.', source: 'Amnesty International, 2023' }
        ]
      },

      ecosystem: [
        { emoji: '🏛️', name: 'Libya Telecom & Technology (LTT)', role: 'State-run ISP (de facto regulator)', org: 'Libyan Government', status: 'active', statusColor: 'amber', focus: 'Fragmented digital infrastructure management', desc: 'Operates primary internet infrastructure under contested dual-government scenario. No civilian oversight body exists.' }
      ]
    },

    // ─── Algeria ────────────────────────────────────────────
    DZA: {
      id: 'DZA', name: 'Algeria', shortName: 'Algeria',
      flag: '🇩🇿', tier: 3, region: 'North Africa',
      scores: { compute: 28, privacy: 32, governance: 35 },

      demographics: {
        gdp: '$238B', gdpGrowth: '+3.7%', gdpPPP: '$12K/capita',
        population: '46M', populationGrowth: '+1.6%',
        avgWage: '$320/mo', medianAge: 29.2,
        stemGrads: 30000, stemGradGrowth: '+4% YoY',
        literacy: '81.4%', internetPenetration: '71%',
        diaspora: [
          { emoji: '👩‍💻', name: 'Meriem Benamar', role: 'Research Engineer → INRIA (Paris)', location: 'Paris, France' },
          { emoji: '👨‍🎓', name: 'Yazid Zerrouki', role: 'Arabic NLP → CentraleSupélec', location: 'Paris, France' }
        ]
      },

      privacy: {
        laws: [
          { name: 'Law 18-07 on Personal Data Protection', status: 'Active', year: 2018 }
        ],
        adequacy: 'Not evaluated',
        gdprGrid: {
          erasureRights: { value: 'Partial', status: 'amber' },
          fines: { value: 'Up to DZD 5M (~$37K)', status: 'red' },
          consent: { value: 'Required in law', status: 'amber' },
          dpa: { value: 'ANPDP (operational)', status: 'amber', note: 'Newly operational from 2022' },
          dataLocalization: { value: 'Government data required', status: 'amber' },
          crossBorderTransfer: { value: 'Authorization required', status: 'amber' },
          breachNotification: { value: 'Not specified', status: 'red' }
        }
      },

      infrastructure: {
        dataCenters: [
          { name: 'Algérie Télécom DC', location: 'Algiers', megawatts: 18, tier: 'Tier II', operator: 'Algérie Télécom', parent: 'Algerian State', solar: '3%', cooling: 'Air cooling', certifications: [] }
        ],
        aiModels: [],
        capitalFlows: [
          { investor: 'Huawei', amount: '$700M', target: 'Algeria 4G/5G rollout', year: 2022, type: 'Telecom infrastructure', note: 'Major backbone and 5G contract with Algérie Télécom' }
        ]
      },

      disputes: {
        official: [
          { text: 'Algeria\'s Digital Economy Acceleration Plan targets 50% digital government services by 2025.', source: 'Ministry of Digital Economy, Algeria, 2020' }
        ],
        critique: [
          { text: 'Hirak protest movement (2019–21) led to mass arrests of activists based on social media posts; telecom companies cooperated with security services without judicial oversight.', source: 'Amnesty International, 2021' },
          { text: 'ANPDP created under interior ministry supervision, raising concerns about independence when government is also a data controller.', source: 'Privacy International, 2022' }
        ]
      },

      ecosystem: [
        { emoji: '✊', name: 'Khaled Drareni', role: 'Journalist & Press Freedom Activist', org: 'Independent / RSF', status: 'released', statusColor: 'amber', focus: 'Digital press freedom, surveillance journalism', desc: 'Imprisoned 2020-2021 for Hirak protest coverage. Now advocates for digital press freedom from exile.' },
        { emoji: '🎓', name: 'Dr. Fatima Boumahdi', role: 'AI & Society Researcher', org: 'USTHB Algiers', status: 'active', statusColor: 'green', focus: 'AI policy, algorithmic bias in Arabic contexts', desc: 'Leading Algerian AI ethics researcher. Published frameworks for culturally-aware AI governance adapted for North African contexts.' }
      ]
    },

    // ─── Lebanon ─────────────────────────────────────────────
    LBN: {
      id: 'LBN', name: 'Lebanon', shortName: 'Lebanon',
      flag: '🇱🇧', tier: 3, region: 'Levant',
      scores: { compute: 30, privacy: 40, governance: 28 },

      demographics: {
        gdp: '$22B', gdpGrowth: '+2.1%', gdpPPP: '$13K/capita',
        population: '5.5M', populationGrowth: '-0.3%',
        avgWage: '$350/mo', medianAge: 31.5,
        stemGrads: 12000, stemGradGrowth: '-5% YoY',
        literacy: '95.1%', internetPenetration: '79%',
        diaspora: [
          { emoji: '👩‍💻', name: 'Nadine Akkawi', role: 'AI Product → Microsoft Research', location: 'Cambridge, UK' },
          { emoji: '👨‍🎓', name: 'Fadi Fayad', role: 'Deep Learning → FAIR (Meta AI)', location: 'Paris, France' },
          { emoji: '👩‍🔬', name: 'Rana El-Atwi', role: 'NLP Lead → Amazon Alexa Science', location: 'Seattle, WA' }
        ]
      },

      privacy: {
        laws: [
          { name: 'Draft Personal Data Protection Law (pending parliament)', status: 'Draft', year: 2023 }
        ],
        adequacy: 'Not applicable',
        gdprGrid: {
          erasureRights: { value: 'None in law', status: 'red' },
          fines: { value: 'No framework', status: 'red' },
          consent: { value: 'No framework', status: 'red' },
          dpa: { value: 'None', status: 'red' },
          dataLocalization: { value: 'None', status: 'red' },
          crossBorderTransfer: { value: 'Unregulated', status: 'red' },
          breachNotification: { value: 'None', status: 'red' }
        }
      },

      infrastructure: {
        dataCenters: [
          { name: 'IDM DC Beirut', location: 'Achrafieh, Beirut', megawatts: 6, tier: 'Tier II', operator: 'IDM (formerly TERRA)', parent: 'Private Lebanese', solar: '12%', cooling: 'Air cooling + generators', certifications: [] }
        ],
        aiModels: [],
        capitalFlows: [
          { investor: 'World Bank', amount: '$246M', target: 'Lebanon Emergency Connectivity', year: 2022, type: 'Emergency infrastructure', note: 'Crisis-driven; Lebanese pound devaluation impacted tech sector entirely' }
        ]
      },

      disputes: {
        official: [
          { text: 'Lebanon\'s Ministry of Telecom committed to digital infrastructure reform as part of IMF recovery discussions.', source: 'Lebanese MoT, 2023' }
        ],
        critique: [
          { text: 'Lebanon has no data protection law despite being a regional tech talent hub. The economic collapse eliminated most private data infrastructure.', source: 'Access Now, 2022' },
          { text: 'ISF (Internal Security Forces) documented accessing WhatsApp communications of journalists without judicial authorization.', source: 'SMEX Lebanon, 2022' }
        ]
      },

      ecosystem: [
        { emoji: '🏛️', name: 'SMEX (Social Media Exchange)', role: 'Digital Rights NGO', org: 'SMEX Beirut', status: 'active', statusColor: 'green', focus: 'Internet freedom, digital privacy, surveillance documentation', desc: 'Leading MENA digital rights organization. Tracks government surveillance, ISP transparency, and advocates for data protection legislation across the region.' },
        { emoji: '🎓', name: 'Dr. Ibrahim Krayem', role: 'AI Ethics Researcher', org: 'American University of Beirut', status: 'active', statusColor: 'green', focus: 'AI fairness in Arabic, algorithm auditing', desc: 'Research on algorithmic bias in Arabic-language AI systems and the impact of politically contested AI governance frameworks on MENA populations.' }
      ]
    },

    // ─── Yemen ───────────────────────────────────────────────
    YEM: {
      id: 'YEM', name: 'Yemen', shortName: 'Yemen',
      flag: '🇾🇪', tier: 3, region: 'Gulf/Horn',
      scores: { compute: 8, privacy: 15, governance: 12 },

      demographics: {
        gdp: '$21B', gdpGrowth: '-2.1%', gdpPPP: '$2.5K/capita',
        population: '34M', populationGrowth: '+2.2%',
        avgWage: '$60/mo', medianAge: 19.2,
        stemGrads: 5000, stemGradGrowth: '-8% YoY',
        literacy: '70.1%', internetPenetration: '27%',
        diaspora: [
          { emoji: '👩‍💻', name: 'Amal Al-Futaisi', role: 'Developer → Mercy Corps Tech', location: 'Amman, Jordan' }
        ]
      },

      privacy: {
        laws: [{ name: 'No data protection law', status: 'None', year: null }],
        adequacy: 'Not applicable',
        gdprGrid: {
          erasureRights: { value: 'None', status: 'red' },
          fines: { value: 'None', status: 'red' },
          consent: { value: 'None', status: 'red' },
          dpa: { value: 'None', status: 'red' },
          dataLocalization: { value: 'None', status: 'red' },
          crossBorderTransfer: { value: 'Unregulated', status: 'red' },
          breachNotification: { value: 'None', status: 'red' }
        }
      },

      infrastructure: { dataCenters: [], aiModels: [], capitalFlows: [] },

      disputes: {
        official: [
          { text: 'Yemen transitional government has committed to digital inclusion as part of UN-mediated peace reconstruction planning.', source: 'UNDP Yemen, 2022' }
        ],
        critique: [
          { text: 'Houthi forces and Saudi-led coalition both exploit telecom infrastructure for surveillance of opposition; both sides documented blocking internet during military operations.', source: 'NetBlocks / Digital Rights Foundation, 2023' }
        ]
      },

      ecosystem: [
        { emoji: '🏛️', name: 'Mwatana for Human Rights', role: 'Human Rights Monitor', org: 'Mwatana', status: 'active', statusColor: 'amber', focus: 'War crimes documentation, digital evidence preservation', desc: 'Documents war crimes using digital tools. Preserves evidence of airstrike victims, telecommunications targeting, and civilian digital surveillance.' }
      ]
    },

    // ─── Sudan ───────────────────────────────────────────────
    SDN: {
      id: 'SDN', name: 'Sudan', shortName: 'Sudan',
      flag: '🇸🇩', tier: 3, region: 'North Africa/Horn',
      scores: { compute: 12, privacy: 18, governance: 15 },

      demographics: {
        gdp: '$35B', gdpGrowth: '-2.5%', gdpPPP: '$3.7K/capita',
        population: '47M', populationGrowth: '+2.5%',
        avgWage: '$80/mo', medianAge: 20.4,
        stemGrads: 8000, stemGradGrowth: '-6% YoY',
        literacy: '60.7%', internetPenetration: '32%',
        diaspora: [
          { emoji: '👨‍💻', name: 'Hasan Al-Nour', role: 'Data Engineer → UNHCR Innovation', location: 'Geneva, Switzerland' }
        ]
      },

      privacy: {
        laws: [{ name: 'No data protection law', status: 'None', year: null }],
        adequacy: 'Not applicable',
        gdprGrid: {
          erasureRights: { value: 'None', status: 'red' },
          fines: { value: 'None', status: 'red' },
          consent: { value: 'None', status: 'red' },
          dpa: { value: 'None', status: 'red' },
          dataLocalization: { value: 'None', status: 'red' },
          crossBorderTransfer: { value: 'Unregulated', status: 'red' },
          breachNotification: { value: 'None', status: 'red' }
        }
      },

      infrastructure: { dataCenters: [], aiModels: [], capitalFlows: [] },

      disputes: {
        official: [{ text: 'SAF and civilian transitional government had outlined digital governance plans pre-2023 conflict.', source: 'Sudan Transitional Sovereign Council, 2022' }],
        critique: [{ text: 'Both SAF and RSF militia use telecommunications surveillance without any legal framework; Sudan Telecom directly facilitates communications intelligence for military actors.', source: 'Amnesty International, 2023' }]
      },

      ecosystem: [
        { emoji: '🏛️', name: 'Sudan Digital Rights Coalition', role: 'Advocacy Coalition', org: 'SDRC (Khartoum/Diaspora)', status: 'active', statusColor: 'amber', focus: 'Conflict-driven internet shutdowns, digital safety', desc: 'Coalition of Sudanese civil society groups documenting internet shutdowns and providing digital security training during the 2023 conflict.' }
      ]
    },

    // ─── Syria ───────────────────────────────────────────────
    SYR: {
      id: 'SYR', name: 'Syria', shortName: 'Syria',
      flag: '🇸🇾', tier: 3, region: 'Levant',
      scores: { compute: 10, privacy: 12, governance: 10 },

      demographics: {
        gdp: '$11B', gdpGrowth: '+1.2%', gdpPPP: '$3.5K/capita',
        population: '21M', populationGrowth: '+0.8%',
        avgWage: '$45/mo', medianAge: 25.7,
        stemGrads: 6000, stemGradGrowth: '-10% YoY',
        literacy: '86.4%', internetPenetration: '34%',
        diaspora: [
          { emoji: '👩‍💻', name: 'Reem Al-Kayali', role: 'Humanitarian Tech → IRC Innovation', location: 'Berlin, Germany' }
        ]
      },

      privacy: {
        laws: [{ name: 'No data protection law', status: 'None', year: null }],
        adequacy: 'Not applicable',
        gdprGrid: {
          erasureRights: { value: 'None', status: 'red' },
          fines: { value: 'None', status: 'red' },
          consent: { value: 'None', status: 'red' },
          dpa: { value: 'None', status: 'red' },
          dataLocalization: { value: 'None', status: 'red' },
          crossBorderTransfer: { value: 'Unregulated', status: 'red' },
          breachNotification: { value: 'None', status: 'red' }
        }
      },

      infrastructure: { dataCenters: [], aiModels: [],
        capitalFlows: [
          { investor: 'Sandvine (Canadian)', amount: 'N/A', target: 'Syrian DPI surveillance infrastructure', year: 2012, type: 'Surveillance tech export', note: 'Deep packet inspection technology sold to Assad government; used to intercept and filter dissident communications (Bloomberg, 2013)' }
        ]
      },

      disputes: {
        official: [{ text: 'New Syrian administration (post-Assad, 2024) outlines digital reconstruction as economic recovery priority.', source: 'HTS Transitional Govt, 2025' }],
        critique: [{ text: 'Assad regime built one of the Arab world\'s most sophisticated state surveillance architectures using Western-supplied DPI equipment and targeted dissidents with custom spyware.', source: 'EFF / Access Now, 2013–2023' }]
      },

      ecosystem: [
        { emoji: '🏛️', name: 'Syria Justice and Accountability Centre', role: 'Digital Evidence Preservation', org: 'SJAC', status: 'active', statusColor: 'green', focus: 'Surveillance documentation, digital war crimes evidence', desc: 'Preserves digital evidence of Syrian regime surveillance and war crimes. Works with ICC and international tribunals.' }
      ]
    },

    // ─── Iran ────────────────────────────────────────────────
    IRN: {
      id: 'IRN', name: 'Iran', shortName: 'Iran',
      flag: '🇮🇷', tier: 2, region: 'Persian Gulf',
      scores: { compute: 55, privacy: 15, governance: 25 },

      demographics: {
        gdp: '$366B', gdpGrowth: '+3.8%', gdpPPP: '$15K/capita',
        population: '88M', populationGrowth: '+0.9%',
        avgWage: '$180/mo', medianAge: 32.5,
        stemGrads: 65000, stemGradGrowth: '+3% YoY',
        literacy: '88.7%', internetPenetration: '78%',
        diaspora: [
          { emoji: '👩‍💻', name: 'Elham Tabassi', role: 'AI Safety Lead → NIST (US Govt)', location: 'Gaithersburg, MD' },
          { emoji: '👨‍🎓', name: 'Amin Sadeghi', role: 'ML Research → DeepMind London', location: 'London, UK' },
          { emoji: '👩‍🔬', name: 'Narges Mohammadi', role: 'Nobel Peace Prize → Imprisoned Activist', location: 'Tehran (imprisoned)' }
        ]
      },

      privacy: {
        laws: [
          { name: 'User Data Protection Regulation (unimplemented)', status: 'Draft', year: 2020 },
          { name: 'Policing Crimes in Cyberspace Law', status: 'Active', year: 2010 }
        ],
        adequacy: 'Not applicable (sanctions)',
        gdprGrid: {
          erasureRights: { value: 'None effective', status: 'red' },
          fines: { value: 'No DP framework', status: 'red' },
          consent: { value: 'No DP framework', status: 'red' },
          dpa: { value: 'None', status: 'red', note: 'FATA (Cyber Police) functions as enforcement, not protection' },
          dataLocalization: { value: 'Mandatory (National Internet)', status: 'red', note: 'Used for surveillance not protection' },
          crossBorderTransfer: { value: 'Blocked (National Intranet)', status: 'red' },
          breachNotification: { value: 'None', status: 'red' }
        }
      },

      infrastructure: {
        dataCenters: [
          { name: 'National Iranian Internet Exchange (NIIX)', location: 'Tehran', megawatts: 80, tier: 'State', operator: 'TCI (Telecom Infrastructure Co.)', parent: 'Iranian Government', solar: '4%', cooling: 'Air cooling', certifications: [] },
          { name: 'IRNIC State Data Centers', location: 'Tehran / Isfahan', megawatts: 45, tier: 'State', operator: 'IRNIC', parent: 'Ministry of ICT', solar: '2%', cooling: 'Mechanical', certifications: [] }
        ],
        aiModels: [
          { emoji: '🤖', name: 'ParsBERT', developer: 'HooshvareLab (open source)', license: 'Apache 2.0', architecture: 'BERT Persian-language', params: '340M', languages: ['fa'], launched: '2020' },
          { emoji: '🧠', name: 'ParsGPT', developer: 'FarsAI Research', license: 'Research', architecture: 'GPT-2 based', params: '1.5B', languages: ['fa', 'en'], launched: '2022' }
        ],
        capitalFlows: [
          { investor: 'China (state-linked)', amount: '$400B (25-yr)', target: 'Iran-China Cooperation Agreement', year: 2021, type: 'Strategic partnership', note: 'Includes telecom, surveillance infrastructure; Huawei and ZTE involved in National Intranet' }
        ]
      },

      disputes: {
        official: [
          { text: 'Iran\'s National Information Network (NIN/Intranet) ensures "digital sovereignty and protection from foreign cyber attacks."', source: 'Ministry of ICT Iran, 2023' },
          { text: 'ParsBERT and related models demonstrate Iran\'s capacity to build sovereign AI in Persian without Western dependencies.', source: 'ICTC Iran, 2021' }
        ],
        critique: [
          { text: 'The National Internet (NIN) is a mass surveillance tool that throttles, blocks, and intercepts citizen communications. Used to suppress Mahsa Amini protests (2022) with near-total internet shutdown.', source: 'NetBlocks / OONI, 2022' },
          { text: 'Narges Mohammadi, 2023 Nobel Peace Prize laureate, remains imprisoned for documenting torture of detained protesters with digital evidence.', source: 'Nobel Committee, 2023' },
          { text: 'FATA (Cyber Police) criminalizes VPN use, encrypted messaging, and "anti-revolutionary online content" — more than 6,000 arrests 2022–2023.', source: 'ARTICLE 19 / Amnesty, 2023' }
        ]
      },

      ecosystem: [
        { emoji: '✊', name: 'Narges Mohammadi', role: '2023 Nobel Peace Prize – Digital Rights', org: 'Defenders of Human Rights Center', status: 'imprisoned', statusColor: 'red', focus: 'Surveillance, political prisoners, women\'s rights', desc: 'Nobel Peace Prize 2023. Imprisoned for documenting torture and digital surveillance of activists. Her digital communications with Nobel Committee were intercepted by FATA.' },
        { emoji: '🎓', name: 'Elham Tabassi', role: 'AI Safety Pioneer', org: 'NIST (US Govt.)', status: 'active', statusColor: 'green', focus: 'AI risk management, biometric bias', desc: 'Co-led the NIST AI Risk Management Framework (AI RMF 1.0). Iranian-American pioneer in trustworthy AI standards. One of the most influential AI governance practitioners globally.' },
        { emoji: '🏛️', name: 'OONI (Open Observatory Network)', role: 'Internet Censorship Monitor', org: 'Tor Project / OONI', status: 'active', statusColor: 'green', focus: 'Real-time censorship documentation', desc: 'Publishes real-time data on Iran\'s internet shutdowns, filtering, and deep packet inspection. Critical data source for sanctions policy and human rights litigation.' }
      ]
    },

    // ─── Palestine ───────────────────────────────────────────
    PSE: {
      id: 'PSE', name: 'Palestine', shortName: 'Palestine',
      flag: '🇵🇸', tier: 3, region: 'Levant',
      scores: { compute: 18, privacy: 22, governance: 20 },

      demographics: {
        gdp: '$17B', gdpGrowth: '-8.2% (conflict)', gdpPPP: '$6.8K/capita',
        population: '5.3M', populationGrowth: '+2.1%',
        avgWage: '$390/mo', medianAge: 20.4,
        stemGrads: 7500, stemGradGrowth: '+2% YoY',
        literacy: '97.3%', internetPenetration: '80%',
        diaspora: [
          { emoji: '👩‍💻', name: 'Hadeel Al-Hroub', role: 'Cybersecurity → NATO CCDCOE', location: 'Tallinn, Estonia' },
          { emoji: '👨‍🎓', name: 'Tariq Khoury', role: 'Computer Science → UC Berkeley faculty', location: 'Berkeley, CA' }
        ]
      },

      privacy: {
        laws: [
          { name: 'Personal Data Protection Law (PA) 2018', status: 'West Bank only', year: 2018 },
          { name: 'No framework in Gaza under Hamas', status: 'None (Gaza)', year: null }
        ],
        adequacy: 'Not applicable',
        gdprGrid: {
          erasureRights: { value: 'WB: Partial, Gaza: None', status: 'red' },
          fines: { value: 'Minimal', status: 'red' },
          consent: { value: 'WB law only', status: 'amber' },
          dpa: { value: 'None operational', status: 'red' },
          dataLocalization: { value: 'None', status: 'red' },
          crossBorderTransfer: { value: 'Unregulated', status: 'red' },
          breachNotification: { value: 'None', status: 'red' }
        }
      },

      infrastructure: {
        dataCenters: [],
        aiModels: [],
        capitalFlows: []
      },

      disputes: {
        official: [
          { text: 'Palestinian Authority Digital Transformation Strategy 2023–2026 outlines e-services, national ID digitization, and data protection reform.', source: 'PA Ministry of Telecom, 2023' }
        ],
        critique: [
          { text: 'The IDF AI targeting system "Lavender" was documented to have designated 37,000 Palestinians as targets; the "Gospel" system autonomously identified buildings for airstrikes with minimal human review.', source: '+972 Magazine / Local Call investigative report, April 2024' },
          { text: 'Israel\'s Wolf Pack surveillance system at Gaza checkpoints uses biometric facial recognition against an entire civilian population without consent or legal framework.', source: 'Human Rights Watch, 2023' },
          { text: 'Meta and other platforms systematically suppressed Palestinian voices during 2023–24 conflict; algorithms applied disproportionate content moderation to Arabic content.', source: '7amleh / Access Now Digital Rights Report, 2024' }
        ]
      },

      ecosystem: [
        { emoji: '🏛️', name: '7amleh – Arab Center for Social Media Advancement', role: 'Palestinian Digital Rights', org: '7amleh (Haifa/Ramallah)', status: 'active', statusColor: 'green', focus: 'Platform accountability, content suppression', desc: 'Published landmark studies on systematic suppression of Palestinian content on Instagram, Facebook, and TikTok. Provides digital security training to journalists in Gaza.' },
        { emoji: '🎓', name: 'Dr. Samer Abdelnour', role: 'Technology & Displacement Researcher', org: 'University of Edinburgh', status: 'active', statusColor: 'green', focus: 'AI in conflict, humanitarian tech ethics', desc: 'Research on how AI and data systems shape displacement and refugee experiences. Critical perspective on UN and NGO digital data extraction from Palestinian refugees.' }
      ]
    }
  },

  // ══════════════════════════════════════════════════════════
  //  MODULE B – ETHICS & GOVERNANCE HUB
  // ══════════════════════════════════════════════════════════

  ethicsFigures: [
    {
      id: 'timnit-gebru',
      name: 'Dr. Timnit Gebru',
      initials: 'TG',
      affiliation: 'DAIR Institute (Founder)',
      region: 'Global', origin: 'Ethiopian-American',
      methods: ['Algorithmic auditing', 'Dataset documentation', 'Community-based research'],
      bio: 'Founder of the DAIR Institute. Former Google AI Ethics co-lead. Pioneered "datasheet for datasets" methodology. Co-authored the landmark Stochastic Parrots paper on LLM risks. Named TIME100 Most Influential, 2022. Central to global conversation on structural bias in AI systems.',
      focus: ['Bias', 'LLMs', 'Community AI']
    },
    {
      id: 'yoshua-bengio',
      name: 'Prof. Yoshua Bengio',
      initials: 'YB',
      affiliation: 'Mila / Université de Montréal',
      region: 'Global', origin: 'Canadian-Moroccan',
      methods: ['Deep learning theory', 'AI safety research', 'Policy advocacy'],
      bio: 'Turing Award laureate (2018) for foundational deep learning contributions. Now leads AI safety research at Mila. Chairs the International Scientific Report on AI. North African heritage; deeply involved in MENA AI capacity building.',
      focus: ['AI Safety', 'Deep Learning', 'Policy']
    },
    {
      id: 'virginia-eubanks',
      name: 'Prof. Virginia Eubanks',
      initials: 'VE',
      affiliation: 'University of Albany (SUNY)',
      region: 'Global',
      methods: ['Ethnographic research', 'Algorithmic harm documentation', 'Policy analysis'],
      bio: 'Author of "Automating Inequality" (2018), a landmark study of algorithmic harm to marginalized communities. Research directly influenced EU AI Act provisions on high-risk AI systems.',
      focus: ['Algorithmic Justice', 'Welfare Systems', 'Policy']
    },
    {
      id: 'nadia-naffi',
      name: 'Dr. Nadia Naffi',
      initials: 'NN',
      affiliation: 'Université Laval / UNESCO Chair AI',
      region: 'MENA', origin: 'Lebanese-Canadian',
      methods: ['Educational AI ethics', 'Critical digital pedagogy', 'Participatory research'],
      bio: 'UNESCO Chair on Digital Inclusion and Innovation. Lebanese-Canadian researcher bridging MENA civil society and global AI governance. Leads participatory AI ethics projects in Arabic-speaking communities.',
      focus: ['Education', 'Arabic AI', 'Digital Inclusion']
    },
    {
      id: 'rumman-chowdhury',
      name: 'Dr. Rumman Chowdhury',
      initials: 'RC',
      affiliation: 'Humane Intelligence (Founder)',
      region: 'Global',
      methods: ['Algorithmic auditing', 'Red-teaming', 'Public ML accountability'],
      bio: 'Pioneer in algorithmic auditing and ML accountability. Former Twitter Responsible ML lead. Founded Humane Intelligence, a non-profit AI audit organization. Developed public model evaluation frameworks adopted by NIST.',
      focus: ['Auditing', 'Accountability', 'Red-teaming']
    },
    {
      id: 'aimee-knight',
      name: 'Aimee Rinehart',
      initials: 'AR',
      affiliation: 'Partnership on AI',
      region: 'Global',
      methods: ['Multi-stakeholder governance', 'AI incident documentation', 'Civil society engagement'],
      bio: 'Leads AI incident research at Partnership on AI. Maintains the AI Incident Database (AIID) — a repository of real-world AI harms. Advocates for mandatory incident reporting in AI governance frameworks.',
      focus: ['Incident Reporting', 'Governance', 'Civil Society']
    },
    {
      id: 'joanna-bryson',
      name: 'Prof. Joanna Bryson',
      initials: 'JB',
      affiliation: 'Hertie School of Governance (Berlin)',
      region: 'Global',
      methods: ['AI policy design', 'Cognitive science', 'Institutional analysis'],
      bio: 'Digital society and AI governance expert. Advised UK, EU, and OECD on AI regulation frameworks. Known for "Robots Should Be Slaves" and embedding AI ethics in computer science curriculum.',
      focus: ['Policy', 'Governance Institutions', 'AI Rights']
    },
    {
      id: 'abeba-birhane',
      name: 'Dr. Abeba Birhane',
      initials: 'AB',
      affiliation: 'Mozilla Foundation / Trinity College Dublin',
      region: 'Global', origin: 'Ethiopian',
      methods: ['Value alignment auditing', 'Dataset analysis', 'Cognitive science'],
      bio: 'Senior Researcher at Mozilla Foundation. Ethiopian-origin scholar examining embedded values in AI datasets and models. Published influential audits of foundational datasets (LAION, ImageNet) revealing systematic bias.',
      focus: ['Datasets', 'Value Alignment', 'Bias Auditing']
    },
    {
      id: 'maha-yahya',
      name: 'Maha Yahya',
      initials: 'MY',
      affiliation: 'Carnegie Middle East Center',
      region: 'MENA', origin: 'Lebanese',
      methods: ['Political economy analysis', 'Digital governance research', 'Policy recommendations'],
      bio: 'Director of Carnegie Middle East Center. Analyzes political economy of technology adoption in the Arab world, with focus on how authoritarian governments leverage AI for social control.',
      focus: ['MENA Governance', 'Authoritarianism', 'Digital Society']
    },
    {
      id: 'sheikh-ali',
      name: 'Dr. Omar Al-Olama',
      initials: 'OA',
      affiliation: 'UAE Ministry of AI',
      region: 'MENA', origin: 'Emirati',
      methods: ['AI policy development', 'Stakeholder engagement', 'Capacity building'],
      bio: 'UAE Minister of State for AI — the world\'s first AI minister. Leads UAE\'s AI national strategy. Advocates for "responsible AI" within Gulf governance model. Controversial figure: praised for institutional AI mainstreaming, criticized for legitimizing state-controlled AI frameworks.',
      focus: ['AI Strategy', 'Gulf Governance', 'State AI']
    },
    {
      id: 'safiya-noble',
      name: 'Prof. Safiya Umoja Noble',
      initials: 'SN',
      affiliation: 'UCLA / Center on Race & Digital Justice',
      region: 'Global',
      methods: ['Critical race theory', 'Information science', 'Algorithm accountability'],
      bio: 'Author of "Algorithms of Oppression" (2018). Demonstrates how search algorithms reinforce racist stereotypes. Founded the Center on Race and Digital Justice at UCLA. MacArthur Fellow, 2021.',
      focus: ['Racial Justice', 'Search Algorithms', 'Oppression']
    },
    {
      id: 'kate-crawford',
      name: 'Prof. Kate Crawford',
      initials: 'KC',
      affiliation: 'USC Annenberg / AI Now Institute',
      region: 'Global',
      methods: ['Political economy of AI', 'Resource extraction analysis', 'Labor & supply chain research'],
      bio: 'Author of "Atlas of AI" (2021). Maps the material, political, and environmental costs of AI systems including rare earth mining, logistics labor, and planetary compute carbon footprint. Co-founder AI Now Institute.',
      focus: ['Political Economy', 'Environment', 'Labor']
    }
  ],

  policyPapers: [
    {
      id: 'eu-ai-act',
      policy: { name: 'EU Artificial Intelligence Act', year: 2024, type: 'Binding Regulation', body: 'European Parliament & Council', url: 'https://eur-lex.europa.eu' },
      summary: 'World\'s first comprehensive AI regulation. Risk-based approach: prohibited AI (social scoring, real-time biometrics), high-risk AI (medical, judiciary, critical infra), limited-risk AI (chatbots), minimal-risk AI. Requires conformity assessments, transparency obligations, and a €30M/year AI Office for oversight.',
      rebuttal: { claim: 'Landmark framework risks entrenching EU tech giants while stifling open-source innovation; high-risk classification loopholes allow military AI to bypass most provisions entirely.', source: 'Birhane et al., "AI Act\'s Open Source Exemption is Dangerous", 2024' }
    },
    {
      id: 'unesco-rec',
      policy: { name: 'UNESCO Recommendation on the Ethics of AI', year: 2021, type: 'Non-binding Recommendation', body: 'UNESCO (193 member states)', url: 'https://unesdoc.unesco.org' },
      summary: 'First global AI ethics standard adopted by 193 UNESCO member states. Covers privacy, fairness, sustainability, and inclusion. Emphasizes "AI for sustainable development" and requires national ethics assessments. Explicitly names MENA region as priority area for capacity building.',
      rebuttal: { claim: 'Non-binding nature renders it near-useless against states that use AI for repression while signing the document. Saudi Arabia and UAE are signatories.', source: 'Access Now, "UNESCO AI Recommendation: Governance Without Teeth", 2022' }
    },
    {
      id: 'oecd-principles',
      policy: { name: 'OECD AI Principles', year: 2019, type: 'Policy Principles', body: 'OECD (42 adhering countries)', url: 'https://oecd.ai' },
      summary: 'Five principles: inclusive growth, human-centered values, transparency, security robustness, and accountability. Adopted by G20. Forms the basis for many national AI strategies including UAE AI Policy 2031 and Saudi Vision AI pillar.',
      rebuttal: { claim: 'OECD principles are too abstract and allow self-certification by states and corporations; no mechanism to verify compliance or sanction violations.', source: 'Joanna Bryson, "Conformance Is Not Compliance", Policy Brief 2021' }
    },
    {
      id: 'usa-eo',
      policy: { name: 'US Executive Order on Safe, Secure & Trustworthy AI', year: 2023, type: 'Presidential Executive Order', body: 'White House (Biden admin)', url: 'https://whitehouse.gov' },
      summary: 'Directs federal agencies to assess AI risks, requires safety reports from large model developers (>10²⁶ FLOPs), orders NIST to develop standards for red-teaming, and establishes AI Safety Institute. Also has national security provisions restricting export of frontier AI.',
      rebuttal: { claim: 'EO was revoked by Trump administration January 2025. Demonstrates fragility of executive-order-based AI governance vs. legislative approaches. Compute threshold may exclude future dangerous models.', source: 'AI Now Institute, "The Governance Cliff", Feb 2025' }
    },
    {
      id: 'mena-ai-vision',
      policy: { name: 'UAE National AI Strategy 2031', year: 2017, type: 'National Strategy', body: 'UAE Ministry of AI', url: 'https://ai.gov.ae' },
      summary: 'Positions UAE as top-5 AI nation by 2031. Key pillars: 2,000 AI specialists trained annually, government AI adoption mandate, Falcon LLM sovereignty, and international AI diplomacy. World\'s first AI minister appointed.',
      rebuttal: { claim: 'Strategy does not include civil society participation, algorithmic audit requirements, or judicial oversight. G42\'s role as primary implementation partner creates conflict of interest given its security intelligence ties.', source: 'Future of Privacy Forum / EFF MENA analysis, 2022' }
    },
    {
      id: 'african-union-ai',
      policy: { name: 'African Union Continental AI Policy Framework', year: 2024, type: 'Regional Policy Framework', body: 'African Union Commission', url: 'https://au.int' },
      summary: 'First continental AI governance framework for Africa including North African MENA states (Morocco, Algeria, Tunisia, Egypt, Libya). Emphasizes data sovereignty, technology transfer, and "AI for development" principles. Morocco and Tunisia are named lead implementers.',
      rebuttal: { claim: 'Framework does not address surveillance capitalism or authoritarian AI; Ethiopia, Zimbabwe, Rwanda AI use cases demonstrate framework\'s silence on civil rights is a design feature, not an omission.', source: 'Research ICT Africa / Privacy International, 2024' }
    }
  ],

  organizations: [
    { name: 'AI Now Institute', type: 'Research', icon: '🔬', region: 'Global', url: 'ainowinstitute.org', desc: 'Interdisciplinary research center at NYU. Produces landmark annual reports on AI accountability, labor, and power. Co-founded by Kate Crawford and Meredith Whittaker.' },
    { name: 'Partnership on AI', type: 'Multi-stakeholder', icon: '🤝', region: 'Global', url: 'partnershiponai.org', desc: 'Brings together industry (Apple, Amazon, Google, Microsoft) and civil society to develop AI best practices. Maintains the AI Incident Database.' },
    { name: 'Algorithmic Justice League', type: 'Advocacy', icon: '✊', region: 'Global', url: 'ajl.org', desc: 'Founded by Joy Buolamwini. Combines art, research, and advocacy to highlight social implications of AI. Known for Gender Shades project exposing facial recognition bias.' },
    { name: 'Access Now', type: 'Civil Society', icon: '🛡️', region: 'Global/MENA', url: 'accessnow.org', desc: 'Digital rights NGO with MENA-specific focus. Operates digital security helpline, documents internet shutdowns, and advocates against surveillance technology exports to authoritarian states.' },
    { name: 'SMEX', type: 'Civil Society', icon: '🌐', region: 'MENA', url: 'smex.org', desc: 'Social Media Exchange. Beirut-based NGO focusing on MENA internet freedom, content moderation bias in Arabic, and digital rights policy advocacy.' },
    { name: '7amleh – Arab Center for Social Media', type: 'Civil Society', icon: '🕊️', region: 'MENA', url: '7amleh.org', desc: 'Documents systematic discrimination against Palestinian and Arabic content on social media platforms. Publishes annual platform accountability index.' },
    { name: 'Privacy International', type: 'Watchdog', icon: '🔍', region: 'Global', url: 'privacyinternational.org', desc: 'Documents privacy violations worldwide. Special focus on surveillance technology exports from EU/US to authoritarian MENA states. Legal interventions at ECHR.' },
    { name: 'Electronic Frontier Foundation (EFF)', type: 'Advocacy', icon: '⚖️', region: 'Global', url: 'eff.org', desc: 'Pioneer digital rights organization. Extensive MENA-related litigation and documentation of surveillance tech (DPI exports, Pegasus, Face Recognition). Publishes detailed MENA surveillance reports.' },
    { name: 'Citizen Lab', type: 'Research', icon: '🔬', region: 'Global', url: 'citizenlab.ca', desc: 'University of Toronto interdisciplinary lab. World leader in documenting NSO Pegasus spyware, FinFisher, and state-sponsored cyber attacks against MENA activists.' },
    { name: 'OECD AI Policy Observatory', type: 'Intergovernmental', icon: '🏛️', region: 'Global', url: 'oecd.ai', desc: 'Official OECD platform tracking national AI strategies, AI principles adoption, and computing infrastructure across 42+ member states.' },
    { name: 'Arab Digital Expression Foundation', type: 'Civil Society', icon: '🗣️', region: 'MENA', url: 'adef.org', desc: 'Egyptian-based foundation supporting digital rights, expression, and safety for Arab activists, journalists, and civil society in the MENA region.' },
    { name: 'DAIR Institute', type: 'Research', icon: '🔭', region: 'Global', url: 'dair-institute.org', desc: 'Distributed AI Research Institute. Founded by Timnit Gebru. Centers community-driven AI research that prioritizes historically marginalized populations globally, including MENA.' },
    { name: 'Qatar Computing Research Institute (QCRI)', type: 'Research', icon: '💻', region: 'MENA', url: 'qcri.org', desc: 'World-class Arabic NLP and AI research institute within HBKU (Qatar). Produces landmark Arabic datasets (ArSentD, QA datasets) and NLP models.' },
    { name: 'Technology Innovation Institute (TII)', type: 'Research', icon: '🚀', region: 'MENA', url: 'tii.ae', desc: 'UAE\'s flagship AI research organization. Produces Falcon series of open-weight LLMs — among the most downloaded models globally on Hugging Face.' }
  ],

  // ══════════════════════════════════════════════════════════
  //  MODULE C – LITERACY PORTAL
  // ══════════════════════════════════════════════════════════

  guides: [
    {
      id: 'ai-governance',
      emoji: '🏛️',
      title: 'AI Governance 101',
      subtitle: 'How societies regulate artificial intelligence',
      colorAccent: 'var(--accent-teal)',
      sections: [
        {
          heading: 'What is AI Governance?',
          body: 'AI governance refers to the frameworks, laws, institutions, and norms that guide how artificial intelligence systems are developed, deployed, and held accountable. It operates at multiple levels: international (UNESCO, OECD), regional (EU AI Act), national (UAE AI Strategy, Saudi PDPL), and corporate (internal AI ethics boards).'
        },
        {
          heading: 'Key Governance Approaches',
          body: 'Three main philosophies dominate: (1) Risk-based regulation — categorize AI by potential harm (EU approach); (2) Principles-based — set broad ethical principles and trust industry self-compliance (OECD/UNESCO approach); (3) Sectoral — regulate AI within specific industries (financial AI, medical AI, autonomous vehicles separately).'
        },
        {
          heading: 'The MENA Governance Landscape',
          body: 'Gulf states (UAE, Saudi Arabia, Qatar) have adopted proactive AI strategies but with minimal civil society input. North Africa (Morocco, Tunisia) have stronger data protection traditions. Conflict states (Syria, Yemen, Libya) have no functional governance frameworks. The region lacks a unified MENA AI governance body equivalent to the EU.'
        },
        {
          heading: 'Why It Matters',
          body: 'Without governance, AI systems can: perpetuate systemic bias in hiring and lending; enable mass surveillance without judicial oversight; concentrate economic power in few hands; generate weapons with no accountability chain; and create environmental harm through unregulated compute energy consumption.'
        }
      ]
    },
    {
      id: 'sovereignty-loops',
      emoji: '🌐',
      title: 'Sovereignty Loops',
      subtitle: 'Who controls the AI stack — and what that means',
      colorAccent: 'var(--accent-gold)',
      sections: [
        {
          heading: 'What is AI Sovereignty?',
          body: 'Technological sovereignty in AI means a nation\'s ability to independently develop, deploy, and control AI systems without dependence on foreign governments or corporations. It encompasses: training data sovereignty, compute hardware independence, model ownership, and algorithmic governance capacity.'
        },
        {
          heading: 'The Dependency Loop',
          body: 'Most MENA nations are caught in a sovereignty paradox: they invest billions in AI infrastructure, but the hardware (NVIDIA chips), cloud platforms (AWS, Azure, Google Cloud), and foundational models (GPT-4, Gemini) are controlled by US or Chinese corporations. Investment creates dependency — not independence.'
        },
        {
          heading: 'Breaking the Loop: Falcon & Jais',
          body: 'UAE\'s Falcon (TII) and Jais (Inception AI/G42) represent genuine sovereignty attempts — large language models developed and open-sourced within the region. However, training these models required NVIDIA A100 GPUs manufactured in Taiwan and assembled using supply chains dominated by foreign multinationals.'
        },
        {
          heading: 'The Data Sovereignty Dimension',
          body: 'Arabic language AI systems trained on Arabic-language internet data effectively mine the cultural, political, and behavioral patterns of 400M+ Arabic speakers — potentially for foreign corporations. Data sovereignty asks: should Arabic digital cultural production belong to the companies that scrape it, or to the communities that created it?'
        }
      ]
    },
    {
      id: 'privacy-paradox',
      emoji: '🔐',
      title: 'The Privacy Paradox',
      subtitle: 'When data protection law fails to protect',
      colorAccent: '#A78BFA',
      sections: [
        {
          heading: 'The Paradox Defined',
          body: 'The Privacy Paradox describes the gap between the formal existence of data protection law and the actual protection of citizens\' digital rights. A country can have a GDPR-equivalent law on paper while simultaneously operating mass surveillance infrastructure — both are true at once.'
        },
        {
          heading: 'The MENA Privacy Stack',
          body: 'Consider UAE: The PDPL (2022) grants erasure rights and consent requirements. Simultaneously, the government uses tools to surveil activists, the DPA lacks independence, and national security exemptions create de facto surveillance zones. The law becomes a compliance performance rather than a protection mechanism.'
        },
        {
          heading: 'Who Does Privacy Law Actually Protect?',
          body: 'Privacy law typically protects against corporate data misuse better than state surveillance. GDPR-style laws were designed for the corporate internet economy, not authoritarian surveillance states. In MENA contexts, activists, journalists, and political opponents face state-level threats that data protection law cannot reach.'
        },
        {
          heading: 'The Consent Architecture Problem',
          body: 'Modern AI systems make meaningful consent architecturally impossible: ML models trained on scraped data cannot be "un-trained" on your data; derived inferences (your political views, health status, financial risk) are not covered by consent; and the consent interface (cookie banners, privacy policies) is designed to maximize acceptance, not genuine informed choice.'
        }
      ]
    }
  ],
  lexicon: [
    { term: 'Compute Sovereignty', category: 'Infrastructure', definition: 'The possession of independent physical hardware resources (such as GPU clusters and hyper-scale data centers) situated inside national borders to execute high-performance workloads without foreign software or hardware lock-in.' },
    { term: 'Data Localization', category: 'Policy', definition: 'Regulatory mandates requiring that digital personal records, transactional data, or metadata generated within a country\'s territory be stored and processed on servers physically located inside national borders.' },
    { term: 'Open-Weight Model', category: 'Infrastructure', definition: 'An AI model whose neural weights and parameters are published publicly (e.g., UAE\'s Falcon), allowing developers to run and audit it locally, though the raw training datasets remain proprietary.' },
    { term: 'GDPR Adequacy Grid', category: 'Policy', definition: 'A framework for comparing third-party countries\' privacy safeguards, independent regulatory authorities, and enforcement mechanisms against the European Union\'s GDPR standard.' },
    { term: 'Brain Drain Loop', category: 'Ecosystem', definition: 'The migration cycle where top academic research talent, software developers, and mathematical experts migrate from developing MENA states to Western tech hubs due to high wages and research capital.' },
    { term: 'Digital Sovereignty Paradox', category: 'Ecosystem', definition: 'The friction arising when a government attempts to enforce legal and architectural control over its domestic digital sphere while relying on US or Chinese infrastructure (such as Microsoft Azure, AWS, and NVIDIA supply chains).' },
    { term: 'Arabic NLP', category: 'Technology', definition: 'Computational techniques and datasets tailored to process, parse, and generate the Arabic language, addressing the grammatical and morphological complexity of Modern Standard Arabic (MSA) and regional dialects.' }
  ]
};

if (typeof module !== 'undefined') {
  module.exports = MARA_DATA;
}
