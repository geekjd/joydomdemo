import { RoleModel } from './../../../_T/Data/role/RoleModel';
import FGUI_RoleView from "src/FGUI/GameMain/FGUI_RoleView";
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
import FGUIShow3DPrefabe from "src/Ldz_GameCore/FGUI3D/FGUIShow3DPrefabe";
import ConfigDB, { HeroAttributeConfig } from 'src/core/ConfigDB';
import { RoleVO } from 'src/_T/Data/role/RoleVO';
import GlobalD3Environment from 'src/_T/D3/scene/GlobalD3Environment';
import EssentialResUrls from 'src/_T/Res/EssentialResUrls';
import ResLoad from 'src/_T/Res/ResLoad';
import { RodmControl } from 'src/Ldz_GameCore/PlayerCore/RodmControl';
import ComResUrl from 'src/_T/Res/ComResUrl';
import FGUI_RoleHeadItem from 'src/FGUI/GameMain/FGUI_RoleHeadItem';
import PlayerManager from 'src/core/manager/PlayerManager';
import App from "src/core/App";
import CodeC2S from 'src/core/net/CodeC2S';
import CodeS2C from 'src/core/net/CodeS2C';

/**
 * @export 角色主界面
 * @class RoleView
 * @extends {BaseSingleUICon<FGUI_RoleView>}
 */
@InstanceT.DecorateInstance()
export class RoleView extends BaseSingleUICon<FGUI_RoleView> {

    public static readonly instance: RoleView;
    protected _UI = FGUI_RoleView;
    protected _layer = EUILayer.Panel;
    /**角色Model */
    private _roleModel: RoleModel;
    /**当前查看的英雄id */
    private _heroId: number = 0;
    /**当前查看的英雄的数据 */
    private _roleVO: RoleVO;
    /**当前选择的英雄的皮肤名字 */
    private SelectHunterSkinName: string;
    private m_3dShowNode: any;
    private SoliderObj: Laya.Sprite3D;
    //开始旋转
    private startRotate: boolean = false;
    //鼠标拖拽起始X坐标
    private mouseOldPosX: number;

    private constructor() {
        super();
    }

    Init() {
        MesManager.on(EUIEvent.ShowRole, this, this.Show);
        this._roleModel = ModelMgr.getModel(ModelEnum.RoleModel) as RoleModel;
        this._heroId = 1;
    }

    //显示回调
    protected _onShow(_ifNew: boolean, ...par) {
        console.log('打开角色界面=====');
        this.addEvent();
        this.onHandoverShow(false);
        this.initialize();
    }

    private initialize() {
        console.log('=============', this._roleModel.heroMap);
        this._roleVO = this._roleModel.heroMap.get(this._heroId);
        let screenPos = new Laya.Vector3(this.ui.m_headimg.x, this.ui.m_headimg.y, 10);
        this.m_3dShowNode = new FGUIShow3DPrefabe(this.ui.m_headimg, screenPos);
        //切换皮肤按钮
        var skins: string[] = this._roleVO.config.Model.split(",");
        this.Lode3DSceneObj(skins[0]);
        // var cIndex: number = skins.indexOf(this.selectHeroInfo.HeroUsingSkin);
        // this.ui.m_huntTopCom.m_modelList.itemRenderer = Laya.Handler.create(this, this.renderModelListItem, null, false);
        // this.ui.m_huntTopCom.m_modelList.numItems = skins.length;
        // this.ui.m_huntTopCom.m_modelList.touchable = false;
        this.ui.m_model.clearPages();
        for (let i = 0; i < skins.length; i++) {
            this.ui.m_model.addPage("page" + (i + 1));
        }
        this.ui.m_model.selectedIndex = 0;
        this.ui.m_btn_left.onClick(this, this.selectSkin, [-1]);
        this.ui.m_btn_right.onClick(this, this.selectSkin, [1]);

        this.ui.m_property.m_lab_name.text = `${this._roleVO.config.Name}`;
        this.ui.m_property.m_lab_level.text = `${this._roleVO.level}`;
        let heroAttributeConfig: HeroAttributeConfig = ConfigDB.getHeroAttributeConfig((this._roleVO.heroId * 1000) + this._roleVO.level);
        this.ui.m_property.m_lab_harm.text = `${heroAttributeConfig.AttackPower}`;
        this.ui.m_property.m_lab_hp.text = `${heroAttributeConfig.Hp}`;
        this.ui.m_property.m_lab_range.text = `${heroAttributeConfig.AttackSpeed}`;
        this.ui.m_property.m_lab_attack.text = `弹射箭`;

        this.ui.m_list_roleHead.itemRenderer = Laya.Handler.create(this, this.RenderItemUnBlockFun, null, false);
        this.ui.m_list_roleHead.numItems = this._roleModel.allUnlockHero.length;
        this.ui.m_list_roleHead.on(fgui.Events.CLICK_ITEM, this, this.ONClickUnBlockHandler);
    }

    /**切换显示属性、技能 */
    private onHandoverShow(isSkill: boolean = true) {
        this.ui.m_property.visible = !isSkill;
        this.ui.m_roleSkillList.visible = isSkill;
        this.ui.m_img_property.url = ComResUrl.MainFgui_url(isSkill ? `role_infor_chose_btn1` : `role_infor_chose_btn2`);
        this.ui.m_img_roleSkillList.url = ComResUrl.MainFgui_url(isSkill ? `role_infor_chose_btn2` : `role_infor_chose_btn1`);
    }

