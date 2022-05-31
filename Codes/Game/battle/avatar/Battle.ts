import BattleAttribute from "../attribute/BattleAttribute";
import Enemy from "./Enemy";

/**
 * 战斗对象，加入了战斗属性
 */
export default class Battle extends Enemy {

    private _attribute: BattleAttribute;

    public constructor() {
        super();
    }

    protected init(): void {
        super.init();

        this.initAttribute();
    }

    /**初始化属性 */
    protected initAttribute(): void {
        this._attribute = new BattleAttribute();
    }

    public dispose(): void {
        super.dispose();
    }

    public get attribute(): BattleAttribute {
        return this._attribute;
    }
}