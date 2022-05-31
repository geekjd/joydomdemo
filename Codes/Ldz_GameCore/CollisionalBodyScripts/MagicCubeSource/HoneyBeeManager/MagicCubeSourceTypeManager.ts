import ElfArcher from "../EntityHoneyBee/ElfArcher";
import Toon_Bat from "../Enemy/Toon_Bat";
import Barbarian from "../EntityHoneyBee/Barbarian";
import Bombardier from "../EntityHoneyBee/Bombardier";
import Gentleman from "../EntityHoneyBee/Gentleman";
import Wizard from "../EntityHoneyBee/Wizard";
import Gorgon from "../EntityHoneyBee/Gorgon";
import Knight from "../EntityHoneyBee/Knight";
import SpidersQueen from "../EntityHoneyBee/SpidersQueen";
import Toon_Cactus from "../Enemy/Toon_Cactus";
import Toon_Crow from "../Enemy/Toon_Crow";
import Toon_DeathKnight from "../Enemy/Toon_DeathKnight";
import Toon_Dragon from "../Enemy/Toon_Dragon";
import Toon_Ghost from "../Enemy/Toon_Ghost";
import Toon_Plant from "../Enemy/Toon_Plant";
import Toon_RockGolem from "../Enemy/Toon_RockGolem";
import Toon_Skeleton from "../Enemy/Toon_Skeleton";
import Toon_SkeletonKnight from "../Enemy/Toon_SkeletonKnight";
import ToonSpiderPurple from "../Pet/ToonSpiderPurple";
import King from "../EntityHoneyBee/King";
import LogRoller from "../EntityHoneyBee/LogRoller";
import NinjaAssassin from "../EntityHoneyBee/NinjaAssassin";

export default class MagicCubeSourceTypeManager {

    private static _Instance: MagicCubeSourceTypeManager;
    private constructor() { }
    //公开的方法
    public static get Instance(): MagicCubeSourceTypeManager {
        if (!this._Instance) {
            this._Instance = new MagicCubeSourceTypeManager();
            this._Instance.InitType();
        }
        return this._Instance;
    }
    /**
     * @param HoneyBeesTypeMap 蜜蜂类型Map
     */
    HoneyBeesTypeMap: Map<string, any> = new Map<string, any>();

    private InitType() {
        /**狩猎者 */
        this.HoneyBeesTypeMap.set("ElfArcher", ElfArcher);
        this.HoneyBeesTypeMap.set("Wizard", Wizard);
        this.HoneyBeesTypeMap.set("Gentleman", Gentleman);
        this.HoneyBeesTypeMap.set("Bombardier", Bombardier);
        this.HoneyBeesTypeMap.set("Barbarian", Barbarian);
        this.HoneyBeesTypeMap.set("Gorgon", Gorgon);
        this.HoneyBeesTypeMap.set("Knight", Knight);
        this.HoneyBeesTypeMap.set("SpidersQueen", SpidersQueen);
        this.HoneyBeesTypeMap.set("King", King);
        this.HoneyBeesTypeMap.set("LogRoller", LogRoller);
        this.HoneyBeesTypeMap.set("NinjaAssassin", NinjaAssassin);
        /**怪物 */
        this.HoneyBeesTypeMap.set("Toon_Bat", Toon_Bat);
        this.HoneyBeesTypeMap.set("Toon_Cactus", Toon_Cactus);
        this.HoneyBeesTypeMap.set("Toon_Crow", Toon_Crow);
        this.HoneyBeesTypeMap.set("Toon_DeathKnight", Toon_DeathKnight);
        this.HoneyBeesTypeMap.set("Toon_Dragon", Toon_Dragon);
        this.HoneyBeesTypeMap.set("Toon_Ghost", Toon_Ghost);
        this.HoneyBeesTypeMap.set("Toon_Plant", Toon_Plant);
        this.HoneyBeesTypeMap.set("Toon_RockGolem", Toon_RockGolem);
        this.HoneyBeesTypeMap.set("Toon_Skeleton", Toon_Skeleton);
        this.HoneyBeesTypeMap.set("Toon_SkeletonKnight", Toon_SkeletonKnight);

        /**宠物 */
        this.HoneyBeesTypeMap.set("ToonSpiderPurple", ToonSpiderPurple);

    }

    /**获取所有蜜蜂类型 */
    GetSoliderTypeArray(): Map<string, any> {
        return this.HoneyBeesTypeMap;
    }
    /**
        * @param DoesTheObstanleTypeExist 检测是否拥有当前名称的蜜蜂类型
        * @param TypeName 
        */
    DoesTheTypeExist(TypeName: string): boolean {

        if (this.HoneyBeesTypeMap.has(TypeName)) {
            return true;
        }
        return false;
    }

    /**
     * @param GetTypeByName 根据名称获取类型
     * @param TypeName      //与类型相同的字符串
     */
    GetTypeByName(TypeName: string): any {

        if (this.HoneyBeesTypeMap.has(TypeName)) {

            return this.HoneyBeesTypeMap.get(TypeName);
        }
        return null;
    }
}