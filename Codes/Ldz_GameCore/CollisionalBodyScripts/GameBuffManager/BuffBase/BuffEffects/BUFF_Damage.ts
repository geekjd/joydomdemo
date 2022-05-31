import { HeroBuffDataProxy } from "src/Game/ConfigProxy/HeroBuffDataProxy";
import { _HeroBuffConfig } from "src/Game/_config/_HeroBuffConfig";
import BuffBase from "../Manager/BuffBase";



/**伤害增加 */
export default class BUFF_Damage extends BuffBase {

    RemoveTime = 0;
    RemoveMaxTime = 2;
    DownSpeed = 0.5;
    InitBuffBase(_SoldiersBase: any, TempDamageData: any) {
        super.InitBuffBase(_SoldiersBase, TempDamageData);
        let Temp: _HeroBuffConfig.DataType = HeroBuffDataProxy.instance.GetBuffInfoByEnglishName("BUFF_Damage");
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
            this.m_SoldiersBase.m_AttributeBase.m_Damage += this.BuffValueArray[0];
        }
    }


}