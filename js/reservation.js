class Reservation {
    constructor() {
        this.formResa = document.querySelector('#form_velo');
        this.myResaForm();

        this.mySubmit = document.querySelector('.submit');

        this.reservationBtn = document.querySelector("#submit_canvas");

   

        this.decomptCompteur();



    }

    myResaForm() {
        this.formResa.addEventListener("submit", (e) => {

            let canvasBloc = document.querySelector("#canvas");
            let blocInfoStation = document.querySelector('#station_heading');

            if (canvasBloc.style.display === "none") {

                canvasBloc.style.display = "block";
                blocInfoStation.style.display = "none";


            }
            e.preventDefault();
        })
    }

    async decomptCompteur() {

        const response = await fetch('https://api.jcdecaux.com/vls/v1/stations?contract=Nancy&apiKey=19db939c14d552b350876fb0d0948c01b1183b0a');
        const stations = await response.json();

        stations.forEach((station) => {
            console.log(station);

            // pour indexer et afficher les informations de chaque station identifiée  
            let stationAddress = document.querySelector("#stationAddress"),
                stationNbPlace = document.querySelector("#stationNbPlace"),
                stationVeloDispo = document.querySelector("#stationVeloDispo");

            stationAddress.innerHTML = station.address;
            stationNbPlace.innerHTML = station.available_bike_stands;
            stationVeloDispo.innerHTML = station.available_bikes;

            // Mise en place du compteur 

            this.reservationBtn.addEventListener("click", (e) => {
                let nomStation = document.querySelector("#confirm_station");
                nomStation.innerHTML = station.address;
            })

        });






    }





}








const reservation = new Reservation();