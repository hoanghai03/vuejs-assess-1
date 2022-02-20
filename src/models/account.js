export default class Account {
    // khóa chính
    accountId = "";
    // số tài khoản
    accountNumber = "";
    // tên tài khoản
    accountName = "";
    // tên tiếng anh
    accountNameEnglish = "";
    // Tính chất (1-Dư nợ, 2-Dư có ,3- Lưỡng tính,4- không có số dư)
    accountCategoryKind = 1;
    accountCategoryKindName = "Dư nợ";
    // diễn giải
    description = "";
    // Có hoạch toán ngoại tệ (0-sai,1-đúng)
    foreignCurrencyAccount = false;
    //Đối tượng (1- nhà cung cấp,2-khách hàng,3-nhân viên)
    // detailByObjectKind = null;
    detailByObjectKindName = "";
    //Theo dõi chi tiết theo Đối tượng THCP( 0- Chỉ cảnh báo; 1- Bắt buộc nhập)
    // detailByCostAggregationObjKind = "";
    detailByCostAggregationObjKindName = "";
    //Theo dõi chi tiết theo Đơn đặt hàng (0 - Chỉ cảnh báo; 1- Bắt buộc nhấp)
    // detailByOrderKind = "";
    detailByOrderKindName = "";
    //Theo dõi chi tiết theo Hợp đồng mua (0 - Chỉ cảnh báo; 1- Bắt buộc nhấp)
    // detailByPurchaseContractKind = "";
    detailByPurchaseContractKindName = "";
    //Theo dõi chi tiết theo Đơn vị (0 - Chỉ cảnh báo; 1- Bắt buộc nhấp)
    // detailByUnitKind = "";
    detailByUnitKindName = "";
    //Theo dõi chi tiết theo Công trình (0 - Chỉ cảnh báo; 1- Bắt buộc nhấp)
    // detailByContructionKind = "";
    detailByContructionKindName = "";
    //Theo dõi chi tiết theo Hợp đồng bán (0 - Chỉ cảnh báo; 1- Bắt buộc nhấp)
    // detailByContractSaleKind = "";
    detailByContractSaleKindName = "";
    //Theo dõi chi tiết theo Khoản mục chi phí (0 - Chỉ cảnh báo; 1- Bắt buộc nhấp)
    // detailByExpenseItemKind = "";
    detailByExpenseItemKindName = "";
    //Theo dõi chi tiết theo Mã thống kê(0 - Chỉ cảnh báo; 1- Bắt buộc nhấp)
    // detailByStatisticalCodeKind = "";
    detailByStatisticalCodeKindName = "";
    //Theo dõi chi tiết theo Đối tượng(0 - Không theo dõi; 1- Theo dõi)
    detailByObject = false;
    //Theo dõi chi tiết theo Đối tượng THCP (0 - Không theo dõi; 1- Theo dõi)
    detailByCostAggregationObj = false;
    //Theo dõi chi tiết theo Đơn đặt hàng (0 - Không theo dõi; 1- Theo dõi)
    detailByOrder = false;
    //Theo dõi chi tiết theo Hợp đồng mua(0 - Không theo dõi; 1- Theo dõi)
    detailByPurchaseContract = false;
    //Theo dõi chi tiết theo Đơn vị(0 - Không theo dõi; 1- Theo dõi)
    detailByUnit = false;
    //Theo dõi chi tiết theo Công trình(0 - Không theo dõi; 1- Theo dõi)
    detailByContruction = false;
    //Theo dõi chi tiết theo Hợp đồng bán(0 - Không theo dõi; 1- Theo dõi)
    detailByContractSale = false;
    //Theo dõi chi tiết theo Khoản mục chi phí(0 - Không theo dõi; 1- Theo dõi)
    detailByExpenseItem = false;
    //Theo dõi chi tiết theo Mã thống kê(0 - Không theo dõi; 1- Theo dõi)
    detailByStatisticalCode = false;
    detailByAccount = false;

    // id của cha
    parentId = "";
    // tên của tài khoản tổng hợp
    parentName = "";
    // child index
    childIndex = 0
}