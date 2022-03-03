<template>
  <div
    v-click-outside="onFocusout"
    class="combobox"
    style="width: 100%"
    :class="{ focus: isFocus, validate: validateState, 'bgc-f8f8f8': disable }"
  >
    <div v-if="multipleChoice" style="display: flex">
      <div v-for="(item, index) in value" :key="index" class="selected-item">
        <div class="item-text">{{ getTextByValue(item) }}</div>
        <div
          class="m-icon mi-icon-16 mi-close-small"
          style="margin-left: 4px"
          @click="removeItem(index)"
        ></div>
      </div>
    </div>
    <div style="flex: 1; overflow: hidden">
      <input
        id="input-cbx"
        v-bind="$attrs"
        v-on:focus="onFocus()"
        v-bind:title="titleString"
        v-on:input="onFilter()"
        v-model="valueText"
        ref="input"
        :disabled="disable"
        type="text"
        style="width: calc(100% - 22px)"
        v-on:keydown="onKeyDown($event)"
        autocomplete="off"
      />
    </div>
    <!--<div class="disable-background" v-if="disable"></div>-->
    <div class="btn-dropdown" v-on:click.prevent="onBtnDropdownClick()">
      <div
        class="m-icon mi-icon-16 mi-arrow-dropdown"
        v-bind:class="{ active: isShow && !disable }"
      ></div>
    </div>
    <div
      v-if="hasAddAction"
      class="btn-dropdown btn-add icon-plus m-icon mi-icon-16 mi-plus--success"
      v-on:click="onBtnDropdownClick()"
    >
      <div class="m-icon mi-icon-16 mi-plus-success"></div>
    </div>
    <div
      class="data-table"
      v-bind:class="{
        show: isShow && !disable,
        'l--600': left,
        'w-408': width,
      }"
      :style="{
        left: tableCenter ? '50%' : '0px',
        transform: tableCenter ? 'translateX(-50%)' : 'translateX(0%)',
      }"
    >
      <div v-if="hasTitleRow" class="row title-row">
        <div
          :style="{ minWidth: columnWidths[index] }"
          v-for="(name, index) in columnNames"
          :key="index"
          class="column head"
        >
          {{ name }}
        </div>
      </div>
      <div style="height: 2px"></div>
      <div
        v-on:click="onItemClick(option[valueField])"
        v-for="(option, index) in dataFilter"
        class="row"
        v-bind:class="{ selected: selectedItem === index }"
        :key="option[valueField]"
      >
        <div
          style="white-space: nowrap"
          :style="{ minWidth: columnWidths[index] }"
          v-for="(field, index) in showFields"
          :key="index"
          class="column"
        >
          {{ option[field] }}
        </div>
        <div v-if="multipleChoice" class="column check">
          <div
            v-if="existItem(option[valueField]) && multipleChoice"
            class="m-icon mi-icon-16 mi-check"
          ></div>
        </div>
      </div>
      <div v-if="dataFilter.length === 0">Không có dữ liệu hiển thị</div>
    </div>
  </div>
</template>

<script>
// import vClickOutside from 'v-click-outside';

