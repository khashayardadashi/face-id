# Face Recognition Authentication

  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=js,py,cpp,flask,cmake,git" />
  </a>

### Introduction
> [!NOTE]
> This project aims to provide a secure and seamless identity verification process using facial recognition technology.
### Installation and Setup
``` bash
pip install flask
```
``` bash
pip install dlib
```
```bash
pip install cmake
```
```bash
pip install face_recognition
```
```bash
git clone https://github.com/khashayardadashi/face-id.git
```

> [!NOTE]
> we have to install C++ in your computer to use face_recognition library

### Face Recognition Algorithm
> [!TIP]
> This project is written using haarcascades artificial intelligence algorithm

### Developed tools
> [!NOTE]
> This program is written using Python's Flask framework, along with the OpenCV library and the Haar Cascade artificial intelligence algorithm.

### Versions

| Year | Version | Highlights                                                                  |
| ---- | ------- | --------------------------------------------------------------------------- |
| 2023 | 1.1.0   | Initial release with basic face recognition                                 |
| 2024 | 1.5.0   | UI improvements and design updates                                          |
| 2025 | 2.1.0   | Integrated DeepFace with liveness detection and advanced facial recognition (soon) |



### 🧠 مفهوم کلی : بردار عددی چهره چیه ؟

زمانی که یک عکس چهره وارد برنامه می‌شه، کتابخانه‌ی `face_recognition` اون عکس رو تجزیه می‌کنه و **چهره‌ی انسان رو به یک بردار عددی تبدیل می‌کنه**.
این بردار عددی یک لیست (یا آرایه) شامل حدود ۱۲۸ عدد هست که خصوصیات چهره فرد رو به صورت عددی بیان می‌کنه. این اعداد طوری هستن که اگر دو چهره شبیه هم باشن، بردارهاشون هم شبیه‌ان.

---

### 🔍 مرحله به مرحله روند استفاده از بردارها:

#### ✅ در زمان **ثبت‌نام**:

1. عکس کاربر دریافت و ذخیره می‌شه.
2. فعلاً فقط مسیر عکس نگهداری می‌شه، ولی می‌تونیم همون لحظه از عکس **بردار چهره** بسازیم و ذخیره کنیم (الان در این کد انجام نشده).

---

#### ✅ در زمان **ورود (Login)**:

1. کاربر عکسی آپلود می‌کنه.

2. با `face_recognition.face_encodings()`، از عکس بردار چهره ساخته می‌شه:

   ```python
   login_face_encoding = face_recognition.face_encodings(login_image)[0]
   ```

3. برای هر کاربر ثبت‌شده، عکسش بارگذاری و بردار چهره ساخته می‌شه:

   ```python
   registered_face_encoding = face_recognition.face_encodings(registered_image)
   ```

4. حالا بردار ورود کاربر با بردار هر کاربر ذخیره‌شده **مقایسه** می‌شه:

   ```python
   matches = face_recognition.compare_faces([reg_encoding], login_face_encoding)
   ```

   این تابع بررسی می‌کنه که آیا فاصله‌ی بین دو بردار (یعنی تفاوت چهره‌ها) از یک حد مشخص کمتر هست یا نه. اگر کمتر باشه، یعنی چهره تطبیق داره.

---

### 📏 پشت صحنه چیه؟

* در واقع، این بردار ۱۲۸ عددی نوعی **اثر انگشت دیجیتالی از چهره** است.
* الگوریتم پشت این کار معمولا CNN (شبکه عصبی کانولوشنی) است که روی دیتاست‌هایی مثل Labeled Faces in the Wild یا FaceNet آموزش دیده.
* تابع `compare_faces` معمولاً از فاصله‌ی **Euclidean Distance** بین بردارها برای تصمیم‌گیری استفاده می‌کنه.

---

### ✅ چرا این روش مؤثره؟

* چون به جای بررسی پیکسل‌به‌پیکسل، ویژگی‌های واقعی چهره (مثل فاصله بین چشم‌ها، شکل فک، فرم بینی و ...) به عدد تبدیل شده‌.
* مقایسه‌ی بردارها سریع‌تر و دقیق‌تر از بررسی تصاویر خامه.


