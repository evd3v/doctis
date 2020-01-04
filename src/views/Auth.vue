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
import { mapGetters } from "vuex"
export default {
  name: "Auth",
  data() {
    return {
      password: "",
      phone: ""
    }
  },
  computed: {
    ...mapGetters(["getToken"])
  },
  methods: {
    async onAuth() {
      const data = {
        phoneNumber: this.phone,
        password: this.password
      }
      await this.$store.dispatch("authorization", { vm: this, ...data })
      this.nextStep()
    },
    nextStep() {
      if (localStorage.getItem("token")) {
        this.$router.push({ path: "/" })
      }
    }
  }
}
</script>
