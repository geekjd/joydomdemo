import { HeroBuffDataProxy } from "src/Game/ConfigProxy/HeroBuffDataProxy";
import { _HeroBuffConfig } from "src/Game/_config/_HeroBuffConfig";
import BuffBase from "../Manager/BuffBase";



/**生命值提升 */
export default class BUFF_HealthValue extends BuffBase {

    RemoveTime = 0;
    RemoveMaxTime = 3;
    DownSpeed = 0.5;
    InitBuffBase(_SoldiersBase: any, TempDamageData: any) {
        super.InitBuffBase(_SoldiersBase, TempDamageData);
        let Temp: _HeroBuffConfig.DataType = HeroBuffDataProxy.instance.GetBuffInfoByEnglishName("BUFF_HealthValue");
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
            this.m_SoldiersBase.m_AttributeBase.m_Hitpoints += this.BuffValueArray[0];
            this.m_SoldiersBase.m_AttributeBase.m_MaxHitpoints += this.BuffValueArray[0];
        }
    }

}