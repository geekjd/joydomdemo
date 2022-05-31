// ！ 自动导出，请不要修改
//
/**
 * _FreeRewardConfig config配置文件
 * ! 自动导出，不要修改和直接引用
 */
export namespace _FreeRewardConfig {
    /** 配置表类型 */
    export const type: string = 'config';
    /** 数据类型 */
    export class DataType {
       /** 索引ID[必要] */
        id: number;
       /** 宝箱的ID */
        propID: number;
       /** 数量 */
        count: number;
    }
    /** config数据列表 */
    export var datas: _FreeRewardConfig.DataType[] = [];
    /** 文件名字 */
    export const fileName: string = 'FreeRewardConfig.json';
}
    