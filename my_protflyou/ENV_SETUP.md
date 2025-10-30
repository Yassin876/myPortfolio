# إعداد متغيرات البيئة

## في مجلد backend، أنشئ ملف `.env` وأضف التالي:

```
MONGODB_URI=mongodb://localhost:27017/projects
PORT=5000
ADMIN_TOKEN=your-admin-secret-token
```

## أو استخدم MongoDB Atlas:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/projects
PORT=5000
ADMIN_TOKEN=your-admin-secret-token
```

**ملاحظة**: استبدل `username` و `password` و `cluster` بقيم MongoDB Atlas الخاصة بك.
