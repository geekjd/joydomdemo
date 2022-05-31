import { RoleModel } from './../../../_T/Data/role/RoleModel';
import AudioProxy from "src/Game/Manager/AudioProxy";
import { EUIEvent } from "src/Game/MesEvent/EUIEvent";
import { ESounds } from "src/Game/ResE/ESounds";
import { _ShopConfig } from "src/Game/_config/_ShopConfig";
import BaseSingleUICon from "src/_T/D2/FGUI/BaseSingleUICon";
import { EUILayer } from "src/_T/D2/FGUI/EUILayer";
import MesManager from "src/_T/Mes/MesManager";
import InstanceT from "src/_T/Ts/InstanceT";
import { ModelMgr } from 'src/_T/com/ModelManager';
import { ModelEnum } from 'src/_T/Misc/ConfigModel';
import FGUI_RoleAdvancedView from 'src/FGUI/GameMain/FGUI_RoleAdvancedView';
import { RoleVO } from 'src/_T/Data/role/RoleVO';
import FGUI_RoleHeadItem from 'src/FGUI/GameMain/FGUI_RoleHeadItem';
import ComResUrl from 'src/_T/Res/ComResUrl';
import ConfigDB, { HeroAttributeConfig } from 'src/core/ConfigDB';

/**
 * @export 角色进阶主界面
 * @class RoleView
 * @extends {BaseSingleUICon<FGUI_RoleView>}
 */
@InstanceT.DecorateInstance()
export class AdvancedView extends BaseSingleUICon<FGUI_RoleAdvancedView> {

    public static readonly instance: AdvancedView;
    protected _UI = FGUI_RoleAdvancedView;
    protected _layer = EUILayer.Panel;
    /**角色Model */
    private _roleModel: RoleModel;
    /**当前查看的英雄id */
    private _heroId: number = 0;
    /**当前查看的英雄的数据 */
    private _roleVO: RoleVO;

    private constructor() {
        super();
    }

    Init() {
        MesManager.on(EUIEvent.ShowAdvanced, this, this.Show);
        this._roleModel = ModelMgr.getModel(ModelEnum.RoleModel) as RoleModel;
        this._heroId = 1;
    }

    //显示回调
    protected _onShow(_ifNew: boolean, ...par) {
        console.log('打开角色进阶界面=====');
        this.addEvent();
        this.initialize();
    }

    private initialize() {
        this._roleVO = this._roleModel.heroMap.get(this._heroId);
        this.ui.m_property_now.m_lab_name.text = `${this._roleVO.config.Name}`;
        this.ui.m_property_after.m_lab_name.text = `${this._roleVO.config.Name}`;

        let nowHeroAttributeConfig: HeroAttributeConfig = ConfigDB.getHeroAttributeConfig((this._roleVO.heroId * 1000) + this._roleVO.level);
        this.ui.m_property_now.m_lab_harm.text = `${nowHeroAttributeConfig.AttackPower}`;
        this.ui.m_property_now.m_lab_hp.text = `${nowHeroAttributeConfig.Hp}`;
        this.ui.m_property_now.m_lab_range.text = `${nowHeroAttributeConfig.AttackSpeed}`;
        this.ui.m_property_now.m_lab_attack.text = `弹射箭`;
        let afterHeroAttributeConfig: HeroAttributeConfig = ConfigDB.getHeroAttributeConfig((this._roleVO.heroId * 1000) + this._roleVO.level + 1);
        if (afterHeroAttributeConfig) {
            this.ui.m_property_now.m_lab_level.text = `${this._roleVO.level}`;
            this.ui.m_property_after.m_lab_level.text = `${this._roleVO.level + 1}`;
            this.ui.m_property_after.m_lab_harm.text = `${afterHeroAttributeConfig.AttackPower}`;
            this.ui.m_property_after.m_lab_hp.text = `${afterHeroAttributeConfig.Hp}`;
            this.ui.m_property_after.m_lab_range.text = `${afterHeroAttributeConfig.AttackSpeed}`;
            this.ui.m_property_after.m_lab_attack.text = `弹射箭`;
        } else {
            this.ui.m_property_now.m_lab_level.text = `已满级`;
            this.ui.m_property_after.m_lab_level.text = `已满级`;
            this.ui.m_property_after.m_lab_harm.text = `${nowHeroAttributeConfig.AttackPower}`;
            this.ui.m_property_after.m_lab_hp.text = `${nowHeroAttributeConfig.Hp}`;
            this.ui.m_property_after.m_lab_range.text = `${nowHeroAttributeConfig.AttackSpeed}`;
            this.ui.m_property_after.m_lab_attack.text = `弹射箭`;
        }
        this.ui.m_list_roleHead.itemRenderer = Laya.Handler.create(this, this.RenderItemUnBlockFun, null, false);
        this.ui.m_list_roleHead.numItems = this._roleModel.allUnlockHero.length;
        this.ui.m_list_roleHead.on(fgui.Events.CLICK_ITEM, this, this.ONClickUnBlockHandler);
    }

    /*已经解锁英雄列表渲染函数 */
    private RenderItemUnBlockFun(index: number, obj: fgui.GObject) {
        let item = obj as FGUI_RoleHeadItem;
        /**解锁的 狩猎者信息 */
        let heroInfo: RoleVO = this._roleModel.allUnlockHero[index];
        item.data = heroInfo;
        item.m_img_fight.visible = false;
        /**英雄名字 */
        item.m_lab_name.text = heroInfo.config.Name;
        /**英雄等级 */
        item.m_lab_level.text = `${heroInfo.level}`;
        /**英雄icon */
        item.m_img_head.url = ComResUrl.MainFgui_url(heroInfo.config.Icon);
    }

    /**点击已解锁英雄Item */
    private ONClickUnBlockHandler(obj: fgui.GObject) {
        AudioProxy.instance.playSound(ESounds.click, 1);
        let roleVO: RoleVO = obj.data as RoleVO;
        if (this._heroId == roleVO.heroId) return;
        this._heroId = roleVO.heroId;
        this._roleVO = roleVO;
        this.initialize();
    }

    /**点击进阶 */
    private onCilckAdvanced() {
        console.log(`点击进阶====`);
    }

    addEvent() {
        this.ui.m_btn_advance.onClick(this, this.onCilckAdvanced);
    }

    removeEvent() {
        // this.ui.m_btn_advance.offClick(this, this.onCilckAdvanced);
    }

    _onHide() {
        this.removeEvent();
        AudioProxy.instance.playSound(ESounds.chest_landing, 1);
    }
}