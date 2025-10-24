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
    <div class="sale-title-container">
      <div class="sale-title-content">
        <button class="edit-sale-title-button" @click="showEditModal = true">编辑标题</button>
        <div class="sale-title-part1">Sale:</div>
        <div class="sale-title-part2">{{ saleTitlePart2 }}</div>
      </div>
    </div>
    <div class="sale-title-part3">{{ saleTitlePart3 }}</div>
    <!-- 游戏列表部分 -->
    <div class="game-list-container">
      <div class="game-list">
        <div 
          v-for="(game, index) in games" 
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
              <button class="buy-button" @click="removeGame(game)">移除游戏</button>
            </div>
          </div>
        </div>
        <div v-if="currentGame" class="game-description" :style="{ top: descriptionTop + 'px' }">
          <h3>{{ currentGame.title }}</h3>
          <p>{{ currentGame.description }}</p>
        </div>
      </div>
    </div>
    <!-- 编辑标题模态框 -->
    <div class="modal" v-if="showEditModal" :class="{ 'show-modal': showEditModal }">
      <div class="modal-content">
        <span class="close" @click="showEditModal = false">&times;</span>
        <h2>编辑标题</h2>
        <div class="form-group">
          <label for="sale-title-part2">标题部分2:</label>
          <input type="text" id="sale-title-part2" v-model="newSaleTitlePart2" placeholder="输入新的标题部分2">
        </div>
        <div class="form-group">
          <label for="sale-title-part3">标题部分3:</label>
          <input type="text" id="sale-title-part3" v-model="newSaleTitlePart3" placeholder="输入新的标题部分3">
        </div>
        <button class="update-button" @click="updateSaleTitle">更新标题</button>
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
          originalPrice: 179, 
          discountPrice: 65.4, 
          discount: 63,
          description: 'PC 版Grand Theft Auto V 能够以超越 4K 的最高分辨率和 60 帧每秒的帧率，为您呈现屡获殊荣、令人痴迷的游戏世界——洛桑托斯市和布雷恩郡。'
        },
        { 
          title: '米塔MiSide', 
          type: '心理恐怖、第一人称', 
          image: require('@/assets/MiSide.jpg'), 
          originalPrice: 52, 
          discountPrice: 52, 
          discount: 0,
          description: '你一定在各种游戏里有喜欢的女孩，如果你真的和她在一起了呢？'
        },
        { 
          title: 'Call of Duty®: Black Ops 6', 
          type: '动作、多人、射击', 
          image: require('@/assets/call of duty.jpg'),
          originalPrice: 488, 
          discountPrice: 366, 
          discount: 25,
          description: '《使命召唤®：黑色行动 6》是标志性的《黑色行动》系列，史诗电影般的单人战役、一流的多人游戏体验以及波次制丧尸模式的强势回归'
        },
        { 
          title: 'Stardew Valley', 
          type: '农场模拟、多人', 
          image: require('@/assets/stardew.jpg'),
          originalPrice: 48, 
          discountPrice: 28.8, 
          discount: 40,
          description: '你继承了你爷爷在星露谷留下的老旧农场。带着爷爷留下的残旧工具和几枚硬币开始了你的新生活。你能适应这小镇上的生活并且将这个杂草丛生的老旧农场变成一个繁荣的家吗？'
        },
        { 
          title: 'Ready or Not', 
          type: '战术、射击', 
          image: require('@/assets/ready.jpg'),
          originalPrice: 159, 
          discountPrice: 79.5, 
          discount: 50,
          description: '洛斯苏埃诺斯市——LSPD报告称，泛洛斯苏埃诺斯地区的暴力犯罪事件急剧增加。警局已派遣SWAT小队应对包括人质危机、炸弹威胁、嫌犯固守在内的各类高危情形。建议广大市民非必要不外出。'
        },
        { 
          title: '夺宝奇兵：古老之圈', 
          type: '动作冒险、解密', 
          image: require('@/assets/duobao.jpg'), 
          originalPrice: 349, 
          discountPrice: 349, 
          discount: 0,
          description: '在这款第一人称单人冒险游戏中，探索历史上最伟大的谜团之一吧。1937年，平静的世界下波涛暗涌，邪恶势力正在追寻源自古老之圈的远古力量秘密。唯有一人可以阻止他们——那就是印第安纳·琼斯。'
        },
        { 
          title: 'Liars Bar', 
          type: '多人、休闲', 
          image: require('@/assets/liar.jpg'), 
          originalPrice: 29, 
          discountPrice: 23.2, 
          discount: 20,
          description: '沉浸在这个设定在阴暗酒吧的多人在线体验中，游戏的危险程度与酒客们一样。加入四人桌，测试你在《骗子骰子》和《骗子牌》中的技巧，在这些游戏中，撒谎和诈唬是胜利的关键。准备好在《骗子酒吧》度过一个夜晚了吗？'
        },
        { 
          title: '无主之地3', 
          type: '角色扮演、射击、多人', 
          image: require('@/assets/wuzhuzhidi.jpg'), 
          originalPrice: 199, 
          discountPrice: 19.9, 
          discount: 90,
          description: '射击夺宝游戏的鼻祖回归了，为您带来无穷无尽的枪械和一场躁动无限的全新冒险旅途！扮演四位全新的秘藏猎人之一，在新世界中横行霸道并击败敌人吧！每一位都拥有颇具深度的技能树、能力以及自订选项。'
        },
        { 
          title: '《战地风云™ 2042》', 
          type: '射击、战争、多人', 
          image: require('@/assets/battlefield.jpg'), 
          originalPrice: 248, 
          discountPrice: 19.84, 
          discount: 92,
          description: '《战地风云™ 2042》是一款第一人称射击游戏，本作将带领玩家重返该系列标志性的全面战争'
        },
        { 
          title: '消逝的光芒2: 重装上阵版', 
          type: '开放世界、僵尸、多人', 
          image: require('@/assets/dyinglight2.jpg'), 
          originalPrice: 198, 
          discountPrice: 79.2, 
          discount: 60,
          description: '人类正在与病毒进行一场注定失败的斗争。在这个末日后丧尸横行的开放世界中，你的跑酷和战斗技能将成为生存的关键。白天，你可以自由穿梭于城市之间，但夜幕降临后，怪物将接管城市的控制权。'
        },
      ],
      currentGame: null,
      descriptionTop: 0,  
      selectedType: '',  
      editingGame: null,  
      newOriginalPrice: 0,  
      newDiscountPrice: 0,  
      newDiscount: 0,  
      saleTitlePart2: '冬季特卖！！！',  
      newSaleTitlePart2: '',  
      saleTitlePart3: '即日起至2025年12月12日',
      newSaleTitlePart3: '', 
      showEditModal: false 
    };
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
      if (confirm('确定移除吗？')) {
        const index = this.games.indexOf(game);
        if (index !== -1) {
          this.games.splice(index, 1);
        }
      }
    },
    updateSaleTitle() {
      this.saleTitlePart2 = this.newSaleTitlePart2;
      this.saleTitlePart3 = this.newSaleTitlePart3;
      this.showEditModal = false;
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
  
  .sale-title-container {
  display: flex;
  justify-content: center; 
  align-items: center;
  width: 100%;
  margin: 0px 0;
  text-align: center;
}

.sale-title-content {
  display: flex;
  align-items: center;
}

  .edit-sale-title-button {
  background-color: #3498db;
  color: #ffffff;
  font-size: 16px;
  border: none;
  padding: 12px 15px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px; 
}

.edit-sale-title-button:hover {
  background-color: #2980b9;
}
  
  .sale-title-part1 {
    font-size: 32px;
    color: #1c65b7;
    font-weight: bold;
  }
  
  .sale-title-part2 {
    font-size: 40px;
    color: #ffa9ff;
    font-weight: bold;
    margin: 0 10px;
  }
  
  .sale-title-part3 {
    font-size: 18px;
    color: #fff53d;
    font-style: italic;
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
    margin-right: 20px;
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

  .modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.modal.show-modal {
  opacity: 1;
  visibility: visible;
}

.modal-content {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.modal-content h2 {
  margin-bottom: 20px;
  font-size: 24px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-size: 18px;
}

.form-group input {
  width: 80%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.update-button {
  background-color: #2ecc71;
  color: #ffffff;
  font-size: 16px;
  border: none;
  padding: 12px 15px;
  border-radius: 5px;
  cursor: pointer;
  width: 50%;
}

.update-button:hover {
  background-color: #27ae60;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
  color: #333;
}

.close:hover {
  color: #000;
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