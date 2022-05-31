// ！ 自动导出，请不要修改
//
/**
 * _CooperationSceneDataConfig config配置文件
 * ! 自动导出，不要修改和直接引用
 */
export namespace _CooperationSceneDataConfig {
    /** 配置表类型 */
    export const type: string = 'config';
    /** 数据类型 */
    export class DataType {
       /** 索引ID[必要] */
        id: number;
       /** 时间间隔 */
        GameLodeTimer: number;
       /** 敌人ID */
        EnemyMiscID: string;
       /** 敌人数量 */
        EnemyCount: string;
    }
    /** config数据列表 */
    export var datas: _CooperationSceneDataConfig.DataType[] = [];
    /** 文件名字 */
    export const fileName: string = 'CooperationSceneDataConfig.json';
}
    