class Reservation {
    constructor() {
        this.formResa = document.querySelector('#form_velo');
        this.myResaForm();

        this.mySubmit = document.querySelector('.submit');

        this.reservationBtn = document.querySelector("#submit_canvas");

        this.affichageNom = document.querySelector("#name");
        this.affichagePrenom = document.querySelector("#firstname");

        this.zoneSaisieNP = document.querySelector("#confirm_name");

        //this.affichageCompteur = document.querySelector("#timer");

        console.log(this.affichageCompteur);

        this.affichageNomPrenom();

        this.myCompteARebours();



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

    myCompteARebours() {
       // let compteur = 20;
       // timer = setInterval(function () {
       //     if (compteur>0) {
       //         --compteur;
       //         document.querySelector("#timer").innerHTML = compteur + ' ' + 'secondes';
       //     } else {
       //         clearInterval(timer);
       //     }

       // }, 1000);
       //// e.preventDefault();


        let minutes = 20,
            secondes = 00,
            minutesElt = null,
            secondesElt = null,
            nomStation = null,
            compteARebour = null,
            compteARebourTerminer = null,
            annulationReservation = false;

        let popupStationName = document.querySelector("#popupStationName");
            //nomStation = document.querySelector("#confirm_station");


        // Méthode lancement d'une reservation
        lancementReservation = function () {
            // Mise en place des sessions storage
            sessionStorage.setItem("minutes", minutes);
            sessionStorage.setItem("secondes", secondes);
            sessionStorage.setItem("nomStation", popupStationName);

            // Enregistre la session storage du nom de la station dans son attribut
            nomStation = sessionStorage.getItem("nomStation");
/*
            // On recache les différentes parties de la page sauf la section de location
            document.querySelector("#form_container").style.display = "none"; // Le cadre d'info sur les stations
            document.querySelector("#canvas").style.display = "none"; // Le canvas
            document.querySelector("#station_infos").style.display = "block"; // La section de location
*/
            // Lancement du compte à rebours
            compteARebour = setInterval("Compteur.initCompteur()", 1000);
        }


        //Méthode de ré-initialisation du compte à rebours
        initCompteur = function () {
            if (minutes < 10) { // s'il reste moins de 10 minutes
                // Ajoute un 0 devant les minutes
                minutesElt = "0" + minutes;

            } else {
                // sinon les minutes s'affichent normalement
                minutesElt = minutes;
            }

            if (secondes < 10) { // s'il reste moins de 10 secondes
                // Ajoute un 0 devant les secondes
                secondesElt = "0" + secondes;

            } else {
                // sinon les secondes s'affichent normalement
                secondesElt = secondes;
            }

            // Insertion du compte à rebours dans le HTML 
            document.querySelector("#timer").innerHTML = minutesElt + " min" + " : " + secondesElt + " secondes";

            // Lance le fonctionnement du compte à rebours
            demarrageCompteur();
        };

        // Méthode de fonctionnement du compte à rebours
        demarrageCompteur = function () {
            if ((minutes >= 0) && (secondes > 0)) { // s'il reste plus de 0 seconde
                // on diminue les secondes
                secondes--;
                //Modification de la session storage
                sessionStorage.setItem("secondes", secondes);

            } else if ((minutes > 0) && (secondes <= 0)) { // sinon si les minutes sont supérieures à 0 et les secondes inférieures ou égale à 0
                //on replace les secondes à 59
                secondes = 59;
                //on diminue les minutes
                minutes--;

                // Modification des session storage
                sessionStorage.setItem("minutes", minutes);
                sessionStorage.setItem("secondes", secondes);

            } else if ((minutes == 0) && (secondes == 0)) { // sinon si les minutes et les secondes sont égales à 0 (compte à rebours terminer)


                //Appel de la méthode "reservationTerminer"
                compteARebourTerminer = setTimeout("reservationTerminer()", 4000);

            }
        };


        //Méthode appelée à la fin de la réservation
        reservationTerminer = function () {

            // Arrêt du compte à rebours
            clearInterval(compteARebour);

            // Arrêt du compte à rebours
            minutes = 20;
            secondes = 00;
            minutesElt = null;
            secondesElt = null;

            //suppression de la session storage
            clearTimeout(compteARebourTerminer);

            // remets en place l'affichage par défaut des blocs
            document.querySelector('#station_heading').style.display = "none";
            document.querySelector("#canvas").style.display = "none";
            document.querySelector("#form_confirm").style.display = "none";
            document.querySelector('#form_container').style.display = "block";
        };

        // Méthode d'annulation de la réservation
        annulerReservation = function () {
            // Créer et faire apparaitre le message de confirmation de la suppression
            let msgAnnulation = document.querySelector("#annulation");
            msgAnnulation.style.border = "1px solid black";
            msgAnnulation.style.display = "block";
            msgAnnulation.innerHTML = "<div style ='position : absolute;'> La réservation est annulée !! </div>";

            // Le message disparaît après 5 secondes
            setTimeout(function () {
                msgAnnulation.style.display = "none";
            }, 5000);

            // Lance la méthode de fin d'une réservation afin de supprimer les sessions storage et arrêter le compte à rebours
            reservationTerminer();

        }
       
         // Méthode qui vérifie si une réservation est en cours au lancement de la page et lors du rafraîchissement

        verificationSessionStorage = function () {
            if (sessionStorage.getItem("minutes")) { //si une reservation est en cours
                //Récupération et stockage des sessions storage dans les attributs
                minutes = sessionStorage.getItem("minutes");
                secondes = sessionStorage.getItem("secondes");
                nomStation = sessionStorage.getItem("nomStation");

                //Relance le compte à rebours
                compteARebour = setInterval("initCompteur()", 1000);

                document.querySelector("#form_confirm").style.display = "block";

            } else { // si auncune réservation est en cours
                document.querySelector("#form_confirm").style.display = "none";
            }
        };

        // Méthode qui annule la réservation en cours
        resetReservation = function () {
            if (nomStation != popupStationName) { // Si le nom de la station de réservation est différent du nom de la station sélectionnée
            // Affiche une demande de confirmation
                annulationReservation = window.confirm("Cette nouvelle réservation annulera la réservation sur la station : " + nomStation +
                    "\net enregistrera une nouvelle réservation sur la station " + popupStationName);

            } else {// Sinon les deux noms sont identiques
            // Affiche une demande de confirmation
                annulationReservation = window.confirm("Cette nouvelle réservation remplacera la réservation déja existante sur la station : \n" + nomStation);

            }

            if (annulationReservation) {// Si l'utilisateur a souhaité supprimer sa réservation en cours
            // Suppression de la session storage
                sessionStorage.clear();

                // Arrêt du compte à rebours
                clearInterval(compteARebour);

                // Reset des attributs du compte à rebours
                minutes = 20;
                secondes = 00;
                minutesElt = null;
                secondesElt = null;

                // Lance la méthode de lancement d'une réservation
                lancementReservation();
            }
        }

        // Vérification de l'existence d'une réservation
        verificationSessionStorage();

        // Événements lors de la validation du Canvas
        document.querySelector("#submit_canvas").addEventListener("click", () => {
            localStorage.setItem("signature", Signature);
            Signature.clearCanvas(); // Efface le Canvas

            // Vérification d'une réservation existante
            if (sessionStorage.getItem("minutes")) { // Si une réservation existe
                // Suppression de la réservation existante
                resetReservation();

            } else { // Aucune réservation n'existe
                // Lance la méthode de lancement de la réservation
                lancementReservation();
            }
        });

        // Evénement lors du clique sur le bouton d'annulation d'une réservation
        document.querySelector('.toggleBtn').addEventListener("click", () => {
            // Lance la méthode d'annulation
            annulerReservation();
        });
    }


}


const reservation = new Reservation();