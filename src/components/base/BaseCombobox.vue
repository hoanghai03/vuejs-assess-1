<template>
  <v-combobox v-model="select" :items="department" :dense="true"></v-combobox>
</template>

<script>
export default {
  name: "BaseCombobox",
  props:["selectVal","department"],
  data() {
      return {
          select : []
      }
  },
  watch:{
      // gán selectVal cho select nếu selectVal thay đổi
      selectVal(value){
        this.select = value;
      },
      // khi select thay đổi thì đưa giá trị select ra
      select(value) {
        this.$emit('selectValue', value);
      }
  }
};
</script>
