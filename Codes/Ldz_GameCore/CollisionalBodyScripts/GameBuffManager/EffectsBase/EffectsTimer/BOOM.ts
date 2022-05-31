import EffectsBase from "../Manager/EffectsBase";

export default class BOOM extends EffectsBase {

    onAwake() {
        this.Init();
    }
    Init() {
        super.Init(1.5);
    }
    onUpdate() {
        if (!this.IsUpdateTimeDestroy) return;
        this.destroyTime -= (Laya.timer.delta / 1000);
        if (this.destroyTime <= 0) {
            this.owner.destroy();
            this.IsUpdateTimeDestroy = false;
        }
    }
}