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
                  ref="employeeCode"
                  id="txtEntityCode"
                  class="m-input check"
                  type="text"
                  maxlength="12"
                  :title="messageEmptyEmployeeCode"
                  :class="{ 'input-warning': $v.empl.employeeCode.$error }"
                  v-model.trim="$v.empl.employeeCode.$model"
                  @blur="blurEmployeeCode"
                  required
                />
              </div>
              <div class="input-name">
                <div class="text-input">Tên <span>*</span></div>
                <input
                  maxlength="100"
                  ref="fullName"
                  id="txtEmployeeName"
                  class="m-input check"
                  type="text"
                  :title="messageEmptyFullName"
                  :class="{ 'input-warning': $v.empl.fullName.$error }"
                  @blur="blurFullName"
                  v-model.trim="empl.fullName"
                  required
                />
              </div>
            </div>
            <div>
              <div class="text-input">Đơn vị <span>*</span></div>
              <base-combobox
                :selectVal="select"
                :department="department"
                @selectValue="selectValue($event)"
              ></base-combobox>
              <!-- <v-combobox
                v-model="select"
                :items="department"
                :dense="true"
              ></v-combobox> -->
            </div>
            <div>
              <div class="text-input">Chức danh</div>
              <input
                class="m-input"
                maxlength="255"
                type="text"
                fieldName="EmployeePosition"
                v-model.trim="empl.positionName"
              />
            </div>
          </div>
          <div class="content-right">
            <div class="input-date-gender">
              <div class="input-date">
                <div class="text-input">Ngày sinh</div>
                <input
                ref="dateOfBirth"
                  class="m-input"
                  :class="{ 'input-warning': isWarningDateOfBirth }"
                  fieldName="DateOfBirth"
                  type="date"
                  :value="dateToYYYYMMDD(empl.dateOfBirth)"
                  @blur="setDateOfBirth($event)"
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
                  maxlength="20"
                  fieldName="IdentityNumber"
                  type="text"
                  v-model.trim="empl.identifyNumber"
                />
              </div>
              <div class="input-date-range">
                <div class="text-input">Ngày cấp</div>
                <input
                ref="identityDate"
                  class="m-input"
                  :class="{ 'input-warning': isWarningIdentifyDate }"
                  fieldName="IdentityDate"
                  type="date"
                  :value="dateToYYYYMMDD(empl.identifyDate)"
                  @blur="setIdentityDate($event)"
                />
              </div>
            </div>
            <div>
              <div class="text-input">Nơi cấp</div>
              <input
                class="m-input"
                maxlength="255"
                fieldName="IdentityPlace"
                type="text"
                v-model.trim="empl.identifyPlace"
              />
            </div>
          </div>
        </div>
        <div class="content-bottom">
          <div>
            <div class="text-input">Địa chỉ</div>
            <input
              class="m-input"
              maxlength="255"
              fieldName="Address"
              type="text"
              v-model.trim="empl.address"
            />
          </div>
          <div class="within-content-bot">
            <div>
              <div class="text-input">Đt di động</div>
              <input
                class="m-input"
                maxlength="20"
                fieldName="PhoneNumber"
                type="text"
                v-model.trim="empl.phoneNumber"
              />
            </div>
            <div>
              <div class="text-input">Đt cố định</div>
              <input
                fieldName="TelephoneNumber"
                maxlength="20"
                class="m-input"
                type="text"
                v-model.trim="empl.telephoneNumber"
              />
            </div>
            <div>
              <div class="text-input">Email</div>
              <input
                id="txtEmail"
                maxlength="100"
                class="m-input"
                ref="email"
                type="email"
                v-model.trim="empl.email"
                :class="{ 'input-warning': $v.empl.email.$error }"
              />
            </div>
          </div>
          <div class="within-content-bot">
            <div>
              <div class="text-input">Tài khoản ngân hàng</div>
              <input
                fieldName="BankAccountNumber"
                maxlength="20"
                class="m-input"
                type="text"
                v-model.trim="empl.bankAccountNumber"
              />
            </div>
            <div>
              <div class="text-input">Tên ngân hàng</div>
              <input
                fieldName="BankName"
                maxlength="100"
                class="m-input"
                type="text"
                v-model.trim="empl.bankName"
              />
            </div>
            <div>
              <div class="text-input">Chi nhánh</div>
              <input
                fieldName="BankBranchName"
                maxlength="255"
                class="m-input"
                type="text"
                v-model.trim="empl.bankBranchName"
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
              @focus="focusHandler()"
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
import EmployeePopup from "../../components/base/BasePopup.vue";
import { required, email } from "vuelidate/lib/validators";
import FormMode from "../../script/enum.js";
import Employee from "../../models/employee.js";
import BaseCombobox from "../../components/base/BaseCombobox.vue";

