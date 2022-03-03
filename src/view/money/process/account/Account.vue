<template>
  <div>
    <div class="content">
      <div class="header-content">
        <div class="title-content">
          <span>Hệ thống tài khoản</span>
          <div class="footer-header">
            <div
              class="pos-absolute m-icon mi-icon-16 mi-chevron-left--primary"
            ></div>
            <a class="text-footer-header" href="#">Tất cả danh mục</a>
          </div>
        </div>
        <div class="button-content">
          <button class="btn-radius-left" @click="btnAddAccount">Thêm</button>
          <button class="btn-radius-right">
            <div class="line"></div>
            <div
              class="pos-icon-btn m-icon mi-icon-16 mi-arrow-up--white"
            ></div>
          </button>
        </div>
      </div>
      <div class="filter">
        <div class="button-left">
          <input
            id="txtSearch"
            class="m-input"
            type="text"
            placeholder="Tìm theo mã,tên nhân viên"
          />
          <div class="icon-input m-icon m-icon-input"></div>
        </div>
        <div
          id="refresh"
          class="icon-load m-icon m-icon-load"
          @click="loadData"
        ></div>
      </div>
      <div class="m-table">
        <table class="common-table" border="0" cellspacing="0">
          <colgroup>
            <col style="min-width: 9px" />
            <col style="min-width: 1px" />
            <col style="min-width: 225px" />
            <col style="min-width: 250px" />
            <col style="min-width: 100px" />
            <col style="min-width: 250px" />
            <col style="min-width: 100px" />
            <col style="min-width: 120px" />
            <col style="min-width: 110px" />
            <col style="min-width: 30px" />
            <col style="min-width: 20px" />
          </colgroup>
          <thead>
            <tr>
              <th></th>
              <th class="ps-absolute" v-bind:style="{ top: '-34px' }"></th>
              <th>SỐ TÀI KHOẢN</th>
              <th>TÊN TÀI KHOẢN</th>
              <th>TÍNH CHẤT</th>
              <th>TÊN TIẾNG ANH</th>
              <th>DIỄN GIẢI</th>
              <th>TRẠNG THÁI</th>
              <th class="text-function">CHỨC NĂNG</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
        </table>
        <RowTreeGrid
          :data="data"
          @dbOnClickTr="dbOnClickTr($event)"
          @showBtnDel="showBtnDel($event)"
        >
        </RowTreeGrid>
      </div>
      <div class="paging-bar">
        <div class="paging-text">
          Tổng số <b class="total-record">{{ recordNumber }}</b> bản ghi
        </div>
      </div>
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
      <div class="multiple">Nhân bản</div>
      <div class="multiple" @click="showPopupDel">Xóa</div>
      <div class="multiple">Ngưng sử dụng</div>
    </div>
    <account-detail
      :isShow="isShowDialogDetail"
      :account="account"
      :accountCombobox="accountCombobox"
      :accountNumber="accountNumber"
      @saveAccount="saveAccount($event)"
      @showDialog="showDialogParent"
      @parentId="setParentId"
      @select="setSelect($event)"
      @object="setObject($event)"
      @costAggregationObj="setCostAggregationObj($event)"
      @order="setOrder($event)"
      @purchaseContract="setPurchaseContract($event)"
      @unit="setUnit($event)"
      @contruction="setContruction($event)"
      @contractSale="setContractSale($event)"
      @expenseItem="setExpenseItem($event)"
      @statisticalCode="setStatisticalCode($event)"
    ></account-detail>
    <!-- ==============================popup ======================================-->
    <account-popup
      :isShow="isShowPopupDetail"
      :textPopup="textPopup"
      :employeeId="id"
      :isShowBtn="isShowleft"
      :textLeft="textLeft"
      :isDelete="isDelete"
      :isAgree="isAgree"
      :isDelAll="isDelAll"
      :checkedId="checkedId"
      :host="host"
      :isInfo="isInfo"
      @loadData="loadData($event)"
      @showPopup="showPopupParent"
    />
    <!-- ==============================loading ======================================-->
    <base-overlay :overlay="overlay"></base-overlay>
  </div>
</template>
<script>
import BaseOverlay from "../../../../components/base/BaseOverlay.vue";
import AccountPopup from "../../../../components/base/BasePopup.vue";

