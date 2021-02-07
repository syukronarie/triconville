import { createContext, Dispatch, ReactNode } from "react";
import useCart, { Action, initialState, State } from "../hooks/useCart";

export const CartContext = createContext<[State, Dispatch<Action>]>([
	initialState,
	() => {},
]);

interface Props {
	children: ReactNode;
}

const CartContextProvider = (props: Props) => {
	const [state, dispatch] = useCart();

	return (
		<CartContext.Provider value={[state, dispatch]}>
			{props.children}
		</CartContext.Provider>
	);
};

export default CartContextProvider;
