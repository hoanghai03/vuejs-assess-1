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
          <button class="btn-radius-left" @click="btnAddPayment">
            Thêm chi tiền
          </button>
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
          <button class="btn-left m-r-12" @click="showDelete($event)">
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
            v-model.trim="paginationRequest.FilterText"
            @keyup.enter="loadData(FormMode.Page_Number_1)"
          />
          <div class="icon-input m-icon m-icon-input"></div>
        </div>
        <div
          id="refresh"
          class="icon-load m-icon m-icon-load"
          @click="loadData(FormMode.Page_Number_1)"
        ></div>
        <div class="icon-excel m-icon mi-excel__nav" @click="exportData"></div>
        <div class="icon-excel m-icon mi-setting__list"></div>
      </div>
      <div class="m-table">
        <table class="common-table" border="0" cellspacing="0">
          <colgroup>
            <col style="min-width: 20px" />
            <col style="min-width: 40px" />
            <col style="min-width: 147px" />
            <col style="min-width: 125px" />
            <col style="min-width: 320px" />
            <col style="min-width: 150px" />
            <col style="min-width: 228px" />
            <col style="min-width: 323px" />
            <col style="min-width: 150px" />
            <col style="min-width: 120px" />
            <col style="min-width: 200px" />
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
                  @click="checkAll()"
                />
              </th>
              <th>NGÀY HẠCH TOÁN</th>
              <th>SỐ CHỨNG TỪ</th>
              <th>DIỄN GIẢI</th>
              <th class="text-right-col">SỐ TIỀN</th>
              <th>ĐỐI TƯỢNG</th>
              <th>LÝ DO THU/CHI</th>
              <th>lOẠI CHỨNG TỪ</th>
              <th>HẠCH TOÁN GỘP NHIỀU HÓA ĐƠN</th>
              <th>CHI NHÁNH</th>
              <th class="text-function">CHỨC NĂNG</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="payment in payments"
              :key="payment.paymentId"
              @dblclick="dbOnClickTr(payment.paymentId, false)"
            >
              <td></td>
              <td>
                <input
                  type="checkbox"
                  class="m-icon-checkbox"
                  :value="payment.paymentId"
                  v-model="checkedId"
                  @change="checkboxOnTr"
                />
              </td>
              <td class="text-center-col">
                {{
                  payment.accountingDate | formatDate(payment.accountingDate)
                }}
              </td>
              <td class="color-0075c0">{{ payment.paymentNumber }}</td>
              <td>{{ payment.description }}</td>
              <td class="text-right-col">
                {{ payment.totalAmount | formatCurrency }}
              </td>
              <td>{{ payment.supplierObject }}</td>
              <td>{{ payment.journalMemo }}</td>
              <td>{{ payment.typeDocument }}</td>
              <td>{{ payment.accountMultiple }}</td>
              <td>{{ payment.branch }}</td>
              <td class="text-bold">
                <button
                  class="btnEdit"
                  @click="dbOnClickTr(payment.paymentId, false)"
                >
                  Xem
                </button>
                <button
                  class="icon-down-delete m-icon m-icon-down-delete"
                  @click="showBtnDel(payment.paymentId, $event)"
                ></button>
              </td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
          <tr v-if="totalRecord > 0" class="td-bottom-table td-bottom-sticky">
            <td class="p-0-10 sticky bgc-white"></td>
            <td class="p-0-10 bg-color"></td>
            <td class="p-0-10 bg-color text-center text-bold">Tổng</td>
            <td class="p-0-10 bg-color"></td>
            <td class="p-0-10 bg-color"></td>
            <td class="p-0-10 bg-color text-right text-bold">
              {{ totalAmount | formatCurrency }}
            </td>
            <td class="p-0-10 bg-color"></td>
            <td class="p-0-10 bg-color"></td>
            <td class="p-0-10 bg-color"></td>
            <td class="p-0-10 bg-color"></td>
            <td class="p-0-10 bg-color"></td>
            <td class="p-0-10 sticky bg-color r-20"></td>
            <td class="p-0-10 sticky r-0 bgc-white"></td>
          </tr>
          <div class="below-table" v-if="totalRecord == 0">
            <div class="no-data">
              <img
                class="img-no-data"
                src="https://actappg1.misacdn.net/img/bg_report_nodata.76e50bd8.svg"
                alt=""
              />
              <div>Không có dữ liệu</div>
            </div>
          </div>
        </table>
      </div>
      <div
        id="delEntity"
        ref="delEntityRight"
        class="none"
        :class="{
          'multiple-entity': isShowEntityDelRight,
          show: isShowEntityDelRight,
        }"
      >
        <div class="multiple">Bỏ ghi</div>
        <div class="multiple" @click="dbOnClickTr(checkID, true)">Nhân bản</div>
        <div class="multiple" @click="showPopupDel(FormMode.Delete)">Xóa</div>
      </div>
      <div
        id="delEntity"
        class="delete-entity"
        :class="{ show: showD, left: isShowLeftDel }"
        ref="delEntitysLeft"
        @click="showPopupDel(FormMode.DeleteAll)"
      >
        Xóa
      </div>
      <div class="paging-bar">
        <div class="paging-text">
          Tổng số <b class="total-record">{{ totalRecord }}</b> bản ghi
        </div>
        <div class="mselect" id="cbxPageSize" @click="showPageSize">
          <div class="select">
            {{ paginationRequest.PageSize }} bản ghi trên trang
          </div>
          <div class="icon-select show-select" @click="showPageSize"></div>
          <div
            class="icon-dropdown m-icon m-icon-dropdown-select show-select"
            @click="showPageSize"
          ></div>

          <div
            class="data-select"
            id="dataSelect"
            :class="{ show: isShowPageSize }"
          >
            <div
              class="select-item item-10"
              value="10"
              @click="setPageSize(FormMode.Page_Size_10)"
            >
              10 bản ghi trên trang
            </div>
            <div
              class="select-item item-20"
              value="20"
              @click="setPageSize(FormMode.Page_Size_20)"
            >
              20 bản ghi trên trang
            </div>
            <div
              class="select-item item-30"
              value="30"
              @click="setPageSize(FormMode.Page_Size_30)"
            >
              30 bản ghi trên trang
            </div>
            <div
              class="select-item item-50"
              value="50"
              @click="setPageSize(FormMode.Page_Size_50)"
            >
              50 bản ghi trên trang
            </div>
            <div
              class="select-item item-100"
              value="100"
              @click="setPageSize(FormMode.Page_Size_100)"
            >
              100 bản ghi trên trang
            </div>
          </div>
        </div>
        <div class="paging">
          <paginate
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
          </paginate>
          <!-- <div class="p-right">Sau</div> -->
        </div>
      </div>
    </div>
    <!-- ==============================loading ======================================-->
    <base-overlay :overlay="overlay"></base-overlay>
    <!-- ==============================dialog ======================================-->

    <PaymentDetail
      :isShow="isShowPopupDetail"
      :suppliers="suppliers"
      :employees="employees"
      :payment="payment"
      :paymentDetail="paymentDetail"
      :checkDelOnClickTr="checkDelOnClickTr"
      :accountDebit="accountDebit"
      :accountCredit="accountCredit"
      :disabled="disabled"
      @isShow="toggleDialog($event)"
      @getAccountNumberDebitProps="getAccountNumberDebit($event)"
      @getAccountNumberCreditProps="getAccountNumberCredit($event)"
      @changeAccountingDate="changeAccountingDate($event)"
      @changeDate="changeDate($event)"
      @changeSupplier="changeSupplier"
      @changeSupplierInDetailEmit="changeSupplierInDetail($event)"
      @addColPaymentDetailEmit="addColPaymentDetail"
      @delAllColEmit="delAllCol"
      @delOnClickTr="delOnClickTr($event)"
      @delAnyRowProp="delAnyRow($event)"
      @saveData="saveData($event)"
    ></PaymentDetail>

    <!-- ==============================popup ======================================-->
    <payment-popup
      :isShow="isShowPopup"
      :textPopup="textPopup"
      :employeeId="id"
      :isShowBtn="isShowleft"
      :textLeft="textLeft"
      :isDelete="isDelete"
      :isAgree="isAgree"
      :isDelAll="isDelAll"
      :checkedId="checkedId"
      :isIncrease="isIncrease"
      :host="host"
      @btnSaveIncreaseProp="getPaymentNumber"
      @loadData="loadData($event)"
      @showPopup="showPopupParent"
    />
  </div>
