export default class Payment {
    paymentId = "";
    // khóa ngoại ( nhà cung cấp)  = "";
    supplierId = "";
    // đối tượng = "";
    supplierObject = "";
    // người nhận = "";
    supplierContactName = "";
    // địa chỉ = "";
    address = "";
    // lý do chi = "";
    journalMemo = "";
    // nhân viên = "";
    employeeId = "";
    // ngày hạch toán = "";
    accountingDate = new Date();
    // phiếu chi = "";
    paymentDate = new Date();
    // số phiếu chi = "";
    paymentNumber = "";
    // số chứng từ gốc = "";
    documentIncluded = "";
    // tổng tiền = "";
    totalAmount = 0.0;
    // diễn giải
    description = "";

    typeDocument = "";

    accountMultiple = "";

    branch = "";
}