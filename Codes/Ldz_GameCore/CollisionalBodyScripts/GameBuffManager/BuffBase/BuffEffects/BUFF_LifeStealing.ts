import { HeroBuffDataProxy } from "src/Game/ConfigProxy/HeroBuffDataProxy";
import { _HeroBuffConfig } from "src/Game/_config/_HeroBuffConfig";
import _PrefabPrefabName from "src/Game/_prefabsName/_PrefabPrefabNames";
import DamageData from "src/Ldz_GameCore/MagicCubeSource/HoneyBeeManager/DamageData";
import EssentialResUrls from "src/_T/Res/EssentialResUrls";
import ResLoad from "src/_T/Res/ResLoad";
import BuffBase from "../Manager/BuffBase";

/**生命偷取 */
export default class BUFF_LifeStealing extends BuffBase {

    RemoveTime = 0;
    RemoveMaxTime = 5;
    DownSpeed = 0.5;
    MeshObj: Laya.Sprite3D;
    probability: number = 0;
    InitBuffBase(_SoldiersBase: any, TempDamageData: any) {
        super.InitBuffBase(_SoldiersBase, TempDamageData);
        let Temp: _HeroBuffConfig.DataType = HeroBuffDataProxy.instance.GetBuffInfoByEnglishName("BUFF_LifeStealing");
        this.BuffValueAnalysis(Temp.BuffType, Temp.BuffValue);
    }
    BuffOccur() {
        this.setValue();
    }
    RefreshBuff() {
        this.setValue();
    }
    //敌人死亡时
    BuffAfterKilled(TempDamageData: DamageData) {
        let HitPoints: number = TempDamageData.m_SelfSc.m_AttributeBase.m_MaxHitpoints * this.probability;
        this.m_SoldiersBase.AddHitPoints(HitPoints);
    }
    setValue() {
        if (this.BuffValueArray.length >= 1) {
            this.probability = this.BuffValueArray[0];
        }
    }
}