<?php require_once __DIR__ . '/header.php'; ?>
<!-- Design inspired by: https://codepen.io/Ali-Majed/pen/BaRoyrG  -->
<div class="mode">
    <input type="checkbox" class="checkbox" id="chk" />
    <label class="label" for="chk">
        <i class="fas fa-sun"></i>
        <i class="fas fa-moon"></i>
        <div class="ball"></div>
    </label>
</div>
<div class="messages"></div>

<div id="uploadArea" class="upload-area">
    <div class="map">
        <i class="fas fa-map-marked-alt map_i"></i>
        <span class="map__tooltip">Εισάγεται φωτογραφία με γεωγραφικό πλάτος ή μήκος</span>
    </div>

    <div class="info">
        <i class="fas fa-info-circle"></i>
    </div>
    <div class="input">
        <div class="upload-area__header">
            <h1 class="upload-area__title">Ανεβάστε την φωτογραφία σας</h1>
            <strong class="upload-area__tooltip">
                Τι μορφή υποστήριζει;
                <span class="upload-area__tooltip-data">
                    jpeg, .jpg, .png
                </span>
            </strong>
        </div>
        <div class="upload-area__drop-zoon">
            <span class="drop-zoon__icon">
                <i class="fas fa-image"></i>
            </span>
            <p class="drop-zoon__paragraph">Κάντε drop το αρχείο σας ή κλικ για να βρείτε το αρχείο σας</p>
            <form action="submit.php" id="form" method="POST" enctype="multipart/form-data">
                <input class="drop-zoon__file-input" type="file" name=file" id="file"
                    accept="image/png, image/jpg, image/jpeg">
            </form>
            <img src="#" alt="Preview Image" id="previewImage" class="drop-zoon__preview-image" draggable="false">

        </div>
        <div class="upload-area__response">
            <img src="./images/general/loading.gif" alt="Loading" class="loading-gif">

            <p class="label"></p>
            <p class="confidence"></p>
            <p class="search_screen_error" style="display:none !important">Προέκυψε σφάλμα, παρακαλώ δοκιμάστε ξανά
                αργότερα</p>


            <div class="search-further">
                <p>Βρείτε περισσότερες φωτογραφίες στα:</p>
                <div class="search-further__icons">
                    <a href="#" target="_blank">
                        <i class="fab fa-google"></i>
                    </a>
                    <a href="#" target="_blank">
                        <i class="fab fa-flickr"></i>
                    </a>
                </div>
            </div>
            <button class="reset"><i class="fas fa-undo"></i>Επαναφορά</button>

        </div>
        <button class="search">Αναζήτηση στο Flickr</button>
    </div>
    <div class="search_screen">
        <div class="info_flickr">
            <i class="fas fa-info-circle"></i>
        </div>
        <p>Αναζήτηση στο Flickr</p>
        <div class="search_screen__input">
            <input type="text" name="search_text" id="search_text" class="search_text" placeholder="Αναζήτηση...">
            <i class="fas fa-search"></i>
        </div>
        <div class="search_screen_results">
            <div class="debug-mode" style="display:none">
                <p class="photos_text" style="display:none !important"></p>
                <p class="photos_page" style="display:none !important"></p>
                <p class="photos_total_page" style="display:none !important"></p>

            </div>
            <div class="ul">
                <ul class="ul_search_screen_results">

                </ul>

            </div>
        </div>

        <button id="search_back" class="search">Πίσω</button>

    </div>



</div>


</div>

<div class="footer__info">
    <p>Made with <span><i class="fas fa-heart"></i></span> by Ilias Thalassochoritis</p>
</div>
<div id="myModal_map" class="modal">
    <div class="modal-content">
        <span class="close_map">&times;</span>
        <div id="map">
            <div class="weather">
                <div class="weather-inner">
                    <span><i class="fas fa-chevron-down"></i></span>

                    <p class="name"></p>
                    <img src="#" alt="">
                    <span class="celcius"></span>
                </div>
                <div class="weather-outer">
                    Δεν υπάρχουν δεδομένα
                </div>
            </div>
            <div class="places" id="places">
                <div class="places__box">
                    <i class="fas fa-chevron-right"></i>
                    <ul class="places__ul">
                        <p style="text-align:center;">Clusters</p>

                    </ul>
                </div>
            </div>
        </div>

    </div>
