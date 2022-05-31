export class Random{
    /**返回介于 min [含] 与 max [不含] 之间的随机浮点数（只读）。 */
    public static Range(min: number, max: number): number {
        let k = Math.random();
        return min + (max - min) * k;
    }

    /**返回介于 min [含] 与 max [不含] 之间的随机整数（只读）。 */
    public static RangeInt(min: number, max: number): number {
        let num = Random.Range(min, max);
        return Math.floor(num);
    }

    /**返回介于 0于1之间的随机数（只读）。 */
    public static get random() {
        return Math.random();
    }
}