<template>
  <div class="auth">
    <div class="container">
      <div class="form-container">
        <div class="auth-title">
          Для входа в систему введите Ваш номер телефона и пароль
        </div>
        <form class="auth-form">
          <input type="tel" v-model="phone" placeholder="Номер телефона" />
          <input type="password" v-model="password" placeholder="Пароль" />
          <div class="auth-form-footer">
            <a href="#" class="forgot">
              Забыли пароль?
            </a>
            <button class="btn" @click.prevent="onAuth">
              Войти
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Auth",
  data() {
    return {
      password: "",
      phone: ""
    }
  },
  methods: {
    onAuth() {
      const data = {
        phoneNumber: this.phone,
        password: this.password
      }
      this.$store.dispatch("authorization", { vm: this, ...data })
    }
  }
}
</script>