export default {
  name: "AutocompleteCombobox",

  props: [
    "data",
    "value",
    "allowNull",
    "hasAddAction",
    "columnNames",
    "multipleChoice",
    "valueField",
    "showFields",
    "selectedValue",
    "hasTitleRow",
    "columnWidths",
    "disable",
    "tableCenter",
    "left",
    "validateProp",
    "width",
  ],
  watch: {
    validateProp: function (value) {
      this.validateState = value;
      this.titleString = "Dữ liệu không tồn tại trong hệ thống";
    },
    // value: function(newValue){
    //   let item = this.data.find(el => el[this.valueField] == newValue);
    //   if(!this.multipleChoice){
    //     if(item){
    //       this.valueText = item[this.selectValue];
    //     }
    //   }
    // }
  },
  directives: {
    //   clickOutside: vClickOutside.directive
  },

  data: function () {
    return {
      /**
       * dropdowm state
       * CreatedBy: dvtrung
       */
      isShow: false,
      /**
       * data to show
       * CreatedBy: dvtrung
       */
      dataFilter: this.data,
      /**
       * selected item
       * CreatedBy: dvtrung
       */
      selectedItem: -1,
      /**
       * value of input
       * CreatedBy: dvtrung
       */
      valueText: "",
      /**
       * validate state
       * CreatedBy: dvtrung
       */
      validateState: false,
      /**
       * title string of input
       * CreatedBy: dvtrung
       */
      titleString: "",
      /**
       * on showing function
       * CreatedBy: dvtrung
       */
      onShow: false,

      focused: false,

      isFocus: false,
    };
  },

  methods: {
    focus: function () {
      this.$nextTick(function () {
        this.$refs.input.focus();
      });
    },

    /**
     * on button dropdown click
     * CreatedBy: dvtrung
     */
    onBtnDropdownClick: function () {
      if (this.$attrs.readonly === true) {
        return;
      }
      this.isShow = !this.isShow;
      this.$nextTick(function () {
        this.$refs.input.focus();
      });
      this.dataFilter = this.data;
    },
    /**
     * On key down event on input
     * CreatedBy: dvtrung
     */
    onKeyDown: function (event) {
      switch (event.keyCode) {
        case 40:
          // down
          if (this.$attrs.readonly === true) {
            break;
          }
          if (!this.isShow) {
            this.isShow = true;
          } else if (this.selectedItem < this.dataFilter.length - 1) {
            this.selectedItem++;
          }
          break;
        case 38:
          // up
          if (this.selectedItem >= 0 && this.isShow) {
            this.selectedItem--;
          }
          break;
        case 13:
          // enter
          if (!this.multipleChoice) {
            this.isShow = false;
            if (
              this.selectedItem >= 0 &&
              this.selectedItem < this.dataFilter.length
            ) {
              this.valueText =
                this.dataFilter[this.selectedItem][this.selectedValue];
            }
            this.selectedItem = this.data.findIndex(
              (element) =>
                element[this.valueField] ===
                this.dataFilter[this.selectedItem][this.valueField]
            );
            this.dataFilter = this.data;
            this.$emit(
              "onValueChange",
              this.data[this.selectedItem][this.valueField]
            );
            this.$emit("input", this.data[this.selectedItem][this.valueField]);
            //this.value[0] = this.data[this.selectedItem][this.valueField];
            break;
          } else {
            if (
              this.selectedItem >= 0 &&
              this.selectedItem < this.dataFilter.length
            ) {
              if (
                !this.existItem(
                  this.dataFilter[this.selectedItem][this.valueField]
                )
              ) {
                this.value.push(
                  this.dataFilter[this.selectedItem][this.valueField]
                );
              }
              this.selectedItem = this.data.findIndex(
                (element) =>
                  element[this.valueField] ===
                  this.dataFilter[this.selectedItem][this.valueField]
              );
              this.dataFilter = this.data;
              this.valueText = "";
              this.$emit("onValueChange", this.value);
            }
            break;
          }
        case 9:
          //tab
          this.onFocusout();
          break;

        case 8:
          //backspcace
          if (this.multipleChoice) {
            if (this.valueText === "") {
              this.value.pop();
              this.$emit("onValueChange", this.value);
            }
          }
          break;
        default:
          break;
      }
    },
    /**
     * on input event
     * CreatedBy: dvtrung
     */
    onFilter: function () {
      // this.dataFilter = this.data.filter(element => element.departmentName.toLowerCase().includes(this.valueText.toLowerCase().trim())
      // ||element.departmentCode.toLowerCase().includes(this.valueText.toLowerCase().trim()));
      this.dataFilter = this.data.filter((element) =>
        this.includeKeyword(this.valueText, element)
      );
      if (this.dataFilter.length === 0) {
        this.validateState = true;
        this.titleString = "Dữ liệu không tồn tại trong hệ thống";
      } else {
        this.validateState = false;
        this.titleString = "";
      }
      this.selectedItem = -1;
      this.isShow = true;
      if (this.valueText === "") {
        if (!this.multipleChoice) {
          this.$emit("onValueChange", null);
          this.$emit("input", null);
        }
      }
    },
    /**
     * on focusout event
     * CreatedBy: dvtrung
     */
    onFocusout: function () {
      // if(!this.multipleChoice){
      //     this.valueText = this.value[0];
      //     this.selectedItem = this.data.findIndex(element => element[this.valueField] === this.value[0]);
      // }
      this.isFocus = false;
      if (!this.focused) {
        return;
      }
      this.selectedItem = this.data.findIndex((element) =>
        this.includeData(this.valueText, element)
      );
      if (this.onShow) {
        this.onShow = false;
        this.isShow = false;
        return;
      } else {
        if (this.valueText === null || this.valueText.trim() === "") {
          if (this.allowNull) {
            this.isShow = false;
            if (this.multipleChoice) {
              this.$emit("onValueChange", this.value);
            } else {
              this.$emit("onValueChange", null);
              this.$emit("input", null);
              // this.value[0] = '';
            }
            return;
          }
          this.validateState = true;
          this.titleString = "Đơn vị không được phép để trống";
          if (this.multipleChoice) {
            this.$emit("onValueChange", this.value);
          } else {
            this.$emit("onValueChange", null);
            this.$emit("input", null);
            // this.value[0] = '';
          }
          this.isShow = false;
          return;
        } else if (this.selectedItem === -1) {
          this.validateState = true;
          this.titleString = "Dữ liệu không tồn tại trong hệ thống";
          if (this.multipleChoice) {
            this.$emit("onValueChange", this.value);
          } else {
            this.$emit("onValueChange", null);
            this.$emit("input", null);
            // this.value[0] = '';
          }
          this.isShow = false;
          return;
        } else {
          this.validateState = false;
          this.titleString = "";
          if (!this.multipleChoice) {
            this.valueText = this.data[this.selectedItem][this.selectedValue];
          } else {
            if (
              !this.existItem(this.data[this.selectedItem][this.valueField])
            ) {
              this.value.push(this.data[this.selectedItem][this.valueField]);
            }
            this.valueText = "";
          }
        }
      }
      this.validateState = false;
      this.isShow = false;
      this.dataFilter = this.data;
      if (this.multipleChoice) {
        this.$emit("onValueChange", this.value);
      } else {
        this.$emit(
          "onValueChange",
          this.data[this.selectedItem][this.valueField]
        );
        // this.$emit("input", this.data[this.selectedItem][this.valueField]);
        // this.value[0] = this.data[this.selectedItem][this.valueField];
      }
    },

    /**
     * on focus event
     * CreatedBy: dvtrung
     */
    onFocus: function () {
      this.isFocus = true;
      this.validateState = false;
      this.focused = true;
    },
    /**
     * Set value of input
     * CreatedBy: dvtrung
     */
    setValueText: function (id) {
      this.onShow = true;
      this.focused = false;
      this.validateState = false;
      this.titleString = "";
      if (!this.multipleChoice) {
        this.selectedItem = this.data.findIndex(
          (element) => element[this.valueField] === id
        );
        if (this.selectedItem >= 0) {
          this.valueText = this.data[this.selectedItem][this.selectedValue];
        } else {
          this.valueText = "";
        }
      } else {
        for (let i = 0; i < id.length; i++) {
          this.selectedItem = this.data.findIndex(
            (element) => element[this.valueField] === id[i]
          );
          if (this.selectedItem != -1) {
            if (
              !this.existItem(this.data[this.selectedItem][this.valueField])
            ) {
              this.value.push(this.data[this.selectedItem][this.valueField]);
            }
          }
        }
      }
      console.log(this.valueText);
    },
    /**
     * Selected validate state
     * CreatedBy: dvtrung
     */
    setValidateState: function (state) {
      this.validateState = state;
      if (state === false) {
        this.titleString = "";
      }
    },
    /**
     * init data
     * CreatedBy: dvtrung
     */
    initData: function (departments) {
      this.data = departments;
      this.dataFilter = this.data;
    },
    /**
     * on item click
     * CreatedBy: dvtrung
     */
    onItemClick: function (value) {
      this.selectedItem = this.data.findIndex(
        (element) => element[this.valueField] === value
      );
      this.dataFilter = this.data;
      if (this.multipleChoice) {
        if (!this.existItem(this.data[this.selectedItem][this.valueField])) {
          this.value.push(this.data[this.selectedItem][this.valueField]);
        }
        this.valueText = "";
      } else {
        this.isShow = false;
        this.valueText = this.data[this.selectedItem][this.selectedValue];
      }
      this.$nextTick(function () {
        this.$refs.input.focus();
      });
      if (this.multipleChoice) {
        this.$emit("onValueChange", this.value);
      } else {
        this.$emit(
          "onValueChange",
          this.data[this.selectedItem][this.valueField]
        );
        this.$emit("input", this.data[this.selectedItem][this.valueField]);
        // this.value = this.data[this.selectedItem][this.valueField];
      }
    },

    removeItem: function (index) {
      this.value.splice(index, 1);
      this.value = JSON.parse(JSON.stringify(this.value));
      this.$emit("onValueChange", this.value);
      this.$nextTick(function () {
        this.$refs.input.focus();
      });
    },

    existItem: function (id) {
      let ex = this.value.findIndex((element) => element === id);
      if (ex === -1) {
        return false;
      } else {
        return true;
      }
    },

    includeKeyword: function (key, object) {
      for (let i = 0; i < this.showFields.length; i++) {
        if (object[this.showFields[i]] !== null) {
          if (
            object[this.showFields[i]]
              .toLowerCase()
              .includes(key.toLowerCase().trim())
          ) {
            return true;
          }
        }
      }

      return false;
    },

    getTextByValue: function (value) {
      let index = this.data.findIndex(
        (element) => element[this.valueField] === value
      );
      if(index==-1){return}
      return this.data[index][this.selectedValue];
    },

    includeData: function (value, object) {
      for (let i = 0; i < this.showFields.length; i++) {
        if (object[this.showFields[i]] !== null) {
          if (
            object[this.showFields[i]].toLowerCase() ===
            value.toLowerCase().trim()
          ) {
            return true;
          }
        }
      }

      return false;
    },

    // onHoverItem: function(selected){
    //     this.selectedItem = selected;
    // }
  },

  mounted: function () {
    // let vm = this;
    if (!this.multipleChoice) {
      let i = this.data.findIndex(
        (element) => element[this.valueField] === this.value
      );
      if (i != -1) {
        this.valueText = this.data[i][this.selectedValue];
        this.selectedItem = this.data.findIndex(
          (element) => element[this.valueField] === this.value
        );
      }
    }
    // do{
    //     this.dataFilter = this.data;
    // }while(this.data.length === 0);
    // setTimeout(function(){
    //     vm.dataFilter = vm.data;
    // },1000)
  },

  // mounted: function(){
  //     this.dataFilter = this.data;
  // }
};
</script>

