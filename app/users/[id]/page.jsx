/* eslint-disable */
// app/posts/[id]/page.js

export default async function PostPage({ params }) {
  const id = (await params).id;
  console.log('start fetch', id);
  // 使用 fetch 在服务端获取数据（默认就是 Server Component）
  const res = await fetch(`http://localhost:8888/api/users`, {
    // 可选：设置缓存策略，Next.js 会结合 revalidate 使用
    next: { revalidate: 10 } // ⚠️ 关键：设置 ISR 的重新验证时间为 10 秒
  });

  const post = await res.json();

  return (
    <main>
      test ISR
      <h1>{JSON.stringify(post)}</h1>
      <hr />
      <small>最后更新时间：{new Date().toLocaleString()}</small>
    </main>
  );
}