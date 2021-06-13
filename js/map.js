export default class Map {
    constructor(longitude, latitude, zoom, id, city) {
        this.longitude = longitude;
        this.latitude = latitude;
        this.zoom = zoom;
        this.id = id;
        this.city = city;
        this.markers = L.markerClusterGroup({
            iconCreateFunction: function (cluster) {
                return L.divIcon({
                    html: '<b class="mycluster">' +
                        cluster.getChildCount() + '</b>',
                    iconSize: L.point(40, 40)
                });

            }
        });

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

        this.getStations();
    }

    //Récupération des données JSON et création de marqueurs
    async getStations() {
        const response = await fetch('https://api.jcdecaux.com/vls/v1/stations?contract=' + this.city + '&apiKey=19db939c14d552b350876fb0d0948c01b1183b0a');
        const stations = await response.json();

        stations.forEach((station) => {

            // Paramètrage des marqueurs
            const LeafIcon = L.Icon.extend({
                options: {
                    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                    iconSize: [25, 41],
                    shadowSize: [41, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [0, -39]
                }
            })

            const popup = L.popup().setContent(
                "<b>" + station.address + "</b>" + '<br>' +
                "<b style='text-decoration: underline; font-weight : normal'>" + 'Station :' + "</b>" +
                "<b style='color: red'>" + ' ' + station.status + "</b>" + '<br>' +
                "<b style='text-decoration: underline; font-weight : normal'>" + 'Nombre de place total :' + "</b>" +
                "<b style='color: green'>" + ' ' + station.available_bike_stands + "</b>" +
                "<b style='font-weight : normal'>" + ' ' + 'vélos ;' + "</b>" + '<br>' +
                "<b style='text-decoration: underline; font-weight : normal'>" + 'Nombre de vélo disponible :' + "</b>" +
                "<b style='color: blue'>" + ' ' + station.available_bikes + "</b>" +
                "<b style='font-weight : normal'>" + ' ' + 'vélos ;' + "</b>" + '<br>' +
                "<button class='toggleBtn' style='border: none;'>" + 'Reservez ici votre vélo' + "</button>"
            );

            // Création et regroupemment de marqueurs pour chaque station

            if (station.status === 'CLOSED' || station.available_bikes === 0) {
                const redIcon = new LeafIcon({
                    iconUrl: 'img/colorIcons/redIcon.png'
                });

                const marqueur = L.marker([station.position.lat, station.position.lng], {
                    icon: redIcon
                });
                marqueur.bindPopup(popup);
                this.markers.addLayer(marqueur);

            } else if (station.status === 'OPEN' || station.available_bikes < 10) {
                const orangeIcon = new LeafIcon({
                    iconUrl: 'img/colorIcons/orangeIcon.png'
                });

                const marqueur = L.marker([station.position.lat, station.position.lng], {
                    icon: orangeIcon
                });
                marqueur.bindPopup(popup);
                this.markers.addLayer(marqueur);
                this.markers.on('click', (e) => {
                    let btn = document.querySelector('.toggleBtn');
                    btn.addEventListener('click', () => {
                        console.log('oui!');
                        //let 
                    })
                    
                });

            } else {
                const greenIcon = new LeafIcon({
                    iconUrl: 'img/colorIcons/greenIcon.png'
                });

                const marqueur = L.marker([station.position.lat, station.position.lng], {
                    icon: greenIcon
                });
                marqueur.bindPopup(popup);
                this.markers.addLayer(marqueur);
            }

            this.map.addLayer(this.markers);
        });
    }
}
