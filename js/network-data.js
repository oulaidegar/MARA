/* ============================================================
   MARA – Network Graph Pre-seeded Data
   MENA Investment & AI Ecosystem Knowledge Graph
   ============================================================ */

const NETWORK_NODE_TYPES = {
  swf:         { label: 'Sovereign Wealth Fund', color: '#F5C842', glow: 'rgba(245,200,66,0.5)',   icon: '🏦', baseSize: 18 },
  vc:          { label: 'Venture Capital',       color: '#A78BFA', glow: 'rgba(167,139,250,0.5)', icon: '💼', baseSize: 13 },
  bigtech:     { label: 'Big Tech Corp.',        color: '#00D4AA', glow: 'rgba(0,212,170,0.5)',   icon: '💻', baseSize: 16 },
  startup:     { label: 'Portfolio / Startup',   color: '#60A5FA', glow: 'rgba(96,165,250,0.5)',  icon: '🚀', baseSize: 10 },
  ai:          { label: 'AI / Tech Entity',      color: '#F87171', glow: 'rgba(248,113,113,0.5)', icon: '🤖', baseSize: 13 },
  gov:         { label: 'Government Entity',     color: '#34D399', glow: 'rgba(52,211,153,0.5)',  icon: '🏛️', baseSize: 14 },
  accelerator: { label: 'Accelerator / Hub',     color: '#FB923C', glow: 'rgba(251,146,60,0.5)',  icon: '⚡', baseSize: 10 },
  person:      { label: 'Individual',            color: '#94A3B8', glow: 'rgba(148,163,184,0.5)', icon: '👤', baseSize: 9  }
};

