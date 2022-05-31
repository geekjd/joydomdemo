
import { Mathf } from "src/Ldz_GameCore/GeneralScripts/Mathf";
import { GamePathFinder } from "./GamePathFinder";
import { MapNode } from "./MultiLevelAStar/core/MapNode";
import { AStarFinder } from "./MultiLevelAStar/finders/astar-finder";
import { PathUtil } from "./PathUtil";
import Agent from "./RVO/Agent";
import RVOMath from "./RVO/RVOMath";
import Simulator from "./RVO/Simulator";
import Vector2D from "./RVO/Vector2D";

export class FinderAgent {
    openDebug = false;
    //A_Star
    finder: AStarFinder;
    currentNode: MapNode;
    stepGoalNode: MapNode;
    goalNode: MapNode;
    path: number[][];
    mapX: number = 0;
    mapY: number = 0;

    updatePathTimer = 0;

    //rvo
    rvpSimulator: Simulator;
    agent: Agent;
    lastPos = new Vector2D();
    //view
    sp: Laya.Sprite3D;

    IsUpdate: boolean = true;

    public get WorldPos(): Laya.Vector3 {
        return this.sp.transform.position;
    }
    public constructor(finder: AStarFinder, sp: Laya.Sprite3D, rvoSim: Simulator, speed: number, radius: number, openDebug = false) {
        this.openDebug = openDebug;
        this.finder = finder;
        this.sp = sp;
        this.rvpSimulator = rvoSim;
        this.lastPos = new Vector2D(this.sp.transform.localPositionX, this.sp.transform.localPositionZ);
        this.rvpSimulator.addAgent(this.lastPos);
        this.agent = this.rvpSimulator.agents[this.rvpSimulator.agents.length - 1];
        this.agent.maxSpeed = speed;
        this.agent.radius = radius;
        this.agent.prefVelocity = new Vector2D(0, 0);
        this.UpdateMapPos();
    }

    public FindPath(pos: Laya.Vector3) {
        if (!this.IsUpdate) { return; }
        this.UpdateMapPos();
        let x = Math.floor(-pos.x);
        let y = Math.floor(pos.z);
        x = Math.min(x, this.finder.getGrid().width - 1);
        x = Math.max(0, x);
        y = Math.min(y, this.finder.getGrid().height - 1);
        y = Math.max(0, y);
        let linePath = PathUtil.LinePath(this.currentNode.position.x, this.currentNode.position.y, x, y);
        if (this.canCross(linePath)) {
            this.path = [[this.currentNode.position.x, this.currentNode.position.y], [x, y]];
        } else {
            this.path = this.finder.findPath({ x: this.currentNode.position.x, y: this.currentNode.position.y }, { x, y });
            this.optimizePath();
        }
        this.goalNode = this.finder.getGrid().getGridNodes()[y][x];
        this.GoToNextGoal();
    }

    public UpdatePath() {
        if (!this.IsUpdate) return;
        if (this.goalNode == null) return;
        let x = this.goalNode.position.x;
        let y = this.goalNode.position.y;
        let linePath = PathUtil.LinePath(this.currentNode.position.x, this.currentNode.position.y, x, y);
        if (this.canCross(linePath)) {
            // if (this.GetNode(this.currentNode.position.x, this.currentNode.position.y).layer != this.goalNode.layer) {
            //     this.path = [[this.currentNode.position.x, this.currentNode.position.y], [x, y]];
            // } else {
            this.path = [[x, y]];
            // }
        } else {
            this.path = this.finder.findPath({ x: this.currentNode.position.x, y: this.currentNode.position.y }, { x, y });
            this.optimizePath();
        }
        if (this.openDebug) {

            let path = this.path;
            var color = new Laya.Vector4(Math.random(), Math.random(), Math.random(), 0.6);
            path.forEach(v => {
                let i = v[0];
                let j = v[1];
                let node = this.finder.getGrid().getGridNodes()[j][i];
                var sp = GamePathFinder.PathPrefab.clone() as Laya.MeshSprite3D;
                (sp.meshRenderer.material as Laya.UnlitMaterial).albedoColor = color;
                GamePathFinder.PathNode.addChild(sp);
                sp.transform.localPositionX = -node.position.x - 0.5;
                sp.transform.localPositionY = node.layer + 0.2;
                sp.transform.localPositionZ = node.position.y + 0.5;
            });
        }
        this.SetGoal(0);
    }

