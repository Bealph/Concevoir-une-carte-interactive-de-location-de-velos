class Reservation {
    constructor() {
        this.formResa = document.querySelector('#form_velo');
        this.mySubmit = document.querySelector('.submit');



        this.myResaForm();

        this.canvaSignature();

    }

    myResaForm() {
        this.formResa.addEventListener("submit", (e) => {

            let canvasBloc = document.querySelector("#canvas");
            //let blocDescription = document.querySelector('#form_container');
            let blocInfoStation = document.querySelector('#station_heading');

            if (canvasBloc.style.display === "none") {

                canvasBloc.style.display = "block";
                blocInfoStation.style.display = "none";


            }

        })
    }

    canvaSignature() {
        const Signature = {
            // Attributs
            ecriture: false, //Pour activation de l'�criture
            canvas: document.querySelector("#canvas_resa"),
            context: null, //Pour d�finir le contexte d'utilisation du canvas
            signatureImg: null,

            // M�thode qui traduit l'�v�nement Touch en �vent pour �crans tactiles
            convertTouchEvent: function (ev) {
                let touch, ev_type, mouse_ev;
                touch = ev.targetTouches[0];
                ev.preventDefault();
                switch (ev.type) {
                    case 'touchstart':
                        // S'assure qu'un doigt est sur la cible
                        if (ev.targetTouches.length != 1) {
                            return;
                        }
                        touch = ev.targetTouches[0];
                        ev_type = 'mousedown';
                        break;
                    case 'touchmove':
                        // S'assure qu'un doigt est sur la cible
                        if (ev.targetTouches.length != 1) {
                            return;
                        }
                        touch = ev.targetTouches[0];
                        ev_type = 'mousemove';
                        break;
                    case 'touchend':
                        // Sassure que le doigt a �t� enlever de la cible
                        if (ev.changedTouches.length != 1) {
                            return;
                        }
                        touch = ev.changedTouches[0];
                        ev_type = 'mouseup';
                        break;
                    default:
                        return;
                }

                mouse_ev = document.createEvent("MouseEvents");
                mouse_ev.initMouseEvent(
                    ev_type, // Genre de l'�v�nement
                    true,
                    true,
                    window, // Vue de l'�v�nement
                    0, // Compte de clic de souris
                    touch.screenX, // Coordonn�e X de l'�cran
                    touch.screenY, // Coordonn�e Y de l'�cran
                    touch.clientX, // Coordonn�e X du client
                    touch.clientY, // Coordonn�e Y du client
                    ev.ctrlKey, // V�rifie si la touche contr�le a �t� appuy�e
                    ev.altKey, // V�rifie si la touche alt a �t� appuy�e
                    ev.shiftKey, // V�rifie si la touche majuscule a �t� appuy�e
                    ev.metaKey, // V�rifie si la touche meta a �t� appuy�e
                    0, // Bouton de la souris
                    null // Cible
                );
                this.dispatchEvent(mouse_ev);
            },

            // M�thode qui r�cup�re les coordonn�es de l'�l�ment de pointage (souris, doigt...)
            getMousePos: function (event) {
                rect = this.canvas.getBoundingClientRect(); // Renvoie la taille d'un �l�ment et sa position relative par rapport � la zone d'affichage

                return {
                    x: event.clientX - rect.left,
                    y: event.clientY - rect.top
                };
            },

            // M�thode qui d�termine le d�placement de l'�l�ment de pointage
            deplacementSouris: function(event) {
            sourisPosition = this.getMousePos(event); // Coordonn�es de l'�l�ment de pointage retourner par la m�thode "getMousePos"
            positionX = sourisPosition.x;
            positionY = sourisPosition.y;
            this.dessin(positionX, positionY);
            },

            // M�thode qui permet de dessiner dans le canvas
            dessin: function (positionX, positionY) {
                this.context = this.canvas.getContext("2d"); // Contexte du canvas
                this.context.lineWidth = 5; // Largeur du tracer

                if (this.ecriture) {
                    this.context.lineTo(positionX, positionY); // D�signe le point d'arriv� du tracer
                    this.context.stroke(); // Effectue le tracer
                }
            },

            // M�thode qui permet de d�sactiver l'�criture
            desactivationDessin: function () {
                this.ecriture = false; // D�sactive l'�criture dans le canvas
            },

            // M�thode qui active et d�bute l'�criture dans le canvas
            activationDessin: function () {
                this.ecriture = true; // Active l'�criture sur le canvas
                this.context.beginPath(); // Commence un nouveau chemin de dessin
                this.context.moveTo(positionX, positionY); // D�signe le d�but du tracer
            },

            // M�thode qui permet d'effacer le canvas
            clearCanvas: function () {
                this.context.clearRect(0, 0, 800, 200); // R�initialise le canvas
            }
        }

        console.log(Signature.canvas);

        // Appel des m�thodes sur �crans tactiles
        Signature.canvas.addEventListener("touchstart", Signature.convertTouchEvent);
        Signature.canvas.addEventListener("touchmove", Signature.convertTouchEvent);
        Signature.canvas.addEventListener("touchend", Signature.convertTouchEvent);

        // Appel des m�thodes sur PC
        Signature.canvas.addEventListener("mousedown", Signature.activationDessin.bind(Signature));
        Signature.canvas.addEventListener("mousemove", Signature.deplacementSouris.bind(Signature));
        Signature.canvas.addEventListener("mouseup", Signature.desactivationDessin.bind(Signature));

        // Appel de la m�thode d'effacement du canvas lors de l'appui sur le bouton "effacer"
        document.getElementById("clear_canvas").addEventListener("click", function () {
            Signature.clearCanvas();
        });

    }


}


const reservation = new Reservation();