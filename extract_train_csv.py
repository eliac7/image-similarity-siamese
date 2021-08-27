import os
import random as rd
import csv

path_train = r'PATH_OF_YOUR_FOLDER\database\CLUSTER_1'

savefile = r'PATH_OF_YOUR_FOLDER\labels\CLUSTER_1'

try:
    os.mkdir(savefile)
except:
    print('File already exist')


def save_cv(exp, paths, lbls):
    with open(os.path.join(savefile, exp), mode='w', newline='', encoding="utf-8") as data_files_paths:
        pic_writer = csv.writer(data_files_paths, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
        for pic, label in zip(paths, lbls):
            pic_writer.writerow([pic, label])


dirs = [d for d in os.listdir(path_train) if os.path.isdir(os.path.join(path_train, d))]

images = []
lbls = []

for p in dirs:

    pt = os.path.join(path_train, p)
    imgs = os.listdir(pt)
    for i in range(len(imgs)):
        images.append(os.path.join(pt, imgs[i]))
        lbls.append(p)

save_cv('train.csv', images, lbls)
