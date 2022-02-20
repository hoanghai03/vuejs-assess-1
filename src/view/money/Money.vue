<template>
  <div>
      <div class="content p-top-14">
          <div class="ul-tabs">
            <router-link class="ms-tabs-btn" to="/money/process">
                <div class="ms-labels">Quy trình</div>
            </router-link>
            <router-link class="ms-tabs-btn" to="/money/payment">
                <div class="ms-labels">Thu, chi tiền </div>
            </router-link>
          </div>
      <router-view></router-view>
      </div>
  </div>
</template>

<style scoped>
@import url('../../style/layout/content.css');
/* @import url('../../style/page/main.css'); */
</style>
