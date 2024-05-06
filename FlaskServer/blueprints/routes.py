from flask import Blueprint, request
from controllers.prediction import prediction
from flask import jsonify
from PIL import Image
from io import BytesIO
from controllers.preprocess import preprocess_image
# con trung hai lua prediciton func
from controllers.con_trung_hai_lua_prediction import con_trung_prediction_result
# benh tren lua prediction func
from controllers.benh_tren_lua_prediction import benh_tren_lua_prediction_result

routes_bp = Blueprint('routes',__name__)


@routes_bp.route('/')
def hello():
    return "<p>được rồi ba má ơi</p>"
   


# 1 rout danh cho benh tren lua

@routes_bp.route('/benhtrenlua', methods=['POST'])
def predict_benh_tren_lua():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # Đọc dữ liệu hình ảnh từ dữ liệu được gửi
    image_bytes = file.read()
    image = Image.open(BytesIO(image_bytes))

    pre_img = preprocess_image(image)
    # Thực hiện dự đoán
    result = benh_tren_lua_prediction_result(pre_img)

    return jsonify({'result': result}), 200

# 1 rou danh cho con trung hai lua
@routes_bp.route('/contrunghailua', methods=['POST'])
def predict_con_trung_hai_lua():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # Đọc dữ liệu hình ảnh từ dữ liệu được gửi
    image_bytes = file.read()
    image = Image.open(BytesIO(image_bytes))

    pre_img = preprocess_image(image)
    # Thực hiện dự đoán
    result = con_trung_prediction_result(pre_img)
    print(f'result ở đầu ra cuối cùng: {result}')

    return jsonify({'result': result}), 200