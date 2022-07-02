<template>
  <div class="process">
    <div class="left-process">
      <div class="header-left-process">Nghiệp vụ tiền mặt</div>
      <div class="content-left-process">
        <div class="mi-h-340 mi-process-cash">
          <div
            class="face-button face-btn-pos-1"
            @mousemove="overReceive($event)"
          >
            Thu tiền
          </div>
          <div
            class="face-button face-btn-pos-2"
            @mousemove="overPayment($event)"
          >
            Chi tiền
          </div>
          <div
            class="face-button face-btn-pos-3"
            @mousemove="overAudit($event)"
          >
            Kiểm kê quỹ
          </div>
        </div>
      </div>
      <div class="footer-left-process">
        <div class="dictionary-item">
          <router-link class="dictionary-content" to="/app/supplier">
            <div class="m-icon mi-24 mi-process-customer"></div>
            <div class="dictionary-text">Nhà cung cấp</div>
          </router-link>
          <router-link class="dictionary-content" to="/app/account">
            <div class="m-icon mi-24 mi-calculate"></div>
            <div class="dictionary-text">Hệ thống tài khoản</div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="right-process">
      <div class="header-right-process">Báo cáo</div>
      <div class="content-right-process">
        <ul>
          <li class="li-process">S03a1-DN: Sổ nhật ký thu tiền</li>
          <li class="li-process">Bảng kê số dư tiền theo ngày</li>
          <li class="li-process">Sổ kế toán chi tiết quỹ tiền mặt</li>
          <li class="li-process">Dòng tiền</li>
          <li class="li-process">S03a2-DN: Sổ nhật ký chi tiền</li>
        </ul>
      </div>
      <div class="footer-right-process">Tất cả báo cáo</div>
    </div>
    <div
      id="entityTooltipReceive"
      class="multiple-process"
      ref="receive"
      :class="{ none: receive }"
      @mouseleave="outReceive($event)"
    >
      <div class="multiple">Phiếu thu</div>
      <div class="multiple">Thu tiền theo hóa đơn</div>
      <div class="multiple">Thu tiền theo hóa đơn nhiều khách hàng</div>
    </div>
    <div
      id="entityTooltipPayment"
      class="multiple-process"
      ref="paymentProcess"
      :class="{ none: paymentProcess }"
      @mouseleave="outPayment($event)"
    >
      <div class="multiple" @click="btnAddPayment">Phiếu Chi</div>
      <div class="multiple">Trả tiền theo hóa đơn</div>
      <div class="multiple">Nộp thuế</div>
    </div>
    <div
      id="entityTooltipAudit"
      ref="audit"
      class="multiple-process"
      :class="{ none: audit }"
      @mouseleave="outAudit($event)"
    >
      <div class="multiple">Kiểm kê</div>
    </div>
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
  </div>
</template>
<script>
import axios from "axios";
import FormMode from "../../../script/enum.js";
import ToastMessenge from "../../../script/toast.js";
import PaymentDetailModel from "../../../models/paymentDetail.js";

import Payment from "../../../models/payment.js";
// import Payment from "../../../models/payment.js";
export default {
  name: "Process",
  component: {
    // PaymentDetail
  },
  data() {
    return {
      receive: true,
      paymentProcess: true,
      audit: true,
      // payment detail
      // isShowPopupDetail: false,
      // payments: [],
      // suppliers: [],
      // employees: [],
      // paymentDetail: [],
      // checkDelOnClickTr: false, // xóa dòng mới nhất
      // accountDebit: [],
      // accountCredit: [],

      // ========================================================
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
      paymentDetail: [],
      description: "Chi tiền cho ",
      oldSupplierId: null, // giá trị supplerId cũ,
      checkDelOnClickTr: false, // xóa dòng mới nhất
      FormMode,
      overlay: false,
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
      payment: new Payment(),
    };
  },
  methods: {
    hideMenu() {
      this.receive = true;
      this.paymentProcess = true;
      this.audit = true;
    },
    /**
     * Hàm Hiển thị menu của thu tiền
     * createdBy NHHAi 12/2/2021
     */
    overReceive(sender) {
      // lấy vị trí đối tượng
      var rect = this.takePosition(sender);
      var top = rect.top + 80;
      var left = rect.left;
      // xét vị trí của menu
      this.$refs.receive.style.top = `${top}px`;
      this.$refs.receive.style.left = `${left}px`;
      // hiển thị
      this.receive = false;
    },
    /**
     * Hàm Hiển thị menu của chi tiền
     * createdBy NHHAi 12/2/2021
     */
    overPayment(sender) {
      // lấy vị trí đối tượng
      var rect = this.takePosition(sender);
      var top = rect.top + 80;
      var left = rect.left;
      // xét vị trí của menu
      this.$refs.paymentProcess.style.top = `${top}px`;
      this.$refs.paymentProcess.style.left = `${left}px`;
      // hiển thị
      this.paymentProcess = false;
    },
    /**
     * Hàm Hiển thị menu của kiểm kê
     * createdBy NHHAi 12/2/2021
     */
    overAudit(sender) {
      // lấy vị trí đối tượng
      var rect = this.takePosition(sender);
      var top = rect.top + 80;
      var left = rect.left;
      // xét vị trí của menu
      this.$refs.audit.style.top = `${top}px`;
      this.$refs.audit.style.left = `${left}px`;
      // hiển thị
      this.audit = false;
    },

    /**
     * Hàm ẩn menu của thu tiền
     * createdBy NHHAi 12/2/2021
     */
    outReceive() {
      this.receive = true;
    },
    /**
     * Hàm ẩn menu của chi tiền
     * createdBy NHHAi 12/2/2021
     */
    outPayment() {
      this.paymentProcess = true;
    },
    /**
     * Hàm ẩn menu kiểm kê
     * createdBy NHHAi 12/2/2021
     */
    outAudit() {
      this.audit = true;
    },
    /**
     * Hàm lấy vị trí đối tượng
     * createdBy NHHAi 12/2/2022
     */
    takePosition(sender) {
      // ẩn tất cả menu
      this.hideMenu();
      return sender.currentTarget.getBoundingClientRect();
    },

    // ======================= PAYMENTDETAIL ++++++++++++++++++++++++++++

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
     * hàm ẩn hiện dialog
     * @param value
     * createdBy NHHAi 22/2/2022
     */
    toggleDialog(value) {
      this.isShowPopupDetail = value;
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
        // gán giá trị supplierObject
        me.payment.supplierObject = value.supplierName;
        // gán giá trị supplierId cũ
        me.oldSupplierId = value.supplierId;
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
     * Hàm xóa 1 hàm bất kỳ
     * creaedBy NHHai 21/2/2022
     */
    delAnyRow(index) {
      this.paymentDetail.splice(index, 1);
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
            // toast messenge
            // hiện toast mesenge khi thêm mới thành công
            me.toastMessenge(
              ToastMessenge.Messenge_Success,
              ToastMessenge.Success
            );
            // ẩn popup
            // me.showPopupParent(false);
          } else {
            // gọi đến hàm trả về lỗi
            me.responseWithError(response);
            // ẩn loading
            me.overlay = false;
          }
        });
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
  },
};
</script>
<style scoped>
@import url("../../../style/layout/process.css");
@import url("../../../style/common/common.css");
</style>
