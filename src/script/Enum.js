const FormMode = Object.freeze({
    // giới tính nam
    Male: "1",
    // Cất
    Save: 1,
    //Cất và thêm
    SaveAndAdd: 2,
    // xét trường hợp xóa nhiều và xóa 1 bản ghi
    Delete: 1,
    DeleteAll: 2,
    // số bản ghi trên 1 trang
    Page_Size_10: 10,
    Page_Size_20: 20,
    Page_Size_30: 30,
    Page_Size_50: 50,
    Page_Size_100: 100,
    // pagenumber
    Page_Number_1: 1,
    // text popup
    Data_Changed: "Dữ liệu đã bị thay đổi.Bạn có muốn cất không?",
    Department_Exists: "Tên phòng ban không tồn tại!",
    Property_Exists: "Tên tính chất không tồn tại!",
    EmployeeCode_Not_Empty: "Mã nhân viên không được phép để trống",
    AccountNumber_Not_Empty: "Số tài khoản không được phép để trống",
    SupplierCode_Not_Empty: "Mã nhà cung cấp không được phép để trống",
    FullName_Not_Empty: "Tên nhân viên không được phép để trống",
    AccountName_Not_Empty: "Tên tài khoản không được phép để trống",
    SupplierName_Not_Empty: "Tên nhà cung cấp không được phép để trống",
    Email_Error: "Email lỗi ! hãy nhập lại",
    Delete_Employee_Checked: "Bạn có thực sự muốn xóa những nhân viên đã chọn không?",
    Delete_Suppliers_Checked: "Bạn có thực sự muốn xóa những nhà cung cấp đã chọn không?",
    EmployeeCode_Duplicate: "Mã nhân viên đã bị trùng",
    EmployeeCode_Not_Regex: "Mã nhân viên không đúng định dạng",
    AccountNumber_Not_Regex: "Số tài khoản không hợp lệ. Số tài khoản chi tiết phải bắt đầu bằng Số tài khoản tổng hợp",
    SupplierCode_Not_Regex: "Mã nhà cung cấp không đúng định dạng",
    Invalid_Date: "Ngày tháng không hợp lệ",
    No_Data: "Dữ liệu không còn tồn tại trong hệ thống",
    //text button popup
    Text_Left: "Không",
    Text_Left_Exit: "Hủy",
    //is delete : 
    Is_Delete_Y: "delete",
    Is_Delete_N: "noDelete",
    //z-index
    Zindex: 2000,
    // time toast messenge
    Time: 3000,
    // lỗi chưa kết nối với server
    Status_500: "Lỗi kết nối đến server",
    // danh xưng
    prefix: [{
            text: "Ông",
            value: 1,
        },
        {
            text: "Bà",
            value: 2,
        },
        {
            text: "Bạn",
            value: 3,
        },
        {
            text: "Chị",
            value: 4,
        },
        {
            text: "Mr",
            value: 5,
        },
        {
            text: "Mrs",
            value: 6,
        },
        {
            text: "Ms",
            value: 7,
        },
        {
            text: "Anh",
            value: 8,
        },
        {
            text: "Chú",
            value: 9,
        },
    ],

    // tính chất
    property: [{
            text: "Dư nợ",
            value: 1,
        },
        {
            text: "Dư có",
            value: 2,
        },
        {
            text: "Lưỡng tính",
            value: 3,
        },
        {
            text: "Không có số dư",
            value: 4,
        },
    ],
    // đối tượng
    object: [{
            text: "Nhà cung cấp",
            value: 1,
        },
        {
            text: "Khách hàng",
            value: 2,
        },
        {
            text: "Nhân viên",
            value: 3,
        },
    ],
    follow: [{
            text: "Chỉ cảnh báo",
            value: 1
        },
        {
            text: "Bắt buộc nhập",
            value: 2
        }
    ]


});

export default FormMode;