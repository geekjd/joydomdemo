import InstanceT from "src/_T/Ts/InstanceT";

@InstanceT.DecorateInstance()
export default class PlayerManager {
    public static readonly instance: PlayerManager;

    /**ActorId */
    public actorId: number;
    /**名字 */
    public name: string;
    /**出战英雄id */
    public battleHeroId: number;
    /**完成世界地图简单模式第几章节 */
    public worldEasyMain: number;
    /**完成世界地图简单模式第几章节的第几小关 */
    public WorldEasySub: number;
    /**完成世界地图困难模式第几章节 */
    public worldHardMain: number;
    /**完成世界地图困难模式第几章节的第几小关 */
    public worldHardSub: number;

    public constructor() {

    }
}