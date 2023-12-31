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
pip install face_recognition
```
```bash
git clone https://github.com/khashayardadashi/face-id.git
```
### Face Recognition Algorithm
> [!TIP]
> This project is written using haarcascades artificial intelligence algorithm

### Developed tools
> [!NOTE]
> This program is written using Python's Flask framework, along with the OpenCV library and the Haar Cascade artificial intelligence algorithm.

### how to use?
> [!IMPORTANT]
> To use, you need to place the following JavaScript code in your static JavaScript file.
Certainly, you can create a Flask file and define the routes for login and register as follows:

```python
from flask import Flask, request

app = Flask(__name__)

@app.route('/login', methods=['POST'])
def login():
    # Your login logic here
    return 'Login route accessed via POST method'

@app.route('/register', methods=['POST'])
def register():
    # Your registration logic here
    return 'Register route accessed via POST method'

if __name__ == '__main__':
    app.run(debug=True)
```
> [!IMPORTANT]
> To check if the webcam is available on the user's device using JavaScript, you can use the `navigator.mediaDevices.getUserMedia` API.
> This code attempts to access the user's webcam and logs whether the access is granted or denied. Keep in mind that modern browsers may require a secure context (HTTPS) for accessing certain features like the webcam.

```javascript
// Check if the browser supports the mediaDevices API
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  // Access the user's media devices (e.g., webcam)
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
      console.log('Webcam access granted');
      // Do something with the webcam stream if needed
    })
    .catch(function (error) {
      console.error('Webcam access denied or not available', error);
      // Handle errors or inform the user
    });
} else {
  console.error('getUserMedia not supported on this browser');
  // Inform the user that their browser doesn't support webcam access
}
```

> [!WARNING]
> If you encounter issues installing dlib on the Windows operating system, first install Visual Studio and download C++ from the Downloads section. Alternatively, you can install the C++ extension and CMake in Visual Studio Code.
### result of project
