<template>
  <div
    data-app
    class="m-dialog"
    id="dialog"
    :class="{ 'm-dialog-show': isShow }"
  >
    <div class="m-modal"></div>
    <div class="dialog">
      <div class="dialog-header">
        <div class="dialog-title">
          <div class="text-title">Thông tin nhân viên</div>
          <span>
            <input
              type="checkbox"
              class="m-icon-checkbox"
              name=""
              id="check-customer"
            />
            <label class="checkbox-content" for="check-customer"
              >Là khách hàng</label
            >
          </span>
          <span>
            <input
              type="checkbox"
              class="m-icon-checkbox"
              name=""
              id="check-supply"
            />
            <label class="checkbox-content" for="check-supply"
              >Là nhà cung cấp</label
            >
          </span>
        </div>
        <div class="dialog-close">
          <div class="icon-help m-icon m-icon-help" title="Giúp F1"></div>
          <div
            class="icon-close m-icon m-icon-close"
            @click="btnCloseOnClickHeader"
            title="Đóng (ESC)"
          ></div>
        </div>
      </div>
      <div class="dialog-content">
        <div class="top-content">
          <div class="content-left">
            <div class="input-id-name">
              <div class="input-id">
                <div class="text-input">Mã <span>*</span></div>
                <input
                  id="txtEntityCode"
                  class="m-input check"
                  type="text"
                  :title="messageEmptyEmployeeCode"
                  :class="{ 'input-warning': $v.empl.employeeCode.$error }"
                  v-model="$v.empl.employeeCode.$model"
                  @blur="blurEmployeeCode"
                  required
                />
              </div>
              <div class="input-name">
                <div class="text-input">Tên <span>*</span></div>
                <input
                  ref="EmployeeName"
                  id="txtEmployeeName"
                  class="m-input check"
                  type="text"
                  :title="messageEmptyFullName"
                  :class="{ 'input-warning': $v.empl.fullName.$error }"
                  @blur="blurFullName"
                  v-model="empl.fullName"
                  required
                />
              </div>
            </div>
            <div>
              <div class="text-input">Đơn vị <span>*</span></div>
              <v-combobox
                v-model="select"
                :items="department"
                :dense="true"
              ></v-combobox>
            </div>
            <div>
              <div class="text-input">Chức danh</div>
              <input
                class="m-input"
                type="text"
                fieldName="EmployeePosition"
                v-model="empl.positionName"
              />
            </div>
          </div>
          <div class="content-right">
            <div class="input-date-gender">
              <div class="input-date">
                <div class="text-input">Ngày sinh</div>
                <input
                  class="m-input"
                  fieldName="DateOfBirth"
                  type="date"
                  :value="dateToYYYYMMDD(empl.dateOfBirth)"
                  @input="setDateOfBirth($event)"
                />
              </div>
              <div class="input-gender">
                <div class="text-input">Giới tính</div>
                <div class="list-gender">
                  <label class="container">
                    <input
                      id="rdMale"
                      type="radio"
                      name="Gender"
                      value="1"
                      v-model="empl.gender"
                    />
                    <div class="checkmark">
                      <div></div>
                    </div>
                  </label>
                  <label class="label-gender" for="rdMale">Nam</label>
                  <label class="container">
                    <input
                      id="rdFemale"
                      type="radio"
                      name="Gender"
                      value="0"
                      v-model="empl.gender"
                    />
                    <div class="checkmark">
                      <div></div>
                    </div>
                  </label>
                  <label class="label-gender" for="rdFemale">Nữ</label>
                  <label class="container">
                    <input
                      id="rdOther"
                      type="radio"
                      name="Gender"
                      value="2"
                      v-model="empl.gender"
                    />
                    <div class="checkmark">
                      <div></div>
                    </div>
                  </label>
                  <label class="label-gender" for="rdOther">Khác</label>
                </div>
              </div>
            </div>
            <div class="input-identify-date">
              <div class="input-identify">
                <div class="text-input">Số CMND</div>
                <input
                  class="m-input"
                  fieldName="IdentityNumber"
                  type="text"
                  v-model="empl.identifyNumber"
                />
              </div>
              <div class="input-date-range">
                <div class="text-input">Ngày cấp</div>
                <input
                  class="m-input"
                  fieldName="IdentityDate"
                  type="date"
                  :value="dateToYYYYMMDD(empl.identifyDate)"
                  @input="setIdentityDate($event)"
                />
              </div>
            </div>
            <div>
              <div class="text-input">Nơi cấp</div>
              <input
                class="m-input"
                fieldName="IdentityPlace"
                type="text"
                v-model="empl.identifyPlace"
              />
            </div>
          </div>
        </div>
        <div class="content-bottom">
          <div>
            <div class="text-input">Địa chỉ</div>
            <input
              class="m-input"
              fieldName="Address"
              type="text"
              v-model="empl.address"
            />
          </div>
          <div class="within-content-bot">
            <div>
              <div class="text-input">Đt di động</div>
              <input
                class="m-input"
                fieldName="PhoneNumber"
                type="text"
                v-model="empl.phoneNumber"
              />
            </div>
            <div>
              <div class="text-input">Đt cố định</div>
              <input
                fieldName="TelephoneNumber"
                class="m-input"
                type="text"
                v-model="empl.telephoneNumber"
              />
            </div>
            <div>
              <div class="text-input">Email</div>
              <input
                id="txtEmail"
                class="m-input"
                ref="email"
                type="email"
                v-model="empl.email"
                :class="{ 'input-warning': $v.empl.email.$error }"
              />
            </div>
          </div>
          <div class="within-content-bot">
            <div>
              <div class="text-input">Tài khoản ngân hàng</div>
              <input
                fieldName="BankAccountNumber"
                class="m-input"
                type="text"
                v-model="empl.bankAccountNumber"
              />
            </div>
            <div>
              <div class="text-input">Tên ngân hàng</div>
              <input
                fieldName="BankName"
                class="m-input"
                type="text"
                v-model="empl.bankName"
              />
            </div>
            <div>
              <div class="text-input">Chi nhánh</div>
              <input
                fieldName="BankBranchName"
                class="m-input"
                type="text"
                v-model="empl.bankBranchName"
              />
            </div>
          </div>
        </div>
        <div class="divide"></div>
      </div>
      <div class="dialog-bottom">
        <div class="dialog-bot-left">
          <button
            id="closeDialog"
            @click="btnCloseOnClick"
            class="m-second-btn"
          >
            Hủy
          </button>
        </div>
        <div class="dialog-bot-right">
          <div>
            <button
              id="saveEntity"
              class="m-second-btn"
              title="Cất (Ctrl + S)"
              @click="btnSaveOnClick(FormMode.Save)"
            >
              Cất
            </button>
          </div>
          <div>
            <button
              id="saveAndContinue"
              class="m-btn"
              title="Cất và Thêm (Ctrl + Shilf + S)"
              @click="btnSaveOnClick(FormMode.SaveAndAdd)"
            >
              Cất và Thêm
            </button>
          </div>
        </div>
      </div>
    </div>
    <EmployeePopup
      @showPopup="showPopupParent"
      @saveData="saveData($event)"
      :textPopup="textPopup"
      :isShow="isShowPopupDetail"
      :isInfo="isInfo"
      :isShowBtn="isShowleft"
      :textLeft="textLeft"
      :isDelete="isDelete"
      :isAsk="isAsk"
    />
  </div>
