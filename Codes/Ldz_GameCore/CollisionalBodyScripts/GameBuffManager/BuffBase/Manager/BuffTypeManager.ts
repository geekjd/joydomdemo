import BUFF_AngelTreaty from "../BuffEffects/BUFF_AngelTreaty";
import BUFF_AttackSpeed from "../BuffEffects/BUFF_AttkackSpeed";
import BUFF_BeReborn from "../BuffEffects/BUFF_BeReborn";
import BUFF_ChanceProbability from "../BuffEffects/BUFF_ChanceProbability";
import BUFF_Damage from "../BuffEffects/BUFF_Damage";
import BUFF_DamageRebound from "../BuffEffects/BUFF_DamageRebound";
import BUFF_DeadlyProbability from "../BuffEffects/BUFF_DeadlyProbability";
import BUFF_DemonicContract from "../BuffEffects/BUFF_DemonicContract";
import BUFF_Distance from "../BuffEffects/BUFF_Distance";
import BUFF_DodgeProbability from "../BuffEffects/BUFF_DodgeProbability";
import BUFF_Ejection from "../BuffEffects/BUFF_Ejection";
import BUFF_ExpADD from "../BuffEffects/BUFF_ExpADD";
import BUFF_ExplodeLoudly from "../BuffEffects/BUFF_ExplodeLoudly";
import BUFF_ExtendRage from "../BuffEffects/BUFF_ExtendRage";
import BUFF_FastSpiderCharging from "../BuffEffects/BUFF_FastSpiderCharging";
import BUFF_FastStealth from "../BuffEffects/BUFF_FastStealth";
import BUFF_GhostAttackSpeed from "../BuffEffects/BUFF_GhostAttackSpeed";
import BUFF_GhostTime from "../BuffEffects/BUFF_GhostTime";
import BUFF_HaloExpansion from "../BuffEffects/BUFF_HaloExpansion";
import BUFF_HealthAndDamage from "../BuffEffects/BUFF_HealthAndDamage";
import BUFF_HealthValue from "../BuffEffects/BUFF_HealthValue";
import BUFF_HighPressure from "../BuffEffects/BUFF_HighPressure";
import BUFF_ImprovementAntennae from "../BuffEffects/BUFF_ImprovementAntennae";
import BUFF_ImprovementLog from "../BuffEffects/BUFF_ImprovementLog";
import BUFF_LifeStealing from "../BuffEffects/BUFF_LifeStealing";
import BUFF_LongFreeze from "../BuffEffects/BUFF_LongFreeze";
import BUFF_MoreBlood from "../BuffEffects/BUFF_MoreBlood";
import BUFF_MovingSpeed from "../BuffEffects/BUFF_MovingSpeed";
import BUFF_MultipleShot from "../BuffEffects/BUFF_MultipleShot";
import BUFF_ReduceInjury from "../BuffEffects/BUFF_ReduceInjury";
import BUFF_Repel from "../BuffEffects/BUFF_Repel";
import BUFF_RunningCattle from "../BuffEffects/BUFF_RunningCattle";
import BUFF_StormMaker from "../BuffEffects/BUFF_StormMaker";
import MagicBook from "../GameTimeBuff/MagicBook";
import Vertigo from "../GameTimeBuff/Vertigo";

export default class BuffTypeManager {

