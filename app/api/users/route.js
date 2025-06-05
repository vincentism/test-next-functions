// export const runtime = 'edge';
let counter = 1;
export async function GET() {
  // 模拟数据变化：每20秒返回不同的值
  if (Math.floor(Date.now() / 1000) % 10 < 10) {
    res = { value: counter };
  } else {
    counter += 1;
    res = { value: counter };
  }

  

  counter++;
  const res = { value: counter }

  console.log('counter', counter);
  return new Response(JSON.stringify(res), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