import Account from "../../../../models/account.js";
import AccountDetail from "./AccountDetail.vue";
import RowTreeGrid from "./RowTreeGrid.vue";
import FormMode from "../../../../script/enum.js";
import ToastMessenge from "../../../../script/toast.js";
import axios from "axios";
export default {
  name: "example",
  components: {
    // TableT,
    RowTreeGrid,
    AccountDetail,
    AccountPopup,
    BaseOverlay,
  },
  data() {
    return {
      host: `${process.env.VUE_APP_BASE_URL}/Accounts/`,
      isShowDialogDetail: false,
      account: new Account(),
      accountCombobox: [],
      data: [],
      FormMode,
      ToastMessenge,
      duplicateCodeFirst: "Mã nhân viên <",
      duplicateCodeLast: "> đã tồn tại trong hệ thống,vui lòng kiểm tra lại.",
      checkedId: [],
      isInfo: false,
      id: null,
      isDelAll: false,
      isShowPopupDetail: false,
      textPopup: null,
      textLeft: "",
      isAgree: false,
      isShowleft: false,
      isDelete: null,
      overlay: false,
      recordNumber: 0,
      isShowEntityDelRight: false,
      checkID: null,
      deleteFirst: `Bạn có thực sự muốn xóa tài khoản <`,
      deleteLast: `> không?`,
      accountNumber: "",
    };
  },
  mounted() {
    // Bắt sự kiện shortcuts
    const keysPressed = {};
    const me = this;
    document.addEventListener("keydown", (event) => {
      if (keysPressed["Control"] && (event.key == "o" || event.key == "O")) {
        event.preventDefault(); // hủy sự kiện mặc định
      }
      keysPressed[event.key] = true;
      // Show dialog
      if (keysPressed["Control"] && (event.key == "o" || event.key == "O")) {
        //TODO
        me.btnAddAccount();
      }
    });
    // xóa sự kiện keydown
    document.addEventListener("keyup", (event) => {
      delete keysPressed[event.key];
    });
  },
  created() {
    // khởi tạo dữ liêu trong table
    this.loadData();
  },

  methods: {
    /**
     * Hiên thị popup xóa
     * CreatedBy NHHai 28/2/2022
     */
    async showPopupDel() {
      var me = this;
      // hiển thị loading
      me.overlay = true;
      me.id = me.checkID;
      // ẩn button xóa
      me.isShowEntityDelRight = false;
      // lấy mã code
      var response = await me.loadAccountWithIdChild(me.id);
      if (response.data.success) {
        // xét trường hợp data rỗng
        if (!response.data.data) {
          this.checkDataEmpty();
          return;
        }
        var accountNumber = response.data.data;
        // gán text popup
        me.textPopup = me.deleteFirst + accountNumber + me.deleteLast;
        // icon
        me.isInfo = false;
        // hiển thị
        me.display();
      } else {
        //hiển thị popup
        // hiển thị icon
        me.isInfo = true;
        // ẩn các trường hợp nút bấm
        me.isAgree = false;
        me.isDelete = null;
        me.isShowleft = false;
        // hiển thị popup
        me.showPopupParent(true);
        me.textPopup = response.data.errorMessage;
      }

      me.overlay = false;
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
    },

    loadAccountWithIdChild(accountId) {
      return axios.get(this.host + "AccountId/" + accountId);
    },
    /**
     * hiển thị nút xóa
     * CreatedBy NHHai 13/2/2022
     */
    showBtnDel(value) {
      this.checkID = value.id;
      this.isShowEntityDelRight = value.isShow;
      var rect = value.sender.currentTarget.getBoundingClientRect();
      var top = rect.top + 20;
      this.$refs.delEntityRight.style.top = `${top}px`;
    },
    /**
     * Load dữ liệu
     * creatdBy NHHai 17/2/2022
     */
    async loadData() {
      var me = this;
      me.overlay = true;
      axios.get(`${this.host}GetAccountTree`).then((response) => {
        if (response.data.success) {
          // lấy danh sách
          me.data = response.data.data.entitys;
          // lấy tổng số bản ghi
          me.reco = response.data.data.totalEntitys;
          me.overlay = false;
        } else {
          me.responseWithError(response);
        }
      });
    },
    /**
     * Mở form thêm mới
     * creatdBy NHHai 17/2/2022
     */
    async btnAddAccount() {
      var me = this;
      me.accountNumber = "";
      me.overlay = true;
      // hiển thị dialog
      me.showDialogParent(true);
      // gán giá trị măc định cho account
      me.account = new Account();
      // lấy dữ liệu cho combobox data
      me.listAccounts();
      // if(!response.data.data){
      //   return;
      // }
      me.forcusOnInput();
    },
    forcusOnInput() {
      // focus vào ô số tài khoản
      setTimeout(() => {
        document.getElementById("accountNumber").focus();
        this.overlay = false;
      }, 0);
    },
    async listAccounts() {
      var me = this;
      me.accountCombobox = [];
      var accountCbx = await me.getAccounts();
      // accountCbx.data.data.forEach((res) => {
      //   // lấy text và value
      //   var account = {};
      //   account.text = res.accountNumber;
      //   account.value = res.accountId;
      //   // gán giá trị cho supplierGroups
      //   me.accountCombobox.push(account);
      // });
      if (accountCbx && accountCbx.data.data) {
        me.accountCombobox = accountCbx.data.data;
      }
    },

    /**
     * Hàm load dữ liệu từ theo mã accountId vào from dialog tài khoản
     * createdBy NHHAI 19/2/2022
     * @param accountId là giá trị accountId của mỗi tr trong bảng
     */
    async dbOnClickTr(accountId) {
      var me = this;
      if (accountId != null) {
        // load dữ liệu
        me.overlay = true;
        // lấy dữ liệu theo id
        var response = await me.loadAccountWithId(accountId);
        // xét trường hợp data rỗng
        if (!response.data.data) {
          me.checkDataEmpty();
          return;
        }
        // gán dữ liệu cho supplierProps
        me.account = response.data.data;
        me.accountNumber = response.data.data.parentName;
        this.listAccounts();
        // Hiển thị dialog thông tin chi tiết nhân viên
        me.showDialogParent(true);
        // focus
        this.forcusOnInput();
      }
    },

    /**
     * Hàm kiểm tra dữ liệu trống
     * createdBy NHHAi 14/2/2022
     */
    checkDataEmpty() {
      this.textPopup = FormMode.No_Data;
      this.isInfo = true;
      this.showButtonLeft(false);
      this.showPopupParent(true);
      // ẩn dữ liệu
      this.overlay = false;
      // load lại dữ liệu
      this.loadData();
    },

    loadAccountWithId(value) {
      return axios.get(`${this.host}` + `${value}`);
    },

    /**
     * Hàm gán giá trị cho isShowDialogDetail
     * createdBy NHHAI 15/2/2022
     * @param {*} value true or false
     */
    showDialogParent(value) {
      this.isShowDialogDetail = value;
    },

    /**
     * gán giá trị danh xưng
     * CreatedBy NHHai 28/12/2021
     */
    setSelect(value) {
      if (value == undefined) value = null;
      this.account.accountCategoryKind = value;
    },
    /**
     * gán giá trị danh xưng
     * CreatedBy NHHai 28/12/2021
     */
    setObject(value) {
      if (value == undefined) value = null;
      this.account.detailByObjectKind = value;
    },
    /**
     * gán giá trị danh xưng
     * CreatedBy NHHai 28/12/2021
     */
    setCostAggregationObj(value) {
      if (value == undefined) value = null;
      this.account.detailByCostAggregationObjKind = value;
    },
    /**
     * gán giá trị danh xưng
     * CreatedBy NHHai 28/12/2021
     */
    setOrder(value) {
      if (value == undefined) value = null;
      this.account.detailByOrderKind = value;
    },
    /**
     * gán giá trị danh xưng
     * CreatedBy NHHai 28/12/2021
     */
    setPurchaseContract(value) {
      if (value == undefined) value = null;
      this.account.detailByPurchaseContractKind = value;
    },
    /**
     * gán giá trị danh xưng
     * CreatedBy NHHai 28/12/2021
     */
    setUnit(value) {
      if (value == undefined) value = null;
      this.account.detailByUnitKind = value;
    },
    /**
     * gán giá trị danh xưng
     * CreatedBy NHHai 28/12/2021
     */
    setContruction(value) {
      if (value == undefined) value = null;
      this.account.detailByContructionKind = value;
    },
    /**
     * gán giá trị danh xưng
     * CreatedBy NHHai 28/12/2021
     */
    setContractSale(value) {
      if (value == undefined) value = null;
      this.account.detailByContractSaleKind = value;
    },
    /**
     * gán giá trị danh xưng
     * CreatedBy NHHai 28/12/2021
     */
    setExpenseItem(value) {
      if (value == undefined) value = null;
      this.account.detailByExpenseItemKind = value;
    },
    /**
     * gán giá trị danh xưng
     * CreatedBy NHHai 28/12/2021
     */
    setStatisticalCode(value) {
      if (value == undefined) value = null;
      this.account.detailByStatisticalCodeKind = value;
    },

    /**
     * Hàm load tất cả dữ liệu
     * createdBy NHHai 20/2/2022
     */
    getAccounts() {
      return axios.get(this.host);
    },

    /**
     * gán giá trị parentId
     * CreatedBy NHHai 20/2/2022
     */
    setParentId() {
      var me = this;
      if (me.account.parentId) {
        axios.get(me.host + me.account.parentId).then((res) => {
          if (res && res.data.success) {
            me.accountNumber = res.data.data.accountNumber;
          }
        });
      }
    },

    /**
     * Hàm lưu tài khoản
     * createdBy NHHAi 20/2/2022
     */
    saveAccount(value) {
      var me = this;
      me.overlay = true;
      var api;
      if (!value.account.accountId) {
        delete value.account["accountId"];
        //gọi api thực hiện cất dữ liệu
        api = axios.post(me.host, value.account);
      } else {
        //gọi api thực hiện cất dữ liệu
        api = axios.put(me.host + `${value.account.accountId}`, value.account);
      }
      api.then((response) => {
        if (response.data.success && response.data.data) {
          if (value.value == FormMode.SaveAndAdd) {
            // TH nếu bấm Cất và Thêm thì sẽ hiện form thêm mới
            me.btnAddAccount();
          } else {
            // ẩn form
            me.showDialogParent(false);
          }
          // Load lại dữ liệu
          me.loadData(FormMode.Page_Number_1);
          // toast messenge
          if (!value.account.accountId) {
            // hiện toast mesenge khi thêm mới thành công
            me.toastMessenge(
              ToastMessenge.Messenge_Success,
              ToastMessenge.Success
            );
          } else {
            // hiện toast mesenge khi cập nhật thành công
            me.toastMessenge(
              ToastMessenge.Messenge_Update_Success,
              ToastMessenge.Success
            );
          }
          me.overlay = false;
        } else {
          //   // gọi đến hàm trả về lỗi
          me.responseWithError(response);
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

    /**
     * hàm trả về lỗi khi gọi api
     * @param res lỗi
     * createdBy NHHAi 14/1//2022
     */
    responseWithError(res) {
      var me = this;
      // ẩn loading
      me.overlay = false;
      if (res.data) {
        const statusCode = res.data.code;
        switch (statusCode) {
          // nếu mã lỗi 400 thì hiển thị cảnh thông báo lỗi
          case 400:
            me.showButtonLeft(false);
            me.isAgree = true;
            me.isDelete = null;
            if (res.data.validateInfo[0].errorCode == 2) {
              me.textPopup =
                res.data.validateInfo[0].fieldName +
                " " +
                me.account.accountNumber +
                res.data.validateInfo[0].errorMessage;
            } else {
              me.textPopup =
                res.data.validateInfo[0].fieldName +
                res.data.validateInfo[0].errorMessage;
            }
            me.showPopupParent(true);
            break;
          case 500:
            me.showButtonLeft(false);
            me.isDelete = null;
            me.textPopup = res.data.errorMessage;
            me.showPopupParent(true);
            break;
          default:
            break;
        }
      } else {
        me.showButtonLeft(false);
        me.isDelete = null;
        me.textPopup = FormMode.Status_500;
        me.showPopupParent(true);
      }
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
     * Hàm gán hiển thị popup
     * createdBy NHHAI 15/2/2022
     * @param {*} value true or false
     */
    showPopupParent(value) {
      this.isShowPopupDetail = value;
    },
  },
};
</script>

<style scoped lang="css">
@import url("../../../../style/layout/content.css");
@import url("../../../../style/component/button.css");
@import url("../../../../style/component/checkbox.css");
@import url("../../../../style/component/icon.css");
@import url("../../../../style/component/input.css");
@import url("../../../../style/component/loading.css");
@import url("../../../../style/component/paging-bar.css");
@import url("../../../../style/component/select.css");
@import url("../../../../style/component/table.css");
@import url("../../../../style/component/custom-lib-table.css");
@import url("../../../../style/common/common.css");
</style>
