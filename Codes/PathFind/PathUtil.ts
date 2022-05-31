import { LineType } from "./LineType";
import { MapGrid } from "./MultiLevelAStar/core/MapGrid";

export class PathUtil {
    
    public static HasBarrier(startX: number, startY: number, endX: number, endY: number, grid: MapGrid): boolean {
        let dx = Math.abs(startX - endX);
        let dy = Math.abs(startY - endY);
        if (dx <= 1 && dy <= 1) { return false; }

        var point1: number[] = [startX + 0.5, startY + 0.5];
        var point2: number[] = [endX + 0.5, endY + 0.5];

        var distX = Math.abs(endX - startX);
        var distY = Math.abs(endY - startY);

        var loopDirection = distX > distY ? true : false;


        if (loopDirection) {
            let lineFuction = this.getLineFunc(point1, point2, "X2Y");

            let loopStart = Math.min(startX, endX);
            let loopEnd = Math.max(startX, endX);
            for (let i = loopStart; i <= loopEnd; i++) {
                if (i == loopStart) { i += 0.5; }
                let yPos = lineFuction(i);
                let passedNodeList = this.getNodesUnderPoint(i, yPos);
                let preMinLayer: number;
                let preMaxLayer: number;
                let minLayer: number = Number.MAX_SAFE_INTEGER;
                let maxLayer: number = Number.MIN_SAFE_INTEGER;
                for (let j = 0; j < passedNodeList.length; j++) {
                    let p = passedNodeList[j];
                    var n = grid.getGridNodes()[p[1]][p[0]];
                    if (!n.getIsWalkable()) { return true; }
                    minLayer = Math.min(n.layer, minLayer);
                    maxLayer = Math.max(n.layer, maxLayer);
                    if (maxLayer - minLayer > 0) {
                        return true;
                    }
                }

                if (preMinLayer != null && preMaxLayer != null) {
                    if (Math.abs(preMaxLayer - minLayer) > 1 || Math.abs(preMaxLayer - maxLayer) > 1 || Math.abs(preMinLayer - minLayer) > 1 || Math.abs(preMinLayer - maxLayer) > 1) {
                        return true;
                    }
                }
                preMinLayer = minLayer;
                preMaxLayer = maxLayer;
                if (i == loopStart + 0.5) { i -= 0.5; }
            }
        } else {

            let lineFuction = this.getLineFunc(point1, point2, "Y2X");
            let loopStart = Math.min(startY, endY);
            let loopEnd = Math.max(startY, endY);
            for (let i = loopStart; i <= loopEnd; i++) {
                if (i == loopStart) { i += 0.5; }
                let xPos = lineFuction(i);
                let passedNodeList = this.getNodesUnderPoint(xPos, i);
                let preMinLayer: number;
                let preMaxLayer: number;
                let minLayer: number = Number.MAX_SAFE_INTEGER;
                let maxLayer: number = Number.MIN_SAFE_INTEGER;
                for (let j = 0; j < passedNodeList.length; j++) {
                    let p = passedNodeList[j];
                    var n = grid.getGridNodes()[p[1]][p[0]];
                    if (!n.getIsWalkable()) { return true; }
                    minLayer = Math.min(n.layer, minLayer);
                    maxLayer = Math.max(n.layer, maxLayer);
                    if (maxLayer - minLayer > 0) {
                        return true;
                    }
                }
                if (preMinLayer != null && preMaxLayer != null) {
                    if (Math.abs(preMaxLayer - minLayer) > 1 || Math.abs(preMaxLayer - maxLayer) > 1 || Math.abs(preMinLayer - minLayer) > 1 || Math.abs(preMinLayer - maxLayer) > 1) {
                        return true;
                    }
                }
                preMinLayer = minLayer;
                preMaxLayer = maxLayer;
                if (i == loopStart + 0.5) { i -= 0.5; }
            }
        }
        return false;
    }

