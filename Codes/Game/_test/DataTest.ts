import InstanceT from "src/_T/Ts/InstanceT";
import CustomDebug from "../Debug/CustomDebug";

/**
 * 数据测试类
 */
@InstanceT.DecorateInstance()
export default class DataTest {
    /** 单例 */
    public static readonly instance: DataTest;
    //
    private constructor() { }

    /**
     * 开始
     */
    public start() {

    }
}