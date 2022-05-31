import Bomb from "../SkillEffects/Bomb";
import CatapultArrow from "../SkillEffects/CatapultArrow";
import Chop from "../SkillEffects/Chop";
import FireBall from "../SkillEffects/Fireball";
import HatTrick from "../SkillEffects/HatTrick";
import PoisonousFog from "../SkillEffects/PoisonousFog";
import Rollingwood from "../SkillEffects/Rollingwood";
import RotaryChop from "../SkillEffects/RotaryChop";
import SpiderPet from "../SkillEffects/SpiderPet";
import StraightFlight from "../SkillEffects/StraightFlight";
import Swordhand from "../SkillEffects/Swordhand";

export default class SkillTypeManager {

    private static _Instance: SkillTypeManager;
    private constructor() { }
    //公开的方法
    public static get Instance(): SkillTypeManager {
        if (!this._Instance) {
            this._Instance = new SkillTypeManager();
            this._Instance.InitType();
        }
        return this._Instance;
    }
    private InitType() {
        //Skill
        this.SkillTypeMap.set("CatapultArrow", CatapultArrow);
        this.SkillTypeMap.set("FireBall", FireBall);
        this.SkillTypeMap.set("Chop", Chop);
        this.SkillTypeMap.set("HatTrick", HatTrick);
        this.SkillTypeMap.set("Bomb", Bomb);
        this.SkillTypeMap.set("PoisonousFog", PoisonousFog);
        this.SkillTypeMap.set("RotaryChop", RotaryChop);
        this.SkillTypeMap.set("SpiderPet", SpiderPet);
        this.SkillTypeMap.set("StraightFlight", StraightFlight);
        this.SkillTypeMap.set("Rollingwood", Rollingwood);
        this.SkillTypeMap.set("Swordhand", Swordhand);
    }
    /**
        * @param DoesTheEffectsTypeExist 检测是否拥有当前名称的Buff类型
        * @param TypeName 
        */
    DoesTheSkillTypeExist(TypeName: string): boolean {

        if (this.SkillTypeMap.has(TypeName)) {
            return true;
        }
        return false;
    }
    /**
  * @param GetTypeByName 根据名称获取类型
  * @param TypeName      //与类型相同的字符串
  */
    GetTypeByName(TypeName: string): any {

        if (this.SkillTypeMap.has(TypeName)) {
            return this.SkillTypeMap.get(TypeName);
        }
        return null;
    }

    /**
 * @param SkillTypeMap Buff类型Map
 */
    SkillTypeMap: Map<string, any> = new Map<string, any>();

}