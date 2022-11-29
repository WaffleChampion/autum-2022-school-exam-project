import * as removeItem from "./removeItem.js";

export default function printCart(){
	let cartSum=0;
	const clearCartButton = document.querySelector('.checkout-area__clear-cart');
	const checkoutAreaDiv = document.querySelector('.checkout-area__cart-list');
	const purchaseButton = document.querySelector('.checkout-area__purchase');
	const checkoutAreaTotal = document.querySelector('.checkout-area__total')

	if(clearCartButton){
		clearCartButton.addEventListener('click', handleCartButtonClick);
	}
	if(purchaseButton){
		purchaseButton.addEventListener('click', handleCartButtonClick);
	}

	printCartList();
	const quantityInput = document.querySelectorAll('.checkout-area__item-quantity')
	const prices = document.querySelectorAll('.checkout-area__item-price')
	const decreaseQuantityButton = document.querySelectorAll('.checkout-area__decrease-button')
	const increaseQuantityButton = document.querySelectorAll('.checkout-area__increase-button')
	if(quantityInput){
		quantityInput.forEach(item =>{
			item.addEventListener('change', handleQuantityInputChange)
		})
	}
	if(decreaseQuantityButton, increaseQuantityButton){
		
		decreaseQuantityButton.forEach(Element =>{
			Element.addEventListener('click', handleDecreaseQuantityButtonClick)
		})
		
		increaseQuantityButton.forEach(Element =>{
			Element.addEventListener('click', handleIncreaseQuantityButtonClick)
		})
	}

	function handleCartButtonClick(){
		localStorage.clear()
		window.location.href = "/";
	}

	function printCartList(){
		if(checkoutAreaDiv){
			let currentCart = JSON.parse(localStorage.getItem('cart'));
			if(currentCart){
				currentCart.forEach((cartItem, index) =>{
					cartSum += parseInt(cartItem.dishPrice)*parseInt(cartItem.dishQuantity)
					let itemDiv = document.createElement('div');
					let itemName = document.createElement('h2');
					let itemPrice = document.createElement('p');
					let itemAllergens = document.createElement('p')
					let itemImage = document.createElement('img')
					let itemQuantity = document.createElement('input')
					let removeButton = document.createElement('button')
					let increaseButton = document.createElement('button')
					let decreaseButton = document.createElement('button')

					itemDiv.setAttribute('class', 'checkout-area__cart-item')
					itemDiv.setAttribute('data-index', index)
					itemName.setAttribute('class', 'checkout-area__item-name');
					itemPrice.setAttribute('class', 'checkout-area__item-price');
					itemAllergens.setAttribute('class', 'checkout-area__item-info')
					itemQuantity.setAttribute('type', 'number')
					itemQuantity.setAttribute('class', 'checkout-area__item-quantity')
					itemQuantity.setAttribute('value', cartItem.dishQuantity)
					itemQuantity.setAttribute('min', 0)
					itemQuantity.setAttribute('data-index', index)
					itemImage.setAttribute('src', cartItem.dishImage)
					itemImage.setAttribute('class', 'checkout-area__item-image')
					removeButton.setAttribute('class', 'checkout-area__remove-button')
					removeButton.setAttribute('data-index', index)
					increaseButton.setAttribute('class', 'checkout-area__increase-button')
					increaseButton.setAttribute('data-index', index)
					decreaseButton.setAttribute('class', 'checkout-area__decrease-button')
					decreaseButton.setAttribute('data-index', index)

					itemName.innerText='Item name: '+cartItem.dishName;
					itemPrice.innerText=cartItem.dishPrice;
					itemAllergens.innerText=cartItem.dishAllergens
					removeButton.innerText='remove'
					increaseButton.innerText='+';
					decreaseButton.innerText='-'

					itemDiv.append(itemName, 
						itemAllergens,  
						itemPrice, 
						itemImage, 
						decreaseButton, 
						itemQuantity, 
						increaseButton, 
						removeButton);
					checkoutAreaDiv.append(itemDiv);
				})
			}
			checkoutAreaTotal.innerText = 'Total: ' +cartSum + ' kr'
		}
		
	}

	function handleQuantityInputChange(event){
		cartSum = 0;
		for(let index=0; index <quantityInput.length; index +=1){
			cartSum += parseInt(quantityInput[index].value)*parseInt(prices[index].innerText)
			if(parseInt(event.currentTarget.value) === 0){
				removeItem.handleRemoveButtonClick(event)
			}
		}
		checkoutAreaTotal.innerText = 'Total: ' +cartSum + ' kr'
	}

	function handleDecreaseQuantityButtonClick(event){
		if(quantityInput[event.currentTarget.dataset.index].value > 0){
			quantityInput[event.currentTarget.dataset.index].value -= 1
		}
		if(Number(quantityInput[event.currentTarget.dataset.index].value) === 0){
			removeItem.handleRemoveButtonClick(event)
		}
		handleQuantityInputChange(event)
	}

	function handleIncreaseQuantityButtonClick(event){
		let quantityInputNumber = Number(quantityInput[event.currentTarget.dataset.index].value)
		quantityInputNumber++
		quantityInput[event.currentTarget.dataset.index].value = quantityInputNumber
		handleQuantityInputChange(event)
	}
}