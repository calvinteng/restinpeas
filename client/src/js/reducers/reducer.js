import { ADD_RECIPE } from "../constants/action-types";

const initialState = {
	recipes: []
};

const rootReducer = (state = initialState, action) => {
	switch(action.type) {
		case ADD_RECIPE:
			return [
				...state,
				{
					id: action.id,
					text: action.text
				}
			]
		default:
			return state;
	}
};

export default rootReducer;