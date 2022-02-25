<template>
  <div>
    <div>
      <v-select
        label="departmentName"
        :options="departmentList"
        :reduce="(option) => option.departmentId"
        v-model="departmentList.departmentName"
      >
        <template #list-header>
          <div class="cbx__header display-flex">
            <div class="vs__option"><b>Mã đơn vị</b></div>
            <div class="vs__option"><b>Tên đơn vị</b></div>
          </div>
        </template>
        <template v-slot:option="option">
          <div class="cbx__body display-flex">
            <div class="vs__option">
              <b>{{ option.departmentCode }}</b>
            </div>
            <div class="vs__option">
              <b>{{ option.departmentName }}</b>
            </div>
          </div>
        </template>
      </v-select>
    </div>
  </div>
</template>

<script>
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  name: "Student",
  components: { vSelect },
  data() {
    return {
      departmentList: [
        {
          departmentId: 1,
          departmentName: "hảâi",
          departmentCode: "reeea",
        },
        {
          departmentId: 2,
          departmentName: "hảfsdi",
          departmentCode: "reeeb",
        },
        {
          departmentId: 3,
          departmentName: "hảsdfi",
          departmentCode: "reeec",
        },
        {
          departmentId: 4,
          departmentName: "hảai",
          departmentCode: "reede",
        },
      ],
    };
  },
};
</script>
<style scoped lang="css">
@import url("../../style/layout/content.css");
@import url("../../style/component/button.css");
@import url("../../style/component/checkbox.css");
@import url("../../style/component/icon.css");
@import url("../../style/component/input.css");
@import url("../../style/component/loading.css");
@import url("../../style/component/paging-bar.css");
@import url("../../style/component/select.css");
@import url("../../style/component/table.css");
@import url("../../style/common/common.css");
@import url("../../style/component/customCombobox.css");
</style>
