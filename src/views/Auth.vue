<template>
  <div class="auth">
    <div class="container">
      <div class="form-container">
        <div class="auth-title">
          Для входа в систему введите Ваш номер телефона и пароль
        </div>
        <form class="auth-form">
          <input type="tel" placeholder="Номер телефона" />
          <input type="password" placeholder="Пароль" />
          <div class="auth-form-footer">
            <a href="#" class="forgot">
              Забыли пароль?
            </a>
            <button class="btn">
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
  name: "Auth"
}
</script>
