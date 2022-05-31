// ！ 自动导出，请不要修改
//
/**
 * _ExistenceSceneDataConfig config配置文件
 * ! 自动导出，不要修改和直接引用
 */
export namespace _ExistenceSceneDataConfig {
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
       /** 每种敌人的数量 */
        EnemyCount: string;
    }
    /** config数据列表 */
    export var datas: _ExistenceSceneDataConfig.DataType[] = [];
    /** 文件名字 */
    export const fileName: string = 'ExistenceSceneDataConfig.json';
}
    