    /**
     * 两点直线横跨的路径
     * @param startX 
     * @param startY 
     * @param endX 
     * @param endY 
     */
    public static LinePath(startX: number, startY: number, endX: number, endY: number): number[][] {
        //相邻点
        let dx = Math.abs(startX - endX);
        let dy = Math.abs(startY - endY);
        if (dx <= 1 && dy <= 1) { return [[startX, startY], [endX, endY]]; }

        var point1: number[] = [startX + 0.5, startY + 0.5];
        var point2: number[] = [endX + 0.5, endY + 0.5];

        var distX = Math.abs(endX - startX);
        var distY = Math.abs(endY - startY);

        var loopDirection = distX > distY ? true : false;

        var temp: number[][] = [];

        if (loopDirection) {
            let lineFuction = this.getLineFunc(point1, point2, "X2Y");

            let loopStart = Math.min(startX, endX);
            let loopEnd = Math.max(startX, endX);
            for (let i = loopStart; i <= loopEnd; i++) {
                if (i == loopStart) { i += 0.5; }
                let yPos = lineFuction(i);
                let passedNodeList = this.getNodesUnderPoint(i, yPos);
                temp.push(...passedNodeList);
                for (let j = 0; j < passedNodeList.length; j++) {

                }
                if (i == loopStart + 0.5) { i -= 0.5; }
            }
        } else {

            let lineFuction = this.getLineFunc(point1, point2, "Y2X");
            let loopStart = Math.min(startY, endY);
            let loopEnd = Math.max(startY, endY);
            for (let i = loopStart; i <= loopEnd; i++) {
                if (i == loopStart) { i += 0.5; }
                let xPos = lineFuction(i);
                let passedNodeList = this.getNodesUnderPoint(xPos, i);
                temp.push(...passedNodeList);
                for (let j = 0; j < passedNodeList.length; j++) {

                }
                if (i == loopStart + 0.5) { i -= 0.5; }
            }
        }

        return temp;
    }


    /**
     * 直线方程
     * @param point1 
     * @param point2 
     * @param type 
     */
    public static getLineFunc(point1: number[], point2: number[], type: LineType): (v: number) => number {
        let resultFuc: (v: number) => number;
        if (point1[0] == point2[0]) {
            if (type == "X2Y") {

            } else if (type == "Y2X") {
                resultFuc = (y: number) => {
                    return point1[0];
                }
            }
            return resultFuc;
        } else if (point1[1] == point2[1]) {
            if (type == "X2Y") {
                resultFuc = (x: number) => {
                    return point1[1];
                }
            } else if (type == "Y2X") {

            }
            return resultFuc;
        }


        var a = (point1[1] - point2[1]) / (point1[0] - point2[0]);
        var b = point1[1] - a * point1[0];
        if (type == "X2Y") {
            resultFuc = (x: number) => {
                return a * x + b;
            }
        } else if (type == "Y2X") {
            resultFuc = (y: number) => {
                return (y - b) / a;
            }
        }
        return resultFuc;
    }

    public static getNodesUnderPoint(xPos: number, yPos: number): number[][] {
        var result: number[][] = [];
        var xIsInt = xPos % 1 == 0;
        var yIsInt = yPos % 1 == 0;

        if (xIsInt && yIsInt) {
            result.push([xPos - 1, yPos - 1]);
            result.push([xPos, yPos - 1]);
            result.push([xPos - 1, yPos]);
            result.push([xPos, yPos]);
        } else if (xIsInt && !yIsInt) {
            result.push([xPos - 1, Math.floor(yPos)]);
            result.push([xPos, Math.floor(yPos)]);
        } else if (!xIsInt && yIsInt) {
            result.push([Math.floor(xPos), yPos - 1]);
            result.push([Math.floor(xPos), yPos]);
        } else {
            result.push([Math.floor(xPos), Math.floor(yPos)]);
        }

        return result;
    }
}
