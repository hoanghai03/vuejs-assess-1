<template>
  <div class="dialog-pm" v-if="isShow" >
    <div class="dialog-pm-top display-flex">
      <div class="flex-1 display-flex align-center">
        <div class="m-icon mi-24 mi-recent-log"></div>
        <div class="text-header p-l-12">
          Phiếu chi {{ payment.paymentNumber }}
        </div>
        <div class="m-l-24 w-350 bgc-white">
          <v-combobox
            :disabled="disabled"
            :filled="disabled"
            v-model="reasonA"
            :items="FormMode.reason"
            :dense="true"
          >
          </v-combobox>
        </div>
      </div>
      <div class="display-flex align-center">
        <div class="pos-icon-header-content m-icon mi-24 mi-tour"></div>
        <a class="tour-label p-l-5 m-0">Hướng dẫn</a>
        <div class="m-6-8 mi-24 m-icon mi-setting__detail"></div>
        <div class="m-6-8 mi-24 m-icon m-icon-help" title="Giúp F1"></div>
        <div
          class="m-6-8 mi-24 m-icon m-icon-close"
          title="Đóng (ESC)"
          @click="btnCloseOnClickHeader"
        ></div>
      </div>
    </div>
    <div class="body-part">
      <div class="dialog-pm-content display-flex">
        <div class="p-r-16 display-flex w-75per">
          <div class="w-80per p-r-16">
            <div class="display-flex p-b-12">
              <div class="p-r-12 w-43per">
                <div class="text-input">Đối tượng</div>
                <div class="object bgc-white ps-relative">
                  <!--<v-select
                    :disabled="disabled"
                    label="supplierName"
                    :options="suppliers"
                    :reduce="(option) => option.supplierId"
                    v-model="payment.supplierId"
                    @input="changeSupplier($event)"
                  >
                    <template #list-header>
                      <div class="cbx__header display-flex">
                        <div class="vs__option m-w-120 no-wrap">
                          <b>Đối tượng</b>
                        </div>
                        <div class="vs__option m-w-250 no-wrap">
                          <b>Tên đối tượng</b>
                        </div>
                        <div class="vs__option m-w-100 no-wrap">
                          <b>Mã số thuế</b>
                        </div>
                        <div class="vs__option m-w-300 no-wrap">
                          <b>Địa chỉ</b>
                        </div>
                        <div class="vs__option m-w-100 no-wrap">
                          <b>Điện thoại</b>
                        </div>
                      </div>
                    </template>
                    <template v-slot:option="option">
                      <div class="cbx__body display-flex">
                        <div class="vs__option m-w-120 no-wrap">
                          <b>{{ option.supplierCode }}</b>
                        </div>
                        <div class="vs__option m-w-250 no-wrap">
                          <b>{{ option.supplierName }}</b>
                        </div>
                        <div class="vs__option m-w-100 no-wrap">
                          <b>{{ option.supplierTaxCode }}</b>
                        </div>
                        <div class="vs__option m-w-300 no-wrap">
                          <b>{{ option.address }}</b>
                        </div>
                        <div class="vs__option m-w-100 no-wrap">
                          <b>{{ option.phoneNumber }}</b>
                        </div>
                      </div>
                    </template>
                  </v-select>-->
                  <AutocompleteCombobox
                    :data="suppliers"
                    ref="cbxSupplier"
                    :allowNull="true"
                    :disable="disabled"
                    :hasAddAction="true"
                    :columnNames="[
                      'Đối tượng',
                      'Tên đối tượng',
                      'Mã số thuế',
                      'Địa chỉ',
                      'điện thoại',
                    ]"
                    :valueField="'supplierId'"
                    :showFields="[
                      'supplierCode',
                      'supplierName',
                      'supplierTaxCode',
                      'address',
                      'phoneNumber',
                    ]"
                    :selectedValue="'supplierCode'"
                    v-model="payment.supplierId"
                    :columnWidths="[
                      '100px',
                      '100px',
                      '100px',
                      '100px',
                      '100px',
                    ]"
                    :hasTitleRow="true"
                    @input="changeSupplier($event)"
                  ></AutocompleteCombobox>
                  <!--<div class="icon-plus-cbx">
                    <div
                      class="icon-plus m-icon mi-icon-16 mi-plus--success"
                    ></div>
                  </div>-->
                </div>
              </div>
              <div class="w-57per">
                <div class="text-input">Người nhận</div>
                <input
                  class="m-input bgc-white"
                  type="text"
                  v-model.trim="payment.supplierContactName"
                  :disabled="disabled"
                />
              </div>
            </div>
            <div class="p-b-12">
              <div class="text-input">Địa chỉ</div>
              <input
                class="m-input bgc-white"
                type="text"
                :disabled="disabled"
                v-model.trim="payment.address"
              />
            </div>
            <div class="p-b-12">
              <div class="text-input">Lý do chi</div>
              <input
                class="m-input bgc-white"
                type="text"
                :disabled="disabled"
                v-model.trim="payment.description"
              />
            </div>
            <div class="p-b-12 display-flex">
              <div class="w-43per p-r-12">
                <div class="text-input">Nhân viên</div>
                <div class="employee bgc-white ps-relative">
                  <!--<v-select
                    :disabled="disabled"
                    label="fullName"
                    :options="employees"
                    :reduce="(option) => option.employeeId"
                    v-model="payment.employeeId"
                  >
                    <template #list-header>
                      <div class="cbx__header display-flex">
                        <div class="vs__option m-w-120 no-wrap">
                          <b>Mã nhân viên</b>
                        </div>
                        <div class="vs__option m-w-250 no-wrap">
                          <b>Tên nhân viên</b>
                        </div>
                        <div class="vs__option m-w-100 no-wrap">
                          <b>Đơn vị</b>
                        </div>
                        <div class="vs__option m-w-100 no-wrap">
                          <b>ĐT di động</b>
                        </div>
                      </div>
                    </template>
                    <template v-slot:option="option">
                      <div class="cbx__body display-flex">
                        <div class="vs__option m-w-120 no-wrap">
                          <b>{{ option.employeeCode }}</b>
                        </div>
                        <div class="vs__option m-w-250 no-wrap">
                          <b>{{ option.fullName }}</b>
                        </div>
                        <div class="vs__option m-w-100 no-wrap">
                          <b>{{ option.departmentName }}</b>
                        </div>
                        <div class="vs__option m-w-100 no-wrap">
                          <b>{{ option.phoneNumber }}</b>
                        </div>
                      </div>
                    </template>
                  </v-select>-->
                  <AutocompleteCombobox
                    :data="employees"
                    :allowNull="true"
                    :disable="disabled"
                    :hasAddAction="true"
                    :columnNames="[
                      'mã nhân viên',
                      'Tên nhên viên',
                      'Đơn vị',
                      'Đt di động',
                    ]"
                    :valueField="'employeeId'"
                    :showFields="[
                      'employeeCode',
                      'fullName',
                      'departmentName',
                      'phoneNumber',
                    ]"
                    :selectedValue="'fullName'"
                    v-model="payment.employeeId"
                    :columnWidths="['100px', '100px', '100px', '100px']"
                    :hasTitleRow="true"
                  ></AutocompleteCombobox>
                  <!--<div class="icon-plus-cbx">
                    <div
                      class="icon-plus m-icon mi-icon-16 mi-plus--success"
                    ></div>
                  </div>-->
                </div>
              </div>
              <div class="w-143">
                <div class="text-input">kèm theo</div>
                <input
                  id="attach"
                  class="m-input bgc-white text-right"
                  placeholder="Số lượng"
                  type="text"
                  maxlength="20"
                  :disabled="disabled"
                  v-model="payment.documentIncluded"
                  @keypress="isNumber($event)"
                />
              </div>
              <div class="text-lisence">Chứng từ gốc</div>
            </div>
            <div class="display-flex">
              <div class="m-r-16">Tham chiếu</div>
              <div class="show-more">...</div>
            </div>
          </div>
          <div class="w-20per">
            <div class="left-seperate p-b-12">
              <div class="text-input">Ngày hạch toán</div>
              <date-picker
                :disabled="disabled"
                format="DD/MM/YYYY"
                type="date"
                :input-error="true"
                placeholder="DD/MM/YYYY"
                :value="payment.accountingDate"
                @input="changeAccountingDate($event)"
              ></date-picker>
            </div>
            <div class="left-seperate p-b-12">
              <div class="text-input">Ngày phiếu chi</div>
              <date-picker
                :disabled="disabled"
                format="DD/MM/YYYY"
                type="date"
                placeholder="DD/MM/YYYY"
                v-model.trim="payment.paymentDate"
              ></date-picker>
            </div>
            <div class="left-seperate p-b-12">
              <div class="text-input">Số phiếu chi</div>
              <input
                class="m-input bgc-white"
                type="text"
                :disabled="disabled"
                v-model.trim="payment.paymentNumber"
              />
            </div>
          </div>
        </div>
        <div class="w-25per">
          <div class="text-total-money">Tổng tiền</div>
          <div class="number-total-money">
            {{ payment.totalAmount | formatCurrency }}
          </div>
        </div>
      </div>
      <div class="tab-detail">
        <div class="flex-1">
          <div class="tab-label p-l-16">Hạch toán</div>
        </div>
        <div class="display-flex tab-detail-right">
          <div class="label-option p-r-10">Loại tiền</div>
          <div class="w-100">
            <BaseCombobox
              :disabled="disabled"
              :filled="disabled"
            ></BaseCombobox>
          </div>
        </div>
      </div>
      <table
        class="grid-detail common-table p-b-12 bgc-white"
        border="0"
        cellspacing="0"
      >
        <colgroup>
          <col style="min-width: 20px" />
          <col style="min-width: 32px" />
          <col style="min-width: 431px" />
          <col style="min-width: 176px" />
          <col style="min-width: 150px" />
          <col style="min-width: 191px" />
          <col style="min-width: 180px" />
          <col style="min-width: 250px" />
          <col style="min-width: 32px" />
          <col style="min-width: 20px" />
          <col style="min-width: 4px" />
        </colgroup>
        <thead>
          <tr >
            <th></th>
            <th>#</th>
            <th class="ps-unset">DIỄN GIẢI</th>
            <th class="ps-unset">TK NỢ</th>
            <th>TK CÓ</th>
            <th class="text-right">SỐ TIỀN</th>
            <th>ĐỐI TƯỢNG</th>
            <th>TÊN ĐỐI TƯỢNG</th>
            <th class="text-function r-40"></th>
            <th class="r-20"></th>
            <th class="r-0"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in paymentDetail"
            :key="index"
            @click="focusInputTd(index)"
            :disabled="disabled"
          >
            <td></td>
            <td :class="{ 'bgc-grey': isShowInput[index] }">{{ index + 1 }}</td>
            <td :class="{ 'bgc-grey': isShowInput[index] }">
              <input
                v-if="isShowInput[index]"
                class="m-input bgc-white"
                v-model.trim="item.description"
              />
              <span v-else>{{ item.description }}</span>
            </td>
            <td :class="{ 'bgc-grey': isShowInput[index] }">
              <div v-if="isShowInput[index]" class="bgc-white ps-relative">
                <!--<v-select
                  label="accountNumber"
                  :options="accountDebit"
                  :reduce="(option) => option.accountId"
                  v-model.trim="item.debitAccount"
                  @input="getAccountNumberDebit(index)"
                >
                  <template #list-header>
                    <div class="cbx__header display-flex">
                      <div class="vs__option m-w-120 no-wrap">
                        <b>Số tài khoản</b>
                      </div>
                      <div class="vs__option m-w-250 no-wrap">
                        <b>Tên tài khoản</b>
                      </div>
                    </div>
                  </template>
                  <template v-slot:option="option">
                    <div class="cbx__body display-flex">
                      <div class="vs__option m-w-120 no-wrap">
                        <b>{{ option.accountNumber }}</b>
                      </div>
                      <div class="vs__option m-w-250 no-wrap">
                        <b>{{ option.accountName }}</b>
                      </div>
                    </div>
                  </template>
                </v-select>-->
                <AutocompleteCombobox
                  :data="accountDebit"
                  :allowNull="false"
                  :columnNames="['Số tài khoản', 'Tên tài khoản']"
                  :valueField="'accountId'"
                  :showFields="['accountNumber', 'accountName']"
                  :selectedValue="'accountNumber'"
                  v-model="item.debitAccount"
                  :columnWidths="['100px', '100px']"
                  :hasTitleRow="true"
                  :validateProp="isValidateDebit[index]"
                  @input="getAccountNumberDebit(index)"
                ></AutocompleteCombobox>
                <div
                  v-if="isValidateDebit[index]"
                  class="m-icon mi-icon-16 mi-exclamation-cell--error cell-error-icon-cbx"
                ></div>
              </div>

              <div class="ps-relative" v-else>
                {{ item.debitAccountNumber }}
                <div
                  v-if="isValidateDebit[index]"
                  class="m-icon mi-icon-16 mi-exclamation-cell--error cell-error-icon"
                ></div>
              </div>
            </td>
            <td :class="{ 'bgc-grey': isShowInput[index] }">
              <div v-if="isShowInput[index]" class="bgc-white ps-relative">
                <!--<v-select
                  label="accountNumber"
                  :options="accountCredit"
                  :reduce="(option) => option.accountId"
                  v-model="item.creditAccount"
                  @input="getAccountNumberCredit(index)"
                >
                  <template #list-header>
                    <div class="cbx__header display-flex">
                      <div class="vs__option m-w-120 no-wrap">
                        <b>Số tài khoản</b>
                      </div>
                      <div class="vs__option m-w-250 no-wrap">
                        <b>Tên tài khoản</b>
                      </div>
                    </div>
                  </template>
                  <template v-slot:option="option">
                    <div class="cbx__body display-flex">
                      <div class="vs__option m-w-120 no-wrap">
                        <b>{{ option.accountNumber }}</b>
                      </div>
                      <div class="vs__option m-w-250 no-wrap">
                        <b>{{ option.accountName }}</b>
                      </div>
                    </div>
                  </template>
                </v-select>-->
                <AutocompleteCombobox
                  :data="accountCredit"
                  :allowNull="false"
                  :columnNames="['Số tài khoản', 'Tên tài khoản']"
                  :valueField="'accountId'"
                  :showFields="['accountNumber', 'accountName']"
                  :selectedValue="'accountNumber'"
                  v-model="item.creditAccount"
                  :columnWidths="['100px', '100px']"
                  :hasTitleRow="true"
                  @input="getAccountNumberCredit(index)"
                ></AutocompleteCombobox>
                <div
                  v-if="isValidateCredit[index]"
                  class="m-icon mi-icon-16 mi-exclamation-cell--error cell-error-icon-cbx"
                ></div>
              </div>

              <div class="ps-relative" v-else>
                {{ item.creditAccountNumber }}
                <div
                  v-if="isValidateCredit[index]"
                  class="m-icon mi-icon-16 mi-exclamation-cell--error cell-error-icon"
                ></div>
              </div>
            </td>
            <td :class="{ 'bgc-grey': isShowInput[index] }">
              <div v-if="isShowInput[index]">
                <input
                  v-if="isShowInput[index]"
                  class="m-input bgc-white text-right"
                  v-model="item.amount"
                  @keypress="isNumber($event)"
                  @blur="comcalculateTotalAmountputed"
                />
              </div>
              <div v-else class="text-right">
                <span>{{ item.amount | formatCurrency }}</span>
              </div>
            </td>
            <td :class="{ 'bgc-grey': isShowInput[index] }">
              <div v-if="isShowInput[index]" class="bgc-white">
                <!--<v-select
                  label="supplierCode"
                  :options="suppliers"
                  :reduce="(option) => option.supplierId"
                  v-model="item.supplierId"
                  @input="changeSupplierInDetail(index)"
                >
                  <template #list-header>
                    <div class="cbx__header display-flex">
                      <div class="vs__option m-w-120 no-wrap">
                        <b>Đối tượng</b>
                      </div>
                      <div class="vs__option m-w-250 no-wrap">
                        <b>Tên đối tượng</b>
                      </div>
                      <div class="vs__option m-w-100 no-wrap">
                        <b>Mã số thuế</b>
                      </div>
                      <div class="vs__option m-w-300 no-wrap">
                        <b>Địa chỉ</b>
                      </div>
                      <div class="vs__option m-w-100 no-wrap">
                        <b>Điện thoại</b>
                      </div>
                    </div>
                  </template>
                  <template v-slot:option="option">
                    <div class="cbx__body display-flex">
                      <div class="vs__option m-w-120 no-wrap">
                        <b>{{ option.supplierCode }}</b>
                      </div>
                      <div class="vs__option m-w-250 no-wrap">
                        <b>{{ option.supplierName }}</b>
                      </div>
                      <div class="vs__option m-w-100 no-wrap">
                        <b>{{ option.supplierTaxCode }}</b>
                      </div>
                      <div class="vs__option m-w-300 no-wrap">
                        <b>{{ option.address }}</b>
                      </div>
                      <div class="vs__option m-w-100 no-wrap">
                        <b>{{ option.phoneNumber }}</b>
                      </div>
                    </div>
                  </template>
                </v-select>-->
                <AutocompleteCombobox
                  :data="suppliers"
                  :allowNull="true"
                  :hasAddAction="false"
                  :columnNames="[
                    'Đối tượng',
                    'Tên đối tượng',
                    'Mã số thuế',
                    'Địa chỉ',
                    'điện thoại',
                  ]"
                  :valueField="'supplierId'"
                  :showFields="[
                    'supplierCode',
                    'supplierName',
                    'supplierTaxCode',
                    'address',
                    'phoneNumber',
                  ]"
                  :selectedValue="'supplierCode'"
                  v-model="item.supplierId"
                  :columnWidths="['100px', '100px', '100px', '100px', '100px']"
                  :left="true"
                  :hasTitleRow="true"
                  @input="changeSupplierInDetail(index)"
                ></AutocompleteCombobox>
              </div>
              <span v-else>{{ item.supplierCode }}</span>
            </td>
            <td :class="{ 'bgc-grey': isShowInput[index] }">
              <span>{{ item.supplierName }}</span>
            </td>
            <td class="r-40" :class="{ 'bgc-grey': isShowInput[index] }">
              <div
                class="m-icon mi-icon-16 mi-delete"
                @click="delAnyRow(index)"
              ></div>
            </td>
            <td class="r-20"></td>
            <td class="r-0"></td>
          </tr>
        </tbody>
        <tr class="td-bottom-table">
          <td class="p-0-10 sticky bgc-white"></td>
          <td class="p-0-10 bg-color"></td>
          <td class="p-0-10 bg-color"></td>
          <td class="p-0-10 bg-color"></td>
          <td class="p-0-10 bg-color"></td>
          <td class="p-0-10 bg-color text-right text-bold">
            {{ payment.totalAmount }}
          </td>
          <td class="p-0-10 bg-color"></td>
          <td class="p-0-10 bg-color"></td>
          <td class="p-0-10 bg-color sticky r-40"></td>
          <td class="p-0-10 sticky r-20 bgc-white"></td>
          <td class="p-0-10 sticky r-0 bgc-white"></td>
        </tr>
      </table>
      <div class="bgc-white display-flex p-l-30 p-b-16 sticky">
        <button class="m-btn-payment" @click="addColPaymentDetail">
          Thêm dòng
        </button>
        <button class="m-btn-payment" @click="delAllCol">Xóa hết dòng</button>
      </div>
      <div class="bgc-white display-flex p-l-30 p-b-6 sticky">
        <div class="m-icon mi-18 mi-attach m-r-8"></div>
        <div class="text-input">Đính kèm</div>
        <div class="max-size-upload">Dung lượng tối đa 5MB</div>
      </div>

      <div class="bgc-white p-l-30 sticky">
        <div class="upload-file">Kéo/thả tệp vào đây hoặc bấm vào đây</div>
      </div>
      <div class="clear"></div>
    </div>

    <div class="dialog-pm-bottom display-flex">
      <div class="flex-1">
        <button class="m-second-btn color-white" @click="btnCloseDialog">
          Hủy
        </button>
      </div>
      <div class="display-flex">
        <button
          class="m-second-btn color-white"
          @click="btnSaveOnClick(FormMode.SaveAndDisable)"
        >
          Cất
        </button>
        <button class="btn-radius-left radius-left" @click="btnSaveOnClick">
          {{ textBtn }}
        </button>
        <button class="btn-radius-right radius-right" @click="showVisit">
          <div class="line"></div>
          <div class="pos-icon-btn m-icon mi-icon-16 mi-arrow-up--white"></div>
        </button>
      </div>
    </div>
    <div v-if="isShowVisit" id="delEntity" class="multiple-entity visit">
      <div class="multiple" @click="btnSaveOnClick(FormMode.SaveAndAdd)">
        Cất và Thêm
      </div>
      <div class="multiple" @click="btnSaveOnClick(FormMode.Save)">
        Cất và Đóng
      </div>
      <div class="multiple">Cất và In</div>
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
import BaseCombobox from "../../../components/base/BaseCombobox.vue";
import AutocompleteCombobox from "../../../components/base/AutocompleteCombobox.vue";
import SupplierPopup from "../../../components/base/BasePopup.vue";
import DatePicker from "vue2-datepicker";
import FormMode from "../../../script/enum.js";
import "vue2-datepicker/index.css";
// import vSelect from "vue-select";
// import "vue-select/dist/vue-select.css";
import Payment from "../../../models/payment.js";
// import { required } from "vuelidate/lib/validators";
export default {
  name: "PaymentDetail",
  components: {
    BaseCombobox,
    DatePicker,
    // vSelect,
    SupplierPopup,
    AutocompleteCombobox,
  },
  props: [
    "isShow",
    "suppliers",
    "employees",
    "payment",
    "paymentDetail",
    "checkDelOnClickTr",
    "accountDebit",
    "accountCredit",
    "disabled",
  ],
  mounted() {
    // Bắt sự kiện shortcuts
    const keysPressed = {};
    const me = this;
    document.addEventListener("keydown", (event) => {
      // đóng dialog khi click ESC
      if (event.key == "Escape") {
        me.btnCloseOnClickHeader();
      }

      if (keysPressed["Control"] && (event.key == "s" || event.key == "S")) {
        event.preventDefault(); // hủy sự kiện mặc định
      }
      keysPressed[event.key] = true;
      // Lưu
      // if (
      //   keysPressed["Control"] &&
      //   !keysPressed["Shift"] &&
      //   (event.key == "s" || event.key == "S") &&
      //   me.isShow
      // ) {
      //   //TODO
      //   me.btnSaveOnClick(FormMode.Save);
      // }
      // // Lưu và thêm mới
      // if (
      //   keysPressed["Control"] &&
      //   keysPressed["Shift"] &&
      //   (event.key == "s" || event.key == "S") &&
      //   me.isShow
      // ) {
      //   //TODO
      //   me.btnSaveOnClick(FormMode.SaveAndAdd);
      // }
    });
    // xóa sự kiện keydown
    document.addEventListener("keyup", (event) => {
      delete keysPressed[event.key];
    });
  },
  filters: {
    formatCurrency: (value) => {
      return parseFloat(value)
        .toFixed(1)
        .replace(/(\d)(?=(\d{3})+\.)/g, "$1.");
    },
  },
  data() {
    return {
      isShowInput: [],
      isValidateDebit: [],
      isValidateCredit: [],
      FormMode,
      reasonA: {
        text: "7. Chi khác",
        value: 7,
      },
      isShowVisit: false,
      textBtn: "Cất và Đóng",
      checkBtn: 1,
      save: "Cất và Đóng",
      saveAndAdd: "Cất và Thêm",
      isShowPopupDetail: false,
      textPopup: null,
      isInfo: false,
      isShowleft: false,
      textLeft: "",
      isDelete: "",
      isAsk: false,
      oldValue: new Payment(),
      oldValueDetails: null,
      checkValidateCbx: false,
    };
  },
  watch: {
    // set giá trị mặc đinh khi bấm vào nút chi tiền ngoài giao diện chính
    isShow: function () {
      (this.textBtn = "Cất và Đóng"), (this.checkBtn = 1);
      // gán giá trị empl cho oldValue
      this.oldValue = { ...this.payment };
      this.oldValueDetails = [...this.paymentDetail];
    },

    /**
     * Hàm kiểm tra sự thay đổi của payment
     */
    payment: function () {
      this.isShowInput = Array(this.paymentDetail.length || 0).fill(false);
      this.isValidateDebit = Array(this.paymentDetail.length || 0).fill(false);
      this.isValidateCredit = Array(this.paymentDetail.length || 0).fill(false);
    },
  },
  created() {
    this.isShowInput = Array(this.paymentDetail.length || 0).fill(false);
  },
  // validations: {
  //   paymentDetail: {
  //     $each: {
  //       accountCredit: {
  //         required,
  //       },
  //       accountDebit: {
  //         required,
  //       },
  //     },
  //   },
  // },
  methods: {
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
     * createdBy NHHAi 11/1/2021
     */
    saveData(value) {
      if (value) {
        this.btnSaveOnClick(this.FormMode.Save);
      } else {
        this.btnCloseDialog();
      }
    },
    /**
     * Hàm khi click vào td
     * @param index
     * creaedBy NHHai 21/2/2022
     */
    focusInputTd(index) {
      if (!this.disabled) {
        this.isShowInput = Array(this.paymentDetail.length || 0).fill(false);
        this.isShowInput[index] = true;
        this.isShowInput = [...this.isShowInput];
        // emit để xóa dòng mới nhất nhưng chưa chỉnh sửa
        this.$emit("delOnClickTr", index);
      }
    },

    /**
     * Hàm đóng dialog
     * creaedBy NHHai 21/2/2022
     */
    btnCloseDialog() {
      this.$emit("isShow", false);
    },

    /**
     * Hàm thay đổi ngày hoạch toán
     * @param value
     * creaedBy NHHai 21/2/2022
     */
    changeAccountingDate(value) {
      var accountingDate = this.payment.accountingDate;
      var paymentDate = this.payment.paymentDate;
      // xóa cảnh báo
      if (value && paymentDate && value.getTime() >= paymentDate.getTime())
        document
          .querySelector(".mx-input-wrapper input")
          .classList.remove("input-warning");

      if (
        (!accountingDate && !paymentDate) ||
        (accountingDate &&
          paymentDate &&
          accountingDate.getTime() == paymentDate.getTime())
      ) {
        // thay đổi giá trị accountingDate và paymentDate giống nhau
        this.$emit("changeDate", value);
      } else this.$emit("changeAccountingDate", value);
    },

    /**
     * Hàm bind giá trị vào input khi thay đổi đối tượng
     * creaedBy NHHai 21/2/2022
     */
    changeSupplier() {
      this.$emit("changeSupplier");
    },

    /**
     * Hàm emit giá trị trong combobox grid
     * @param index
     * creaedBy NHHai 21/2/2022
     */
    changeSupplierInDetail(index) {
      this.$emit("changeSupplierInDetailEmit", index);
    },
    /**
     * Hàm thêm col
     * creaedBy NHHai 21/2/2022
     */
    addColPaymentDetail() {
      if (!this.disabled) {
        this.$emit("addColPaymentDetailEmit");
      }
    },

    /**
     * Hàm xóa tất cả các hàng
     * creaedBy NHHai 21/2/2022
     */
    delAllCol() {
      if (!this.disabled) {
        this.$emit("delAllColEmit");
      }
    },

    /**
     * Hàm chỉ cho nhập số
     * creaedBy NHHai 21/2/2022
     */
    isNumber(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },

    /**
     * Hàm tính giá trị tổng tiền
     * creaedBy NHHai 21/2/2022
     */
    comcalculateTotalAmountputed() {
      var me = this;
      me.payment.totalAmount = 0;
      me.paymentDetail.forEach((value) => {
        me.payment.totalAmount =
          parseInt(me.payment.totalAmount) + parseInt(value.amount);
      });
    },

    /**
     * Hàm xóa hàng bất kỳ
     * creaedBy NHHai 21/2/2022
     */
    delAnyRow(index) {
      if (!this.disabled) {
        this.$emit("delAnyRowProp", index);
      }
    },

    /**
     * Hàm lấy mã code accountDebit
     * creaedBy NHHai 21/2/2022
     */
    getAccountNumberDebit(index) {
      if (!this.paymentDetail[index].debitAccount)
        this.isValidateDebit[index] = true;
      else this.isValidateDebit[index] = false;
      this.$emit("getAccountNumberDebitProps", index);
    },

    /**
     * Hàm lấy mã code accountCredit
     * creaedBy NHHai 21/2/2022
     */
    getAccountNumberCredit(index) {
      if (!this.paymentDetail[index].creditAccount)
        this.isValidateCredit[index] = true;
      else this.isValidateCredit[index] = false;
      this.$emit("getAccountNumberCreditProps", index);
    },

    /**
     * Hàm ẩn hiện các nút lưu
     * creaedBy NHHai 21/2/2022
     */
    showVisit() {
      if (!this.disabled) {
        this.isShowVisit = !this.isShowVisit;
      }
    },

    /**
     * Hàm lưu dữ liệu
     * creaedBy NHHai 21/2/2022
     */
    btnSaveOnClick(number) {
      this.checkValidateCbx = false;

      if (!this.disabled) {
        switch (number) {
          case this.FormMode.Save:
            this.textBtn = this.save;
            this.checkBtn = this.FormMode.Save;
            break;
          case this.FormMode.SaveAndAdd:
            this.textBtn = this.saveAndAdd;
            this.checkBtn = this.FormMode.SaveAndAdd;
            break;
          default:
            break;
        }
        // ẩn form chọn Cất và Đóng, Cất và Thêm
        this.isShowVisit = false;
        // kiểm tra dữ liệu trống
        // this.$v.$touch();
        // validate dữ liệu
        // kiểm tra dữ liệu ngày hạch toán và ngày phiếu thu
        if (
          this.payment.accountingDate.getTime() <
          this.payment.paymentDate.getTime()
        ) {
          //focus
          // me.$refs.supplierName.focus();
          // hiển thị cảnh báo
          document
            .querySelector(".mx-input-wrapper input")
            .classList.add("input-warning");
          //hiển thị popup
          this.isInfo = true;
          this.showPopupParent(true);
          this.textPopup = FormMode.Error_Date;
          return;
        }
        // kiểm tra combobox tài khoản nợ và có
        this.paymentDetail.forEach((value, index) => {
          if (!value.debitAccount || value.debitAccount == "") {
            this.isInfo = true;
            this.showPopupParent(true);
            // hiển thị border màu đỏ
            this.isValidateDebit[index] = true;
            this.textPopup = FormMode.Empty_Account_Debit;
            this.checkValidateCbx = true;
          }
          if (!value.creditAccount || value.creditAccount == "") {
            this.isInfo = true;
            this.showPopupParent(true);
            // hiển thị border màu đỏ
            this.isValidateCredit[index] = true;
            this.textPopup = FormMode.Empty_Account_Credit;
            this.checkValidateCbx = true;
          }
        });
        if (this.checkValidateCbx) return;
        this.isShowInput = Array(this.paymentDetail.length || 0).fill(false);
        if (number == this.FormMode.SaveAndDisable) {
          this.$emit("saveData", number);
        } else this.$emit("saveData", this.checkBtn);
      }
    },

    /**
     * Hàm hiển thị popup khi click vào đấu X ở dialog
     * createdBy NHHAi 28/2/2022
     */
    btnCloseOnClickHeader() {
      // so sánh 2 object
      if (
        JSON.stringify(this.oldValue) !== JSON.stringify(this.payment) ||
        JSON.stringify(this.oldValueDetails) !==
          JSON.stringify(this.paymentDetail)
      ) {
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
        this.btnCloseDialog();
      }
    },
  },
};
</script>
<style scoped>
@import url("../../../style/component/dialog.css");
@import url("../../../style/common/common.css");
@import url("../../../style/component/radio.css");
@import url("../../../style/component/combobox.css");
@import url("../../../style/component/comboboxMultiple.css");
@import url("../../../style/component/tab.css");
@import url("../../../style/component/textarea.css");
@import url("../../../style/component/dialogPayment.css");
@import url("../../../style/component/customLibraryInputDate.css");
</style>
