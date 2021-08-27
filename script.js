jQuery(document).ready(function () {
  const uploadzoon = jQuery(".upload-area__drop-zoon");
  const uploadinput = jQuery("#file");
  const previewimage = jQuery("#previewImage");
  const checkbox = jQuery("#chk");
  const loading_gif = jQuery(".loading-gif");
  const iconzoon = jQuery(".drop-zoon__icon");
  const paragraphzoon = jQuery(".drop-zoon__paragraph");
  const label = jQuery(".upload-area__response .label");
  const confidence = jQuery(".confidence");
  const resetbtn = jQuery(".reset");
  const info = jQuery(".info");
  const info_flickr = jQuery(".info_flickr");
  const search = jQuery(".search");
  const search_back = jQuery("#search_back");

  const left_side = jQuery(".input");
  const right_side = jQuery(".search_screen");

  const modal = jQuery("#myModal");

  const modalclose = jQuery(".close");
  const search_text = jQuery("#search_text");

  const currentTimestamp = Date.now();

  const WEATHER_KEY = "API_KEY";
  var final_weather = new Array();
  var final_weather_forecast = new Array();
  if (localStorage.getItem("theme")) {
    if (localStorage.getItem("theme") == "dark") {
      checkbox.prop("checked", true);
    }
  }

  var mymap = L.map("map", {
    zoomSnap: 0.25,
    zoomDelta: 1,
    wheelPxPerZoomLevel: 60,
  }).setView([37.645, 23.588], 6);

  var initial_mymap_center = mymap._lastCenter;
  var initial_mymap_zoom = mymap._zoom;

  var baseFeatureGroup = L.featureGroup().addTo(mymap);
  var baseFeatureGroup2 = L.featureGroup().addTo(mymap);
  var baseFeatureGroup3 = L.featureGroup().addTo(mymap);
  var baseFeatureGroup4 = L.featureGroup().addTo(mymap);
  var baseFeatureGroup5 = L.featureGroup().addTo(mymap);
  var myFeatureGroup = L.featureGroup().addTo(mymap);
  var invisibleMarker = L.featureGroup().addTo(mymap);

  var el = document.getElementById("places");
  L.DomEvent.disableScrollPropagation(el);
  L.DomEvent.disableClickPropagation(el);

  var el = document.querySelector(".weather-inner");
  L.DomEvent.disableScrollPropagation(el);
  L.DomEvent.disableClickPropagation(el);

  var el = document.querySelector(".weather-outer");
  L.DomEvent.disableScrollPropagation(el);
  L.DomEvent.disableClickPropagation(el);

  var dark = L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 20,
      id: "mapbox/dark-v10",
      tileSize: 512,
      zoomOffset: -1,
      layers: [
        invisibleMarker,
        baseFeatureGroup,
        myFeatureGroup,
        baseFeatureGroup2,
        baseFeatureGroup3,
        baseFeatureGroup4,
        baseFeatureGroup5,
      ],
      accessToken: "API_KEY",
    }
  );
  var light = L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 20,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      layers: [
        invisibleMarker,
        baseFeatureGroup,
        myFeatureGroup,
        baseFeatureGroup2,
        baseFeatureGroup3,
        baseFeatureGroup4,
        baseFeatureGroup5,
      ],
      accessToken: "API_KEY",
    }
  );

  light.addTo(mymap);

  DarkModeMap(dark, light, mymap);

  var parthenonIcon = L.icon({
    iconUrl: "./images/icons/leaflet_icon.png",

    iconSize: [28, 28], // size of the ico
    iconAnchor: [28, 28], // point of the icon which will correspond to marker's location
    popupAnchor: [-15, -30], // point from which the popup should open relative to the iconAnchor
  });
  var parthenonIcon_2 = L.icon({
    iconUrl: "./images/icons/leaflet_icon_2.png",

    iconSize: [28, 28], // size of the ico
    iconAnchor: [28, 28], // point of the icon which will correspond to marker's location
    popupAnchor: [-15, -30], // point from which the popup should open relative to the iconAnchor
  });
  var salonikiIcon = L.icon({
    iconUrl: "./images/icons/leaflet_icon_3.png",

    iconSize: [28, 28], // size of the ico
    iconAnchor: [28, 28], // point of the icon which will correspond to marker's location
    popupAnchor: [-15, -30], // point from which the popup should open relative to the iconAnchor
  });
  var cycladesIcon = L.icon({
    iconUrl: "./images/icons/leaflet_icon_4.png",

    iconSize: [38, 38], // size of the ico
    iconAnchor: [35, 35], // point of the icon which will correspond to marker's location
    popupAnchor: [-15, -30], // point from which the popup should open relative to the iconAnchor
  });
  var corfuIcon = L.icon({
    iconUrl: "./images/icons/leaflet_icon_5.png",

    iconSize: [32, 32], // size of the ico
    iconAnchor: [32, 32], // point of the icon which will correspond to marker's location
    popupAnchor: [-15, -30], // point from which the popup should open relative to the iconAnchor
  });

  const MARKERS = [
    {
      name: "Ωδείο Ηρώδου του Αττικού",
      name_en: "Odeon of Herodes Atticus",
      latitude: 37.97078,
      longtitude: 23.72459,
      image: "./images/locations/irodeio.jpg",
      info: "https://el.wikipedia.org/wiki/%CE%A9%CE%B4%CE%B5%CE%AF%CE%BF_%CE%97%CF%81%CF%8E%CE%B4%CE%BF%CF%85_%CF%84%CE%BF%CF%85_%CE%91%CF%84%CF%84%CE%B9%CE%BA%CE%BF%CF%8D",
      info_en: "https://en.wikipedia.org/wiki/Odeon_of_Herodes_Atticus",
    },
    {
      name: "Ναός του Ηφαίστου",
      name_en: "Temple of Hephaestus",
      latitude: 37.97561,
      longtitude: 23.72139,
      image: "./images/locations/ifaistos.jpg",
      info: "https://el.wikipedia.org/wiki/%CE%9D%CE%B1%CF%8C%CF%82_%CE%97%CF%86%CE%B1%CE%AF%CF%83%CF%84%CE%BF%CF%85",
      info_en: "https://en.wikipedia.org/wiki/Temple_of_Hephaestus",
    },
    {
      name: "Ωρολόγιο Ανδρονίκου Κυρρήστου",
      name_en: "Horologion of Andronikos Kyrrhestes",
      latitude: 37.97419,
      longtitude: 23.72702,
      image: "./images/locations/tower_of_winds.jpg",
      info: "https://el.wikipedia.org/wiki/%CE%91%CE%AD%CF%81%CE%B7%CE%B4%CE%B5%CF%82_(%CE%BC%CE%BD%CE%B7%CE%BC%CE%B5%CE%AF%CE%BF)",
      info_en: "https://en.wikipedia.org/wiki/Tower_of_the_Winds",
    },

    {
      name: "Ιερός Ναός Αγίων Αποστόλων",
      name_en: "Holy Apostles",
      latitude: 37.97409,
      longtitude: 23.72392,
      image: "./images/locations/holy_apostles.jpg",
      info: "http://www.byzantineathens.com/alphagammaiotaomicroniota-alphapiomicronsigmatauomicronlambdaomicroniota-sigmaomicronlambdaalphakappaeta.html",
      info_en:
        "https://en.wikipedia.org/wiki/Church_of_the_Holy_Apostles,_Athens",
    },
  ];

  const MARKERS_2 = [
    {
      name: "Ναός του Ολυμπίου Διός",
      name_en: "Temple of Olympian Zeus",
      latitude: 37.96937,
      longtitude: 23.73311,
      image: "./images/locations/dios.jpg",
      info: "https://el.wikipedia.org/wiki/%CE%9D%CE%B1%CF%8C%CF%82_%CF%84%CE%BF%CF%85_%CE%9F%CE%BB%CF%85%CE%BC%CF%80%CE%AF%CE%BF%CF%85_%CE%94%CE%B9%CF%8C%CF%82",
      info_en: "https://en.wikipedia.org/wiki/Temple_of_Olympian_Zeus,_Athens",
    },
    {
      name: "Πύλη του Αδριανού",
      name_en: "Arch of Hadrian",
      latitude: 37.97019,
      longtitude: 23.73202,
      image: "./images/locations/andrianos.jpg",
      info: "https://el.wikipedia.org/wiki/%CE%A0%CF%8D%CE%BB%CE%B7_%CF%84%CE%BF%CF%85_%CE%91%CE%B4%CF%81%CE%B9%CE%B1%CE%BD%CE%BF%CF%8D",
      info_en: "https://en.wikipedia.org/wiki/Arch_of_Hadrian_(Athens)",
    },
    {
      name: "Παρθενώνας",
      name_en: "Parthenon",
      latitude: 37.97152,
      longtitude: 23.72687,
      image: "./images/locations/parthenon.jpg",
      info: "https://el.wikipedia.org/wiki/%CE%A0%CE%B1%CF%81%CE%B8%CE%B5%CE%BD%CF%8E%CE%BD%CE%B1%CF%82",
      info_en: "https://en.wikipedia.org/wiki/Parthenon",
    },
    {
      name: "Ερέχθειο",
      name_en: "Erechtheion",
      latitude: 37.97206,
      longtitude: 23.72665,
      image: "./images/locations/erechtheion.jpg",
      info: "https://el.wikipedia.org/wiki/%CE%95%CF%81%CE%AD%CF%87%CE%B8%CE%B5%CE%B9%CE%BF",
      info_en: "https://en.wikipedia.org/wiki/Erechtheion",
    },
    {
      name: "Μουσείο της Ακρόπολης",
      name_en: "Acropolis Museum",
      latitude: 37.96851,
      longtitude: 23.72849,
      image: "./images/locations/acropolis_museum.jpg",
      info: "https://el.wikipedia.org/wiki/%CE%9C%CE%BF%CF%85%CF%83%CE%B5%CE%AF%CE%BF_%CE%91%CE%BA%CF%81%CF%8C%CF%80%CE%BF%CE%BB%CE%B7%CF%82",
      info_en: "https://en.wikipedia.org/wiki/Acropolis_Museum",
    },
  ];

  const MARKERS_3 = [
    {
      name: "Πλατεία Αριστοτέλους",
      name_en: "Aristotelous Square",
      latitude: 40.63234,
      longtitude: 22.94089,
      image: "./images/locations/aristotelous.jpg",
      info: "https://el.wikipedia.org/wiki/%CE%A0%CE%BB%CE%B1%CF%84%CE%B5%CE%AF%CE%B1_%CE%91%CF%81%CE%B9%CF%83%CF%84%CE%BF%CF%84%CE%AD%CE%BB%CE%BF%CF%85%CF%82",
      info_en: "https://en.wikipedia.org/wiki/Aristotelous_Square",
    },
    {
      name: "Λαδάδικα",
      name_en: "Ladadika",
      latitude: 40.63543,
      longtitude: 22.9368,
      image: "./images/locations/ladadika.jpg",
      info: "https://el.wikipedia.org/wiki/%CE%9B%CE%B1%CE%B4%CE%AC%CE%B4%CE%B9%CE%BA%CE%B1",
      info_en: "https://en.wikipedia.org/wiki/Ladadika",
    },
    {
      name: "Πύργος του ΟΤΕ",
      name_en: "OTE Tower",
      latitude: 40.62621,
      longtitude: 22.95451,
      image: "./images/locations/ote.jpg",
      info: "https://el.wikipedia.org/wiki/%CE%A0%CF%8D%CF%81%CE%B3%CE%BF%CF%82_%CF%84%CE%BF%CF%85_%CE%9F%CE%A4%CE%95",
      info_en: "https://en.wikipedia.org/wiki/OTE_Tower",
    },
    {
      name: "Ροτόντα",
      name_en: "Rotunda",
      latitude: 40.63332,
      longtitude: 22.95281,
      image: "./images/locations/rotonda.jpg",
      info: "https://el.wikipedia.org/wiki/%CE%A1%CE%BF%CF%84%CF%8C%CE%BD%CF%84%CE%B1_(%CE%98%CE%B5%CF%83%CF%83%CE%B1%CE%BB%CE%BF%CE%BD%CE%AF%CE%BA%CE%B7)",
      info_en: "https://en.wikipedia.org/wiki/Arch_of_Galerius_and_Rotunda",
    },
    {
      name: "Λευκός Πύργος",
      name_en: "White Tower of Thessaloniki",
      latitude: 40.62638,
      longtitude: 22.94833,
      image: "./images/locations/white_tower.jpg",
      info: "https://el.wikipedia.org/wiki/%CE%9B%CE%B5%CF%85%CE%BA%CF%8C%CF%82_%CE%A0%CF%8D%CF%81%CE%B3%CE%BF%CF%82",
      info_en: "https://en.wikipedia.org/wiki/White_Tower_of_Thessaloniki",
    },
  ];

  const MARKERS_4 = [
    {
      name: "Μικρή Βενετία",
      name_en: "Little Venice",
      latitude: 37.44664,
      longtitude: 25.32598,
      image: "./images/locations/little_venice.jpg",
      info: "https://twisper.com/el/blog/%CE%BC%CE%B9%CE%BA%CF%81%CE%AE-%CE%B2%CE%B5%CE%BD%CE%B5%CF%84%CE%AF%CE%B1-%CE%BC%CF%85%CE%BA%CF%8C%CE%BD%CE%BF%CF%85/",
      info_en:
        "https://www.greeka.com/cyclades/mykonos/sightseeing/little-venice/",
    },
    {
      name: "Ναός του Απόλλωνα - Γρόττα(Πορτάρα)",
      name_en: "Apollo Temple - Grotta(Portara)",
      latitude: 37.1102,
      longtitude: 25.37229,
      image: "./images/locations/portara.jpg",
      info: "https://el.wikipedia.org/wiki/%CE%9D%CE%B1%CF%8C%CF%82_%CF%84%CE%BF%CF%85_%CE%91%CF%80%CF%8C%CE%BB%CE%BB%CF%89%CE%BD%CE%B1_(%CE%9D%CE%AC%CE%BE%CE%BF%CF%82)",
      info_en:
        "https://www.greeka.com/cyclades/naxos/sightseeing/portara-naxos/",
    },
    {
      name: "Παναγία η Εκατονταπυλιανή",
      name_en: "Panagia Ekatontapyliani",
      latitude: 37.08493,
      longtitude: 25.15195,
      image: "./images/locations/ekatantapyliani.jpg",
      info: "https://el.wikipedia.org/wiki/%CE%A0%CE%B1%CE%BD%CE%B1%CE%B3%CE%AF%CE%B1_%CE%B7_%CE%95%CE%BA%CE%B1%CF%84%CE%BF%CE%BD%CF%84%CE%B1%CF%80%CF%85%CE%BB%CE%B9%CE%B1%CE%BD%CE%AE",
      info_en: "https://en.wikipedia.org/wiki/Panagia_Ekatontapiliani",
    },
    {
      name: "Παναγία Ευαγγελίστρια Τήνου",
      name_en: "Our Lady of Tinos",
      latitude: 37.54237,
      longtitude: 25.16276,
      image: "./images/locations/tinos.jpg",
      info: "https://el.wikipedia.org/wiki/%CE%A0%CE%B1%CE%BD%CE%B1%CE%B3%CE%AF%CE%B1_%CE%A4%CE%AE%CE%BD%CE%BF%CF%85",
      info_en: "https://en.wikipedia.org/wiki/Our_Lady_of_Tinos",
    },
    {
      name: "Δημαρχείο Ερμούπολης",
      name_en: "Ermoupolis City Hall",
      latitude: 37.44507,
      longtitude: 24.94278,
      image: "./images/locations/dimarxeio_ermoupolis.jpg",
      info: "https://el.wikipedia.org/wiki/%CE%94%CE%B7%CE%BC%CE%B1%CF%81%CF%87%CE%B5%CE%AF%CE%BF_%CE%95%CF%81%CE%BC%CE%BF%CF%8D%CF%80%CE%BF%CE%BB%CE%B7%CF%82",
      info_en: "https://www.syrosisland.gr/en/hermoupolis-town-hall/",
    },
  ];

  const MARKERS_5 = [
    {
      name: "Ποντικονήσι",
      name_en: "Mouse Island (Pontikonisi)",
      latitude: 39.58635,
      longtitude: 19.91803,
      image: "./images/locations/pontikonisi.jpg",
      info: "https://el.wikipedia.org/wiki/%CE%A0%CE%BF%CE%BD%CF%84%CE%B9%CE%BA%CE%BF%CE%BD%CE%AE%CF%83%CE%B9_%CE%9A%CE%AD%CF%81%CE%BA%CF%85%CF%81%CE%B1%CF%82",
      info_en:
        "https://www.greeka.com/ionian/corfu/sightseeing/corfu-kanoni-mouse-island/",
    },
    {
      name: "Αχίλλειον",
      name_en: "Achilleion Palace",
      latitude: 39.5626,
      longtitude: 19.90411,
      image: "./images/locations/achilleion.jpg",
      info: "https://el.wikipedia.org/wiki/%CE%91%CF%87%CE%AF%CE%BB%CE%BB%CE%B5%CE%B9%CE%BF",
      info_en: "https://en.wikipedia.org/wiki/Achilleion_(Corfu)",
    },
    {
      name: "Μουσείο Παλαιόπολης Κέρκυρας",
      name_en: "Achilleion Palace",
      latitude: 39.60618,
      longtitude: 19.92603,
      image: "./images/locations/mon_repos.jpg",
      info: "https://el.wikipedia.org/wiki/%CE%9C%CE%BF%CF%85%CF%83%CE%B5%CE%AF%CE%BF_%CE%A0%CE%B1%CE%BB%CE%B1%CE%B9%CF%8C%CF%80%CE%BF%CE%BB%CE%B7%CF%82_%CE%9A%CE%AD%CF%81%CE%BA%CF%85%CF%81%CE%B1%CF%82",
      info_en: "https://en.wikipedia.org/wiki/Mon_Repos,_Corfu",
    },
    {
      name: "Ναός Αγίου Σπυρίδωνα",
      name_en: "Saint Spyridon",
      latitude: 39.62513,
      longtitude: 19.92264,
      image: "./images/locations/spyridon.jpg",
      info: "https://www.infokerkyra.gr/aksiotheata/ekklisies/134-naos-agiou-spyridona.html",
      info_en: "https://en.wikipedia.org/wiki/Saint_Spyridon",
    },
    {
      name: "Παλαιό Φρούριο",
      name_en: "Old Fortress",
      latitude: 39.6234,
      longtitude: 19.92952,
      image: "./images/locations/old_fortress.jpg",
      info: "https://el.wikipedia.org/wiki/%CE%A0%CE%B1%CE%BB%CE%B1%CE%B9%CF%8C_%CE%A6%CF%81%CE%BF%CF%8D%CF%81%CE%B9%CE%BF_(%CE%9A%CE%AD%CF%81%CE%BA%CF%85%CF%81%CE%B1)",
      info_en: "https://en.wikipedia.org/wiki/Old_Fortress,_Corfu",
    },
  ];

  const ALL_MARKERS = [
    ...MARKERS,
    ...MARKERS_2,
    ...MARKERS_3,
    ...MARKERS_4,
    ...MARKERS_5,
  ];

  const CIRCLES = [
    {
      name: "Agora",
      lat: 37.974497,
      long: 23.721396,
      radius: 500,
    },
    {
      name: "Parthenon",
      lat: 37.970554,
      long: 23.731657,
      radius: 500,
    },
    {
      name: "Thessaloniki",
      lat: 40.6328,
      long: 22.94698,
      radius: 1000,
    },
    {
      name: "Cyclades",
      lat: 37.26044374387583,
      long: 25.218593123776067,
      radius: 50000,
    },
    {
      name: "Corfu",
      lat: 39.594,
      long: 19.9138,
      radius: 4000,
    },
  ];

  CIRCLES.forEach(function (circle) {
    c = L.circle([circle["lat"], circle["long"]], {
      radius: circle["radius"], //in meters
    }).addTo(mymap);

    $(".places__ul").append(
      `<li data-lat="${circle["lat"]}" data-long="${circle["long"]}">${circle["name"]}</li>`
    );
  });

  var promises = [];
  var promises_forecast = [];
  if (
    !localStorage.getItem("weather") ||
    differenceInHours(
      currentTimestamp,
      localStorage.getItem("weather_time_call")
    ) > 3
  ) {
    console.log("Made a call for weather");

    CIRCLES.forEach(function (circle) {
      if (circle["name"] == "Agora") {
        return;
      }
      if (circle["name"] == "Parthenon") {
        WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?q=Athens&appid=${WEATHER_KEY}&units=metric&lang=el`;
      } else {
        WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?q=${circle["name"]}&appid=${WEATHER_KEY}&units=metric&lang=el`;
      }

      promises.push(
        $.ajax({
          url: WEATHER_URL,
          success: function (res) {
            icon = `http://openweathermap.org/img/wn/${res["weather"][0]["icon"]}@2x.png`;
            temperature = Math.floor(res["main"]["temp"]);
            city_name = res["name"];
            alt = res["weather"][0]["description"];
            lat = res["coord"]["lat"];
            lon = res["coord"]["lon"];

            var tmp = {
              my_name: circle["name"],
              name: city_name,
              icon: icon,
              temp: temperature,
              alt: alt,
              lat: lat,
              lon: lon,
            };

            final_weather.push(tmp);
          },
          error: function (thrownError) {
            console.log(thrownError);
          },
        })
      );
    });

    Promise.all(promises).then(() => {
      localStorage.setItem("weather", JSON.stringify(final_weather));
      localStorage.setItem("weather_time_call", currentTimestamp);
    });
  } else {
    var d = new Date(parseInt(localStorage.getItem("weather_time_call")));
    console.log("Loaded locally for weather: ", d);
    final_weather = JSON.parse(localStorage.getItem("weather"));
  }

  if (
    !localStorage.getItem("weather_forecast") ||
    !localStorage.getItem("weather_time_call_forecast") ||
    differenceInHours(
      currentTimestamp,
      localStorage.getItem("weather_time_call_forecast")
    ) > 12
  ) {
    console.log("Made call for forecast");
    Promise.all(promises).then(() => {
      final_weather.forEach(function (i) {
        FORECAST_URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${i["lat"]}&lon=${i["lon"]}&exclude=current,minutely,hourly&appid=${WEATHER_KEY}&units=metric&lang=el`;
        promises_forecast.push(
          $.ajax({
            url: FORECAST_URL,
            method: "GET",
            success: function (res) {
              var tmp = {
                my_name: i["my_name"],
                daily: res["daily"],
              };

              final_weather_forecast.push(tmp);
            },
          })
        );
      });

      Promise.all(promises_forecast).then(() => {
        localStorage.setItem(
          "weather_forecast",
          JSON.stringify(final_weather_forecast)
        );
        localStorage.setItem("weather_time_call_forecast", currentTimestamp);
      });
    });
  } else {
    var d = new Date(
      parseInt(localStorage.getItem("weather_time_call_forecast"))
    );

    console.log("Loaded locally for forecast: ", d);
    final_weather_forecast = JSON.parse(
      localStorage.getItem("weather_forecast")
    );
  }

  MARKERS.forEach(function (i) {
    marker = new L.marker([i["latitude"], i["longtitude"]], {
      icon: parthenonIcon,
      name: i["name"],
      name_en: i["name_en"],
    })
      .bindPopup(
        `
      <div class="popup-language">
          <ul>
            <li class="active">
              <img  data-language="greek" src="./images/general/greece.png"> 
            </li>
            <li>
              <img data-language="english" src="./images/general/english.png"> 
            </li>
          </ul>
      </div>
      <div class="popup-insider">
        <img class="leaflet-mnimeio-popup" src=${i["image"]}>
        <p> ${i["name"]}</p>
        <div class="pop-insider__info">
          <a href="http://www.google.com/search?q=${i["name"]}&tbm=isch" target="_blank" class="leaflet-popup-see-more"><i class="fab fa-google"></i></a>
          <a href="${i["info"]}" target="_blank"><i class="fas fa-info-circle"></i></a>
        </div>
        

      </div>`,
        {
          minWidth: 200,
        }
      )
      .addTo(baseFeatureGroup)
      .on("click", function (e) {
        mymap.setView(e.latlng);
      });
  });
  MARKERS_2.forEach(function (i) {
    marker = new L.marker([i["latitude"], i["longtitude"]], {
      icon: parthenonIcon_2,
      name: i["name"],
      name_en: i["name_en"],
    })
      .bindPopup(
        `
      <div class="popup-language">
          <ul>
            <li class="active">
              <img  data-language="greek" src="./images/general/greece.png"> 
            </li>
            <li>
              <img data-language="english" src="./images/general/english.png"> 
            </li>
          </ul>
      </div>
      <div class="popup-insider">
        <img class="leaflet-mnimeio-popup" src=${i["image"]}>
        <p> ${i["name"]}</p>
        <div class="pop-insider__info">
        <a href="http://www.google.com/search?q=${i["name"]}&tbm=isch" target="_blank" class="leaflet-popup-see-more"><i class="fab fa-google"></i></a>
          <a href="${i["info"]}" target="_blank"><i class="fas fa-info-circle"></i></a>
        </div>
        

      </div>`,
        {
          minWidth: 250,
        }
      )
      .addTo(baseFeatureGroup2)
      .on("click", function (e) {
        mymap.setView(e.latlng);
      });
  });
  MARKERS_3.forEach(function (i) {
    marker = new L.marker([i["latitude"], i["longtitude"]], {
      icon: salonikiIcon,
      name: i["name"],
      name_en: i["name_en"],
    })
      .bindPopup(
        `
      <div class="popup-language">
          <ul>
            <li class="active">
              <img  data-language="greek" src="./images/general/greece.png"> 
            </li>
            <li>
              <img data-language="english" src="./images/general/english.png"> 
            </li>
          </ul>
      </div>
      <div class="popup-insider">
        <img class="leaflet-mnimeio-popup" src=${i["image"]}>
        <p> ${i["name"]}</p>
        <div class="pop-insider__info">
          <a href="http://www.google.com/search?q=${i["name"]}&tbm=isch" target="_blank" class="leaflet-popup-see-more"><i class="fab fa-google"></i></a>
          <a href="${i["info"]}" target="_blank"><i class="fas fa-info-circle"></i></a>
        </div>
        

      </div>`,
        {
          minWidth: 250,
        }
      )
      .addTo(baseFeatureGroup3)
      .on("click", function (e) {
        mymap.setView(e.latlng);
      });
  });
  MARKERS_4.forEach(function (i) {
    marker = new L.marker([i["latitude"], i["longtitude"]], {
      icon: cycladesIcon,
      name: i["name"],
      name_en: i["name_en"],
    })
      .bindPopup(
        `
      <div class="popup-language">
          <ul>
            <li class="active">
              <img  data-language="greek" src="./images/general/greece.png"> 
            </li>
            <li>
              <img data-language="english" src="./images/general/english.png"> 
            </li>
          </ul>
      </div>
      <div class="popup-insider">
        <img class="leaflet-mnimeio-popup" src=${i["image"]}>
        <p> ${i["name"]}</p>
        <div class="pop-insider__info">
          <a href="http://www.google.com/search?q=${i["name"]}&tbm=isch" target="_blank" class="leaflet-popup-see-more"><i class="fab fa-google"></i></a>
          <a href="${i["info"]}" target="_blank"><i class="fas fa-info-circle"></i></a>
        </div>
        

      </div>`,
        {
          minWidth: 250,
        }
      )
      .addTo(baseFeatureGroup4)
      .on("click", function (e) {
        mymap.setView(e.latlng);
      });
  });

  MARKERS_5.forEach(function (i) {
    marker = new L.marker([i["latitude"], i["longtitude"]], {
      icon: corfuIcon,
      name: i["name"],
      name_en: i["name_en"],
    })
      .bindPopup(
        `
      <div class="popup-language">
          <ul>
            <li class="active">
              <img  data-language="greek" src="./images/general/greece.png"> 
            </li>
            <li>
              <img data-language="english" src="./images/general/english.png"> 
            </li>
          </ul>
      </div>
      <div class="popup-insider">
        <img class="leaflet-mnimeio-popup" src=${i["image"]}>
        <p> ${i["name"]}</p>
        <div class="pop-insider__info">
          <a href="http://www.google.com/search?q=${i["name"]}&tbm=isch" target="_blank" class="leaflet-popup-see-more"><i class="fab fa-google"></i></a>
          <a href="${i["info"]}" target="_blank"><i class="fas fa-info-circle"></i></a>
        </div>
        

      </div>`,
        {
          minWidth: 250,
        }
      )
      .addTo(baseFeatureGroup5)
      .on("click", function (e) {
        mymap.setView(e.latlng);
      });
  });

  var items = $(".places__ul>li");

  mymap.on("move", function () {
    invisibleMarker.clearLayers();
    let marker = L.marker(
      [mymap.getCenter()["lat"], mymap.getCenter()["lng"]],
      {
        opacity: 0,
      }
    ).addTo(invisibleMarker);
    decision = isInside(marker, CIRCLES)["decision"];

    items.each(function () {
      if ($(this).text() == `${isInside(marker, CIRCLES)["name"]}`) {
        if ($(this).text() == "Agora") {
          weather_index = final_weather.findIndex(
            (item) => item.my_name == "Parthenon"
          );
          weather_index_forecast = final_weather_forecast.findIndex(
            (item) => item.my_name == "Parthenon"
          );
        } else {
          weather_index = final_weather.findIndex(
            (item) => item.my_name === $(this).text()
          );
          weather_index_forecast = final_weather_forecast.findIndex(
            (item) => item.my_name === $(this).text()
          );
        }

        if (weather_index != "-1") {
          $(".weather").css("display", "flex");
          city_name = final_weather[weather_index]["name"];
          temp = final_weather[weather_index]["temp"];
          icon = final_weather[weather_index]["icon"];
          alt = final_weather[weather_index]["alt"];
          $("#map > div.weather > div > p").text(city_name);
          $(".weather-inner").find("img").attr("src", icon);
          $(".weather-inner").find("img").attr("alt", alt);
          $(".celcius").html(`${temp}&#8451;`);
        }

        if (weather_index_forecast != "-1") {
          daily = final_weather_forecast[weather_index_forecast]["daily"];
          html = "";
          daily.slice(1, 4).map(function (i) {
            date = timeConverter(i["dt"]);
            max_temp = Math.floor(i["temp"]["max"]);
            desc = i["weather"][0]["description"];
            icon = i["weather"][0]["icon"];

            html += `
              <div class="weather-outer-day">
                <p class="date">${date}</p>
                <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}">
                <p>Μέγιστη: ${max_temp}&#8451;</p>
                <p class="text">${desc}</p>
              </div>
            
            `;
          });

          html += `
          <div class="text-center">
            <p>Ενημερώθηκε:</p>
            <span>
              ${msToTime(parseInt(localStorage.getItem("weather_time_call")))}
            </span>
          </div>`;
          $(".weather-outer").empty().append(html);
        }
      }
    });

    if (!decision) {
      items.removeClass("active");
    } else {
      items.each(function () {
        if ($(this).text() == `${isInside(marker, CIRCLES)["name"]}`) {
          $(this).addClass("active");
        }
      });
    }
  });

  items.on("click", function (e) {
    items.removeClass("active");
    $(this).addClass("active");
    lat = $(this).attr("data-lat");
    long = $(this).attr("data-long");
    if ($(this).text() == "Cyclades") {
      mymap.flyTo([lat, long], 9);
    } else if ($(this).text() == "Corfu") {
      mymap.flyTo([lat, long], 13);
    } else {
      mymap.flyTo([lat, long], 15);
    }
  });

  $(document).on("click", ".popup-language ul >li", function (e) {
    if (!$(this).hasClass("active")) {
      $(".popup-language ul >li").each(function (e) {
        $(this).removeClass("active");
      });
      $(this).addClass("active");

      if ($(this).find("img").attr("data-language") == "english") {
        texts = $(this).closest(".leaflet-popup-content").text().trim();

        index = ALL_MARKERS.findIndex((item) => item.name === texts);

        $(this)
          .closest(".leaflet-popup-content")
          .find(".popup-insider")
          .find("p")
          .text(`${ALL_MARKERS[index]["name_en"]}`);

        $(this)
          .closest(".leaflet-popup-content")
          .find(".popup-insider")
          .find(".pop-insider__info")
          .find(".leaflet-popup-see-more")
          .attr(
            "href",
            `https://google.com/search?q=${ALL_MARKERS[index]["name_en"]}&tbm=isch`
          );
        $(this)
          .closest(".leaflet-popup-content")
          .find(".popup-insider")
          .find(".pop-insider__info")
          .find("a:nth-child(2)")
          .attr("href", `${ALL_MARKERS[index]["info_en"]}`);
      } else {
        texts = $(this).closest(".leaflet-popup-content").text().trim();

        index = ALL_MARKERS.findIndex((item) => item.name_en === texts);

        $(this)
          .closest(".leaflet-popup-content")
          .find(".popup-insider")
          .find("p")
          .text(`${ALL_MARKERS[index]["name"]}`);

        $(this)
          .closest(".leaflet-popup-content")
          .find(".popup-insider")
          .find(".pop-insider__info")
          .find(".leaflet-popup-see-more")
          .attr(
            "href",
            `https://google.com/search?q=${ALL_MARKERS[index]["name"]}&tbm=isch`
          );

        $(this)
          .closest(".leaflet-popup-content")
          .find(".popup-insider")
          .find(".pop-insider__info")
          .find("a:nth-child(2)")
          .attr("href", `${ALL_MARKERS[index]["info"]}`);
      }
    }
  });

  $(document).on("click", ".far.fa-times-circle", function (e) {
    $(this)
      .closest("div")
      .fadeOut("normal", function () {
        $(this).closest("div").remove();
      });
  });

  $(".places__box i").on("click", function () {
    if ($(this).hasClass("fa-chevron-right")) {
      $("#places").css("transform", "translateX(100px)");
      $(this).css("left", "-20px");
      $(this).removeClass("fa-chevron-right").addClass("fa-chevron-left");
    } else {
      $("#places").css("transform", "translateX(0)");
      $(this).css("left", "0");
      $(this).removeClass("fa-chevron-left").addClass("fa-chevron-right");
    }
  });
  jQuery(".map_i").on("mouseenter", function () {
    jQuery(".map__tooltip").css("visibility", "visible");
    jQuery(".map__tooltip").css("opacity", "1");
  });
  jQuery(".map_i").on("mouseleave", function () {
    jQuery(".map__tooltip").css("visibility", "hidden");
    jQuery(".map__tooltip").css("opacity", "0");
  });

  jQuery(".search_text").on("click", function () {
    $(".search_screen__input").addClass("active");
    if ($(".ul_search_screen_results").children().length) {
      $(".search_screen_results").css("opacity", "1");
      $(".search_screen_results").css("visibility", "visible");
    }
  });
  jQuery(".search_screen__input i").on("click", function () {
    if ($(this).hasClass("active")) {
      Flickr(search_text.val());
      $(".search_screen_results").css("opacity", "1");
      $(".search_screen_results").css("visibility", "visible");
    }
  });
  search_text.on("keyup", function (e) {
    let search_text_length = $(this).val().length;

    if (search_text_length > 0) {
      $(".search_screen__input i ").addClass("active");
    } else {
      $(".search_screen__input i ").removeClass("active");
    }
    if (e.which == 13) {
      //ENTER Key
      if (search_text_length > 0) {
        e.preventDefault();
        $(".search_screen__input i").click();
        $(".search_screen_results").css("opacity", "1");
        $(".search_screen_results").css("visibility", "visible");
      }
    }
  });

  search.on("click", function () {
    left_side.css("transform", "translateX(-500px)");
    jQuery(".map").css("transform", "translateX(-500px)");
    jQuery(".info").css("transform", "translateX(-500px)");
    right_side.css("transform", "translateX(0)");
  });
  search_back.on("click", function () {
    left_side.css("transform", "translateX(0px)");
    jQuery(".info").css("transform", "translateX(0px)");
    jQuery(".map").css("transform", "translateX(0px)");
    right_side.css("transform", "translateX(500px)");
  });

  info.on("click", function () {
    modal.css("display", "block");
  });
  info_flickr.on("click", function () {
    $("#myModal_flickr").css("display", "block");
  });

  jQuery(".map_i").on("click", function () {
    DarkModeMap(dark, light, mymap);
    $("#myModal_map").css("display", "block");
    setTimeout(function () {
      mymap.invalidateSize();
    }, 100);
    mymap.eachLayer(function (layer) {
      if (layer.isPopupOpen()) {
        mymap.panTo(layer._latlng);
        layer.closePopup();
        layer.openPopup();
      }
    });
  });
  $(".close_flickr").on("click", function () {
    $("#myModal_flickr").css("display", "none");
  });

  modalclose.on("click", function () {
    modal.css("display", "none");
  });
  jQuery(".close_map").on("click", function () {
    jQuery("#myModal_map").css("display", "none");
  });

  $(window).on("click", function (e) {
    if (e.target == modal[0]) {
      modal.css("display", "none");
    }
    if (e.target == $("#myModal_flickr")[0]) {
      $("#myModal_flickr").css("display", "none");
    }

    if (e.target == $("#myModal_map")[0]) {
      $("#myModal_map").css("display", "none");
    }
    if (
      e.target == jQuery(".search_screen")[0] ||
      e.target == jQuery("body")[0]
    ) {
      $(".search_screen_results").css("visibility", "hidden");
      $(".search_screen_results").css("opacity", "0");
      $(".search_screen__input").removeClass("active");
    }
  });

  if ($("html").attr("data-theme") == "dark") {
    loading_gif.addClass("dark");
    $("#map > div.weather > div.weather-inner > span:nth-child(1)").css(
      "box-shadow",
      "0px 0px 10px 4px rgb(51 136 255)"
    );
  }
  checkbox.change(function () {
    let theme_preference = "";
    if ($(this).prop("checked")) {
      //dark mode
      theme_preference = "dark";
      $("html").attr("data-theme", theme_preference);
      loading_gif.addClass("dark");
      $("#map > div.weather > div.weather-inner > span:nth-child(1)").css(
        "box-shadow",
        "0px 0px 10px 4px rgb(51 136 255)"
      );
      $(
        "#uploadArea > div.input > div.upload-area__response > div > div > a:nth-child(1) > i"
      ).addClass("dark");
      $(".fab.fa-flickr").addClass("dark");
      resetbtn.addClass("dark");
      $(".reset .i").addClass("dark");
    } else {
      //light mode
      theme_preference = "light";
      $("html").attr("data-theme", theme_preference);
      $("#map > div.weather > div.weather-inner > span:nth-child(1)").css(
        "box-shadow",
        ""
      );
      loading_gif.removeClass("dark");
      $(
        "#uploadArea > div.input > div.upload-area__response > div > div > a:nth-child(1) > i"
      ).removeClass("dark");
      $(".fab.fa-flickr").removeClass("dark");
      resetbtn.removeClass("dark");
      $(".reset .i").removeClass("dark");
    }
    localStorage.setItem("theme", theme_preference);
  });

  uploadinput.on("click", function (ev) {
    ev.stopPropagation();
  });

  uploadzoon.click(function (ev) {
    uploadinput.click();
  });

  uploadzoon.on("dragleave", function (e) {
    e.preventDefault();
    e.stopPropagation();
    uploadzoon.removeClass("drop-zoon--over");
  });
  uploadzoon.on("dragover", function (e) {
    e.preventDefault();
    e.stopPropagation();
    uploadzoon.addClass("drop-zoon--over");
  });
  uploadzoon.on("dragenter", function (e) {
    e.preventDefault();
    e.stopPropagation();
    uploadzoon.addClass("drop-zoon--over");
  });
  uploadzoon.on("drop", function (e) {
    e.preventDefault();
    e.stopPropagation();
    uploadzoon.removeClass("drop-zoon--over");
    if (e.originalEvent.dataTransfer) {
      if (e.originalEvent.dataTransfer.files.length) {
        e.preventDefault();
        e.stopPropagation();
        const filex = e.originalEvent.dataTransfer.files[0];
        var fd = new FormData();
        fd.append("file", filex);
        uploadFile(filex, fd);
      }
    }
  });
  //Prevent on window dragging
  window.addEventListener(
    "dragover",
    function (e) {
      e.preventDefault();
    },
    false
  );
  window.addEventListener(
    "drop",
    function (e) {
      e.preventDefault();
    },
    false
  );

  resetbtn.on("click", function () {
    Reset();
    iconzoon.css("display", "block");
    paragraphzoon.css("display", "block");
    myFeatureGroup.clearLayers();
    mymap.setView(initial_mymap_center, initial_mymap_zoom);
    $(".drop-zoon__preview-image").attr("src", "#").css("display", "none");
  });

  uploadinput.on("change", function (ev) {
    file = ev.target.files[0];
    var fd = new FormData();
    fd.append("file", file);
    uploadFile(file, fd);
  });

  $(document).on("click", ".results__item", function () {
    let picture = $(this).find("img").attr("src");

    var xhr = new XMLHttpRequest();

    var url = picture;

    xhr.responseType = "blob";
    xhr.open("GET", url, true);

    xhr.onreadystatechange = function () {
      if (xhr.readyState == xhr.DONE) {
        saveAs(xhr.response, "image.jpeg");
      }
    };

    xhr.send();
  });
  $(document).on("click", "#loadMore", function () {
    let search_query = $(".photos_text").text();
    let number = parseInt($(".photos_page").text());
    let page_query = number + 1;

    Flickr(search_query, page_query);
  });

  $(".weather-inner > span:nth-child(1)").on("click", function () {
    $(this).find("i").toggleClass("fa-chevron-up");

    $(".weather-outer").toggleClass("active");
  });
  //Accordion Functionality
  var acordion = document.getElementsByClassName("accordion");

  var i;
  var len = acordion.length;
  for (i = 0; i < len; i++) {
    acordion[i].addEventListener("click", function () {
      this.classList.toggle("active");
      var panal = this.nextElementSibling;
      if (panal.style.maxHeight) {
        panal.style.maxHeight = null;
      } else {
        panal.style.maxHeight = panal.scrollHeight + "px";
      }
    });
  }

  function uploadFile(file, fd) {
    var fileTypes = ["jpg", "jpeg", "png"];

    var fileExtension = file.name.split(".").pop().toLowerCase();

    isFileAcceptable = fileTypes.indexOf(fileExtension) > -1;

    if (isFileAcceptable) {
      paragraphzoon.css("display", "none");
      iconzoon.css("display", "none");
      if ($(".messages-error").length) {
        $(".messages-error").fadeOut("normal", function () {
          $(this).remove();
        });
      }

      var reader = new FileReader();
      if (file) {
        reader.readAsDataURL(file);
        reader.addEventListener("loadend", function (e) {
          url = this.result;
          previewimage.attr("src", url).css("display", "block");
        });
        var exifLong = exifr.gps(file);

        exifLong
          .then(function (result) {
            myFeatureGroup.clearLayers();
            jQuery(".map_i").addClass("active");
            jQuery(".map__tooltip").text(
              "Ανοίξτε το χάρτη για να δείτε που τραβήξατε την φωτογραφία"
            );

            var pointer = L.marker([
              result["latitude"],
              result["longitude"],
            ]).addTo(myFeatureGroup);

            mymap.setView([result["latitude"], result["longitude"]], 15);

            inside = isInside(pointer, CIRCLES);

            fd.append("decision", inside["decision"]);
            fd.append("name", inside["name"]);

            Ajax(fd);
          })
          .catch(function () {
            Ajax(fd);
            jQuery(".map_i").removeClass("active");
            jQuery(".map__tooltip").text(
              "Η φωτογραφία σας δεν έχει γεωγραφικό πλάτος ή μήκος"
            );
          });
      }
    } else {
      if ($(".messages").children().length > 0) {
        $(".messages")
          .find("div")
          .each(function () {
            $(this).remove();
          });
      }
      var event = jQuery(".messages")
        .hide()
        .append(
          `<div class="messages-error">
            <i class="far fa-times-circle" style="margin-right:10px;cursor:pointer;" ></i>
            <p>Φαίνεται ότι δεν υποστηρίζουμε αυτήν τη μορφή αρχείου.</p>
          </div>`
        )
        .fadeIn(500);
      $.when(event).done(function () {
        setTimeout(() => {
          event.fadeOut();
        }, 3000);
      });
    }
  }

  function Ajax(fd) {
    jQuery.ajax({
      url: $("#form").attr("action"),
      type: "POST",
      dataType: "JSON",
      contentType: false,
      processData: false,
      data: fd,

      beforeSend: function () {
        loading_gif.fadeIn("slow");
        Reset();
      },
      success: function (res) {
        console.log(res);
        loading_gif.fadeOut("slow");
        if (typeof res["label"] != "undefined") {
          jQuery(".search_screen_error").css("display", "none");
          label.css("display", "inline-block").text(res["label"]);
          resetbtn.css("display", "inline-block");
          confidence
            .css("display", "inline-block")
            .text(Number(res["confidence"]).toFixed(2));
          confidence.after(
            `<img src='http://127.0.0.1:8887/output/export.jpg?${Math.random()}' alt="Image match" class="image__match" style="display:block;">`
          );
          $(".search-further").css("display", "block");
          $(
            "#uploadArea > div.input > div.upload-area__response > div > div > a:nth-child(1) > i"
          )
            .closest("a")
            .attr(
              "href",
              `https://google.com/search?q=${res["label"]}&tbm=isch`
            );
          $(".fab.fa-flickr")
            .closest("a")
            .attr(
              "href",
              `https://www.flickr.com/search/?text=${res["label"]}`
            );

          mymap.eachLayer(function (layer) {
            if (
              String(layer.options.name_en).includes(res["label"]) ||
              res["label"].includes(String(layer.options.name_en))
            ) {
              setTimeout(function () {
                mymap.invalidateSize();
              }, 1);
              layer.openPopup();

              return;
            }
          });
        } else {
          jQuery(".search_screen_error").css("display", "block");
        }
      },
    });
  }

  function Flickr(text, page) {
    if (typeof page == "undefined") {
      page = 1;
    }
    // console.log(page);
    const api_key = "API_KEY";
    var url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${api_key}&text=${text}&page=${page}&sort=relevance&content_type=1&geo_context=2&safe_search=1&per_page=20&format=json&&nojsoncallback=1`;

    $.ajax({
      url: url,
      type: "GET",
      beforeSend: function () {
        //
        $(".ul_search_screen_results").empty();
      },
      success: function (res) {
        // console.log(res);
        photos_page = res["photos"]["page"];
        photos_total_page = res["photos"]["pages"];
        photos = res["photos"]["photo"];

        const photos_text = jQuery(".photos_text");
        const photos_page_div = jQuery(".photos_page");
        const photos_total_page_div = jQuery(".photos_total_page");

        photos_text.text(`${text}`);
        photos_page_div.text(`${photos_page}`);
        photos_total_page_div.text(`${photos_total_page}`);

        if (photos.length) {
          photos.map(function (i) {
            let html = `<li class="results__item" data-id=${i["id"]}>`;
            var CurrentPhotoUrl =
              "https://farm" +
              i["farm"] +
              ".staticflickr.com/" +
              i["server"] +
              "/" +
              i["id"] +
              "_" +
              i["secret"] +
              ".jpg";
            html += `<img src="${CurrentPhotoUrl}">`;
            html += "</li>";
            $(".ul_search_screen_results").append(html);
          });
          $(".ul_search_screen_results").append(
            '<button class="load_more" id="loadMore" >Περισσότερα</button>'
          );
        } else {
          $(".ul_search_screen_results").prepend(
            `<p>Δεν βρέθηκαν φωτογραφίες με την λέξη-κλειδί <strong> ${search_text.val()}</strong></p>`
          );
        }
      },
    });
  }

  function isInside(pointer, circle) {
    let name = "";
    let d = 99999999999;

    circle.forEach(function (local_circle) {
      let local = L.circle([local_circle["lat"], local_circle["long"]], {
        radius: local_circle["radius"], //in meters
      });
      var final_d = mymap.distance(pointer.getLatLng(), local.getLatLng());

      if (final_d < d) {
        d = final_d;
        final_d = mymap.distance(pointer.getLatLng(), local.getLatLng());
        final_decision = final_d < local.getRadius();
        name = local_circle["name"];
      }
    });
    return {
      decision: final_decision,
      name: name,
    };
  }

  function DarkModeMap(dark, light, mymap) {
    if ($("html").attr("data-theme") == "dark") {
      mymap.removeLayer(light);
      dark.addTo(mymap);
    } else {
      mymap.removeLayer(dark);
      light.addTo(mymap);
    }
  }

  function differenceInHours(date1, date2) {
    var hours = Math.abs(date1 - date2) / 36e5;
    return Math.abs(hours);
  }

  function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = [
      "Ιαν",
      "Φεβ",
      "Μαρ",
      "Απρ",
      "Μαι",
      "Ιουν",
      "Ιουλ",
      "Αυγ",
      "Σεπ",
      "Οκτ",
      "Νοε",
      "Δεκ",
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();

    var time = date + " " + month + " " + year;
    return time;
  }

  function msToTime(s) {
    ms = new Date(s);

    currentHours = ("0" + ms.getHours()).slice(-2);
    currentMinutes = (ms.getMinutes() < 10 ? "0" : "") + ms.getMinutes();
    return currentHours + ":" + currentMinutes;
  }

  function Reset() {
    if ($(".image__match").length) {
      $(".image__match").remove();
    }
    if (label.css("display", "inline-block")) {
      label.css("display", "none");
    }
    if (confidence.css("display", "inline-block")) {
      confidence.css("display", "none");
    }
    if ($(".search-further").css("display", "block")) {
      $(".search-further").css("display", "none");
    }
    if (resetbtn.css("display", "inline-block")) {
      resetbtn.css("display", "none");
    }
    mymap.closePopup();
  }
});
