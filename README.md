# Image Similarity with Siamese Networks & Geolocation

<p align="center">
  <img width='350' src="https://github.com/eliac7/image-similarity-siamese/blob/main/tutorial-images/flickr/flickr_04.jpg?raw=true" alt="App Preview">
</p>

## About The Project

This web application was developed as my university thesis to implement a **Siamese Neural Network** for image retrieval. It allows users to identify historical landmarks in Greece by uploading a photo, combining **Computer Vision** and **Geolocation** to provide accurate results.

The system uses the **VGG19** architecture, pre-trained on ImageNet, to calculate the visual similarity (Euclidean distance) between a query image and a dataset of landmarks using a contrastive loss function.

**Key Innovation:** To optimize performance and accuracy, the application checks for GPS metadata in the uploaded image.
*   **With GPS:** The search is narrowed down to a specific geographical "cluster" (e.g., Athens, Thessaloniki, Corfu), using a specialized model for that region.
*   **Without GPS:** A general model trained on the entire dataset is used.

**The main interface is in Greek :greece:, with English :uk: support for landmark information.**

## Features

*   **Smart Image Search:** Drag & drop support with automatic GPS detection.
*   **Geographical Clustering:** 5 specific clusters + 1 general cluster for optimized matching.
*   **Interactive Map:** Leaflet-based map displaying landmarks, clusters, and user location.
*   **Weather Integration:** Real-time weather and 3-day forecast for each geographical cluster.
*   **Flickr Integration:** Search and download images directly from Flickr to test the model.
*   **Dark Mode:** System-aware and user-toggleable dark theme.
*   **Responsive Design:** Works on desktop and mobile devices.

## Built With

**Frontend:**
*   HTML5 / CSS3 / JavaScript (jQuery)
*   [Leaflet Maps](https://leafletjs.com/) & OpenStreetMap Tiles
*   [Exifr](https://github.com/MikeKovarik/exifr) (for GPS extraction)
*   [FileSaver.js](https://github.com/eligrey/FileSaver.js/)

**Backend:**
*   **PHP:** Handles file uploads and orchestrates the Python script.
*   **Python:** Runs the TensorFlow/Keras model.
*   **TensorFlow / Keras:** VGG19 Siamese Network implementation.
*   **OpenWeatherMap API:** Weather data.
*   **Flickr API:** Image search.

## Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

*   **Python 3.x**
*   **PHP** with a web server (e.g., Apache). [Laragon](https://laragon.org/) is recommended for Windows users.
*   **Git**

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/eliac7/image-similarity-siamese.git
    cd image-similarity-siamese
    ```

2.  **Install Python dependencies**
    It is recommended to use a virtual environment.
    ```bash
    pip install -r requirements.txt
    ```

3.  **Setup the Database**
    The project relies on pre-generated CSV files linking images to their labels.
    *   Navigate to `extract_train_csv.py`.
    *   **Important:** You must modify the `path_train` and `savefile` variables in this script and run it for **each** of the 6 clusters located in the `database/` directory (`CLUSTER_1` to `CLUSTER_5` and `CLUSTER_NO_GPS`).
    *   This will generate the required `train.csv` files in the `labels/` directory.

### Configuration

This project requires manual configuration of paths and API keys.

1.  **PHP Configuration (`submit.php`)**
    Open `submit.php` and update the following placeholders with your absolute paths:
    *   `PATH_TO_SAVE_UPLOADED_IMAGE`: Directory where uploaded temp images will be saved.
    *   `PATH_TO_PYTHON_EXE_WITH_REQUIREMENTS_INSTALLED`: Full path to your Python executable (e.g., inside your virtualenv).
    *   `PATH_TO_SIAMESE_RESULTS_PY`: Full path to the `siamese_results.py` file.

2.  **JavaScript Configuration (`script.js`)**
    Open `script.js` and replace the placeholders:
    *   `API_KEY`: Search for this string and replace it with your **OpenWeatherMap** API key and **Mapbox** Access Token.
    *   (Optional) Update the Flickr API key in the `Flickr()` function if needed.

## Usage

1.  Start your local web server (e.g., Start All in Laragon).
2.  Open `index.php` in your browser.
3.  **Search:** Drag and drop an image of a Greek landmark.
    *   If it has GPS, the map will zoom to the location.
    *   The system will process the image and display the most similar match from the database.
4.  **Explore:** Click on map clusters to see weather and points of interest.
5.  **Flickr:** Use the "Search on Flickr" button to find new test images.

## Architecture Visualization

<p align="center">
  <img width='350' src="https://github.com/eliac7/image-similarity-siamese/blob/main/tutorial-images/flickr/flickr_06.jpg?raw=true" alt="Results">
</p>

## Credits

*   Design inspired by [Ali Majed](https://codepen.io/Ali-Majed/pen/BaRoyrG).
*   Photos sourced via Flickr API and Instagram GraphQL API. All rights belong to their respective owners.

## Contact

Ilias Nikolaos Thalassochoritis - [@ilias_thal](https://twitter.com/ilias_thal) - ithalassochoritis@uth.gr