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
            <li><router-link to="/IndexManager">推荐游戏管理</router-link></li>
            <li><router-link to="/AllgamesManager">所有游戏管理</router-link></li>
            <li><router-link to="/DiscountsGamesManager">优惠管理</router-link></li>
            <li><router-link to="/MyItemsAd">我的</router-link></li>
          </ul>
        </nav>
      </nav>
      
      <!-- 新增下拉框 -->
      <div class="filter-container">
        <label for="game-type-filter">筛选:</label>
        <select id="game-type-filter" v-model="selectedType">
          <option value="">全部</option>
          <option v-for="type in uniqueTypes" :key="type" :value="type">{{ type }}</option>
        </select>
      </div>
      
      <!-- 游戏列表部分 -->
      <div class="game-list-container">
        <div class="game-list">
          <div 
            v-for="(game, index) in filteredGames" 
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
              <div class="game-times">
                <span class="purchase-time">买入时间: {{ game.purchaseTime }}</span>
                <span class="play-time">已游玩时间: {{ game.playTime }}</span>
              </div>
            </div>
          </div>
        </div>
        <div v-if="currentGame" class="game-description" :style="{ top: descriptionTop + 'px' }">
          <h3>{{ currentGame.title }}</h3>
          <p>{{ currentGame.description }}</p>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HomePage',
    data() {
      return {
        games: [
          { 
            title: 'Grand Theft Auto V', 
            type: '开放世界、动作、多人', 
            image: require('@/assets/gta5.jpg') ,
            description: 'PC 版Grand Theft Auto V 能够以超越 4K 的最高分辨率和 60 帧每秒的帧率，为您呈现屡获殊荣、令人痴迷的游戏世界——洛桑托斯市和布雷恩郡。',
            purchaseTime: '2024-12-30',
            playTime: '15小时'
          },
          { 
            title: '米塔MiSide', 
            type: '心理恐怖、第一人称', 
            image: require('@/assets/MiSide.jpg'), 
            description: '你一定在各种游戏里有喜欢的女孩，如果你真的和她在一起了呢？',
            purchaseTime: '2024-12-30',
            playTime: '8小时'
          },
          { 
            title: '游戏3', 
            type: '射击', 
            image: 'path/to/game3-image.jpg', 
            description: '这是一款紧张刺激的射击游戏，玩家需要精准射击击败敌人。',
            purchaseTime: '2023-12-10',
            playTime: '20小时'
          },
          
        ],
        currentGame: null,
        descriptionTop: 0,  
        selectedType: ''  
      };
    },
    computed: {
      uniqueTypes() {
        const types = new Set();
        this.games.forEach(game => {
          game.type.split('、').forEach(type => types.add(type.trim()));
        });
        return Array.from(types);
      },
      filteredGames() {
        if (!this.selectedType) {
          return this.games;
        }
        return this.games.filter(game => game.type.includes(this.selectedType));
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
      }
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
  
  .filter-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 60%;
    margin: 0px 400px 0px 400px;
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
    justify-content: space-between;
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
    margin: 10px 200px 10px 200px;
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
    width: 1200px; 
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
  
  .game-actions {
    display: flex;
    align-items: center;
  }

  .game-times {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 10px;
}

.purchase-time{
  font-size: 20px;
  color: #20c5f8;

} 

.play-time {
  font-size: 20px;
  color: #f73939;
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