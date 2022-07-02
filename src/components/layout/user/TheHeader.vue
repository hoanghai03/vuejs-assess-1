<template>
  <div class="header">
    <div class="header-left align-center">
      <div class="icon-toggle m-icon m-icon-toggle"></div>
      <select name="" id="" class="w-176">
        <option value="">CÔNG TY CỔ PHẦN MISA</option>
        <option value="">
          CÔNG TY TNHH SẢN XUẤT-THƯƠNG MẠI-DỊCH VỤ HOÀNG HẢI
        </option>
      </select>
      <a class="display-flex items-center">
        <div
          class="header-icon m-icon mi-14 mi-chevron-right header-branch-icon pointer"
        ></div>
      </a>
      <div class="header-current-db">
        <div class="icon-header-current-db"></div>
        <div class="header-current-db-name">DC-01</div>
      </div>
      <div class="ms-space"></div>
      <div class="ms-dowload">
        <div class="m-icon mi-24 mi-download--processed"></div>
      </div>
      <div class="block-input" :style="{'margin-right':'20px'}">
        <input
          id="txtSearch"
          class="m-input"
          type="text"
          placeholder="Nhập từ khóa tìm kiếm"
        />
        <div class="icon-input m-icon m-icon-input"></div>
      </div>
      <div class="header-menu-icon display-contents">
        <div class="pointer header-icon m-icon mi-24 mi-category"></div>
      </div>
      <div class="header-menu-icon display-contents">
        <div class="pointer header-icon m-icon mi-24 mi-setting__nav"></div>
      </div>
      <div class="header-menu-icon display-contents">
        <div class="pointer header-icon m-icon mi-24 mi-chat__nav"></div>
      </div>
      <div class="header-menu-icon display-contents">
        <div class="pointer header-icon m-icon mi-24 mi-help__nav"></div>
        <div class="pointer m-icon mi-icon-16 mi-arrow-up--gray"></div>
      </div>
      <div class="header-menu-icon display-contents">
      <div class="pointer header-icon mi-24 m-icon m-icon-notify"></div>
      </div>

    </div>
    <div class="header-right" :style="{'width': '234px','justify-content':'center'}">
      <div class="icon-img m-icon "></div>
      <div class="text-name">Nguyễn Hoàng Hải</div>
      <div class="icon-down m-icon m-icon-down"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TheHeader"
}
</script>
<style scoped>
.mi-arrow-up--gray {
    margin-left: -10px;
}
.header-icon {
  margin: 0 10px;
}
.header-menu-icon {
  position: relative;
  height: 48px;
  width: 44px;
}
.items-center {
  align-items: center !important;
}

.header-branch-icon {
  transform: rotate(90deg);
  margin-left: 10px;
}

.pointer {
  cursor: pointer;
}
.header-icon {
  margin: 0 10px;
}
.header-current-db {
  display: flex;
  align-items: center;
  border: 1px solid #ebedf0;
  padding: 0 12px;
  border-radius: 40px;
  margin-left: 15px;
  font-size: 13px;
  cursor: pointer;
  height: 30px;
  margin-right: 10px;
}

.icon-header-current-db {
  width: 8px;
  height: 8px;
  background-color: #4ea344;
  border-radius: 50%;
  border: 1px solid #fff;
}

.header-current-db-name {
  max-width: 80px;
  padding-left: 7px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: all 0.2s ease;
  color: #111;
}
.ms-space {
  padding: 0;
  margin: 0;
  flex-grow: 1 !important;
  background: 0 0;
}

.ms-download {
  margin-right: 15px;
  padding-right: 10px;
}
@import url("../../../style/layout/header.css");
@import url("../../../style/common/common.css");
@import url("../../../style/component/icon.css");
</style>
