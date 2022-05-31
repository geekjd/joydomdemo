import FGUI_GameFitingPlan from "src/FGUI/GameMain/FGUI_GameFitingPlan";


export class RotatePlayer {
    /** 点击事件组件*/
    private bgClickPlan: fairygui.GObject;


    StarStageX: number;
    StarStageY: number;
    LastStageX: number;
    LastStageY: number;
    TopuchID: number = -1;
    IsTouch: boolean = false;
    CilickWidth = 0;

    Init(ui: FGUI_GameFitingPlan) {
        //获取摇杆组件
        this.IsTouch = false;
        //获取事件触发组件
        this.bgClickPlan = ui.m_VirtualRocker.m_VirtualRocker;
        this.CilickWidth = ui.width / 2;
        this.TopuchID = -1;
        this.bgClickPlan.on(Laya.Event.MOUSE_DOWN, this, this.OnClickDown);
        this.bgClickPlan.on(Laya.Event.MOUSE_MOVE, this, this.Drag);
        this.bgClickPlan.on(Laya.Event.MOUSE_UP, this, this.OnClickUp);
    }
    VectorZero = new Laya.Point(0, 0);
    public OnClickDown(Point: Laya.Vector2) {
        if (Laya.stage.mouseX < this.CilickWidth) {
            return;
        }
        this.IsTouch = true;
        Point = new Laya.Vector2(Laya.stage.mouseX, Laya.stage.mouseY);
        let _localPos: Laya.Point;
        _localPos = fairygui.GRoot.inst.globalToLocal(Point.x, Point.y);
        let Pos_X = _localPos.x;
        let Pos_Y = _localPos.y;
        this.StarStageX = Pos_X;
        this.StarStageY = Pos_Y;
        this.LastStageX = Pos_X;
        this.LastStageY = Pos_Y;
    }
    public OnClickUp() {
        this.IsTouch = false;
    }
    public Drag(Point: Laya.Vector2) {
        if (!this.IsTouch) return;
        Point = new Laya.Vector2(Laya.stage.mouseX, Laya.stage.mouseY);
        let _localPos: Laya.Point;
        _localPos = fairygui.GRoot.inst.globalToLocal(Point.x, Point.y);
        let Pos_X = _localPos.x;
        let Pos_Y = _localPos.y;
        let Move_X = Math.floor(Pos_X - this.LastStageX);
        let Move_Y = Math.floor(Pos_Y - this.LastStageY);
        this.LastStageX = Pos_X;
        this.LastStageY = Pos_Y;
        //MesManager.event(E_AD_PlayerEvent.PlayerRotate,[Move_X,Move_Y]);

    }
}