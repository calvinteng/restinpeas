import { ADD_RECIPE } from "../constants/action-types";

let nextId = 0

export function addRecipe(recipe) {
	return {
		type: ADD_RECIPE,
		id: nextId++,
	};
}