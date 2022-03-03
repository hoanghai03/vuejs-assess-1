<template>
  <div>
    <div class="content">
      <div class="header-content">
        <div class="title-content">
          <span>Danh sách khách hàng</span>
          <div class="footer-header">
            <div
              class="pos-absolute m-icon mi-icon-16 mi-chevron-left--primary"
            ></div>
            <a class="text-footer-header" href="#">Tất cả danh mục</a>
          </div>
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
          <button class="btn-left m-r-10 p-r-20">Nhóm khách hàng</button>
          <button class="btn-radius-left" @click="btnAddOnClick">Thêm</button>
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
          <div class="total-money">444.357.876</div>
          <div class="label-overview">Nợ quá hạn</div>
          <div class="m-icon funnel-icon"></div>
          <div class="bottom-cm-overview" :class="{ none: debit }"></div>
        </div>
        <div
          class="common-overview total-debit-overview"
          @mouseover="falseTotalDebit"
          @mouseleave="trueTotalDebit"
        >
          <div class="total-money">978.587.564</div>
          <div class="label-overview">Tổng nợ phải thu</div>
          <div class="m-icon funnel-icon"></div>
          <div class="bottom-cm-overview" :class="{ none: totalDebit }"></div>
        </div>
        <div class="common-overview payment-overview">
          <div class="total-money">(748.795.356)</div>
          <div class="label-overview">Đã thanh toán(30 ngày gần đây)</div>
          <div class="m-icon funnel-icon"></div>
        </div>
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
                  v-model="isCheckAll"
                  @click="checkAll()"
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
              v-for="supplier in suppliers" :key="supplier.supplierId"
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
              <td class="text-bold">
                <button
                  class="btnEdit"
                  @click="dbOnClickTr(supplier.supplierId, false)"
                >
                  Lập CT mua hàng
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
        </table>
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
        <div class="multiple" @click="dbOnClickTr(checkID, true)">Nhân bản</div>
        <div class="multiple" @click="showPopupDel(FormMode.Delete)">Xóa</div>
        <div class="multiple">Ngưng sử dụng</div>
      </div>
      <div
        id="delEntity"
        class="delete-entity"
        @click="showPopupDel(FormMode.DeleteAll)"
        :class="{ show: showD, left: isShowLeftDel }"
        ref="delEntitysLeft"
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
    <!-- ==============================popup ======================================-->
    <supplier-popup
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
      @loadData="loadData($event)"
      @showPopup="showPopupParent"
    />
    <!-- ==============================dialog ======================================-->
    <supplier-detail
      :isShow="isShowDialogDetail"
      :supplier="supplierProps"
      :itemsSupplierGroup="supplierGroups"
      :itemsEmployee="employees"
      @showDialog="showDialogParent"
      @saveSupplier="saveSupplier($event)"
      @prefix="setPrefix($event)"
    />
  </div>
</template>
<script>
import axios from "axios";
import BaseOverlay from "../../../../components/base/BaseOverlay.vue";
import Supplier from "../../../../models/supplier.js";
import PaginationRequest from "../../../../models/request.js";
import ServiceResult from "../../../../models/service-result.js";

