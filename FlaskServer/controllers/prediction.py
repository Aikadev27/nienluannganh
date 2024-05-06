# from tensorflow.python.keras.models import load_model
import numpy as np

def prediction(image,model,label):
    
    predict = model.predict(image)
    
    pre_max_index = np.argmax(predict[0])
    pre_label = label[pre_max_index]
    pre_acc = predict[0][pre_max_index]
    pre_acc = "{:.2f}".format(pre_acc)
    result = {
        "label":pre_label,
        "accuracy":float(pre_acc)
    }
    print(f'result con trung hai lua: {result}')
    
    return result