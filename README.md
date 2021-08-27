


# Web app for Image Similarity using Siamese Neural Network.
## What is this for?
My thesis was to implement a Siamese Neural Network using VGG19 Model, pre-trained on ImageNet to calculate the match of a query image through a dataset of images. To find the similarity, I used a contrastive loss function and a Euclidean distance. On this repo, you will find my implementation on a web app for this purpose.

<strong>The main language of the web app is in Greek. :greece:	 </strong>


## Features

<ul>
<li>Dark Mode.</li>
<li>Photo support with  JPG, JPEG and PNG format  using GPS coordinates. </li>
<li>Ability to "drag and drop" for convenience without the need to find the photo through directories. </li>
<li>Map with points of interest, direct access to information and photos in English and Greek. </li>
<li>Weather per geographical complex, with forecast for the next three days*. </li>
<li>Instantly shift to any geographic cluster of the map with one click. </li>
<li>Instant search on Flickr, with unlimited number of results. Ability to take photos with the ease of one click.* </li>
<li>FAQ with modals and accordion. </li>
<br/>
*You need API key.
</ul>

## Technologies
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

Our application deals with two important functions. The <strong>first</strong> is the function of finding the similarity of the given photo by the user with one of the photos of our database by exporting features from it, checking the availability of GPS geographical coordinates of the given photo and displaying results.

Practically, we have a total of six pre-trained models. The five models correspond to the five geographical clusters. If our photo contains GPS coordinates and its location is within one of the five clusters, then, it uses the corresponding pre-trained model and shows the results as below.

Otherwise, if our photo does not have GPS coordinates or is not in one of the five geographical clusters, then it uses the sixth pre-trained model that was trained on all geopgrahical clusters.




<p align="center">
  <img width='350' src="https://github.com/eliac7/image-similarity-siamese/blob/main/tutorial-images/flickr/flickr_06.jpg?raw=true">
</p>


The <strong>second</strong> function is to download photos from Flickr, using their Flickr API, and with one click we can download it on our PC or smartphone.


<p align="center">
  <img width='350' src="https://github.com/eliac7/image-similarity-siamese/blob/main/tutorial-images/flickr/flickr_02.png?raw=true">
</p>









## How to install?
Firstly, we suppose that you already have installed Python. I would suggest to create a new virtual environment and run the below command to install the required packages.
```
pip install -r requirements.txt
```




