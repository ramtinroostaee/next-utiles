import { toast } from "react-toastify";

export const DEFAULT_ERROR = () => toast.error(DEFAULT_ERROR_MESSAGE);
export const DEFAULT_ERROR_MESSAGE = "Sth. went wrong. Try again";

export const FIELD_REQUIRED = "این فیلد الزامی است";

export const USERNAME_REQUIRED = "نام کاربری الزامی است";
export const PASSWORD_REQUIRED = "رمز عبور الزامی است";
export const PASSWORD_CONFIRM = "رمزهای عبور باید مطابقت داشته باشند";
export const PASSWORD_MIN = "رمز عبور باید حداقل 4 کاراکتر باشد";
export const SURE_TO_DELETE = "آیا مطمئنید که میخواهید حذف کنید؟";
export const Success_Add_Order = "سفارش موردنظر با موفقیت ثبت شد";
export const Success_Add_Contract = "قرارداد موردنظر با موفقیت ثبت شد";
export const Success_Add_User = "کاربر موردنظر با موفقیت ثبت شد";
export const Success_Add_Good = "کالا موردنظر با موفقیت ثبت شد";
export const Success_Add_DraftOrder = "پیش نویس موردنظر با موفقیت ثبت شد";
export const Success_Add_Address = "آدرس موردنظر اضافه شد";
export const Success_Add_Visitor = "ویزیتور با موفقیت اضافه شد";
export const Success_Add_AdminMessage = "پیام موردنظر اضافه شد";
export const Success_Update_Address = "آدرس موردنظر ویرایش شد";
export const Success_Update_Visitor = "ویزیتور با موفقیت ویرایش شد";
export const Success_Update_Contract = "قرارداد موردنظر ویرایش شد";
export const Success_Update_User = "کاربر موردنظر ویرایش شد";
export const Success_Update_Order = "سفارش موردنظر ویرایش شد";
export const Success_Update_Good = "کالای موردنظر ویرایش شد";
export const Success_Add_BillApprove = "با موفقیت صادر شد";
export const Success_Update_AdminMessage = "پیام موردنظر ویرایش شد";
export const No_Data_Found = "هیچ اطلاعاتی موجود نیست";
export const INVALID_SHEBA = "شماره شبا نادرست است";
export const SMS_SENT = "پیامک برای شما ارسال شد";
