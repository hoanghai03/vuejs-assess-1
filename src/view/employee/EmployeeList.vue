<template>
  <div>
    <div class="content">
      <div class="header-content">
        <div class="title-content">Nhân viên</div>
        <div class="button-content">
          <button
            id="addEntity"
            class="m-btn"
            @click="btnAddOnClick"
            title="Thêm mới nhân viên"
          >
            Thêm mới nhân viên
          </button>
        </div>
      </div>
      <div class="filter">
        <div class="button-left">
          <button class="btn-left">Thực hiện hàng loạt</button>
          <div class="mi-16 m-icon mi-arrow-up--black"></div>
        </div>
        <div class="block-input">
          <input
            id="txtSearch"
            class="m-input"
            type="text"
            placeholder="Tìm theo mã,tên nhân viên"
            v-model.trim="searchText"
          />
          <div class="icon-input m-icon m-icon-input"></div>
        </div>
        <div
          id="refresh"
          class="icon-load m-icon m-icon-load"
          @click="loadData"
        ></div>
        <div class="icon-excel m-icon mi-excel__nav" @click="exportData"></div>
      </div>
      <div class="m-table">
        <table border="0" cellspacing="0">
          <colgroup>
            <col style="min-width: 20px" />
            <col style="min-width: 40px" />
            <col style="min-width: 150px" />
            <col style="min-width: 200px" />
            <col style="min-width: 120px" />
            <col style="min-width: 150px" />
            <col style="min-width: 200px" />
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
              <th fieldName="EmployeeCode">MÃ NHÂN VIÊN</th>
              <th fieldName="EmployeeName">TÊN NHÂN VIÊN</th>
              <th fieldName="GenderName">GIỚI TÍNH</th>
              <th fieldName="DateOfBirth">NGÀY SINH</th>
              <th fieldName="IdentityNumber">SỐ CMND</th>
              <th fieldName="EmployeePosition">CHỨC DANH</th>
              <th fieldName="DepartmentName">TÊN ĐƠN VỊ</th>
              <th fieldName="BankAccountNumber">SỐ TÀI KHOẢN</th>
              <th fieldName="BankName">TÊN NGÂN HÀNG</th>
              <th fieldName="BankBranchName">CHI NHÁNH NGÂN HÀNG</th>
              <th class="text-function">CHỨC NĂNG</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="employee in employees"
              :key="employee.employeeId"
              @dblclick="dbOnClickTr(employee.employeeId, false)"
            >
              <td></td>
              <td>
                <input
                  type="checkbox"
                  class="m-icon-checkbox"
                  :value="employee.employeeId"
                  v-model="checkedId"
                  @change="checkboxOnTr"
                />
              </td>
              <td>{{ employee.employeeCode }}</td>
              <td>{{ employee.fullName }}</td>
              <td>{{ employee.genderName }}</td>

              <td class="text-center-col">
                {{
                  employee.dateOfBirth | formatDateOfBirth(employee.dateOfBirth)
                }}
              </td>
              <td>{{ employee.identifyNumber }}</td>
              <td>{{ employee.positionName }}</td>
              <td>{{ employee.departmentName }}</td>
              <td>{{ employee.bankAccountNumber }}</td>
              <td>{{ employee.bankName }}</td>
              <td>{{ employee.bankBranchName }}</td>
              <td>
                <button
                  class="btnEdit"
                  @click="dbOnClickTr(employee.employeeId, false)"
                >
                  Sửa
                </button>
                <button
                  class="icon-down-delete m-icon m-icon-down-delete"
                  @click="showBtnDel(employee.employeeId, $event)"
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
        :class="{ show: isShowEntityDel, left: isShowLeftDel }"
      >
        Xóa
      </div>
      <div class="paging-bar">
        <div class="paging-text">
          Tổng số <b class="total-record">{{ totalRecord }}</b> bản ghi
        </div>
        <div class="mselect" id="cbxPageSize" @click="showPageSize">
          <div class="select">{{ pageSize }} bản ghi trên trang</div>
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
          <!-- <div class="p-left">Trước</div> -->

          <v-pagination
            v-model="pageNumber"
            :total-visible="5"
            :length="totalPage"
          ></v-pagination>
          <!-- <div class="p-right">Sau</div> -->
        </div>
      </div>
    </div>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <employee-detail
      :isShow="isShowDialogDetail"
      :empl="employeeProps"
      :department="obj"
      @departmentId="setDepartmentId($event)"
      @saveEmployee="saveEmployee($event)"
      @showDialog="showDialogParent"
      @changeDateOfBirth="changeDateOfBirth($event)"
      @changeIdentityDate="changeIdentityDate($event)"
      @show="btnAddOnClick"
    />
    <employee-popup
      :isShow="isShowPopupDetail"
      :textPopup="textPopup"
      :employeeId="employeeId"
      :isShowBtn="isShowleft"
      :textLeft="textLeft"
      :isDelete="isDelete"
      :isAgree="isAgree"
      :isDelAll="isDelAll"
      :checkedId="checkedId"
      @loadData="loadData"
      @showPopup="showPopupParent"
    />
  </div>
