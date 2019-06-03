export default class{
    constructor(elem){
        this._elem = document.querySelectorAll(elem);
        this.fit();
        this.addCSS();
        window.addEventListener('resize', this.fit.bind(this),false);
    }
    addCSS() {
        this._elem.forEach((el) => {
            el.style.overflow = 'hidden';
        });
        
    }
    fit() {
        this._elem.forEach((el) => {
            let w = window.innerWidth,
                h = window.innerHeight;
            el.style.width = `${w}px`;
            el.style.height = `${h}px`;
        });
        
    }
}