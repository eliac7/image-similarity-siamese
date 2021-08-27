import os
import sys
import shutil
import numpy as np
from PIL import Image
import csv
import cv2
from tensorflow.keras import backend as K
from tensorflow.keras.layers import Lambda
from tensorflow.keras import optimizers
import warnings
import tensorflow as tf
import json

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3' 

output_path = './images/output'
files = os.listdir(output_path)
for file in files:
    os.remove(os.path.join(output_path,file))



warnings.filterwarnings('ignore')



IMAGE_PATH = sys.argv[1]
circle_name = sys.argv[2]


if circle_name == 'Agora':
    TRAIN_CSV = r'./labels/CLUSTER_1/train.csv' #You have to generate it through extract_train_csv.py
    LOCAL_MODEL = r'./weights/CLUSTER 1/'
    original_path = r'./database/CLUSTER_1'
elif circle_name == 'Parthenon':
    TRAIN_CSV = r'./labels/CLUSTER_2/train.csv' #You have to generate it through extract_train_csv.py
    LOCAL_MODEL = r'./weights/CLUSTER 2/'
    original_path = r'./database/CLUSTER_2'
elif circle_name == 'Thessaloniki':
    TRAIN_CSV = r'./labels/CLUSTER_3/train.csv' #You have to generate it through extract_train_csv.py
    LOCAL_MODEL = r'./weights/CLUSTER 3/'
    original_path = r'./database/CLUSTER_3'
elif circle_name == 'Cyclades':
    TRAIN_CSV = r'./labels/CLUSTER_4/train.csv' #You have to generate it through extract_train_csv.py
    LOCAL_MODEL = r'./weights/CLUSTER 4/'
    original_path = r'./database/CLUSTER_4'
elif circle_name == 'Corfu':
    TRAIN_CSV = r'./labels/CLUSTER_5/train.csv' #You have to generate it through extract_train_csv.py
    LOCAL_MODEL = r'./weights/CLUSTER 5/'
    original_path = r'./database/CLUSTER_5'
else:
    TRAIN_CSV = r'./labels/CLUSTER_NO_GPS/train.csv' #You have to generate it through extract_train_csv.py
    LOCAL_MODEL = r'./weights/CLUSTER NO_GPS/'
    original_path = r'./database/CLUSTER_NO_GPS'

conf = tf.compat.v1.ConfigProto()

conf.gpu_options.allow_growth = True
sess = tf.compat.v1.Session(config=conf)


def tf_siamese_nn(shape, embedding=64, fineTune=True):
    inputs = tf.keras.layers.Input(shape)
    base_model = tf.keras.applications.vgg19.VGG19(input_shape=shape, include_top=False, weights='imagenet')

    if fineTune == False:
        base_model.trainable = False
    else:
        base_model.trainable = True

        fine_tune_at = len(base_model.layers) - int(len(base_model.layers) * .10)

        for layer in base_model.layers[:fine_tune_at]:
            layer.trainable = False
    x = base_model(inputs)
    x = tf.keras.layers.GlobalAveragePooling2D()(x)
    outputs = tf.keras.layers.Dense(embedding, activation='relu')(x)
    model = tf.keras.Model(inputs, outputs)

    return model


def euclidean_distance(vects):
    x, y = vects
    return K.sqrt(K.sum(K.square(x - y), axis=1, keepdims=True))


def eucl_dist_output_shape(shapes):
    return (shapes[0], 1)


def contrastive_loss(y_true, y_pred):
    margin = 1
    return K.mean(y_true * K.square(y_pred) + (1 - y_true) * K.square(K.maximum(margin - y_pred, 0)))

def accuracy(y_true, y_pred):
    '''Compute classification accuracy with a fixed threshold on distances.
    '''
    return K.mean(K.equal(y_true, K.cast(y_pred < 0.5, y_true.dtype)))


w, h = 224, 224
size = 2
label_dirs = os.listdir(original_path)



indicators = []
with open(TRAIN_CSV, 'r', encoding="utf-8") as file:
    reader = csv.reader(file)
    for row in reader:
        indicators.append(row)

SHAPE = (3, 224, 224)
img1 = tf.keras.layers.Input(shape=SHAPE)
img2 = tf.keras.layers.Input(shape=SHAPE)
featureExtractor = tf_siamese_nn(SHAPE)
featsA = featureExtractor(img1)
featsB = featureExtractor(img2)

distance = Lambda(euclidean_distance, output_shape=eucl_dist_output_shape)([featsA, featsB])


rms = optimizers.Adam(lr=0.00001, beta_1=0.9, beta_2=0.999, epsilon=None, decay=0.0, amsgrad=False)
model = tf.keras.Model(inputs=[img1, img2], outputs=distance)


if(circle_name == 'NULL'):
    model.load_weights(os.path.join(LOCAL_MODEL, '71-0.0.h5'))
else:
    model.load_weights(os.path.join(LOCAL_MODEL, '100-0.0.h5'))
model.compile(loss=contrastive_loss, optimizer=rms, metrics=[accuracy])

y_preds = []
y_true = []


img1 = IMAGE_PATH
best = ['', '', 999]
x_geuine_pair = np.zeros([len(indicators), 2, 3, 224, 224])
count = 0
y_genuine = []
y_path = []

image1 = Image.open(img1)
image1 = image1.resize((224, 224), Image.NEAREST)

image1 = np.array(image1)

if len(np.shape(image1)) == 2:
    image1 = cv2.cvtColor(image1, cv2.COLOR_GRAY2RGB)

for j in range(len(indicators)):

    img2 = indicators[j][0]
    lbl2 = indicators[j][1]

    image2 = Image.open(img2)
    image2 = image2.resize((224, 224), Image.NEAREST)
    image2 = np.array(image2)



    if len(np.shape(image2)) == 2:
        image2 = cv2.cvtColor(image2, cv2.COLOR_GRAY2RGB)



    x_geuine_pair[count, 0, 0, :, :] = image1[:, :, 0] / 255
    x_geuine_pair[count, 0, 1, :, :] = image1[:, :, 1] / 255
    x_geuine_pair[count, 0, 2, :, :] = image1[:, :, 2] / 255
    x_geuine_pair[count, 1, 0, :, :] = image2[:, :, 0] / 255
    x_geuine_pair[count, 1, 1, :, :] = image2[:, :, 1] / 255
    x_geuine_pair[count, 1, 2, :, :] = image2[:, :, 2] / 255

    count += 1
    y_genuine.append(lbl2)
    y_path.append(img2)

preds = model.predict([x_geuine_pair[:, 0], x_geuine_pair[:, 1]])

min = 999999
chosen = -1
for i in range(len(preds)):


    if preds[i] < min:

        min = preds[i]
        chosen = i

pred_label = y_genuine[chosen]
pred_path = y_path[chosen]
confidence = preds[chosen]

shutil.copy2(pred_path,output_path)
os.rename(os.path.join(output_path,pred_path.split('\\')[-1]),os.path.join(output_path,'export.jpg'))

arr = {
    'confidence': f'{confidence[0]}',
    'label': f'{pred_label}'
}

print(json.dumps(arr))