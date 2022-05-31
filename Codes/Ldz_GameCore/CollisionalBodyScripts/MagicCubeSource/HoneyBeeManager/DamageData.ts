import MagicCubeSource from "./MagicCubeSource";
import MagicCubeSourceAttributeBase from "./MagicCubeSourceAttributeBase";

/**伤害数据类 */
export default class DamageData {
    /**基础伤害 */
    BasicDamage: number;
    /**伤害系数 */
    DamageCoefficient: number = 1;
    /**击退距离 */
    RepelValue: number = 0;
    /**攻击区域判定盒系数*/
    AttackBoxCoefficient: number = 1;
    /**技能存续时间 */
    SkillTimerExtend = 0;
    /**目标数量 */
    AttackCount = 1;
    /**经验值 */
    Exp: number = 0;
    /**是否暴击 */
    IsCriticalHit: boolean = false;
    /**是否一击毙命 */
    ISOneShotDeath: boolean = false;
    /**传递到对方的buff效果 */
    TargetBuff: string[] = [];
    /**物体位置 */
    AttackPos: Laya.Vector3;
    /**传递方脚本 */
    m_SelfSc: MagicCubeSource;

    constructor(SelfSc: MagicCubeSource = null, Attribute: MagicCubeSourceAttributeBase = null) {
        if (Attribute != null) {
            this.BasicDamage = Attribute.m_Damage;
            this.Exp = Number(Attribute.m_KillExperience);
            this.RepelValue = Attribute.RepelValue;
        }
        if (SelfSc != null) {
            this.m_SelfSc = SelfSc;
        }
    }
    Refresh(Attribute: MagicCubeSourceAttributeBase) {
        this.BasicDamage = Attribute.m_Damage;
        this.Exp = Number(Attribute.m_KillExperience);
        /**是否暴击 */
        this.IsCriticalHit = false;
        /**是否一击毙命 */
        this.ISOneShotDeath = false;
        this.TargetBuff = [];
    }
    SetBuff(BuffName: string) {
        this.TargetBuff.push(BuffName);
    }
    Clone(): DamageData {
        let Temp = new DamageData();
        Temp.BasicDamage = this.BasicDamage;
        Temp.DamageCoefficient = this.DamageCoefficient;
        Temp.RepelValue = this.RepelValue;
        Temp.AttackBoxCoefficient = this.AttackBoxCoefficient;
        Temp.SkillTimerExtend = this.SkillTimerExtend;
        Temp.AttackCount = this.AttackCount;
        Temp.Exp = this.Exp;
        Temp.IsCriticalHit = this.IsCriticalHit;
        Temp.ISOneShotDeath = this.ISOneShotDeath;
        Temp.m_SelfSc = this.m_SelfSc;
        Temp.TargetBuff = [...this.TargetBuff];
        Temp.AttackPos = this.AttackPos ? this.AttackPos.clone() : null;
        return Temp;
    }

}