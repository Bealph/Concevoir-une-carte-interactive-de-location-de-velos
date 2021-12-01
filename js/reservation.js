class Reservation {
    constructor() {
        this.formResa = document.querySelector('#form_velo');
        this.myResaForm();

        this.mySubmit = document.querySelector('.submit');

        this.reservationBtn = document.querySelector("#submit_canvas");

        this.affichageNom = document.querySelector("#name");
        this.affichagePrenom = document.querySelector("#firstname");

        this.zoneSaisieNP = document.querySelector("#confirm_name");

       console.log(this.affichageNom, this.affichagePrenom, this.zoneSaisieNP);

        this.affichageNomPrenom();

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


    affichageNomPrenom() {
        let saisieNom = this.affichageNom.value,
            saisiePrenom = this.affichagePrenom.value;

        this.zoneSaisieNP.innerHTML = ' ' + saisieNom + ' ' + saisiePrenom;

    }

    decomptCompteur() {

    }


}


const reservation = new Reservation();