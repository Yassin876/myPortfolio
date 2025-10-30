# تعليمات الإعداد والتشغيل

## الخطوات المطلوبة:

### 1. تثبيت MongoDB

#### أ) للويندوز:
- قم بتحميل MongoDB Community Server من [mongodb.com](https://www.mongodb.com/try/download/community)
- قم بتثبيته
- تأكد من أن MongoDB يعمل كخدمة في Windows

#### ب) بدلاً من ذلك يمكن استخدام MongoDB Atlas (سحابة):
- اذهب إلى [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- أنشئ حساب مجاني
- أنشئ Cluster جديد
- احصل على connection string
- ضعها في ملف `.env` في مجلد backend

### 2. تثبيت dependencies للـ Backend

افتح terminal في مجلد المشروع واكتب:

```bash
cd backend
npm install
```

### 3. تشغيل Backend Server

```bash
cd backend
npm start
```

سيعمل السيرفر على http://localhost:5000

### 4. تثبيت dependencies للـ Frontend

في terminal جديد:

```bash
cd my-app
npm install
```

### 5. تشغيل React App

```bash
cd my-app
npm start
```

سيعمل التطبيق على http://localhost:3000

## استخدام التطبيق:

### تسجيل الدخول كـ Admin:
1. اضغط على زر "🔑 Login Admin"
2. أدخل التوكن: `your-admin-secret-token`
3. الآن ستظهر لك زر "Add Project"

### إضافة مشروع جديد:
1. اضغط على "Add Project"
2. املأ البيانات:
   - عنوان المشروع
   - الوصف
   - رابط GitHub
3. اضغط "Add Project"

### حذف مشروع:
- كـ admin، يمكنك الضغط على زر "Delete" في أي مشروع لحذفه

## ملاحظات مهمة:

1. **Admin Token**: حالياً التوكن هو `your-admin-secret-token` - يمكنك تغييره في ملف `backend/server.js`
2. **MongoDB Connection**: إذا كنت تستخدم MongoDB Atlas، احرص على تحديث الـ connection string في ملف `backend/server.js`
3. **CORS**: تم تفعيل CORS للسماح للـ Frontend بالتواصل مع Backend

## التطوير المستقبلي:

للتحسينات المستقبلية، يمكنك:
- إضافة نظام تسجيل دخول حقيقي بـ JWT
- إضافة إمكانية رفع الصور للمشاريع
- إضافة بحث وتصفية للمشاريع
- إضافة pagination
- إضافة إمكانية تعديل المشاريع
