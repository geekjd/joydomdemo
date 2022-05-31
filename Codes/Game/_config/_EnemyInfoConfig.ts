// ！ 自动导出，请不要修改
//
/**
 * _EnemyInfoConfig config配置文件
 * ! 自动导出，不要修改和直接引用
 */
export namespace _EnemyInfoConfig {
    /** 配置表类型 */
    export const type: string = 'config';
    /** 数据类型 */
    export class DataType {
       /** 索引ID[必要] */
        id: number;
       /** 敌人的MiscID */
        EnemyMiscID: number;
       /** 模型名称 */
        ModeName: string;
       /** 代码名称 */
        EnemyEnglishName: string;
       /** 中文名称 */
        EnemyChineseName: string;
       /** UI名称 */
        EnemyUiIcon: string;
       /** 投射物名称 */
        Projectiles: string;
       /** 场景类型 */
        SceneLayer: number;
       /** 攻击范围 */
        AttackRange: number;
       /** 生命值 */
        HealthValue: number;
       /** 攻击伤害 */
        AttackDamage: number;
       /** 移动速度 */
        MoveSpeed: number;
       /** 攻击速度 */
        AttackSpeed: number;
       /** 掉落奖励 */
        DropReward: string;
       /** 击杀经验 */
        KillExperience: string;
    }
    /** config数据列表 */
    export var datas: _EnemyInfoConfig.DataType[] = [];
    /** 文件名字 */
    export const fileName: string = 'EnemyInfoConfig.json';
}
    