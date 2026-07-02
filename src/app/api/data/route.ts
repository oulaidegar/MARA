import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const [ethicsFigures, policyPapers, organizations, guidesData, lexicon, pdfs] = await Promise.all([
      prisma.ethicsFigure.findMany(),
      prisma.policyPaper.findMany(),
      prisma.organization.findMany(),
      prisma.guide.findMany({ include: { sections: true } }),
      prisma.lexiconTerm.findMany(),
      prisma.pdfText.findMany(),
    ]);

    const guides = guidesData.map(g => ({
      id: g.id,
      emoji: g.emoji,
      title: g.title,
      subtitle: g.subtitle,
      colorAccent: g.colorAccent,
      sections: g.sections.map(s => ({
        heading: s.heading,
        body: s.body,
      })),
    }));

    return NextResponse.json({
      ethicsFigures,
      policyPapers,
      organizations,
      guides,
      lexicon,
      pdfs,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, data } = body;

    if (type === 'guides') {
      await prisma.guideSection.deleteMany({});
      await prisma.guide.deleteMany({});
      for (const g of data) {
        const guide = await prisma.guide.create({
          data: {
            id: g.id || g.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            emoji: g.emoji || '📖',
            title: g.title,
            subtitle: g.subtitle,
            colorAccent: g.colorAccent,
          }
        });
        if (g.sections) {
          for (const s of g.sections) {
            await prisma.guideSection.create({
              data: { heading: s.heading, body: s.body, guideId: guide.id }
            });
          }
        }
      }
    } else if (type === 'lexicon') {
      await prisma.lexiconTerm.deleteMany({});
      for (const item of data) {
        await prisma.lexiconTerm.create({
          data: { term: item.term, category: item.category, definition: item.definition }
        });
      }
    } else if (type === 'pdfs') {
      await prisma.pdfText.deleteMany({});
      for (const item of data) {
        await prisma.pdfText.create({
          data: { title: item.title, author: item.author, category: item.category, summary: item.summary, url: item.url }
        });
      }
    } else if (type === 'ethicsFigures') {
      await prisma.ethicsFigure.deleteMany({});
      for (const item of data) {
        await prisma.ethicsFigure.create({
          data: {
            name: item.name,
            role: item.role,
            affiliation: item.affiliation,
            avatar: item.avatar,
            focus: item.focus,
            critique: item.critique,
            stance: item.stance,
            quote: item.quote,
            twitter: item.twitter,
            scholar: item.scholar
          }
        });
      }
    } else if (type === 'policyPapers') {
      await prisma.policyPaper.deleteMany({});
      for (const item of data) {
        await prisma.policyPaper.create({
          data: {
            title: item.title,
            author: item.author,
            source: item.source,
            year: parseInt(item.year) || 2024,
            category: item.category,
            tldr: item.tldr,
            dialectic: item.dialectic || []
          }
        });
      }
    } else if (type === 'organizations') {
      await prisma.organization.deleteMany({});
      for (const item of data) {
        await prisma.organization.create({
          data: {
            emoji: item.emoji || '🏛️',
            name: item.name,
            role: item.role,
            org: item.org,
            status: item.status,
            statusColor: item.statusColor,
            focus: item.focus,
            desc: item.desc,
            url: item.url
          }
        });
      }
    } else {
      return NextResponse.json({ error: 'Invalid data type' }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
