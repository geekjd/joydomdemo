import MyObjectPool from "src/Ldz_GameCore/GeneralScripts/MyObjectPool";

export default class EffectsBase extends Laya.Script3D {

    destroyTime: number = 0;
    IsUpdateTimeDestroy: boolean = true;
    Init(DesTime: number = 1, Des: boolean = true) {
        this.destroyTime = DesTime;
        this.IsUpdateTimeDestroy = Des;
    }
    onUpdate() {
        if (!this.IsUpdateTimeDestroy) return;
        this.destroyTime -= (Laya.timer.delta / 1000);
        if (this.destroyTime <= 0) {
            this.SkillSelf();
            this.IsUpdateTimeDestroy = false;
        }
    }
    SkillSelf() {
        if (this.owner != null && !this.owner.destroyed) {
            (this.owner as Laya.Sprite3D).destroy();
        }
        //MyObjectPool.Instance.RemoveObjectToPool(this.owner.name, (this.owner as Laya.Sprite3D));
    }

}