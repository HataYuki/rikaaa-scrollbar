import Ease from './_Ease';

export default class _Timer extends Ease{
    constructor(duration, loopLen) {
        super();
        super.duration = duration;
        super.type = 'linear';
        this._len = loopLen;
    }
    set duration(n){
        super.duration = n;
    }
    set looplen(n){
        this._len = n;
    }
    Timer(func){
        super.Start(() => {
            
        }).End(() => {
            func();
        });
    }
    Clear() {
        super.Stop();
    }
}

