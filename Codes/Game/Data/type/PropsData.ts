/**道具数据 */
export class PropsData {
    /**1金币，2钻石，3宝箱，4碎片,5永久技能(BUFF)*/
    type: string = "";
    /**道具ID,永久技能(BUFF)就是BUFFID */
    id: number = 0;
    /**英雄ID */
    heroID: number = 0;
    /**道具数量 */
    count: number = 1;
}