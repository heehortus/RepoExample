// 장바구니 데이터, 객체
const cart = {};

// HTML 요소 참조
const menuContainer = document.querySelector('.menu-container');
const selectedCount = document.querySelector('#selected-count');
const totalPrice = document.querySelector('#total-price');
const cartItems = document.querySelector('#cart-items');

// 메뉴 컨테이너 클릭 이벤트 추가
menuContainer.addEventListener('click', (event) => {
    
    // 메뉴 아이템이나 그 자식 요소를 클릭했는지 확인
    const menuItem = event.target.closest('.menu-item');
    
    if (menuItem) {
        const name = menuItem.querySelector('h3').textContent;
        const priceText = menuItem.querySelector('.item-price').textContent;
        const price = parseInt(priceText.replace(/[^0-9]/g, ''));

        if (menuItem.classList.contains('selected')) {
            removeFromCart(name, menuItem);
        } else {
            addToCart(name, price, menuItem);
        }

        updateCart();
        console.log(cart);
    }
});

// 수량 조절 버튼 이벤트 (이벤트 위임)
cartItems.addEventListener('click', (event) => {
    const name = event.target.getAttribute('data-name');
    
    if (event.target.classList.contains('plus-btn')) {
        // + 버튼 클릭
        cart[name].count++;
        updateCart();
    } else if (event.target.classList.contains('minus-btn')) {
        // - 버튼 클릭
        cart[name].count--;
        
        // 수량이 0이 되면 장바구니에서 제거
        if (cart[name].count <= 0) {
            // 해당 메뉴의 선택 효과도 제거
            const menuItems = document.querySelectorAll('.menu-item');
            menuItems.forEach(item => {
                if (item.querySelector('h3').textContent === name) {
                    item.classList.remove('selected');
                }
            });
            
            delete cart[name];
        }
        
        updateCart();
        
    } else if (event.target.classList.contains('delete-btn')) {
        // 삭제 버튼 클릭
        // 해당 메뉴의 선택 효과도 제거
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            if (item.querySelector('h3').textContent === name) {
                item.classList.remove('selected');
            }
        });
        
        delete cart[name];
        updateCart();
    }
    
    console.log(cart);
});

function addToCart(name, price, menuItem) {
    if (cart[name]) {
        cart[name].count++;
    } else {
        cart[name] = { price, count: 1 };
    }
    menuItem.classList.add('selected');
}

function removeFromCart(name, menuItem) {
     if (cart[name]) {
        delete cart[name];
        menuItem.classList.remove('selected');
    }
}

function updateCart() {
    let total = 0;
    let totalCount = 0;

    /* 초기 비우기 */
    cartItems.innerHTML = '';

    for (const name in cart) {
        const { price, count } = cart[name];
        total += price * count;
        totalCount += count;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <button class="btn plus-btn" data-name="${name}">+</button>
            <span class="item-details">${name} x ${count}</span>
            <button class="btn minus-btn" data-name="${name}">-</button>
            <span class="item-price">${(price * count).toLocaleString()}원</span>
            <button class="delete-btn" data-name="${name}">삭제</button>
        `;

        cartItems.appendChild(cartItem);
    }

    // .toLocaleString() 라는 메서드는 문화권에 대응해서 우리나라 3자리수 콤마를 넣어주는 함수
    selectedCount.textContent = totalCount;
    totalPrice.textContent = total.toLocaleString();
}