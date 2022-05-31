import EffectsBase from "../Manager/EffectsBase";

export default class ExpTirg extends EffectsBase {

    onAwake() {
        this.Init();
    }
    Init() {
        super.Init(1);
    }
    onUpdate() {
        super.onUpdate();
    }
}