    //切换皮肤
    private selectSkin(direc: number) {
        AudioProxy.instance.playSound(ESounds.click, 1);
        var skins: string[] = this._roleVO.config.Model.split(",");
        if (this.ui.m_model.selectedIndex + direc < 0) {
            return;
        } else if (this.ui.m_model.selectedIndex + direc >= skins.length) {
            return;
        }
        this.ui.m_model.selectedIndex += direc;
        this.SelectHunterSkinName = skins[this.ui.m_model.selectedIndex];
        this.Lode3DSceneObj(this.SelectHunterSkinName);
    }

    /*已经解锁英雄列表渲染函数 */
    private RenderItemUnBlockFun(index: number, obj: fgui.GObject) {
        let item = obj as FGUI_RoleHeadItem;
        /**解锁的 狩猎者信息 */
        let heroInfo: RoleVO = this._roleModel.allUnlockHero[index];
        item.data = heroInfo;
        item.m_img_fight.visible = heroInfo.heroId == this._heroId;
        item.scaleX = item.scaleY = heroInfo.heroId == this._heroId ? 1.1 : 1;
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

    /**
   * 将加载的3D物体显示到UI上
   * @param SoliderName 
   * @returns 
   */
    private Lode3DSceneObj(name: string) {
        this.Lode3DObj(name);
        let _showSpr: Laya.Sprite3D = this.m_3dShowNode.show3DNode;
        let node = _showSpr.addChild(this.SoliderObj);
        this.SoliderObj.transform.localRotationEulerY = 20;
        this.SoliderObj.transform.localRotationEulerZ = -0;
        this.SoliderObj.transform.localPosition = new Laya.Vector3(0, -1, 0);
    }

    /**
    * 加载3D物体
    * @param SoliderName
    * @returns 
    */
    private Lode3DObj(SoliderName: string) {
        if (this.SoliderObj != null && !this.SoliderObj.destroyed && this.SoliderObj.name == SoliderName) {
            return;
        }
        this.DisObj();
        this.SoliderObj = new Laya.Sprite3D(SoliderName);
        if (GlobalD3Environment.Scene3D != null) {
            GlobalD3Environment.Scene3D.addChild(this.SoliderObj);
        }
        let Url = EssentialResUrls.PrefabURL(SoliderName);
        ResLoad.Load3D(Url, Laya.Handler.create(this, () => {
            let Obj = ResLoad.GetRes(Url) as Laya.Sprite3D;
            if (this.SoliderObj == null) return;
            let TempCoSp = Obj.getChildByName("TirggerCollider");
            if (TempCoSp != null) {
                let TempMesh = TempCoSp as Laya.MeshSprite3D;
                TempMesh.meshRenderer.enable = false;
            }
            this.SoliderObj.addChild(Obj);
            Obj.transform.localPosition = new Laya.Vector3(0, 1, 0);
            Obj.transform.localScale = new Laya.Vector3(1.5, 1.5, 1.5);
            let TempRodmControl: RodmControl = Obj.addComponent(RodmControl);
            let Mesh = Obj.getChildAt(0) as Laya.SkinnedMeshSprite3D;
            let Matr: Laya.Material[] = [];
            Matr.push(Mesh.skinnedMeshRenderer.sharedMaterials[0]);
            Mesh.skinnedMeshRenderer.sharedMaterials = Matr;
            //TempRodmControl.IdleName;
            if (TempRodmControl != null) {
                try {
                    TempRodmControl.m_Animator.play(TempRodmControl.IdleName);
                } catch {
                }
            }
        }));
    }

    /**
    * 销毁3D物体
    */
    private DisObj() {
        if (this.SoliderObj != null) {
            this.SoliderObj.destroy();
            this.SoliderObj = null;
        }
    }

    private mouseDown() {
        this.startRotate = true;
        this.mouseOldPosX = Laya.stage.mouseX;
    }

    private mouseUp() {
        this.startRotate = false;
    }

    private mouseMove() {
        if (this.startRotate) {
            var tempX: number = Laya.stage.mouseX;
            this.SoliderObj.transform.localRotationEulerY += tempX - this.mouseOldPosX;
            this.mouseOldPosX = tempX;
        }
    }

    /**点击出战 */
    private onCilckBattle() {
        if (PlayerManager.instance.battleHeroId == this._heroId) return;
        let obj: any = {};
        obj.msgId = CodeC2S.HERO_BATTLE;
        obj.HeroId = this._heroId;
        App.socket.send(obj);
    }

    /**请求出战返回 */
    private onBattleReturn(message) {
        console.log("---------请求出战返回-------", message);
    }

    addEvent() {
        //模型旋转监听
        this.ui.m_headimg.on(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
        this.ui.m_headimg.on(Laya.Event.MOUSE_UP, this, this.mouseUp);
        this.ui.on(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
        this.ui.m_img_property.onClick(this, this.onHandoverShow, [false]);
        this.ui.m_img_roleSkillList.onClick(this, this.onHandoverShow, [true]);
        this.ui.m_btn_battle.onClick(this, this.onCilckBattle);
        // App.socket.addEventListener(CodeS2C.HERO_BATTLE, this, this.onBattleReturn);
    }

    removeEvent() {
        // this.ui.m_headimg.off(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
        // this.ui.m_headimg.off(Laya.Event.MOUSE_UP, this, this.mouseUp);
        // this.ui.off(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
        // this.ui.m_img_property.offClick(this, this.onHandoverShow);
        // this.ui.m_img_roleSkillList.offClick(this, this.onHandoverShow);
    }

    _onHide() {
        this.removeEvent();
        AudioProxy.instance.playSound(ESounds.chest_landing, 1);
    }
}