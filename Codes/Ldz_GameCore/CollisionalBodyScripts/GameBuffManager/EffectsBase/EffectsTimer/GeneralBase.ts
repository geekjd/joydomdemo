import EffectsBase from "../Manager/EffectsBase";

export default class GeneralBase extends EffectsBase {

    onAwake() {
        this.Init();
    }
    Init() {
        super.Init(2);
    }
    onUpdate() {
        super.onUpdate();
    }
}