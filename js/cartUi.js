// cartUI.js
import { CartManager } from '../js/cartData.js';

export class UIManager {
  constructor(cartManager, allMenu) {
    this.cartManager = cartManager;
    this.allMenu = allMenu;
    this.initElements();
    this.initEventListeners();
    this.syncMenuSelectedEffects(); // 페이지 로드 시 'selected' 상태 동기화
    this.updateCartUI(); // 페이지 로드 시 장바구니 UI 업데이트
  }

  initElements() {
    this.menuContainer = document.querySelector('.menu-container');
    this.cartItems = document.querySelector('#cart-items');
    this.orderBtn = document.querySelector('.order-btn');
    this.tabButtons = document.querySelectorAll('.tab-btn');
    this.tabContents = document.querySelectorAll('.tab-content');
    this.selectedCount = document.querySelector('#selected-count');
    this.totalPrice = document.querySelector('#total-price');
  }

  initEventListeners() {
    this.menuContainer.addEventListener('click', (event) => {
      this.handleMenuClick(event);
    });

    this.cartItems.addEventListener('click', (event) => {
      this.handleCartItemClick(event);
    });

    this.orderBtn.addEventListener('click', () => {
      this.handleOrderClick();
    });

    this.tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        this.handleTabClick(button);
      });
    });
  }

  handleMenuClick(event) {
    const menuItem = event.target.closest('.menu-item');
    if (menuItem) {
      const id = menuItem.dataset.id;
      const item = this.findMenuItemById(id);
      if (item) {
        if (menuItem.classList.contains('selected')) {
          this.cartManager.removeFromCart(id);
        } else {
          this.cartManager.addToCart(id, item.name, item.price);
        }
        this.syncMenuSelectedEffects();
        this.updateCartUI();
      }
    }
  }

  handleCartItemClick(event) {
    const id = event.target.closest('.cart-item').dataset.id; // 이벤트 위임 수정
    const targetClassList = event.target.classList;

    if (targetClassList.contains('plus-btn')) {
      this.cartManager.updateItemCount(id, 1);
    } else if (targetClassList.contains('minus-btn')) {
      this.cartManager.updateItemCount(id, -1);
    } else if (targetClassList.contains('delete-btn')) {
      this.cartManager.removeFromCart(id);
    }
    
    this.syncMenuSelectedEffects();
    this.updateCartUI();
  }

  handleOrderClick() {
    if (this.cartManager.getTotalCount() === 0) {
      alert('메뉴를 선택해주세요!');
      return;
    }
    alert('주문이 완료되었습니다.');
    this.cartManager.clearCart();
    this.syncMenuSelectedEffects();
    this.updateCartUI();
  }

  handleTabClick(button) {
    const category = button.getAttribute('data-category');
    this.tabButtons.forEach(btn => btn.classList.remove('active'));
    this.tabContents.forEach(content => content.classList.remove('active'));
    button.classList.add('active');
    document.getElementById(category).classList.add('active');
  }

  /**
   * 장바구니 상태에 따라 메뉴 아이템의 'selected' 클래스를 동기화합니다.
   */
  syncMenuSelectedEffects() {
    const cart = this.cartManager.getCart();
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
      const id = item.dataset.id;
      if (cart[id]) {
        item.classList.add('selected');
      } else {
        item.classList.remove('selected');
      }
    });
  }

  /**
   * 장바구니 UI를 업데이트합니다.
   */
  updateCartUI() {
    const cart = this.cartManager.getCart();
    this.cartItems.innerHTML = '';
    
    for (const id in cart) {
      const { name, price, count } = cart[id];
      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item';
      cartItem.dataset.id = id;
      cartItem.innerHTML = `
        <div class="item-controls">
        <button class="btn plus-btn">+</button>
        <span class="item-details">${name} x ${count}</span>
        <button class="btn minus-btn">-</button>
        </div>
        <span class="item-price">${(price * count).toLocaleString()}원</span>
        <button class="delete-btn">삭제</button>
      `;
      this.cartItems.appendChild(cartItem);
    }
    
    this.selectedCount.textContent = this.cartManager.getTotalCount();
    this.totalPrice.textContent = this.cartManager.getTotalPrice().toLocaleString();
  }

  /**
   * 주어진 ID로 메뉴 객체를 찾습니다.
   * @param {string} id - 찾을 아이템의 ID
   * @returns {Object|null} 메뉴 객체 또는 null
   */
  findMenuItemById(id) {
    for (const category in this.allMenu) {
      const item = this.allMenu[category].find(menuItem => menuItem.id === id);
      if (item) return item;
    }
    return null;
  }
}