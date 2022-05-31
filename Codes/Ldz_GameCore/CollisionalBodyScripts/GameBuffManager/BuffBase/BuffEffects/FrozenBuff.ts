import BuffBase from "../Manager/BuffBase";


//冰冻Buff
export default class FrozenBuff extends BuffBase {

    RemoveTime = 0;
    RemoveMaxTime = 1;
    MeshObj: Laya.Sprite3D;
    InitBuffBase() {
        //super.InitBuffBase();
    }

    BuffOccur() {

    }
    RefreshBuff() {
        this.RemoveTime = 0;
    }
    //Buff每帧调用
    BuffOnTick() {
        this.RemoveTime += (Laya.timer.delta / 1000);
        if (this.RemoveTime >= this.RemoveMaxTime) {
            this.BuffRemoved();
        }
    }
    //Buff移除
    BuffRemoved() {
        if (this.MeshObj != null) {
            this.MeshObj.removeSelf();
            this.MeshObj.destroy();
        }
        this.MeshObj = null;
        super.BuffRemoved();
    }
    //受到伤害
    BuffBeHurt() {

    }
    //攻击时
    BuffOnHit() {

    }
    //被杀死时
    BuffBeforeKilled() {
        this.BuffRemoved();
    }
    //敌人死亡时
    BuffAfterKilled() {

    }

}