// localhost:3000/meals/something
import Image from "next/image";
import classes from "./page.module.css";

import { getMeal } from "@/lib/meals";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const meal = getMeal(params.mealSlug);
  return {
    title: meal.title,
    description: meal.summary,
  };
}

export default function MealsDetailPage({ params }) {
  const meal = getMeal(params.mealSlug);

  // 유저가 존재하지 않는 메뉴의 상세페이지에 접근하려고 할 때 not-found.js 렌더링
  if (!meal) {
    notFound(); // next/navigation의 특별함수: 현재 위치에서 가장 가까운 error.js파일이나 not-found.js을 출력한다. (not-found.js와 error.js가 같은 경로에 존재할 경우, not-found.js가 우선적으로 렌더링되고, 꼭 같은 폴더가 아니더라도, 글로벌에 위치한 파일이 출력될 수도 있음.)
  }

  meal.instructions = meal.instructions.replace(/\n/g, "<br />");

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meal.image} alt={meal.title} fill />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>

      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: meal.instructions,
          }}
        ></p>
      </main>
    </>
  );
}
