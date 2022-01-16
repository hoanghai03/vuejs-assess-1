class Employee {
    employeeId = null;
    employeeCode = null;
    firstName = null;
    lastName = null;
    fullName = "";
    address = "";
    email = "";
    identifyNumber = "";
    dateOfBirth = null;
    identifyDate = null;
    identifyPlace = "";
    joinDate = null;
    martialStatus = null;
    educationalBackground = null;
    departmentId = "";
    departmentName = "";
    workStatus = null;
    personalTaxCode = null;
    salary = null;
    gender = null;
    genderName = "";
    phoneNumber = null;
    telephoneNumber = null;
    bankAccountNumber = null;
    bankName = null;
    bankBranchName = null;
    positionName = null;
    errorMsgs = [];
    createdDate = null;
    createdBy = null;
    modifiedDate = null;
    modifiedBy = null;
    constructor(
        employeeId,
        employeeCode,
        firstName,
        lastName,
        fullNaame,
        address,
        email,
        identifyNumber,
        dateOfBirth,
        identifyDate,
        identifyPlace,
        joinDate,
        martialStatus,
        educationalBackground,
        department,
        departmentName,
        workStatus,
        personalTaxCode,
        salary,
        gender,
        genderName,
        phoneNumber,
        telephoneNumber,
        bankAccountNumber,
        bankName,
        bankBranchName,
        positionName,
        errorMsg,
        createdDate,
        createdBy,
        modifiedDate,
        modifiedBy,
    ) {
        this.employeeId = employeeId,
            this.employeeCode = employeeCode,
            this.firstName = firstName,
            this.lastName = lastName,
            this.fullNaame = fullNaame,
            this.address = address,
            this.email = email,
            this.identifyNumber = identifyNumber,
            this.dateOfBirth = dateOfBirth,
            this.identifyDate = identifyDate,
            this.identifyPlace = identifyPlace,
            this.joinDate = joinDate,
            this.martialStatus = martialStatus,
            this.educationalBackground = educationalBackground,
            this.department = department,
            this.departmentName = departmentName,
            this.workStatus = workStatus,
            this.personalTaxCode = personalTaxCode,
            this.salary = salary,
            this.gender = gender,
            this.genderName = genderName,
            this.phoneNumber = phoneNumber,
            this.telephoneNumber = telephoneNumber,
            this.bankAccountNumber = bankAccountNumber,
            this.bankName = bankName,
            this.bankBranchName = bankBranchName,
            this.positionName = positionName,
            this.errorMsg = errorMsg,
            this.createdDate = createdDate,
            this.createdBy = createdBy,
            this.modifiedDate = modifiedDate,
            this.modifiedBy = modifiedBy
    }

}

export default Employee;