import _AllPrefabsNames from "src/Game/_prefabsName/_AllPrefabsNames";
import GlobalD3Environment from "src/_T/D3/scene/GlobalD3Environment";
import SceneNode from "src/_T/D3/scene/SceneNode";
import { FinderAgent } from "./FInderAgent";
import { AStarFinder } from "./MultiLevelAStar/finders/astar-finder";
import { Util } from "./MultiLevelAStar/Util";
import Agent from "./RVO/Agent";
import RVOMath from "./RVO/RVOMath";
import Simulator from "./RVO/Simulator";
import Vector2D from "./RVO/Vector2D";

var openDebug = false;

export class GamePathFinder {

    scene: Laya.Scene3D;
    //  public static scene: Laya.Scene3D;
    camera: Laya.Camera;
    //  public static Cam: Laya.Camera;
    pathPrefab: Laya.Sprite3D;
    // public static PathPrefab: Laya.Sprite3D;

    pathNode: Laya.Sprite3D;
    //public static PathNode: Laya.Sprite3D;

    finder: AStarFinder;

    public simulator: Simulator;
    public agentMap: FinderAgent[] = [];

    static Map_width: number = 45;
    static Map_height: number = 50;
    static PathPrefab: Laya.Sprite3D;
    static PathNode: Laya.Sprite3D;


    constructor() {

    }
    DeleteGamePathFinder() {
        if (this.simulator != null) {
            //this.simulator.
            delete this.simulator;
            this.simulator = null;
        }

        if (this.agentMap != null) {
            for (let i = 0; i < this.agentMap.length; i++) {
                if (this.agentMap[i] != null) {
                    delete this.agentMap[i];
                    this.agentMap[i] = null;
                }
            }
            delete this.agentMap;
            this.agentMap = null;
        }
        Laya.timer.clearAll(this);
    }

    obstacles: Laya.Sprite3D;
    players: Laya.Sprite3D;
    Point: Laya.Vector3;
    onLoadScene(s: SceneNode, Index: number) {
        this.agentMap = [];
        this.scene = GlobalD3Environment.Scene3D;
        let Level_Plan = this.scene.getChildByName("").getChildAt(0).getChildAt(0);
        let Map_Plan = Level_Plan.getChildByName("FindMap");

        let WH: string[] = Map_Plan.getChildAt(0).name.split("-");

        let width = WH[0];
        let height = WH[1];
        GamePathFinder.Map_width = Number(width);
        GamePathFinder.Map_height = Number(height);
        console.log(GamePathFinder.Map_width + "" + GamePathFinder.Map_height);
        // let Maparr = this.scene.getChildByName("FindMap");//s.prefabs[_AllPrefabsNames.Battle_Map];
        //let Map = Maparr[0] as Laya.Sprite3D;

        switch (Index) {
            case 1:
                this.camera = s.prefabs[_AllPrefabsNames.BattleCamera][0].getChildAt(0) as Laya.Camera;
                break;
            case 2:
                this.camera = s.prefabs[_AllPrefabsNames.HuntingCamera][0].getChildAt(0) as Laya.Camera;
                break;
            case 3:
                this.camera = s.prefabs[_AllPrefabsNames.CooperrationCamera][0].getChildAt(0) as Laya.Camera;
                break;
        }
        //this.camera = s.prefabs[_AllPrefabsNames.BattleCamera][0].getChildAt(0) as Laya.Camera
        //this.camera = GlobalD3Environment.Camera;

        GamePathFinder.PathNode = Map_Plan.getChildByName("ItemManage") as Laya.Sprite3D;
        GamePathFinder.PathPrefab = Map_Plan.getChildByName("Cube") as Laya.Sprite3D;
        this.pathNode = Map_Plan.getChildByName("ItemManage") as Laya.Sprite3D;
        this.obstacles = Level_Plan.getChildByName("Objectabs") as Laya.Sprite3D;
        this.players = Level_Plan.getChildByName("Players") as Laya.Sprite3D;

        //Laya.stage.on(Laya.Event.CLICK, this, this.onClick);
        // console.log("????????????A* ??????");

        //??????A*????????????
        this.finder = new AStarFinder({
            grid: {
                width: GamePathFinder.Map_width,
                height: GamePathFinder.Map_height,
            },  //????????????
            diagonalAllowed: true,  //???????????????????????????
            weight: 2,            //??????
            heuristic: "Manhatten", //"Euclidean"????????????
            includeStartNode: true,    //?????????????????????
            includeEndNode: true     //?????????????????????
        });

        //??????????????????
        this.simulator = new Simulator();
        let simulator = this.simulator;

        //????????????????????????????????????
        simulator.setTimeStep(0.01);
        //??????????????????
        simulator.setAgentDefaults(
            //????????????????????????????????????????????????????????????????????????????????????????????????????????????
            1.5, // neighbor distance (min = radius * radius)

            //???????????????????????????????????????????????????????????????????????????????????? ??????????????????????????????
            20, // max neighbors

            //???????????????????????????????????????
            0.015, // time horizon

            //?????????????????????????????????????????????????????????RTS?????????????????? ????????????????????????????????????????????????????????????????????????
            0.015, // time horizon obstacles

            //????????????ORCA???????????????????????????????????????????????????????????????????????? ??????????????????????????????????????????
            2, // agent radius

            //?????????????????????
            30 , // max speed

            //????????????
            // 2, // default velocity for x
            // 2, // default velocity for y
        )

        //???????????????
        this.createObstacle();
        //????????????
        //this.createLadder();
        //????????????
        this.createPlayers();
        //????????????????????????
        //Laya.timer.frameLoop(0.5, this, this.step);
        //??????
        //this.DrawGrid();
    }

