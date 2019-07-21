import '@webcomponents/webcomponentsjs/webcomponents-bundle';
import constrain from '../assets/js/_Constrain';
import Ease from '../assets/js/_Ease';
import onebang from '../assets/js/_Onebang';
import ready from '../assets/js/_Domready';
import rikaaaResizeObserver from '../assets/js/rikaaa-ResizeWatcher';
import throttle from '../assets/js/_throttle';
import '../assets/js/Array.prototype.includes';

const _css = '${{{src/webcomponents/webcomponent.scss}}}';
const _style = `<style>${_css}</style>`;
const _shadowdomHTML = `
    ${_style}
    <div class="bar-area">
        <div class="bar-area-padding">
            <div class="bar-area-padding-inner">
                <div class="btn-wrap"><button class="btn edge-top"></button></div>
                <div class="bar-contaner">
                    <div class="bar">
                        <div class="bar-thum">
                            <button class="bar-btn up"></button>
                            <button class="bar-btn main-btn"></button>
                            <button class="bar-btn down"></button>
                        </div>
                    </div>
                </div>
                <div class="btn-wrap"><button class="btn edge-bottom"></button></div>
            </div>
        </div>
    </div>
    <div class="view">
        <div class="view-inner">
            <slot class="contents"></slot>
        </div>
    </div>
`;
const template = document.createElement('template');
template.id = 'rikaaascrollbar';
template.innerHTML = _shadowdomHTML;
if (window.ShadyCSS) ShadyCSS.prepareTemplate(template, 'rikaaa-scrollbar');