    private canCross(path: number[][]): boolean {
        if (!this.IsUpdate) { return; }
        for (var i = 1; i < path.length; i++) {
            let p = path[i];
            let node = this.finder.getGrid().getGridNodes()[p[1]][p[0]];
            p = path[i - 1];
            let preNode = this.finder.getGrid().getGridNodes()[p[1]][p[0]];
            if (node == null) {
                console.error(p);
            }
            if (!node.getIsWalkable() || Math.abs(node.layer - preNode.layer) > 1) {
                return false;
            }
        }
        return true;
    }

    public CheckGoal() {
        if (!this.IsUpdate) { return; }
        if (this.path == null) {
            this.agent.prefVelocity = new Vector2D(0, 0);
            this.MoveState = false;
            return;
        }
        if (RVOMath.absSq(this.rvpSimulator.getGoal(this.agent.id).minus(this.rvpSimulator.getAgentPosition(this.agent.id))) < 0.01) {
            this.GoToNextGoal();
        } else {
            if (this.currentNode.layer == this.goalNode.layer) {

                let x = this.currentNode.position.x - this.goalNode.position.x;
                let y = this.currentNode.position.y - this.goalNode.position.y;
                var dist = this.rvpSimulator.getGoal(this.agent.id).minus(this.agent.position).normalize();
                var sq = x * x + y * y;
                if (sq < 5) {
                    //console.log("减速");
                    if (sq < 0) {
                        this.SetStopMove();
                        //console.log("路径设置为空");
                        //this.path = null;
                        //this.goalNode = null;
                    } else {
                        this.agent.prefVelocity = dist.scale(this.agent.maxSpeed);
                        this.MoveState = true;
                    }
                    //this.agent.prefVelocity = dist.scale(sq / 25 * this.agent.maxSpeed);
                } else {
                    this.agent.prefVelocity = dist.scale(this.agent.maxSpeed);
                    this.MoveState = true;
                }
            }
        }

    }

    public GoToNextGoal() {
        this.path.splice(0, 1);

        this.SetGoal(0);
    }

    public SetGoal(index: number = 0) {
        if ((this.path != null) && (index < this.path.length)) {
            let p = this.path[index];
            let n = this.stepGoalNode = this.finder.getGrid().getGridNodes()[p[1]][p[0]];
            let x = -n.position.x - 0.5;
            let y = n.position.y + 0.5;
            this.rvpSimulator.setAgentGoal(this.agent.id, x, y);
        }
        this.agent.prefVelocity = this.rvpSimulator.getGoal(this.agent.id).minus(this.agent.position).normalize().scale(this.agent.maxSpeed);
        // if (this.agent.prefVelocity == undefined || this.agent.prefVelocity == null) {
        //     this.agent.prefVelocity = new Vector2D(0, 0);
        // }
    }

    public CheckSwitchMapPos() {
        if (!this.IsUpdate) { return; }
        let p = this.agent.position;
        let x = Math.floor(-p.x);
        let y = Math.floor(p.y);
        x = Math.min(x, GamePathFinder.Map_width - 1);
        x = Math.max(0, x);
        y = Math.min(y, GamePathFinder.Map_height - 1);
        y = Math.max(0, y);
        if (this.mapX != x || this.mapY != y) {
            var node = this.finder.getGrid().getGridNodes()[y][x];
            if (Math.abs(node.layer - this.currentNode.layer) > 1) {
                this.agent.position.x = this.lastPos.x;
                this.agent.position.y = this.lastPos.y;
            }
        }
    }

    public UpdateMapPos() {
        if (!this.IsUpdate) { return; }
        let x = Math.floor(-this.sp.transform.localPositionX);
        let y = Math.floor(this.sp.transform.localPositionZ);
        x = Math.min(x, GamePathFinder.Map_width - 1);
        x = Math.max(0, x);
        y = Math.min(y, GamePathFinder.Map_height - 1);
        y = Math.max(0, y);
        this.mapX = x;
        this.mapY = y;
        if (this.currentNode != null) {
            this.currentNode.GValueIndex--;
        }
        this.currentNode = this.finder.getGrid().getGridNodes()[y][x];
        this.currentNode.GValueIndex++;
        this.sp["__mapPos"] = { x: this.currentNode.position.x, y: this.currentNode.position.y };
    }

