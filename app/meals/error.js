"use client"; // error.js must be a Client Component!
// Next.js에서는 특정 페이지나 레이아웃에서 오류가 발생했을 때, 이를 처리하기 위해 error.js 파일을 사용할 수 있습니다. 하지만 이 파일이 무조건 클라이언트 컴포넌트여야만 하는 이유는 클라이언트에서 발생하는 오류까지도 처리할 수 있도록 보장하기 때문입니다.

export default function Error({ error }) {
  return (
    <main className="error">
      <h1>An error occurred!</h1>
      <p>Failed to fetch meal data. Please try again later.</p>
    </main>
  );
}