const DEFAULT_NETWORK_DATA = {
  nodes: [
    // ── Sovereign Wealth Funds ──────────────────────────────────
    { id:'pif', label:'Public Investment Fund', type:'swf', country:'Saudi Arabia', flag:'🇸🇦', size:5,
      description:'Saudi Arabia\'s sovereign wealth fund managing $750B+ in assets. Primary vehicle for Vision 2030 tech investment including HUMAIN, NEOM, and STC. Directly backed SoftBank Vision Fund ($45B LP). Created by Royal Decree in 2015, chaired by Crown Prince MBS.',
      aum:'$750B+', founded:2015, tags:['Saudi Arabia','Vision 2030','AI','Infrastructure','HUMAIN','SoftBank LP'] },

    { id:'qia', label:'Qatar Investment Authority', type:'swf', country:'Qatar', flag:'🇶🇦', size:4,
      description:'Qatar\'s sovereign wealth fund with $475B in assets. Major global investor in tech, real estate, and financial markets. Holds stakes in Microsoft, Volkswagen, and Credit Suisse. Funds QCRI research institute.',
      aum:'$475B', founded:2005, tags:['Qatar','Global Investment','Microsoft shareholder','QCRI'] },

    { id:'mubadala', label:'Mubadala Investment', type:'swf', country:'UAE', flag:'🇦🇪', size:4,
      description:'Abu Dhabi\'s strategic investment company managing $302B in assets. Created MGX (Abu Dhabi AI fund) in 2024. LP in SoftBank Vision Fund. Invested across global tech, clean energy, and healthcare.',
      aum:'$302B', founded:2002, tags:['UAE','Abu Dhabi','MGX parent','SoftBank LP','AI','Clean Energy'] },

    { id:'adq', label:'ADQ (Abu Dhabi)', type:'swf', country:'UAE', flag:'🇦🇪', size:3,
      description:'Abu Dhabi Developmental Holding Company with $157B+ AUM. Owns Khazna Data Centers — UAE\'s largest DC operator. Focus on food security, utilities, and healthcare. Oracle cloud partnership.',
      aum:'$157B', founded:2018, tags:['UAE','Abu Dhabi','Khazna DC','Infrastructure','Food security'] },

    { id:'adia', label:'ADIA (Abu Dhabi)', type:'swf', country:'UAE', flag:'🇦🇪', size:5,
      description:'Abu Dhabi Investment Authority — one of the world\'s largest SWFs at $993B. Primarily passive investment across global equities, bonds, and real estate. Shareholder in Alphabet (Google) and major tech companies.',
      aum:'$993B', founded:1976, tags:['UAE','Abu Dhabi','Passive investor','Alphabet shareholder'] },

    { id:'kia', label:'Kuwait Investment Authority', type:'swf', country:'Kuwait', flag:'🇰🇼', size:4,
      description:'One of the oldest SWFs in the world ($768B AUM). Conservative investment strategy. Holds stakes in Mercedes-Benz, BP, and major global financial institutions.',
      aum:'$768B', founded:1953, tags:['Kuwait','Conservative','Global equities','Long-term'] },

    // ── AI / Tech Entities ──────────────────────────────────────
    { id:'mgx', label:'MGX (Abu Dhabi AI)', type:'ai', country:'UAE', flag:'🇦🇪', size:4,
      description:'Abu Dhabi\'s primary AI and emerging technology investment vehicle. Created by Mubadala (2024). Led $6B investment into OpenAI and invested in Anthropic. Focuses on semiconductors, cloud, and frontier AI globally.',
      aum:'$100B+', founded:2024, tags:['UAE','AI Investment','OpenAI','Anthropic','Mubadala child','Semiconductors'] },

    { id:'humain', label:'HUMAIN', type:'ai', country:'Saudi Arabia', flag:'🇸🇦', size:4,
      description:'Saudi Arabia\'s sovereign AI company, wholly owned by PIF. $40B investment vehicle. Announced at LEAP 2025 in Riyadh. Partnered with NVIDIA ($700M, 18K H100 GPUs), AWS, Google, and Qualcomm for AI infrastructure. Jensen Huang attended personally.',
      aum:'$40B', founded:2025, tags:['Saudi Arabia','Sovereign AI','NVIDIA','PIF child','Stargate SA','H100 GPUs'] },

    { id:'g42', label:'Group 42 (G42)', type:'ai', country:'UAE', flag:'🇦🇪', size:4,
      description:'Abu Dhabi-based AI and cloud computing company. Received $1.5B investment from Microsoft (2024). Co-developed Jais Arabic LLM with MBZUAI. Controversial former Huawei hardware ties, partially divested under US pressure. Chairman: Sheikh Tahnoon bin Zayed.',
      founded:2018, tags:['UAE','AI','Cloud','Microsoft $1.5B','Jais LLM','Sheikh Tahnoon','Former Huawei'] },

    { id:'tii', label:'Technology Innovation Inst.', type:'ai', country:'UAE', flag:'🇦🇪', size:3,
      description:'UAE\'s advanced research institute under ATRC/Abu Dhabi Government. Created Falcon series — world\'s top open-weight LLMs (Apache 2.0 license). Trained on UAE sovereign compute infrastructure.',
      founded:2020, tags:['UAE','Falcon LLM','Open Source','Apache 2.0','Research','ATRC'] },

    { id:'mbzuai', label:'MBZUAI', type:'ai', country:'UAE', flag:'🇦🇪', size:3,
      description:'Mohamed bin Zayed University of AI — world\'s first AI-dedicated graduate university (Abu Dhabi). Co-developed Jais Arabic LLM with G42/Inception AI. Strong research faculty recruited globally.',
      founded:2019, tags:['UAE','University','AI Research','Jais','Arabic AI','Education'] },

    { id:'qcri', label:'QCRI (Qatar)', type:'ai', country:'Qatar', flag:'🇶🇦', size:3,
      description:'Qatar Computing Research Institute within Hamad Bin Khalifa University. Leading Arabic NLP and AI research center. Developed Nural-7B, major Arabic QA datasets, and Arabic dialect recognition systems.',
      founded:2010, tags:['Qatar','NLP','Arabic AI','HBKU','Nural','Research'] },

    // ── Global Big Tech ─────────────────────────────────────────
    { id:'microsoft', label:'Microsoft', type:'bigtech', country:'USA', flag:'🇺🇸', size:5,
      description:'Microsoft committed $3B+ across MENA: $1.5B stake in G42 (UAE, 2024), Azure hyperscale regions in Saudi Arabia, Qatar, Morocco ($4B+), and partnership with HUMAIN (Stargate ME). Brad Smith and Satya Nadella personally engaged with UAE/Saudi governments.',
      founded:1975, tags:['USA','Azure','G42 stake','HUMAIN partner','OpenAI investor','Morocco','Saudi Arabia'] },

    { id:'google', label:'Google / Alphabet', type:'bigtech', country:'USA', flag:'🇺🇸', size:5,
      description:'Alphabet: $1.5B HUMAIN partnership (Saudi), $4B+ Morocco AI hub (Casablanca), Google Cloud regions in UAE and Saudi Arabia. Atlantic subsea cable landing in Morocco. ADIA is a major Alphabet shareholder.',
      founded:1998, tags:['USA','Cloud','AI','Morocco $4B','HUMAIN partner','Arabic AI','Subsea cable'] },

    { id:'amazon', label:'Amazon / AWS', type:'bigtech', country:'USA', flag:'🇺🇸', size:5,
      description:'AWS invested $6B in Bahrain hyperscale region (first Arab world AWS region, 2019). $5B+ planned for Saudi Arabia. HUMAIN partnership. AWS Middle East anchors regional cloud infrastructure across GCC.',
      founded:1994, tags:['USA','Cloud','Bahrain $6B','HUMAIN partner','Saudi Arabia','GCC anchor'] },

    { id:'nvidia', label:'NVIDIA', type:'bigtech', country:'USA', flag:'🇺🇸', size:5,
      description:'NVIDIA\'s landmark $700M+ hardware deal with HUMAIN (Saudi Arabia, 2025): 18,000 H100/Blackwell GPUs. Core GPU supplier for TII Falcon model training. Jensen Huang attended LEAP Riyadh personally. NVIDIA stock surged after Riyadh visit.',
      founded:1993, tags:['USA','Semiconductors','GPU','H100','HUMAIN deal','Jensen Huang','AI hardware'] },

    { id:'meta', label:'Meta Platforms', type:'bigtech', country:'USA', flag:'🇺🇸', size:4,
      description:'Meta operates a major AI research center in Tel Aviv. Data center partnerships in UAE. Llama models widely fine-tuned across MENA. Arabic language AI for MENA market. Controversial content moderation record for Arabic/Palestinian content.',
      founded:2004, tags:['USA','Llama','Arabic AI','UAE DC','Tel Aviv AI lab','Content moderation'] },

    { id:'oracle', label:'Oracle', type:'bigtech', country:'USA', flag:'🇺🇸', size:4,
      description:'Oracle committed $1.5B to Saudi Arabia cloud infrastructure. OCI (Oracle Cloud Infrastructure) regions operational in UAE and Qatar. Key government cloud provider across GCC. Partnership with ADQ for data center operations.',
      founded:1977, tags:['USA','OCI','Saudi $1.5B','UAE','Qatar','Government cloud','ADQ partner'] },

    { id:'huawei', label:'Huawei', type:'bigtech', country:'China', flag:'🇨🇳', size:4,
      description:'Chinese tech giant with deep MENA infrastructure: Algeria ($700M 4G/5G via Algérie Télécom), Iraq smart cities ($1.1B with Baghdad/Basra), Oman 5G (Omantel), Saudi 5G. G42 forced to divest Huawei equipment under US pressure in 2024 before Microsoft deal closed.',
      founded:1987, tags:['China','5G','Surveillance','Iraq','Algeria','Oman','G42 former partner','MENA infrastructure'] },

    // ── AI Labs ─────────────────────────────────────────────────
    { id:'openai', label:'OpenAI', type:'ai', country:'USA', flag:'🇺🇸', size:5,
      description:'OpenAI received $6B from MGX (UAE) in 2024 — part of massive funding round valuing OpenAI at $157B. Co-created "Stargate ME" initiative with UAE government and PIF. Sam Altman made multiple visits to Abu Dhabi and Riyadh.',
      founded:2015, tags:['USA','GPT','Stargate','MGX $6B','Stargate ME','Sam Altman','UAE','Saudi Arabia'] },

    { id:'anthropic', label:'Anthropic', type:'ai', country:'USA', flag:'🇺🇸', size:4,
      description:'AI safety company founded by ex-OpenAI team. Received investment from MGX (Abu Dhabi) and Google ($2B). Claude models increasingly adopted in MENA enterprises. Competing with OpenAI for sovereign AI partnerships in Gulf.',
      founded:2021, tags:['USA','AI Safety','Claude','MGX investor','Google investor','Gulf expansion'] },

    // ── Venture Capital ─────────────────────────────────────────
    { id:'a16z', label:'Andreessen Horowitz', type:'vc', country:'USA', flag:'🇺🇸', size:4,
      description:'Silicon Valley VC managing $42B+ AUM. Opened Dubai office 2023. MENA-focused fund ($400M+). Portfolio includes Kitopi, Tabby, and 12+ MENA startups. GP partners Marc Andreessen and Ben Horowitz attend Riyadh / Abu Dhabi summits.',
      aum:'$42B+', founded:2009, tags:['USA','VC','Dubai office','Kitopi','Tabby','MENA fund','Web3'] },

    { id:'softbank', label:'SoftBank Vision Fund', type:'vc', country:'Japan', flag:'🇯🇵', size:5,
      description:'SoftBank Vision Fund (SVF1: $100B backed by PIF $45B + Mubadala, SVF2: $56B). Invested in Careem, Kitopi, OYO (India/MENA), Swvl. Masayoshi Son closely aligned with Saudi Vision 2030. Son\'s reputation suffered after WeWork collapse.',
      aum:'$56B (SVF2)', founded:2017, tags:['Japan','Mega Fund','PIF LP $45B','Careem','Kitopi','Swvl','Masayoshi Son'] },

    { id:'stv', label:'STV (Saudi VC)', type:'vc', country:'Saudi Arabia', flag:'🇸🇦', size:3,
      description:'Saudi Technology Ventures — Saudi Arabia\'s largest dedicated VC with $500M+ AUM. Backed by PIF and strategic Saudi corporates (STC, Riyad Bank). Portfolio: Tabby, Tamara, Salla, Foodics, Swvl, Jahez.',
      aum:'$500M+', founded:2017, tags:['Saudi Arabia','VC','PIF backed','Tabby','Tamara','Foodics','Salla'] },

    { id:'wamda', label:'Wamda Capital', type:'vc', country:'UAE', flag:'🇦🇪', size:3,
      description:'Dubai-based VC and ecosystem builder. $75M flagship fund. Portfolio includes Anghami, Fetchr, Kiwi, Yamsafer. Runs Wamda X accelerator. Flat6Labs co-backer. Influential in Levant + North Africa ecosystems.',
      aum:'$75M', founded:2012, tags:['UAE','VC','Anghami','Fetchr','Ecosystem','North Africa','Levant'] },

    { id:'nuwa', label:'Nuwa Capital', type:'vc', country:'UAE', flag:'🇦🇪', size:2,
      description:'UAE-based VC with $200M fund. Female-founded and led — rare in MENA VC. Portfolio includes Saudi and Egyptian startups across fintech, e-commerce, and SaaS. Focus on Seed–Series B.',
      aum:'$200M', founded:2019, tags:['UAE','VC','Female-led','Seed','Series B','Fintech','Saudi','Egypt'] },

    { id:'mevp', label:'Middle East Venture Partners', type:'vc', country:'Lebanon', flag:'🇱🇧', size:3,
      description:'One of MENA\'s most active early-stage VCs. $250M+ AUM. Lebanese-founded, now Dubai HQ. Pioneered MENA VC ecosystem. Led rounds in Kitopi, Swvl, and 50+ tech companies across 15 countries.',
      aum:'$250M+', founded:2010, tags:['Lebanon','UAE','VC','Early-stage','Kitopi','Swvl','MENA pioneer'] },

    { id:'flat6labs', label:'Flat6Labs', type:'accelerator', country:'Egypt', flag:'🇪🇬', size:2,
      description:'MENA\'s largest startup accelerator. Programs in Egypt, Saudi Arabia, UAE, Tunisia, Bahrain, Jordan, Pakistan. Accelerated 1,000+ startups since 2011. Backed by Wamda, USAID, and local governments.',
      founded:2011, tags:['Egypt','Accelerator','MENA','1000+ startups','USAID','Wamda backed','Ecosystem'] },

    { id:'aramco_ventures', label:'Aramco Ventures', type:'vc', country:'Saudi Arabia', flag:'🇸🇦', size:3,
      description:'Corporate VC arm of Saudi Aramco. $1.5B+ AUM. Focus on energy tech, AI for industrial applications, and sustainability. Investments across USA, Europe, and MENA energy-AI convergence companies.',
      aum:'$1.5B+', founded:2012, tags:['Saudi Arabia','Corporate VC','Energy tech','Aramco','Industrial AI','Sustainability'] },

    { id:'sequoia_me', label:'Sequoia Arabia', type:'vc', country:'Saudi Arabia', flag:'🇸🇦', size:3,
      description:'Sequoia Capital\'s MENA affiliate headquartered in Riyadh. $150M+ fund. Invested in Tabby, Sary, Foodics, and major Saudi/UAE tech startups. Part of Sequoia\'s global emerging markets expansion into Southeast Asia, India, and MENA.',
      aum:'$150M+', founded:2020, tags:['Saudi Arabia','VC','Sequoia affiliate','Riyadh','Tabby','Sary','Emerging markets'] },

    // ── Portfolio Companies / Startups ───────────────────────────
    { id:'careem', label:'Careem', type:'startup', country:'UAE', flag:'🇦🇪', size:3,
      description:'MENA\'s first tech unicorn and ride-hailing super app. Founded 2012 in Dubai by Mudassir Sheikha and Magnus Olsson. Acquired by Uber for $3.1B in 2020 — largest-ever MENA tech exit. Now Uber\'s subsidiary. 50+ cities, 33M users, 1.5M captain-drivers.',
      founded:2012, tags:['UAE','Unicorn','Uber acquired $3.1B','Super app','33M users','MENA first exit'] },

    { id:'kitopi', label:'Kitopi', type:'startup', country:'UAE', flag:'🇦🇪', size:3,
      description:'Cloud kitchen platform — first MENA unicorn to reach $1B+ valuation on operating business (not speculation). Raised $415M (SoftBank-led, 2021). Operates 200+ cloud kitchens across MENA. AI-powered demand forecasting and kitchen operations.',
      founded:2018, tags:['UAE','Cloud Kitchen','Unicorn','SoftBank $415M','a16z','200+ kitchens','Food Tech'] },

    { id:'tabby', label:'Tabby', type:'startup', country:'Saudi Arabia', flag:'🇸🇦', size:3,
      description:'Saudi BNPL (Buy Now Pay Later) unicorn. Raised $700M+ across rounds from a16z, STV, Sequoia Arabia, PayPal Ventures. 5M+ users. First Saudi fintech unicorn. Partners with 10,000+ merchants across GCC.',
      founded:2019, tags:['Saudi Arabia','BNPL','Fintech','Unicorn','a16z','STV','Sequoia','5M users'] },

    { id:'tamara', label:'Tamara', type:'startup', country:'Saudi Arabia', flag:'🇸🇦', size:3,
      description:'Saudi BNPL fintech unicorn. $366M raised. Backed by Checkout.com, STV, Coatue Management, Nuwa Capital. 4M+ users. Competitive with Tabby in Saudi and UAE BNPL market.',
      founded:2020, tags:['Saudi Arabia','BNPL','Fintech','Unicorn','STV','Nuwa','Coatue','4M users'] },

    { id:'noon', label:'Noon.com', type:'startup', country:'UAE', flag:'🇦🇪', size:3,
      description:'E-commerce platform backed by Mohamed Alabbar (Emaar founder) and Saudi sovereign investment. $1B initial backing. Competes directly with Amazon in UAE, Saudi Arabia, and Egypt. Noon Food and Noon Grocery extensions.',
      founded:2017, tags:['UAE','E-commerce','Alabbar','Saudi backing','Amazon competitor','Egypt'] },

    { id:'anghami', label:'Anghami', type:'startup', country:'Lebanon', flag:'🇱🇧', size:2,
      description:'First Arab music streaming platform. 100M+ song catalogue. NASDAQ-listed 2022 via SPAC — first Arab tech company on US exchange. Backed by MBC Group, OSN, Rotana Music. Acquired by OSN in 2023.',
      founded:2012, tags:['Lebanon','Music streaming','NASDAQ first Arab','OSN acquired','MBC','Rotana','Arabic content'] },

    { id:'swvl', label:'Swvl', type:'startup', country:'Egypt', flag:'🇪🇬', size:2,
      description:'Egyptian mass transit tech startup. Raised $165M from BECO Capital, SoftBank, VNV Global, STV. NASDAQ-listed via SPAC (2022). Major operational challenges post-listing led to restructuring. Now Dubai HQ.',
      founded:2017, tags:['Egypt','Transit','NASDAQ SPAC','SoftBank','STV','Restructuring','Dubai HQ'] },

    { id:'pure_harvest', label:'Pure Harvest', type:'startup', country:'UAE', flag:'🇦🇪', size:2,
      description:'UAE agri-tech startup using controlled environment agriculture to grow food year-round in the desert. Raised $200M+. Backed by ADQ, Wamda, and global agri-tech investors. AI-controlled greenhouse systems for tomatoes and strawberries.',
      founded:2017, tags:['UAE','Agri-tech','ADQ','Desert farming','Food security','AI greenhouses','200M+ raised'] },

    { id:'uber', label:'Uber Technologies', type:'bigtech', country:'USA', flag:'🇺🇸', size:4,
      description:'Uber acquired Careem in 2020 for $3.1B — largest acquisition in MENA tech history. Uber Eats and Uber One operate across MENA. Data sharing agreements with MENA governments. 15M+ users across region post-merger.',
      founded:2009, tags:['USA','Ride-hailing','Careem $3.1B acquisition','MENA','Uber Eats','Super app'] },

    // ── Government / Regulatory ──────────────────────────────────
    { id:'sdaia', label:'SDAIA (Saudi)', type:'gov', country:'Saudi Arabia', flag:'🇸🇦', size:3,
      description:'Saudi Data and AI Authority — primary AI regulatory and strategy body. Manages NDMO (data protection). Runs NEOM data infrastructure planning. Also operates Absher (digital ID app). Criticized for combining regulatory + operational roles.',
      founded:2019, tags:['Saudi Arabia','AI regulator','PDPL enforcer','NDMO','Absher','NEOM data'] },

    { id:'uaemi', label:'UAE Ministry of AI', type:'gov', country:'UAE', flag:'🇦🇪', size:3,
      description:'World\'s first dedicated AI Ministry. Led by Minister Omar Al-Olama (youngest AI minister globally). Oversees UAE AI Strategy 2031. Coordinates TII, MBZUAI, and G42 alignment. Attends WEF Davos and G7 AI governance forums.',
      founded:2017, tags:['UAE','AI Ministry','Omar Al-Olama','AI Strategy 2031','Policy','WEF','Davos'] }
  ],

  edges: [
    // ── PIF relationships ─────────────────────────────────────
    { id:'e1',  source:'pif',        target:'humain',      label:'Created',              value:40000000000, year:2025 },
    { id:'e2',  source:'pif',        target:'stv',         label:'Established',          value:500000000,   year:2017 },
    { id:'e3',  source:'pif',        target:'softbank',    label:'LP — $45B committed',  value:45000000000, year:2017 },
    { id:'e4',  source:'pif',        target:'microsoft',   label:'Strategic Partnership', value:0,           year:2024 },
    { id:'e5',  source:'pif',        target:'aramco_ventures', label:'Indirect funder',  value:0,           year:2012 },

    // ── Mubadala / MGX ────────────────────────────────────────
    { id:'e6',  source:'mubadala',   target:'mgx',         label:'Created',              value:100000000000, year:2024 },
    { id:'e7',  source:'mubadala',   target:'softbank',    label:'Vision Fund LP',       value:15000000000, year:2017 },
    { id:'e8',  source:'mgx',        target:'openai',      label:'$6B Investment',       value:6000000000,  year:2024 },
    { id:'e9',  source:'mgx',        target:'anthropic',   label:'Strategic Investment', value:500000000,   year:2024 },
    { id:'e10', source:'mgx',        target:'nvidia',      label:'Chip Partnership',     value:0,           year:2024 },

    // ── ADQ ───────────────────────────────────────────────────
    { id:'e11', source:'adq',        target:'pure_harvest',label:'Lead Investor',        value:100000000,   year:2021 },
    { id:'e12', source:'adq',        target:'oracle',      label:'Cloud Partnership',    value:0,           year:2022 },

    // ── ADIA ──────────────────────────────────────────────────
    { id:'e13', source:'adia',       target:'google',      label:'Shareholder',          value:0,           year:2019 },

    // ── QIA ───────────────────────────────────────────────────
    { id:'e14', source:'qia',        target:'microsoft',   label:'Shareholder',          value:0,           year:2020 },
    { id:'e15', source:'qia',        target:'qcri',        label:'Funds Research',       value:0,           year:2010 },

    // ── HUMAIN relationships ──────────────────────────────────
    { id:'e16', source:'humain',     target:'nvidia',      label:'18K H100 GPUs — $700M',value:700000000,   year:2025 },
    { id:'e17', source:'humain',     target:'amazon',      label:'AWS Partnership',      value:0,           year:2025 },
    { id:'e18', source:'humain',     target:'google',      label:'$1.5B Cloud & AI',     value:1500000000,  year:2025 },
    { id:'e19', source:'humain',     target:'microsoft',   label:'Partnership',          value:0,           year:2025 },

    // ── Microsoft investments ─────────────────────────────────
    { id:'e20', source:'microsoft',  target:'g42',         label:'$1.5B Stake',          value:1500000000,  year:2024 },
    { id:'e21', source:'microsoft',  target:'openai',      label:'$13B+ Invested',       value:13000000000, year:2023 },

    // ── Google investments ────────────────────────────────────
    { id:'e22', source:'google',     target:'anthropic',   label:'$2B Investment',       value:2000000000,  year:2023 },
    { id:'e23', source:'google',     target:'tii',         label:'Research Partner',     value:0,           year:2022 },

    // ── G42 / TII / MBZUAI ───────────────────────────────────
    { id:'e24', source:'g42',        target:'mbzuai',      label:'Co-developed Jais LLM',value:0,           year:2023 },
    { id:'e25', source:'g42',        target:'tii',         label:'Research Partner',     value:0,           year:2022 },
    { id:'e26', source:'huawei',     target:'g42',         label:'Former infrastructure partner',value:0,   year:2020 },
    { id:'e27', source:'openai',     target:'g42',         label:'Stargate ME Partner',  value:0,           year:2024 },

    // ── SDAIA / UAE Ministry ──────────────────────────────────
    { id:'e28', source:'sdaia',      target:'humain',      label:'Regulatory Body',      value:0,           year:2025 },
    { id:'e29', source:'uaemi',      target:'tii',         label:'Strategy Oversight',   value:0,           year:2021 },
    { id:'e30', source:'uaemi',      target:'mbzuai',      label:'Co-governs',           value:0,           year:2020 },

    // ── SoftBank portfolio ────────────────────────────────────
    { id:'e31', source:'softbank',   target:'careem',      label:'Invested',             value:200000000,   year:2018 },
    { id:'e32', source:'softbank',   target:'kitopi',      label:'$415M Lead Round',     value:415000000,   year:2021 },
    { id:'e33', source:'softbank',   target:'swvl',        label:'Invested',             value:42000000,    year:2021 },

    // ── Uber acquisition ──────────────────────────────────────
    { id:'e34', source:'uber',       target:'careem',      label:'Acquired — $3.1B',     value:3100000000,  year:2020 },

    // ── a16z MENA ─────────────────────────────────────────────
    { id:'e35', source:'a16z',       target:'kitopi',      label:'Invested',             value:0,           year:2021 },
    { id:'e36', source:'a16z',       target:'tabby',       label:'Lead Investor',        value:0,           year:2022 },

    // ── STV investments ───────────────────────────────────────
    { id:'e37', source:'stv',        target:'tabby',       label:'Lead Round',           value:0,           year:2021 },
    { id:'e38', source:'stv',        target:'tamara',      label:'Invested',             value:0,           year:2022 },
    { id:'e39', source:'stv',        target:'swvl',        label:'Invested',             value:0,           year:2020 },

    // ── Sequoia Arabia ────────────────────────────────────────
    { id:'e40', source:'sequoia_me', target:'tabby',       label:'Invested',             value:0,           year:2022 },

    // ── Wamda ─────────────────────────────────────────────────
    { id:'e41', source:'wamda',      target:'anghami',     label:'Early investor',       value:0,           year:2014 },
    { id:'e42', source:'wamda',      target:'pure_harvest',label:'Invested',             value:0,           year:2019 },
    { id:'e43', source:'wamda',      target:'flat6labs',   label:'Co-founder backer',    value:0,           year:2012 },

    // ── MEVP ──────────────────────────────────────────────────
    { id:'e44', source:'mevp',       target:'kitopi',      label:'Early investor',       value:0,           year:2019 },
    { id:'e45', source:'mevp',       target:'swvl',        label:'Invested',             value:0,           year:2018 },

    // ── Nuwa Capital ──────────────────────────────────────────
    { id:'e46', source:'nuwa',       target:'tamara',      label:'Invested',             value:0,           year:2021 },

    // ── NVIDIA additional ─────────────────────────────────────
    { id:'e47', source:'nvidia',     target:'tii',         label:'GPU supply for Falcon',value:0,           year:2023 },

    // ── Noon ──────────────────────────────────────────────────
    { id:'e48', source:'adq',        target:'noon',        label:'Strategic backer',     value:0,           year:2020 }
  ]
};
