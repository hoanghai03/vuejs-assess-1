<template>
  <div>
    <div class="content-payment">
      <div class="header-content">
        <div class="title-content">
          <span>Thu chi tiền mặt</span>
        </div>
        <div class="button-content">
          <div class="pos-icon-header-content m-icon mi-24 mi-tour"></div>
          <a class="tour-label p-l-5">Hướng dẫn</a>
          <div class="button-header m-r-12">
            <button class="btn-left">
              Tiện ích
              <div class="mi-16 m-icon mi-arrow-up--black"></div>
            </button>
          </div>
          <button class="btn-radius-left">Thêm chi tiền</button>
          <button class="btn-radius-right">
            <div class="line"></div>
            <div
              class="pos-icon-btn m-icon mi-icon-16 mi-arrow-up--white"
            ></div>
          </button>
        </div>
      </div>
      <div class="inner-overview">
        <div
          class="common-overview dued-debit-overview"
          @mouseover="falseDebit"
          @mouseleave="trueDebit"
        >
          <div class="total-money">637.456.243</div>
          <div class="label-overview">Tổng thu đầu năm đến hiện tại</div>
          <div class="m-icon funnel-icon"></div>
          <div class="bottom-cm-overview" :class="{ none: debit }"></div>
        </div>
        <div
          class="common-overview total-debit-overview"
          @mouseover="falseTotalDebit"
          @mouseleave="trueTotalDebit"
        >
          <div class="total-money">127.467.345</div>
          <div class="label-overview">Tổng chi đầu năm đến hiện tại</div>
          <div class="m-icon funnel-icon"></div>
          <div class="bottom-cm-overview" :class="{ none: totalDebit }"></div>
        </div>
        <div class="common-overview payment-overview">
          <div class="total-money">(748.345.246)</div>
          <div class="label-overview">Tổng quỹ hiện tại</div>
          <div class="m-icon funnel-icon"></div>
        </div>
      </div>
      <div class="con-ms-ul-tabs">
        <ul class="ms-tabs-ul-payment">
          <li class="ms-tabs-btn-pm">Tất cả</li>
          <li class="ms-tabs-btn-pm">Thu tiền</li>
          <li class="ms-tabs-btn-pm ms-tabs-btn-payment">Chi tiền</li>
        </ul>
      </div>
      <div class="filter">
        <div class="button-left">
          <div class="m-icon mi-24 mi-arrow-check-all"></div>
          <button class="btn-left m-r-12">
            Thực hiện hàng loạt
            <div class="mi-16 m-icon mi-arrow-up--black opacity-05"></div>
          </button> 
          <button class="btn-left">
            Lọc
            <div class="mi-16 m-icon mi-arrow-up--black"></div>
          </button>
          <div class="filter-item--default">Đầu năm tới hiện tại</div>
        </div>
        <div class="block-input">
          <input
            id="txtSearch"
            class="m-input"
            type="text"
            placeholder="Nhập từ khóa tìm kiếm"
          />
          <div class="icon-input m-icon m-icon-input"></div>
        </div>
        <div id="refresh" class="icon-load m-icon m-icon-load"></div>
        <div class="icon-excel m-icon mi-excel__nav"></div>
        <div class="icon-excel m-icon mi-setting__list"></div>
      </div>
      <div class="m-table">
        <!-- <table border="0" cellspacing="0">
          <colgroup>
            <col style="min-width: 20px" />
            <col style="min-width: 40px" />
            <col style="min-width: 150px" />
            <col style="min-width: 200px" />
            <col style="min-width: 120px" />
            <col style="min-width: 150px" />
            <col style="min-width: 150px" />
            <col style="min-width: 150px" />
            <col style="min-width: 150px" />
            <col style="min-width: 150px" />
            <col style="min-width: 150px" />
            <col style="min-width: 250px" />
            <col style="min-width: 120px" />
            <col style="min-width: 30px" />
            <col style="min-width: 20px" />
          </colgroup>
          <thead>
            <tr>
              <th></th>
              <th>
                <input
                  type="checkbox"
                  class="m-icon-checkbox th-checkbox"
                />
              </th>
              <th>MÃ NHÀ CUNG CẤP</th>
              <th>TÊN NHÀ CUNG CẤP</th>
              <th>ĐỊA CHỈ</th>
              <th>DIỄN GIẢI</th>
              <th>CÔNG NỢ</th>
              <th>NHÓM KH,NCC</th>
              <th>MÃ SỐ THUẾ</th>
              <th>ĐIỆN THOẠI</th>
              <th>SỐ CMND</th>
              <th>CHI NHÁNH</th>
              <th class="text-function">CHỨC NĂNG</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="supplier in suppliers"
              :key="supplier.supplierId"
              @dblclick="dbOnClickTr(supplier.supplierId, false)"
            >
              <td></td>
              <td>
                <input
                  type="checkbox"
                  class="m-icon-checkbox"
                  :value="supplier.supplierId"
                  v-model="checkedId"
                  @change="checkboxOnTr"
                />
              </td>
              <td>{{ supplier.supplierCode }}</td>
              <td>{{ supplier.supplierName }}</td>
              <td>{{ supplier.address }}</td>
              <td>{{ supplier.description }}</td>
              <td>{{ supplier.debt }}</td>
              <td>{{ supplier.supplierGroupIds }}</td>
              <td>{{ supplier.supplierTaxCode }}</td>
              <td>{{ supplier.phoneNumber }}</td>
              <td>{{ supplier.debt }}</td>
              <td>{{ supplier.debt }}</td>
              <td>
                <button
                  class="btnEdit"
                  @click="dbOnClickTr(supplier.supplierId, false)"
                >
                  Sửa
                </button>
                <button
                  class="icon-down-delete m-icon m-icon-down-delete"
                  @click="showBtnDel(supplier.supplierId, $event)"
                ></button>
              </td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table> -->
        <div class="below-table">
          <div class="no-data">
            <img
              class="img-no-data"
              src="https://actappg1.misacdn.net/img/bg_report_nodata.76e50bd8.svg"
              alt=""
            />
            <div>Không có dữ liệu</div>
          </div>
        </div>
      </div>
      <div id="delEntity" ref="delEntityRight" class="none">
        <div class="multiple">Nhân bản</div>
        <div class="multiple">Xóa</div>
        <div class="multiple">Ngưng sử dụng</div>
      </div>
      <div id="delEntity" class="delete-entity" ref="delEntitysLeft">Xóa</div>
      <div class="paging-bar">
        <div class="paging-text">
          Tổng số <b class="total-record"></b> bản ghi
        </div>
        <div class="mselect" id="cbxPageSize">
          <div class="select">bản ghi trên trang</div>
          <div class="icon-select show-select"></div>
          <div
            class="icon-dropdown m-icon m-icon-dropdown-select show-select"
          ></div>

          <div class="data-select" id="dataSelect">
            <div class="select-item item-10" value="10">
              10 bản ghi trên trang
            </div>
            <div class="select-item item-20" value="20">
              20 bản ghi trên trang
            </div>
            <div class="select-item item-30" value="30">
              30 bản ghi trên trang
            </div>
            <div class="select-item item-50" value="50">
              50 bản ghi trên trang
            </div>
            <div class="select-item item-100" value="100">
              100 bản ghi trên trang
            </div>
          </div>
        </div>
        <div class="paging">
          <!-- <paginate
            :page-count="totalPage"
            :page-range="3"
            :margin-pages="1"
            :prev-text="'Trước'"
            :next-text="'Sau'"
            :container-class="'paging'"
            :active-class="'active'"
            :disabled-class="'disabled'"
            :page-class="'paging-number'"
            :prev-class="'p-left'"
            :next-class="'p-right'"
            v-model="paginationRequest.PageNumber"
            :click-handler="loadData"
          >
          </paginate> -->
          <!-- <div class="p-right">Sau</div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import axios from "axios";
