import AStarNode, { emRoadNodeState } from "./AStarNode";


export default class AStarNodeCard {
    // Start is called before the first frame update
    public ItemCirdWith: number = 0;
    public ItemCirdHight: number = 0;
    ItemImageWith: number = 140;
    ItemImageHight: number = 140;
    public Nodes: Array<AStarNode> = new Array<AStarNode>();

    public destroyingItems: number = 0;

    NoWallIndex: number[];

    //重新开始游戏 清空数据
    private InitGameCoreData(WordPos: Laya.Vector3[][], NoWallIndex: number[]) {
        this.DestroyNodeItem();
        this.GenerateItemCird(WordPos);
        this.NoWallIndex = NoWallIndex;
    }
    InitData(CridWith: number, CridHight: number, WordPos: Laya.Vector3[][], NoWallIndex: number[]) {
        this.ItemCirdWith = CridWith;
        this.ItemCirdHight = CridHight;
        this.InitGameCoreData(WordPos, NoWallIndex);

    }
    /**初始化创建Node节点 */
    GenerateItemCird(WordPos: Laya.Vector3[][]) {

        for (let i = 0; i < this.ItemCirdHight; i++) {
            for (let j = 0; j < this.ItemCirdWith; j++) {
                let TempAStarNode: AStarNode = new AStarNode();
                TempAStarNode.itemCard = this;
                TempAStarNode.Index_X = j;
                TempAStarNode.Index_Y = i;
                TempAStarNode.WordPos = WordPos[i][j];
                TempAStarNode.index = (i * this.ItemCirdWith + j);
                TempAStarNode.row = TempAStarNode.index / this.ItemCirdWith;
                TempAStarNode.col = TempAStarNode.index % this.ItemCirdWith;
                TempAStarNode.Fatherindex = -1;
                this.Nodes.push(TempAStarNode);
            }
        }
    }
    FindAStarNode(WordPos: Laya.Vector3): AStarNode {
        for (let i = 0; i < this.Nodes.length; i++) {
            let Value = this.Nodes[i];
            if (Value.CheckWordPos(WordPos)) {
                return Value;
            }
        }
        return null;
    }

    /**获取节点坐标 */
    GetNodeItemPos(i_Pos_Y, i_Pos_X): Laya.Vector3 {
        let Pos_X = i_Pos_X - this.ItemCirdWith / 2;
        let Pos_Y = this.ItemCirdHight / 2 - i_Pos_Y;
        return new Laya.Vector3(Pos_X * this.ItemImageWith, Pos_Y * this.ItemImageHight, 1);
    }
    /**获取节点 */
    public GetNode(Pos_Y, Pos_X): AStarNode {
        if (Pos_Y < 0 || Pos_Y >= this.ItemCirdHight || Pos_X < 0 || Pos_X >= this.ItemCirdWith) {
            return null;
        }
        return this.Nodes[Pos_Y * this.ItemCirdWith + Pos_X];
    }

    // //获取标记的物体四周的Item
    // GetFishs(CurList: Array<AStarNode>, CurNode: AStarNode): Array<AStarNode> {
    //     let LeftNode: AStarNode = CurNode.GetLeftNodeList();
    //     if (this.CheckItem(LeftNode, CurNode)) {
    //         if (!(CurList.indexOf(LeftNode) > 0)) {
    //             CurList.push(LeftNode);
    //             CurList = this.GetFishs(CurList, LeftNode);
    //         }
    //     }
    //     let RightNode: AStarNode = CurNode.GetRightNodeList();
    //     if (this.CheckItem(RightNode, CurNode)) {
    //         if (!(CurList.indexOf(RightNode) > 0)) {
    //             CurList.push(RightNode);
    //             CurList = this.GetFishs(CurList, RightNode);
    //         }
    //     }
    //     let UpNode: AStarNode = CurNode.GetUpNodeList();
    //     if (this.CheckItem(UpNode, CurNode)) {
    //         if (!(CurList.indexOf(UpNode) > 0)) {
    //             CurList.push(UpNode);
    //             CurList = this.GetFishs(CurList, UpNode);
    //         }
    //     }
    //     let DownNode: AStarNode = CurNode.GetDownNodeList();
    //     if (this.CheckItem(DownNode, CurNode)) {
    //         if (!(CurList.indexOf(DownNode) > 0)) {
    //             CurList.push(DownNode);
    //             CurList = this.GetFishs(CurList, DownNode);
    //         }
    //     }

