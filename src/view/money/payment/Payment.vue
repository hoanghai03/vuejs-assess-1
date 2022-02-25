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
    <PaymentDetail
      :isShow="isShowPopupDetail"
      :suppliers="suppliers"
      :employees="employees"
      :payment="payment"
      :paymentDetail="paymentDetail"
      :checkDelOnClickTr="checkDelOnClickTr"
      :accountDebit="accountDebit"
      :accountCredit="accountCredit"
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
    ></PaymentDetail>
  </div>
</template>
<script>
import axios from "axios";
// import Supplier from "../../../../models/supplier.js";
// import PaginationRequest from "../../../../models/request.js";
// import ServiceResult from "../../../../models/service-result.js";

// import SupplierGroup from "../../../../models/supplierGroup.js";
// import FormMode from "../../../../script/enum.js";
// import ToastMessenge from "../../../../script/toast.js";
import PaymentDetailModel from "../../../models/paymentDetail.js";
import PaymentDetail from "./PaymentDetail.vue";
import Payment from "../../../models/payment.js";
export default {
  name: "Payment",
  components: { PaymentDetail },
  data() {
    return {
      hostSuppliers: `${process.env.VUE_APP_BASE_URL}/Suppliers/`,
      hostEmployees: `${process.env.VUE_APP_BASE_URL}/Employees/`,
      host: `${process.env.VUE_APP_BASE_URL}/Payments/`,
      hostAccounts: `${process.env.VUE_APP_BASE_URL}/Accounts/`,
      getDebit: "GetAccountDebit",
      getCredit: "GetAccountCredit",
      suppliers: [],
      employees: [],
      accountDebit: [],
      accountCredit: [],
      isShowPopupDetail: false,
      debit: false,
      totalDebit: false,
      payment: new Payment(),
      paymentDetail: [],
      description: "Chi tiền cho ",
      oldSupplierId: null, // giá trị supplerId cũ,
      checkDelOnClickTr: false, // xóa dòng mới nhất
    };
  },
  created(){
    this.loadData();
  },
  methods: {

    loadData(){

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
      me.payment = new Payment();
      // lấy dữ liệu nhân viên và nhà cung cấp
      var responseEmployees = await me.getListEmployee();
      var responseSuppliers = await me.getListSupplier();
      // lấy số phiếu chi mới
      var newPaymentNumber = await me.getNewPaymentNumber();
      // lấy tài khoản dư nợ
      var accountDebit = await me.getAccountDebit();
      // lấy tài khoản dư có
      var accountCredit = await me.getAccountCredit();

      if (newPaymentNumber.data.success) {
        me.payment.paymentNumber = newPaymentNumber.data?.data;
      } else {
        // sinh lỗi ==================================================================================
      }

      // gán dữ liệu cho suppliers và employees
      if (responseEmployees.data.success) {
        me.employees = responseEmployees.data?.data;
      } else {
        // sinh lỗi ==================================================================================
      }

      if (responseSuppliers.data.success) {
        me.suppliers = responseSuppliers.data?.data;
      } else {
        // sinh lỗi ==================================================================================
      }

      if (accountDebit.data.success) {
        me.accountDebit = accountDebit.data?.data;
      } else {
        // sinh lỗi ==================================================================================
      }

      if (accountCredit.data.success) {
        me.accountCredit = accountCredit.data?.data;
      } else {
        // sinh lỗi ==================================================================================
      }

      // gán dữ liệu cho paymentDetail
      me.paymentDetail = [];
      me.paymentDetail.push(new PaymentDetailModel());

      //lấy giá trị supplier cũ
      me.oldSupplierId = "";
      // hiển thị popup
      me.toggleDialog(true);
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
        return axios.get(this.hostSuppliers + value);
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
      if (response.data.success) {
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
      if (response.data.success) {
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
      var response = await me.getAccountById(me.paymentDetail[index].debitAccount);
      if (response.data.success) {
        var data = response.data.data;
        me.paymentDetail[index].debitAccountNumber = data.accountNumber;
      }
    },

    
    /**
     * Hàm gán giá trị cho creditAccountNumber
     * creaedBy NHHai 21/2/2022
     */
    async getAccountNumberCredit(index) {
      var me = this;
      var response = await me.getAccountById(me.paymentDetail[index].creditAccount);
      if (response.data.success) {
        var data = response.data.data;
        me.paymentDetail[index].creditAccountNumber = data.accountNumber;
      }
    },

    /**
     * Hàm lấy tìa khoản theo id
     * creaedBy NHHai 21/2/2022
     */
    getAccountById(value) {
      try {
        return axios.get(this.hostAccounts + value);
      } catch {
        return;
      }
    },

    /**
     * Hàm xóa 1 hàm bất kỳ
     * creaedBy NHHai 21/2/2022
     */
    delAnyRow(index){
      this.paymentDetail.splice(index,1);
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
  },
};
</script>

<style scoped>
@import url("../../../style/layout/content.css");
@import url("../../../style/layout/supplier.css");
@import url("../../../style/component/tab.css");
</style>
