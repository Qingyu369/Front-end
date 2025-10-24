<template>
  <div class="home-page">
    <div class="logo-container">
      <img src="@/assets/Steam-Icon-logo-big.png" alt="Logo" class="logo">
      <h1 class="logo-text"><br>Staem</h1>
    </div>
    <!-- 导航栏部分 -->
    <nav class="navbar-container">
      <nav class="navbar">
        <ul>
          <li><router-link to="/">推荐游戏</router-link></li>
          <li><router-link to="/allgames">所有游戏</router-link></li>
          <li><router-link to="/DiscountsGames">优惠</router-link></li>
          <li><router-link to="/MyShopping">购物车</router-link></li>
          <li><router-link to="/MyItems">我的</router-link></li>
        </ul>
      </nav>
    </nav>

    <!-- 游戏列表部分 -->
    <div class="game-list-container">
      <div class="game-list">
        <div 
          v-for="(game, index) in cart" 
          :key="index" 
          class="game-item"
          @mouseover="showDescription(game, $event)"
          @mouseleave="hideDescription"
        >
          <div class="game-image-container">
            <img :src="game.image" :alt="game.title" class="game-image">
          </div>
          <div class="game-info">
            <div class="game-details">
              <span class="game-title">{{ game.title }}</span>
              <span class="game-type">{{ game.type }}</span>
            </div>
            <div class="game-prices">
              <span v-if="game.discountPrice !== game.originalPrice" class="original-price">原价: {{ game.originalPrice }} 元</span>
              <span class="discount-price">现价: {{ game.discountPrice }} 元</span>
            </div>
            <div class="game-actions">
              <span v-if="game.discount" class="discount">- {{ game.discount }}%</span>
              <button class="buy-button" @click="removeGame(game)">移出购物车</button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="currentGame" class="game-description" :style="{ top: descriptionTop + 'px' }">
        <h3>{{ currentGame.title }}</h3>
        <p>{{ currentGame.description }}</p>
      </div>
      <div class="total-price-and-purchase">
        <div class="total-price-box">
          总计: {{ totalPrice }} 元
        </div>
        <button class="purchase-button" @click="showPurchaseConfirmation">购买</button>
      </div>
    </div>
    <router-view></router-view>
    <div v-if="showConfirmation" class="confirmation-modal">
      <div class="confirmation-content">
        <p>确定要购买这些游戏吗？</p>
        <button class="cancel-button" @click="cancelPurchase">取消</button>
        <button class="confirm-button" @click="confirmPurchase">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyShopping',
  data() {
    return {
      currentGame: null,
      descriptionTop: 0, 
      showConfirmation: false,
    };
  },
  computed: {
    cart() {
      return this.$store.getters.getCart;
    },
    totalPrice() {
      return this.$store.getters.totalPrice;
    }
  },
  methods: {
    showDescription(game, event) {
      this.currentGame = game;
      const gameItem = event.currentTarget;
      if (gameItem) {
        this.descriptionTop = gameItem.offsetTop;
      }
    },
    hideDescription() {
      this.currentGame = null;
    },
    removeGame(game) {
      if (confirm('确定要将该游戏移出购物车吗？')) {
        this.$store.dispatch('removeGameFromCart', game);
      }
    },
    showPurchaseConfirmation() {
      this.showConfirmation = true;
    },
    confirmPurchase() {
      this.$store.dispatch('clearCart');
      this.showConfirmation = false;
      alert('购买成功！');
    },
    cancelPurchase() {
      this.showConfirmation = false;
    },
  }
};
</script>

<style scoped>
.home-page {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo-container {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: auto;
  text-align: center;
}

.logo-text {
  margin: 0px;
  font-size: 2.5em;
  margin-top: -40px;
  color: #ffffff;
}

.header-banner {
  text-align: center;
  padding: 50px 0;
}

.header-banner img {
  max-width: 100%;
  height: auto;
}

.navbar {
  text-align: center;
  margin-top: 0px;
  position: relative;
}

.navbar ul {
  list-style-type: none;
  padding: 0px;
}

.navbar li {
  display: inline-block;
  margin: 0 50px;
}

.navbar a {
  color: rgb(0, 0, 0);
  text-decoration: none;
  font-weight: bold;
  font-size: 1.7em;
}

.navbar a:hover {
  text-decoration: underline;
}

/* 新增样式 */
.filter-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 60%;
  margin: 0px auto;
}

.filter-container label {
  margin-right: 10px;
  color: #ffffff;
  font-size: 20px;
}

.filter-container select {
  font-size: 18px; 
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.filter-container option {
  font-size: 16px; 
}

.game-list-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 20px;
}

.game-list {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.navbar-container {
  width: 80%;
  background: linear-gradient(to top, rgb(102, 183, 237), rgb(9, 81, 158)); 
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 10px auto;
}

.navbar .game-list {
  padding: 20px;
  border-top: 1px solid #000000;
  margin-top: 20px;
}

.game-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  background-color: rgba(255, 255, 255, 1); 
  padding: 10px;
  border-radius: 8px;
  transition: transform 0.2s ease;
  width: 100%;
  max-width: 1200px;
  height: 100px;
}

.game-item:hover {
  transform: scale(1.05);
}

.game-image-container {
  display: flex;
  align-items: center;
  margin-right: 10px;
}

.game-image {
  max-width: 200px;
  height: auto;
}

.game-info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-grow: 1;
  width: 100%;
  align-items: center;
}

.game-details {
  display: flex;
  flex-direction: column;
}

.game-title {
  width: 80%;
  word-wrap: break-word;
  font-size: 22px;
  font-weight: bold;
}

.game-type {
  font-size: 14px;
  color: #7f8c8d;
}

.game-prices {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.original-price {
  font-size: 20px;
  color: #e74c3c;
  text-decoration: line-through;
}

.discount-price {
  font-size: 25px;
  color: #2ecc71;
}

.game-actions {
  display: flex;
  align-items: center;
}

.discount {
  font-size: 25px;
  color: #3498db;
  margin-right: 10px;
}

.buy-button {
  background-color: #ed4c4c;
  color: rgb(255, 255, 255);
  font-size: 16px;
  border: none;
  padding: 12px 15px;
  border-radius: 5px;
  cursor: pointer;
}

.buy-button:hover {
  background-color: #c0392b;
}

.game-description {
  position: absolute;
  right: 0;
  top: v-bind('descriptionTop + "px"');
  width: 350px;
  height: 250px;
  background-color: rgba(255, 255, 255, 1);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  margin-left: 1px;
}

.game-description h3 {
  font-size: 28px;
  margin-bottom: 10px;
}

.game-description p {
  font-size: 20px;
  color: #333;
}

.total-price-and-purchase {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 10px;
  width: 80%;
}

.total-price-box {
  background-color: white;
  padding: 10px 20px;
  border-radius: 5px;
  margin-right: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 18px;
}

.purchase-button {
  background-color: #2ecc71;
  color: white;
  font-size: 18px;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.purchase-button:hover {
  background-color: #27ae60;
}

.confirmation-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
}

.confirmation-content {
  background-color: white;
  font-size: 24px;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.confirm-button, .cancel-button {
  background-color: #2ecc71;
  color: white;
  font-size: 18px;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px;
}

.confirm-button:hover {
  background-color: #27ae60;
}

.cancel-button {
  background-color: #e74c3c;
}

.cancel-button:hover {
  background-color: #c0392b;
}
</style>

<style>

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  background-image: url('@/assets/back.png'); 
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed !important; 
}
</style>