<template>
  <div class="home-page">
    <div class="logo-container">
      <img src="@/assets/Steam-Icon-logo-big.png" alt="Logo" class="logo">
      <h1 class="logo-text"><br>Staem</h1>
    </div>
    <div class="login-page">
      <div class="login-container">
        <h1>注册</h1>
        <form @submit.prevent="handleRegister">
          <div class="form-group">
            <label for="username">账号名:</label>
            <input type="text" id="username" v-model="username" required>
          </div>
          <div class="form-group">
            <label for="password">新密码:</label>
            <input type="password" id="password" v-model="password" required>
          </div>
          <div class="form-group">
            <label for="confirmPassword">请再次输入新密码:</label>
            <input type="password" id="confirmPassword" v-model="confirmPassword" required>
            <p v-if="showError" class="error-message">两次输入的密码不一致</p>
          </div>
          <button type="submit">注册</button>
        </form>
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
      username: '',
      password: '',
      confirmPassword: '',
      showError: false,
      users: [
        { name: '1', role: 'user', password: '1' },
        { name: '11', role: 'admin', password: '11' }
      ]
    };
  },
  methods: {
    handleRegister() {
      if (this.password !== this.confirmPassword) {
        this.showError = true;
        return;
      }

      // 模拟注册成功
      alert('注册成功');
      this.$router.push('/UserLogin');
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

.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  width: center;
  margin: 140px 200px;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #f0f0f0;
}

.login-container {
  background-color: #fff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 400px;
  z-index: 10; /* 确保登录框在背景图片之上 */
  position: relative;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 70%;
  padding: 10px;
  background-color: #2ecc71;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #27ae60;
}

.error-message {
  color: red;
  font-size: 14px;
}

.register-button-container {
  margin-top: 10px;
  text-align: center;
}

.register-button-container button {
  width: 70%;
  padding: 10px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.register-button-container button:hover {
  background-color: #2980b9;
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
}
</style>