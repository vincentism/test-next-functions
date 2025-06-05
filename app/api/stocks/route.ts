
import { NextRequest } from 'next/server';
 
export const runtime = 'edge';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {

  console.log('params', params);

  // const response = await fetch('https://money.finance.sina.com.cn/quotes_service/api/json_v2.php/CN_MarketData.getKLineData?symbol=sz002095&scale=60&ma=no&datalen=2', {
  const response = await fetch('http://hq.sinajs.cn/list=sh600519', {
    next: { revalidate: 3600 },
    // cache: 'no-store',
    headers: { Referer: 'https://finance.sina.com.cn/' },
  });


  const data = await response.text();

  // const id = (await params).id;
  // e.g. Query a database for user with ID `id`
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