    private static _Instance: BuffTypeManager;
    private constructor() { }
    //公开的方法
    public static get Instance(): BuffTypeManager {
        if (!this._Instance) {
            this._Instance = new BuffTypeManager();
            this._Instance.InitType();
        }
        return this._Instance;
    }
    private InitType() {
        //Buff
        this.BuffTypeMap.set("BUFF_Distance", BUFF_Distance);
        this.BuffTypeMap.set("BUFF_HealthValue", BUFF_HealthValue);
        this.BuffTypeMap.set("BUFF_Damage", BUFF_Damage);
        this.BuffTypeMap.set("BUFF_MovingSpeed", BUFF_MovingSpeed);
        this.BuffTypeMap.set("BUFF_AttackSpeed", BUFF_AttackSpeed);
        this.BuffTypeMap.set("BUFF_Repel", BUFF_Repel);
        this.BuffTypeMap.set("BUFF_ReduceInjury", BUFF_ReduceInjury);
        this.BuffTypeMap.set("BUFF_ExpADD", BUFF_ExpADD);
        this.BuffTypeMap.set("BUFF_ExplodeLoudly", BUFF_ExplodeLoudly);
        this.BuffTypeMap.set("BUFF_DodgeProbability", BUFF_DodgeProbability);
        this.BuffTypeMap.set("BUFF_ChanceProbability", BUFF_ChanceProbability);
        this.BuffTypeMap.set("BUFF_DeadlyProbability", BUFF_DeadlyProbability);
        this.BuffTypeMap.set("BUFF_DamageRebound", BUFF_DamageRebound);
        this.BuffTypeMap.set("BUFF_LifeStealing", BUFF_LifeStealing);
        this.BuffTypeMap.set("BUFF_BeReborn", BUFF_BeReborn);
        this.BuffTypeMap.set("BUFF_HealthAndDamage", BUFF_HealthAndDamage);
        this.BuffTypeMap.set("BUFF_AngelTreaty", BUFF_AngelTreaty);
        this.BuffTypeMap.set("BUFF_DemonicContract", BUFF_DemonicContract);
        this.BuffTypeMap.set("BUFF_MultipleShot", BUFF_MultipleShot);
        this.BuffTypeMap.set("BUFF_FastStealth", BUFF_FastStealth);
        this.BuffTypeMap.set("BUFF_Ejection", BUFF_Ejection);
        this.BuffTypeMap.set("BUFF_GhostTime", BUFF_GhostTime);
        this.BuffTypeMap.set("BUFF_GhostAttackSpeed", BUFF_GhostAttackSpeed);
        this.BuffTypeMap.set("BUFF_HaloExpansion", BUFF_HaloExpansion);
        this.BuffTypeMap.set("BUFF_FastSpiderCharging", BUFF_FastSpiderCharging);
        this.BuffTypeMap.set("BUFF_LongFreeze", BUFF_LongFreeze);
        this.BuffTypeMap.set("BUFF_ExtendRage", BUFF_ExtendRage);
        this.BuffTypeMap.set("BUFF_MoreBlood", BUFF_MoreBlood);
        this.BuffTypeMap.set("BUFF_RunningCattle", BUFF_RunningCattle);
        this.BuffTypeMap.set("BUFF_StormMaker", BUFF_StormMaker);
        this.BuffTypeMap.set("BUFF_ImprovementLog", BUFF_ImprovementLog);
        this.BuffTypeMap.set("BUFF_ImprovementAntennae", BUFF_ImprovementAntennae);
        this.BuffTypeMap.set("BUFF_HighPressure", BUFF_HighPressure);

        /** */
        this.BuffTypeMap.set("Vertigo", Vertigo);
        this.BuffTypeMap.set("MagicBook", MagicBook);


    }

    /**
        * @param DoesTheEffectsTypeExist 检测是否拥有当前名称的Buff类型
        * @param TypeName 
        */
    DoesTheBuffTypeExist(TypeName: string): boolean {

        if (this.BuffTypeMap.has(TypeName)) {
            return true;
        }
        return false;
    }

    /**
  * @param GetTypeByName 根据名称获取类型
  * @param TypeName      //与类型相同的字符串
  */
    GetTypeByName(TypeName: string): any {

        if (this.BuffTypeMap.has(TypeName)) {
            return this.BuffTypeMap.get(TypeName);
        }

        return null;
    }

    /**
* @param GetTypeByName 根据名称获取类型
* @param TypeName      //与类型相同的字符串
*/
    GetBuffArrayBystring(TypeName: string): number[] {
        let NumTemoArray = [];
        let Temp = TypeName.split(',');
        for (let i = 0; i < Temp.length; i++) {
            NumTemoArray.push(Number(Temp[i]));
        }
        return NumTemoArray;
    }

    /**
    * @param BuffTypeMap Buff类型Map
    */
    BuffTypeMap: Map<string, any> = new Map<string, any>();

}