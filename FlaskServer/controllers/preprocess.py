#các hàm hoạt động bình thường
# from keras.src.applications.mobilenet_v2 import preprocess_input
from keras.applications.mobilenet_v2 import preprocess_input
import numpy as np

def preprocess_image(image_input):
    resize_img = image_input.resize((224,224))
    img_arr = np.array(resize_img)
    dims_img = np.expand_dims(img_arr, axis=0)
    processed_img = preprocess_input(dims_img)
    return processed_img


def load_label(label_path):
    try:
        with open(label_path, 'r') as f:
            list_labels = f.readlines()
     
        list_labels = [label.strip() for label in list_labels]
        return list_labels
    except FileNotFoundError:
        print(f"File '{label_path}' not found.")
        return []  
    except Exception as e:
        print(f"Error loading labels: {e}")
        return None 
