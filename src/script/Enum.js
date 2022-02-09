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
    EmployeeCode_Not_Empty: "Mã nhân viên không được phép để trống",
    FullName_Not_Empty: "Tên nhân viên không được phép để trống",
    Email_Error: "Email lỗi ! hãy nhập lại",
    Delete_Employee_Checked: "Bạn có thực sự muốn xóa những nhân viên đã chọn không?",
    EmployeeCode_Duplicate: "Mã nhân viên đã bị trùng",
    EmployeeCode_Not_Regex: "Mã nhân viên không đúng định dạng",
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
    Status_500: "Lỗi kết nối đến server"
});

export default FormMode;