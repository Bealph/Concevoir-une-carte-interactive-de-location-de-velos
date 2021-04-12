export default class Reservation{
    constructor(){
        this.btnReservation = document.querySelector('.leaflet-container .btnResa');
        
        this.formReservation();
    }
    
    formReservation() {
        this.btnReservation.addEventListener('click', () =>{
            console.log("hello");
        });
    }
}