</div>
<div id="myModal_flickr" class="modal">
    <div class="modal-content">
        <span class="close_flickr">&times;</span>
        <div class="container">
            <h2>Οδηγίες χρήσης</h2>
            <div class="accordion">
                <h5>Τι είναι το Flickr;</h5>
                <i class="fas fa-minus"></i>
                <i class="fas fa-plus"></i>
            </div>
            <div class="panal">
                <p>Το Flickr (προφέρεται Φλίκερ) είναι μια ιστοσελίδα, η οποία δημιουργήθηκε για να φιλοξενεί
                    φωτογραφίες
                    και βίντεο. Δημιουργήθηκε αρχικά από την εταιρία Ludicorp και ύστερα εξαγοράστηκε από την Yahoo!. Η
                    υπηρεσία χρησιμοποιείται συχνά από bloggers για να ενσωματώσουν το περιεχόμενο τους στα blogs ή στις
                    σελίδες τους.
                    Τον
                    Σεπτέμβριο του 2010, το Flickr έφτασε τα 5 δις. φωτογραφιών. Αρκετές από τις φωτογραφίες του Flickr
                    κυκλοφορούν υπό την άδεια Creative Commons. Η εγγραφή στην ιστοσελίδα μπορεί να είναι είτε δωρεάν
                    είτε
                    επί
                    πληρωμή, η οποία παρέχει περισσότερα δικαιώματα στους χρήστες του.</p>
            </div>

            <div class="accordion">
                <h5>Πως βρίσκω φωτογραφίες;</h5>
                <i class="fas fa-minus"></i>
                <i class="fas fa-plus"></i>
            </div>
            <div class="panal">
                <img src="./tutorial-images/flickr/flickr_01.png" alt="Search Flickr screen">
                <p>
                    Στην παραπάνω φωτογραφία βλέπουμε το πεδίο "Αναζήτηση". Στο πλαίσιο πληκτρολογούμε μια λέξη-κλειδί
                    της
                    τοποθεσίας από την οποία θέλουμε να κατεβασούμε την φωτογραφία και είτε πατάμε το πλήκτρο "Enter"
                    είτε κλικ
                    στον
                    μεγεθυντικό φακό.
                </p>
                <img src="./tutorial-images/flickr/flickr_02.png" alt="Flickr with results screen">
                <p>
                    Έπειτα, μας εμφανίζονται σχετιζόμενες φωτογραφίες σύμφωνα με την λέξη-κλειδί που αναζητήσαμε.
                    Αρχικά, μας
                    εμφανίζονται 20 φωτογραφίες. Αν θέλουμε περισσότερα αποτελέσματα φωτογραφίων, στο τέλος της λίστας,
                    θα βρούμε
                    ένα κουμπί "Περισσότερα", το οποίο θα μας εμφανίσει 20 επιπλέον αποτελέσματα φωτογραφιών.
                    <br>
                    Αφού επιλέξουμε την φωτογραφία που θέλουμε, με αριστερό κλικ την κατεβάζουμε στον υπολογιστή μας.
                    <br>
                    Για να την δοκιμάσουμε με το μοντέλο μας, πατάμε το κουμπί "Πίσω" και ακολουθούμε εκεί τις δοθείσες
                    οδηγίες.
                </p>
            </div>

            <div class="accordion">
                <h5>Δεν βρέθηκαν φωτογραφίες</h5>
                <i class="fas fa-minus"></i>
                <i class="fas fa-plus"></i>
            </div>
            <div class="panal">
                <p>Άν εμφανιστεί το μήνυμα "Δεν βρέθηκαν φωτογραφίες", παρακαλώ προσπαθείστε να ψάξετε με άλλη
                    λέξη-κλειδί.Αν ωστόσο, δεν σας εμφανιστούν φωτογραφίες και πάλι, το πιθανότερο είναι να υπάρχει
                    πρόβλημα
                    από
                    την πλευρά του Flickr. Προσπαθήστε ξανά αργότερα.</p>
            </div>

            <div class="accordion">
                <h5>Δεν βρήκα αυτό που έψαχνα</h5>
                <i class="fas fa-minus"></i>
                <i class="fas fa-plus"></i>
            </div>
            <div class="panal">

                <p>Δεν βρήκατε αυτό που ψάχνατε ή αντιμετωπίζετε κάποιο πρόβλημα τεχνικής φύσεως;
                    Μην διστάσετε να στείλετε ένα e-mail στην διεύθυνση
                    <a href="#" class="cryptedmail" data-name="ithalassochoritis" data-domain="uth" data-tld="gr"
                        onclick="window.location.href = 'mailto:' + this.dataset.name + '@' + this.dataset.domain + '.' + this.dataset.tld; return false;">
                    </a>
                </p>

            </div>


        </div>



    </div>
