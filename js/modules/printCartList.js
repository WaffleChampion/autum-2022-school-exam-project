export default function printCartList(cartsum1){
	let cartSum = cartsum1
	const checkoutAreaDiv = document.querySelector('.checkout-area__cart-list');
	const checkoutAreaTotal = document.querySelector('.checkout-area__total')
	// executing if the Html Element exists
	if(checkoutAreaDiv){
		let currentCart = JSON.parse(localStorage.getItem('cart'));
		if(currentCart){
			// Creates Cards for each item in currentCart
			currentCart.forEach((cartItem, index) =>{
				// Calculating the sum of the items in the cart
				cartSum += parseInt(cartItem.dishPrice)*parseInt(cartItem.dishQuantity)

				// Creating Html Elements
				let itemDiv = document.createElement('div');
				let itemName = document.createElement('h2');
				let itemPrice = document.createElement('p');
				let itemAllergens = document.createElement('p')
				let itemImage = document.createElement('img')
				let itemQuantity = document.createElement('input')
				let quantityDiv = document.createElement('div')
				let removeButton = document.createElement('button')
				let increaseButton = document.createElement('button')
				let decreaseButton = document.createElement('button')

				// Setting attributes for the created Html Elements
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
				quantityDiv.setAttribute('class', 'checkout-area__quantity-container')

				// Setting what is displayed in the Html Elements
				itemName.innerText='Item name: '+cartItem.dishName;
				itemPrice.innerText=cartItem.dishPrice;
				itemAllergens.innerText=cartItem.dishAllergens
				removeButton.innerText='remove'
				increaseButton.innerText='+';
				decreaseButton.innerText='-'

				// Attaching the Html Elements to parent
				quantityDiv.append(
					decreaseButton, 
					itemQuantity, 
					increaseButton )
				itemDiv.append(itemName, 
					itemAllergens,  
					itemPrice, 
					itemImage, 
					quantityDiv, 
					removeButton);
				checkoutAreaDiv.append(itemDiv);
			})
		}
		checkoutAreaTotal.innerText = 'Total: ' +cartSum + ' kr'
	}
	
}