</template>

<script>
import EmployeePopup from "./EmployeePopup.vue";
import { required, email } from "vuelidate/lib/validators";
import FormMode from "../../script/Enum.js";
import Employee from "../../models/Employee.js";
export default {
  name: "employeeDetail",
  components: {
    EmployeePopup,
  },
  props: [
    "isShow",
    "empl",
    "changeDateOfBirth",
    "changeIdentityDate",
    "department",
  ],
  data() {
    return {
      // Enum
      FormMode,
      //****** */
      isShowPopupDetail: false,
      textPopup: null,
      isEmployeeCode: false,
      isEmployeeName: false,
      select: [],
      isInfo: false,
      isShowleft: false,
      textLeft: "",
      isDelete: "",
      isAsk: false,
      oldValue: Employee,
      emptyFullName: 'Tên không được phép để trống',
      messageEmptyFullName: '',
      emptyEmployeeCode: 'Mã nhân viên được phép để trống',
      messageEmptyEmployeeCode: '',
    };
  },
  watch: {
    /**
     * Hiển thị giá trị trên combobox khi click chuột vào Tr
     * createdBy NHHai 4/1/2022
     */
    empl: function () {
      // gán giá trị empl cho oldValue
      this.oldValue = {
        ...Employee,
        ...this.empl,
      };
      // kiểm tra giá trị department
      if (this.empl.departmentId != undefined || this.empl.departmentId != "") {
        this.select = {};
        this.select.text = this.empl.departmentName;
        this.select.value = this.empl.departmentId;
      }
    },
    /**
     * chọn department
     * CreatedBy NHHai 28/12/2021
     */
    select: function (value) {
      if (value.value === undefined) {
        document
          .querySelector(
            ".v-autocomplete.v-input>.v-input__control>.v-input__slot"
          )
          .classList.add("input-warning");
      } else {
        document
          .querySelector(
            ".v-autocomplete.v-input>.v-input__control>.v-input__slot"
          )
          .classList.remove("input-warning");
      }
      this.$emit("departmentId", value.value);
    },
  },
  validations: {
    empl: {
      employeeCode: {
        required,
      },
      fullName: {
        required,
      },
      email: {
        email,
      },
    },
  },

  methods: {
    /**
     * Hàm cảnh báo dữ liệu khi fullName trống 
     * createdBy NHHAi 11/1/2021
     */
    blurFullName(){
      //
      this.$v.empl.fullName.$touch();
      //xét trường hợp nếu lỗi thì add title
      if(this.$v.empl.fullName.$error){
        this.messageEmptyFullName = this.emptyFullName;
      }
      else this.messageEmptyFullName = "";
    },
    /**
     * Hàm cảnh báo dữ liệu khi fullName trống 
     * createdBy NHHAi 11/1/2021
     */
    blurEmployeeCode(){
      //
      this.$v.empl.employeeCode.$touch();
      //xét trường hợp nếu lỗi thì add title
      if(this.$v.empl.employeeCode.$error){
        this.messageEmptyEmployeeCode = this.emptyEmployeeCode;
      }
      else this.messageEmptyEmployeeCode = "";
    },
    /**
     * Hàm lưu dữ liệu
     * createdBy NHHAi 11/1/2021
     */
    saveData(value) {
      if (value) {
        this.btnSaveOnClick(this.FormMode.Save);
      } else {
        this.btnCloseOnClick();
      }
    },

    /**
     * Hàm hiển thị popup khi click vào đấu X ở dialog
     * createdBy NHHAi 11/1/2021
     */
    btnCloseOnClickHeader() {
      // so sánh 2 object
      if (JSON.stringify(this.oldValue) !== JSON.stringify(this.empl)) {
        // TH 2 obj khác nhau
        this.isShowleft = true;
        this.isAsk = true;
        // gán text
        this.textLeft = this.FormMode.Text_Left_Exit;
        this.isDelete = this.FormMode.Is_Delete_N;
        this.textPopup = this.FormMode.Data_Changed;
        // Hiển thị popup
        this.showPopupParent(true);
        this.$emit("compareObj", this.empl);
      } else {
        // TH 2 obj giống nhau
        // đóng dialog
        this.btnCloseOnClick();
      }
    },
    /**
     * hiển thịp popup
     * CreatedBy NHHai 28/12/2021
     */
    showPopupParent(value) {
      this.isShowPopupDetail = value;
      if (!value) {
        this.isInfo = false;
        this.isAsk = false;
      }
    },
    /**
     * Hàm đóng dialog
     * createdBy NHHAi 15/12/2021
     */
    btnCloseOnClick() {
      this.select = [];
      document
        .querySelector(
          ".v-autocomplete.v-input>.v-input__control>.v-input__slot"
        )
        .classList.remove("input-warning");
      this.select.value = null;
      this.$v.$reset();
      this.$emit("showDialog", false);
    },

    /**
     * Hàm lưu dữ liệu
     * createdBy NHHAi 15/12/2021
     * @param value giá trị chọn nút
     */
    btnSaveOnClick(value) {
      this.isDelete = null;
      this.isShowleft = false;
      var me = this;
      var checkCBX = false;
      // kiểm tra dữ liệu trống
      me.$v.$touch();
      // Trường hợp lựa chọn phòng ban trống hoặc sai phòng ban trống
      if (me.select.value == undefined || me.select.value == "") {
        this.isInfo = true;
        me.showPopupParent(true);
        me.textPopup = this.FormMode.Department_Exists;
        document
          .querySelector(
            ".v-autocomplete.v-input>.v-input__control>.v-input__slot"
          )
          .classList.add("input-warning");
        checkCBX = true;
      } else {
        document
          .querySelector(
            ".v-autocomplete.v-input>.v-input__control>.v-input__slot"
          )
          .classList.remove("input-warning");
      }
      // Trường hợp mã nhân viên trống
      if (!me.empl.employeeCode) {
        this.isInfo = true;
        me.showPopupParent(true);
        me.textPopup = this.FormMode.EmployeeCode_Not_Empty;
        return;
      }
      // Trường hợp tên nhân viên trống
      if (!me.empl.fullName) {
        this.isInfo = true;
        me.showPopupParent(true);
        me.textPopup = this.FormMode.FullName_Not_Empty;
        return;
      }
      // trường hợp lỗi tên email
      if (me.$v.empl.email.$error) {
        me.showPopupParent(true);
        me.textPopup = this.FormMode.Email_Error;
        return;
      }
      if (checkCBX) {
        return;
      }
      // lấy dữ liệu
      me.$emit("saveEmployee", {employee: this.empl, value:value});

      me.$v.$reset();
    },

    /**
     * Hàm chuyển đổi kiểu date để hiển thị ở input
     * createdBy NHHai 16/12/2021
     * @param value kiểu dữ liệu date
     */
    dateToYYYYMMDD(value) {
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
          return year + "-" + month + "-" + day;
        }
      }
    },

    /**
     * Hàm emit giá trị vào component cha
     * createdBy NHHai 16/12/2021
     * @param date kiểu giá trị date
     */
    setDateOfBirth(date) {
      this.$emit("changeDateOfBirth", date);
    },

    /**
     * Hàm emit giá trị vào component cha
     * createdBy NHHai 16/12/2021
     * @param date kiểu giá trị date
     */
    setIdentityDate(date) {
      this.$emit("changeIdentityDate", date);
    },
  },
};
</script>

<style scoped>
@import url("../../style/component/dialog.css");
@import url("../../style/component/radio.css");
@import url("../../style/component/combobox.css");
</style>