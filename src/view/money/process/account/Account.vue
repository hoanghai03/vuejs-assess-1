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
        <div id="refresh" class="icon-load m-icon m-icon-load"></div>
      </div>
      <div class="m-table">
        <!-- <TableT
          ref="table"
          sum-text="sum"
          index-text="#"
          :data="data"
          :columns="columns"
          :stripe="props.stripe"
          :border="props.border"
          :show-header="props.showHeader"
          :show-summary="props.showSummary"
          :show-row-hover="props.showRowHover"
          :show-index="props.showIndex"
          :tree-type="props.treeType"
          :is-fold="false"
          :expand-type="props.expandType"
          :selection-type="props.selectionType"
        >
        </TableT> -->
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
              <th class="ps-absolute"></th>
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
        >
        </RowTreeGrid>
      </div>
      <div class="paging-bar">
        <div class="paging-text">
          Tổng số <b class="total-record">{{data.length}}</b> bản ghi
        </div>
      </div>
    </div>
    <account-detail
      :isShow="isShowDialogDetail"
      :account="account"
      :accountCombobox="accountCombobox"
      @saveAccount="saveAccount($event)"
      @showDialog="showDialogParent"
      @parentId="setParentId($event)"
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
  </div>
</template>
<script>
// import TableT from "vue-table-with-tree-grid";
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
  },
  data() {
    return {
      host: `${process.env.VUE_APP_BASE_URL}/Accounts/`,
      isShowDialogDetail: false,
      account: new Account(),
      accountCombobox: [],
      data: [],
      FormMode,
      ToastMessenge
    };
  },
  computed: {
    propList() {
      return Object.keys(this.props).map((item) => ({
        name: item,
      }));
    },
  },
  created() {
    // khởi tạo dữ liêu trong table
    this.loadData();
  },

  methods: {
    /**
     * Load dữ liệu
     * creatdBy NHHai 17/2/2022
     */
    loadData() {
      var me = this;

      axios
        .get(`${this.host}GetAccountTree`)
        .then((response) => {
          if (response.data.success) {
            me.data = response.data.data;
            // setTimeout(() => {
            //   const rows = document.querySelectorAll(".zk-table__body-row");
            //   console.log(rows);
            //   rows.forEach((row) =>
            //     row.addEventListener("dblclick", () => {
            //       this.btnAddAccount();
            //     })
            //   );
            // }, 300);
          }
        });
    },
    /**
     * Mở form thêm mới
     * creatdBy NHHai 17/2/2022
     */
    async btnAddAccount() {
      var me = this;
      // hiển thị dialog
      me.showDialogParent(true);
      // gán giá trị măc định cho account
      me.account = new Account();
      // lấy dữ liệu cho combobox data
      me.listAccounts()
      // if(!response.data.data){
      //   return;
      // }
      this.listAccounts();

      // focus vào ô số tài khoản
      setTimeout(() => {
        document.getElementById("accountNumber").focus();
      }, 0);
    },

    async listAccounts(){
      var me = this;
      me.accountCombobox = [];
      var accountCbx = await me.getAccounts();
      accountCbx.data.data.forEach((res) => {
        // lấy text và value
        var account = {};
        account.text = res.accountNumber;
        account.value = res.accountId;
        // gán giá trị cho supplierGroups
        me.accountCombobox.push(account);
      });
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
        // me.overlay = true;
        // lấy dữ liệu theo id
        var response = await me.loadAccountWithId(accountId);
        // xét trường hợp data rỗng
        if (!response.data.data) {
          // me.checkDataEmpty();
          return;
        }
        // gán dữ liệu cho supplierProps
        me.account = response.data.data;
        this.listAccounts();
        // gán giá trị cho cờ nhân bản
        // this.isReplication = value;
        //kiểm tra là nhân bản hay ko
        // if (this.isReplication) {
        //   // thực hiện lấy mã code
        //   var data = await this.loadNewSupplierCode();
        //   if (data.data != "") {
        //     // gán dữ liệu vào supplierCode
        //     this.supplierProps.supplierCode = data.data;
        //   }
        // }
        // hiển thị danh sách nhóm nhà cung cấp
        // me.listSupplierGroups();
        // hiển thị danh sách nhân viên
        // me.listEmployees();
        //ẩn button vừa nhấn
        // me.isShowEntityDelRight = false;
        // Hiển thị dialog thông tin chi tiết nhân viên
        me.showDialogParent(true);
        // focus
        // this.forcusOnInput();
        // ẩn load dữ liệu
        // me.overlay = false;
      }
    },

    loadAccountWithId(value){
      return axios.get(`${this.host}`+`${value}`);
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
    getAccounts(){
      return axios.get(this.host)
    },

        /**
     * gán giá trị parentId
     * CreatedBy NHHai 20/2/2022
     */
    setParentId(value) {
      if (value == undefined) value = null;
      this.account.parentId = value;
    },

    /**
     * Hàm lưu tài khoản
     * createdBy NHHAi 20/2/2022
     */
    saveAccount(value) {
      var me = this;
      // hiển thị loading
      // me.overlay = true;
      // xét trường hợp không chọn tài khoản trong combobox
      // if (value.supplierValue.employeeId == "") {
      //   delete value.supplierValue["employeeId"];
      // }
      // xét trường hợp không chọn danh xưng trong combobox
      // if (value.supplierValue.prefix == "") {
      //   delete value.supplierValue["prefix"];
      // }
      var api;
      if (!value.account.accountId) {
        delete value.account["accountId"];
        //gọi api thực hiện cất dữ liệu
        api = axios.post(me.host, value.account);
      } else {
        //gọi api thực hiện cất dữ liệu
        api = axios.put(
          me.host + `${value.account.accountId}`,
          value.account
        );
      }
      api.then((response) => {
        if (response.data.success && response.data.data) {
          if (value.value == FormMode.SaveAndAdd) {
            // TH nếu bấm Cất và Thêm thì sẽ hiện form thêm mới
            me.btnAddOnClick();
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
        } else {
          //   // gọi đến hàm trả về lỗi
          me.responseWithError(response);
          //   // ẩn loading
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

<style scoped lang="css">
.switch-list {
  margin: 20px 0;
  list-style: none;
  overflow: hidden;
}
.switch-item {
  margin: 20px;
  float: left;
}
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