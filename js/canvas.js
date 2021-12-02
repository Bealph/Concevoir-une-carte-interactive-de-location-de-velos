
class Signature {
    constructor() {
        // balises et fonctions pour implémenter le canevas
        this.canvas = document.querySelector("#canvas_resa");
        this.ctx = this.canvas.getContext('2d');
        this.ctx.strokeStyle = '#000000';
        this.ctx.lineWidth = 3;
        this.draw = false;
        this.empty = true;
        this.mousePosition = {
            x: 0,
            y: 0
        };

        this.lastPosition = this.mousePosition;
        this.submitBtn = document.querySelector("#submit_canvas");
        this.clearBtn = document.querySelector("#clear_canvas");
        this.canvas.width = 300;
        this.canvas.height = 200;


        this.canvaSignature();

    }

    canvaSignature() {
        let self = this;

        //Souris
        this.canvas.addEventListener("mousedown", function (e) {
            self.draw = true;
            self.empty = false;
            self.lastPosition = self.getMposition(e);
        });

        this.canvas.addEventListener("mousemove", function (e) {
            self.mousePosition = self.getMposition(e);
            self.canvasResult()
        });

        document.addEventListener("mouseup", function (e) {
            self.draw = false;
        });

        // Stop scrolling (touch)
        document.body.addEventListener("touchstart", function (e) {
            if (e.target == self.canvas) {
                e.preventDefault();
            }
        });

        document.body.addEventListener("touchend", function (e) {
            if (e.target == self.canvas) {
                e.preventDefault();
            }
        });

        document.body.addEventListener("touchmove", function (e) {
            if (e.target == self.canvas) {
                e.preventDefault();
            }
        });

        // Touchpad
        this.canvas.addEventListener("touchstart", function (e) {
            self.mousePosition = self.getTposition(e);
            var touch = e.touches[0];
            var mouseEvent = new MouseEvent("mousedown", {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            self.canvas.dispatchEvent(mouseEvent);
        });

        this.canvas.addEventListener("touchmove", function (e) {
            var touch = e.touches[0];
            var mouseEvent = new MouseEvent("mousemove", {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            self.canvas.dispatchEvent(mouseEvent);
        });

        this.canvas.addEventListener("touchend", function (e) {
            var mouseEvent = new MouseEvent("mouseup", {});
            self.canvas.dispatchEvent(mouseEvent);
        });

        //Effacer
        this.clearBtn.addEventListener("click", function (e) {
            self.clearCanvas();
            self.empty = true;
        });

        //valider
        this.submitBtn.addEventListener("click", (e) => {
            
            if (this.empty === true) {
                alert("S'il vous plait, veuillez signer pour reserver votre velo");


            } else {
                console.log("hello");
                document.querySelector("#form_confirm").style.display = "block";
                document.querySelector("#canvas").style.display = "none";
                this.clearCanvas();
            } 

        })

    }

    // Renvoie les coordonnées de la souris 
    getMposition(mouseEvent) {
        if (this.draw) {
            var oRect = this.canvas.getBoundingClientRect();
            return {
                x: mouseEvent.clientX - oRect.left,
                y: mouseEvent.clientY - oRect.top
            };
        }
    }


    // Renvoie les coordonnées du pad 
    getTposition(touchEvent) {
        var oRect = this.canvas.getBoundingClientRect();
        return {
            x: touchEvent.touches[0].clientX - oRect.left,
            y: touchEvent.touches[0].clientY - oRect.top
        };
    }

    // Dessin du canvas
    canvasResult() {
        if (this.draw) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.lastPosition.x, this.lastPosition.y);
            this.ctx.lineTo(this.mousePosition.x, this.mousePosition.y);
            this.ctx.stroke();
            this.lastPosition = this.mousePosition;
        }
    };

    // Vide le dessin du canvas
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

}

const signature = new Signature();