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


        // M�thode lancement d'une reservation
        lancementReservation = function () {
            // Mise en place des sessions storage
            sessionStorage.setItem("minutes", minutes);
            sessionStorage.setItem("secondes", secondes);
            sessionStorage.setItem("nomStation", popupStationName);

            // Enregistre la session storage du nom de la station dans son attribut
            nomStation = sessionStorage.getItem("nomStation");
/*
            // On recache les diff�rentes parties de la page sauf la section de location
            document.querySelector("#form_container").style.display = "none"; // Le cadre d'info sur les stations
            document.querySelector("#canvas").style.display = "none"; // Le canvas
            document.querySelector("#station_infos").style.display = "block"; // La section de location
*/
            // Lancement du compte � rebours
            compteARebour = setInterval("Compteur.initCompteur()", 1000);
        }


        //M�thode de r�-initialisation du compte � rebours
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

            // Insertion du compte � rebours dans le HTML 
            document.querySelector("#timer").innerHTML = minutesElt + " min" + " : " + secondesElt + " secondes";

            // Lance le fonctionnement du compte � rebours
            demarrageCompteur();
        };

        // M�thode de fonctionnement du compte � rebours
        demarrageCompteur = function () {
            if ((minutes >= 0) && (secondes > 0)) { // s'il reste plus de 0 seconde
                // on diminue les secondes
                secondes--;
                //Modification de la session storage
                sessionStorage.setItem("secondes", secondes);

            } else if ((minutes > 0) && (secondes <= 0)) { // sinon si les minutes sont sup�rieures � 0 et les secondes inf�rieures ou �gale � 0
                //on replace les secondes � 59
                secondes = 59;
                //on diminue les minutes
                minutes--;

                // Modification des session storage
                sessionStorage.setItem("minutes", minutes);
                sessionStorage.setItem("secondes", secondes);

            } else if ((minutes == 0) && (secondes == 0)) { // sinon si les minutes et les secondes sont �gales � 0 (compte � rebours terminer)


                //Appel de la m�thode "reservationTerminer"
                compteARebourTerminer = setTimeout("reservationTerminer()", 4000);

            }
        };


        //M�thode appel�e � la fin de la r�servation
        reservationTerminer = function () {

            // Arr�t du compte � rebours
            clearInterval(compteARebour);

            // Arr�t du compte � rebours
            minutes = 20;
            secondes = 00;
            minutesElt = null;
            secondesElt = null;

            //suppression de la session storage
            clearTimeout(compteARebourTerminer);

            // remets en place l'affichage par d�faut des blocs
            document.querySelector('#station_heading').style.display = "none";
            document.querySelector("#canvas").style.display = "none";
            document.querySelector("#form_confirm").style.display = "none";
            document.querySelector('#form_container').style.display = "block";
        };

        // M�thode d'annulation de la r�servation
        annulerReservation = function () {
            // Cr�er et faire apparaitre le message de confirmation de la suppression
            let msgAnnulation = document.querySelector("#annulation");
            msgAnnulation.style.border = "1px solid black";
            msgAnnulation.style.display = "block";
            msgAnnulation.innerHTML = "<div style ='position : absolute;'> La r�servation est annul�e !! </div>";

            // Le message dispara�t apr�s 5 secondes
            setTimeout(function () {
                msgAnnulation.style.display = "none";
            }, 5000);

            // Lance la m�thode de fin d'une r�servation afin de supprimer les sessions storage et arr�ter le compte � rebours
            reservationTerminer();

        }
       
         // M�thode qui v�rifie si une r�servation est en cours au lancement de la page et lors du rafra�chissement

        verificationSessionStorage = function () {
            if (sessionStorage.getItem("minutes")) { //si une reservation est en cours
                //R�cup�ration et stockage des sessions storage dans les attributs
                minutes = sessionStorage.getItem("minutes");
                secondes = sessionStorage.getItem("secondes");
                nomStation = sessionStorage.getItem("nomStation");

                //Relance le compte � rebours
                compteARebour = setInterval("initCompteur()", 1000);

                document.querySelector("#form_confirm").style.display = "block";

            } else { // si auncune r�servation est en cours
                document.querySelector("#form_confirm").style.display = "none";
            }
        };

        // M�thode qui annule la r�servation en cours
        resetReservation = function () {
            if (nomStation != popupStationName) { // Si le nom de la station de r�servation est diff�rent du nom de la station s�lectionn�e
            // Affiche une demande de confirmation
                annulationReservation = window.confirm("Cette nouvelle r�servation annulera la r�servation sur la station : " + nomStation +
                    "\net enregistrera une nouvelle r�servation sur la station " + popupStationName);

            } else {// Sinon les deux noms sont identiques
            // Affiche une demande de confirmation
                annulationReservation = window.confirm("Cette nouvelle r�servation remplacera la r�servation d�ja existante sur la station : \n" + nomStation);

            }

            if (annulationReservation) {// Si l'utilisateur a souhait� supprimer sa r�servation en cours
            // Suppression de la session storage
                sessionStorage.clear();

                // Arr�t du compte � rebours
                clearInterval(compteARebour);

                // Reset des attributs du compte � rebours
                minutes = 20;
                secondes = 00;
                minutesElt = null;
                secondesElt = null;

                // Lance la m�thode de lancement d'une r�servation
                lancementReservation();
            }
        }

        // V�rification de l'existence d'une r�servation
        verificationSessionStorage();

        // �v�nements lors de la validation du Canvas
        document.querySelector("#submit_canvas").addEventListener("click", () => {
            localStorage.setItem("signature", Signature);
            Signature.clearCanvas(); // Efface le Canvas

            // V�rification d'une r�servation existante
            if (sessionStorage.getItem("minutes")) { // Si une r�servation existe
                // Suppression de la r�servation existante
                resetReservation();

            } else { // Aucune r�servation n'existe
                // Lance la m�thode de lancement de la r�servation
                lancementReservation();
            }
        });

        // Ev�nement lors du clique sur le bouton d'annulation d'une r�servation
        document.querySelector('.toggleBtn').addEventListener("click", () => {
            // Lance la m�thode d'annulation
            annulerReservation();
        });
    }


}


const reservation = new Reservation();