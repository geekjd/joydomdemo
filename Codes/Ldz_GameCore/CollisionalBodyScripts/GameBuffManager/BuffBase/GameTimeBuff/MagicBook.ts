import { EUIEvent } from "src/Game/MesEvent/EUIEvent";
import _AllPrefabsNames from "src/Game/_prefabsName/_AllPrefabsNames";
import _PrefabPrefabName from "src/Game/_prefabsName/_PrefabPrefabNames";
import MesManager from "src/_T/Mes/MesManager";
import EssentialResUrls from "src/_T/Res/EssentialResUrls";
import ResLoad from "src/_T/Res/ResLoad";
import LayaUtils from "src/_T/Utils/LayaUtils";
import BuffBase from "../Manager/BuffBase";

/**魔法增益效果 */
export default class MagicBook extends BuffBase {

    RemoveTime = 0;
    RemoveMaxTime = 10;
    MeshObj: Laya.Sprite3D;
    InitBuffBase(_SoldiersBase: any, TempDamageData: any) {
        super.InitBuffBase(_SoldiersBase, TempDamageData);
    }
    BuffOccur() {
        this.m_SoldiersBase.m_SceneSprite3d.transform.localScale = new Laya.Vector3(1.2, 1.2, 1.2);
        this.m_SoldiersBase.m_DamageData.DamageCoefficient = 2;
        let Url = EssentialResUrls.PrefabURL(_AllPrefabsNames.xuan);
        ResLoad.Load3D(Url, Laya.Handler.create(this, () => {
            let Mes: Laya.Sprite3D = ResLoad.GetRes(Url);
            this.MeshObj = Mes;
            this.m_SoldiersBase.FootEffectsPos.addChild(Mes);
            Mes.transform.localPosition = new Laya.Vector3(0, 0.3, 0);
            Mes.transform.localScale = new Laya.Vector3(2, 2, 2);
        }));
        let Pos = new Laya.Vector3();
        this.m_SoldiersBase.m_SceneSprite3d.transform.position.cloneTo(Pos);
        MesManager.event(EUIEvent.ShowWordtxt, ["体型变大,伤害翻倍", Pos]);
    }
    RefreshBuff() {
        this.RemoveTime = 0;
    }
    //Buff每帧调用
    BuffOnTick() {
        this.RemoveTime += (LayaUtils.deltaTime / 1000);
        if (this.RemoveTime >= this.RemoveMaxTime) {
            this.BuffRemoved();
            return;
        }
    }
    //Buff移除
    BuffRemoved() {
        this.m_SoldiersBase.m_SceneSprite3d.transform.localScale = new Laya.Vector3(1, 1, 1);
        this.m_SoldiersBase.m_DamageData.DamageCoefficient = 1;
        if (this.MeshObj != null) {
            this.MeshObj.removeSelf();
            this.MeshObj.destroy();
        }
        let Pos = new Laya.Vector3();
        this.m_SoldiersBase.m_SceneSprite3d.transform.position.cloneTo(Pos);
        MesManager.event(EUIEvent.ShowWordtxt, ["体型恢复,伤害恢复", Pos]);
        this.MeshObj = null;
        super.BuffRemoved();
    }

    BuffBeHurt() {

    }
    //被杀死时
    BuffBeforeKilled() {
        this.BuffRemoved();
    }

}