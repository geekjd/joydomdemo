import { HeroBuffDataProxy } from "src/Game/ConfigProxy/HeroBuffDataProxy";
import { _HeroBuffConfig } from "src/Game/_config/_HeroBuffConfig";
import _PrefabPrefabName from "src/Game/_prefabsName/_PrefabPrefabNames";
import DamageData from "src/Ldz_GameCore/MagicCubeSource/HoneyBeeManager/DamageData";
import EssentialResUrls from "src/_T/Res/EssentialResUrls";
import ResLoad from "src/_T/Res/ResLoad";
import BuffBase from "../Manager/BuffBase";

/**伤害反弹 */
export default class BUFF_DamageRebound extends BuffBase {

    RemoveTime = 0;
    RemoveMaxTime = 5;
    DownSpeed = 0.5;
    MeshObj: Laya.Sprite3D;
    probability: number = 0;
    InitBuffBase(_SoldiersBase: any, TempDamageData: any) {
        super.InitBuffBase(_SoldiersBase, TempDamageData);
        let Temp: _HeroBuffConfig.DataType = HeroBuffDataProxy.instance.GetBuffInfoByEnglishName("BUFF_DamageRebound");
        this.BuffValueAnalysis(Temp.BuffType, Temp.BuffValue);
        this.probability = 0;
    }
    BuffOccur() {
        this.setValue();
    }
    RefreshBuff() {
        this.setValue();
    }
    //受到伤害
    BuffBeHurt(TempDamageData: DamageData) {
        let ReboundValue: number = TempDamageData.BasicDamage * this.probability;
        this.m_SoldiersBase.m_DamageData.Refresh(this.m_SoldiersBase.m_TempAttributeBase);
        this.m_SoldiersBase.m_DamageData.BasicDamage = ReboundValue;
        TempDamageData.m_SelfSc.BeAttacked(this.m_SoldiersBase.m_DamageData.Clone());
    }
    setValue() {
        if (this.BuffValueArray.length >= 1) {
            this.probability = this.BuffValueArray[0];
        }
    }
}