export default {
  name: "employeeDetail",
  components: {
    EmployeePopup,
    BaseCombobox,
  },
  props: [
    "isShow",
    "empl",
    "changeDateOfBirth",
    "changeIdentityDate",
    "department",
  ],
  mounted() {
    // Bắt sự kiện shortcuts
    const keysPressed = {};
    const me = this;
    document.addEventListener("keydown", (event) => {
      // đóng dialog khi click ESC
      if (event.key == "Escape" && me.checkCloseDialog && me.isShow) {
        me.btnCloseOnClickHeader();
      }
      me.checkCloseDialog = true;

      if (keysPressed["Control"] && (event.key == "s" || event.key == "S")) {
        event.preventDefault(); // hủy sự kiện mặc định
      }
      keysPressed[event.key] = true;
      // Lưu
      if (
        keysPressed["Control"] &&
        !keysPressed["Shift"] &&
        (event.key == "s" || event.key == "S") &&
        me.isShow
      ) {
        console.log("1");
        //TODO
        me.btnSaveOnClick(FormMode.Save);
      }
      // Lưu và thêm mới
      if (
        keysPressed["Control"] &&
        keysPressed["Shift"] &&
        (event.key == "s" || event.key == "S") &&
        me.isShow
      ) {
        console.log("2");
        //TODO
        me.btnSaveOnClick(FormMode.SaveAndAdd);
      }
    });
    // xóa sự kiện keydown
    document.addEventListener("keyup", (event) => {
      delete keysPressed[event.key];
    });
  },
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
      oldValue: new Employee(),
      emptyFullName: "Tên không được phép để trống",
      messageEmptyFullName: "",
      emptyEmployeeCode: "Mã nhân viên được phép để trống",
      messageEmptyEmployeeCode: "",
      isValidateCBX: false,
      isWarningDateOfBirth: false,
      isWarningIdentifyDate: false,
      // cờ khi bấm ESC tắt popup
      checkCloseDialog: true,
    };
  },
  watch: {
    /**
     * Hiển thị giá trị trên combobox khi click chuột vào Tr
     * createdBy NHHai 4/1/2022
     */
    empl: function () {
      // xóa cảnh báo ngày tháng
      this.isWarningIdentifyDate = false;
      this.isWarningDateOfBirth = false;
      // kiểm tra giá trị department
      if (this.empl.departmentId != "") {
        this.select = {};
        this.select.text = this.empl.departmentName;
        this.select.value = this.empl.departmentId;
      } else {
        // trường hợp khởi đầu thì gán giá trị true cho isVAlidateCBX
        this.isValidateCBX = true;
        // xóa dữ liệu combobox và xóa cảnh báo
        this.select = {};
        this.select.text = "";
        this.select.value = "";
      }

      // gán giá trị empl cho oldValue
      this.oldValue = {
        ...this.empl,
      };
    },
    /**
     * chọn department
     * CreatedBy NHHai 28/12/2021
     */
    select: function (value) {
      if (value.value === undefined && !this.isValidateCBX) {
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
      // gán giá trị false
      this.isValidateCBX = false;
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
    // hàm gán giá trị cho select
    // cretedBy NHHAi 21/1/2022
    selectValue(value) {
      this.select = value;
    },
    /**
     * Hàm xử lý focus trong dialog
     * createdBy NHHAi 19/1/2022
     */
    focusHandler() {
      // focus vào ô employeecode
      this.$refs.code.focus();
    },

    /**
     * Hàm cảnh báo dữ liệu khi fullName trống
     * createdBy NHHAi 11/1/2021
     */
    blurFullName() {
      //
      this.$v.empl.fullName.$touch();
      //xét trường hợp nếu lỗi thì add title
      if (this.$v.empl.fullName.$error) {
        this.messageEmptyFullName = this.emptyFullName;
      } else this.messageEmptyFullName = "";
    },
    /**
     * Hàm cảnh báo dữ liệu khi identifyNumber trống
     * createdBy NHHAi 11/1/2021
     */
    blurIdentifyNumber() {
      //
      this.$v.empl.identifyNumber.$touch();
      //xét trường hợp nếu lỗi thì add title
      if (this.$v.empl.identifyNumber.$error) {
        this.messageIdentifyNumber = this.identifyNumber;
      } else this.messageIdentifyNumber = "";
    },
    /**
     * Hàm cảnh báo dữ liệu khi fullName trống
     * createdBy NHHAi 11/1/2021
     */
    blurEmployeeCode() {
      //
      this.$v.empl.employeeCode.$touch();
      //xét trường hợp nếu lỗi thì add title
      if (this.$v.empl.employeeCode.$error) {
        this.messageEmptyEmployeeCode = this.emptyEmployeeCode;
      } else this.messageEmptyEmployeeCode = "";
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
        // this.$emit("compareObj", this.empl);
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
        // cờ đóng khi bấm nut ESC
        this.checkCloseDialog = false;
      }
    },
    /**
     * Hàm đóng dialog
     * createdBy NHHAi 15/12/2021
     */
    btnCloseOnClick() {
      // xóa hết dữ liệu trong select
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
      var me = this;
      me.isDelete = null;
      me.isShowleft = false;
      // kiểm tra dữ liệu trống
      me.$v.$touch();
      // Trường hợp mã nhân viên trống
      if (!me.empl.employeeCode) {
        //focus vào ô mã nhân viên
        me.$refs.employeeCode.focus();
        //hiển thị popup
        this.isInfo = true;
        me.showPopupParent(true);
        me.textPopup = this.FormMode.EmployeeCode_Not_Empty;
        return;
      }
      // Trường hợp mã nhân viên không đúng định dạng
      const regex = /^NV-[0-9]+$/;
      if (!regex.test(me.empl.employeeCode)) {
        //focus vào ô mã nhân viên
        me.$refs.employeeCode.focus();
        //hiển thị popup
        me.showPopupParent(true);
        me.textPopup = this.FormMode.EmployeeCode_Not_Regex;
        return;
      }

      // Trường hợp tên nhân viên trống
      if (!me.empl.fullName) {
        //focus vào ô mã nhân viên
        me.$refs.fullName.focus();
        //hiển thị popup
        this.isInfo = true;
        me.showPopupParent(true);
        me.textPopup = this.FormMode.FullName_Not_Empty;
        return;
      }

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
        return;
      } else {
        document
          .querySelector(
            ".v-autocomplete.v-input>.v-input__control>.v-input__slot"
          )
          .classList.remove("input-warning");
      }
      // trường hợp nhập quá ngày hiện tại
      if (me.isWarningDateOfBirth || me.isWarningIdentifyDate) {
        // focus 
        if(me.isWarningDateOfBirth) me.$refs.dateOfBirth.focus();
        else me.$refs.identifyDate.focus();
        // show popup
        me.showPopupParent(true);
        me.textPopup = this.FormMode.Invalid_Date;
        return;
      }
      // trường hợp lỗi tên email
      if (me.$v.empl.email.$error) {
                //focus vào ô mã nhân viên
        me.$refs.email.focus();
        //hiển thị popup
        me.showPopupParent(true);
        me.textPopup = this.FormMode.Email_Error;
        return;
      }
      // lấy dữ liệu
      me.$emit("saveEmployee", { employee: this.empl, value: value });
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
      // kiểm tra giá trị chọn với ngày hiện tại
      if (
        date.target.value == "" ||
        new Date(date.target.value) <= new Date()
      ) {
        // nếu bé hơn thì không cảnh báo
        this.isWarningDateOfBirth = false;
      } else {
        // nếu lớn hơn thì cảnh báo
        this.isWarningDateOfBirth = true;
      }
      // emit giá trị
      this.$emit("changeDateOfBirth", date);
    },

    /**
     * Hàm emit giá trị vào component cha
     * createdBy NHHai 16/12/2021
     * @param date kiểu giá trị date
     */
    setIdentityDate(date) {
      // kiểm tra giá trị chọn với ngày hiện tại
      if (
        date.target.value == "" ||
        new Date(date.target.value) <= new Date()
      ) {
        // nếu bé hơn thì không cảnh báo
        this.isWarningIdentifyDate = false;
      } else {
        // nếu lớn hơn thì cảnh báo
        this.isWarningIdentifyDate = true;
      }
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