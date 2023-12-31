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

In this example, the `login` and `register` routes are configured to only accept POST requests. Adjust the logic within each route according to your application's requirements.
### result of project