    //     let LeftUpNode: AStarNode = CurNode.GetLeftUPNodeList();
    //     if (this.CheckItem(LeftUpNode, CurNode)) {
    //         if (!(CurList.indexOf(LeftUpNode) > 0)) {
    //             CurList.push(LeftUpNode);
    //             CurList = this.GetFishs(CurList, LeftUpNode);
    //         }
    //     }

    //     let LeftDownNode: AStarNode = CurNode.GetLeftDownNodeList();
    //     if (this.CheckItem(LeftDownNode, CurNode)) {
    //         if (!(CurList.indexOf(LeftDownNode) > 0)) {
    //             CurList.push(LeftDownNode);
    //             CurList = this.GetFishs(CurList, LeftDownNode);
    //         }
    //     }
    //     let RightUpNode: AStarNode = CurNode.GetRightUpNodeList();
    //     if (this.CheckItem(RightUpNode, CurNode)) {
    //         if (!(CurList.indexOf(RightUpNode) > 0)) {
    //             CurList.push(RightUpNode);
    //             CurList = this.GetFishs(CurList, RightUpNode);
    //         }
    //     }
    //     let RightDownNode: AStarNode = CurNode.GetRightDownNodeList();
    //     if (this.CheckItem(RightDownNode, CurNode)) {
    //         if (!(CurList.indexOf(RightDownNode) > 0)) {
    //             CurList.push(RightDownNode);
    //             CurList = this.GetFishs(CurList, RightDownNode);
    //         }
    //     }
    //     return CurList;
    // }

    //检测Item是否满足条件
    CheckItem(LeftNode: AStarNode, CurNode: AStarNode): Boolean {
        if (LeftNode != null && LeftNode != CurNode) {
            // if ((LeftNode.Index_X == 0 && LeftNode.Index_X == CurNode.Index_X)
            //     || (LeftNode.Index_X == (this.ItemCirdWith - 1) && LeftNode.Index_X == CurNode.Index_X)) {
            //     return false;
            // }
            return true;
        }
        return false;
    }

