import sql from "better-sqlite3";

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 5000));

  // throw new Error("Loading meals failed");
  return db.prepare("SELECT * FROM meals").all();
}

// 위의 모든 리스트(getMeals)를 가져올 때처럼 비동기적으로(async-await) 가져올 필요 없다.
// 일부러 로딩페이지 구현을 딜레이를 유발하기 위해 쓴 타임아웃 코드이다.
export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}
