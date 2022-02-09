<template>
      <v-overlay :value="overlay" :z-index="FormMode.Zindex">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
</template>

<script>
import FormMode from "../../script/enum.js";
export default {
  name: "BaseOverlay",
  props:["overlay"],
  data() {
      return {
          FormMode
      }
  },

};
</script>