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
      <!-- 个人信息框 -->
      <div class="profile-container">
        <div class="profile-box">
          <div class="profile-avatar">
            <img src="@/assets/logo.png" alt="Avatar" class="avatar">
          </div>
          <div class="profile-info">
            <div class="profile-name">
                账号名称: user
            </div>
            <div class="profile-role">账号身份: 用户</div>
            <div class="profile-id">账号ID: 100000</div>
            <div class="profile-balance">钱包余额: 100 元</div>
            <div class="profile-games">
              <router-link to="/MyGames">我的游戏</router-link>
            </div>
            <div class="profile-exit">
              <router-link to="/UserLogin">退出</router-link>
            </div>
          </div>
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
        currentGame: null,
        descriptionTop: 0,  
      };
    },
    methods: {
      showDescription(game, event) {
        this.currentGame = game;
        const gameItem = event.currentTarget;
        if (gameItem) {
          this.descriptionTop = gameItem.offsetTop;
        }
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
  
  .navbar-container {
    width: 80%;
    background: linear-gradient(to top, rgb(102, 183, 237), rgb(9, 81, 158)); 
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin: 10px 200px 10px 200px;
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
  
  .profile-container {
    width: 60%;
    margin: 20px 200px;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .profile-box {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .profile-avatar {
    margin-bottom: 20px;
  }
  
  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  
  .profile-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start; /* 修改为左对齐 */
    width: 100%;
  }
  
  .profile-role,
  .profile-id,
  .profile-balance,
  .profile-name {
    margin-top: 10px;
    font-size: 24px;
  }
  
  .profile-games {
    margin-top: 10px;
    font-size: 24px;
    text-align: center; /* 修改为居中 */
  }
  
  .profile-games a {
    color: #2ecc71;
    text-decoration: none;
    font-weight: bold;
  }
  
  .profile-games a:hover {
    text-decoration: underline;
  }
  
  .profile-exit {
    margin-top: 10px;
    font-size: 24px;
    text-align: center; /* 修改为居中 */
  }
  
  .profile-exit a {
    color: #ff0000;
    text-decoration: none;
    font-weight: bold;
  }
  
  .profile-exit a:hover {
    text-decoration: underline;
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