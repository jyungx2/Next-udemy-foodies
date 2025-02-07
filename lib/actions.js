"use server";

import { saveMeal } from "@/lib/meals";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function isInvalidText(text) {
  return !text || text.trim() === "";
}

export async function shareMeal(prevState, formData) {
  const meal = {
    title: formData.get("title"), // input요소의 name 속성값으로 가져옴
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.size === 0
  ) {
    // throw new Error("Invalid Input!"); // Not great UX (everything that user typed in is gonna be thrown away)
    return { message: "invalid input" };
  }

  await saveMeal(meal); // database에 데이터(meal) 저장
  revalidatePath("/meals", "page"); // 2st param - default: "page", or "layout" (nested pages(folder - [mealSlug], share) will be revalidated as well.)
  redirect("/meals");
}
