<template>
  <div data-app id="app">
    <main-layout></main-layout>
  </div>

</template>

<script>
import mainLayout from './components/layout/mainLayout.vue'
export default {
  name: 'App',

  components: {
        mainLayout
  },

};
</script>


<style>
  @import url('./style/main.css');
</style>
