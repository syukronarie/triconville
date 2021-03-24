import { Dispatch, useEffect, useReducer } from "react";

import addToCart from "../api/addToCart";
import { UnreachableCaseError } from "../util/UnreachableCaseError";

export interface Product {
	id: string;
	quantity: number;
	isSelected: boolean;
}

export type State = {
	products: Map<string, Product>;
	isLoaded: boolean;
};

export const initialState: State = {
	products: new Map(),
	isLoaded: false,
};

export type Action =
	| {
			type: "INIT";
			products: Map<string, Product>;
	  }
	| {
			type: "ADD_PRODUCT";
			productID: string;
			quantity: number;
	  }
	| {
			type: "REMOVE_PRODUCT";
			productID: string;
			quantity: number;
	  }
	| {
			type: "SYNC_PRODUCTS";
			products: Map<string, Product>;
	  }
	| {
			type: "CLEAR_PRODUCTS";
	  };

const reducer = (state: State, action: Action): State => {
	console.log(action);
	switch (action.type) {
		case "INIT": {
			return {
				...state,
				products: action.products,
				isLoaded: true,
			};
		}
		case "SYNC_PRODUCTS": {
			return {
				...state,
				products: action.products,
			};
		}
		case "ADD_PRODUCT": {
			if (!state.products.get(action.productID)) {
				state.products.set(action.productID, {
					id: action.productID,
					quantity: 0,
					isSelected: true,
				});
			}
			let prd = state.products.get(action.productID);
			if (prd) {
				prd.quantity += action.quantity;
			}

			return {
				...state,
			};
		}
		case "REMOVE_PRODUCT": {
			if (!state.products.get(action.productID)) {
				state.products.set(action.productID, {
					id: action.productID,
					quantity: 0,
					isSelected: true,
				});
			}
			let prd = state.products.get(action.productID);
			if (prd) {
				prd.quantity -= action.quantity;
				if (prd.quantity <= 0) state.products.delete(action.productID);
			}
			return {
				...state,
			};
		}
		case "CLEAR_PRODUCTS":
			return {
				...state,
				products: new Map(),
			};
		default:
			throw new UnreachableCaseError(action);
	}
};

const asyncDispatch = (dispatch: Dispatch<Action>): Dispatch<Action> => (
	action: Action
): void => {
	switch (action.type) {
		case "ADD_PRODUCT":
			const { productID, quantity } = action;

			addToCart(productID, quantity);
			let prd: Product = {
				id: productID,
				quantity,
				isSelected: true,
			};
			localStorage.setItem(
				`user:product:cart`,
				JSON.stringify({ products: prd })
			);

			break;

		default:
			dispatch(action);
	}
};

const useCart = (): [State, Dispatch<Action>] => {
	const [state, _dispatch] = useReducer(reducer, initialState);
	const dispatch = asyncDispatch(_dispatch);

	useEffect(() => {
		const userCart = localStorage.getItem(`user:product:cart`);
		const getCartProduct = () => {
			if (userCart) {
				const { products }: State = JSON.parse(userCart); // destructure
				dispatch({ type: "INIT", products });
			}
		};
		getCartProduct();
	}, [dispatch]);
	return [state, dispatch];
};

export default useCart;
