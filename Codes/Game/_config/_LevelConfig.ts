// ！ 自动导出，请不要修改
//
/**
 * _LevelConfig config配置文件
 * ! 自动导出，不要修改和直接引用
 */
export namespace _LevelConfig {
    /** 配置表类型 */
    export const type: string = 'config';
    /** 数据类型 */
    export class DataType {
       /** 关卡id[必要] */
        id: number;
       /** 关卡 */
        level: number;
       /** 关卡对应的场景 */
        env: string;
    }
    /** config数据列表 */
    export var datas: _LevelConfig.DataType[] = [];
    /** 文件名字 */
    export const fileName: string = 'LevelConfig.json';
}
    