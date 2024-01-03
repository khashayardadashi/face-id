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
> To check if the webcam is available on the user's device using JavaScript, you can use the `navigator.mediaDevices.getUserMedia` API. Here's a basic example :

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

This code attempts to access the user's webcam and logs whether the access is granted or denied. Keep in mind that modern browsers may require a secure context (HTTPS) for accessing certain features like the webcam.

Make sure to handle the permissions and errors appropriately based on your application's requirements.

> [!IMPORTANT]
> Sure, to achieve that, you can use the Fetch API in JavaScript to send a POST request to your server's "register" route. Assuming you have a form with an input field for uploading an image, here's a basic example:

```javascript
// Assuming you have an HTML form with id="registrationForm" and input type="file" with id="profileImage"
const registrationForm = document.getElementById('registrationForm');
const profileImageInput = document.getElementById('profileImage');

registrationForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const formData = new FormData();
  formData.append('profileImage', profileImageInput.files[0]);

  // Replace 'your-register-route' with the actual route on your server
  fetch('your-register-route', {
    method: 'POST',
    body: formData,
  })
    .then(response => response.json())
    .then(data => {
      console.log('Image uploaded successfully:', data);
      // Handle the response as needed, e.g., redirect to login page
    })
    .catch(error => {
      console.error('Error uploading image:', error);
      // Handle errors appropriately
    });
});
```

On the server side (in your backend code), you need to handle the incoming POST request to the "register" route and save the uploaded image. The server-side implementation will depend on the technology you're using (Node.js, Python, etc.).

Remember to adjust the code according to your server's API and the framework you are using. Additionally, ensure that your server supports handling file uploads and saving them appropriately.

> [!IMPORTANT]
> The process you described involves a combination of front-end (JavaScript) and back-end (Flask with OpenCV and face_recognition). Here's a high-level overview:

1. **Front-End (JavaScript)** :

   ```javascript
   // Assume you have a form with id="loginForm" and input type="file" with id="webcamImage"
   const loginForm = document.getElementById('loginForm');
   const webcamImageInput = document.getElementById('webcamImage');

   loginForm.addEventListener('submit', function (event) {
     event.preventDefault();

     const formData = new FormData();
     formData.append('webcamImage', webcamImageInput.files[0]);

     // Replace 'your-login-route' with the actual route on your server
     fetch('your-login-route', {
       method: 'POST',
       body: formData,
     })
       .then(response => response.json())
       .then(data => {
         console.log('User identification result:', data);
         // Handle the response and redirect to the user panel if identification is successful
       })
       .catch(error => {
         console.error('Error identifying user:', error);
         // Handle errors appropriately
       });
   });
   ```

2. **Back-End (Flask with OpenCV and face_recognition)** :

   - Handle the POST request to the "login" route.
   - Retrieve the uploaded image and process it using OpenCV and face_recognition.
   - Send a JSON response based on the identification result.

   ```python
   from flask import Flask, request, jsonify
   import cv2
   import face_recognition

   app = Flask(__name__)

   @app.route('/your-login-route', methods=['POST'])
   def login():
       # Handle the uploaded image
       webcam_image = request.files['webcamImage']
       # Process the image using OpenCV and face_recognition
       # ...

       # Assuming you have identified the user
       identified_user = {
           'username': 'john_doe',
           'identification_status': True
       }

       return jsonify(identified_user)

   if __name__ == '__main__':
       app.run(debug=True)
   ```

This is a simplified example, and you need to adapt it to your specific needs, including error handling, user registration, and the actual implementation of face detection and recognition. Ensure your server is set up to handle file uploads and integrate the necessary libraries for image processing.

> [!IMPORTANT]
> Certainly, you can modify the Flask route to handle the case where face identification is unsuccessful and send a JSON response with the status set to `false`. Additionally, you can include logic on the front end to refresh the page upon receiving this response. Here's an updated example:

**Front-End (JavaScript)** :

```javascript
const loginForm = document.getElementById('loginForm');
const webcamImageInput = document.getElementById('webcamImage');

loginForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const formData = new FormData();
  formData.append('webcamImage', webcamImageInput.files[0]);

  // Replace 'your-login-route' with the actual route on your server
  fetch('your-login-route', {
    method: 'POST',
    body: formData,
  })
    .then(response => response.json())
    .then(data => {
      console.log('User identification result:', data);
      if (data.identification_status) {
        // User identified, redirect to user panel
        window.location.href = 'user-panel.html';
      } else {
        // User not identified, refresh the page
        location.reload();
      }
    })
    .catch(error => {
      console.error('Error identifying user:', error);
      // Handle errors appropriately
    });
});
```

**Back-End (Flask with OpenCV and face_recognition)** :

```python
from flask import Flask, request, jsonify
import cv2
import face_recognition

app = Flask(__name__)

@app.route('/your-login-route', methods=['POST'])
def login():
    # Handle the uploaded image
    webcam_image = request.files['webcamImage']
    
    # Assuming you have identified the user
    identified_user = {
        'username': 'john_doe',
        'identification_status': True
    }

    # Modify this block based on your identification logic
    if identified_user['identification_status']:
        return jsonify(identified_user)
    else:
        identification_failure = {
            'identification_status': False
        }
        return jsonify(identification_failure)

if __name__ == '__main__':
    app.run(debug=True)
```
This way, if the identification status is `false`, the page will be refreshed. Adjust the logic in the Flask route based on your specific face detection and recognition implementation.
