//////-------- Creons le defilement d'images automatiue-------------////////////

$(document).ready(function () { // fonction Jquery pour lire le code
    //l'objet
    galerieImg = new galerieImg("#galerie");
});

let galerieImg = function (id) {  // le constructor
    // Les variables pour initier le defilement
    this.slider = $("#slider");
    this.div = $(id);
    this.largeurCache = this.div.width(); 
    this.largeur = 0;// reinitialisation de la largeur

    // initialiser this -> le mot clé
    self = this;
    // Pour aller chercher les liens a
    this.div.find('a').each(function () {
        self.largeur += $(this).width(); // calcul de la largeur totale du diaporama sans les intervalles

        // calcul de la largeur totale du diaporama avec les intervalles
        self.largeur += parseInt($(this).css('padding-left'));
        self.largeur += parseInt($(this).css('padding-right'));
        self.largeur += parseInt($(this).css('margin-left'));
        self.largeur += parseInt($(this).css('margin-right'));
    });

    // determinons le nombre de saut
    this.saut = Math.ceil(this.largeurCache / 2);

    // determinons le nombre etape qu'il faudra
    this.nbEtapes = Math.ceil(this.largeur / this.saut);

    //Definissons le mouvement --> mouvement continue et automatique 
    setInterval(function () {
        self.slider.animate({ left: self.courant * self.saut }, function () {
            $(this).css({ marginLeft: "-10px" }).find("a:last").after($(this).find("a:first"));
        })
    }, 2000); // 2 secondes
}





