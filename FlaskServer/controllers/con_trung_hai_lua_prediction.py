from keras.models import load_model
from controllers.preprocess import load_label
from controllers.prediction import prediction

model_path_mbv2 = './models/ConTrungHaiLua/MBV2/model.h5'
label_path_mbv2 = './models/ConTrungHaiLua/MBV2/labels.txt'

# model_path_restnet = './models/ConTrungHaiLua/REST50/model.h5'
# label_path_restnet = './models/ConTrungHaiLua/REST50/labels.txt'

# load model
mbv2_model = load_model(model_path_mbv2)
# rest_50_model = load_model(model_path_restnet)

# load label
mbv2_label = load_label(label_path_mbv2)
# rest_50_label = load_model(label_path_restnet)


def con_trung_prediction_result(image):
    mbv2_result = prediction(image, mbv2_model,mbv2_label)
    # rest_50_result = prediction(image,rest_50_model,rest_50_label)
    # result = {
    #     mbv2_result,rest_50_result
    # }
    print(mbv2_result)
    return mbv2_result