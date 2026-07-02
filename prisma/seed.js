const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const MARA_DATA = require('../js/data.js');
const DEFAULT_NETWORK_DATA = require('../js/network-data.js');

async function main() {
  console.log('🌱 Starting database seed...');

  // 1. Clear existing data in reverse order of dependencies
  console.log('🗑️ Clearing existing records...');
  await prisma.systemSettings.deleteMany({});
  await prisma.pdfText.deleteMany({});
  await prisma.networkEdge.deleteMany({});
  await prisma.networkNode.deleteMany({});
  await prisma.lexiconTerm.deleteMany({});
  await prisma.guideSection.deleteMany({});
  await prisma.guide.deleteMany({});
  await prisma.organization.deleteMany({});
  await prisma.policyPaper.deleteMany({});
  await prisma.ethicsFigure.deleteMany({});
  await prisma.capitalFlow.deleteMany({});
  await prisma.aiModel.deleteMany({});
  await prisma.dataCenter.deleteMany({});
  await prisma.country.deleteMany({});

  // 2. Seed System Settings
  console.log('⚙️ Seeding system settings...');
  await prisma.systemSettings.create({
    data: {
      id: 'global',
      tagline: 'Middle East & North Africa Research Archive',
      mission: 'Mapping compute resources, intelligence pipelines, and algorithmic sovereignty loops across the MENA region.',
      vision: 'Establishing open access transparency on national AI investments, privacy laws, and civil criticisms.'
    }
  });

  // 3. Seed Countries and their associated infrastructures
  console.log('🌍 Seeding countries and nested dependencies...');
  for (const [code, c] of Object.entries(MARA_DATA.countries)) {
    // Insert Country core
    await prisma.country.create({
      data: {
        id: c.id,
        name: c.name,
        shortName: c.shortName,
        flag: c.flag,
        tier: c.tier,
        region: c.region,
        computeScore: c.scores?.compute || 0,
        privacyScore: c.scores?.privacy || 0,
        governanceScore: c.scores?.governance || 0,
        
        // Demographics
        gdp: c.demographics.gdp,
        gdpGrowth: c.demographics.gdpGrowth,
        gdpPPP: c.demographics.gdpPPP,
        population: c.demographics.population,
        populationGrowth: c.demographics.populationGrowth,
        avgWage: c.demographics.avgWage,
        medianAge: parseFloat(c.demographics.medianAge) || 30.0,
        stemGrads: parseInt(c.demographics.stemGrads) || 0,
        stemGradGrowth: c.demographics.stemGradGrowth,
        literacy: c.demographics.literacy,
        internetPenetration: c.demographics.internetPenetration,
        
        // Privacy
        privacyAdequacy: c.privacy.adequacy || 'Pending',
        laws: c.privacy.laws || [],
        gdprGrid: c.privacy.gdprGrid || {},
        
        // Disputes & Diaspora
        diaspora: c.demographics.diaspora || [],
        officialDisputes: c.disputes?.official || [],
        critiqueDisputes: c.disputes?.critique || []
      }
    });

    // Seed Data Centers linked to this country
    if (c.infrastructure?.dataCenters) {
      for (const dc of c.infrastructure.dataCenters) {
        await prisma.dataCenter.create({
          data: {
            name: dc.name,
            location: dc.location,
            megawatts: parseFloat(dc.megawatts) || 0.0,
            tier: dc.tier,
            operator: dc.operator,
            parent: dc.parent,
            solar: dc.solar,
            cooling: dc.cooling,
            certifications: dc.certifications || [],
            countryId: c.id
          }
        });
      }
    }

    // Seed AI Models linked to this country
    if (c.infrastructure?.aiModels) {
      for (const m of c.infrastructure.aiModels) {
        await prisma.aiModel.create({
          data: {
            emoji: m.emoji || '🤖',
            name: m.name,
            developer: m.developer,
            license: m.license,
            architecture: m.architecture,
            params: m.params,
            languages: m.languages || [],
            launched: m.launched,
            countryId: c.id
          }
        });
      }
    }

    // Seed Capital Flows linked to this country
    if (c.infrastructure?.capitalFlows) {
      for (const f of c.infrastructure.capitalFlows) {
        await prisma.capitalFlow.create({
          data: {
            investor: f.investor,
            amount: f.amount,
            target: f.target,
            year: parseInt(f.year) || 2024,
            type: f.type,
            note: f.note,
            countryId: c.id
          }
        });
      }
    }
  }

  // 4. Seed Ethics figures
  console.log('🔬 Seeding ethics figures...');
  for (const f of MARA_DATA.ethicsFigures) {
    await prisma.ethicsFigure.create({
      data: {
        name: f.name,
        role: f.role,
        affiliation: f.affiliation,
        avatar: f.avatar,
        focus: f.focus,
        critique: f.critique,
        stance: f.stance,
        quote: f.quote,
        twitter: f.twitter,
        scholar: f.scholar
      }
    });
  }

  // 5. Seed Policy Papers
  console.log('📄 Seeding policy papers...');
  for (const p of MARA_DATA.policyPapers) {
    await prisma.policyPaper.create({
      data: {
        title: p.title,
        author: p.author,
        source: p.source,
        year: parseInt(p.year) || 2023,
        category: p.category,
        tldr: p.tldr,
        dialectic: p.dialectic || []
      }
    });
  }

  // 6. Seed Civil Organizations
  console.log('🤝 Seeding civil society organizations...');
  for (const o of MARA_DATA.organizations) {
    // Find matching country if it exists
    let countryId = null;
    if (o.desc.includes('UAE') || o.org.includes('UAE')) countryId = 'UAE';
    else if (o.desc.includes('Saudi') || o.org.includes('Saudi')) countryId = 'Saudi Arabia';
    else if (o.desc.includes('Jordan') || o.org.includes('Jordan')) countryId = 'Jordan';
    else if (o.desc.includes('Kuwait') || o.org.includes('Kuwait')) countryId = 'Kuwait';

    await prisma.organization.create({
      data: {
        emoji: o.emoji || '🏛️',
        name: o.name,
        role: o.role,
        org: o.org,
        status: o.status,
        statusColor: o.statusColor,
        focus: o.focus,
        desc: o.desc,
        url: o.url,
        countryId: countryId
      }
    });
  }

  // 7. Seed Educational Guides
  console.log('📚 Seeding educational guides...');
  for (const g of MARA_DATA.guides) {
    const guide = await prisma.guide.create({
      data: {
        id: g.id,
        emoji: g.emoji || '📖',
        title: g.title,
        subtitle: g.subtitle,
        colorAccent: g.colorAccent
      }
    });

    if (g.sections) {
      for (const s of g.sections) {
        await prisma.guideSection.create({
          data: {
            heading: s.heading,
            body: s.body,
            guideId: guide.id
          }
        });
      }
    }
  }

  // 8. Seed Lexicon glossary terms
  console.log('📖 Seeding lexicon glossary terms...');
  for (const item of MARA_DATA.lexicon) {
    await prisma.lexiconTerm.create({
      data: {
        term: item.term,
        category: item.category,
        definition: item.definition
      }
    });
  }

  // 9. Seed D3 Network Graph nodes & links
  console.log('🕸️ Seeding network graph nodes...');
  for (const n of DEFAULT_NETWORK_DATA.nodes) {
    await prisma.networkNode.create({
      data: {
        id: n.id,
        label: n.label,
        type: n.type,
        country: n.country || '',
        size: n.size || 2,
        flag: n.flag,
        aum: n.aum,
        founded: n.founded ? String(n.founded) : null,
        tags: n.tags || []
      }
    });
  }

  console.log('🔗 Seeding network graph links...');
  for (const e of DEFAULT_NETWORK_DATA.edges) {
    await prisma.networkEdge.create({
      data: {
        id: e.id,
        source: typeof e.source === 'object' ? e.source.id : e.source,
        target: typeof e.target === 'object' ? e.target.id : e.target,
        label: e.label || '',
        value: parseFloat(e.value) || 0.0,
        year: e.year ? parseInt(e.year) : null
      }
    });
  }

  // 10. Seed PDF Text items (fallback data matching index list or initial assets)
  console.log('📚 Seeding PDF libraries...');
  const pdfs = [
    { title: 'The EU Artificial Intelligence Act', author: 'European Parliament', category: 'Act / Regulation', summary: 'The official legislative text of the European Union Risk-Based AI Act defining prohibited practices and transparency tiers.', url: 'https://artificialintelligenceact.eu/wp-content/uploads/2024/05/AI-Act-Official-Text.pdf' },
    { title: 'UAE National AI Strategy 2031', author: 'UAE Office of AI', category: 'National Strategy', summary: 'Strategy document laying out the United Arab Emirates blueprint to become a global hub for compute assets and AI developers.', url: 'https://ai.gov.ae/wp-content/uploads/2021/07/UAE-National-Strategy-for-Artificial-Intelligence-2031.pdf' },
    { title: 'Saudi Arabia Personal Data Protection Law (PDPL)', author: 'SDAIA', category: 'Act / Regulation', summary: 'Executive regulations and statutory boundaries regarding the processing of personal data inside the Kingdom of Saudi Arabia.', url: 'https://sdaia.gov.sa/en/SDAIA/rules/Documents/PersonalDataProtectionLaw.pdf' }
  ];
  for (const pdf of pdfs) {
    await prisma.pdfText.create({
      data: pdf
    });
  }

  console.log('🏁 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed with error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
