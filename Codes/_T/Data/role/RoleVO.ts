import { _HeroInfoConfig } from "src/Game/_config/_HeroInfoConfig";
import ConfigDB, { HeroConfig } from 'src/core/ConfigDB';

export class RoleVO {
    /**英雄id */
    heroId: number;
    /**英雄等级 */
    level: number;
    /**对于的英雄表 */
    config: HeroConfig;
    /**英雄是否解锁  /**0:可解锁   1:已解锁   2:有碎片   3:不可解锁  4:已上阵  */
    lockState: number;
}