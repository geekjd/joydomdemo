import { HeroBuffDataProxy } from "src/Game/ConfigProxy/HeroBuffDataProxy";
import { _HeroBuffConfig } from "src/Game/_config/_HeroBuffConfig";
import _PrefabPrefabName from "src/Game/_prefabsName/_PrefabPrefabNames";
import EssentialResUrls from "src/_T/Res/EssentialResUrls";
import ResLoad from "src/_T/Res/ResLoad";
import BuffBase from "../Manager/BuffBase";

/**攻击速度提升*/
export default class BUFF_AttackSpeed extends BuffBase {

    RemoveTime = 0;
    RemoveMaxTime = 5;
    DownSpeed = 0.5;
    MeshObj: Laya.Sprite3D;
    InitBuffBase(_SoldiersBase: any, TempDamageData: any) {
        super.InitBuffBase(_SoldiersBase, TempDamageData);
        let Temp: _HeroBuffConfig.DataType = HeroBuffDataProxy.instance.GetBuffInfoByEnglishName("BUFF_AttackSpeed");
        this.BuffValueAnalysis(Temp.BuffType, Temp.BuffValue);
    }
    BuffOccur() {
        this.setValue();
    }
    RefreshBuff() {
        this.setValue();
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
    setValue() {
        if (this.BuffValueArray.length > 0) {
            this.m_SoldiersBase.m_AttributeBase.m_HitSpeed += this.BuffValueArray[0];
            console.log("当前角色攻速", this.m_SoldiersBase.m_AttributeBase.m_HitSpeed);
        }
    }
}