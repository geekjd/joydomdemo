import InstanceT from "src/_T/Ts/InstanceT";
import { HunterGameDataMediator } from "./HunterGameDataMediator";
import { SetDataProxy } from "./SetDataProxy";
import { GameShopDataMediator } from "./GameShopDataMediator";
import { HunterHeroInfoDataMediator } from "./HunterHeroInfoDataProxy";


/**
 * 数据管理器
 */
@InstanceT.DecorateInstance()
export default class DataManager {
    /** 单例 */
    public static readonly instance: DataManager;
    //
    private constructor() { }

    /**
     * 初始化
     */
    public init() {
        SetDataProxy.instance.initData();
        /** 游戏数据*/
        HunterGameDataMediator.instance.initData();
        /**游戏商店缓存数据 */
        GameShopDataMediator.instance.initData();
        /**游戏角色缓存数据 */
        HunterHeroInfoDataMediator.instance.initData();
    }

}