    createPlayers() {
        //var mapNode = this.scene.getChildByName("map");
        var node = this.players;//mapNode.getChildByName("players");
        let sps: Laya.Sprite3D[] = [];
        for (var i = 0; i < node.numChildren; i++) {
            let player = node.getChildAt(i) as Laya.Sprite3D;
            sps.push(player);
            player.name = i + '';
            this.agentMap.push(new FinderAgent(this.finder, player, this.simulator, 5, 0.2, openDebug));
        }
        //MenuManager.inst.PushMenu("UI", PKG.Main, MenuKeyType.Main, 1, false, sps);
    }

    createObstacle() {

        // var mapNode = this.scene.getChildByName("map");
        var node = this.obstacles;// mapNode.getChildByName("obstacles");
        for (var i = 0; i < node.numChildren; i++) {
            let o = node.getChildAt(i) as Laya.Sprite3D;
            let xw = o.transform.localScaleX;
            let yw = o.transform.localScaleZ;
            let startX = Math.floor(-1 * (o.transform.localPositionX + xw * 0.5) + 0.5);
            let startY = Math.floor(o.transform.localPositionZ - yw * 0.5 + 0.5);
            let endX = startX + xw;
            let endY = startY + yw - 1;
            for (let h = startY; h <= endY; h++) {
                for (let w = startX; w <= endX; w++) {
                    if (w >= 0 && w < GamePathFinder.Map_width - 1 && h >= 0 && h < GamePathFinder.Map_height - 1) {
                        this.finder.getGrid().getGridNodes()[h][w].setIsWalkable(false);
                        this.finder.getGrid().getGridNodes()[h][w].layer = o.transform.localPositionY;

                        // let node = this.finder.getGrid().getGridNodes()[h][w];
                        // var sp = GamePathFinder.PathPrefab.clone() as Laya.MeshSprite3D;
                        // GamePathFinder.PathNode.addChild(sp);
                        // sp.transform.localPositionX = -node.position.x;
                        // sp.transform.localPositionY = node.layer + 0.5;
                        // sp.transform.localPositionZ = node.position.y;
                    }
                }
            }
        }
    }

