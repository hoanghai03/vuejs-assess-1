<template>
  <v-combobox v-model="select" :items="value" :dense="true" :disabled="disabled" :filled="filled"> </v-combobox>
</template>

<script>
export default {
  name: "BaseCombobox",
  props: ["selectVal", "value", "disabled", "filled"],
  data() {
    return {
      select: [],
    };
  },
  mounted() {
      this.select = this.selectVal;
  },
  watch: {
    // gán selectVal cho select nếu selectVal thay đổi
    selectVal(value) {
      this.select = value;
    },
    // khi select thay đổi thì đưa giá trị select ra
    select(value) {
      this.$emit("selectValue", value);
    },
    disabled(value) {
      if (value) {
        this.select = {};
        this.select.text = null;
        this.select.value = null;
      }
    },
  },
};
</script>