</template>
<script>
import axios from "axios";
import EmployeeDetail from "./EmployeeDetail.vue";
import EmployeePopup from "./EmployeePopup.vue";
import FormMode from "../../script/Enum.js";
import Employee from "../../models/Employee.js";

export default {
  name: "employeeList",
  components: {
    EmployeeDetail,
    EmployeePopup,
  },
  created() {
    // khởi tạo dữ liệu trong bảng
    this.loadData();
  },
  watch: {
    /**
     * Hàm kiểm tra sự thay đổi employeeId và load dữ liệu nhân viên theo employeeId
     * createdBy NHHAi 15/12/2021
     */
    employeeId: function (value) {
      var me = this;

      if (value != null) {
        axios
          .get(this.host + `${value}`)
          .then(function (response) {
            // xét trường hợp nhân bản
            me.employeeProps = response.data;
            me.employee = response.data;
          })
          .catch(function (res) {
            // gọi đến hàm trả về lỗi
            this.responseWithError(res);
          });
      } 
    },
    /**
     * lọc dữ liệu theo search text
     * CreatedBy NHHai 28/12/2021
     */
    searchText: function (value) {
      if (value != null) {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.loadData();
        }, 500);
      }
    },
    /**
     * lọc dữ liệu theo pagesize
     * CreatedBy NHHai 28/12/2021
     */
    pageSize: function (value) {
      // validate value
      if (value != null && value >= 1) {
        // gán lại trang thứ 1
        this.pageNumber = FormMode.Page_Number_1;
        // load dữ liệu
        this.loadData();
      }
    },

    /**
     * lọc dữ liệu theo pagenumber
     * CreatedBy NHHai 28/12/2021
     */
    pageNumber: function (value) {
      // validate value
      if (value != null && value >= 1) {
        // load dữ liệu
        this.loadData();
      }
    },

    /**
     * hiển thị loading
     * CreatedBy NHHai 28/12/2021
     */
    overlay(val) {
      val &&
        setTimeout(() => {
          this.overlay = false;
        }, 3000);
    },
    /**
     * Hàm hiển thị button xóa
     * createdBy NHHai 9/1/2022
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
      }
    },
  },
  filters: {
    /**
     * Hàm format ngày tháng
     * createdBy: NHHai 15/12/2021
     * @param {*} value trả về kiểu dữ liệu bất kì
     */
    formatDateOfBirth: function (value) {
      if (value) {
        var dateOfBirth = new Date(value);
        if (Number.isNaN(dateOfBirth.getTime())) {
          return "";
        } else {
          let day = dateOfBirth.getDate();
          let month = dateOfBirth.getMonth() + 1;
          let year = dateOfBirth.getFullYear();
          day = day < 10 ? "0" + day : day;
          month = month < 10 ? "0" + month : month;
          return day + "/" + month + "/" + year;
        }
      }
    },
  },
  methods: {
    /**
     * Hàm để search emplouyee theo searchText
     * createdBy NHHAi 30/12/2021
     */
    searchTextEmployee(value) {
      setTimeout(() => {
        this.searchText = value;
      }, 1000);
    },
    /**
     * gán giá trị department
     * CreatedBy NHHai 28/12/2021
     */
    setDepartmentId(value) {
      this.employeeProps.departmentId = value;
    },

    /**
     * lấy dữ liệu phòng ban
     * CreatedBy NHHai 28/12/2021
     */
    loadDepartment() {
      var me = this;
      axios
        .get(this.hostDepartment)
        .then((response) => {
          response.data.forEach((element) => {
            // lấy text và value
            me.department = {};
            me.department.text = element.departmentName;
            me.department.value = element.departmentId;
            // gán giá trị cho obj
            me.obj.push(me.department);
          });
        })
        .catch((res) => {
          // gọi đến hàm trả về lỗi
          this.responseWithError(res);
        });
    },
    /**
     * chuyển trang
     * CreatedBy NHHai 28/12/2021
     */
    turnToPage(value) {
      // gán giá trị cho pageNumber nếu value phù hợp
      if (value != null && value > 0 && value <= this.totalPage) {
        this.pageNumber = value;
      }
    },

    /**
     *  hiển thị số bản ghi trên trang
     * CreatedBy NHHai 28/12/2021
     */
    setPageSize(value) {
      // gán giá trị cho pageSize
      if (value != null && value > 0) {
        this.pageSize = value;
      }
    },

    /**
     * hiển thị bảng chọn pagesize
     * CreatedBy NHHai 28/12/2021
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
     * Hiên thị popup xóa
     * CreatedBy NHHai 28/12/2021
     */
    showPopupDel(value) {
      if (value == this.FormMode.Delete) {
        this.employeeId = this.checkID;
        // ẩn button xóa
        this.isShowEntityDelRight = false;
        // TH không phải chọn xóa tất cả
        this.isDelAll = false;
        // gán text popup
        setTimeout(() => {
          this.textPopup =
            this.deleteEmplFirst +
            `${this.employee.employeeCode}` +
            this.deleteEmplLast;
        }, 200);
      } else {
        // ẩn button xóa
        this.isShowEntityDel = false;
        // TH xóa tất cả
        this.isDelAll = true;
        // gán text popup
        this.textPopup = this.FormMode.Delete_Employee_Checked;
      }
      this.isDelete = this.FormMode.Is_Delete_Y;
      this.textLeft = this.FormMode.Text_Left;
      this.showButtonLeft(true);
      this.showPopupParent(true);
    },

    /**
     * hiển thị nút xóa
     * CreatedBy NHHai 28/12/2021
     */
    showBtnDel(employeeId, sender) {
      this.checkID = employeeId;
      var rect = sender.currentTarget.getBoundingClientRect();
      var top = rect.top + 20;
      document.getElementById("delEntity").style.top = `${top}px`;
      // class ẩn hiện vị trí
      this.isShowEntityDelRight = !this.isShowEntityDelRight;
      this.isShowLeftDelRight = false;
    },
    /**
     * Hàm nhận giá trị ngày sinh từ form nhân viên
     * createdBy NHHAi 19/12/2021
     * @param dateOfBirth kiểu dữ liệu date
     */
    changeDateOfBirth(dateOfBirth) {
      if (dateOfBirth != null) {
        this.employeeProps.dateOfBirth = dateOfBirth.target.value;
      }
    },

    /**
     * Hàm nhận giá trị identity date từ form nhân viên
     * createdBy NHHAi 19/12/2021
     * @param identityDate kiểu dữ liệu date
     */
    changeIdentityDate(identifyDate) {
      if (identifyDate != null) {
        this.employeeProps.identifyDate = identifyDate.target.value;
      }
    },

    /**
     * Hàm hiển thị dialog khi click vào nút thêm nhân viên
     * createdBy NHHAI 15/12/2021
     */
    btnAddOnClick() {
      // gán giá trị null cho employeeId
      this.employeeId = null;
      this.isReplication = false;
      // lấy mã nhân viên mới
      this.loadNewEmployeeCode();
      // hiển thị danh sách phòng ban
      this.loadDepartment();
      // hiển thị dialog
      this.showDialogParent(true);
      // focus vào ô employee code
      this.forcusOnInput();
    },
    /**
     * Hàm forcus vào ô input
     * createdBy NHHAi 30/12/2021
     */
    forcusOnInput() {
      setTimeout(() => {
        document.getElementById("txtEntityCode").focus();
      }, 0);
    },

    /**
     * Hàm gán giá trị cho isShowDialogDetail
     * createdBy NHHAI 15/12/2021
     * @param {*} value true or false
     */
    showDialogParent(value) {
      this.isShowDialogDetail = value;
      if (!value) this.employeeId = null;
    },

    /**
     * Hàm gán hiển thị popup
     * createdBy NHHAI 15/12/2021
     * @param {*} value true or false
     */
    showPopupParent(value) {
      this.isShowPopupDetail = value;
      if (value == false) {
        this.isAgree = false;
      }
    },

    /**
     * Hàm gán hiển thị button left
     * createdBy NHHAI 15/12/2021
     * @param {*} value true or false
     */
    showButtonLeft(value) {
      this.isShowleft = value;
    },

    /**
     * Hàm load dữ liệu từ api
     * createdBy NHHAI 15/12/2021
     */
    loadData() {
      var me = this;
      // hiển thị loading
      me.overlay = true;
      axios
        .get(
          this.host +
            `filter?pageSize=${this.pageSize}&pageNumber=${this.pageNumber}&employeeFilter=${this.searchText}`
        )
        .then((response) => {
          // gán dữ liệu vào employees
          me.employees = response.data.data;
          // tổng số bản ghi
          this.totalRecord = response.data.totalRecord;
          this.totalPage = response.data.totalPage;
          // ẩn loading
          me.overlay = false;
        })
        .catch((res) => {
          // gọi đến hàm trả về lỗi
          this.responseWithError(res);
          // ẩn loading
          me.overlay = false;
        });
    },

    /**
     * Hàm load dữ liệu từ theo mã employeeId vào from dialog nhân viên
     * createdBy NHHAI 15/12/2021
     * @param employeeId là giá trị EmployeeId của mỗi tr trong bảng
     */
    dbOnClickTr(employeeId, value) {
      // kiểm tra là nhân bản hay ko
      // Gán employeeId
      this.employeeId = employeeId;

      this.isReplication = value;
      if (this.isReplication) {
        this.loadNewEmployeeCode();
      }
      //ẩn button vừa nhấn
      this.isShowEntityDelRight = false;
      // Hiển thị dialog thông tin chi tiết nhân viên
      this.showDialogParent(true);
      // focus vào ô employee code
      this.forcusOnInput();
    },
    /**
     * Hàm Lấy mã nhân viên mới
     * createdBy NHHAi 3/1/2022
     */
    loadNewEmployeeCode() {
      var me = this;
      axios
        .get(this.host + this.NewEmployeeCode)
        .then((response) => {
          // xóa hết dữ liệu trong employeeProps
          if (!me.isReplication) {
            // hiiển thị giá trị mặc định cho employeeProps
            me.employeeProps = Employee;
            // gán giá trị cho gender
            me.employeeProps.gender = 1;
          }
          // gán dữ liệu vào EmployeeCode
          me.employeeProps.employeeCode = response.data;
        })
        .catch((res) => {
          // gọi đến hàm trả về lỗi
          this.responseWithError(res);
        });
    },
    /**
     * Hàm lưu nhân viên
     * createdBy NHHAi 4/1/2022
     */
    saveEmployee(value) {
      var me = this;
      // nếu như là nhân bản thì xóa id
      if (me.isReplication) value.employee.employeeId = null;
      // gán employee cho this.employee
      this.employee = value.employee;
      // xoá createdDate
      delete this.employee["createdDate"];
      var api;
      if (value.employee.employeeId == undefined) {
        delete this.employee["employeeId"];
        //gọi api thực hiện cất dữ liệu
        api = axios.post(this.host, this.employee);
      } else {
        //gọi api thực hiện cất dữ liệu
        api = axios.put(this.host + `${this.employeeId}`, this.employee);
      }
      api
        .then(() => {
          this.employee["employeeId"] = null;
          this.employee["createdDate"] = null;
          // xét trường hợp nếu bấm Cất thì sẽ ẩn form
          if (value.value == FormMode.Save) {
            me.showDialogParent(false);
          } else {
            // TH nếu bấm Cất và Thêm thì sẽ hiện form thêm mới
            me.btnAddOnClick();
          }
          // Load lại dữ liệu
          me.loadData();
        })
        .catch((res) => {
          // gọi đến hàm trả về lỗi
          me.responseWithError(res);
        });
    },

    /**
     * Hàm checkall
     * createdBy NHHAi 9/1/2022
     */
    checkAll() {
      // xét trường hợp nếu đã check hết các hàng thì sẽ bỏ check toàn bộ
      if (this.checkedId.length == this.pageSize) {
        this.checkedId = [];
      }
      // trường hợp chưa check hết hàng thì nó sẽ check hết
      else if (this.checkedId.length >= 0) {
        this.checkedId = [];
        // thêm id vào mảng
        this.employees.forEach((employee) => {
          this.checkedId.push(employee.employeeId);
        });
      }
    },
    /**
     * Hàm xử lý khi checkbox ở vị trí Tr trên table
     * createdBy NHHAi 9/1/2022
     */
    checkboxOnTr() {
      if (this.checkedId.length < this.pageSize) {
        this.isCheckAll = false;
      } else if (this.checkedId.length == this.pageSize) {
        this.isCheckAll = true;
      }
    },

    /**
     * hàm trả về lỗi khi gọi api
     * @param res lỗi
     * createdBy NHHAi 11/1//2022
     */
    responseWithError(res) {
      var me = this;
      const statusCode = res.response.status;
      switch (statusCode) {
        // nếu mã lỗi 400 thì hiển thị cảnh thông báo lỗi
        case 400:
          var data = res.response.data.data;
          if (data) {
            me.showButtonLeft(false);
            me.isAgree = true;
            me.isDelete = null;
            if (res.response.data.data[0] != undefined) {
              me.textPopup = res.response.data.data[0];
            } else {
              me.textPopup = res.response.data.userMsg;
            }

            if (me.textPopup == this.FormMode.EmployeeCode_Duplicate) {
              me.textPopup =
                this.duplicateCodeFirst +
                `${me.employee.employeeCode}` +
                this.duplicateCodeLast;
            }
            me.showPopupParent(true);
          }
          break;
        case 500:
          me.showButtonLeft(false);
          me.isDelete = null;
          me.textPopup = res.response.data.userMsg;
          me.showPopupParent(true);
          break;
        default:
          break;
      }
    },

    /**
     * Hàm export dữ liệu ra excel
     * createdBy NHHai 10/1/2022
     */
    exportData() {
      try {
        window.location.href =
          this.host +
          `export?pageSize=${this.pageSize}&pageNumber=${this.pageNumber}&employeeFilter=${this.searchText}`;
      } catch (error) {
        this.responseWithError(error);
      }
    },
  },
  data() {
    return {
      employeeId: null,
      // gán class cho employeeProps
      employeeProps: Employee,
      host: "http://localhost:5000/api/v1/Employees/",
      hostDepartment: "http://localhost:5000/api/v1/Departments/",
      deleteEmplFirst: `Bạn có thực sự muốn xóa nhân viên <`,
      deleteEmplLast: `> không?`,
      duplicateCodeFirst: "Mã nhân viên <",
      duplicateCodeLast: "> đã tồn tại trong hệ thống,vui lòng kiểm tra lại.",
      NewEmployeeCode: "NewEmployeeCode",
      employees: [],
      employee: {},
      textPopup: null,
      buttonPopupLeft: null,
      buttonPopupRight: null,
      isShowDialogDetail: false,
      isShowPopupDetail: false,
      isShowleft: false,
      isDelete: null,
      isShowEntityDel: false,
      isShowEntityDelRight: false,
      isShowLeftDel: false,
      isShowPageSize: false,
      pageSize: 10,
      pageNumber: 1,
      searchText: "",
      totalPage: null,
      totalRecord: null,
      department: {},
      obj: [],
      overlay: false,
      timer: null,
      textLeft: "",
      isAgree: false,
      isCheckAll: false,
      checkedId: [],
      isDelAll: false,
      isReplication: false,
      newCode: null,
      checkID: null,
      // enum
      FormMode,
    };
  },
};
</script>

<style scoped>
@import url("../../style/layout/content.css");
@import url("../../style/component/button.css");
@import url("../../style/component/checkbox.css");
@import url("../../style/component/icon.css");
@import url("../../style/component/input.css");
@import url("../../style/component/loading.css");
@import url("../../style/component/paging-bar.css");
@import url("../../style/component/select.css");
@import url("../../style/component/table.css");
</style>