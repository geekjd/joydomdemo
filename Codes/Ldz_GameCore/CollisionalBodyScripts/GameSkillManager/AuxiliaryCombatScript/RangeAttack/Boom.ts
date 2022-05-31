import { CampType } from "src/Ldz_GameCore/GeneralScripts/GameDefine";
import DamageData from "src/Ldz_GameCore/MagicCubeSource/HoneyBeeManager/DamageData";
import MagicCubeSource from "src/Ldz_GameCore/MagicCubeSource/HoneyBeeManager/MagicCubeSource";

//范围伤害
export default class Boom extends Laya.Script3D {

    PerSon: Map<Laya.Sprite3D, Laya.Sprite3D> = new Map<Laya.Sprite3D, Laya.Sprite3D>();
    //SoldiersBase
    m_CampType: CampType;
    m_DamageData: DamageData;

    SlefPos: Laya.Vector3;
    InitSkill(SelfSc: DamageData) {
        this.m_DamageData = SelfSc;
        this.m_CampType = this.m_DamageData.m_SelfSc.m_CampType;
        Laya.timer.once(100, this, () => {
            this.ScriptOnClick();
        });
        Laya.timer.once(1000, this, () => {
            this.owner.destroy();
        });


    }
    onTriggerEnter(collision: Laya.PhysicsComponent) {
        let Obj: Laya.Sprite3D = collision.owner as Laya.Sprite3D;
        let Magic: MagicCubeSource = Obj.getComponent(MagicCubeSource);

        if ((Magic != null && !Magic.IsDie) &&
            ((Magic.m_CampType != this.m_CampType) || (Magic.m_CampType == CampType.Yellow_Camp))
        ) {
            if (Magic == this.m_DamageData.m_SelfSc) return;
            if (!this.PerSon.has(Obj)) {
                this.PerSon.set(Obj, Obj);
            }
        }
    }
    onTriggerStay(collision: Laya.PhysicsComponent) {

    }

    onTriggerExit(collision: Laya.PhysicsComponent) {

    }

    ScriptOnClick() {
        //执行伤害攻击
        this.PerSon.forEach((Value, Key) => {
            if (Value != null && !Value.destroyed && this.m_DamageData.m_SelfSc != null) {
                let Tar: MagicCubeSource = Value.getComponent(MagicCubeSource);
                Tar.BeAttacked(this.m_DamageData);
            }
        });
    }
}