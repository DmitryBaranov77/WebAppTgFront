const initialState = {
	cart: [],
	products: [],
	adress: {},
	userInfo: {},
	type: null,
	categories: [],
	currentCategory: 'Все',
	modalStore: {
		isOpen: false,
		item: null
	}
}

export const reducer = (state = initialState, action) => {
	switch(action.type){
		case 'NEW_PRODUCTS':
			let products = action.payload;
			// console.log(products);
			products.map(item => {
				item.colors = JSON.parse(item.colors);
				item.colors.map((i, ind) => item.colors[ind].src = `https://dmnsmgn.ru/images/${i.src}`);
				item.sizes = JSON.parse(item.sizes);
				item.src = JSON.parse(item.src);
				item.src.map((i, ind) => item.src[ind] = `https://dmnsmgn.ru/images/${i}`);
			});
			const categories = [...new Set(products.map(item => item.type))];
			categories.unshift('Все');
			state.cart.forEach(item => {
				const e = products.find(i => item.id === i.id);
				if(!e){
					state.cart = state.cart.filter(v => item.id !== v.id);
				}
			})
			return {
				...state,
				products,
				categories
			};

		case 'CHANGE_CATEGORY':
			return {
				...state,
				currentCategory: action.payload
			}

		case 'MODAL':
			return {
				...state,
				modalStore: action.payload
			}

		case 'CHANGE_TYPE':
			return {
				...state,
				type: action.payload
			}

		case 'ADD_ADRESS':
			return {
				...state,
				adress: {
					...state.adress,
					...action.payload
				},
			}

		case 'ADD_USER_INFO':
			return {
				...state,
				userInfo: {
					...state.userInfo,
					...action.payload
				}
			}

		case 'ADD_TO_CART':
			const exist = __find(state.cart, action.payload);
			if(exist){
				return {
					...state,
					cart: state.cart.map(item => ((item.id === exist.id) && (item.size === exist.size) && (exist.color === item.color || exist.color?.name === item.color?.name)) ? {...exist, quantity: exist.quantity + 1} : item)
				}
			} else {
				return {
					...state,
					cart: [...state.cart, {...action.payload, quantity: action.payload.quantity ? action.payload.quantity : 1}]
				}
			};

		case 'DELETE_FROM_CART':
			const ex = __find(state.cart, action.payload);
			if(ex?.quantity === 1){
				return{
					...state,
					cart: __filter(state.cart, ex)
				}
			} else {
				return {
					...state,
					cart: state.cart.map(item => ((item.id === action.payload.id) && (item.size === action.payload.size) && (ex.color === item.color || ex.color?.name === item.color?.name)) ? {...ex, quantity: ex.quantity - 1} : item)
				}
			};

		default: return state;
	}
}

const __find = (cart, item) => {
	for(const el of cart) {
		if(el.id === item.id && el.size === item.size && (el.color === item.color || el.color?.name === item.color?.name)){
			return el;
		}
	}
	return null;
}

const __filter = (cart, item) => {
	let result = [];
	for(const el of cart) {
		if(el.id !== item.id || el.size !== item.size || el.color !== item.color){
			result.push(el);
		}
	}
	return result;
}