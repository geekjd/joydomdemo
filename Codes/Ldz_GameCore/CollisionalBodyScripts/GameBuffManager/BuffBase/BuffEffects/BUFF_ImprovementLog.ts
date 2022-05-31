import _PrefabPrefabName from "src/Game/_prefabsName/_PrefabPrefabNames";
import EssentialResUrls from "src/_T/Res/EssentialResUrls";
import ResLoad from "src/_T/Res/ResLoad";
import BuffBase from "../Manager/BuffBase";

/**改进日志 */
export default class BUFF_ImprovementLog extends BuffBase {

    RemoveTime = 0;
    RemoveMaxTime = 5;
    DownSpeed = 0.5;
    MeshObj: Laya.Sprite3D;
        InitBuffBase(_SoldiersBase: any, TempDamageData: any) {
        super.InitBuffBase(_SoldiersBase, TempDamageData);

    }
    BuffOccur() {
    }
    RefreshBuff() {
        this.RemoveTime = 0;
    }
    //Buff每帧调用
    BuffOnTick() {
        // this.RemoveTime += (Laya.timer.delta / 1000);
        // if (this.RemoveTime >= this.RemoveMaxTime) {
        //     this.BuffRemoved();
        //     return;
        // }
        // let Dt = this.m_SoldiersBase.m_TempAttributeBase.m_Hitpoints / this.m_SoldiersBase.m_TempAttributeBase.m_MaxHitpoints;
        // if (Dt <= 0.5) {
        //     this.m_SoldiersBase.m_TempAttributeBase.m_HitSpeed = this.m_SoldiersBase.m_TempAttributeBase.m_HitSpeed * 2.5;
        // }
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