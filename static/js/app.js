// فعال‌سازی دوربین و اتصال به تگ ویدیو
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const nameInput = document.getElementById('name');

navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(err => {
        console.log(`خطا در دسترسی به دوربین: ${err}`);
        alert('امکان دسترسی به دوربین وجود ندارد');
    });

// گرفتن تصویر از ویدیو و نمایش در canvas
const capture = () => {
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.style.display = "block";
    video.style.display = "none";
}

// ثبت‌نام کاربر با ارسال عکس و نام
const register = () => {
    const name = nameInput.value;
    const photo = dataURItoBlob(canvas.toDataURL());
    if (!name || !photo) {
        alert('نام و عکس الزامی است');
        return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("photo", photo, `${name}.jpg`);

    fetch("/register", {
        method: "POST",
        body: formData,
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('ثبت‌نام با موفقیت انجام شد');
                setTimeout(() => window.location.href = "/", 2000);
            } else {
                alert("متاسفانه ثبت‌نام انجام نشد");
            }
        })
        .catch(err => {
            console.log(`خطا در ثبت‌نام: ${err}`);
        });
}

// ورود کاربر با عکس
const login = () => {
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const photo = dataURItoBlob(canvas.toDataURL());

    if (!photo) {
        alert('عکس الزامی است');
        return;
    }

    const formData = new FormData();
    formData.append("photo", photo, "login.jpg");

    fetch("/login", {
        method: "POST",
        body: formData,
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.success) {
                alert("ورود موفقیت‌آمیز بود");
                setTimeout(() => window.location.href = `/panel?username=${data.name}`, 2000);
            } else {
                alert("چهره شناسایی نشد");
            }
        })
        .catch(err => {
            console.log("خطا در ورود", err);
        });
}

// تبدیل داده‌ی تصویری به Blob جهت ارسال به سرور
const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
};
