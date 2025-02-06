"use server";

export async function shareMeal(formData) {
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
