export default class Diaporama {
    constructor (){
        this.slides = document.querySelectorAll('#item'); // tableau
        this.indexSlide = 0;

        this.btnNext = document.querySelector('.diapo_next');
        this.btnPrev = document.querySelector('.diapo_prev');
        this.btnPause = document.querySelector('.diapo_pause');
        this.btnLecture = document.querySelector('.diapo_play');

        this.interval = 0;
        this.time = 5000;

        this.btnNext.addEventListener('click', () => this.nextSlide());
        this.btnPrev.addEventListener('click', () => this.prevSlide());
        this.btnPause.addEventListener('click', () => this.pauseSlide());
        this.btnLecture.addEventListener('click', () => this.playSlide());

        this.autoSlide();

        window.addEventListener('keydown', (e) => {
            if (e.code === 'ArrowRight') {
                this.nextSlide();
            } else if (e.code === 'ArrowLeft') {
                this.prevSlide();
            } else if (e.code === 'Space') {
                this.pauseSlide();
            }
        });
    }

    // Comportement au clique des boutons
        // btn Next
    nextSlide(){
        this.slides[this.indexSlide].style.display = "none";
        this.indexSlide++;

        if (this.indexSlide >= this.slides.length) {
            this.indexSlide = 0;
        }

        this.slides[this.indexSlide].style.display = "block";
    }

        // btn Prev
    prevSlide(){
        this.slides[this.indexSlide].style.display = "none";
        this.indexSlide--;

        if (this.indexSlide < 0) {
            this.indexSlide = this.slides.length - 1;
        }

        this.slides[this.indexSlide].style.display = "block";
    }

        // btn Pause
    pauseSlide(){
        //console.log('Youpii');
        this.btnPause.style.display ='none';
        this.btnLecture.style.display = 'block';
        clearInterval(this.interval);
    }

        // btn Play
    playSlide(){
        this.btnLecture.style.display ='none';
        this.btnPause.style.display ='block';
        clearInterval(this.interval);
        this.autoSlide();
    }

    autoSlide(){
        this.interval = setInterval (() => {
            this.nextSlide()
        }, this.time);
    }

}




    

  

