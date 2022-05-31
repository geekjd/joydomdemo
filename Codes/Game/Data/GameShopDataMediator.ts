import GameShopData, { DiscountCommodityData } from "./type/GameShopData";
import BaseLocalDataProxy from "src/_T/Data/BaseLocalDataProxy";
import InstanceT from "src/_T/Ts/InstanceT";
import DataT from "src/_T/Data/DataT";
import { HunterHeroInfoDataMediator } from "./HunterHeroInfoDataProxy";
import { _ShopConfig } from "../_config/_ShopConfig";
import { ShopConfigProxy } from "../ConfigProxy/ShopConfigProxy";
import { ConstThing } from "src/Ldz_GameCore/GeneralScripts/GameDefine";
import { HeroAttributeInfoDataProxy } from "../ConfigProxy/HeroAttributeInfoDataProxy";
import { HunterGameDataMediator } from "./HunterGameDataMediator";

@InstanceT.DecorateInstance()
@DataT.DecorateDataTemplate(GameShopData)
export class GameShopDataMediator extends BaseLocalDataProxy<GameShopData>{
    /** 单例 */
    public static readonly instance: GameShopDataMediator;
    private hasHeroId: number[];
    private RandmCount: number;

    private constructor() { super(); }

    public refreshDiscountItem() {
        this.data.DiscountList = [];
        this.data.DiscountRefreshed = false;
        //到前天早上00:00点的时间差
        var date: Date = new Date();
        //刷新时间，明天早上00:00
        var refreshTime: number = Date.parse(date.toDateString()) + 1000 * 60 * 60 * 24;
        this.data.DiscountRefreshTime = refreshTime;

        //获得所有的已拥有的英雄的ID
        this.hasHeroId = [];
        var unlockHero = HunterHeroInfoDataMediator.instance.GetUnlockedHero();
        let Tempcount = HunterGameDataMediator.instance.data.CourseLv / 2;
        Tempcount = Math.floor(Tempcount);
        if (Tempcount < 1) {
            Tempcount = 1;
        } else if (Tempcount >= 6) {
            Tempcount = 6;
        }
        this.RandmCount = Tempcount;

        for (let i = 0; i < unlockHero.length; i++) {
            this.hasHeroId.push(unlockHero[i].HeroMiscID);
        }

        for (let i = 0; i < 6; i++) {
            if (i == 0) {
                var randType: number = Math.random();
                if (randType > 0.7) {
                    this.data.DiscountList.push(this.createBoxData());
                } else {
                    this.getRandomHeroData();
                }
            } else if (i == 1) {
                if (this.data.DiscountList[0].type == 1) {
                    var randType1: number = Math.random();
                    if (randType1 > 0.7) {
                        this.data.DiscountList.push(this.createBoxData());
                    }
                } else {
                    this.getRandomHeroData();
                }
            } else {
                this.getRandomHeroData();
            }

        }
    }

    /**生成随机英雄碎片数据 */
    private getRandomHeroData() {
        if (this.RandmCount > 0) {
            if (this.hasHeroId.length > 0) {
                var randId: number = Math.floor(Math.random() * this.hasHeroId.length);
                this.data.DiscountList.push(this.createHeroFragment(this.hasHeroId.splice(randId, 1)[0]));
            } else {
                this.data.DiscountList.push(this.createBoxData());
            }
            this.RandmCount--;
        }
        else {
            this.data.DiscountList.push(this.createHeroFragment(-1));
        }
    }


    /**生成一个箱子数据 */
    private createBoxData(): DiscountCommodityData {
        var data: DiscountCommodityData = new DiscountCommodityData();
        //随机一个1-3的整数
        var boxType: number = Math.ceil(Math.random() * 3);
        //第一条数据是箱子的配置参数
        var boxConfig: _ShopConfig.DataType = ShopConfigProxy.instance.getItemByType(1)[0];
        var temp: Array<String> = boxConfig.boxCost.split("%");
        var oldPrice: Array<String> = temp[0].split(":");
        var nowPrice: Array<String> = temp[1].split(":");
        data.type = 1;
        data.boxType = boxType;
        switch (boxType) {
            case 1:
                data.itemID = ConstThing.BOX1;
                break;
            case 2:
                data.itemID = ConstThing.BOX2;
                break;
            case 3:
                data.itemID = ConstThing.BOX3;
                break;
        }
        data.costType = 2;
        data.oldPrice = Number(oldPrice[boxType - 1]);
        data.nowPrice = Number(nowPrice[boxType - 1]);
        return data;
    }

    private createHeroFragment(id: number): DiscountCommodityData {
        var heroConfig: _ShopConfig.DataType = ShopConfigProxy.instance.getItemByType(1)[1];
        var heroinfo = HeroAttributeInfoDataProxy.instance.GetHeroAttributeInfoByMiscID(id);
        var data: DiscountCommodityData = new DiscountCommodityData();
        if (id > -1) {
            data.type = 2;
            data.itemID = heroinfo.HeroFragment;
            data.heroID = id;
            data.costType = 1;
            var rand: number = Math.ceil(Math.random() * heroConfig.ownValue);
            data.fragment = rand;
            data.nowPrice = rand * heroConfig.cost;
        } else {
            data.isvalid = false;
        }

        return data;
    }
}
