<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

};
</script>

<style>
body,
html {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
#app {
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
}

</style>
