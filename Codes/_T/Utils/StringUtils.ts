import MathUtils from "./MathUtils";

/**
 * 字符串处理工具
 */
export default class StringUtils {
    /**
     * 分割成整型数组
     * @param str 字符串
     * @param splitStr 分割字符串
     */
    public static SplitToIntArray(str: string, splitStr: string): number[] {
        var splits = str.split(splitStr);
        var result = [];
        for (var i = 0; i < splits.length; ++i) {
            var parseNum = parseInt(splits[i]);
            if (isNaN(parseNum)) {
                parseNum = 0;
            }
            result.push(parseNum);
        }
        return result;
    }

    /**
     * int数组到字符串
     * @param arr 数组
     */
    public static IntArrToStr(arr: number[]): string {
        var str = "";
        for (var i = 0; i < arr.length; ++i) {
            str += arr[i].toFixed(0);
            if (i < arr.length - 1) {
                str += ","
            }
        }
        return str;
    }

    /**随机一个英文名 指定长度*/
    public static RandomEgName(length: number) {
        let name: string = "";
        for (let i = 0; i < length; i++) {
            let char: string;
            if (i == 0) {
                char = String.fromCharCode(MathUtils.randomRangeInt(65, 65 + 26));
            } else {
                char = String.fromCharCode(MathUtils.randomRangeInt(97, 97 + 26));
            }
            name += char;
        }
        return name;
    }

}