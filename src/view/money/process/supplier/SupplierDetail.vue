<template>
  <div
    data-app
    class="m-dialog"
    id="dialog"
    :class="{ 'm-dialog-show': isShow }"
  >
    <div class="m-modal"></div>
    <div class="dialog t-0">
      <div class="dialog-header">
        <div class="dialog-title">
          <div class="text-title">Thông tin nhà cung cấp</div>
          <div class="radio-group">
            <div class="list-radio">
              <div class="container-radio">
                <input
                  id="rdOrganize"
                  type="radio"
                  name="Group"
                  value="0"
                  v-model="supplier.category"
                />
                <div class="checkmark">
                  <div></div>
                </div>
              </div>
              <label class="label-radio" for="rdOrganize">Tổ chức</label>
              <div class="container-radio">
                <input
                  id="rdPerson"
                  type="radio"
                  name="Group"
                  value="1"
                  v-model="supplier.category"
                />
                <div class="checkmark">
                  <div></div>
                </div>
              </div>
              <label class="label-radio" for="rdPerson">Cá nhân</label>
            </div>
          </div>
          <div class="list-checkbox m-l-100">
            <input
              type="checkbox"
              class="m-icon-checkbox"
              name=""
              id="check-customer"
            />
            <label class="checkbox-content" for="check-customer"
              >Là khách hàng</label
            >
          </div>
        </div>
        <div class="dialog-close">
          <div class="icon-help m-icon m-icon-help" title="Giúp F1"></div>
          <div
            class="icon-close m-icon m-icon-close"
            title="Đóng (ESC)"
            @click="btnCloseOnClickHeader"
          ></div>
        </div>
      </div>
      <div class="dialog-content">
        <div class="content-overflow">
          <div class="top-content">
            <div class="content-left" v-if="supplier.category == 0">
              <div class="display-flex">
                <div class="input-id p-r-12">
                  <div class="text-input">Mã số thuế</div>
                  <input
                    id="taxCode"
                    class="m-input check"
                    type="text"
                    maxlength="12"
                    v-model.trim="supplier.supplierTaxCode"
                  />
                </div>
                <div class="input-name">
                  <div class="text-input">Mã nhà cung cấp <span>*</span></div>
                  <input
                    maxlength="100"
                    class="m-input check"
                    type="text"
                    ref="supplierCode"
                    required
                    :title="messageEmptySupplierCode"
                    :class="{
                      'input-warning': $v.supplier.supplierCode.$error,
                    }"
                    v-model.trim="$v.supplier.supplierCode.$model"
                    @blur="blurSupplierCode"
                  />
                </div>
              </div>
              <div>
                <div class="text-input">Tên nhà cung cấp <span>*</span></div>
                <input
                  maxlength="100"
                  class="m-input check"
                  type="text"
                  ref="supplierName"
                  required
                  :title="messageEmptySupplierName"
                  :class="{
                    'input-warning': $v.supplier.supplierName.$error,
                  }"
                  v-model.trim="$v.supplier.supplierName.$model"
                  @blur="blurSupplierName"
                />
              </div>
              <div>
                <div class="text-input">Địa chỉ</div>
                <textarea
                  class="m-textarea"
                  placeholder="VD: Số 82 Duy Tân,Dịch Vọng Hậu,Cầu Giấy,Hà Nội"
                  name=""
                  id=""
                  v-model.trim="supplier.address"
                ></textarea>
              </div>
            </div>
            <div class="content-left" v-else>
              <div class="display-flex">
                <div class="input-name p-r-12">
                  <div class="text-input">Mã nhà cung cấp <span>*</span></div>
                  <input
                    maxlength="100"
                    class="m-input check"
                    type="text"
                    ref="supplierCode"
                    required
                    :title="messageEmptySupplierCode"
                    :class="{
                      'input-warning': $v.supplier.supplierCode.$error,
                    }"
                    v-model.trim="$v.supplier.supplierCode.$model"
                    @blur="blurSupplierCode"
                  />
                </div>
                <div class="input-id">
                  <div class="text-input">Mã số thuế</div>
                  <input
                    id="taxCode"
                    class="m-input check"
                    type="text"
                    maxlength="12"
                    v-model.trim="supplier.supplierTaxCode"
                  />
                </div>
              </div>
              <div>
                <div class="text-input">Tên nhà cung cấp</div>
                <div class="display-flex">
                  <div class="pr-2 w-1/3">
                    <base-combobox
                      :selectVal="selectPrefix"
                      :value="FormMode.prefix"
                      @selectValue="selectValuePrefix($event)"
                    ></base-combobox>
                  </div>
                  <div class="w-256">
                    <div>
                      <input
                        maxlength="100"
                        class="m-input check"
                        type="text"
                        ref="supplierName"
                        required
                        :title="messageEmptySupplierName"
                        :class="{
                          'input-warning': $v.supplier.supplierName.$error,
                        }"
                        v-model.trim="$v.supplier.supplierName.$model"
                        @blur="blurSupplierName"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div class="text-input">Địa chỉ</div>
                <textarea
                  class="m-textarea"
                  placeholder="VD: Số 82 Duy Tân,Dịch Vọng Hậu,Cầu Giấy,Hà Nội"
                  name=""
                  id=""
                  v-model.trim="supplier.address"
                ></textarea>
              </div>
            </div>
            <div class="content-right" v-if="supplier.category == 0">
              <div class="display-flex">
                <div class="input-id p-r-12">
                  <div class="text-input">Điện thoại</div>
                  <input
                    class="m-input check"
                    type="text"
                    maxlength="12"
                    v-model.trim="supplier.phoneNumber"
                  />
                </div>
                <div class="input-name">
                  <div class="text-input">Website</div>
                  <input
                    maxlength="100"
                    class="m-input check"
                    type="text"
                    required
                    v-model.trim="supplier.website"
                  />
                </div>
              </div>
              <div>
                <div class="text-input">Nhóm nhà cung cấp</div>
                <div class="ps-relative">
                  <v-select
                    multiple
                    label="supplierGroupCode"
                    :options="itemsSupplierGroup"
                    :reduce="(option) => option.supplierGroupId"
                    v-model="supplier.supplierGroupIds"
                  >
                    <template #list-header>
                      <div class="cbx__header display-flex">
                        <div class="vs__option w-150">
                          <b>Mã nhóm KH,NCC</b>
                        </div>
                        <div class="vs__option w-200">
                          <b>Tên nhóm KH,NCC</b>
                        </div>
                      </div>
                    </template>
                    <template v-slot:option="option">
                      <div class="cbx__body display-flex">
                        <div class="vs__option w-150">
                          <b>{{ option.supplierGroupCode }}</b>
                        </div>
                        <div class="vs__option w-200">
                          <b>{{ option.supplierGroupName }}</b>
                        </div>
                      </div>
                    </template>
                  </v-select>
                  <div class="icon-plus-cbx">
                    <div
                      class="icon-plus m-icon mi-icon-16 mi-plus--success"
                    ></div>
                  </div>
                </div>
              </div>
              <div>
                <div class="text-input">Nhân viên mua hàng</div>
                <div class="ps-relative">
                  <v-select
                    label="fullName"
                    :options="itemsEmployee"
                    :reduce="(option) => option.employeeId"
                    v-model="supplier.employeeId"
                  >
                    <template #list-header>
                      <div class="cbx__header display-flex">
                        <div class="vs__option w-150"><b>Mã nhân viên</b></div>
                        <div class="vs__option w-200"><b>Tên nhân viên</b></div>
                      </div>
                    </template>
                    <template v-slot:option="option">
                      <div class="cbx__body display-flex">
                        <div class="vs__option w-150">
                          <b>{{ option.employeeCode }}</b>
                        </div>
                        <div class="vs__option w-200">
                          <b>{{ option.fullName }}</b>
                        </div>
                      </div>
                    </template>
                  </v-select>
                  <div class="icon-plus-cbx">
                    <div
                      class="icon-plus m-icon mi-icon-16 mi-plus--success"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="content-right" v-else>
              <div>
                <div class="text-input">Nhóm nhà cung cấp</div>
                <div class="ps-relative">
                  <v-select
                    multiple
                    label="supplierGroupCode"
                    :options="itemsSupplierGroup"
                    :reduce="(option) => option.supplierGroupId"
                    v-model="supplier.supplierGroupIds"
                  >
                    <template #list-header>
                      <div class="cbx__header display-flex">
                        <div class="vs__option w-150">
                          <b>Mã nhóm KH,NCC</b>
                        </div>
                        <div class="vs__option w-200">
                          <b>Tên nhóm KH,NCC</b>
                        </div>
                      </div>
                    </template>
                    <template v-slot:option="option">
                      <div class="cbx__body display-flex">
                        <div class="vs__option w-150">
                          <b>{{ option.supplierGroupCode }}</b>
                        </div>
                        <div class="vs__option w-200">
                          <b>{{ option.supplierGroupName }}</b>
                        </div>
                      </div>
                    </template>
                  </v-select>
                  <div class="icon-plus-cbx">
                    <div
                      class="icon-plus m-icon mi-icon-16 mi-plus--success"
                    ></div>
                  </div>
                </div>
              </div>
              <div>
                <div class="text-input">Nhân viên mua hàng</div>
                <div class="ps-relative">
                  <v-select
                    label="fullName"
                    :options="itemsEmployee"
                    :reduce="(option) => option.employeeId"
                    v-model="supplier.employeeId"
                  >
                    <template #list-header>
                      <div class="cbx__header display-flex">
                        <div class="vs__option w-150"><b>Mã nhân viên</b></div>
                        <div class="vs__option w-200"><b>Tên nhân viên</b></div>
                      </div>
                    </template>
                    <template v-slot:option="option">
                      <div class="cbx__body display-flex">
                        <div class="vs__option w-150">
                          <b>{{ option.employeeCode }}</b>
                        </div>
                        <div class="vs__option w-200">
                          <b>{{ option.fullName }}</b>
                        </div>
                      </div>
                    </template>
                  </v-select>
                  <div class="icon-plus-cbx">
                    <div
                      class="icon-plus m-icon mi-icon-16 mi-plus--success"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="content-bottom p-t-0">
            <ul class="ms-tabs-ul">
              <li class="ms-tabs-btn tab-checked">
                <div class="ms-label">Liên hệ</div>
              </li>
              <li class="ms-tabs-btn">
                <div class="ms-label">Điều khoản thanh toán</div>
              </li>
              <li class="ms-tabs-btn">
                <div class="ms-label">Tài khoản ngân hàng</div>
              </li>
              <li class="ms-tabs-btn">
                <div class="ms-label">Địa chỉ khác</div>
              </li>
              <li class="ms-tabs-btn"><div class="ms-label">Ghi chú</div></li>
            </ul>
            <div class="con-slot-tabs">
              <div class="w-1/2 p-r-26 w-418" v-if="supplier.category == 0">
                <div class="text-input">Người liên hệ</div>
                <div class="display-flex">
                  <div class="pr-2 w-1/3">
                    <base-combobox
                      :selectVal="selectPrefix"
                      :value="FormMode.prefix"
                      @selectValue="selectValuePrefix($event)"
                    ></base-combobox>
                  </div>
                  <div class="w-256">
                    <div class="pb-2">
                      <input
                        type="text"
                        class="m-input"
                        placeholder="Họ và tên"
                        v-model.trim="supplier.contactName"
                      />
                    </div>
                  </div>
                </div>
                <div class="pb-2">
                  <input
                    type="text"
                    class="m-input"
                    placeholder="Email"
                    ref="email"
                    v-model.trim="supplier.contactEmail"
                    :class="{
                      'input-warning': $v.supplier.contactEmail.$error,
                    }"
                  />
                </div>
                <div class="pb-2 w-188">
                  <input
                    type="text"
                    class="m-input"
                    placeholder="Số điện thoại"
                    v-model.trim="supplier.contactPhoneNumber"
                  />
                </div>
              </div>
              <div class="w-1/2 p-r-26 w-418" v-else>
                <div class="text-input">Thông tin liên hệ</div>
                <div class="pb-2">
                  <input
                    type="text"
                    class="m-input"
                    placeholder="Email"
                    ref="email"
                    v-model.trim="supplier.contactEmail"
                    :class="{
                      'input-warning': $v.supplier.contactEmail.$error,
                    }"
                  />
                </div>
                <div class="pb-2 w-188">
                  <input
                    type="text"
                    class="m-input"
                    placeholder="Điện thoại di động"
                    v-model="supplier.contactPhoneNumber"
                  />
                </div>
                <div class="pb-2 w-188">
                  <input
                    type="text"
                    class="m-input"
                    placeholder="Điện thoại cố định"
                    v-model="supplier.phoneNumber"
                  />
                </div>
                <div class="text-input">Đại diện theo PL</div>
                <div class="pb-2">
                  <input
                    type="text"
                    class="m-input"
                    placeholder="Đại diện theo PL"
                    v-model.trim="supplier.legalRepresentative"
                  />
                </div>
              </div>
              <div class="w-1/2 w-418" v-if="supplier.category == 0">
                <div class="text-input">Đại diện theo PL</div>
                <div class="pb-2">
                  <input
                    type="text"
                    class="m-input"
                    placeholder="Đại diện theo PL"
                    v-model.trim="supplier.legalRepresentative"
                  />
                </div>
              </div>
              <div class="w-1/2 w-418" v-else>
                <div class="text-input">Thông tin CMND/Thẻ căn cước</div>
                <div class="pb-2 w-188">
                  <input
                    type="text"
                    class="m-input"
                    placeholder="Số CMND/Thẻ căn cước"
                    v-model="supplier.identifyNumber"
                  />
                </div>
                <div class="pb-2 w-188">
                  <date-picker
                    format="DD/MM/YYYY"
                    placeholder="Ngày cấp"
                    v-model="supplier.identifyDate"
                  ></date-picker>
                </div>
                <div class="pb-2">
                  <input
                    type="text"
                    class="m-input"
                    placeholder="Nơi cấp"
                    v-model="supplier.place"
                  />
                </div>
              </div>
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
    <supplier-popup
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
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import SupplierPopup from "../../../../components/base/BasePopup.vue";
import BaseCombobox from "../../../../components/base/BaseCombobox.vue";
import FormMode from "../../../../script/enum.js";
import { required, email } from "vuelidate/lib/validators";
import Supplier from "../../../../models/supplier";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
export default {
  name: "supplierDetail",
  components: { BaseCombobox, SupplierPopup, vSelect, DatePicker },
  props: ["isShow", "supplier", "itemsSupplierGroup", "itemsEmployee"],
  data() {
    return {
      change: 1,
      selectPrefix: [],
      arr: [],
      FormMode,
      emptySupplierCode: "Mã nhà cung cấp không được phép để trống",
      messageEmptySupplierCode: "",
      emptySupplierName: "Tên nhà cung cấp không được phép để trống",
      messageEmptySupplierName: "",
      isShowPopupDetail: false,
      textPopup: null,
      isInfo: false,
      isShowleft: false,
      textLeft: "",
      isDelete: "",
      isAsk: false,
      oldValue: new Supplier(),
    };
  },
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
        //TODO
        me.btnSaveOnClick(FormMode.SaveAndAdd);
      }
    });
    // xóa sự kiện keydown
    document.addEventListener("keyup", (event) => {
      delete keysPressed[event.key];
    });
  },
  watch: {
    /**
     * Hiển thị giá trị trên combobox khi click chuột vào Tr
     * createdBy NHHai 4/1/2022
     */
    supplier: function () {
      // kiểm tra giá trị
      if (this.supplier.employeeId != "") {
        // Gán giá trị cho combobox danh xưng
        this.selectPrefix = {};
        this.selectPrefix.text = this.supplier.prefixName;
        this.selectPrefix.value = this.supplier.prefix;
      } else {
        // xóa dữ liệu combobox danh xưng và xóa cảnh báo
        this.selectPrefix = {};
        this.selectPrefix.text = "";
        this.selectPrefix.value = "";
      }

      // gán giá trị empl cho oldValue
      this.oldValue = {
        ...this.supplier,
      };
    },

    /**
     * chọn danh xưng
     * CreatedBy NHHai 28/12/2021
     */
    selectPrefix: function (value) {
      this.$emit("prefix", value.value);
    },
  },

  validations: {
    supplier: {
      supplierCode: {
        required,
      },
      supplierName: {
        required,
      },
      contactEmail: {
        email,
      },
    },
  },
  methods: {
    // hàm gán giá trị cho select danh xưng
    // cretedBy NHHAi 15/2/2022
    selectValuePrefix(value) {
      this.selectPrefix = value;
    },

    /**
     * Hàm đóng dialog
     * createdBy NHHAi 15/12/2021
     */
    btnCloseOnClick() {
      this.$emit("showDialog", false);
    },
    multipleSelection(item) {
      this.arr.push({ ...item });
    },
    deleteChip(item) {
      this.arr = this.arr.filter((x) => x !== item);
    },

    /**
     * Hàm cảnh báo dữ liệu khi mã nhà cung cấp trống
     * createdBy NHHAi 15/2/2022
     */
    blurSupplierCode() {
      //
      this.$v.supplier.supplierCode.$touch();
      //xét trường hợp nếu lỗi thì add title
      if (this.$v.supplier.supplierCode.$error) {
        this.messageEmptySupplierCode = this.emptySupplierCode;
      } else this.messageEmptySupplierCode = "";
    },
    /**
     * Hàm cảnh báo dữ liệu khi tên nhà cung cấp trống
     * createdBy NHHAi 15/2/2022
     */
    blurSupplierName() {
      //
      this.$v.supplier.supplierName.$touch();
      //xét trường hợp nếu lỗi thì add title
      if (this.$v.supplier.supplierName.$error) {
        this.messageEmptySupplierName = this.emptySupplierName;
      } else this.messageEmptySupplierName = "";
    },

    /**
     * hiển thịp popup
     * CreatedBy NHHai 15/2/2022
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
     * Hàm lưu dữ liệu
     * createdBy NHHAi 15/2/2022
     * @param value giá trị chọn nút
     */
    btnSaveOnClick(value) {
      var me = this;
      me.isDelete = null;
      me.isShowleft = false;
      // kiểm tra dữ liệu trống
      me.$v.$touch();
      // Trường hợp mã nhà cung cấp
      if (!me.supplier.supplierCode) {
        //focus vào ô mã nhà cung cấp
        me.$refs.supplierCode.focus();
        //hiển thị popup
        this.isInfo = true;
        me.showPopupParent(true);
        me.textPopup = this.FormMode.SupplierCode_Not_Empty;
        return;
      }
      // Trường hợp NCC không đúng định dạng
      const regex = /^NCC[0-9]+$/;
      if (!regex.test(me.supplier.supplierCode)) {
        //focus vào ô mã nhân viên
        me.$refs.supplierCode.focus();
        //hiển thị popup
        me.showPopupParent(true);
        me.textPopup = this.FormMode.SupplierCode_Not_Regex;
        return;
      }

      // Trường hợp tên nhà cung cấp
      if (!me.supplier.supplierName) {
        //focus
        me.$refs.supplierName.focus();
        //hiển thị popup
        this.isInfo = true;
        me.showPopupParent(true);
        me.textPopup = this.FormMode.SupplierName_Not_Empty;
        return;
      }
      // trường hợp lỗi tên email
      if (me.$v.supplier.contactEmail.$error) {
        //focus vào ô mã nhân viên
        me.$refs.email.focus();
        //hiển thị popup
        me.showPopupParent(true);
        me.textPopup = this.FormMode.Email_Error;
        return;
      }

      // lấy dữ liệu
      // me.$emit("saveSupplier", { supplierValue: me.supplier, value: value });
      me.$emit("saveSupplier", value);
      me.$v.$reset();
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
      if (this.oldValue.employeeId == null) {
        this.oldValue.employeeId = "";
      }
      if (this.oldValue.prefix == null) {
        this.oldValue.prefix = "";
      }
      // so sánh 2 object
      if (JSON.stringify(this.oldValue) !== JSON.stringify(this.supplier)) {
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
  },
};
</script>

<style scoped>
@import url("../../../../style/component/dialog.css");
@import url("../../../../style/component/radio.css");
@import url("../../../../style/component/combobox.css");
@import url("../../../../style/component/comboboxMultiple.css");
@import url("../../../../style/component/tab.css");
@import url("../../../../style/component/textarea.css");
@import url("../../../../style/component/customCombobox.css");
</style>
