import FGUI_GameFitingPlan from "src/FGUI/GameMain/FGUI_GameFitingPlan";
import _PrefabPrefabName from "src/Game/_prefabsName/_PrefabPrefabNames";
import MesManager from "src/_T/Mes/MesManager";
import BattleRoomCon from "../SceneScripts/BattleScene/BattleRoomCon";
import Desktopspeed from "./Desktopspeed";
import { E_AD_PlayerEvent } from "./PlayerEvent";

export class MarsJoy {
    /** 摇杆组件 */
    //private _JoyPlan: fairygui.GComponent;
    /** 点击事件组件*/
    private bgClickPlan: fairygui.GObject;
    /** 摇杆背景组件*/
    private joyBgRectTran: fairygui.GLoader;
    /**摇杆组件 */
    private joyRectTran: fairygui.GLoader;
    InitPosX: number;
    InitPosY: number;
    StarStageX: number;
    StarStageY: number;
    LastStageX: number;
    LastStageY: number;
    TopuchID: number = -1;
    IsTouch: boolean = false;
    Radius: number = 0;

    CilickWidth = 0;
    CilickHight = 0;

    Init(ui: FGUI_GameFitingPlan) {
        //获取摇杆组件
        //this._JoyPlan = ui.m_VirtualRocker.m_Joycomm;
        this.IsTouch = false;
        //获取事件触发组件
        this.bgClickPlan = ui.m_VirtualRocker.m_VirtualRocker;
        //摇杆中心背景
        this.joyBgRectTran = ui.m_VirtualRocker.m_ImageJoyBG;
        //摇杆
        this.joyRectTran = ui.m_VirtualRocker.m_ImageJoy;
        this.CilickWidth = ui.width;
        this.CilickHight = ui.height / 2;
        // this.bgClickPlan.setXY(0, 0);
        // this.bgClickPlan.width = ui.width ;
        // this.bgClickPlan._height = ui._height ;
        this.InitPosX = this.joyBgRectTran.x + this.joyBgRectTran.width / 2;
        this.InitPosY = this.joyBgRectTran.y + this.joyBgRectTran.height / 2;
        this.TopuchID = -1;
        this.Radius = 75;
        this.bgClickPlan.on(Laya.Event.MOUSE_DOWN, this, this.OnClickDown);

        Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.Drag);
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.Drag);
        Laya.stage.off(Laya.Event.MOUSE_UP, this, this.OnClickUp);
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.OnClickUp);

        //this.bgClickPlan.on(Laya.Event.MOUSE_MOVE, this, this.Drag);
        //this.bgClickPlan.on(Laya.Event.MOUSE_UP, this, this.OnClickUp);
        this.ShowJoy();
        Desktopspeed.Instance;
    }
    VectorZero = new Laya.Point(0, 0);
    private ShowJoy() {
        this.joyBgRectTran.visible = true;
        this.joyRectTran.visible = true;
    }
    private HideJoy() {
        this.joyBgRectTran.visible = false;
        this.joyRectTran.visible = false;
    }

    _localPos: Laya.Point;
    public OnClickDown(Point: Laya.Vector2) {
        if (Laya.stage.mouseX > this.CilickWidth || Laya.stage.mouseY < this.CilickHight) {
            return;
        }
        this.IsTouch = true;
        //this.ShowJoy();
        Point = new Laya.Vector2(Laya.stage.mouseX, Laya.stage.mouseY);
        this._localPos = fairygui.GRoot.inst.globalToLocal(Point.x, Point.y);
        this.StarStageX = this._localPos.x;
        this.StarStageY = this._localPos.y;
        this.LastStageX = this._localPos.x;
        this.LastStageY = this._localPos.y;
        this.joyBgRectTran.setXY(this._localPos.x - this.joyBgRectTran.width / 2, this._localPos.y - this.joyBgRectTran.height / 2);
        this.joyRectTran.setXY(this._localPos.x - this.joyRectTran.width / 2, this._localPos.y - this.joyRectTran.height / 2);
    }
    public OnClickUp() {
        //this.HideJoy();
        this.IsTouch = false;
        this.joyBgRectTran.setXY(this.InitPosX - this.joyBgRectTran.width / 2, this.InitPosY - this.joyBgRectTran.height / 2);
        this.joyRectTran.setXY(this.InitPosX - this.joyRectTran.width / 2, this.InitPosY - this.joyRectTran.height / 2);
        BattleRoomCon.Instance.UpdateOprator(121);
        //MesManager.event(E_AD_PlayerEvent.PlayerMove, [121]);
    }

    Move_X: number = 0;
    Move_Y: number = 0;
    Button_X: number = 0;
    Button_Y: number = 0;
    deltaX: number = 0;
    deltaY: number = 0;
    Red: number = 0;
    Degrees: number = 0;
    angle: number = 0;
    upDir: number = 0;
    MaxX: number = 0;
    MaxY: number = 0;
    public Drag(Point: Laya.Vector2) {

        if (!this.IsTouch) return;
        Point = new Laya.Vector2(Laya.stage.mouseX, Laya.stage.mouseY);

        this._localPos = fairygui.GRoot.inst.globalToLocal(Point.x, Point.y);
        this.Move_X = this._localPos.x - this.StarStageX;
        this.Move_Y = this._localPos.y - this.StarStageY;
        this.Button_X = this.joyRectTran.x + this.Move_X;
        this.Button_Y = this.joyRectTran.y + this.Move_Y;
        this.deltaX = this.Button_X + this.joyRectTran.width / 2 - this.StarStageX;
        this.deltaY = this.Button_Y + this.joyRectTran.height / 2 - this.StarStageY;

        this.Red = Math.atan2(this.deltaY, this.deltaX);
        this.Degrees = this.Red * 180 / Math.PI;
        this.angle = this.Degrees;
        if (this.angle < 0) {
            this.angle += 360;
        }
        /**偏移的角度 */
        this.angle += 45;
        if (this.angle > 360) {
            this.angle -= 360;
        }
        this.upDir = Math.floor(this.angle / 3);
        BattleRoomCon.Instance.UpdateOprator(this.upDir);
        //MesManager.event(E_AD_PlayerEvent.PlayerMove, [this.upDir]);

        this.MaxX = this.Radius * Math.cos(this.Red);
        this.MaxY = this.Radius * Math.sin(this.Red);

        if (Math.abs(this.Move_X) > Math.abs(this.MaxX)) {
            this.Move_X = this.MaxX;
        }
        if (Math.abs(this.Move_Y) > Math.abs(this.MaxY)) {
            this.Move_Y = this.MaxY;
        }
        this.Button_X = this.StarStageX + this.Move_X;
        this.Button_Y = this.StarStageY + this.Move_Y;
        //this.joyBgRectTran.setXY(Button_X- this.joyBgRectTran.width/2, Button_Y- this.joyBgRectTran.height/2);
        this.joyRectTran.setXY(this.Button_X - this.joyRectTran.width / 2, this.Button_Y - this.joyRectTran.height / 2);
    }

}