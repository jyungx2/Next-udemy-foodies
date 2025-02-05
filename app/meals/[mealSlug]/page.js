// localhost:3000/meals/something

export default function MealsDetailPage({ params }) {
  return <h1>MealsDetail! {params.mealSlug}</h1>;
}