// import Supplier from "../../../../models/supplier.js";
// import PaginationRequest from "../../../../models/request.js";
// import ServiceResult from "../../../../models/service-result.js";

// import SupplierGroup from "../../../../models/supplierGroup.js";
// import FormMode from "../../../../script/enum.js";
// import ToastMessenge from "../../../../script/toast.js";
export default {
  name: "supplier",
  components: {},
  data() {
    return {
      host: `${process.env.VUE_APP_BASE_URL}/Suppliers/`,
      hostEmployee: `${process.env.VUE_APP_BASE_URL}/Employees/`,
      deleteEmplFirst: `Bạn có thực sự muốn xóa nhà cung cấp <`,
      deleteEmplLast: `> không?`,
      duplicateCodeFirst: "Mã nhân viên <",
      duplicateCodeLast: "> đã tồn tại trong hệ thống,vui lòng kiểm tra lại.",
      debit: true,
      totalDebit: true,
      overlay: false,
      // suppliers: new Supplier(),
      supplierGroups: [],
      employees: [],
      totalPage: 0,
      totalRecord: null,
      isShowPageSize: false,
      isShowEntityDelRight: false,
      checkID: null,
      isCheckAll: false,
      isShowEntityDel: false,
      isShowLeftDel: false,
      showD: false,
      checkedId: [],
      id: null,
      isDelAll: false,
      isShowPopupDetail: false,
      textPopup: null,
      textLeft: "",
      isAgree: false,
      isShowleft: false,
      isDelete: null,
      isShowDialogDetail: false,
      // supplierProps: new Supplier(),
      export: "export",
      NewSupplierCode: "NewSupplierCode",
      SupplierGroups: `${process.env.VUE_APP_BASE_URL}/SupplierGroups/`,
      // enum
      // FormMode,
      // ToastMessenge,
      isReplication: false,
      // paginationRequest: new PaginationRequest(),
      // ServiceResult: new ServiceResult(),
    };
  },

  created() {},
  watch: {},
  methods: {
    /**
     * hàm biến đổi debit = false
     * createdBy NHHAi 13/2/2022
     */
    falseDebit() {
      this.debit = false;
    },

    /**
     * hàm biến đổi debit = true
     * createdBy NHHAi 13/2/2022
     */
    trueDebit() {
      this.debit = true;
    },

    /**
     * hàm biến đổi totalDebit = false
     * createdBy NHHAi 13/2/2022
     */
    falseTotalDebit() {
      this.totalDebit = false;
    },

    /**
     * hàm biến đổi totalDebit = true
     * createdBy NHHAi 13/2/2022
     */
    trueTotalDebit() {
      this.totalDebit = true;
    },
  },
};
</script>

<style scoped>
@import url("../../../style/layout/content.css");
@import url("../../../style/layout/supplier.css");
@import url("../../../style/component/tab.css");
</style>