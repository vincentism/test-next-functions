// // export const runtime = 'edge';
// let counter = 1;
// export async function GET() {
//   // 模拟数据变化：每20秒返回不同的值
//   if (Math.floor(Date.now() / 1000) % 10 < 10) {
//     res = { value: counter };
//   } else {
//     counter += 1;
//     res = { value: counter };
//   }

  

//   counter++;
//   const res = { value: counter }

//   console.log('counter', counter);
//   return new Response(JSON.stringify(res), {
//     status: 200,
//     headers: { 'Content-Type': 'application/json' }
//   });
// }



import { NextRequest } from 'next/server';

// export const runtime = 'edge';

var path = require("path");
var fs = require("fs");
console.log('fs.readdir', __dirname, fs.readdir);
var pathName = __dirname;
fs.readdir(pathName, function(err, files){
    var dirs = [];
    (function iterator(i){
      if(i == files.length) {
        console.log(dirs);
        return ;
      }
      fs.stat(path.join(pathName, files[i]), function(err, data){     
        if(data.isFile()){               
            dirs.push(files[i]);
        }
        iterator(i+1);
       });   
    })(0);
});


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

