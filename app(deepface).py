import os
import cv2
from flask import Flask, render_template, request, jsonify, Response
from deepface import DeepFace
import numpy as np

app = Flask(__name__)
UPLOAD_FOLDER = os.path.join(os.getcwd(), 'static', 'uploads')
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

registered_data = {}  # name: filepath

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/register', methods=['POST'])
def register():
    name = request.form.get('name')
    photo = request.files['photo']

    filepath = os.path.join(UPLOAD_FOLDER, f'{name}.jpg')
    photo.save(filepath)
    registered_data[name] = filepath

    return jsonify({"success": True})

@app.route('/login', methods=['POST'])
def login():
    try:
        photo = request.files['photo']
        login_filepath = os.path.join(UPLOAD_FOLDER, 'login.jpg')
        photo.save(login_filepath)

        for name, reg_path in registered_data.items():
            try:
                result = DeepFace.verify(img1_path=login_filepath, img2_path=reg_path, enforce_detection=False)
                if result['verified']:
                    return jsonify({"success": True, "name": name})
            except Exception as e:
                continue

        return jsonify({"success": False, "error": "چهره شناسایی نشد"})

    except Exception as e:
        return jsonify({"success": False, "error": str(e)})

@app.route('/live')
def live():
    return render_template('live.html')

def gen():
    camera = cv2.VideoCapture(0)
    while True:
        success, frame = camera.read()
        if not success:
            break

        for name, reg_path in registered_data.items():
            try:
                result = DeepFace.verify(frame, reg_path, enforce_detection=False)
                if result['verified']:
                    cv2.putText(frame, f"{name} detected", (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
                    break
            except:
                continue

        ret, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(gen(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(debug=True)