    LastY: number = 0;
    public UpdateWorldPos() {
        if (!this.IsUpdate) { return; }
        if (this.path == null || this.goalNode == null) {
            return;
        }
        this.sp.transform.position = this.sp.transform.position;
        this.CheckSwitchMapPos();
        this.lastPos.x = this.agent.position.x;
        this.lastPos.y = this.agent.position.y;
        this.sp.transform.localPositionX = this.agent.position.x;
        this.sp.transform.localPositionZ = this.agent.position.y;
        this.UpdateMapPos();
        //let cy = this.currentNode.layer;
        //this.sp.transform.localPositionY = 0;
        this.LastY = this.sp.transform.localRotationEulerY;
        this.target.setValue(this.agent.velocity.x, 0, this.agent.velocity.y);
        Laya.Vector3.normalize(this.target, this.target);
        Laya.Vector3.add(this.sp.transform.position, this.target, this.target);
        this.sp.transform.lookAt(this.target, this.up);
        //this.sp.transform.localRotationEulerY += 180;
        let Rotation_Y = this.sp.transform.localRotationEulerY + 180;
        // Rotation_Y = Mathf.Lerp(this.LastY, Rotation_Y, 0.2);
        this.sp.transform.localRotationEulerY = Rotation_Y;
        // let TempPos: Laya.Vector3 = new Laya.Vector3();
        // this.target.cloneTo(TempPos);
        // TempPos.y = 0;
        // Laya.Vector3.normalize(TempPos, TempPos);
        // let TempY = this.sp.transform.localRotationEulerY - this.LastY;
        // if (Math.abs(TempY) > 45) {
        //     this.LastY = this.sp.transform.localRotationEulerY;
        // } else {
        //     this.sp.transform.localRotationEulerY = this.LastY;
        // }
        //this.sp.transform.translate(TempPos, false);
        //this.sp.transform.position = this.sp.transform.position;

    }
    up = new Laya.Vector3(0, 1, 0);
    target = new Laya.Vector3();

    private optimizePath() {
        if (!this.IsUpdate) { return; }
        if (this.path.length > 2) {
            let newPath = [];
            newPath.push(this.path[0]);
            for (let i = 1; i < this.path.length - 1; i++) {
                let preN = this.path[i - 1];
                let curN = this.path[i];
                let nextN = this.path[i + 1];
                if ((curN[0] - preN[0] == nextN[0] - curN[0]) && (curN[1] - preN[1] == nextN[1] - curN[1])) {

                } else {
                    newPath.push(curN);
                }
            }
            let len = newPath.length;
            if (len > 2) {
                for (let i = len - 1; i >= 0; i--) {
                    for (let j = 0; j <= i - 2; j++) {
                        let p1 = newPath[i];
                        let p2 = newPath[j];
                        if (!PathUtil.HasBarrier(p1[0], p1[1], p2[0], p2[1], this.finder.getGrid())) {
                            for (let k = i - 1; k > j; k--) {
                                newPath.splice(k, 1);
                            }
                            i = j;
                            len = newPath.length;
                            break;
                        }
                    }
                }
            }
            newPath.push(this.path[this.path.length - 1]);
            this.path = newPath;
        }
    }
    private GetNode(x: number, y: number): MapNode {
        return this.finder.getGrid().getGridNodes()[y][x];
    }
    GetNodeByWordPos(WordPos: Laya.Vector3): MapNode {
        let p = WordPos;
        let x = Math.floor(-p.x);
        let y = Math.floor(p.z);
        x = Math.min(x, GamePathFinder.Map_width - 1);
        x = Math.max(0, x);
        y = Math.min(y, GamePathFinder.Map_height - 1);
        y = Math.max(0, y);
        var node = this.finder.getGrid().getGridNodes()[y][x];
        if (Math.abs(node.layer - this.currentNode.layer) > 1) {
            return null;
        } else {
            return node;
        }

    }


    public MoveState: boolean = false;
    public Range: number = 5;
    GetMoveCheck(): boolean {
        return this.MoveState;
    }
    public SetStopMove() {
        this.MoveState = false;
        this.path = null;
        this.goalNode = null;
        this.agent.prefVelocity = new Vector2D(0, 0);
        this.sp.transform.position = this.sp.transform.position;
        //this.currentNode.setIsWalkable(false);
    }
}