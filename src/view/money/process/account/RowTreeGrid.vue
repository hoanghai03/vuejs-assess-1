<template>
  <div>
    <div class="account-tree-grid">
      <div v-for="(item, index) in data" :key="item.accountId">
        <div class="row" @dblclick="dbOnClickTr(item.accountId)" :class="{ 'raw-bold': item.children && item.children.length}" >
          <div class="m-w-10 first-child"></div>
          <div class="content-row-table m-w-225 first-col-content p-l-10 " v-bind:style="{ 'padding-left': item.childIndex*30 + 'px' }">
            <div class="mi-tree-collapse--small m-icon mi-icon-16" v-if="isShowRows[index]" @click="btnToggleRow(index)" :class="{'bg-p-0' : item.children &&!item.children.length}"></div>
            <div class="mi-tree-expand--small m-icon mi-icon-16" v-if="!isShowRows[index]" @click="btnToggleRow(index)" :class="{'bg-p-0' : item.children &&!item.children.length}"></div>
            <div>{{ item.accountNumber }}</div>
          </div>
          <div class="content-row-table m-w-250 p-l-10">{{ item.accountName }}</div>
          <div class="content-row-table m-w-100 p-l-10">{{ item.accountCategoryKindName }}</div>
          <div class="content-row-table m-w-250 p-l-10">{{ item.accountNameEnglish }}</div>
          <div class="content-row-table m-w-100 p-l-10">{{ item.description }}</div>
          <div class="content-row-table m-w-120 p-l-10"></div>
          <div class="m-w-110 p-l-10 last-child-3">
            <button class="btnEdit">Sửa</button>
            <button class="icon-down-delete m-icon m-icon-down-delete"></button>
          </div>
          <div class="m-w-30 last-child-2"></div>
          <div class="m-w-20 last-child-1"></div>
        </div>
        <RowTreeGrid
          v-if="item.children && item.children.length && isShowRows[index]"
          :data="item.children"
          @dbOnClickTr="dbOnClickTr($event)"
        ></RowTreeGrid>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RowTreeGrid",
  components: {},
  props: ["data"],
  data() {
    return {
      isShowRows: [],
    }
  },
  mounted() {
    this.isShowRows = Array(this.data?.length || 0).fill(false);
  },
  methods: {
    /**
    * Hàm ẩn hiện hàng con
    * CreatedBy NHHAi 19/2/2022
    */
    btnToggleRow(index){
      this.isShowRows[index] = !this.isShowRows[index];
      this.isShowRows = [...this.isShowRows];
    },

    /**
    * Hàm click double vào Tr
    * CreatedBy NHHAi 19/2/2022
    */
    dbOnClickTr(value){
      console.log(value);
      this.$emit('dbOnClickTr', value)
    }
  }
};
</script>

<style>
@import url("../../../../style/component/row-tree-grid.css");
</style>
