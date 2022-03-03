export default class Payment {
    paymentId = "00000000-0000-0000-0000-000000000000";
    // khóa ngoại ( nhà cung cấp)  = "";
    supplierId = null;
    // đối tượng = "";
    supplierObject = "";
    // người nhận = "";
    supplierContactName = "";
    // địa chỉ = "";
    address = "";
    // lý do chi = "";
    journalMemo = "";
    // nhân viên = "";
    employeeId = null;
    // phiếu chi = "";
    paymentDate = new Date();
    // ngày hạch toán = "";
    accountingDate = new Date();
    // số phiếu chi = "";
    paymentNumber = "";
    // số chứng từ gốc = "";
    documentIncluded = "0";
    // tổng tiền = "";
    totalAmount = 0.0;
    // diễn giải
    description = "";

    typeDocument = "";

    accountMultiple = "";

    branch = "";
}