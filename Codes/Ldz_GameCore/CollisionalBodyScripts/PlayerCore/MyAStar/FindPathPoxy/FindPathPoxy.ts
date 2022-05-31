import AStarNode from "../AStarBase/AStarNode";
import AStarNodeCard from "../AStarBase/AStarNodeCard";

export default class FindPathPoxy {

    m_AStarNodeCard: AStarNodeCard;

    InitFind(CridWith: number, CridHight: number) {
        this.m_AStarNodeCard = new AStarNodeCard();

        //let WordPos: Laya.Vector3[][] = T_BattleRoomData.GetPathArray();
        // let NoWallIndex: number[] = T_BattleRoomData.GetWallkPathArray();
        //this.m_AStarNodeCard.InitData(CridWith, CridHight, WordPos, NoWallIndex);
    }

    GetVectorArrayPos(StarWordPos: Laya.Vector3, EndWordPos: Laya.Vector3): Laya.Vector3[] {
        let NodeArry: Array<AStarNode> = this.GetFindPath(StarWordPos, EndWordPos);
        let Path: Laya.Vector3[] = [];
        for (let i = 0; i < NodeArry.length; i++) {
            let Pos = NodeArry[i].WordPos.clone();
            Path.push(Pos);
        }
        //需要反序
        //Path.reverse();
        return Path;
    }
    WordPosCoOne: Laya.Vector3 = new Laya.Vector3();
    WordPosCoTwo: Laya.Vector3 = new Laya.Vector3();

    Pollen_RoomPoint: Laya.Vector3;
    Honey_RoomPoint: Laya.Vector3;
    Resin_RoomPoint: Laya.Vector3;
    Remnantwing_RoomPoint: Laya.Vector3;
    QueenBee_RoomPoint: Laya.Vector3;
    InsectPrisonPoint: Laya.Vector3;
    BeeEggs_RoomPoint: Laya.Vector3;
    /**获取路径节点 */
    private GetFindPath(StarWordPos: Laya.Vector3, EndWordPos: Laya.Vector3): Array<AStarNode> {
        let StarNode = this.GetAstarNode(StarWordPos);
        let EndNode = this.GetAstarNode(EndWordPos);
        if (StarNode == null || EndNode == null) {
            return [];
        }
        //开始节点 结束节点
        return this.m_AStarNodeCard.FindPath(StarNode, EndNode);
    }
    private GetAstarNode(WordPos: Laya.Vector3): AStarNode {
        return this.m_AStarNodeCard.FindAStarNode(WordPos);
    }
}