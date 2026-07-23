import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { targetUrl, method = 'GET', origin = 'https://example.com', headers = {} } = body;

    if (!targetUrl) {
      return NextResponse.json({ error: 'Target URL is required' }, { status: 400 });
    }

    try {
      new URL(targetUrl);
    } catch {
      return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 });
    }

    const requestHeaders = new Headers({
      Origin: origin,
      'User-Agent': 'CORS-Scanner-SaaS-Bot/1.0',
      ...headers,
    });

    const startTime = Date.now();

    const response = await fetch(targetUrl, {
      method: method,
      headers: requestHeaders,
      cache: 'no-store',
      signal: AbortSignal.timeout(8000),
    });

    const responseTimeMs = Date.now() - startTime;
    const responseHeaders: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      responseHeaders[key.toLowerCase()] = value;
    });

    return NextResponse.json({
      status: response.status,
      statusText: response.statusText,
      responseTimeMs,
      headers: responseHeaders,
    });
  } catch (error: unknown) {
    console.error('CORS Scan Proxy Error:', error);

    if (error instanceof Error) {
      if (error.name === 'TimeoutError') {
        return NextResponse.json({ error: 'Target server timed out (8s)' }, { status: 504 });
      }
    }

    return NextResponse.json(
      { error: 'Failed to reach target server. It might be down or blocking proxy requests.' },
      { status: 500 }
    );
  }
}
