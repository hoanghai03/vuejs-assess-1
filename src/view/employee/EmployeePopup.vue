<template>
  <div id="popup" class="m-popup" :class="{ 'm-popup-show': isShow }">
    <div class="m-modal modal-popup"></div>
    <div class="popup">
      <div class="popup-content">
        <div>
          <div
            class="icon-warning m-icon m-icon-warning"
            :class="{ 'm-icon-info': isInfo, 'm-icon-ask': isAsk }"
          ></div>
          <div class="messenger-warning">{{ textPopup }}</div>
        </div>
        <div class="mess-line"></div>
      </div>
      <div class="popup-bottom">
        <div class="popup-bot-left">
          <button
            class="close-popup m-second-btn m-second-btn-hidden"
            @click="btnCloseOnClick"
            :class="{ 'm-button-left-show': isShowBtn }"
          >
            {{ textLeft }}
          </button>
        </div>
        <div class="popup-bot-right" v-if="isDelete == FormMode.Is_Delete_Y">
          <div>
            <button id="deleteEntity" class="m-btn" @click="btnDelEntity">
              Có
            </button>
          </div>
        </div>
        <div class="popup-bot-right" v-else-if="isDelete == FormMode.Is_Delete_N">
          <div>
            <div>
              <button class="m-second-btn" @click="saveData(false)">
                Không
              </button>
            </div>
            <div><button class="m-btn" @click="saveData(true)">Có</button></div>
          </div>
        </div>
        <div class="popup-bot-right" v-else-if="isAgree == true">
          <div>
            <button id="deleteEntity" class="m-btn" @click="btnCloseOnClick">
              Đồng ý
            </button>
          </div>
        </div>
        <div class="popup-bot-middle" v-else>
          <button class="m-btn" @click="btnCloseOnClick">Đóng</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import FormMode from "../../script/Enum.js";
export default {
  name: "employeePopup",
  props: [
    "isShow",
    "textPopup",
    "employeeId",
    "buttonPopupLeft",
    "buttonPopupRight",
    "isShowBtn",
    "isDelete",
    "isWarning",
    "isInfo",
    "textLeft",
    "isAsk",
    "isAgree",
    "isDelAll",
    "checkedId"
  ],
  data() {
    return {
      host : "http://localhost:5000/api/v1/Employees/",
      //Enum
      FormMode
    }
  },
  methods: {

    /**
     * Hàm lưu dữ liệu
     * @param value là giá trị cần lưu
     * createdBy NHHai 11/1/2021
     */
    saveData(value){
      this.btnCloseOnClick();
        this.$emit('saveData', value)
    },

    /**
     * Hàm đóng popup
     * @param value là giá trị cần lưu
     * createdBy NHHai 11/1/2021
     */
    btnCloseOnClick() {
      this.$emit("showPopup", false);
    },
    /**
     * Hàm xóa 1 hoặc nhiều bản ghi
     * createdBy NHHAi 10/1/2021
     */
    btnDelEntity() {
      var me = this;
      var api = "";
      // xét trường hợp nếu như muốn xóa nhiều bản ghi
      if(this.isDelAll){
        api =  axios.delete(this.host +`all`,{data: this.checkedId});
      }
      // Trường hợp xóa 1 bản ghi
      else api = axios.delete(this.host + `${this.employeeId}`);
      api.then(function () {
        // nếu thành công thì sẽ ẩn popup và load lại data
          me.btnCloseOnClick();
          // ẩn nút xóa
          me.$emit("loadData",FormMode.Page_Number_1);
        })
        .catch(function (res) {
          const statusCode = res.response.status;
          switch (statusCode) {
            // nếu mã lỗi 400 thì hiển thị cảnh thông báo lỗi
            case 400:
              var data = res.response.data.data;
              console.log(data);
              break;
            case 500:
              data = res.response.data.data;
              console.log(data);
              break;
            default:
              break;
          }
          // nếu lỗi sẽ ẩn popup
          me.btnCloseOnClick();
        });
    },
  },
};
</script>
<style scoped>
@import url("../../style/component/popup.css");
</style>