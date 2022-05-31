import AudioManager from "src/Game/Manager/AudioManager";
import AudioProxy from "src/Game/Manager/AudioProxy";
import { ESceneEvent } from "src/Game/MesEvent/ESceneEvent";
import { ESounds } from "src/Game/ResE/ESounds";
import _AllPrefabsNames from "src/Game/_prefabsName/_AllPrefabsNames";
import GlobalD3Environment from "src/_T/D3/scene/GlobalD3Environment";
import MesManager from "src/_T/Mes/MesManager";
import EssentialResUrls from "src/_T/Res/EssentialResUrls";
import ResLoad from "src/_T/Res/ResLoad";
import LayaUtils from "src/_T/Utils/LayaUtils";
import MathUtils from "src/_T/Utils/MathUtils";
import { EntityState, WorkType } from "../GeneralScripts/GameDefine";
import { Mathf } from "../GeneralScripts/Mathf";
import MagicCubeSource from "../MagicCubeSource/HoneyBeeManager/MagicCubeSource";
import CameraControl from "./CameraControl";
import Desktopspeed from "./Desktopspeed";
import { E_AD_PlayerEvent } from "./PlayerEvent";

export class PlayerControl extends Laya.Script3D {

    MoveDir: Laya.Vector3 = null;
    MoveSpeed: number = 1;
    RotateSpeed: number = 0.2;
    m_SelfObj: Laya.Sprite3D;
    logicSpeed: Laya.Vector2 = Laya.Vector2.ZERO;
    roleDirection: number;
    renderDir: Laya.Quaternion = new Laya.Quaternion(0, 0, 0);
    QuaternionZero: Laya.Quaternion = new Laya.Quaternion(0, 0, 0, 0);
    /**玩家状态控制 */
    m_PlayerBeeCon: MagicCubeSource;
    Char: Laya.CharacterController;
    Small: Laya.Sprite3D;
    onAwake() {

        /**添加事件 */
        // MesManager.on(E_AD_PlayerEvent.PlayerMove, this, this.Player_Move);
        this.m_SelfObj = this.owner as Laya.Sprite3D;
        CameraControl.Instance.SetTarget(this.m_SelfObj);
        this.renderDir = this.QuaternionZero;

    }
    onStart() {
        this.m_PlayerBeeCon = this.m_SelfObj.getComponent(MagicCubeSource);
        this.m_PlayerBeeCon.LevelUpgradeCallback = Laya.Handler.create(this, this.LevelUpgradeCallback, [], false);
        this.Char = this.m_SelfObj.addComponent(Laya.CharacterController);
        //创建胶囊碰撞器
        var sphereShape: Laya.CapsuleColliderShape = new Laya.CapsuleColliderShape(0.5, 3.4);
        //设置Shape的本地偏移
        sphereShape.localOffset = new Laya.Vector3(0, 1.0, 0);
        //设置角色控制器的碰撞形状
        this.Char.colliderShape = sphereShape;
        //this.Char.canCollideWith = 10;
        let Url = EssentialResUrls.PrefabURL(_AllPrefabsNames.smear);
        ResLoad.Load3D(Url, Laya.Handler.create(this, () => {
            let TempEff = ResLoad.GetRes(Url) as Laya.Sprite3D;
            this.Small = TempEff;
            TempEff.transform.localPosition = new Laya.Vector3(0, 0, 0);
            this.m_PlayerBeeCon.FootEffectsPos.addChild(TempEff);
        }));
        this.m_SelfObj.transform.position.y = -0.5;
        this.m_SelfObj.transform.position = this.m_SelfObj.transform.position;
        // Laya.stage.addChild(this.pl);
    }
    LevelUpgradeCallback(Levle: number) {
        console.log("等级升级  ————" + Levle);
        let Temp = this.m_PlayerBeeCon.m_BuffManager.GetRandomBuff();
        MesManager.event(ESceneEvent.ShowSkillPlan, [Temp.SKillOne, Temp.SKillTwo]);
    }
    LatsTarget: Laya.Sprite3D;

    MoveDIr: Laya.Vector3 = new Laya.Vector3();
    LastDir: Laya.Vector3 = new Laya.Vector3(); huawei
    LerpPos: Laya.Vector3 = new Laya.Vector3();


    //pl = new Laya.PixelLineSprite3D();

