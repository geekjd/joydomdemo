import BaseConfigProxy from "../../_T/Config/BaseConfigProxy";
import InstanceT from "../../_T/Ts/InstanceT";
import ConfigT from "../../_T/Config/ConfigT";
import { _ResourcePropsConfig } from "../_config/_ResourcePropsConfig";
// import { isForOfStatement } from "node_modules/typescript/lib/typescript";
import { PropsData } from "../Data/type/PropsData";
import { ConstThing } from "src/Ldz_GameCore/GeneralScripts/GameDefine";
import { BoxItemsConfigProxy } from "./BoxItemsConfigProxy";
import { HeroAttributeInfoDataProxy } from "./HeroAttributeInfoDataProxy";
import { HunterHeroInfoDataMediator } from "../Data/HunterHeroInfoDataProxy";

@InstanceT.DecorateInstance()
@ConfigT.DecorateConfigProxy(_ResourcePropsConfig)
/**道具信息配置表 */
export class ResourcePropsDataProxy extends BaseConfigProxy<_ResourcePropsConfig.DataType>{
    /** 单例 */
    public static readonly instance: ResourcePropsDataProxy;
    //
    private constructor() { super(); }

    /**根据名称返回道具信息 */
    GetResourcePropsByName(Item: string): _ResourcePropsConfig.DataType {
        return this.dataList.find((Value) => {
            if (Item == Value.HeroChineseName) {
                return Value;
            }
        });
    }
    /**根据道具ID返回道具信息 */
    GetResourcePropsByMiscID(ItemID: number): _ResourcePropsConfig.DataType {
        return this.dataList.find((Value) => {
            if (ItemID == Value.ItemMiscID) {
                return Value;
            }
        });
    }

    /**生成宝箱内的物品 */
    public createBoxItem(boxID: number): PropsData[] {
        var arr: PropsData[] = [];
        // pd = new PropsData();
        // pd.type = ConstThing.TYPE_FRAGMENT;
        // pd.id = 21000;
        // pd.count = 9;
        // arr.push(pd);
        // pd = new PropsData();
        // pd.type = ConstThing.TYPE_SKILL;
        // pd.id = 700002;
        // pd.heroID = 100001;
        // pd.count = 1;
        // arr.push(pd);
        // pd = new PropsData();
        // pd.type = "hero";
        // pd.id = 100002;
        // arr.push(pd);
        var heroList = this.getHeroIDList();
        var config = BoxItemsConfigProxy.instance.getConfigByID(boxID);
        var count: number = config.count;
        var pd: PropsData;
        for (let i = 0; i < count; i++) {
            pd = new PropsData();
            if (i == 0) {
                var goldRand: number = Math.max(config.gold_min, Math.ceil(Math.random() * config.gold_max));
                pd.type = ConstThing.TYPE_RESOURCE;
                pd.id = ConstThing.GOLD_ID;
                pd.count = goldRand;
                arr.push(pd);
            } else {
                if (heroList.length <= 0) {
                    heroList = this.getHeroIDList();
                }
                //随机英雄
                var hRand: number = Math.floor(Math.random() * heroList.length);
                var heroID: number = heroList.splice(hRand, 1)[0];
                var heroConfig = HeroAttributeInfoDataProxy.instance.GetHeroAttributeInfoByMiscID(heroID);
                //随机碎片数量
                var fRand: number = Math.max(config.fragment_min, Math.ceil(Math.random() * config.fragment_max));
                pd.type = ConstThing.TYPE_FRAGMENT;
                pd.id = heroConfig.HeroFragment;
                pd.heroID = heroID;
                pd.count = fRand;
                arr.push(pd);
            }
        }

        //随机英雄-------------
        var canRandHero: number = Math.random() * 1000;
        if (canRandHero <= config.hero_per) {
            //可以通过配置表解锁的英雄的配置表
            var boxHero = HeroAttributeInfoDataProxy.instance.GetBoxUnlockHero();
            //筛选掉所有上面列表里已经解锁的英雄
            var unlockedHero = HunterHeroInfoDataMediator.instance.GetUnlockedHero();
            for (let i = 0; i < boxHero.length; i++) {
                var findIndex: number = unlockedHero.findIndex((data) => data.HeroMiscID == boxHero[i].HeroMiscID);
                if (findIndex != -1) {
                    boxHero.splice(i, 1);
                    i--;
                }
            }
            //如果有可解锁
            if (boxHero.length > 0) {
                //随机一个英index;
                var randHeroIndex: number = Math.floor(Math.random() * boxHero.length);
                pd = new PropsData();
                pd.type = "hero";
                pd.id = boxHero[randHeroIndex].HeroMiscID;
                pd.heroID = boxHero[randHeroIndex].HeroMiscID;
                arr.push(pd);
            }

        } else {
            //随机技能-------------
            var canRandSkill: number = Math.random() * 1000;
            if (canRandSkill <= config.skill_per) {
                //是否有英雄达到了6级
                var sixLevelHero = HunterHeroInfoDataMediator.instance.getSixLevelHeroList();
                if (sixLevelHero.length > 0) {
                    //随机英雄顺序
                    var heroRandIndex: number = Math.floor(Math.random() * sixLevelHero.length);
                    //随机英雄ID
                    var heroRandID = sixLevelHero[heroRandIndex].HeroMiscID;
                    //英雄技能配置
                    var heroSkillConfig = HeroAttributeInfoDataProxy.instance.GetHeroAttributeInfoByMiscID(heroRandID);
                    var skills: string[] = heroSkillConfig.GameSkills.split(",");
                    //英雄缓存数据
                    var heroInfo = HunterHeroInfoDataMediator.instance.GetUnlockedInfoByMiscID(heroRandID);
                    //筛选掉英雄已经解锁的技能
                    for (let i = 0; i < skills.length; i++) {
                        var check = heroInfo.UnlockedSkills.findIndex((data) => Number(skills[i]) == data);
                        if (check != -1) {
                            skills.splice(i, 1);
                            i--;
                        }
                    }
                    if (skills.length > 0) {
                        var randSkillIndex: number = Math.floor(Math.random() * skills.length);
                        pd = new PropsData();
                        pd.type = ConstThing.TYPE_SKILL;
                        pd.id = Number(skills[randSkillIndex]);
                        pd.heroID = heroInfo.HeroMiscID;
                        arr.push(pd);
                    }
                }
            }
        }
        return arr;
    }

    //获取英雄ID列表
    private getHeroIDList(): number[] {
        var heroList: number[] = [];
        var unlockHero = HunterHeroInfoDataMediator.instance.GetUnlockedHero();

        for (let i = 0; i < unlockHero.length; i++) {
            heroList.push(unlockHero[i].HeroMiscID);
        }
        return heroList;
    }

}