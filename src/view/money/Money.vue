<template>
  <div>
      <div class="content p-top-14">
          <div class="ul-tabs">
            <router-link  to="/money/process">
                <div class="ms-labels">Quy trình</div>
            </router-link>
            <router-link  to="/money/payment">
                <div class="ms-labels">Thu, chi tiền </div>
            </router-link>
          </div>
      <router-view></router-view>
      </div>
  </div>
</template>
<script>
export default {
  name:"Money"
}
</script>
<style scoped>
@import url('../../style/layout/content.css');
/* @import url('../../style/page/main.css'); */
</style>
