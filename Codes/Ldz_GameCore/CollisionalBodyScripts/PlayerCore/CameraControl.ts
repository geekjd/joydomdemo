import { ESceneEvent } from "src/Game/MesEvent/ESceneEvent";
import GlobalD3Environment from "src/_T/D3/scene/GlobalD3Environment";
import MesManager from "src/_T/Mes/MesManager";
import { CameraUtils } from "src/_T/Utils/CameraUtils";
import MagicCubeSource from "../MagicCubeSource/HoneyBeeManager/MagicCubeSource";

//摄像机控制脚本
export default class CameraControl {

    //公开的方法
    public static get Instance(): CameraControl {
        if (!this._Instance) {
            this._Instance = new CameraControl();
        }
        return this._Instance;
    }
    IsStopCameraUpdate: boolean = false;
    MovePrant: Laya.Sprite3D;
    TarGetSc: MagicCubeSource;


    onClick() {
        //将屏幕坐标转化为射线
        this.m_Camera.viewportPointToRay(new Laya.Vector2(Laya.stage.mouseX, Laya.stage.mouseY), this.ray);
        if (this.physicsSimulation.rayCast(this.ray, this.hitResult)) {
            console.log("000");
            this.hitResult.point;
            MesManager.event(ESceneEvent.MoveToPos, [this.hitResult.point.clone()]);
        }
    }
    public Init() {
        this.m_Camera = GlobalD3Environment.Camera;
        this.Onclick = new Array<Function>();
        this.ray = new Laya.Ray(new Laya.Vector3(), new Laya.Vector3());
        this.hitResult = new Laya.HitResult();
        //获取物理模拟
        this.physicsSimulation = GlobalD3Environment.Scene3D.physicsSimulation;

        this.IsStopCameraUpdate = false;
        //  Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onClick);
    }
    SetCamera(Target: Laya.Camera) {
        this.m_Camera = Target;
    }

    SetCameraUpdate(IsUpdate: boolean) {
        this.IsStopCameraUpdate = IsUpdate;
    }
    /**设置摄像机跟随目标 */
    public SetTarget(_Target: Laya.Sprite3D) {
        this.Target = _Target;
        this.TarGetSc = (this.Target.getComponent(MagicCubeSource) as MagicCubeSource);
        this.SetAllPos();
        MesManager.off(ESceneEvent.SetCameraHuandong, this, this.SetCameraUpPos);
        MesManager.on(ESceneEvent.SetCameraHuandong, this, this.SetCameraUpPos);
    }
    /**更新摄像机 */
    UpdateCamera() {
        if (this.IsStopCameraUpdate) return;
        if (this.Target && !this.Target.destroyed) {
            this.m_Camera.transform.position = this.m_Camera.transform.position;
            this.MovePrant.transform.position = this.MovePrant.transform.position;
            let Pos = new Laya.Vector3(this.Target.transform.position.x, 0, this.Target.transform.position.z);
            if (this.MovePrant != null) {
                Laya.Vector3.lerp(this.MovePrant.transform.position, Pos, 0.2, Pos);
                this.MovePrant.transform.position = Pos;
                //this.SetCameraUpPos();
            }
        }
    }
    SetAllPos() {
        let Pos = new Laya.Vector3(this.Target.transform.position.x, 0, this.Target.transform.position.z);
        if (this.MovePrant != null) {
            this.MovePrant.transform.position = Pos;
            this.SetCameraUpPos();
        }
    }

    SetCameraUpPos(IsPlayerCon: boolean = false, Time: number = 500) {
        if (this.MovePrant != null) {
            let LeftY = this.m_Camera.transform.position.y;
            let Pos = new Laya.Vector3(this.Target.transform.position.x, 0, this.Target.transform.position.z);
            this.m_Camera.transform.position = Pos;
            this.m_Camera.transform.lookAt(Pos, this.UpPy);
            let Font = new Laya.Vector3();
            this.m_Camera.transform.getForward(Font);
            Font.x = -Font.x;
            Font.y = -Font.y;
            Font.z = -Font.z;
            let TempRang = this.TarGetSc.m_AttributeBase.m_Range - 1;
            TempRang = TempRang <= 4 ? 4 : TempRang;
            TempRang = TempRang >= 7 ? 7 : TempRang;
            if (IsPlayerCon) { TempRang += 2; }
            Laya.Vector3.scale(Font, 3.5 + TempRang * 3, Font);
            Laya.Vector3.add(this.m_Camera.transform.position, Font, Font);
            this.m_Camera.transform.position.x = Font.x;
            this.m_Camera.transform.position.y = LeftY == 0 ? Font.y : LeftY;
            this.m_Camera.transform.position.z = Font.z;
            this.m_Camera.transform.position = this.m_Camera.transform.position;
            let trans = this.m_Camera.transform;
            let pos = this.m_Camera.transform.position
            let tween = Laya.Tween.to(
                pos,
                { y: Font.y, update: new Laya.Handler(this, temp => trans.position = temp, [pos]) },
                Time,
                null,
                new Laya.Handler(this, () => {
                    //this.m_Camera.transform.position = this.m_Camera.transform.position;
                })//回调函数 End
            )//Tween End
        }
    }
    /**获取射线检测的资源 */
    public GetCameraRayToHitResult(): Laya.HitResult {
        this.m_Camera.viewportPointToRay(new Laya.Vector2(Laya.stage.mouseX, Laya.stage.mouseY), this.ray);
        if (this.physicsSimulation != null && this.physicsSimulation.rayCast(this.ray, this.hitResult) && this.Onclick != null) {
            return this.hitResult;
        }
        return null;
    }
    /**获取射线检测到的物体 */
    public GetCameraRayToObject(): Laya.Sprite3D {
        this.m_Camera.viewportPointToRay(new Laya.Vector2(Laya.stage.mouseX, Laya.stage.mouseY), this.ray);
        if (this.physicsSimulation != null && this.physicsSimulation.rayCast(this.ray, this.hitResult) && this.Onclick != null) {
            return this.hitResult.collider.owner as Laya.Sprite3D;
        }
        return null;
    }
    //获取屏幕坐标到世界坐标
    public GetViewToWorldPos(): Laya.Vector3 {
        let Pos = new Laya.Vector2(Laya.stage.mouseX, Laya.stage.mouseY);
        return CameraUtils.ScreenPosToWorldPos(this.m_Camera, Pos, 0);
    }
    UpPy = new Laya.Vector3(0, 1, 0);
    private Target: Laya.Sprite3D;
    private Onclick: Array<Function>;
    private ray: Laya.Ray;
    private hitResult: Laya.HitResult;
    private physicsSimulation: Laya.PhysicsSimulation;
    private static _Instance: CameraControl;
    private constructor() { }
    public m_Camera: Laya.Camera;
}
