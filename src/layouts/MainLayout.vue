<template>
  <div class="main-layout">
    <div class="main-layout-content container">
      <div class="main-layout-header">
        <div class="main-layout-header-left">
          <div class="title">Доверенный врач</div>
        </div>
        <div class="main-layout-header-right">
          <div class="logo"></div>
        </div>
      </div>
      <div class="subtitle">Телефон технической поддержки</div>
      <div class="phone">+7 823 930 43 28</div>
    </div>
    <router-view />
    <div class="side-bar-right"></div>
    <div v-if="this.$route.path.includes('auth')" class="overlay"></div>
    <b-toast id="b-toast" title="BootstrapVue" static no-auto-hide>
      Hello, world! This is a toast message.
    </b-toast>
  </div>
</template>

<script>
export default {
  name: "MainLayout"
}
</script>
