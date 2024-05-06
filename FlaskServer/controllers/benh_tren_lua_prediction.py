from keras.models import load_model
from controllers.preprocess import load_label
from controllers.prediction import prediction

model_path_mbv2 = './models/BenhTrenLua/MBV2/model.h5'
label_path_mbv2 = './models/BenhTrenLua/MBV2/labels.txt'

# model_path_restnet = './models/BenhTrenLua/REST50/model.h5'
# label_path_restnet = './models/BenhTrenLua/REST50/labels.txt'

# load model
mbv2_model = load_model(model_path_mbv2)
# rest_50_model = load_model(model_path_restnet)

# load label
mbv2_label = load_label(label_path_mbv2)
# rest_50_label = load_model(label_path_restnet)




def benh_tren_lua_prediction_result(image):
    mbv2_result = prediction(image, mbv2_model,mbv2_label)
    # rest_50_result = prediction(image,rest_50_model,rest_50_label)
    
    # result = {
    # #    'mbv2': mbv2_result,
    #     'rest_50': rest_50_result
    # }
    print(f'result benh tren lua: {mbv2_result}')
    return mbv2_result