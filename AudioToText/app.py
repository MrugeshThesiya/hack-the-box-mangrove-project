from flask import Flask, request, jsonify
import speech_recognition as sr

app = Flask(__name__)

@app.route("/upload", methods=["POST"])
def upload_audio():
    file = request.files["audio"]
    recognizer = sr.Recognizer()

    with sr.AudioFile(file) as source:
        audio = recognizer.record(source)

    try:
        text = recognizer.recognize_google(audio, language="hi-IN")
    except sr.UnknownValueError:
        text = "Could not understand audio"
    return jsonify({"transcribed_text": text})

if __name__ == "__main__":
    app.run(debug=True)
