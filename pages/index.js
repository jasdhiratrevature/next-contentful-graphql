import { createClient } from "contentful"
import RecipeCard from "@/components/RecipeCard"
import fetchContent from "@/utils/fetchContent";

export async function getStaticProps() {
  console.log('Hello static props')
  const  recipeCollection  = await fetchContent(`
  {
    recipeCollection{
      items{
        sys
        {
          id
        }
        title
        slug
        cookingTime
      thumbnail{
        url
        width
        height
      }
      }
    }
  }
  `);
  return {
    props: {
    recipes: recipeCollection.items,
    // recipes:recipeCollection,
      revalidate: 1
    }
  };
}

export default function Recipes({ recipes }) {
  //console.log("Recipe  ::: " , recipes.recipeCollection.items.length )
  console.log("Recipessss ::: ",recipes)
  

  return (
    <div className="recipe-list">
       {recipes.map(recipe => (
         <RecipeCard key={recipe.sys.id} recipe={recipe} />
              
      ))}
      <style jsx>{`
        .recipe-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 20px 60px;
        }
      `}</style> 
    </div>
  )
}