</template>
<script>
import axios from "axios";
import PaginationRequest from "../../../models/request.js";
// import ServiceResult from "../../../../models/service-result.js";
import BaseOverlay from "../../../components/base/BaseOverlay.vue";
import Paginate from "vuejs-paginate";
// import SupplierGroup from "../../../../models/supplierGroup.js";
import FormMode from "../../../script/enum.js";
import ToastMessenge from "../../../script/toast.js";
import PaymentDetailModel from "../../../models/paymentDetail.js";
import PaymentDetail from "./PaymentDetail.vue";

import Payment from "../../../models/payment.js";
import PaymentPopup from "../../../components/base/BasePopup.vue";
export default {
  name: "Payment",
  components: { PaymentDetail, BaseOverlay, Paginate, PaymentPopup },
  data() {
    return {
      hostSuppliers: `${process.env.VUE_APP_BASE_URL}/Suppliers/`,
      hostEmployees: `${process.env.VUE_APP_BASE_URL}/Employees/`,
      host: `${process.env.VUE_APP_BASE_URL}/Payments/`,
      hostAccounts: `${process.env.VUE_APP_BASE_URL}/Accounts/`,
      getDebit: "GetAccountDebit",
      getCredit: "GetAccountCredit",
      detailMaster: "MasterDetail/",
      guid: "00000000-0000-0000-0000-000000000000",
      textFirst: "Số chứng từ <",
      textBody: "> đã tồn tại. Nếu không tìm thấy số chứng từ <",
      textLast:
        ">. Vui lòng thực hiện tính năng bảo trì số chứng từ. Xem hướng dẫn tại đây. Bạn có muốn chương trình tự động tăng số chứng từ không?",
      payments: [],
      suppliers: [],
      employees: [],
      accountDebit: [],
      accountCredit: [],
      checkedId: [],
      isShowPopupDetail: false,
      isShowPopup: false,
      debit: false,
      totalDebit: false,
      payment: new Payment(),
      paymentDetail: [],
      description: "Chi tiền cho ",
      oldSupplierId: null, // giá trị supplerId cũ,
      checkDelOnClickTr: false, // xóa dòng mới nhất
      FormMode,
      overlay: false,
      paginationRequest: new PaginationRequest(),
      totalRecord: null,
      totalPage: 0,
      isShowPageSize: false,
      isShowEntityDelRight: false,
      checkID: null,
      isCheckAll: false,
      showD: false,
      isShowLeftDel: false,
      export: "export",
      ToastMessenge,
      isReplication: false,
      id: null,
      isDelAll: false,
      textPopup: null,
      textLeft: "",
      isAgree: false,
      isShowleft: false,
      isDelete: null,
      isShowDialogDetail: false,
      deleteEmplFirst: `Bạn có thực sự muốn xóa phiếu chi <`,
      deleteEmplLast: `> không?`,
      disabled: false,
      isIncrease: false,
      checkBtn: 1,
      totalAmount: 0,
    };
  },
  created() {
    this.loadData();
  },
  mounted() {
    // Bắt sự kiện shortcuts
    const keysPressed = {};
    const me = this;
    document.addEventListener("keydown", (event) => {
      if (
        keysPressed["Control"] &&
        (event.key == "d" ||
          event.key == "D" ||
          event.key == "o" ||
          event.key == "O")
      ) {
        event.preventDefault(); // hủy sự kiện mặc định
      }
      keysPressed[event.key] = true;

      // Xóa nhiều bản ghi
      if (
        keysPressed["Control"] &&
        (event.key == "d" || event.key == "D") &&
        me.checkedId.length != 0 &&
        !me.isShowDialogDetail
      ) {
        //TODO
        me.showPopupDel(FormMode.DeleteAll);
      }

      // Show dialog
      if (
        keysPressed["Control"] &&
        (event.key == "o" || event.key == "O") &&
        !me.isShow
      ) {
        //TODO
        me.btnAddPayment();
        event.preventDefault();
      }
    });
    // xóa sự kiện keydown
    document.addEventListener("keyup", (event) => {
      delete keysPressed[event.key];
    });
  },
  watch: {
    /**
     * Hàm hiển thị button xóa
     * createdBy NHHai 13/2/2022
     */
    checkedId(value) {
      // TH nếu có click chọn ô input thì hiển thị nút xóa
      if (value.length > 0) {
        this.isShowEntityDel = true;
        this.isShowLeftDel = true;
      } else {
        // TH không chọn button nào thì ẩn nút xóa
        this.isShowEntityDel = false;
        this.isShowLeftDel = false;
        this.showD = false;
      }
    },
  },
  filters: {
    /**
     * Hàm format ngày tháng
     * createdBy: NHHai 15/12/2021
     * @param {*} value trả về kiểu dữ liệu bất kì
     */
    formatDate: function (value) {
      if (value) {
        var date = new Date(value);
        if (Number.isNaN(date.getTime())) {
          return "";
        } else {
          let day = date.getDate();
          let month = date.getMonth() + 1;
          let year = date.getFullYear();
          day = day < 10 ? "0" + day : day;
          month = month < 10 ? "0" + month : month;
          return day + "/" + month + "/" + year;
        }
      }
    },

    /**
     * Hàm format tiền
     * createdBy: NHHai 15/12/2021
     * @param {*} value trả về kiểu dữ liệu bất kì
     */
    formatCurrency: (value) => {
      return parseFloat(value)
        .toFixed(1)
        .replace(/(\d)(?=(\d{3})+\.)/g, "$1.");
    },
  },
  methods: {
    /**
     * Hàm lấy paymentNumber mới nhất
     * createdBy NHHAi 25/2/2022
     */
    async getPaymentNumber() {
      var me = this;
      // lấy số phiếu chi mới
      var newPaymentNumber = await me.getNewPaymentNumber();

      if (newPaymentNumber && newPaymentNumber.data.success) {
        me.payment.paymentNumber = newPaymentNumber.data?.data;
      } else {
        // sinh lỗi ==================================================================================
        me.responseWithError(newPaymentNumber);
      }
      if (me.checkBtn == 2) me.checkBtn = 3;
      me.saveData(me.checkBtn);
    },
    /**
     * Hàm load dữ liệu
     * createdBy NHHAi 25/2/2022
     */
    loadData(value) {
      var me = this;
      // gán giá trị 1 cho page number
      if (value == FormMode.Page_Number_1)
        me.paginationRequest.PageNumber = FormMode.Page_Number_1;
      me.overlay = true;

      axios
        .post(`${this.host}filter`, me.paginationRequest)
        .then((response) => {
          if (response && response.data.success) {
            // gán dữ liệu vào employees
            me.payments = response.data.data.data;
            // tổng số bản ghi
            me.totalRecord = response.data.data.totalRecord;
            me.totalPage = response.data.data.totalPage;
            //Tính tổng số tiền
            me.totalAmount = 0;
            if (me.payments != null) {
              me.payments.forEach((value) => {
                me.totalAmount += value.totalAmount;
              });
            }

            // ẩn button xóa
            me.showD = false;
            // ẩn checkall
            me.isCheckAll = false;
            me.checkedId = [];
            // ẩn loading
            me.overlay = false;
            // class ẩn hiện vị trí
            me.isShowEntityDelRight = false;
          } else {
            me.responseWithError(response);
            me.overlay = false;
          }
        });
    },

    /**
     * hiển thị bảng chọn pagesize
     * CreatedBy NHHai 13/2/2022
     */
    showPageSize() {
      // hiển thị bảng chọn kích thước trang
      if (this.isShowPageSize) {
        this.isShowPageSize = false;
      } else {
        this.isShowPageSize = true;
      }
    },
    /**
     *  hiển thị số bản ghi trên trang
     * CreatedBy NHHai 13/2/2022
     */
    setPageSize(value) {
      // gán giá trị cho pageSize
      if (value != null && value > 0) {
        this.paginationRequest.PageSize = value;
        this.loadData(FormMode.Page_Number_1);
      }
    },

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

    /**
     * hàm ẩn hiện dialog
     * @param value
     * createdBy NHHAi 22/2/2022
     */
    toggleDialog(value) {
      this.isShowPopupDetail = value;
    },
    /**
     * hàm hiển thị dialog
     * createdBy NHHai 21/2/2022
     */
    async btnAddPayment() {
      var me = this;
      // cho phép nhập
      me.disabled = false;
      me.overlay = true;
      // lấy số phiếu chi mới
      var newPaymentNumber = await me.getNewPaymentNumber();
      me.payment = new Payment();

      if (newPaymentNumber && newPaymentNumber.data.success) {
        me.payment.paymentNumber = newPaymentNumber.data?.data;
      } else {
        // sinh lỗi ==================================================================================
        me.responseWithError(newPaymentNumber);
      }
      // lấy dữ liệu trong các combobox
      me.getDataInCombobox();
      // gán dữ liệu cho paymentDetail
      me.paymentDetail = [];
      me.paymentDetail.push(new PaymentDetailModel());

      //lấy giá trị supplier cũ
      me.oldSupplierId = null;
    },

    /**
     * hàm lấy danh sách nhà cung cấp
     * createdBy NHHai 21/2/2022
     */
    getListSupplier() {
      try {
        return axios.get(this.hostSuppliers);
      } catch {
        return;
      }
    },
    /**
     * hàm lấy danh sách nhân viên
     * createdBy NHHai 21/2/2022
     */
    getListEmployee() {
      try {
        return axios.get(this.hostEmployees);
      } catch {
        return;
      }
    },

    /**
     * hàm lấy số phiếu chi mới
     * createdBy NHHai 23/2/2022
     */
    getNewPaymentNumber() {
      try {
        return axios.get(`${this.host}NewPaymentNumber`);
      } catch {
        return;
      }
    },

    /**
     * hàm đối tượng theo id
     * @param value
     * createdBy NHHai 23/2/2022
     */
    getSupplierById(value) {
      try {
        if (value) {
          return axios.get(this.hostSuppliers + value);
        }
      } catch {
        return;
      }
    },
    /**
     * hàm lấy tk dư nợ
     * createdBy NHHai 23/2/2022
     */
    getAccountDebit() {
      try {
        return axios.get(this.hostAccounts + this.getDebit);
      } catch {
        return;
      }
    },
    /**
     * hàm láy tài khoản dư có
     * createdBy NHHai 23/2/2022
     */
    getAccountCredit() {
      try {
        return axios.get(this.hostAccounts + this.getCredit);
      } catch {
        return;
      }
    },

    /**
     * hàm thay đổi giá trị accountingDate
     * @param value
     * createdBy NHHai 23/2/2022
     */
    changeAccountingDate(value) {
      this.payment.accountingDate = value;
    },
    /**
     * hàm thay đổi giá trị Date
     * @param value
     * createdBy NHHai 23/2/2022
     */
    changeDate(value) {
      this.payment.accountingDate = value;
      this.payment.paymentDate = value;
    },

    /**
     * hàm thay đổi giá trị khi thay đổi đối tượng
     * createdBy NHHai 23/2/2022
     */
    async changeSupplier() {
      var me = this;
      var response = await me.getSupplierById(this.payment.supplierId);
      if (response && response.data.success) {
        var value = response.data.data;
        // gán giá trị cho paymentDetail
        me.paymentDetail.forEach((paymentDetail) => {
          // kiểm tra xem diễn gải có giống với lý do chi
          if (paymentDetail.description == me.payment.description) {
            paymentDetail.description = me.description + value.supplierName;
          }
          // kiểm tra xem đối tượng có giống nhau ko
          if (paymentDetail.supplierId == me.oldSupplierId) {
            paymentDetail.supplierId = value.supplierId;
            paymentDetail.supplierCode = value.supplierCode;
            paymentDetail.supplierName = value.supplierName;
          }
        });
        // gán giá trị người nhận
        if (value.category == 0) {
          // nếu đối tượng là tổ chức thì người nhận là người đại diện
          me.payment.supplierContactName = value.contactName;
        } else me.payment.supplierContactName = value.supplierName; // nếu đối tượng là tổ chức thì người nhận là tên đối tượng trong combo đối tượng

        // gán giá trị địa chỉ
        me.payment.address = value.address;
        // gán giá trị lý do chi
        me.payment.description = me.description + value.supplierName;

        // gán giá trị supplierId cũ
        me.oldSupplierId = value.supplierId;
      }
    },
    /**
     * Hàm bind giá trị các cột khi thay dổi giá trị trong combobox đối tượng
     * @param index
     * creaedBy NHHai 21/2/2022
     */
    async changeSupplierInDetail(index) {
      var me = this;
      var response = await me.getSupplierById(
        me.paymentDetail[index].supplierId
      );
      if (response && response.data.success) {
        var val = response.data.data;
        // gán giá trị cho cột đối tượng và tên đối tượng
        me.paymentDetail[index].supplierCode = val.supplierCode;
        me.paymentDetail[index].supplierName = val.supplierName;
      }
    },

    /**
     * Hàm thêm col
     * creaedBy NHHai 21/2/2022
     */
    addColPaymentDetail() {
      var newPaymentdetail = {};
      // gán giá trị hàng mới nhất
      newPaymentdetail = {
        ...this.paymentDetail[this.paymentDetail.length - 1],
      };
      newPaymentdetail.amount = 0;
      this.paymentDetail.push(newPaymentdetail);
      // gán giá trị cho checkDelOnClickTr để xóa dòng mới nhất nếu chưa sửa giá trị
      this.checkDelOnClickTr = true;
    },

    /**
     * Hàm gán giá trị cho debitAccountNumber
     * creaedBy NHHai 21/2/2022
     */
    async getAccountNumberDebit(index) {
      var me = this;
      console.log(1);
      if (me.paymentDetail[index].debitAccount) {
        var response = await me.getAccountById(
          me.paymentDetail[index].debitAccount
        );
        if (response && response.data.success) {
          var data = response.data.data;
          me.paymentDetail[index].debitAccountNumber = data.accountNumber;
        }
      } else me.paymentDetail[index].debitAccountNumber = "";
    },

    /**
     * Hàm gán giá trị cho creditAccountNumber
     * creaedBy NHHai 21/2/2022
     */
    async getAccountNumberCredit(index) {
      var me = this;
      if (me.paymentDetail[index].creditAccount) {
        var response = await me.getAccountById(
          me.paymentDetail[index].creditAccount
        );
        if (response && response.data.success) {
          var data = response.data.data;
          me.paymentDetail[index].creditAccountNumber = data.accountNumber;
        }
      } else me.paymentDetail[index].creditAccountNumber = "";
    },

    /**
     * Hàm lấy tìa khoản theo id
     * creaedBy NHHai 21/2/2022
     */
    getAccountById(value) {
      try {
        if (value) {
          return axios.get(this.hostAccounts + value);
        }
      } catch {
        return;
      }
    },

    /**
     * Hàm xóa 1 hàm bất kỳ
     * creaedBy NHHai 21/2/2022
     */
    delAnyRow(index) {
      this.paymentDetail.splice(index, 1);
    },
    /**
     * Hàm xóa tất cả các hàng
     * creaedBy NHHai 21/2/2022
     */
    delAllCol() {
      // xóa hết các hàng
      this.paymentDetail = [];
      // gán lại các giá trị
      var newPaymentDetail = {};
      newPaymentDetail.description = this.payment.description;
      this.paymentDetail.push(newPaymentDetail);
    },

    /**
     * Hàm xóa dòng mới nhất nếu chưa sửa dữ liệu
     * creaedBy NHHai 21/2/2022
     */
    delOnClickTr(index) {
      if (index != this.paymentDetail.length - 1 && this.checkDelOnClickTr) {
        if (
          JSON.stringify(this.paymentDetail[this.paymentDetail.length - 1]) ==
          JSON.stringify(this.paymentDetail[this.paymentDetail.length - 2])
        ) {
          this.paymentDetail.pop();
          this.checkDelOnClickTr = false;
        }
      }
    },

    /**
     * hiển thị nút bỏ ghi và nhân bản
     * CreatedBy NHHai 13/2/2022
     */
    showBtnDel(paymentId, sender) {
      this.checkID = paymentId;
      var rect = sender.currentTarget.getBoundingClientRect();
      var top = rect.top + 20;
      this.$refs.delEntityRight.style.top = `${top}px`;
      // class ẩn hiện vị trí
      this.isShowEntityDelRight = !this.isShowEntityDelRight;
    },
    /**
     * Hàm checkall
     * createdBy NHHAi 13/2/2022
     */
    checkAll() {
      // xét trường hợp nếu đã check hết các hàng thì sẽ bỏ check toàn bộ
      if (this.checkedId.length == this.paginationRequest.PageSize) {
        this.checkedId = [];
      }
      // trường hợp chưa check hết hàng thì nó sẽ check hết
      else if (this.checkedId.length >= 0) {
        this.checkedId = [];
        // thêm id vào mảng
        this.payments.forEach((payment) => {
          this.checkedId.push(payment.paymentId);
        });
      }
    },

    /**
     * Hàm xử lý khi checkbox ở vị trí Tr trên table
     * createdBy NHHAi 13/2/2022
     */
    checkboxOnTr() {
      if (this.checkedId.length < this.paginationRequest.PageSize) {
        this.isCheckAll = false;
      } else if (this.checkedId.length == this.paginationRequest.PageSize) {
        this.isCheckAll = true;
      }
    },

    /**
     * Hàm show btn xóa khi click vào Thực hiện hàng loạt
     * createdBy NHHAi 13/2/2022
     */
    showDelete(sender) {
      if (this.isShowEntityDel) {
        this.showD = !this.showD;
        // hiển thị vị trí của button xóa
        var rect = sender.currentTarget.getBoundingClientRect();
        var top = rect.top + 30;
        var left = rect.left + 100;
        this.$refs.delEntitysLeft.style.top = `${top}px`;
        this.$refs.delEntitysLeft.style.left = `${left}px`;
      }
    },

    /**
     * Hàm export dữ liệu ra excel
     * createdBy NHHai 14/2/2022
     */
    exportData() {
      try {
        window.location.href = this.host + this.export;
      } catch (error) {
        this.responseWithError(error);
      }
    },

    /**
     * Hàm lưu dữ liệu
     * createdBy NHHai 26/2/2022
     */
    saveData(value) {
      var me = this;
      me.checkBtn = value;
      axios
        .post(me.host + "MasterDetail", {
          Entity: me.payment,
          EntityDetails: me.paymentDetail,
        })
        .then((response) => {
          if (response && response.data.success && response.data.data) {
            if (me.checkBtn == me.FormMode.SaveAndAdd) {
              // TH nếu bấm Cất và Thêm thì sẽ hiện form thêm mới
              me.btnAddPayment();
            } else if (me.checkBtn == me.FormMode.SaveAndDisable) {
              me.disabled = true;
            } else {
              // ẩn form
              me.toggleDialog(false);
            }
            // Load lại dữ liệu
            me.loadData(FormMode.Page_Number_1);
            // toast messenge
            // hiện toast mesenge khi thêm mới thành công
            me.toastMessenge(
              ToastMessenge.Messenge_Success,
              ToastMessenge.Success
            );
            // ẩn popup
            me.showPopupParent(false);
          } else {
            // gọi đến hàm trả về lỗi
            me.responseWithError(response);
            // ẩn loading
            me.overlay = false;
          }
        });
    },

    /**
     * Hàm db click trên tr
     * createdBy NHHAi 20/1/2022
     */
    async dbOnClickTr(value, bool) {
      var me = this;

      if (value) {
        me.overlay = true;
        // lấy số phiếu chi mới nếu là nhân bản
        if (bool) {
          var newPaymentNumber = await me.getNewPaymentNumber();
          me.disabled = false;
        } else me.disabled = true;

        axios
          .get(me.host + `${me.detailMaster}` + `${value}`)
          .then((response) => {
            if (response && response.data.success) {
              var data = response.data.data;
              // lấy dữ liệu
              me.payment = data.entity;
              me.paymentDetail = data.entityDetails;

              if (bool && newPaymentNumber.data.success) {
                me.payment.paymentNumber = newPaymentNumber.data?.data;
                // lấy ngày hiện tại nếu nhân bản
                me.payment.accountingDate = new Date();
                me.payment.paymentDate = new Date();
              } else {
                // format ngày
                me.payment.accountingDate = new Date(me.payment.accountingDate);
                me.payment.paymentDate = new Date(me.payment.paymentDate);
                // sinh lỗi ==================================================================================
              }
              // class ẩn hiện vị trí
              me.isShowEntityDelRight = false;
              // lấy dữ liệu trong các combobox
              me.getDataInCombobox();
            } else {
              me.responseWithError(response);
              me.overlay = false;
            }
          });
      }
    },

    async getDataInCombobox() {
      var me = this;
      // hiển thị popup
      me.toggleDialog(true);

      me.overlay = false;
      // lấy dữ liệu nhân viên và nhà cung cấp
      var responseEmployees = await me.getListEmployee();
      var responseSuppliers = await me.getListSupplier();

      // gán dữ liệu cho suppliers và employees
      if (responseEmployees.data.success) {
        me.employees = responseEmployees.data?.data;
      } else {
        // sinh lỗi ==================================================================================
        me.responseWithError(responseEmployees);
      }

      if (responseSuppliers.data.success) {
        me.suppliers = responseSuppliers.data?.data;
      } else {
        // sinh lỗi ==================================================================================
        me.responseWithError(responseSuppliers);
      }

      // lấy tài khoản dư nợ
      var accountDebit = await me.getAccountDebit();
      // lấy tài khoản dư có
      var accountCredit = await me.getAccountCredit();

      if (accountDebit.data.success) {
        me.accountDebit = accountDebit.data?.data;
      } else {
        // sinh lỗi ==================================================================================
        me.responseWithError(accountDebit);
      }

      if (accountCredit.data.success) {
        me.accountCredit = accountCredit.data?.data;
      } else {
        // sinh lỗi ==================================================================================
        me.responseWithError(accountCredit);
      }
    },

    /**
     * Hiên thị popup xóa
     * CreatedBy NHHai 13/2/2022
     */
    async showPopupDel(value) {
      // hiển thị loading
      this.overlay = true;
      if (value == this.FormMode.Delete) {
        this.id = this.checkID;
        // ẩn button xóa
        this.isShowEntityDelRight = false;
        // TH không phải chọn xóa tất cả
        this.isDelAll = false;
        // lấy mã code
        var response = await this.loadPaymentWithId(this.id);
        // xét trường hợp data rỗng
        // if (!response.data.data) {
        //   this.checkDataEmpty();
        //   return;
        // }
        var paymentNumber = response.data.data.paymentNumber;
        // gán text popup
        this.textPopup =
          this.deleteEmplFirst + `${paymentNumber}` + this.deleteEmplLast;
      } else {
        // TH xóa tất cả
        this.isDelAll = true;
        // gán text popup
        this.textPopup = this.FormMode.Delete_Suppliers_Checked;
      }
      // hiển thị
      this.display();
    },

    loadPaymentWithId(value) {
      try {
        return axios.get(this.host + value);
      } catch {
        console.log(1);
      }
    },

    /**
     * Hàm chung trong hiển thị popup del
     * createdBy NHHAi 14/2/2022
     */
    display() {
      this.isDelete = this.FormMode.Is_Delete_Y;
      this.textLeft = this.FormMode.Text_Left;
      this.showButtonLeft(true);
      this.showPopupParent(true);
      // ẩn loading
      this.overlay = false;
      // class ẩn hiện vị trí
      this.isShowEntityDelRight = false;
    },

    /**
     * Hàm gán hiển thị button left
     * createdBy NHHAI 15/2/2022
     * @param {*} value true or false
     */
    showButtonLeft(value) {
      this.isShowleft = value;
    },

    /**
     * Hàm hiển thị toast messenge
     * createdBy NHHAi 20/1/2022
     */
    toastMessenge(text, type) {
      this.$toast.open({
        message: text,
        type: type,
        duration: FormMode.Time,
        dismissible: true,
      });
    },
    /**
     * Hàm gán hiển thị popup
     * createdBy NHHAI 15/2/2022
     * @param {*} value true or false
     */
    showPopupParent(value) {
      this.isShowPopup = value;
      if (value == false) {
        // hiển thị nút đóng đồng ý ở giữa popup
        this.isAgree = false;
      }
    },

    /**
     * Hàm phản hồi lỗi
     * createdBy NHHAI 15/2/2022
     * @param {*} response
     */
    responseWithError(response) {
      var me = this;
      if (response) {
        switch (response.data.code) {
          case 400:
            if (response.data.validateInfo[0].errorCode == 2) {
              // TH trùng mã
              me.showButtonLeft(true);
              this.textLeft = this.FormMode.Text_Left;
              // me.isAgree = true;
              me.isDelete = null;
              me.isIncrease = true;
              me.textPopup =
                this.textFirst +
                me.payment.paymentNumber +
                this.textBody +
                me.payment.paymentNumber +
                this.textLast;
              me.showPopupParent(true);
            } else {
              me.showButtonLeft(false);
              me.isAgree = true;
              me.isDelete = null;
              me.textPopup =
                response.data.validateInfo[0].fieldName +
                response.data.validateInfo[0].errorMessage;
              me.showPopupParent(true);
              break;
            }
            break;
          case 500:
            break;
          default:
            break;
        }
      }
    },
  },
};
</script>

<style scoped>
@import url("../../../style/layout/content.css");
@import url("../../../style/layout/supplier.css");
@import url("../../../style/component/tab.css");
</style>
