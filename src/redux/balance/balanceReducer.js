const initialState = {
	balance: 0,
};

const balanceReducer = (state = initialState, action) => {
	switch (action.type) {
		case "balance/updateBalance":
			return {
				...state,
				balance: action.payload,
			};
		default:
			return state;
	}
};

export default balanceReducer;
