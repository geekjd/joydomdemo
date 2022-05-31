// ！ 自动导出，请不要修改
//
/**
 * _HeroAttributeInfoConfig config配置文件
 * ! 自动导出，不要修改和直接引用
 */
export namespace _HeroAttributeInfoConfig {
    /** 配置表类型 */
    export const type: string = 'config';
    /** 数据类型 */
    export class DataType {
        /** 索引ID[必要] */
        id: number;
        /** 英雄索引的MiscID(对应英雄的ID) */
        HeroMiscID: number;
        /** 英雄碎片道具ID */
        HeroFragment: number;
        /** 代码名称 */
        HeroEnglishName: string;
        /** 英雄名称(配表) */
        HeroName: string;
        /** 英雄头像Icon */
        HeroIcon: string;
        /** 等级 */
        HeroLevle: number;
        /** 当前英雄个数 */
        CurHeroNum: number;
        /** 获取的所有奖杯数 */
        trophyNum: number;
        /** 当前英雄是否解锁(1:解锁，0:没有解锁) */
        IsUnblock: number;
        /** 英雄解锁类型
 （0:奖杯，1：开箱子，2：每日任务，
 3：活动积分，4：合作抵御波数，5：赛季奖励） */
        UnblockType: number;
        /** 解锁数量 */
        UnblockNum: number;
        /** 显示可升级动画
 (1:显示动画,0:不显示动画) */
        ShowAni: number;
        /** 升级所需碎片 */
        HeroUpFragment: number;
        /** 射程（攻击范围） */
        AttackRangeStr: string;
        /** 攻击范围
 (衡量单位:标准近战单位2.5) */
        AttackRange: number;
        /** 生命值 */
        HealthValue: number;
        /** 攻击伤害 */
        AttackDamage: number;
        /** 移动速度 */
        MoveSpeed: number;
        /** 攻击速度 */
        AttackSpeed: number;
        /** 游戏中可用的技能表 */
        GameSkills: string;
    }
    /** config数据列表 */
    export var datas: _HeroAttributeInfoConfig.DataType[] = [];
    /** 文件名字 */
    export const fileName: string = 'HeroAttributeInfoConfig.json';
}