// import SupplierGroup from "../../../../models/supplierGroup.js";
import Paginate from "vuejs-paginate";
import FormMode from "../../../../script/enum.js";
import SupplierDetail from "./SupplierDetail.vue";
import SupplierPopup from "../../../../components/base/BasePopup.vue";
import ToastMessenge from "../../../../script/toast.js";
export default {
  name: "supplier",
  components: {
    BaseOverlay,
    Paginate,
    SupplierPopup,
    SupplierDetail,
  },
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
      suppliers: new Supplier(),
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
      supplierProps: new Supplier(),
      export: "export",
      NewSupplierCode: "NewSupplierCode",
      SupplierGroups: `${process.env.VUE_APP_BASE_URL}/SupplierGroups/`,
      // enum
      FormMode,
      ToastMessenge,
      isReplication: false,
      paginationRequest: new PaginationRequest(),
      ServiceResult: new ServiceResult(),
    };
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
        !me.isShowDialogDetail
      ) {
        //TODO
        me.btnAddOnClick();
        event.preventDefault();
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
  methods: {
    /**
     * Hàm load dữ liệu
     * createdBy NHHAi 13/2/2022
     */
    loadData(value) {
      var me = this;
      // gán giá trị 1 cho page number
      if (value == FormMode.Page_Number_1) {
        me.paginationRequest.PageNumber = FormMode.Page_Number_1;
      }
      me.overlay = true;

      axios
        .post(`${this.host}filter`, me.paginationRequest)
        .then((response) => {
          if (response.data.success) {
            // gán dữ liệu vào employees
            me.suppliers = response.data.data.data;
            // tổng số bản ghi
            me.totalRecord = response.data.data.totalRecord;
            me.totalPage = response.data.data.totalPage;
            // ẩn button xóa
            me.showD = false;
            // ẩn checkall
            me.isCheckAll = false;
            me.checkedId = [];
            // ẩn loading
            me.overlay = false;
          } else {
            me.responseWithError(response);
            me.overlay = false;
          }
        });
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
     * hiển thị nút xóa
     * CreatedBy NHHai 13/2/2022
     */
    showBtnDel(supplierId, sender) {
      this.checkID = supplierId;
      var rect = sender.currentTarget.getBoundingClientRect();
      var top = rect.top + 20;
      this.$refs.delEntityRight.style.top = `${top}px`;
      // class ẩn hiện vị trí
      this.isShowEntityDelRight = !this.isShowEntityDelRight;
      this.isShowLeftDelRight = false;
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
        this.suppliers.forEach((supplier) => {
          this.checkedId.push(supplier.supplierId);
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
        var response = await this.loadSupplierWithId(this.id);
        // xét trường hợp data rỗng
        if (!response.data.data) {
          this.checkDataEmpty();
          return;
        }
        var supplierCode = response.data.data.supplierCode;
        // gán text popup
        this.textPopup =
          this.deleteEmplFirst + `${supplierCode}` + this.deleteEmplLast;
      } else {
        // TH xóa tất cả
        this.isDelAll = true;
        // gán text popup
        this.textPopup = this.FormMode.Delete_Suppliers_Checked;
      }
      // hiển thị
      this.display();
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
      if (value == false) {
        // hiển thị nút đóng đồng ý ở giữa popup
        this.isAgree = false;
      }
    },
    /**
     * Hàm lấy nhà cung cấp theo id
     * @param value mã id
     * createdBy NHHAi 14/2/2022
     */
    loadSupplierWithId(value) {
      return axios.get(this.host + `${value}`);
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
            me.textPopup =
              res.data.validateInfo[0].fieldName +
              res.data.validateInfo[0].errorMessage;
            me.showPopupParent(true);
            break;
          case 500:
            me.showButtonLeft(false);
            me.isDelete = null;
            me.textPopup = res.data.validateInfo?.errorMessage;
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
     * Hàm Lấy mã nhà cung cấp mới
     * createdBy NHHAi 13/2/2022
     */
    loadNewSupplierCode() {
      return axios.get(this.host + this.NewSupplierCode);
    },
    /**
     * Hàm hiển thị dialog khi click vào nút thêm
     * createdBy NHHAI 15/2/2022
     */
    async btnAddOnClick() {
      // load dữ liệu
      this.overlay = true;
      this.isReplication = false;
      // lấy mã nhà cung cấp mới
      var response = await this.loadNewSupplierCode();
      // khai báo lại giá trị supplierProps
      this.supplierProps = new Supplier();
      if (response.data != "") {
        // gán dữ liệu vào supplierCode
        this.supplierProps.supplierCode = response.data;
      }
      this.supplierProps.supplierGroupIds = [];
      // hiển thị danh sách nhóm nhà cung cấp
      this.listSupplierGroups();
      // hiển thị danh sách nhân viên
      this.listEmployees();
      setTimeout(() => {
        // hiển thị dialog
        this.showDialogParent(true);
        // ẩn load dữ liệu
        this.overlay = false;
        // focus
        this.forcusOnInput();
      }, 400);
    },
    /**
     * Hàm forcus vào ô input
     * createdBy NHHAi 13/2/2022
     */
    forcusOnInput() {
      setTimeout(() => {
        document.getElementById("taxCode").focus();
      }, 0);
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

    /**
     * Hàm load dữ liệu từ theo mã supplierId vào from dialog nhà cung cấp
     * createdBy NHHAI 15/2/2022
     * @param supplierId là giá trị supplierId của mỗi tr trong bảng
     */
    async dbOnClickTr(supplierId, value) {
      var me = this;
      if (supplierId != null) {
        // load dữ liệu
        me.overlay = true;
        // lấy dữ liệu theo id
        var response = await me.loadSupplierWithId(supplierId);
        // xét trường hợp data rỗng
        if (response && !response.data.data) {
          me.checkDataEmpty();
          return;
        }
        // gán dữ liệu cho supplierProps
        me.supplierProps = response.data.data;
        if (me.supplierProps.identifyDate) {
          me.supplierProps.identifyDate = new Date(
            me.supplierProps.identifyDate
          );
        }
        // biến đổi chuỗi thành mảng
        if (me.supplierProps.supplierGroupIds != "") {
          me.supplierProps.supplierGroupIds =
            me.supplierProps.supplierGroupIds.split(",");
        } else me.supplierProps.supplierGroupIds = [];
        // gán giá trị cho cờ nhân bản
        this.isReplication = value;
        //kiểm tra là nhân bản hay ko
        if (this.isReplication) {
          // thực hiện lấy mã code
          var data = await this.loadNewSupplierCode();
          if (data && data.data != "") {
            // gán dữ liệu vào supplierCode
            this.supplierProps.supplierCode = data.data;
          }
        }
        // hiển thị danh sách nhóm nhà cung cấp
        me.listSupplierGroups();
        // hiển thị danh sách nhân viên
        var listEmployees = await me.getListEmployees();
        // gán danh sách nhân viên cho employees
        if (listEmployees && listEmployees.data.success) {
          me.employees = listEmployees.data.data;
        }
        //ẩn button vừa nhấn
        me.isShowEntityDelRight = false;
        // Hiển thị dialog thông tin chi tiết nhân viên
        me.showDialogParent(true);
        // focus
        this.forcusOnInput();
        // ẩn load dữ liệu
        me.overlay = false;
      }
    },
    /**
     * Hàm gán giá trị cho combobox supplierGroups
     * createdBy NHHai 14/2/2022
     */
    async listSupplierGroups() {
      var me = this;
      me.supplierGroups = [];
      var listSupplierGroups = await me.getListSupplierGroups();
      // listSupplierGroups.data.data.forEach((res) => {
      //   // lấy text và value
      //   var supplierGroup = {};
      //   supplierGroup.text = res.supplierGroupName;
      //   supplierGroup.value = res.supplierGroupId;
      //   // gán giá trị cho supplierGroups
      //   me.supplierGroups.push(supplierGroup);
      // });
      me.supplierGroups = listSupplierGroups.data.data;
    },

    /**
     * Hàm gán giá trị cho combobox danh sách nhân viên
     * createdBy NHHai 14/2/2022
     */
    async listEmployees() {
      var me = this;
      me.employees = [];
      var listEmployees = await me.getListEmployees();
      // gán danh sách nhân viên cho employees
      if (listEmployees && listEmployees.data.success) {
        me.employees = listEmployees.data.data;
      }
    },

    /**
     * Hàm lấy dữ liệu nhóm nhà cung cấp
     * createdBy NHHAi 16/2/2022
     */
    getListSupplierGroups() {
      return axios.get(this.SupplierGroups);
    },

    /**
     * Hàm lấy dữ liệu danh sách nhân viên
     * createdBy NHHAi 16/2/2022
     */
    getListEmployees() {
      return axios.get(this.hostEmployee);
    },

    /**
     * Hàm lưu nhà cung cấp
     * createdBy NHHAi 15/2/2022
     */
    saveSupplier(value) {
      var me = this;
      // hiển thị loading
      me.overlay = true;
      // nếu như là nhân bản thì xóa id
      if (me.isReplication) delete me.supplierProps["supplierId"];
      // xét trường hợp không chọn nhân viên trong combobox
      if (me.supplierProps.employeeId == "") {
        delete me.supplierProps["employeeId"];
      }
      // xét trường hợp không chọn danh xưng trong combobox
      if (me.supplierProps.prefix == "") {
        delete me.supplierProps["prefix"];
      }
      // biến đỏi mảng thành chuỗi
      me.supplierProps.supplierGroupIds =
        me.supplierProps.supplierGroupIds.join();
      var api;
      if (!me.supplierProps.supplierId) {
        delete me.supplierProps["supplierId"];
        //gọi api thực hiện cất dữ liệu
        api = axios.post(me.host, me.supplierProps);
      } else {
        //gọi api thực hiện cất dữ liệu
        api = axios.put(
          me.host + `${me.supplierProps.supplierId}`,
          me.supplierProps
        );
      }
      api.then((response) => {
        if (response.data.success && response.data.data) {
          if (value == FormMode.SaveAndAdd) {
            // TH nếu bấm Cất và Thêm thì sẽ hiện form thêm mới
            me.btnAddOnClick();
          } else {
            // ẩn form
            me.showDialogParent(false);
          }
          // Load lại dữ liệu
          me.loadData(FormMode.Page_Number_1);
          // toast messenge
          if (!me.supplierProps.supplierId) {
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
      // .catch((res) => {
      //   // gọi đến hàm trả về lỗi
      //   me.responseWithError(res);
      //   // ẩn loading
      //   me.overlay = false;
      // });
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
     * gán giá trị danh xưng
     * CreatedBy NHHai 28/12/2021
     */
    setPrefix(value) {
      if (value == undefined) value = "";
      this.supplierProps.prefix = value;
    },
  },
};
</script>

<style scoped>
@import url("../../../../style/layout/content.css");
@import url("../../../../style/layout/supplier.css");
</style>
