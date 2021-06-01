export default class Reservation{
    constructor(){
        this.btnReser = document.querySelector('.leaflet-container .btnResa');
        this.divPresentation = document.querySelector('#form_container');
        
        this.btnReservation.addEventListener('click', () => this.vaEtVient());
        //this.formReservation();
    }
    
    // formReservation() {
    //     this.btnReservation.addEventListener('click', () =>{
    //         if (document.getElementById('form_container').style.display=='block') {
    //             document.getElementById('form_container').style.display='none';
    //         } else {
    //             document.getElementById('form_container').style.display = 'block';
    //         }
    //     });
    // }
}