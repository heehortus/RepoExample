// kiosk.js

// import Cart, UI
import { CartManager } from '../js/cartData.js';
import { UIManager } from '../js/cartUI.js';

// 메뉴 데이터 정의
const menuData = {
  coffee: [
    {
      id: "coffee-1",
      name: "아메리카노",
      description: "진한 에스프레소에 물을 넣은 기본 커피",
      price: 3500,
    },
    {
      id: "coffee-2",
      name: "카페라떼",
      description: "부드러운 우유와 에스프레소의 조화",
      price: 4500,
    },
    {
      id: "coffee-3",
      name: "카푸치노",
      description: "풍성한 우유 거품이 올라간 커피",
      price: 4800,
    },
  ],
  tea: [
    {
      id: "tea-1",
      name: "녹차",
      description: "은은한 향이 일품인 전통 녹차",
      price: 3000,
    },
    {
      id: "tea-2",
      name: "얼그레이",
      description: "베르가못 향이 특별한 영국 홍차",
      price: 3800,
    },
    {
      id: "tea-3",
      name: "캐모마일",
      description: "마음을 편안하게 해주는 허브차",
      price: 4200,
    },
    {
      id: "tea-4",
      name: "페퍼민트",
      description: "상쾌한 민트 향의 허브차",
      price: 4000,
    },
  ],
  dessert: [
    {
      id: "dessert-1",
      name: "치즈케이크",
      description: "진한 치즈의 맛이 일품인 케이크",
      price: 6500,
    },
    {
      id: "dessert-2",
      name: "초콜릿 머핀",
      description: "촉촉하고 달콤한 초콜릿 머핀",
      price: 4500,
    },
    {
      id: "dessert-3",
      name: "마카롱",
      description: "다채로운 색상의 프랑스 전통 과자",
      price: 3200,
    },
    {
      id: "dessert-4",
      name: "티라미수",
      description: "이탈리아의 대표적인 디저트",
      price: 7800,
    },
    {
      id: "dessert-5",
      name: "크로플",
      description: "바삭한 크루아상 와플",
      price: 5900,
    },
  ],
};

/**
 * 로컬 스토리지에 메뉴 데이터가 없으면 초기 데이터를 저장합니다.
 */
const initializeMenuData = () => {
  if (!localStorage.getItem("menuData")) {
    localStorage.setItem("menuData", JSON.stringify(menuData));
  }
};

/**
 * 주어진 카테고리와 아이템 목록을 바탕으로 메뉴판에 아이템을 동적으로 추가합니다.
 * @param {string} category - 메뉴 카테고리 (예: 'coffee')
 * @param {Array<Object>} items - 메뉴 아이템 객체 배열
 */
const createMenuItems = (category, items) => {
  const menuContainer = document.querySelector(`#${category} .menu-items`);
  menuContainer.innerHTML = "";
  items.forEach((item) => {
    const menuItemDiv = document.createElement("div");
    menuItemDiv.classList.add("menu-item");
    menuItemDiv.dataset.id = item.id; // HTML 엘리먼트에 고유 ID를 저장
    menuItemDiv.innerHTML = `
      <div class="item-info">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
      </div>
      <div class="item-price">${item.price.toLocaleString()}원</div>
    `;
    menuContainer.appendChild(menuItemDiv);
  });
};

document.addEventListener('DOMContentLoaded', () => {
  initializeMenuData(); // 메뉴 데이터 초기화
  const allMenu = JSON.parse(localStorage.getItem("menuData"));

  // 각 카테고리별 메뉴 생성
  for (const category in allMenu) {
    createMenuItems(category, allMenu[category]);
  }

  // 매니저와 UI 초기화. UIManager에 모든 메뉴 데이터를 전달합니다.
  const cartManager = new CartManager();
  const uiManager = new UIManager(cartManager, allMenu);
});