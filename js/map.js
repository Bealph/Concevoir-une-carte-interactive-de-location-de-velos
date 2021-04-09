export default class Map{
    constructor (longitude, latitude, zoom, id, city) {
        this.longitude = longitude;
        this.latitude = latitude;
        this.zoom = zoom;
        this.id = id;
        this.city = city;
        this.marker = null;

        this.yourAddress = document.getElementById('votreAdresse');
        this.bikeNumber = document.getElementById('nombreVelo');
        this.placeNumber = document.getElementById('nombrePlace');

        // initialisation de la map
        this.map = L.map(this.id).setView([this.longitude, this.latitude], this.zoom);

        // Generation de tuiles pour afficher la carte
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery � <a href="https://www.mapbox.com/">Mapbox</a>',
            minZoom: 1,
            maxZoom: 20,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoiYWxiZWEiLCJhIjoiY2tmbHVqcmxsMTRnNDMwcWhoOHFzdnRpaiJ9.iJ7K7Eh3e2RgEjJApi7LNA'
        }).addTo(this.map);

        // définition des marqueurs
        this.greenIcon = L.icon({
            inconUrl: 'img/marqueurs/vert.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            shadowSize: [41, 41]
        });

        this.redIcon = L.icon({
            inconUrl: 'img/marqueurs/rouge.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            shadowSize: [41, 41]
        });

        this.orangeIcon = L.icon({
            inconUrl: 'img/marqueurs/orange.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            shadowSize: [41, 41]
        });

        this.initMap();
    }

    //Récupération des données JSON et création de marqueurs
    initMap(){
        let ajax1 = new Ajax();
        let lo = this;

        ajax1.ajaxGet('https://api.jcdecaux.com/vls/v1/stations?contract=' + this.city + '&apiKey=19db939c14d552b350876fb0d0948c01b1183b0a',
        function (reponse) {
            let stations = JSON.parse(reponse);
            stations.forEach(function (station) {
                
                // Création de marqueurs pour chaque station
                if (station.status === 'CLOSED' || station.available_bikes === 0) {
                    lo.marker = L.marker((station.position), { 
                        icon: lo.redIcon 
                    });
                } else if (station.status === 'OPEN' || station.available_bikes < 6) {
                    lo.marker = L.marker((station.position), { 
                        icon: lo.orangeIcon 
                    });
                } else {
                    lo.marker = L.marker((station.position), {
                        icon: lo.orangeIcon
                    });
                }
                
                lo.marker.addTo(lo.map).bindPopup(station.name);

                lo.popupInformation(station.address, station.available_bikes, station.bikes_stands);
            });
        });
    }

    popupInformation(address, bike, place){
        this.marker.addEventListener('click', () => {
            this.yourAddress.textContent = address;
            sessionStorage.setItem('address', this.yourAddress.textContent);
            this.placeNumber.innerHTML = "Nombre de places total : " + " " + place;
            this.bikeNumber.textContent = "Nombre de vélo(s) disponible : " + " " + bike;
        });
    }
}
