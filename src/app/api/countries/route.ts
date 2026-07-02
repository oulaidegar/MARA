import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const countries = await prisma.country.findMany({
      include: {
        dataCenters: true,
        aiModels: true,
        capitalFlows: true,
        organizations: true,
      },
    });

    const countryMap: Record<string, any> = {};
    countries.forEach(c => {
      countryMap[c.id] = {
        id: c.id,
        name: c.name,
        shortName: c.shortName,
        flag: c.flag,
        tier: c.tier,
        region: c.region,
        scores: {
          compute: c.computeScore,
          privacy: c.privacyScore,
          governance: c.governanceScore,
        },
        demographics: {
          gdp: c.gdp,
          gdpGrowth: c.gdpGrowth,
          gdpPPP: c.gdpPPP,
          population: c.population,
          populationGrowth: c.populationGrowth,
          avgWage: c.avgWage,
          medianAge: c.medianAge,
          stemGrads: c.stemGrads,
          stemGradGrowth: c.stemGradGrowth,
          literacy: c.literacy,
          internetPenetration: c.internetPenetration,
          diaspora: c.diaspora,
        },
        privacy: {
          laws: c.laws,
          adequacy: c.privacyAdequacy,
          gdprGrid: c.gdprGrid,
        },
        infrastructure: {
          dataCenters: c.dataCenters,
          aiModels: c.aiModels,
          capitalFlows: c.capitalFlows,
        },
        disputes: {
          official: c.officialDisputes,
          critique: c.critiqueDisputes,
        },
      };
    });

    return NextResponse.json(countryMap);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, flag, name, shortName, tier, region, scores, demographics, privacy, disputes, infrastructure } = body;

    if (!id) {
      return NextResponse.json({ error: 'Missing country ID' }, { status: 400 });
    }

    const updated = await prisma.country.update({
      where: { id },
      data: {
        flag: flag,
        name: name,
        shortName: shortName,
        tier: parseInt(tier) || 1,
        region: region,
        computeScore: parseInt(scores?.compute) || 0,
        privacyScore: parseInt(scores?.privacy) || 0,
        governanceScore: parseInt(scores?.governance) || 0,
        gdp: demographics?.gdp,
        gdpGrowth: demographics?.gdpGrowth,
        gdpPPP: demographics?.gdpPPP,
        population: demographics?.population,
        populationGrowth: demographics?.populationGrowth,
        avgWage: demographics?.avgWage,
        medianAge: parseFloat(demographics?.medianAge) || 30.0,
        stemGrads: parseInt(demographics?.stemGrads) || 0,
        stemGradGrowth: demographics?.stemGradGrowth,
        literacy: demographics?.literacy,
        internetPenetration: demographics?.internetPenetration,
        privacyAdequacy: privacy?.adequacy,
        laws: privacy?.laws || [],
        gdprGrid: privacy?.gdprGrid || {},
        diaspora: demographics?.diaspora || [],
        officialDisputes: disputes?.official || [],
        critiqueDisputes: disputes?.critique || [],
      }
    });

    if (infrastructure?.dataCenters) {
      await prisma.dataCenter.deleteMany({ where: { countryId: id } });
      for (const dc of infrastructure.dataCenters) {
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
            countryId: id
          }
        });
      }
    }

    if (infrastructure?.aiModels) {
      await prisma.aiModel.deleteMany({ where: { countryId: id } });
      for (const m of infrastructure.aiModels) {
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
            countryId: id
          }
        });
      }
    }

    if (infrastructure?.capitalFlows) {
      await prisma.capitalFlow.deleteMany({ where: { countryId: id } });
      for (const f of infrastructure.capitalFlows) {
        await prisma.capitalFlow.create({
          data: {
            investor: f.investor,
            amount: f.amount,
            target: f.target,
            year: parseInt(f.year) || 2024,
            type: f.type,
            note: f.note,
            countryId: id
          }
        });
      }
    }

    return NextResponse.json({ success: true, updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
