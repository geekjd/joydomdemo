import Attribute from "./Attribute";

/**
 * 战斗属性
 */
export default class BattleAttribute extends Attribute {
    /**攻击 */
    public atk: number;
    /**防御 */
    public def: number;
    /**最大血量 */
    public maxHp: number;
    /**当前血量 */
    public hp: number;
    /**攻击速度 */
    public atkSpeed: number;
    /**移动速度 */
    public moveSpeed: number;

    public constructor() {
        super();
    }
}