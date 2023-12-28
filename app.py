import os
import datetime
import cv2
from flask import Flask , render_template , request , jsonify , url_for
import face_recognition
app=Flask(__name__)

registered_data={}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/register' , methods=['POST'])
def register():
    name=request.form.get('name')
    photo=request.files['photo']
    uploads_folder=os.path.join(os.getcwd(),'static','uploads')

    if not os.path.exists(uploads_folder):
        os.makedirs(uploads_folder)
    
    photo.save(os.path.join(uploads_folder,f'{datetime.date.today()}_{name}.jpg'))
    registered_data[name]=f'{datetime.date.today()}_{name}.jpg'

    return jsonify({"success":True})

@app.route('/login', methods=['POST'])
def login():
    try:
        # Get the uploaded photo from the request
        photo = request.files['photo']

        # Define the uploads folder and create it if it doesn't exist
        uploads_folder = os.path.join(os.getcwd(), 'static', 'uploads')
        if not os.path.exists(uploads_folder):
            os.makedirs(uploads_folder)

        # Save the uploaded photo to a file
        login_filename = os.path.join(uploads_folder, 'login_face.jpg')
        photo.save(login_filename)

        # Read the saved image
        login_image = cv2.imread(login_filename)
        print("Login filename:", login_filename)

        # Check if the image is loaded successfully
        if login_image is None:
            return jsonify({'success': False, 'error': 'Failed to load the image'})

        # Convert the image to grayscale
        gray_image = cv2.cvtColor(login_image, cv2.COLOR_BGR2GRAY)

        # Load the Haar Cascade classifier for face detection
        face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')

        # Detect faces in the grayscale image
        faces = face_cascade.detectMultiScale(gray_image, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

        # Check if no faces are detected
        if len(faces) == 0:
            return jsonify({'success': False, 'error': 'No faces detected'})

        # Load the face encodings of the login image
        login_face_encoding = face_recognition.face_encodings(login_image)

        # Iterate through registered users and compare face encodings
        for name, filename in registered_data.items():
            registered_image = face_recognition.load_image_file(os.path.join(uploads_folder, filename))
            registered_face_encoding = face_recognition.face_encodings(registered_image)

            for reg_encoding in registered_face_encoding:
        # Compare face encodings
                matches = face_recognition.compare_faces([reg_encoding], login_face_encoding[0])
                if any(matches):
                     return jsonify({'success': True, 'name': name})

        # If no matches are found
        return jsonify({'success': False, 'error': 'Face not recognized'})


    except Exception as e:
        # Handle any exceptions and return an error response
        return jsonify({'success': False, 'error': str(e)})


@app.route('/panel')
def panel():
    username=request.args.get('username')
    return render_template('panel.html' , username=username)
if __name__=='__main__':
    app.run(debug=True)