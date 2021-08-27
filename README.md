


# Web app for Image Similarity using Siamese Neural Network.
## What is this for?
My thesis was to implement a Siamese Neural Network using the VGG19 model, pre-trained on ImageNet to calculate the match of a query image through a dataset of images. To find the similarity, I used a contrastive loss function and a Euclidean distance. On this repo, you will find my implementation on a web app for this purpose.

<strong>The main language of the app is in Greek. :greece:	 </strong>


## Features

<ul>
<li>Dark Mode.</li>
<li>Photo support with  JPG, JPEG and PNG format  using GPS coordinates. </li>
<li>Ability to "drag and drop" for convenience without the need to find the photo through directories. </li>
<li>Map with points of interest, direct access to information and photos in English and Greek. </li>
<li>Weather per geographical complex, with forecast for the next three days*. </li>
<li>Instantly shift to any geographic cluster of the map with one click. </li>
<li>Instant search on Flickr, with unlimited number of results. Ability to save photos with the ease of one click.* </li>
<li>FAQs with modals and accordion. </li>
<br/>
*You need API key.
</ul>

## Built With
* AJAX
* Leaflet Maps
* OpenStreetMap tiles
* OpenWeatherMap
* <a href='https://github.com/MikeKovarik/exifr' target='_blank'>Exifr</a>
* <a href='https://github.com/eligrey/FileSaver.js/' target='_blank'>FileSaver.js</a>


## How it works?

<p align="center">
  <img width='350' src="https://github.com/eliac7/image-similarity-siamese/blob/main/tutorial-images/flickr/flickr_04.jpg?raw=true">
</p>

Our application deals with two essential functions. The first is the function of finding the user's given photo similarity with one of our database photos by exporting features from it, checking the availability of GPS geographical coordinates of the given image, and displaying results.

Practically, we have a total of six pre-trained models. The five models correspond to the five geographical clusters. If our photo contains GPS coordinates and its location is within one of the five clusters, it uses the corresponding pre-trained model and shows the results below.

Otherwise, if our photo does not have GPS coordinates or is not in one of the five geographical clusters, it uses the sixth pre-trained model trained on all geographical clusters.

<p align="center">
  <img width='350' src="https://github.com/eliac7/image-similarity-siamese/blob/main/tutorial-images/flickr/flickr_06.jpg?raw=true">
</p>


The second function is th ability to download photos from Flickr using their Flickr API, and with one click, we can download them on our PC or smartphone.


<p align="center">
  <img width='350' src="https://github.com/eliac7/image-similarity-siamese/blob/main/tutorial-images/flickr/flickr_02.png?raw=true">
</p>

## Map

<p align="center">
  <img  src="https://github.com/eliac7/image-similarity-siamese/blob/main/tutorial-images/leaflet/leaflet_01.jpg?raw=true">
</p>

On the left side, from top to bottom, we see two buttons to zoom in and out on the map, while the bottom shows the weather of each geographic cluster, the weather icon, and the maximum temperature in Celsius degrees.

By clicking the arrow, a window appears that shows us the weather forecast for the next three days, with the maximum temperature by day.

On the right side, we have the window with all the geographical clusters. Clicking on one of them, refers to the respective geographical complex which shifts to it while performing a smooth movement.


<p align="center">
  <img  src="https://github.com/eliac7/image-similarity-siamese/blob/main/tutorial-images/leaflet/leaflet_03.jpg?raw=true">
</p>

Zooming into a geographical cluster, you'll some points of interest. Clicking on one of the points of interest, a window appears with a photo of the point of interest, its name and two buttons. The first, represented by the Google logo, refers us to the company's photo results to see more images for the point of interest. The second is an information icon (i) that takes us to a web page with information about each point.

 In addition, on the left, we see two flags: Greek, which is by default, and English. By changing the language, the point's name and the two buttons are changing accordingly.


## How to install?
Firstly, you have to clone the repo 
```
git clone https://github.com/eliac7/image-similarity-siamese.git
```
Secondly, we suppose that you already have installed Python. I would suggest creating a new virtual environment and run the below command to install the required packages.
```
pip install -r requirements.txt
```

The folder structure is already there, so you no need to make any changes on it. However, you need to execute the <strong>
extract_train_csv
</strong>
file, to generate the corresponding CSVs for each geographical cluster to the corresponding placeholdered folders. 

Furthemore, you'll need to setup PHP with Apache Server. I suggest you to download <a href="https://laragon.org/" target="_blank">Laragon</a> which has a friendly UI.


## Credits

* Design was inspired by https://codepen.io/Ali-Majed/pen/BaRoyrG (Ali Majed)
* All photos in our database were downloaded from public photos by Flickr API and Instagram GraphQL API.All rights belong to their respective owners. I do not own any of this content.

## Contact 

Ilias Nikolaos Thalassochoritis - [@ilias_thal](https://twitter.com/ilias_thal) - ithalassochoritis@uth.gr

