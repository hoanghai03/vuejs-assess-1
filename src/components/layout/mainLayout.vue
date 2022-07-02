<template>
  <div>
    <router-view></router-view>
    <router-view name="theheader"></router-view>
    <router-view name="thecontent"></router-view>
  </div>
</template>

<script>
export default {
  name: "MainLayout"
};
</script>

<style></style>
