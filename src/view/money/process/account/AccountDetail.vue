<template>
  <div
    data-app
    class="m-dialog h-100vh"
    id="dialog"
    :class="{ 'm-dialog-show': isShow }"
  >
    <div class="m-modal"></div>
    <div
      id="dialogAccount"
      ref="dialogAccount"
      class="dialog-account"
      :class="{ 'resize-click': resize }"
    >
      <div class="dialog-header p-l-16 p-b-16">
        <div class="dialog-title p-none">
          <div class="text-title-account p-t-16">Thêm tài khoản</div>
        </div>
        <div class="dialog-close">
          <div class="icon-help m-icon m-icon-help" title="Giúp F1"></div>
          <div class="icon-close m-icon m-icon-close" title="Đóng (ESC)"></div>
        </div>
      </div>
      <div
        class="dialog-content p-t-12 p-l-16 p-r-16 h-content-account content-account-overflow"
      >
        <div class="w-100per display-flex">
          <div class="w-50per p-r-12">
            <div class="display-flex p-b-12">
              <div class="p-r-12 w-50per">
                <div class="text-input">Số tài khoản <span>*</span></div>
                <input
                  id="accountNumber"
                  class="m-input check"
                  type="text"
                  maxlength="12"
                  ref="accountNumber"
                  :title="messageEmptyAccountNumber"
                  :class="{
                    'input-warning': $v.account.accountNumber.$error,
                  }"
                  v-model.trim="$v.account.accountNumber.$model"
                  @blur="blurAccountNumber"
                  required
                />
              </div>
            </div>
            <div class="p-b-12">
              <div class="text-input">Tên tài khoản <span>*</span></div>
              <input
                maxlength="100"
                class="m-input check"
                type="text"
                ref="accountName"
                required
                :title="messageEmptyAccountName"
                :class="{
                  'input-warning': $v.account.accountName.$error,
                }"
                v-model.trim="$v.account.accountName.$model"
                @blur="blurAccountName"
              />
            </div>
            <div class="display-flex p-b-12">
              <div class="w-50per p-r-12">
                <div class="text-input">Tài khoản tổng hợp</div>
                <BaseCombobox
                  :selectVal="selectAccount"
                  :value="accountCombobox"
                  @selectValue="selectValueAccount($event)"
                ></BaseCombobox>
              </div>
              <div class="w-50per property">
                <div class="text-input">Tính chất <span>*</span></div>
                <BaseCombobox
                  :selectVal="select"
                  :value="FormMode.property"
                  @selectValue="selectValue($event)"
                ></BaseCombobox>
              </div>
            </div>
          </div>
          <div class="w-50per align-center d-grid p-b-12">
            <div>
              <div class="text-input">Tên tiếng anh</div>
              <input
                maxlength="100"
                class="m-input check"
                type="text"
                v-model="account.accountNameEnglish"
              />
            </div>
          </div>
        </div>
        <div class="p-b-12">
          <div class="text-input">Diễn giải</div>
          <textarea
            class="m-textarea"
            name=""
            id=""
            v-model="account.description"
          ></textarea>
        </div>
        <div class="display-flex">
          <div class="p-r-12">
            <input
              type="checkbox"
              class="m-icon-checkbox"
              name=""
              v-model="account.foreignCurrencyAccount"
            />
          </div>
          <label class="checkbox-content" for="check-customer"
            >Có hoạch toán ngoại tệ</label
          >
        </div>
        <div class="follow-detail" @click="toggleFollow">
          <div
            class="m-icon mi-icon-16 mi-icon-right"
            :class="{ 'rotate-90': theFollow }"
          ></div>
          <span class="text-follow-detail">Theo dõi chi tiết theo</span>
        </div>
        <div class="p-0-10-10 display-flex" v-if="theFollow">
          <div class="w-50per">
            <div class="display-flex m-r-20per align-center p-b-12">
              <div class="w-50per align-center display-flex">
                <input
                  id="detail-1"
                  type="checkbox"
                  class="m-icon-checkbox"
                  v-model="account.detailByObject"
                />
                <label class="p-l-10" for="detail-1">Đối tượng</label>
              </div>
              <div class="w-50per">
                <base-combobox
                  :selectVal="selectObject"
                  :value="FormMode.object"
                  :disabled="!account.detailByObject"
                  :filled="!account.detailByObject"
                  @selectValue="selectValueObject($event)"
                ></base-combobox>
              </div>
            </div>
            <div class="display-flex m-r-20per align-center p-b-12">
              <div class="w-50per align-center display-flex">
                <input
                  id="detail-2"
                  type="checkbox"
                  class="m-icon-checkbox"
                  v-model="account.detailByCostAggregationObj"
                />
                <label for="detail-2" class="p-l-10">Đối tượng THCP</label>
              </div>
              <div class="w-50per">
                <base-combobox
                  :value="FormMode.follow"
                  :selectVal="selectCostAggregationObj"
                  :disabled="!account.detailByCostAggregationObj"
                  :filled="!account.detailByCostAggregationObj"
                  @selectValue="selectValueCostAggregationObj($event)"
                ></base-combobox>
              </div>
            </div>
            <div class="display-flex m-r-20per align-center p-b-12">
              <div class="w-50per align-center display-flex">
                <input
                  id="detail-3"
                  type="checkbox"
                  class="m-icon-checkbox"
                  v-model="account.detailByOrder"
                />
                <label for="detail-3" class="p-l-10">Đơn đặt hàng</label>
              </div>
              <div class="w-50per">
                <base-combobox
                  :value="FormMode.follow"
                  :selectVal="selectOrder"
                  :disabled="!account.detailByOrder"
                  :filled="!account.detailByOrder"
                  @selectValue="selectValueOrder($event)"
                ></base-combobox>
              </div>
            </div>
            <div class="display-flex m-r-20per align-center p-b-12">
              <div class="w-50per align-center display-flex">
                <input
                  id="detail-4"
                  type="checkbox"
                  class="m-icon-checkbox"
                  v-model="account.detailByPurchaseContract"
                />
                <label for="detail-4" class="p-l-10">Hợp đồng mua</label>
              </div>
              <div class="w-50per">
                <base-combobox
                  :value="FormMode.follow"
                  :selectVal="selectPurchaseContract"
                  :disabled="!account.detailByPurchaseContract"
                  :filled="!account.detailByPurchaseContract"
                  @selectValue="selectValuePurchaseContract($event)"
                ></base-combobox>
              </div>
            </div>
            <div class="display-flex m-r-20per align-center p-b-12">
              <div class="w-50per align-center display-flex">
                <input
                  id="detail-5"
                  type="checkbox"
                  class="m-icon-checkbox"
                  v-model="account.detailByUnit"
                />
                <label for="detail-5" class="p-l-10">Đơn vị</label>
              </div>
              <div class="w-50per">
                <base-combobox
                  :value="FormMode.follow"
                  :selectVal="selectUnit"
                  :disabled="!account.detailByUnit"
                  :filled="!account.detailByUnit"
                  @selectValue="selectValueUnit($event)"
                ></base-combobox>
              </div>
            </div>
          </div>
          <div class="w-50per">
            <div class="display-flex m-r-20per align-center p-b-12">
              <div class="align-center display-flex">
                <input id="detail-6" type="checkbox" class="m-icon-checkbox" />
                <label for="detail-6" class="p-l-10">Tài khoản ngân hàng</label>
              </div>
            </div>
            <div class="display-flex m-r-20per align-center p-b-12">
              <div class="w-50per align-center display-flex">
                <input
                  id="detail-7"
                  type="checkbox"
                  class="m-icon-checkbox"
                  v-model="account.detailByContruction"
                />
                <label for="detail-7" class="p-l-10">Công trình</label>
              </div>
              <div class="w-50per">
                <base-combobox
                  :value="FormMode.follow"
                  :selectVal="selectContruction"
                  :disabled="!account.detailByContruction"
                  :filled="!account.detailByContruction"
                  @selectValue="selectValueContruction($event)"
                ></base-combobox>
              </div>
            </div>
            <div class="display-flex m-r-20per align-center p-b-12">
              <div class="w-50per align-center display-flex">
                <input
                  id="detail-8"
                  type="checkbox"
                  class="m-icon-checkbox"
                  v-model="account.detailByContractSale"
                />
                <label for="detail-8" class="p-l-10">Hợp đồng bán</label>
              </div>
              <div class="w-50per">
                <base-combobox
                  :value="FormMode.follow"
                  :selectVal="selectContractSale"
                  :disabled="!account.detailByContractSale"
                  :filled="!account.detailByContractSale"
                  @selectValue="selectValueContractSale($event)"
                ></base-combobox>
              </div>
            </div>
            <div class="display-flex m-r-20per align-center p-b-12">
              <div class="w-50per align-center display-flex">
                <input
                  id="detail-9"
                  type="checkbox"
                  class="m-icon-checkbox"
                  v-model="account.detailByExpenseItem"
                />
                <label for="detail-9" class="p-l-10">Khoản mục cp</label>
              </div>
              <div class="w-50per">
                <base-combobox
                  :value="FormMode.follow"
                  :selectVal="selectExpenseItem"
                  :disabled="!account.detailByExpenseItem"
                  :filled="!account.detailByExpenseItem"
                  @selectValue="selectValueExpenseItem($event)"
                ></base-combobox>
              </div>
            </div>
            <div class="display-flex m-r-20per align-center p-b-12">
              <div class="w-50per align-center display-flex">
                <input
                  id="detail-10"
                  type="checkbox"
                  class="m-icon-checkbox"
                  v-model="account.detailByStatisticalCode"
                />
                <label for="detail-10" class="p-l-10">Mã thống kê</label>
              </div>
              <div class="w-50per">
                <base-combobox
                  :value="FormMode.follow"
                  :selectVal="selectStatisticalCode"
                  :disabled="!account.detailByStatisticalCode"
                  :filled="!account.detailByStatisticalCode"
                  @selectValue="selectValueStatisticalCode($event)"
                ></base-combobox>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="dialog-bottom p-l-16 p-r-16 p-b-12">
        <div class="dialog-bot-left">
          <button
            id="closeDialog"
            class="m-second-btn"
            @click="btnCloseOnClick"
          >
            Hủy
          </button>
        </div>
        <div class="dialog-bot-right">
          <div>
            <button
              id="saveEntity"
              @click="btnSaveOnClick(FormMode.Save)"
              class="m-second-btn"
              title="Cất (Ctrl + S)"
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
      <div
        class="resize"
        @click="resizeOnclick"
        :class="{ 'rotate-180': rotate }"
      >
        <div class="m-icon mi-chevron-left mi-icon-16"></div>
      </div>
    </div>
    <AccountPopup
      @showPopup="showPopupParent"
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
import { required } from "vuelidate/lib/validators";
import BaseCombobox from "../../../../components/base/BaseCombobox.vue";
import FormMode from "../../../../script/enum.js";
import AccountPopup from "../../../../components/base/BasePopup.vue";
export default {
  name: "accountDetail",
  components: { BaseCombobox, AccountPopup },
  props: ["isShow", "account", "accountCombobox"],
  data() {
    return {
      resize: false,
      rotate: false,
      selectAccount: [],
      select: [],
      selectObject: {},
      selectCostAggregationObj: [],
      selectOrder: [],
      selectPurchaseContract: [],
      selectUnit: [],
      selectContruction: [],
      selectContractSale: [],
      selectExpenseItem: [],
      selectStatisticalCode: [],
      FormMode,
      theFollow: true,
      // checkbox
      object: false,
      costAggregationObj: false,
      order: false,
      purchaseContract: false,
      unit: false,
      contruction: false,
      contractSale: false,
      expenseItem: false,
      statisticalCode: false,

      emptyAccountNumber: "Số tài khoản không được phép để trống",
      messageEmptyAccountNumber: "",
      emptyAccountName: "Tên tài khoản không được phép để trống",
      messageEmptyAccountName: "",

      isValidateCBX: false,
      isShowPopupDetail: false,
      textPopup: null,
      isInfo: false,
      isShowleft: false,
      textLeft: "",
      isDelete: "",
      isAsk: false,
    };
  },
  validations: {
    account: {
      accountNumber: {
        required,
      },
      accountName: {
        required,
      },
    },
  },
  watch: {
    /**
     * Hiển thị giá trị trên combobox khi click chuột vào Tr
     * createdBy NHHai 4/1/2022
     */
    account: function () {
      // kiểm tra giá trị department
      if (this.account.accountId != "") {
        // Gán giá trị cho combobox tài khoản tổng hợp
        this.selectAccount = {};
        this.selectAccount.text = this.account.parentName;
        this.selectAccount.value = this.account.parentId;
        // Gán giá trị cho combobox tính chất
        this.select = {};
        this.select.text = this.account.accountCategorykindName;
        this.select.value = this.account.accountCategoryKind;
        // Gán giá trị cho combobox đối tượng
        this.selectObject = {};
        this.selectObject.text = this.account.detailByObjectKindName;
        this.selectObject.value = this.account.detailByObjectKind;
        if (this.account.detailByObject == 0) {
          this.selectObject.text = null;
          this.selectObject.value = null;
        }
        //Theo dõi chi tiết theo Đối tượng THCP( 0- Chỉ cảnh báo; 1- Bắt buộc nhập)

        this.selectCostAggregationObj = {};
        this.selectCostAggregationObj.text =
          this.account.detailByCostAggregationObjKindName;
        this.selectCostAggregationObj.value =
          this.account.detailByCostAggregationObjKind;
        if (this.account.detailByCostAggregationObj == 0) {
          this.selectCostAggregationObj.text = null;
          this.selectCostAggregationObj.value = null;
        }
        //Theo dõi chi tiết theo Đơn đặt hàng (0 - Chỉ cảnh báo; 1- Bắt buộc nhấp)

        this.selectOrder = {};
        this.selectOrder.text = this.account.detailByOrderKindName;
        this.selectOrder.value = this.account.detailByOrderKind;
        if (this.account.detailByOrder == 0) {
          this.selectOrder.text = null;
          this.selectOrder.value = null;
        }
        //Theo dõi chi tiết theo Hợp đồng mua (0 - Chỉ cảnh báo; 1- Bắt buộc nhấp)

        this.selectPurchaseContract = {};
        this.selectPurchaseContract.text =
          this.account.detailByPurchaseContractKindName;
        this.selectPurchaseContract.value =
          this.account.detailByPurchaseContractKind;
        if (this.account.detailByPurchaseContract == 0) {
          this.selectPurchaseContract.text = null;
          this.selectPurchaseContract.value = null;
        }
        //Theo dõi chi tiết theo Đơn vị (0 - Chỉ cảnh báo; 1- Bắt buộc nhấp)

        this.selectUnit = {};
        this.selectUnit.text = this.account.detailByUnitKindName;
        this.selectUnit.value = this.account.detailByUnitKind;

        if (this.account.detailByUnit == 0) {
          this.selectUnit.text = null;
          this.selectUnit.value = null;
        }
        //Theo dõi chi tiết theo Công trình (0 - Chỉ cảnh báo; 1- Bắt buộc nhấp)

        this.selectContruction = {};
        this.selectContruction.text = this.account.detailByContructionKindName;
        this.selectContruction.value = this.account.detailByContructionKind;
        if (this.account.detailByContruction == 0) {
          this.selectContruction.text = null;
          this.selectContruction.value = null;
        }
        //Theo dõi chi tiết theo Hợp đồng bán (0 - Chỉ cảnh báo; 1- Bắt buộc nhấp)

        this.selectContractSale = {};
        this.selectContractSale.text =
          this.account.detailByContractSaleKindName;
        this.selectContractSale.value = this.account.detailByContractSaleKind;
        if (this.account.detailByContractSale == 0) {
          this.selectContractSale.text = null;
          this.selectContractSale.value = null;
        }
        //Theo dõi chi tiết theo Khoản mục chi phí (0 - Chỉ cảnh báo; 1- Bắt buộc nhấp)

        this.selectExpenseItem = {};
        this.selectExpenseItem.text = this.account.detailByExpenseItemKindName;
        this.selectExpenseItem.value = this.account.detailByExpenseItemKind;
        if (this.account.detailByExpenseItem == 0) {
          this.selectExpenseItem.text = null;
          this.selectExpenseItem.value = null;
        }
        //Theo dõi chi tiết theo Mã thống kê(0 - Chỉ cảnh báo; 1- Bắt buộc nhấp)

        this.selectStatisticalCode = {};
        this.selectStatisticalCode.text =
          this.account.detailByStatisticalCodeKindName;
        this.selectStatisticalCode.value =
          this.account.detailByStatisticalCodeKind;

        if (this.account.detailByStatisticalCode == 0) {
          this.selectStatisticalCode.text = null;
          this.selectStatisticalCode.value = null;
        }
      } else {
        // Gán giá trị cho combobox tài khoản tổng hợp
        this.selectAccount = {};
        this.selectAccount.text = null;
        this.selectAccount.value = null;
        // trường hợp khởi đầu thì gán giá trị true cho isVAlidateCBX
        this.isValidateCBX = true;
        // xóa dữ liệu combobox nhân viên và xóa cảnh báo
        this.select = {};
        this.select.text = "Dư nợ";
        this.select.value = 1;
        // // xóa dữ liệu combobox danh xưng và xóa cảnh báo
        this.selectObject = {};
        this.selectObject.text = null;
        this.selectObject.value = null;

        this.selectCostAggregationObj = {};
        this.selectCostAggregationObj.text = null;
        this.selectCostAggregationObj.value = null;

        this.selectOrder = {};
        this.selectOrder.text = null;
        this.selectOrder.value = null;

        this.selectPurchaseContract = {};
        this.selectPurchaseContract.text = null;
        this.selectPurchaseContract.value = null;

        this.selectUnit = {};
        this.selectUnit.text = null;
        this.selectUnit.value = null;

        this.selectContruction = {};
        this.selectContruction.text = null;
        this.selectContruction.value = null;

        this.selectContractSale = {};
        this.selectContractSale.text = null;
        this.selectContractSale.value = null;

        this.selectExpenseItem = {};
        this.selectExpenseItem.text = null;
        this.selectExpenseItem.value = null;

        this.selectStatisticalCode = {};
        this.selectStatisticalCode.text = null;
        this.selectStatisticalCode.value = null;
      }
    },
    /**
     * chọn danh xưng
     * CreatedBy NHHai 28/12/2021
     */
    selectAccount: function (value) {
      this.$emit("parentId", value.value);
    },

    /**
     * chọn
     * CreatedBy NHHai 28/12/2021
     */
    select: function (value) {
      if (value.value === undefined && !this.isValidateCBX) {
        document
          .querySelector(
            ".property .v-autocomplete.v-input>.v-input__control>.v-input__slot"
          )
          .classList.add("input-warning");
      } else {
        document
          .querySelector(
            ".property .v-autocomplete.v-input>.v-input__control>.v-input__slot"
          )
          .classList.remove("input-warning");
      }
      // gán giá trị false
      this.isValidateCBX = false;
      this.$emit("select", value.value);
    },
    /**
     * chọn danh xưng
     * CreatedBy NHHai 28/12/2021
     */
    selectObject: function (value) {
      this.$emit("object", value.value);
    },
    /**
     * chọn danh xưng
     * CreatedBy NHHai 28/12/2021
     */
    selectCostAggregationObj: function (value) {
      this.$emit("costAggregationObj", value.value);
    },
    /**
     * chọn danh xưng
     * CreatedBy NHHai 28/12/2021
     */
    selectOrder: function (value) {
      this.$emit("order", value.value);
    },
    /**
     * chọn danh xưng
     * CreatedBy NHHai 28/12/2021
     */
    selectPurchaseContract: function (value) {
      this.$emit("purchaseContract", value.value);
    },
    /**
     * chọn danh xưng
     * CreatedBy NHHai 28/12/2021
     */
    selectUnit: function (value) {
      this.$emit("unit", value.value);
    },
    /**
     * chọn danh xưng
     * CreatedBy NHHai 28/12/2021
     */
    selectContruction: function (value) {
      this.$emit("contruction", value.value);
    },
    /**
     * chọn danh xưng
     * CreatedBy NHHai 28/12/2021
     */
    selectContractSale: function (value) {
      this.$emit("contractSale", value.value);
    },
    /**
     * chọn danh xưng
     * CreatedBy NHHai 28/12/2021
     */
    selectExpenseItem: function (value) {
      this.$emit("expenseItem", value.value);
    },
    /**
     * chọn danh xưng
     * CreatedBy NHHai 28/12/2021
     */
    selectStatisticalCode: function (value) {
      this.$emit("statisticalCode", value.value);
    },
  },
  methods: {
    // hàm gán giá trị cho select
    // cretedBy NHHAi 15/2/2022
    selectValueAccount(value) {
      this.selectAccount = value;
    },
    // hàm gán giá trị cho select
    // cretedBy NHHAi 15/2/2022
    selectValue(value) {
      this.select = value;
    },
    // hàm gán giá trị cho select object
    // cretedBy NHHAi 15/2/2022
    selectValueObject(value) {
      this.selectObject = value;
    },
    // hàm gán giá trị cho selectCostAggregationObj
    // cretedBy NHHAi 15/2/2022
    selectValueCostAggregationObj(value) {
      this.selectCostAggregationObj = value;
    },
    // hàm gán giá trị cho selectOrder
    // cretedBy NHHAi 15/2/2022
    selectValueOrder(value) {
      this.selectOrder = value;
    },
    // hàm gán giá trị cho selectPurchaseContract
    // cretedBy NHHAi 15/2/2022
    selectValuePurchaseContract(value) {
      this.selectPurchaseContract = value;
    },
    // hàm gán giá trị cho selectUnit
    // cretedBy NHHAi 15/2/2022
    selectValueUnit(value) {
      this.selectUnit = value;
    },
    // hàm gán giá trị cho selectContruction
    // cretedBy NHHAi 15/2/2022
    selectValueContruction(value) {
      this.selectContruction = value;
    },
    // hàm gán giá trị cho selectContractSale
    // cretedBy NHHAi 15/2/2022
    selectValueContractSale(value) {
      this.selectContractSale = value;
    },
    // hàm gán giá trị cho selectExpenseItem
    // cretedBy NHHAi 15/2/2022
    selectValueExpenseItem(value) {
      this.selectExpenseItem = value;
    },

    // hàm gán giá trị cho selectStatisticalCode
    // cretedBy NHHAi 15/2/2022
    selectValueStatisticalCode(value) {
      this.selectStatisticalCode = value;
    },
    /**
     * Hàm đóng dialog
     * createdBy NHHAi 15/12/2021
     */
    btnCloseOnClick() {
      // ẩn giá trị combobox
      (this.object = false),
        (this.costAggregationObj = false),
        (this.order = false),
        (this.purchaseContract = false),
        (this.unit = false),
        (this.contruction = false),
        (this.contractSale = false),
        (this.expenseItem = false),
        (this.statisticalCode = false),
        this.$emit("showDialog", false);
    },

    resizeOnclick() {
      this.resize = !this.resize;
      this.rotate = !this.rotate;
    },
    toggleFollow() {
      this.theFollow = !this.theFollow;
    },

    /**
     * Hàm cảnh báo dữ liệu khi số tài khoản trống
     * createdBy NHHAi 20/2/2022
     */
    blurAccountNumber() {
      //
      this.$v.account.accountNumber.$touch();
      //xét trường hợp nếu lỗi thì add title
      if (this.$v.account.accountNumber.$error) {
        this.messageEmptyAccountNumber = this.emptyAccountNumber;
      } else this.messageEmptyAccountNumber = "";
    },
    /**
     * Hàm cảnh báo dữ liệu khi tên tài khoản trống
     * createdBy NHHAi 20/2/2022
     */
    blurAccountName() {
      //
      this.$v.account.accountName.$touch();
      //xét trường hợp nếu lỗi thì add title
      if (this.$v.account.accountName.$error) {
        this.messageEmptyAccountName = this.emptyAccountName;
      } else this.messageEmptyAccountName = "";
    },

    /**
     * Hàm lưu dữ liệu
     * createdBy NHHAi 20/2/2022
     * @param value giá trị chọn nút
     */
    btnSaveOnClick(value) {
      var me = this;
      me.isDelete = null;
      me.isShowleft = false;
      // kiểm tra dữ liệu trống
      me.$v.$touch();
      // Trường hợp số tài khoản trống
      if (!me.account.accountNumber) {
        //focus vào ô mã nhân viên
        me.$refs.accountNumber.focus();
        //hiển thị popup
        this.isInfo = true;
        me.showPopupParent(true);
        me.textPopup = this.FormMode.AccountNumber_Not_Empty;
        return;
      }
      var check = me.selectAccount.text;
      //Trường hợp mã tài khoản không đúng định dạng
      if (me.account.parentId) {
        if (!me.account.accountNumber.startsWith(check, 0)) {
          //focus vào ô mã nhân viên
          me.$refs.accountNumber.focus();
          //hiển thị popup
          me.showPopupParent(true);
          me.textPopup = this.FormMode.AccountNumber_Not_Regex;
          return;
        }
      }

      // Trường hợp tên nhân viên trống
      if (!me.account.accountName) {
        //focus vào ô mã nhân viên
        me.$refs.accountName.focus();
        //hiển thị popup
        this.isInfo = true;
        me.showPopupParent(true);
        me.textPopup = this.FormMode.AccountName_Not_Empty;
        return;
      }

      // Trường hợp lựa chọn phòng ban trống hoặc sai phòng ban trống
      if (me.select.value == undefined || me.select.value == "") {
        this.isInfo = true;
        me.showPopupParent(true);
        me.textPopup = this.FormMode.Property_Exists;
        document
          .querySelector(
            ".property .v-autocomplete.v-input>.v-input__control>.v-input__slot"
          )
          .classList.add("input-warning");
        return;
      } else {
        document
          .querySelector(
            ".property .v-autocomplete.v-input>.v-input__control>.v-input__slot"
          )
          .classList.remove("input-warning");
      }
      // lấy dữ liệu
      me.$emit("saveAccount", { account: this.account, value: value });
      me.$v.$reset();
    },

    /**
     * hiển thịp popup
     * CreatedBy NHHai 20/22/2022
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
  },
};
</script>
<style scoped>
@import url("../../../../style/component/dialog.css");
@import url("../../../../style/common/common.css");
@import url("../../../../style/component/radio.css");
@import url("../../../../style/component/combobox.css");
@import url("../../../../style/component/comboboxMultiple.css");
@import url("../../../../style/component/tab.css");
@import url("../../../../style/component/textarea.css");
</style>