    ray = new Laya.Ray(new Laya.Vector3(), new Laya.Vector3());
    hitResult = new Laya.HitResult();
    Dir = new Laya.Vector3();
    LogicUpadate() {
        if (this.m_PlayerBeeCon == null || this.m_PlayerBeeCon.IsDie) return;


        this.m_SelfObj.transform.getForward(this.Dir);
        this.ray.origin = this.m_SelfObj.transform.position;
        Laya.Vector3.scale(this.Dir, -1, this.Dir);
        this.ray.direction = this.Dir;
        let Nom = new Laya.Vector3();
        let End = new Laya.Vector3();
        Laya.Vector3.normalize(this.Dir, Nom);
        Laya.Vector3.scale(Nom, 50, End)
        Laya.Vector3.add(this.ray.origin, End, End);

        /**旋转 */
        if (this.renderDir != this.QuaternionZero) {
            let Ro = new Laya.Quaternion(0, 0, 0, 0);
            Laya.Quaternion.lerp(this.m_SelfObj.transform.rotation, this.renderDir, 1, Ro);
            Ro.cloneTo(this.m_SelfObj.transform.rotation);
            this.m_SelfObj.transform.rotation = this.m_SelfObj.transform.rotation;
        }

        if (GlobalD3Environment.Scene3D.physicsSimulation.rayCast(this.ray, this.hitResult, 0.4) && this.m_PlayerBeeCon.m_WorkType == WorkType.HuntingType) {

            if (this.hitResult.collider.owner != null) {
                if ((this.hitResult.collider.owner as Laya.Sprite3D).layer == 10 || (this.hitResult.collider.owner as Laya.Sprite3D).layer == 0) {
                    return console.log("前方有碰撞物");
                }
            }
        }
        /**移动 */
        if (this.logicSpeed != Laya.Vector2.ZERO) {
            let Fo = new Laya.Vector3();
            this.m_SelfObj.transform.getForward(Fo);
            Fo.x *= -1;
            Fo.z *= -1;
            this.MoveDIr = new Laya.Vector3();

            let Dt = (Laya.timer.delta / 1000);// this.m_PlayerBeeCon.LowFps ? 0.045 : 0.015;
            Dt = Dt > 0.05 ? 0.05 : Dt;
            //console.log(Dt);
            Laya.Vector3.scale(Fo, (Dt * this.m_PlayerBeeCon.m_AttributeBase.m_Speed), this.MoveDIr);
            this.MoveDIr.y = 0;
            this.MoveDIr.cloneTo(this.LastDir);
            this.PlayerSoud();
            if (this.Small != null) { this.Small.active = true; }
            this.m_SelfObj.transform.translate(this.MoveDIr, false);
            //this.Char.move(this.MoveDIr);
        } else {
            this.renderDir = this.QuaternionZero;
            if (this.Small != null) {
                this.Small.active = false;
            }
            this.Char.move(new Laya.Vector3(0, 0, 0));
        }
    }

    SoundIndex: number = 0;
    IsPlay: boolean = true;
    PlayerSoud() {
        if (this.IsPlay) {
            if (this.SoundIndex == 0) {
                this.IsPlay = false;
                this.SoundIndex = 1;
                AudioProxy.instance.playSound((ESounds.footstep_01), 1, Laya.Handler.create(this, this.CheckSoundState), null, 0, this.m_SelfObj.transform.position.clone());
            } else {
                this.IsPlay = false;
                this.SoundIndex = 0;
                AudioProxy.instance.playSound((ESounds.footstep_02), 1, Laya.Handler.create(this, this.CheckSoundState), null, 0, this.m_SelfObj.transform.position.clone());
            }
        }
    }
    CheckSoundState() {
        this.IsPlay = true;
    }

    /**玩家移动 */
    public Player_Move(_dir: number) {
        if (this.m_PlayerBeeCon == null) return;
        if (this.m_PlayerBeeCon.IsDie) return;
        if (_dir > 120) {
            this.logicSpeed = Laya.Vector2.ZERO;
            this.renderDir = this.QuaternionZero;
            this.m_PlayerBeeCon.m_AnimatorManager.logicSpeed = Laya.Vector2.ZERO.clone();
            this.m_PlayerBeeCon.m_AnimatorManager.renderDir = this.QuaternionZero.clone();
            this.m_PlayerBeeCon.m_AnimatorManager.ChangeState(EntityState.Idle);
        }
        else {
            this.m_PlayerBeeCon.m_AnimatorManager.ChangeState(EntityState.Run);
            this.roleDirection = _dir * 3;
            if (this.roleDirection == 360) {
                this.roleDirection -= 1;
            }
            let Pos = Desktopspeed.Instance.GetSpeed(this.roleDirection).clone();
            Laya.Vector2.scale(Pos, this.MoveSpeed, Pos);
            this.logicSpeed = Pos.clone();
            let _renderDir: Laya.Vector3 = Desktopspeed.Instance.ChangeGameVectorToVector3(this.logicSpeed).clone();
            _renderDir.x *= -1;
            let RenderDir: Laya.Quaternion = new Laya.Quaternion(0, 0, 0, 0);
            Laya.Quaternion.rotationLookAt(_renderDir, new Laya.Vector3(0, 1, 0), RenderDir);
            this.renderDir = RenderDir.clone();
        }
    }
}