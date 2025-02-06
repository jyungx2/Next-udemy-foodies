import fs from "node:fs"; // allwos us to work with the file system.

import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

const db = sql("meals.db");

// Getting Meals
export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 5000));

  // throw new Error("Loading meals failed");
  return db.prepare("SELECT * FROM meals").all();
}

// Getting a single meal
// 위의 모든 리스트(getMeals)를 가져올 때처럼 비동기적으로(async-await) 가져올 필요 없다.
// 일부러 로딩페이지 구현을 딜레이를 유발하기 위해 쓴 타임아웃 코드이다.
export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

// Saving a meal (122)
export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`; // general user file name (not file name of the user)

  const stream = fs.createWriteStream(`public/images/${fileName}`); // This will create a stream that allows us to write data to a certain file.

  const bufferedImage = await meal.image.arrayBuffer(); //
  stream.write(Buffer.from(bufferedImage), (err) => {
    if (err) {
      throw new Error("Saving Image Failed!");
    }
  });

  meal.image = `/images/${fileName}`;
  db.prepare(
    `INSERT INTO meals 
        (title, summary, instructions, creator, creator_email, image, slug)
      VALUES (@title, @summary, @instructions, @creator, @creator_email, @image, @slug)`
  ).run(meal);
}
