<template>
  <div class="logo">
    <img src="../../../public/logo.png" alt="" />
    <p>硅谷甄选运营平台</p>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.logo {
  width: 100%;
  display: flex;
  align-items: center;
  color: white;
  padding: 10px;
  height: $base-menu-tabbar-height;
  img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
  p {
    font-size: 18px;
    font-weight: 600;
  }
}
</style>
