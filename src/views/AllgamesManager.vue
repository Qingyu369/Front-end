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
              <div class="game-prices">
                <span v-if="game.discountPrice !== game.originalPrice" class="original-price">原价: {{ game.originalPrice }} 元</span>
                <span class="discount-price">现价: {{ game.discountPrice }} 元</span>
              </div>
              <div class="game-actions">
                <span v-if="game.discount" class="discount">- {{ game.discount }}%</span>
                <button class="edit-price-button" @click="editPrice(game)">修改价格</button>
                <button class="buy-button" @click="removeGame(game)">移除游戏</button>
              </div>
            </div>
          </div>
        </div>
        <div v-if="currentGame" class="game-description" :style="{ top: descriptionTop + 'px' }">
          <h3>{{ currentGame.title }}</h3>
          <p>{{ currentGame.description }}</p>
        </div>
      </div>
      
      <!-- 编辑价格模态框 -->
      <div class="modal" v-if="editingGame" :class="{ 'show-modal': editingGame }" ref="editModal">
        <div class="modal-content">
          <span class="close" @click="closeModal">&times;</span>
          <h2>修改游戏价格</h2>
          <div class="form-group">
            <label for="original-price">原价:</label>
            <input type="number" id="original-price" v-model="newOriginalPrice" placeholder="原价">
          </div>
          <div class="form-group">
            <label for="discount-price">现价:</label>
            <input type="number" id="discount-price" v-model="newDiscountPrice" placeholder="现价">
          </div>
          <div class="form-group">
            <label for="discount">折扣:</label>
            <input type="number" id="discount" v-model="newDiscount" placeholder="折扣">
          </div>
          <button class="update-button" @click="updateGamePrice">修改价格</button>
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
        { 
          title: '黑神话：悟空', 
          type: '动作、角色扮演', 
          image: require('@/assets/wukong.jpg'), 
          originalPrice: 268, 
          discountPrice: 268, 
          discount: 0,
          description: '《黑神话：悟空》是一款以中国神话为背景的动作角色扮演游戏。你将扮演一位“天命人”，为了探寻昔日传说的真相，踏上一条充满危险与惊奇的西游之路。'
        },
        { 
          title: 'The Forest', 
          type: '开放世界、生存、恐怖', 
          image: require('@/assets/forest.jpg'), 
          originalPrice: 70, 
          discountPrice: 7, 
          discount: 90,
          description: '作为客机失事的唯一幸存者，你发现自己置身于一个神秘的森林中，与一个由食人变种人组成的社会作斗争以求生存。在这个可怕的第一人称生存恐怖模拟器中建造、探索、生存。'
        },
        { 
          title: '双人成行', 
          type: '合作、多人、解密', 
          image: require('@/assets/two.jpg'), 
          originalPrice: 198, 
          discountPrice: 39.6, 
          discount: 80,
          description: '游玩《双人成行》，踏上生命中最疯狂的旅程。利用好友通行证*邀请一位好友免费游玩，共同体验多种多样的乐趣，享受颠覆性的玩法挑战。'
        },
        { 
          title: '露玛岛', 
          type: '合作、农场模拟', 
          image: require('@/assets/luma.jpg'), 
          originalPrice: 58, 
          discountPrice: 58, 
          discount: 0,
          description: '只身一人，或与亲朋好友一起，前往露玛岛来一场史诗级的冒险之旅吧。打造你的梦中农场，精通各种职业，将神奇的露玛收入囊中，发掘宝藏，并揭开岛屿的神秘面纱。'
        },
        { 
          title: 'Lethal Company', 
          type: '合作、恐怖', 
          image: require('@/assets/company.jpg'), 
          originalPrice: 42, 
          discountPrice: 42, 
          discount: 0,
          description: '一个关于在废弃的卫星上捡废料以将废料卖给公司的合作恐怖游戏。'
        },
        { 
          title: '席德·梅尔的文明VII', 
          type: '策略、战术', 
          image: require('@/assets/civilization.jpg'), 
          originalPrice: 298, 
          discountPrice: 298, 
          discount: 0,
          description: '屡获殊荣的策略游戏系列回归，翻开革命性新篇章。 《席德·梅尔的文明VII》让你能够建立世界上前所未有的伟大帝国！'
        },
        { 
          title: '底特律：化身为人', 
          type: '剧情丰富、单人', 
          image: require('@/assets/behuman.jpg'), 
          originalPrice: 128, 
          discountPrice: 38.4, 
          discount: 70,
          description: '在《底特律：化身为人》中，人类和机器人的命运都将掌握在您的手中，您将走进一个不远的未来，一个机器人具有比人类更高智慧的时代。您将体验到史上最为复杂的分支故事——您所作出的每个选择都将影响游戏的结局。'
        },
        { 
          title: 'Sea of Thieves: 2024 Edition', 
          type: '多人、开放世界、合作', 
          image: require('@/assets/sea.jpg'), 
          originalPrice: 138, 
          discountPrice: 69, 
          discount: 50,
          description: '《Sea of Thieves》是一款十分受欢迎的海盗冒险游戏，带你感受最正宗的海盗生活：寻找遗失的宝藏占为己有，和各方势力战个痛快，打败深海怪物等。深度体验改版之后的游戏，包括数字版奖励内容。'
        },
        { 
          title: '真・三国无双 起源', 
          type: '角色扮演、武术', 
          image: require('@/assets/sanguo.jpg'), 
          originalPrice: 349, 
          discountPrice: 349, 
          discount: 0,
          description: '如临真实战场，畅享爽快的一骑当千动作！无名英雄闯荡三国乱世的“真・三国无双”系列新作。'
        },
        { 
          title: 'Titanfall® 2', 
          type: '射击、动作、机甲', 
          image: require('@/assets/titan.jpg'), 
          originalPrice: 158, 
          discountPrice: 15.8, 
          discount: 90,
          description: '跃升起始包内含所有数字豪华版内容，让您快速升级和解锁物品，还有 R-201 卡宾枪的地下定制武器皮肤。'
        },
        ],
        currentGame: null,
        descriptionTop: 0, 
        selectedType: '', 
        editingGame: null,
        newOriginalPrice: 0, 
        newDiscountPrice: 0, 
        newDiscount: 0 
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
      },
      addToCart(game) {
        console.log(`将 ${game.title} 加入购物车`);
      },
      removeGame(game) {
        if (confirm('确定移除吗？')) {
          const index = this.games.indexOf(game);
          if (index !== -1) {
            this.games.splice(index, 1);
          }
        }
      },
      editPrice(game) {
        this.editingGame = game;
        this.newOriginalPrice = game.originalPrice;
        this.newDiscountPrice = game.discountPrice;
        this.newDiscount = game.discount;
      },
      updateGamePrice() {
        if (this.editingGame) {
          this.editingGame.originalPrice = this.newOriginalPrice;
          this.editingGame.discountPrice = this.newDiscountPrice;
          this.editingGame.discount = this.calculateDiscount(this.newOriginalPrice, this.newDiscountPrice);
          this.editingGame = null;
        }
      },
      closeModal() {
        this.editingGame = null;
      },
      calculateDiscount(originalPrice, discountPrice) {
        return Math.round(((originalPrice - discountPrice) / originalPrice) * 100);
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
  
  .edit-price-button {
  background-color: #3498db;
  color: #ffffff;
  font-size: 16px;
  border: none;
  padding: 12px 15px;
  border-radius: 5px;
  cursor: pointer;
}

.edit-price-button:hover {
  background-color: #2980b9;
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