    //清空 当前游戏的节点数据
    public DestroyNodeItem() {
        this.Nodes = [];
    }
    //开始寻找路径
    public FindPath(mP_StartNode: AStarNode, mP_EndNode: AStarNode): Array<AStarNode> {
        let Path: Array<AStarNode> = [];
        /**更新是否行走状态 */
        let Count = 0;
        for (let i = 0; i < this.Nodes.length; i++) {
            let CheckIndex = -1;
            if (this.NoWallIndex.length > 0 && Count < this.NoWallIndex.length) {
                CheckIndex = this.NoWallIndex[Count];
            }
            //this.Nodes[i].index
            if (CheckIndex == i) {
                this.Nodes[i].State = emRoadNodeState.RNS_CAN_PASS;
                Count++;
            } else {
                this.Nodes[i].State = emRoadNodeState.RNS_CANT_PASS;
            }
            this.Nodes[i].Fatherindex = -1;
        }
        mP_StartNode.State = emRoadNodeState.RNS_CAN_PASS;
        mP_EndNode.State = emRoadNodeState.RNS_CAN_PASS;
        Path = new Array<AStarNode>();
        if (this.AStarCore(mP_StartNode, mP_EndNode, Path)) {

            return Path;
        }
        return [];
    }
    /**计算H值 */
    private _Calc_H_Value(node: AStarNode, mP_EndNode: AStarNode): number {
        if (this) {
            let dx = Math.abs(node.col - mP_EndNode.col);
            let dy = Math.abs(node.row - mP_EndNode.row);
            return (dx + dy) * 10;
        }
        return 0;
    }
    /**计算G值 */
    private _Calc_G_Value(node: AStarNode): number {
        if (node) {
            if (node.Fatherindex == -1) {
                return 0;
            }
            else {
                //如果是水平关系，那么那么G值为10的增加
                if (node.row == this.Nodes[node.Fatherindex].row ||
                    this.Nodes[node.Fatherindex].col == node.col) {
                    return this.Nodes[node.Fatherindex].G + 10;
                }
                else {
                    //斜向移动为14的增加
                    return this.Nodes[node.Fatherindex].G + 14;
                }
            }
        }
        return 0;
    }
    /**F值 进行排序 */
    private cmp_f_value(node1: AStarNode, node2: AStarNode): number {
        if (node1.F < node2.F) return 1;
        else if (node1.F > node2.F) return -1;
        else return 0;
    }
    /**计算 逻辑值 */
    _CheckNodeAround(openlist: Array<AStarNode>, node: AStarNode, mP_EndNode: AStarNode): boolean {
        //int[,] dir = new int[2, 8]{
        //   {  0,+1,+1,+1,0,-1,-1,-1,},
        //   {  -1,-1,0,+1,+1,+1,0,-1}
        //};

        let dir: number[][] = [
            [0, , -1, 1, +1, -1, 0, -1, 1,],
            [-1, , -1, -1, 0, 0, +1, 1, 1,]];
        for (let i = 0; i < 8; i++) {
            let x = Math.floor(node.col + dir[0][i]);
            let y = Math.floor(node.row + dir[1][i]);
            if (x >= 0 && x < this.ItemCirdWith && y >= 0 && y < this.ItemCirdHight) {
                let curnode: AStarNode = this.Nodes[y * this.ItemCirdWith + x];
                if (this.CheckItem(node, curnode)) {
                    if (curnode.State == emRoadNodeState.RNS_CAN_PASS) {
                        curnode.Fatherindex = node.index;
                        curnode.State = emRoadNodeState.RNS_OPEN;
                        curnode.G = this._Calc_G_Value(curnode);
                        curnode.H = this._Calc_H_Value(curnode, mP_EndNode);
                        curnode.F = curnode.G + curnode.H;
                        openlist.push(curnode);
                    }
                    else if (curnode.State == emRoadNodeState.RNS_OPEN) {
                        let temp: AStarNode = curnode;
                        temp.Fatherindex = node.index;
                        temp.G = this._Calc_G_Value(temp);
                        if (temp.G < curnode.G) {
                            curnode.Fatherindex = node.index;
                            curnode.G = temp.G;
                            curnode.F = curnode.G + curnode.H;
                        }
                    }
                }
            }
        }
        // if (Temp.length != 0) {
        //     Temp.sort(this.cmp_f_value);
        //     openlist.push(Temp.pop());
        // }
        return false;
    }
    /**寻找路径中 */
    AStarCore(mP_StartNode: AStarNode, mP_EndNode: AStarNode, pathlist: Array<AStarNode>): boolean {
        if (this.Nodes != null && mP_StartNode != null && mP_EndNode != null) {
            let mOpenList: Array<AStarNode> = new Array<AStarNode>();
            //将起点加入栈中
            mP_StartNode.State = emRoadNodeState.RNS_OPEN;
            //mOpenList.push_back(mP_StartNode);
            mOpenList.push(mP_StartNode);
            //Queue<AStarNode> ll = new Queue<AStarNode>();
            //判断队列非空
            while (mOpenList.length != 0) {
                mOpenList.sort(this.cmp_f_value);//排序,找的是最小的F值。
                // mOpenList.sort(cmp_f_value);
                let curNode: AStarNode = mOpenList.pop();
                curNode.State = emRoadNodeState.RNS_CLOSE;
                if (curNode == mP_EndNode)//如果是终点，表示寻路结束
                {
                    let _node: AStarNode = mP_EndNode;
                    //pathlist.Insert(0, _node);
                    while (_node.Fatherindex != -1) {
                        _node.State = emRoadNodeState.RNS_PATH_NODE;
                        pathlist.unshift(_node);
                        _node = this.Nodes[_node.Fatherindex];
                    }
                    mP_StartNode.State = emRoadNodeState.RNS_PATH_NODE;
                    pathlist.unshift(mP_StartNode);
                    return true;
                }
                else {
                    //不是终点的情况下，将当前点周围符合寻路条件的某一个点都加入到OPEN_LIST
                    this._CheckNodeAround(mOpenList, curNode, mP_EndNode);
                }
            }
        }
        return false;
    }


}
