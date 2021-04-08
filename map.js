//################# CARTE #################################//
const lat = 48.692054;
const lon = 6.184417;

// Initialiser ma carte
let carte = L.map("maCarte").setView([lat, lon], 12);

// Generer les tuiles pour afficher la carte
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery � <a href="https://www.mapbox.com/">Mapbox</a>',
    minZoom: 1,
    maxZoom: 20,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYWxiZWEiLCJhIjoiY2tmbHVqcmxsMTRnNDMwcWhoOHFzdnRpaiJ9.iJ7K7Eh3e2RgEjJApi7LNA'
}).addTo(carte);

// Permet l'affichage des positions sur la carte
const url = 'https://api.jcdecaux.com/vls/v1/stations?contract=Nancy&apiKey=19db939c14d552b350876fb0d0948c01b1183b0a';

fetch('https://api.jcdecaux.com/vls/v1/stations?contract=Nancy&apiKey=19db939c14d552b350876fb0d0948c01b1183b0a') // R�cup�rer des donn�es depuis l'API JCDECAUX
    .then((resp) => resp.json()) // Transforme les donn�es de l'API en json
    .then(function (donnees) {

    // Permet de grouper les marqueurs
        let GroupMarqueur = L.markerClusterGroup({//regrouper les marqueurs
            maxClusterRadius: 100,
            iconCreateFunction: function (cluster) {
                return L.divIcon({ html: '<div><span>' + cluster.getChildCount() + '</span></div>', className: 'mycluster', iconSize: L.point(35, 35) });
            }
        });

        function staVelo() {
            for (let elem of donnees) {

                let customPopup1 = "<b style='font-weight : bold'>" + elem.address + "</b>" + '<br>',
                    customPopup2 = "<b style='text-decoration: underline; font-weight : normal'>" + 'Station :' + "</b>",
                    customPopup3 = "<b style='color: red'>" + ' ' + elem.status + "</b>" + '<br>',
                    customPopup4 = "<b style='text-decoration: underline; font-weight : normal'>" + 'Parking :' + "</b>",
                    customPopup5 = "<b style='color: green'>" + ' ' + elem.available_bike_stands + "</b>",
                    customPopup0 = "<b style='font-weight : normal'>" + ' ' + 'velos ;' + "</b>" + '<br>',
                    customPopup6 = "<b style='text-decoration: underline; font-weight : normal'>" + 'Disponible :' + "</b>",
                    customPopup7 = "<b style='color: blue'>" + ' ' + elem.available_bikes + "</b>",
                    customPopup8 = "<a href='#station_heading' class='btnResa'>" + 'Reservez' + "</a >";

                let popup = customPopup1 + customPopup2 + customPopup3 + customPopup4 + customPopup5 + customPopup0 + customPopup6 + customPopup7 + customPopup0 + customPopup8;

                let marqueur = L.marker([elem.position.lat, elem.position.lng]).bindPopup(popup);

                GroupMarqueur.addLayer(marqueur);
            }
            return false;
        }
        staVelo();

        // ajoutons ensuite une couche � la carte
        carte.addLayer(GroupMarqueur);

    });


//carte.on('popupopen', function () {
let btn = document.getElementsByClassName("btnResa");
const divStaInfo = document.getElementById("#form_container");
const divformResa = document.querySelector("#station_heading");

btn.addEventListener('click', function () {
    //alert('btn');

   //if (divStaInfo.style.display == "block") {
        divStaInfo.style.display = "none";
        divformResa.style.display = "block";
   /* } else {
        divStaInfo.style.display = "block";
    }*/

});
    

        //document.body.nodeType(document.body.childNodes[7].childNodes[1]
        //.parentElement.children[1].childNodes[1].childNodes[0].childNodes[5]
        //.NodeList(2).className("btnResa"));
    //alert('btn');
//});





/*
        //iconUrl: "./img/velo_icon.png",
}*/
/*
// Personnalisons les marqueurs
let icone = L.icon({
    function markerIcon(isOpen) {
    if (isOpen == "OPEN") {
        return "http://google.com/mapfiles/ms/micons/green-dot.png";
    } else {
        return "http://google.com/mapfiles/ms/micons/red-dot.png";
    }
    iconSize: [50, 50],
    iconAnchor: [25, 50],
    popupAnchor: [0, -46]  //Placer le popup au-dessus du marqueur
})
*/











