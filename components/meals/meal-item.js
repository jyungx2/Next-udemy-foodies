import Link from "next/link";
import Image from "next/image";
// Next.js에서 이미지 파일을 불러오는 방식에는 두 가지 주요 방법이 있습니다.

// 1. "로컬 파일" 시스템에서 직접 불러오는 경우 (assets 폴더에서 import)
// > Next.js가 빌드 타임에 이미지의 크기(원본 width, height)를 자동으로 가져올 수 있음.
// > src에 URL이 아닌 직접적인 경로(import한 파일 변수)를 사용함
// > import 문을 사용하여 정적인 이미지를 불러오는 것으로, 동적으로 불러오는 이미지(예: DB에서 가져온 이미지)에는 사용할 수 없음.
// 2. 퍼블릭 폴더 또는 데이터베이스에서 "URL을 통해" 불러오는 경우 (public 폴더 또는 DB 경로 사용)
// ** Next.js의 <Image> 컴포넌트는 로컬 import된 이미지는 width/height를 자동으로 감지하지만, 데이터베이스에서 가져온 이미지나 public/ 폴더에서 직접 참조하는 이미지에는 적용되지 않습니다.
// > 따라서, width와 height를 직접 지정해야 함(자동 감지 불가) 또는, 아래와 같이 fill 속성을 활용하여 자동으로 부모 요소의 크기에 맞춰 이미지를 조정할 수 있음.
// > src에 URL을 넣어야 하므로 정적인 import 불가능하고, 데이터베이스에서 불러온 이미지만 사용할 수 있음.

import classes from "./meal-item.module.css";

export default function MealItem({ title, slug, image, summary, creator }) {
  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          <Image src={image} alt={title} fill />
        </div>
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{summary}</p>
        <div className={classes.actions}>
          <Link href={`/meals/${slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
}