</div>
<div id="myModal" class="modal">
    <div class="modal-content">
        <span class="close">&times;</span>
        <div class="container">
            <h2>Συχνές ερωτήσεις</h2>
            <div class="accordion">
                <h5>Σκοπός ιστοσελίδας</h5>
                <i class="fas fa-minus"></i>
                <i class="fas fa-plus"></i>
            </div>
            <div class="panal">
                <p>Η παρούσα σελίδα υλοποιήθηκε για την πτυχιακή εργασία του φοιτητή Ηλία Νικόλαου Θαλασσοχωρίτη με θέμα
                    "Ανάκτηση εικόνων με χρήση Σιαμαίου Νευρωνικού Δικτύου βαθιάς μάθησης και γεωχωρικής πληροφορίας".
                    Η εργασία πραγματεύεται την εύρεση ομοιότητας μεταξύ μίας φωτογραφίας που ανεβάζει ο χρήστης και
                    μίας
                    φωτογραφίας αποθηκευμένης σε μία δική μας βάση δεδομένων με χρήση Σιαμαίων Νευρωνικών δικτύων και
                    Συνελικτικών Νευρωνικών δικτύων. Αυτό πραγματοποιείται με την χρήση πέντε(5) προ-εκπαιδευμένων
                    μοντέλων, για τα πέντε(5) γεωγραφικά συμπλέγματα που έχουμε επιλέξει.

                </p>
            </div>

            <div class="accordion">
                <h5>Χαρακτηριστικά της εφαρμογής</h5>
                <i class="fas fa-minus"></i>
                <i class="fas fa-plus"></i>
            </div>
            <div class="panal">
                <ol>
                    <li>Dark Mode</li>
                    <li>Υποστήριξη φωτογραφίων (μορφής JPG,JPEG και PNG) με χρήση GPS συντεταγμένων.</li>
                    <li>Δυνατότητα "drag and drop" για μεγαλύτερη ευκολία χωρίς την ανάγκη εύρεσης της φωτογραφίας μέσω
                        ευρετηρίων.</li>
                    <li>Χάρτης με σημεία ενδιαφέροντος, άμεση πρόσβαση σε πληροφορίες και φωτογραφίες σε Αγγλικά και
                        Ελληνικά.</li>
                    <li>Καιρός ανα γεωγραφικό σύμπλεγμα, με πρόβλεψη έως τις επόμενες τρεις(3) ημέρες.</li>
                    <li>Άμεση μετατόπιση σε κάθε γεωγραφικό σύμπλεγμα του χάρτη με ένα(1) κλικ.</li>
                    <li>Άμεση αναζήτηση στο Flickr, με αριθμό αποτελεσμάτων χωρίς περιορισμούς. Δυνατότητα λήψης
                        φωτογραφίων όσες με την ευκόλια ενός(1) κλικ.</li>
                    <li>Οδηγίες χρήσης και συχνές ερωτήσεις σε μορφή "pop-up" και "accordion".</li>
                </ol>
            </div>


            <div class="accordion">
                <h5>Πως λειτουργεί;</h5>
                <i class="fas fa-minus"></i>
                <i class="fas fa-plus"></i>
            </div>
            <div class="panal">
                <p>Ο χρήστης έχει προβεί στην λήψη μιας φωτογραφίας από ένα ιστορικό κτίριο ή από ένα σημείο
                    ενδιαφέροντος. Στο
                    πεδίο <strong>"Κάντε drop το αρχείο σας ή κλικ για να βρείτε το αρχείο σας"</strong> (βλ. παρακάτω
                    εικόνα),ο χρήστης
                    είτε σέρνει (drag and drop) την φωτογραφία του, είτε κάνει κλικ για να την βρει μέσα από το κινητό
                    του ή τον υπολογιστή του και να την ανεβάσει. </p>

                <img src="./tutorial-images/flickr/flickr_04.jpg" alt="First screen">

                <p>Η εφαρμογή μας αναγνωρίζει αν η δοθείσα φωτογραφία περιέχει μετα-δεδομένα GPS συντεταγμένων ή όχι.
                    Στην περίπτωση που η
                    φωτογραφία περιέχει GPS, τότε αυτή εμφανίζεται στον χάρτη. Τοποθετώντας τον κέρσορα στο εικονίδιο
                    του χάρτη <img src="./tutorial-images/flickr/map_icon.jpg" alt="map icon">
                    <br> θα εμφανιστεί το
                    μήνυμα <strong>"Ανοίξτε το χάρτη για να δείτε που τραβήξατε την φωτογραφία"</strong> (βλ. παρακάτω
                    φωτογραφία)
                </p>
                <img src="./tutorial-images/flickr/flickr_05.jpg" alt="success image with gps">

                <p>Αντίθετα, αν η φωτογραφία μας δεν περιέχει GPS συντεταγμένες, τότε το μήνυμα που θα εμφανιστεί θα
                    είναι το εξής
                    <strong>"Η
                        φωτογραφία σας δεν έχει γεωγραφικό πλάτος ή μήκος"</strong>
                </p>

                <p>Αφού έχουμε ανεβάσει την φωτογραφία μας, είτε με διαθέσιμες GPS συντεταγμένες είτε όχι, η εφαρμογή
                    μας, μας επιστρέφει, μια ονομασία, μια Ευκλείδεια απόσταση και μια φωτογραφία. (βλ. παρακάτω είκονα)

                    <img src="./tutorial-images/flickr/flickr_06.jpg" alt="Results screen">

                <p>Η ονομασία, είναι η ετικέτα (σημείο ενδιαφέροντος) της δοθείσας φωτογραφίας την οποία έχει
                    ταξινομήσει ο αλγόριθμος. Έπειτα,
                    το δεκαδικό νούμερο που έχει ήδη εμφανιστεί αποτελεί μια Ευκλείδεια απόσταση. Όσο πιο κοντά είναι
                    αυτό το
                    νούμερο
                    στο 0, τόσο μεγαλύτερη ακρίβεια υπάρχει μεταξύ των δύο(2) φωτογραφιών. Τέλος, ο αλγόριθμος μας
                    εμφανίζει την φωτογραφία με
                    την οποία έκανε "ζεύγος" (match) που έχει αντλήσει από την βάση δεδομένων. </p>

                <p>Ολοκληρώνοντας, οι δύο(2) ενδείξεις, οι οποίες παραπέμπουν, η μια στο Google και η άλλη στο Flickr,
                    μας
                    μεταφέρουν στην αντίστοιχη ιστοσελίδα, στην οποία μπορούμε να δούμε περισσότερες φωτογραφίες από το
                    ιστορικό μνημείο ή σημείο ενδιαφέροντος. Τέλος, υπάρχει το κουμπί <strong>"Επαναφορά"</strong>
                    στην περίπτωση που θέλουμε να δώσουμε μια άλλη φωτογραφία και να αρχίσουμε την εφαρμογή από την
                    αρχή.</p>
                </p>

                <p>Στην επόμενη καρτέλα, θα δούμε πως
                    λειτουργεί ο χάρτης και ποια είναι τα χαρακτηριστικά του.
                </p>
            </div>

            <div class="accordion">
                <h5>Χάρτης</h5>
                <i class="fas fa-minus"></i>
                <i class="fas fa-plus"></i>
            </div>
            <div class="panal">
                <p>
                    Ο χάρτης Leaflet είναι η κορυφαία JavaScript βιβλιοθήκη ανοιχτού κώδικα για διαδραστικούς χάρτες. Σε
                    αυτό τον χάρτη θα απεικονίσουμε τα γεωγραφικά μας συμπλέγματα, τα σημεία ενδιαφέροντος, τον καιρό
                    για
                    κάθε γεωγραφικό σύμπλεγμα καθώς και έναν πίνακα με όλα τα γεωγραφικά μας συμπλέγματα με δυνατότητα
                    άμεσης
                    μετατόπισης.

                </p>

                <img src="./tutorial-images/leaflet/leaflet_01.jpg" alt="Leaflet map">

                <p>
                    Στην αριστερή πλευρά, από πάνω προς τα κάτω, βλέπουμε δύο(2) κουμπιά για μεγένθυση και σμίκρυνση του
                    χάρτη, ενώ από κάτω απεικονίζεται ο καιρός του εκάστοτε γεωγραφικού συμπλέγματος, το εικονίδιο
                    καιρού,
                    και η
                    μέγιστη θερμοκρασία σε βαθμούς Κελσίου.
                    Πατώντας το βελάκι, μας ανοίγεται ένα παράθυρο το οποίο μας εμφανίζει την πρόβλεψη του καιρού για
                    τις
                    επόμενες τρεις(3) ημέρες, με την μέγιστη αναγραφόμενη θερμοκρασία ανα ημέρα.


                    Στη δεξιά πλευρά, έχουμε το παράθυρο με όλα τα γεωγραφικά συμπλέγματα. Πατώντας σε κάποιο από αυτά,
                    μας
                    παραπέμπει στο εκάστοτε γεωγραφικό σύμπλεγμα εκτελώντας μια ομαλή κίνηση.
                </p>

                <p>Κάνοντας κλικ σε κάποιο από τα σημεία ενδιαφέροντος, μας εμφανίζεται ένα παράθυρο με μια φωτογραφία
                    του σημείου ενδιαφέροντος, την ονομασία του και τέλος εμφανίζονται δύο(2) κουμπιά. Το πρώτο, το
                    οποίο είναι το
                    λογότυπο της Google, μας παραπέμπει στα αποτελέσματα φωτογραφιών της Google προκειμένου να δούμε
                    περισσότερες
                    φωτογραφίες για το σημείο
                    ενδιαφέροντος. Το δεύτερο κουμπί, είναι το λογότυπο των πληροφοριών (i) και μας μεταφέρει σε μια
                    ιστοσελίδα
                    με πληροφορίες για το εκάστοτε σημείο. (βλ. παρακάτω εικόνα).

                    Επιπλέον, αριστερά βλέπουμε δύο σημαίες. Την Ελληνική, η οποία είναι και προεπιλεγμένη, και την
                    Αγγλική. Αλλάζοντας γλώσσα, αλλάζουν αντίστοιχα και το όνομα του σημείου, καθώς και οι ιστοσελίδες
                    στις οποίες παραπέμπουν τα δύο κουμπιών.

                </p>


                <img src="./tutorial-images/leaflet/leaflet_03.jpg" alt="Marker popup">
                <h4>Η φωτογραφία μας διαθέτει GPS συντεταγμένες;</h4>
                <p>Στην περίπτωση που η φωτογραφία μας διαθέτει GPS συντεταγμένες, ο χάρτης έχει μεγενθύνει σε αυτό
                    το σημείο και έχει προστεθεί ένα σημείο(marker) επάνω στον χάρτη.(βλ.παρακάτω φωτογραφία)</p>
                <img src="./tutorial-images/leaflet/leaflet_02.jpg" alt="Marker on map">
                <h4>Η φωτογραφία μας δεν διαθέτει GPS συντεταγμένες;</h4>
                <p>Στην περίπτωση που η φωτογραφία μας δεν διαθέτει GPS συντεταγμένες, ο χάρτης παραμένει στο
                    επίπεδο μεγένθυσης που το έχουμε αφήσει χωρίς κάποια αλλαγή.</p>

                <p>Καθώς ανεβάζουμε μια φωτογραφία στην εφαρμογή και μας εμφανιστούν τα αποτελέσματα, ο χάρτης θα έχει
                    μεγενθύνει στο σημείο ενδιαφέροντος, με το οποίο πραγματοποιήθηκε το "ζεύγος"(match)
                    καθώς και το παράθυρό
                    του
                    με τις πληροφορίες, δίνοντας την δυνατότητα στον χρήστη να δει περισσότερες πληροφορίες για το
                    αντίστοιχο σημείο.
                </p>
            </div>


            <div class="accordion">
                <h5>Dark Mode</h5>
                <i class="fas fa-minus"></i>
                <i class="fas fa-plus"></i>
            </div>
            <div class="panal">

                <p>Η ώρα που περνάτε μπροστά από οθόνες καταλαμβάνει ένα σημαντικό ποσοστό της καθημερινότητάς σας.
                    Σκοπός αυτής της συνειδητοποίησης είναι να σκεφτείτε ότι αλληλεπιδράτε με τις οθόνες πολύ
                    περισσότερο από ό, τι νομίζετε, να μάθετε πώς επηρεάζουν την υγεία σας και ποιος είναι ο
                    ασφαλέστερος τρόπος για να τις χρησιμοποιείτε. Σκεφτείτε το ως self-care σχετιζόμενο με την
                    τεχνολογία.
                </p>

                <p>Το dark mode είναι μια επιλογή που χρησιμοποιεί σκούρο χρώμα αντί για φωτεινό και μειώνει
                    την κούραση των ματιών, την αντανάκλαση και το blue light. Πλέον,δεν υπάρχει συσκευή που να μην
                    προσφέρει αυτή την επιλογή.
                </p>

                <p>

                    "Με τους περισσότερους ανθρώπους να περνούν τον χρόνο τους μέσα στην ημέρα μπροστά από οθόνες, η
                    συνεχής έκθεση στο μπλε φως έχει επιπτώσεις στην όραση και την υγεία" λέει ο Justin Barrett,
                    διευθύνων σύμβουλος της Healthe, μιας εταιρείας που δημιουργεί τεχνολογία ασφαλή για τα μάτια. "Το
                    blue light που εκπέμπουν οι οθόνες έχει συνδεθεί με πολλές παθήσεις των ματιών αλλά και με
                    διαταραχές ύπνου (καθώς αλλάζει το βιολογικό ρολόι), που οδηγούν σε επίμονη κόπωση και μειωμένη
                    όρεξη. Θα πρέπει να είμαστε προσεκτικοί με τις μακροπρόθεσμες επιπτώσεις και τη συσσωρευμένη έκθεση
                    σε LED οθόνες" τονίζει.

                </p>

                <p>Για τον λόγο αυτό, έχουμε προσθέσει την λειτουργία "Dark Mode" στην ιστοσελίδα μας. Μπορείτε να την
                    ενεργοποιήσετε κάνοντας κλικ στο επάνω δεξι μέρος της ιστοσελίδας (βλ.παρακάτω φωτογραφία). Την
                    επόμενη φορά που θα επισκεφτείτε την ιστοσελίδα μας, θα έχει αποθηκευτεί
                    τοπικά η επιλογή σας.

                </p>
                <figure>
                    <img src="./tutorial-images/dark_mode_activation.jpg" alt="Dark mode activation toggle">
                    <figcaption class="text-center">Κουμπί εναλλαγής από Light σε Dark Mode</figcaption>
                </figure>
                <figure>
                    <img src="./tutorial-images/dark_mode.jpg" alt="Dark Mode preview">
                    <figcaption class="text-center">Η ιστοσελίδα μας με ενεργοποιημένο Dark Mode </figcaption>
                </figure>
                <a href="https://www.harpersbazaar.gr/living/lifestyle-homes/11754/ti-einai-to-dark-mode-pos-to-xrisimopoieite-kai-giati-to-xreiazeste-stis-suskeues-sas"
                    target='_blank'>
                    Πηγή</a>

            </div>

            <div class="accordion">
                <h5>Δεν βρήκα αυτό που έψαχνα</h5>
                <i class="fas fa-minus"></i>
                <i class="fas fa-plus"></i>
            </div>
            <div class="panal">
                <p>
                    Δεν βρήκατε αυτό που ψάχνατε ή αντιμετωπίζετε κάποιο πρόβλημα τεχνικής φύσεως;
                    Μην διστάσετε να στείλετε ένα e-mail στην διεύθυνση
                    <a href="#" class="cryptedmail" data-name="ithalassochoritis" data-domain="uth" data-tld="gr"
                        onclick="window.location.href = 'mailto:' + this.dataset.name + '@' + this.dataset.domain + '.' + this.dataset.tld; return false;">
                    </a>

                </p>



            </div>

        </div>



    </div>
</div>





<?php require_once __DIR__ . '/footer.php'; ?>