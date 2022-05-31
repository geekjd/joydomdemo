import DamageData from "src/Ldz_GameCore/MagicCubeSource/HoneyBeeManager/DamageData";
import MagicCubeSource from "src/Ldz_GameCore/MagicCubeSource/HoneyBeeManager/MagicCubeSource";
import MathUtils from "src/_T/Utils/MathUtils";
import BuffBase from "./BuffBase";
import BuffTypeManager from "./BuffTypeManager";

export default class BuffManager {

    // public states: Map<BuffBase, any> = new Map<BuffBase, any>();//人物拥有的所有状态集合  字典 key=Type value=PlayerStateBase
    BuffMap: Map<string, BuffBase> = new Map<string, BuffBase>();
    public m_SelfObj: Laya.Sprite3D;
    public m_SoldiersBase: MagicCubeSource;

    BuffMicIDList: number[] = [];

    /**初始化Buff管理器 */
    InitBuffManager(SelfObj: Laya.Sprite3D, SoldiersBase: MagicCubeSource) {
        this.m_SelfObj = SelfObj;
        this.m_SoldiersBase = SoldiersBase;
    }
    SetBuffList(BuffMiscIDStr: string) {
        if (BuffMiscIDStr == null || BuffMiscIDStr == "") { return; }
        this.BuffMicIDList = BuffTypeManager.Instance.GetBuffArrayBystring(BuffMiscIDStr);
    }

    /**获取随机BUFF */
    GetRandomBuff(): { SKillOne: number, SKillTwo: number } {
        if (this.BuffMicIDList == null || this.BuffMicIDList.length == 0) {
            return { SKillOne: 0, SKillTwo: 0 };
        }
        let Temp = [...this.BuffMicIDList];
        //this.BuffMicIDList.length - 1
        let TempIndex = MathUtils.randomRangeInt(0, Temp.length - 1);
        let SkillID_1 = Temp[TempIndex];
        Temp.splice(TempIndex, 1);
        let SkillID_2 = Temp[MathUtils.randomRangeInt(0, Temp.length - 1)];
        return { SKillOne: SkillID_1, SKillTwo: SkillID_2 };
    }
    /**添加Buff */
    AddBuffState(_BuffBase: string, Tempm_DamageData: DamageData) {
        if (BuffTypeManager.Instance.DoesTheBuffTypeExist(_BuffBase)) {
            if (this.BuffMap.has(_BuffBase)) {
                let Buf = this.BuffMap.get(_BuffBase);
                Buf.RefreshBuff();
            } else {
                let buf: BuffBase = new (BuffTypeManager.Instance.GetTypeByName(_BuffBase))();
                this.BuffMap.set(_BuffBase, buf);
                buf.InitBuffBase(this.m_SoldiersBase, Tempm_DamageData);
                buf.BuffOccur();
            }
        }
    }

    /**检测BUFF */
    CheckBuffbase(_BuffBase: BuffBase) {
        // for (let i = 0; i < this.BuffMap.length; i++) {
        //     if (this.BuffMap[i] == _BuffBase) {
        //         return this.BuffMap[i];
        //     }
        // }
        // return null;
    }

    /**攻击时
    * @param TempDamageData 我方数据
   */
    BuffOnHit(TempDamageData: DamageData) {
        this.BuffMap.forEach((Value, Key) => {
            Value.BuffOnHit(TempDamageData);
        });
    }

    /**受到到攻击 
     * @param TempDamageData 敌方数据
    */
    BuffBeHurt(TempDamageData: DamageData) {
        this.BuffMap.forEach((Value, Key) => {
            Value.BuffBeHurt(TempDamageData);
        });
    }

    /**被杀死时
     * @param TempDamageData 敌方数据
    */
    BuffBeforeKilled(TempDamageData: DamageData) {
        this.BuffMap.forEach((Value, Key) => {
            Value.BuffBeforeKilled(TempDamageData);
        });
    }

    /**敌人死亡时
     * @param TempDamageData 敌方方数据
    */
    BuffAfterKilled(TempDamageData: DamageData) {
        this.BuffMap.forEach((Value, Key) => {
            Value.BuffAfterKilled(TempDamageData);
        });
    }

    /**更新Buff */
    BuffUpdate() {
        let TempBuffMap: Map<string, BuffBase> = new Map<string, BuffBase>();
        this.BuffMap.forEach((Value, Key) => {
            if (Value != null && !Value.IsDestory) {
                Value.BuffOnTick();
                TempBuffMap.set(Key, Value)
            }
        });
        this.BuffMap = TempBuffMap;
    }

}