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
      <router-view />
    </div>
    <div class="side-bar-right"></div>
    <div class="overlay"></div>
  </div>
</template>

<script>
export default {
  name: "MainLayout"
}
</script>