    // createLadder() {
    //     var mapNode = this.scene.getChildByName("map");
    //     var node = mapNode.getChildByName("ladders");
    //     for (var i = 0; i < node.numChildren; i++) {
    //         let o = node.getChildAt(i) as Laya.Sprite3D;
    //         let xw = o.transform.localScaleX;
    //         let yw = o.transform.localScaleZ;
    //         let startX = Math.floor(-1 * (o.transform.localPositionX + xw * 0.5));
    //         let startY = Math.floor(o.transform.localPositionZ - yw * 0.5);
    //         let endX = startX + xw - 1;
    //         let endY = startY + yw - 1;
    //         for (let h = startY; h <= endY; h++) {
    //             for (let w = startX; w <= endX; w++) {
    //                 // this.finder.getGrid().getGridNodes()[h][w].setIsWalkable(false);
    //                 this.finder.getGrid().getGridNodes()[h][w].layer = o.transform.localPositionY;
    //             }
    //         }
    //     }
    // }

    DrawGrid() {

        var color = new Laya.Vector4(Math.random(), Math.random(), Math.random(), 0.6);
        for (let i = 0; i < GamePathFinder.Map_height; i++) {
            for (let j = 0; j < GamePathFinder.Map_width; j++) {
                //this.finder.getGrid().getGridNodes()[i][j].position
                let node = this.finder.getGrid().getGridNodes()[i][j];
                var sp = GamePathFinder.PathPrefab.clone() as Laya.MeshSprite3D;
                GamePathFinder.PathNode.addChild(sp);
                sp.transform.localPositionX = -node.position.x;
                sp.transform.localPositionY = node.layer + 0.2;
                sp.transform.localPositionZ = node.position.y;
            }
        }

    }

    ray = new Laya.Ray(new Laya.Vector3(), new Laya.Vector3());
    hit = new Laya.HitResult();
    onClick() {
        this.camera.viewportPointToRay(new Laya.Vector2(Laya.stage.mouseX, Laya.stage.mouseY), this.ray);
        if (this.scene.physicsSimulation.rayCast(this.ray, this.hit, 200)) {
            if (this.hit.collider.owner.name == 'BattlePlan') {
                // this.pathNode.removeChildren(0, this.pathNode.numChildren - 1);
                let pos = this.hit.point;
                {
                    //????????????????????? ????????????
                    let x = Math.floor(-pos.x);
                    let y = Math.floor(pos.z);
                    x = Math.min(x, this.finder.getGrid().width - 1);
                    x = Math.max(0, x);
                    y = Math.min(y, this.finder.getGrid().height - 1);
                    y = Math.max(0, y);
                    let node = this.finder.getGrid().getNodeAt(x, y);
                    console.log('node:' + x + '-' + y, 'lb:', node.lb, 'lt:', node.lt, 'rt:', node.rt, 'rb:', node.rb);

                }
                for (let i = 0; i < this.agentMap.length; i++) {
                    let agent = this.agentMap[i];
                    agent.FindPath(this.hit.point);
                }
            }
        }
    }

    timer = 0;
    step() {


        let count = 0;
        //console.log(this.agentMap);
        let simulator = this.simulator;
        simulator.setTimeStep(Util.deltaTimeSec);
        this.timer += Util.deltaTime;
        let updatePath = false;
        if (this.timer > 200) {
            this.timer = 0;
            updatePath = true;
        }
        if (updatePath) {

            // console.log("?????????");
            //this.pathNode.removeChildren(0, this.pathNode.numChildren - 1);
        }

        for (let i = 0; i < this.agentMap.length; i++) {
            var agent = this.agentMap[i];
            if (agent != null) {
                agent.CheckGoal();
                count++;
            }
        }

        simulator.run();

        for (let i = 0; i < this.agentMap.length; i++) {
            var agent = this.agentMap[i];
            if (agent != null) {
                agent.UpdateWorldPos();
                if (updatePath) {
                    agent.UpdatePath();
                }
            }
        }
    }

}

