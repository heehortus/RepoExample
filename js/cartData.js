// cartData.js
export class CartManager {
  constructor() {
    this.cart = this.loadCart(); // 생성자에서 로컬 스토리지 데이터 로드
  }

  /**
   * 로컬 스토리지에서 장바구니 데이터를 불러옵니다.
   * @returns {Object} 장바구니 데이터 객체
   */
  loadCart() {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : {};
  }

  /**
   * 현재 장바구니 데이터를 로컬 스토리지에 저장합니다.
   */
  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  /**
   * 장바구니에 아이템을 추가하거나 수량을 증가시킵니다.
   * @param {string} id - 메뉴 아이템의 고유 ID
   * @param {string} name - 메뉴 이름
   * @param {number} price - 아이템 단가
   */
  addToCart(id, name, price) {
    if (this.cart[id]) {
      this.cart[id].count++;
    } else {
      this.cart[id] = { name, price, count: 1 };
    }
    this.saveCart();
  }

  /**
   * 장바구니에서 특정 아이템을 제거합니다.
   * @param {string} id - 메뉴 아이템의 고유 ID
   */
  removeFromCart(id) {
    if (this.cart[id]) {
      delete this.cart[id];
    }
    this.saveCart();
  }

  /**
   * 장바구니 아이템의 수량을 변경합니다.
   * @param {string} id - 메뉴 아이템의 고유 ID
   * @param {number} delta - 수량 변경 값 (1 또는 -1)
   * @returns {boolean} 아이템이 장바구니에서 삭제되었는지 여부
   */
  updateItemCount(id, delta) {
    if (this.cart[id]) {
      this.cart[id].count += delta;
      if (this.cart[id].count <= 0) {
        delete this.cart[id];
        this.saveCart();
        return true;
      }
    }
    this.saveCart();
    return false;
  }

  /**
   * 장바구니를 비웁니다.
   */
  clearCart() {
    this.cart = {};
    this.saveCart();
  }

  /**
   * 현재 장바구니 데이터를 반환합니다.
   * @returns {Object}
   */
  getCart() {
    return this.cart;
  }

  /**
   * 장바구니에 담긴 총 아이템 개수를 반환합니다.
   * @returns {number}
   */
  getTotalCount() {
    return Object.values(this.cart).reduce((total, item) => total + item.count, 0);
  }

  /**
   * 장바구니에 담긴 아이템들의 총 가격을 반환합니다.
   * @returns {number}
   */
  getTotalPrice() {
    return Object.values(this.cart).reduce((total, item) => total + item.price * item.count, 0);
  }

  /**
   * 장바구니에 담긴 아이템들의 이름을 나열하는 문자열을 반환합니다.
   * @returns {string}
   */
  getCartDescription() {
    const items = Object.values(this.cart).map(item => item.name); // 아이템 이름만 추출

    if (items.length === 0) {
      return "현재 당신의 장바구니가 비어 있습니다.";
    }

    const itemNames = items.join(", ");
    return `현재 당신의 장바구니에 ${itemNames}가 담겨 있습니다.`;
  }
}