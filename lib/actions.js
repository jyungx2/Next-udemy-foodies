"use server";

import { saveMeal } from "@/lib/meals";
import { redirect } from "next/navigation";

export async function shareMeal(formData) {
  const meal = {
    title: formData.get("title"), // input요소의 name 속성값으로 가져옴
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  await saveMeal(meal); // database에 데이터(meal) 저장
  redirect("/meals");
}
