import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const [nodes, edges] = await Promise.all([
      prisma.networkNode.findMany(),
      prisma.networkEdge.findMany(),
    ]);

    const formattedNodes = nodes.map(n => ({
      id: n.id,
      label: n.label,
      type: n.type,
      country: n.country,
      size: n.size,
      flag: n.flag,
      aum: n.aum,
      founded: n.founded ? parseInt(n.founded) : null,
      tags: n.tags || [],
    }));

    const formattedEdges = edges.map(e => ({
      id: e.id,
      source: e.source,
      target: e.target,
      label: e.label,
      value: e.value,
      year: e.year,
    }));

    return NextResponse.json({
      nodes: formattedNodes,
      edges: formattedEdges,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, node, edge, nodeId, edgeId } = body;

    if (action === 'saveNode') {
      const savedNode = await prisma.networkNode.upsert({
        where: { id: node.id },
        update: {
          label: node.label,
          type: node.type,
          country: node.country,
          size: parseInt(node.size) || 12,
          flag: node.flag,
          aum: node.aum,
          founded: node.founded ? String(node.founded) : null,
          tags: node.tags || []
        },
        create: {
          id: node.id,
          label: node.label,
          type: node.type,
          country: node.country || '',
          size: parseInt(node.size) || 12,
          flag: node.flag,
          aum: node.aum,
          founded: node.founded ? String(node.founded) : null,
          tags: node.tags || []
        }
      });
      return NextResponse.json({ success: true, node: savedNode });
    }

    if (action === 'deleteNode') {
      await prisma.networkEdge.deleteMany({
        where: {
          OR: [
            { source: nodeId },
            { target: nodeId }
          ]
        }
      });
      await prisma.networkNode.delete({ where: { id: nodeId } });
      return NextResponse.json({ success: true });
    }

    if (action === 'saveEdge') {
      const savedEdge = await prisma.networkEdge.upsert({
        where: { id: edge.id },
        update: {
          source: edge.source,
          target: edge.target,
          label: edge.label,
          value: parseFloat(edge.value) || 0.0,
          year: edge.year ? parseInt(edge.year) : null
        },
        create: {
          id: edge.id,
          source: edge.source,
          target: edge.target,
          label: edge.label,
          value: parseFloat(edge.value) || 0.0,
          year: edge.year ? parseInt(edge.year) : null
        }
      });
      return NextResponse.json({ success: true, edge: savedEdge });
    }

    if (action === 'deleteEdge') {
      await prisma.networkEdge.delete({ where: { id: edgeId } });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
