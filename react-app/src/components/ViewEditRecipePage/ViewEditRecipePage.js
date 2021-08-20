import React, {useEffect} from 'react'
import './ViewEditRecipePage.css'
import RecipeBaseDetails from '../RecipeBaseDetails/RecipeBaseDetails';
import { useParams } from 'react-router';
import { getRecipe } from '../../store/recipe';
import { useDispatch, useSelector } from 'react-redux';
import RecipePhoto from '../RecipePhotos/RecipePhoto';

import Directions from '../Directions';
import Ingredients from '../Ingredients';


const ViewEditRecipePage = () => {

  //the /:id from url
  let {recipeId} = useParams();
  const dispatch = useDispatch()

  const recipeDetails= useSelector((state) => state.recipe[recipeId]);

  // FOR TESTING, REMOVE LATER
  if (recipeDetails) {
    // console.log('recipe details comments', recipeDetails.name);
    for (const [key,value] of Object.entries(recipeDetails)){
      console.log(key, value)
    }
  }

  // fetching the recipe based on ID and adding it to the store.
  useEffect(()=>{
    dispatch(getRecipe(recipeId))
  }, [dispatch], recipeId)


  return (
    <div className="ver-page-container">
      <div className="content-container">
        <div className="recipe-base-container">
          <RecipeBaseDetails />
        </div>
        <div className="recipe-photos-container">
          <RecipePhoto/>
        </div>
        <div className="recipe-ingredients-container">
          <Ingredients />
        </div>
        <div className="recipe-directions-container">
          <Directions />
        </div>
        <div className="recipe-comments-container">comments</div>
      </div>

    </div>
  )
}
export default ViewEditRecipePage;
