"use client"; // 🚨서버액션을 실행하는 shareMeal 함수를 lib 폴더 안으로 분리하면 에러가 발생하지 않음.
// 이유: Next.js의 빌드 프로세스는 서버와 클라이언트 코드를 완전히 분리하여 실행하지 못하기 때문에, 같은 컴포넌트 내에서 "use client"와 "use server"를 함께 사용할 수 없음.

import { useFormState } from "react-dom"; // useActionState: react19 버전에서만 사용가능 & next@14.0.3은 react@18.2.0을 요구하여 에러가 발생하므로 일단은 18ver.에서 제공하는 useFormState 사용.

import ImagePicker from "@/components/meals/image-picker";
import classes from "./page.module.css";
import { shareMeal } from "@/lib/actions";
import MealsFormSubmit from "@/components/meals/meals-form-submit";

export default function ShareMealPage() {
  // 124. Managing the Form Submission Status with useFormStatus
  // const status = useFormState();
  // // use client 코드 필요 -> 별도 컴포넌트화(MealsFormSubmit)

  // 127. Working with Server Action Responses & useFormState
  const [state, formAction] = useFormState(shareMeal, { message: null });
  // ✨ useFormState
  // 1st param: actual Server action that should be triggered when the form is submitted.
  // 2st param: initial state(value) before this action is triggered.

  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} action={formAction}>
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input type="text" id="name" name="name" required />
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input type="email" id="email" name="email" required />
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input type="text" id="summary" name="summary" required />
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows="10"
              required
            ></textarea>
          </p>
          <ImagePicker label="Upload Image" name="image" />
          {state.message && <p>{state.message}</p>}
          <p className={classes.actions}>
            <MealsFormSubmit />
          </p>
        </form>
      </main>
    </>
  );
}
