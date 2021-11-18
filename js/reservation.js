class Reservation {
    constructor() {
        this.formResa = document.querySelector('#form_velo');
        this.mySubmit = document.querySelector('.submit');

 

        this.myResaForm();


       
    }

    myResaForm() {
        this.formResa.addEventListener("submit", (e) => {

            let canvasBloc = document.querySelector("#canvas");
            let blocDescription = document.querySelector('#form_container');
            let blocInfoStation = document.querySelector('#station_heading');

            if (canvasBloc.style.display === "none") {

                canvasBloc.style.display = "block";
                blocInfoStation.style.display = "none";


            }

        })
    }
}




const reservation = new Reservation();