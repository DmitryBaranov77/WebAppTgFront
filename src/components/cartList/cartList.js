import React from 'react';
import { connect } from 'react-redux';
import { useTelegram } from '../../hooks/useTelegram';
import Button from '../button';
import CartListItem from '../cartListItem/cartListItem';
import WithProductsService from '../hoc/withProductsService';
import { addToCart, deleteFromCart } from '../../services/actions';
import './cartList.css';

class CartList extends React.Component {
	tg = useTelegram().tg;

	onGoDelivery = () =>{
		this.props.navigate('/delivery');
	}

	componentDidUpdate(){
		const cart = this.props.cart;
		if(cart.length === 0){
			this.tg.MainButton.hide();
		} else {
			this.tg.MainButton.show();
			this.tg.MainButton.setParams({
				text: 'Оплатить'
			})
		}
	}

	componentDidMount(){
		const cart = this.props.cart;
		if(cart.length === 0){
			this.tg.MainButton.hide();
		} else {
			this.tg.MainButton.show();
			this.tg.MainButton.setParams({
				text: 'Оплатить'
			})
		}
		this.tg.MainButton.onClick(this.onGoDelivery);
	}

	componentWillUnmount(){
		this.tg.MainButton.offClick(this.onGoDelivery);
	}

	render() {
		const {cart, addToCart, deleteFromCart} = this.props;
		if(cart.length === 0){
			return(
				<div>
					<div className='cart-header'>
						<Button type={'back'} onClick={() => {
							this.props.navigate(-1);
							this.tg.HapticFeedback.impactOccurred('rigid');
						}}/>
					</div>
					<div>
						Ваша корзина пуста
					</div>
				</div>
				
			)
		} else {
			return (
				<div>
					<div className='cart-header'>
						<Button type={'back'} onClick={() => {
							this.props.navigate(-1);
							this.tg.HapticFeedback.impactOccurred('rigid');
						}}/>
					</div>
					<div className='cart-list'>
						{cart.map((item, index) => (
							<CartListItem
							key={index}
							product={item}
							onInc={() => {
								addToCart(item);
								this.tg.HapticFeedback.impactOccurred('rigid');
							}}
							onDec={() => {
								deleteFromCart(item);
								this.tg.HapticFeedback.impactOccurred('rigid');
							}}
							/>
						))}
					</div>

					<div className='cart__footer'>
						<div className='cart-result'>
							Итого: {this.props.totalPrice(cart)} ₽
							{/* <Button type={'back'} onClick={() => this.props.navigate('/delivery')}/> */}
						</div>
					</div>
				</div>
			)
		}
	}
};

const mapStateToProps = (state) =>{
	return {
		cart: state.cart
	}
}

const mapDispatchToProps = {
	addToCart,
	deleteFromCart
}

export default WithProductsService()(connect(mapStateToProps, mapDispatchToProps)(CartList));