export default class rikaaahoge extends HTMLElement {
    constructor() {
        super();
        if (window.ShadyCSS) ShadyCSS.styleElement(this);
        this.attachShadow({
            mode: 'open'
        });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

         // data
        this.btnH = 10;
        this.btnSeparation = 2;
        this.barAreaMaxW = 14;
        this.barAreaMinW = 8;
        this.barEdgeBtnH = 5;
        this.barBtnSeparation = 2;
        this.allowToEdgeBtn = false;
        this.allowToBarBtn = false;
        this.hide = true;
        this.navigation = true;
        this.naviData = null;
        this.currentIndex = 0;
        this.barOpend = false;
        this.barSliding = false;
        this.scrolling = false;
        
        this.view = this.shadowRoot.querySelector('.view');
    }
    connectedCallback() {

        let oneHide, oneShow;
      
        if (this.autohide) oneShow = onebang(() => this.barShow(200));

        if (!window.ResizeObserver && !window.WcRikaaaResizeObserver) {
            Object.defineProperty(window, 'WcRikaaaResizeObserver', {
                value: rikaaaResizeObserver
            });
        }
        const resizeobserver = window.ResizeObserver || window.WcRikaaaResizeObserver;

        // mouse scroll
        let timer;
        this.mouseScrollingFunc = (e) => {
            e.preventDefault();
            
            this.barPos = this.scrollRatio;
            if (this.autohide) oneShow();
            oneHide = onebang(() => this.barHide(200));
            this.scrolling = true;
            if (this.autohide) {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    this.scrolling = false;
                    if (!this.barOpend && !this.barSliding) {
                        oneHide();
                        oneShow = onebang(() => this.barShow(200));
                    };
                }, 3000);
            }
        };
        this.mouseScrollingFunc_throtted = throttle(this.mouseScrollingFunc, 10);
        // this.view.addEventListener('scroll', this.mouseScrollingFunc, {
        this.view.addEventListener('scroll', this.mouseScrollingFunc_throtted, false);

        // to edge
        this.scrollToEdgeFunc = e => {
            const btn = e.currentTarget;
            if (Array.from(btn.classList).includes('main-btn')) return false;
            const dir = Array.from(btn.classList).includes('up');
            if (dir) this.goTo(0, 300);
            else this.goTo(1, 300);

        };
        this.shadowRoot.querySelectorAll('.bar-btn').forEach(elem => {
            elem.addEventListener('click', this.scrollToEdgeFunc)
        });

        reiseze
        const resize = () => {
            this.redraw(0);
        };
        this.resizeOb = new resizeobserver(resize);
        this.resizeOb.observe(this);


        // skip
        this.barContanerClickFunc = e => {
            if (!Array.from(e.target.classList).includes('bar-contaner')) return false;
            const newScrollRatio = (e.pageY - e.currentTarget.getBoundingClientRect().top) / this.barContanerH;
            this.goTo(newScrollRatio, 200);
        };
        this.shadowRoot.querySelector('.bar-contaner').addEventListener('click', this.barContanerClickFunc);


        // bar scroll
        let slideStartPos, slideStartRatio, stimer;
        const slide = (e) => {
            const slidedVal = e.pageY - slideStartPos;
            const maxSlideVal = this.barContanerH - this.barHeight;
            const slidedRatio = slidedVal / maxSlideVal;
            this.goTo(slideStartRatio + slidedRatio, 0);
        };
        this.attachslideFunc = e => {
            window.addEventListener('mousemove', slide);
            window.addEventListener('touchmove', slide);
            slideStartPos = e.pageY;
            slideStartRatio = this.scrollRatio;
            this.view.classList.add('select-none');
            this.barSliding = true;
        };
        this.releaseslideFunc = () => {
            window.removeEventListener('mousemove', slide);
            window.removeEventListener('touchmove', slide);
            this.view.classList.remove('select-none');
            this.barSliding = false;
            if (this.autohide) {
                clearTimeout(stimer);
                stimer = setTimeout(() => {
                    if (!this.barOpend && !this.scrolling && typeof oneHide === 'function') {
                        oneHide();
                        oneShow = onebang(() => this.barShow(200));
                    };
                }, 3000);
            }
        };
        this.shadowRoot.querySelector('.main-btn').addEventListener('mousedown', this.attachslideFunc);
        this.shadowRoot.querySelector('.main-btn').addEventListener('touchstart', this.attachslideFunc);
        window.addEventListener('mouseup', this.releaseslideFunc);
        window.addEventListener('touchend', this.releaseslideFunc);
        window.addEventListener('mouseleave', this.releaseslideFunc);
        window.addEventListener('touchleave', this.releaseslideFunc);

        // bar opend and close
        let botimer;
        this.barOpenFunc = () => {
            const d = 100;
            this.allowToEdgeBtn = true;
            this.allowToBarBtn = true;
            this.redraw(d);
            this.barAreaW(this.maxwidth, d, 'ease-out');
            this.barOpend = true;
        };
        this.barCloseFunc = () => {
            const d = 80;
            this.allowToEdgeBtn = false;
            this.allowToBarBtn = false;
            this.redraw(d);
            this.barAreaW(this.minwidth, 80, 'ease-out');
            this.barOpend = false;
            if (this.autohide) {
                clearTimeout(botimer);
                botimer = setTimeout(() => {
                    if (!this.barSliding && !this.scrolling) {
                        oneHide();
                        oneShow = onebang(() => this.barShow(200));
                    };
                }, 3000);
            }
        };
        this.shadowRoot.querySelector('.bar-area').addEventListener('mouseenter', this.barOpenFunc);
        this.shadowRoot.querySelector('.bar-area').addEventListener('mouseleave', this.barCloseFunc);

        // navi
        this.naviFunc = e => {
            const dir = (Array.from(e.currentTarget.classList).includes('edge-top')) ? false : true; // true is next;
            this.goNavigation(dir);
        }
        this.shadowRoot.querySelectorAll('.btn').forEach(elem => {
            elem.addEventListener('click', this.naviFunc)
        });
        
        // init
        ready(() => {
            this.redraw(0);
            if (this.autohide) this.barHide(0);
            this.dispatchEvent(new CustomEvent('load'));
        });
       

        
    }
    static get observedAttributes() {
        return [
            'minwidth',
            'usenavi',
        ];
    }
    attributeChangedCallback(attr, oldval, newval) {
        if (attr === 'minwidth') this.barAreaW(Number(newval), 0, 'ease-in');
        if (attr === 'usenavi') this.redraw(0);
    }
    disconnectedCallback() {
        this.shadowRoot.querySelectorAll('.btn').forEach(elem => {
            elem.removeEventListener('click', this.naviFunc)
        });

        this.shadowRoot.querySelector('.bar-area').removeEventListener('mouseenter', this.barOpenFunc);
        this.shadowRoot.querySelector('.bar-area').removeEventListener('mouseleave', this.barCloseFunc);

        this.shadowRoot.querySelector('.main-btn').removeEventListener('mousedown', this.attachslideFunc);
        this.shadowRoot.querySelector('.main-btn').removeEventListener('touchstart', this.attachslideFunc);
        window.removeEventListener('mouseup', this.releaseslideFunc);
        window.removeEventListener('touchend', this.releaseslideFunc);
        window.removeEventListener('mouseleave', this.releaseslideFunc);
        window.removeEventListener('touchleave', this.releaseslideFunc);

        this.shadowRoot.querySelector('.bar-contaner').removeEventListener('click', this.barContanerClickFunc);

        this.resizeOb.disconnect();
        

        this.shadowRoot.querySelectorAll('.bar-btn').forEach(elem => {
            elem.removeEventListener('click', this.scrollToEdgeFunc)
        });
    
        this.view.removeEventListener('scroll', this.mouseScrollingFunc_throtted);
        
    }
    get maxwidth() {
        const attr = this.getAttribute('maxwidth');
        return (attr === null) ? this.barAreaMaxW : Number(attr);
    }
    get minwidth() {
        const attr = this.getAttribute('minwidth');
        return (attr === null) ? this.barAreaMinW : Number(attr);
    }
    get usenavi() {
        const attr = this.getAttribute('usenavi');
        return (attr === null) ? this.navigation : (attr.toLowerCase() === 'trure');
    }
    get autohide() {
        const attr = this.getAttribute('autohide');
        return (attr === null) ? this.hide : (attr.toLowerCase() === 'true');
    }
    setBarAreaSeparation(btnH_px, btnSeparation_px, changIngAnimationDuration_ms) {
        const btnh = (this.usenavi && this.naviData !== null) ? btnH_px : 0;
        const btn = this.shadowRoot.querySelectorAll('.btn');
        const barContaner = this.shadowRoot.querySelector('.bar-contaner');
        const barAreaPaddingInner = this.shadowRoot.querySelector('.bar-area-padding-inner');
        const currentBtnH = btn[0].getBoundingClientRect().height;
        const currentBtnSeparation = Number(btn[0].style.marginBottom.replace(/px/g, ''));
        const currentBarContanerH = Number(barContaner.style.height.replace(/px/g, ''));
        const barUIAreaH = barAreaPaddingInner.getBoundingClientRect().height;
        this.barContanerH = barUIAreaH - btnh * 2;

        const change = ease => {
            Array.from(btn).forEach(elem => {
                elem.style.height = `${currentBtnH + ((btnh - currentBtnH) * ease)}px`;
                const separation = currentBtnSeparation + ((btnSeparation_px - currentBtnSeparation) * ease);
                if (Array.from(elem.classList).includes('edge-top')) elem.style.marginBottom = `${separation}px`;
                else elem.style.marginTop = `${separation}px`;
            });
            barContaner.style.height = `${currentBarContanerH + ((barUIAreaH - (btnh + btnSeparation_px) * 2) - currentBarContanerH) * ease}px`;
        }

        if (changIngAnimationDuration_ms !== 0) {
            const ease = new Ease('ease-in', changIngAnimationDuration_ms);
            ease.Start(e => change(e));
        } else {
            change(1);
        }
    }
    setBarH() {
        const bar = this.shadowRoot.querySelector('.bar');
        const viewH = this.viewHeight;
        const contentH = this.areaHeight;
        const barHRatio = viewH / contentH;
        bar.style.height = `${barHRatio * 100}%`;
        this.barHeight = this.barContanerH * barHRatio;
    }
    setBarBtnSeparation(NextBackBtnH, btnSeparationH, duration) {
        const nextBtn = this.shadowRoot.querySelector('.down');
        const backBtn = this.shadowRoot.querySelector('.up');
        const mainBtn = this.shadowRoot.querySelector('.main-btn');
        const areaH = this.shadowRoot.querySelector('.bar-thum').getBoundingClientRect().height;
        const currentNBBtnH = nextBtn.getBoundingClientRect().height;
        const currentMainBtnH = mainBtn.getBoundingClientRect().height;
        const currentSeparation = Number(nextBtn.style.marginTop.replace(/px/g, ''));

        const change = (ease) => {
            const NBbtnH = (currentNBBtnH + (NextBackBtnH - currentNBBtnH) * ease) / areaH * 100;
            const separation = currentSeparation + (btnSeparationH - currentSeparation) * ease;
            Object.assign(nextBtn.style, {
                height: `${NBbtnH}%`,
                marginTop: `${separation}px`,

            });
            Object.assign(backBtn.style, {
                height: `${NBbtnH}%`,
                marginBottom: `${separation}px`,
            });
            mainBtn.style.height = `${(currentMainBtnH + ((areaH - (NextBackBtnH * 2) - (btnSeparationH * 2)) - currentMainBtnH) * ease)/areaH*100}%`;
        };
        if (duration !== 0) {
            const ease = new Ease('ease-in', duration);
            ease.Start(e => {
                change(e);
            });
        } else {
            change(1);
        }
    }
    get scrollRatio() {
        const scrollPosY = this.view.scrollTop;
        const viewH = this.viewHeight;
        const contentH = this.areaHeight;
        const scrollRatio = scrollPosY / (contentH - viewH);
        return constrain(scrollRatio, 0, 1);
    }
    set barPos(scrollRatio) {
        const bar = this.shadowRoot.querySelector('.bar');
        const viewH = this.viewHeight;
        const contentH = this.areaHeight;
        const viewRatio_y = viewH / contentH;
        const PosMaxRatio_y = viewH / (viewH * viewRatio_y) - 1;
        bar.style.transform = `translateY(${PosMaxRatio_y * 100 * scrollRatio}%)`;
    }
    goTo(newScrollRatio, duration) {
        const ratio = constrain(newScrollRatio, 0, 1)
        const currentScrollRatio = this.scrollRatio;
        const diffRatio = ratio - currentScrollRatio;
        const maxScrollVal = this.areaHeight - this.viewHeight;
        const view = this.view;
        const scroll = (ease) => {
            view.scrollTop = (maxScrollVal * currentScrollRatio) + ((maxScrollVal * diffRatio) * ease);
        }

        if (duration !== 0) {
            const ease = new Ease('ease-out', duration);
            ease.Start(e => scroll(e));
        } else {
            scroll(1);
        }
    }
    barAreaW(areaW, duration, timingFunc) {
        const barArea = this.shadowRoot.querySelector('.bar-area');
        Object.assign(barArea.style, {
            transition: `width ${duration}ms ${timingFunc}`,
            width: `${areaW}px`,
        });
    }
    navi(naviTargets) {
        // if (!navigator) return false;
        this.naviData = naviTargets;
    }
    goNavigation(dir) {
        const sag = this.naviSaggestion;
        const getOffsetTop = id => this.shadowRoot.querySelector('.contents').assignedNodes({
            flattern: true
        }).filter(n => n.nodeType === n.ELEMENT_NODE)[0].querySelector(`#${id}`).offsetTop;
        const areaH = this.areaHeight - this.viewHeight;
        if (dir) {
            if (sag.next !== false) this.goTo(getOffsetTop(sag.next.id) / areaH, 300);
        } else {
            if (sag.prev !== false) this.goTo(getOffsetTop(sag.prev.id) / areaH, 300);
        }
    }
    get naviSaggestion() {
        if (this.naviData === null) return false;
        const goal = this.view.scrollTop;
        const data = this.naviData;
        const near = data.reduce((a, c) => {
            const getOffsetTop = id => this.shadowRoot.querySelector('.contents').assignedNodes({
                flattern: true
            }).filter(n => n.nodeType === n.ELEMENT_NODE)[0].querySelector(`#${id}`).offsetTop;
            return (Math.abs(getOffsetTop(c.id) - goal) < Math.abs(getOffsetTop(a.id) - goal)) ? c : a;
        });
        const indexs = [
            data.indexOf(near) - 1,
            data.indexOf(near),
            data.indexOf(near) + 1
        ].map(index => (index < 0 || index > (data.length - 1)) ? false : index);
        return {
            prev: (indexs[0] === false) ? false : data[indexs[0]],
            near: (indexs[1] === false) ? false : data[indexs[1]],
            next: (indexs[2] === false) ? false : data[indexs[2]],
        }
    }
    get areaHeight() {        
        return this.shadowRoot.querySelector('.view-inner').getBoundingClientRect().height;
    }
    get viewHeight() {
        return this.getBoundingClientRect().height;
    }
    redraw(duration) {
        this.barPos = this.scrollRatio;
        if (this.allowToEdgeBtn) this.setBarAreaSeparation(this.btnH, this.btnSeparation, duration);
        else this.setBarAreaSeparation(0, 0, duration);
        this.setBarH();
        if (this.allowToBarBtn) this.setBarBtnSeparation(this.barEdgeBtnH, this.barBtnSeparation, duration);
        else this.setBarBtnSeparation(0, 0, duration);
        if (this.viewHeight >= this.areaHeight) this.barHide(100);
        else if (!this.autohide) this.barShow(100);
    }
    barOpacity(ratio, duration) {
        const r = constrain(ratio, 0, 1);
        const bar = this.shadowRoot.querySelector('.bar-area');
        const currentRatio = Number(bar.style.opacity);
        const diff = r - currentRatio;

        const change = ease => {
            const o = currentRatio + diff * ease;
            const style = bar.style;
            style.opacity = o;
            (o === 0) ? bar.style.visibility = 'hidden': bar.style.visibility = '';
        }
        if (duration !== 0) {
            const ease = new Ease('ease-in', duration);
            ease.Start(e => change(e));
        } else {
            change(1);
        }
    }
    barShow(duration) {
        this.barOpacity(1, duration);
    }
    barHide(duration) {
        this.barOpacity(0, duration);
    }
}