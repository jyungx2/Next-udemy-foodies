import ImagePicker from "@/components/meals/image-picker";
import classes from "./page.module.css";

export default function ShareMealPage() {
  async function shareMeal(formData) {
    ("use server"); // ⭐️ ShareMealPage 컴포넌트 자체가 이미 서버에서 실행되는 서버 컴포넌트이지만, 그 안에 위치한 함수의 경우, use server라는 코드를 통해 서버에서 실행되는 함수라는 것을 따로 명시해줘야 한다. & async도 붙여줘야 비로소 진정한 server action을 행하는 함수로 만들 수 있음! (You must explicitly state that it belongs to the server by adding this directive inside of them if you wanna create such a Server Action! So to make a function that's guaranteed to execute on the server.)

    const meal = {
      title: formData.get("title"), // input요소의 name 속성값으로 가져옴
      summary: formData.get("summary"),
      instructions: formData.get("instructions"),
      image: formData.get("image"),
      creator: formData.get("name"),
      creator_email: formData.get("email"),
    };

    console.log(meal);
    // 📝 120. You can use 'server actions' feature to create such this function that will be triggered when a form is submitted.
  }

  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} action={shareMeal}>
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
          <ImagePicker />
          <p className={classes.actions}>
            <button type="submit">Share Meal</button>
          </p>
        </form>
      </main>
    </>
  );
}
