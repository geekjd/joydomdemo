import { HeroBuffDataProxy } from "src/Game/ConfigProxy/HeroBuffDataProxy";
import { _HeroBuffConfig } from "src/Game/_config/_HeroBuffConfig";
import BuffBase from "../Manager/BuffBase";

/**攻击距离 */
export default class BUFF_Distance extends BuffBase {

    RemoveTime = 0;
    RemoveMaxTime = 2;
    DownSpeed = 0.5;
    MeshObj: Laya.Sprite3D;
    Count: number = 0;
    InitBuffBase(_SoldiersBase: any, TempDamageData: any) {
        super.InitBuffBase(_SoldiersBase, TempDamageData);
        let Temp: _HeroBuffConfig.DataType = HeroBuffDataProxy.instance.GetBuffInfoByEnglishName("BUFF_Distance");
        this.BuffValueAnalysis(Temp.BuffType, Temp.BuffValue);
    }
    BuffOccur() {
        this.setValue();
    }
    RefreshBuff() {
        this.setValue();
    }

    setValue() {
        if (this.BuffValueArray.length >= 1) {
            this.m_SoldiersBase.m_AttributeBase.m_Range += this.BuffValueArray[0];
        }
    }
}