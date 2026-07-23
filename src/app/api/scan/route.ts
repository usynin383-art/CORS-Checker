import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // 1. Извлекаем данные из тела запроса к нашему SaaS
    const body = await req.json();
    const { targetUrl, method = 'GET', origin = 'https://example.com', headers = {} } = body;

    // 2. Базовая валидация URL
    if (!targetUrl) {
      return NextResponse.json({ error: 'Target URL is required' }, { status: 400 });
    }

    try {
      new URL(targetUrl);
    } catch {
      return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 });
    }

    // 3. Формируем заголовки, имитируя внешние запросы с разных доменов
    const requestHeaders = new Headers({
      Origin: origin,
      'User-Agent': 'CORS-Scanner-SaaS-Bot/1.0',
      ...headers,
    });

    const startTime = Date.now();

    // 4. Выполняем реальный запрос к тестируемому эндпоинту
    const response = await fetch(targetUrl, {
      method: method,
      headers: requestHeaders,
      cache: 'no-store',
      // Защита от бесконечного ожидания ответа (таймаут 8 секунд)
      signal: AbortSignal.timeout(8000),
    });

    const responseTimeMs = Date.now() - startTime;

    // 5. Собираем все заголовки ответа в плоский объект
    const responseHeaders: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      responseHeaders[key.toLowerCase()] = value;
    });

    // 6. Возвращаем чистые данные для анализа на фронтенде/в Zustand-сторе
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