<style scoped>
.combobox {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  border: 1px solid #babec5;
  border-radius: 2px;
  box-sizing: border-box;
  height: 32px;
   padding-left: 10px; 
}

.combobox.focus {
  border-color: #019160;
}

.combobox.validate {
  border: 1px solid red !important;
}

.selected-item {
  height: 18px;
  display: flex;
  align-items: center;
  background: #f0f0f0;
  border: 1px solid #ccc;
  margin: 3px 2px 3px 3px;
  padding: 2px 3px 2px 5px;
  border-radius: 3px;
}

.item-text {
  font-size: 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #111111;
}

input[type="text"] {
  border: none;
  height: 32px;
  outline: none;
}
.disable-background {
  width: 100%;
  height: 30px;
  background-color: #eff0f2;
}

.btn-dropdown {
  position: absolute;
  top: 0px;
  right: 0px;
  height: 100%;
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
  cursor: pointer;
}
.mi-arrow-dropdown {
  transition: 0.2s ease;
  background-position: -560px -359px;
}
.mi-arrow-dropdown.active {
  transform: rotate(180deg);
  border: none !important;
}
.btn-dropdown:hover {
  background-color: #dddddd;
}

.btn-add {
  right: 32px;
  border-right: 1px solid #babec5;
}
.data-table {
  background: #fff;
  position: absolute;
  top: calc(100% + 2px);
  left: 0;
  border: 1px solid #babec5;
  border-radius: 2px;
  z-index: 1000;
  display: none;
  max-height: 150px;
  overflow: scroll;
}
.data-table.show {
  display: block;
}
.data-table .row {
  display: flex;
  align-items: center;
  color: #111111;
  font-size: 13px;
  height: 32px;
  cursor: pointer;
}
.data-table .row.title-row {
  font-weight: bold;
  font-size: 11px;
  position: sticky;
  top: 0;
  z-index: 2;
  background: #f8f8f8;
}

.data-table .row.selected {
  background: #2ca01c;
  color: white;
}
.data-table .row:hover {
  color: #35bf22;
  background: #ebedf0;
}
.data-table .row:first-child:hover {
  color: #000;
}
.data-table .row .column {
  padding: 0 10px;
  text-align: left;
  display: flex;
  align-items: center;
}
.data-table .row .column:first-child {
  width: 130px;
}
.data-table .row .column:nth-child(2) {
  width: 180px;
}

.data-table .row .column.check {
  width: 36px;
}

div.data-table::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  background-color: #f1f1f1;
}

div.data-table::-webkit-scrollbar-thumb {
  background-color: #a8afb6;
}

div.data-table::-webkit-scrollbar-thumb:hover {
  background-color: #7b7d80;
}
@import url("../../style/component/icon.css");
@import url("../../style/common/common.css");
</style>
