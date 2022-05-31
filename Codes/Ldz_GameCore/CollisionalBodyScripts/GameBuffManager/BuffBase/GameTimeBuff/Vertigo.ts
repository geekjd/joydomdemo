import _AllPrefabsNames from "src/Game/_prefabsName/_AllPrefabsNames";
import _PrefabPrefabName from "src/Game/_prefabsName/_PrefabPrefabNames";
import EssentialResUrls from "src/_T/Res/EssentialResUrls";
import ResLoad from "src/_T/Res/ResLoad";
import LayaUtils from "src/_T/Utils/LayaUtils";
import BuffBase from "../Manager/BuffBase";

/**眩晕效果 */
export default class Vertigo extends BuffBase {

    RemoveTime = 0;
    RemoveMaxTime = 5;
    MeshObj: Laya.Sprite3D;
    InitBuffBase(_SoldiersBase: any, TempDamageData: any) {
        super.InitBuffBase(_SoldiersBase, TempDamageData);
    }
    BuffOccur() {
        let Url = EssentialResUrls.PrefabURL(_AllPrefabsNames.smear);
        let Name = _AllPrefabsNames.smear;
        this.m_SoldiersBase.m_FinderAgent.enabled = false;
        this.m_SoldiersBase.m_FinderAgent.SetStopMove();
        this.m_SoldiersBase.m_AnimatorManager.m_CurStateBase.m_Animator.speed = 0;
        //AudioProxy.instance.playSound(ESounds.ice_freeze, 1);
        ResLoad.Load3D(Url, Laya.Handler.create(this, () => {
            let Mes: Laya.Sprite3D = ResLoad.GetRes(Url);
            this.MeshObj = Mes;
            this.m_SoldiersBase.TopEffectsPos.addChild(Mes);
            Mes.transform.localPosition = new Laya.Vector3(0, 0, 0);
        }));
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
        this.m_SoldiersBase.m_AnimatorManager.m_CurStateBase.m_Animator.speed = 1;
        this.m_SoldiersBase.m_FinderAgent.enabled = true;
        if (this.MeshObj != null) {
            this.MeshObj.removeSelf();
            this.MeshObj.destroy();
        }
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