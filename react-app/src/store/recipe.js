export const SET_RECIPE = 'recipes/setRecipe';
const SET_ALL_RECIPES = 'recipes/setAllRecipes';
const DELETE_RECIPE = 'recipes/deleteRecipe';
const ADD_RECIPE = 'recipes/addRecipe';
const EDIT_RECIPE = 'recipes/editRecipe';
const SET_ALL_RECIPES_BELONG_TO_USER = 'recipes/setUsersRecipes'

const setRecipe = (recipe) => ({
    type: SET_RECIPE,
    recipe,
});

const setAllRecipes = (recipes) => ({
    type: SET_ALL_RECIPES,
    recipes,
});

const deleteARecipe = (id) => ({
    type: DELETE_RECIPE,
    recipeId: id,
});

const addRecipe = (recipe) => ({
    type: ADD_RECIPE,
    recipe,
});

const editRecipe = (recipe) => ({
    type: EDIT_RECIPE,
    recipe,
});

const setAllRecipesForUser = (recipes) => ({
    type: SET_ALL_RECIPES_BELONG_TO_USER,
    recipes,
});

export const getRecipe = (id) => async (dispatch) => {
    const response = await fetch(`/api/recipes/${id}`);
    const data = await response.json();

    if (response.ok) {
        await dispatch(setRecipe(data));
        return response;
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const getAllRecipes = () => async (dispatch) => {
    const response = await fetch('/api/recipes')
    const { recipes } = await response.json();

    if (response.ok) {
        await dispatch(setAllRecipes(recipes));
        return response;
    } else {
        return ['An error occurred. Please try again.']
    }
}

// TODO Test State
export const deleteRecipe = (id) => async (dispatch) => {
    const response = await fetch(`/api/recipes/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        await dispatch(deleteARecipe(id));
        return response;
    } else {
        return ['An error occurred. Please try again.']
    }
}

// TODO Test State
export const createRecipe = (payload) => async (dispatch) => {
    const response = await fetch(`/api/recipes/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( payload ),
    });

    if (response.ok) {
        const recipe = await response.json();
        await dispatch(addRecipe(recipe));
        return recipe;
    } else {
        return ['An error occurred. Please try again.']
    }
}

// TODO Test State
export const updateRecipe = (payload) => async(dispatch) => {
    const response = await fetch(`/api/recipes/${payload.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        const recipe = await response.json();
        await dispatch(editRecipe(recipe));
        return recipe;
    } else {
        return ['An error occurred. Please try again.'];
    }
}

export const getAllRecipesForGivenUser = (id) => async (dispatch) => {
    const response = await fetch(`/api/recipes/users/${id}`)
    const data = await response.json();

    if (response.ok) {
        await dispatch(setAllRecipesForUser(data));
        return response;
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const updateDirection = (payload) => async(dispatch) => {
    const response = await fetch(`/api/recipes/${payload.recipe_id}/directions/${payload.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(payload),
    });

    if (response.ok) {
        const direction = await response.json();
        await dispatch(getRecipe(payload.recipe_id));
        return direction;
    } else {
        return ['An error occurred. Please try again.'];
    }
};

export const deleteDirection = (id, recipe_id) => async(dispatch) => {
    const response = await fetch(`/api/recipes/${recipe_id}/directions/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        const direction = await response.json();
        await dispatch(getRecipe(recipe_id));
        return direction;
    } else {
        return ['An error occurred. Please try again.'];
    }
};

export const createDirection = (payload) => async (dispatch) => {
    const response = await fetch(`/api/recipes/${payload.recipe_id}/directions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    if (response.ok) {
        const direction = await response.json();
        await dispatch(getRecipe(payload.recipe_id));
        return direction;
    } else {
        return ['An error occurred. Please try again.']
    }
};

export const updateIngredient = (payload) => async(dispatch) => {
    const response = await fetch(`/api/recipes/${payload.recipe_id}/ingredients/${payload.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(payload),
    });

    if (response.ok) {
        const ingredient = await response.json();
        await dispatch(getRecipe(payload.recipe_id));
        return ingredient;
    } else {
        return ['An error occurred. Please try again.'];
    }
};

export const deleteIngredient = (id, recipe_id) => async(dispatch) => {
    const response = await fetch(`/api/recipes/${recipe_id}/ingredients/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        const ingredient = await response.json();
        await dispatch(getRecipe(recipe_id));
        return ingredient;
    } else {
        return ['An error occurred. Please try again.'];
    }
};

export const createIngredient = (payload) => async (dispatch) => {
    const response = await fetch(`/api/recipes/${payload.recipe_id}/ingredients`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    if (response.ok) {
        const ingredient = await response.json();
        await dispatch(getRecipe(payload.recipe_id));
        return ingredient;
    } else {
        return ['An error occurred. Please try again.']
    }
};

export const createRecipePhoto = (payload) => async (dispatch) => {
    console.log(payload, 'Payload_____PayloDD')
    const response = await fetch(`/api/recipes/${payload.recipe_id}/photos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    if (response.ok) {
        const photo = await response.json();
        await dispatch(getRecipe(payload.recipe_id));
        return photo;
    } else {
        return ['An error occurred. Please try again.']
    }
};

export default function reducer(state = {}, action) {
    let newState = {
        ...state,
        users_recipes:null,
    }
    switch (action.type) {
        case SET_RECIPE:
            newState[action.recipe.id] = action.recipe;
            return newState;
        case SET_ALL_RECIPES:
            action.recipes.forEach(recipe => {
                newState[recipe.id] = recipe;
            });
            return { ...state, ...newState };
        case SET_ALL_RECIPES_BELONG_TO_USER:
            newState.users_recipes = action.recipes.recipes;
            return { ...state, ...newState };
        case ADD_RECIPE:
            if (!state[action.recipe.id]) {
                newState = { ...state, [action.recipe.id]: action.recipe };
            }
            return newState;
        case EDIT_RECIPE:
            newState[action.recipe.id] = action.recipe;
            return newState;
        case DELETE_RECIPE:
            delete newState[action.recipeId];
            return newState;
        default:
            return state;
    }
}
