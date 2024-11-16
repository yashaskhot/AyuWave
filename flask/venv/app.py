from flask import Flask, request, jsonify
from flask_cors import CORS
import report
app = Flask(__name__)

CORS(app)

@app.route('/api/Scan-userdata', methods=['POST'])
def Scan_userdata():
    try:
        # image_data = request.data
        image = request.files['image']
        image.save('./image.jpg')
        result = report.extract_text_from_image('./image.jpg')
        print(result.data)
        return result
        # return jsonify({'result': result})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

@app.route('/api/Scan-repo', methods=['POST'])
def Scan_report():
    # print("hi")
    # print(request)
    try:
    
        # image_data = request.data
        image = request.files['image']
        image.save('./image.jpg')
        result = report.extract_text_from_image('./image.jpg')
        print(result.data)
        return result
        # return jsonify({'result': result})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

if __name__ == '__main__':
    app.run(debug=True)