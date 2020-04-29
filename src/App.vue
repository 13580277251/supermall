<template>
  <div id="app">
    <!-- 使home一直处于活跃状态，缓存数据 -->
    <keep-alive include="home"><router-view></router-view></keep-alive>
    <main-tab-bar/>
  </div>
</template>

<script>
import mainTabBar from './components/content/mainTabBar/mainTabBar'

  export default {
    name: 'App',
    components: {
      mainTabBar
    }
  }

</script>

<style>
  @import './assets/css/base.css';

</style>
