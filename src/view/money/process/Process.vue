<template>
  <div class="process">
    <div class="left-process">
      <div class="header-left-process">Nghiệp vụ tiền mặt</div>
      <div class="content-left-process">
        <div class="mi-h-340 mi-process-cash">
          <div
            class="face-button face-btn-pos-1"
            @mousemove="overReceive($event)"
          >
            Thu tiền
          </div>
          <div class="face-button face-btn-pos-2" @mousemove="overPayment($event)">Chi tiền</div>
          <div class="face-button face-btn-pos-3" @mousemove="overAudit($event)">Kiểm kê quỹ</div>
        </div>
      </div>
      <div class="footer-left-process">
        <div class="dictionary-item">
          <router-link class="dictionary-content" to="/supplier">
            <div class="m-icon mi-24 mi-process-customer"></div>
            <div class="dictionary-text">Nhà cung cấp</div>
          </router-link>
          <router-link class="dictionary-content" to="/account">
            <div class="m-icon mi-24 mi-calculate"></div>
            <div class="dictionary-text">Hệ thống tài khoản</div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="right-process">
      <div class="header-right-process">Báo cáo</div>
      <div class="content-right-process">
        <ul>
          <li class="li-process">S03a1-DN: Sổ nhật ký thu tiền</li>
          <li class="li-process">Bảng kê số dư tiền theo ngày</li>
          <li class="li-process">Sổ kế toán chi tiết quỹ tiền mặt</li>
          <li class="li-process">Dòng tiền</li>
          <li class="li-process">S03a2-DN: Sổ nhật ký chi tiền</li>
        </ul>
      </div>
      <div class="footer-right-process">Tất cả báo cáo</div>
    </div>
    <div
      id="entityTooltipReceive"
      class="multiple-process"
      ref="receive"
      :class="{ none: receive }"
      @mouseleave="outReceive($event)"
    >
      <div class="multiple">Phiếu thu</div>
      <div class="multiple">Thu tiền theo hóa đơn</div>
      <div class="multiple">Thu tiền theo hóa đơn nhiều khách hàng</div>
    </div>
    <div
      id="entityTooltipPayment"
      class="multiple-process"
      ref="payment"
      :class="{ none: payment }"
      @mouseleave="outPayment($event)"
    >
      <div class="multiple">Phiếu Chi</div>
      <div class="multiple">Trả tiền theo hóa đơn</div>
      <div class="multiple">Nộp thuế</div>
    </div>
    <div
      id="entityTooltipAudit"
      ref="audit"
      class="multiple-process"
      :class="{ none: audit }"
      @mouseleave="outAudit($event)"
    >
      <div class="multiple">Kiểm kê</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "process",
  data() {
    return {
      receive: true,
      payment: true,
      audit: true,
    };
  },
  methods: {
    hideMenu(){
      this.receive = true;
      this.payment = true;
      this.audit = true;
    },
    /**
     * Hàm Hiển thị menu của thu tiền
     * createdBy NHHAi 12/2/2021
     */
    overReceive(sender) {
      // lấy vị trí đối tượng
      var rect = this.takePosition(sender)
      var top = rect.top + 80;
      var left = rect.left;
      // xét vị trí của menu
      this.$refs.receive.style.top = `${top}px`;
      this.$refs.receive.style.left = `${left}px`;
      // hiển thị
      this.receive = false;
    },
    /**
     * Hàm Hiển thị menu của chi tiền
     * createdBy NHHAi 12/2/2021
     */
    overPayment(sender) {
      // lấy vị trí đối tượng
      var rect = this.takePosition(sender)
      var top = rect.top + 80;
      var left = rect.left;
      // xét vị trí của menu
      this.$refs.payment.style.top = `${top}px`;
      this.$refs.payment.style.left = `${left}px`;
      // hiển thị
      this.payment = false;
    },
    /**
     * Hàm Hiển thị menu của kiểm kê
     * createdBy NHHAi 12/2/2021
     */
    overAudit(sender) {
      // lấy vị trí đối tượng
      var rect = this.takePosition(sender)
      var top = rect.top + 80;
      var left = rect.left;
      // xét vị trí của menu
      this.$refs.audit.style.top = `${top}px`;
      this.$refs.audit.style.left = `${left}px`;
      // hiển thị
      this.audit = false;
    },

    /**
     * Hàm ẩn menu của thu tiền
     * createdBy NHHAi 12/2/2021
     */
    outReceive() {
      this.receive = true;
    },
    /**
     * Hàm ẩn menu của chi tiền
     * createdBy NHHAi 12/2/2021
     */
    outPayment() {
      this.payment = true;
    },
    /**
     * Hàm ẩn menu kiểm kê
     * createdBy NHHAi 12/2/2021
     */
    outAudit() {
      this.audit = true;
    },
    /**
     * Hàm lấy vị trí đối tượng
     * createdBy NHHAi 12/2/2022
     */
    takePosition(sender){
      // ẩn tất cả menu
      this.hideMenu();
      return sender.currentTarget.getBoundingClientRect();
    }
  },
};
</script>
<style scoped>
@import url("../../../style/layout/process.css");
@import url("../../../style/common/common.css");
</style>