import BaseLocalDataProxy from "src/_T/Data/BaseLocalDataProxy";
import DataT from "src/_T/Data/DataT";
import InstanceT from "src/_T/Ts/InstanceT";
import AccountInfoData from "./type/AccountInfoData";

/**
 * 设置数据代理
 */
@InstanceT.DecorateInstance()
@DataT.DecorateDataTemplate(AccountInfoData)
export class AccountInfoDataProxy extends BaseLocalDataProxy<AccountInfoData>{
    /** 单例 */
    public static readonly instance: AccountInfoDataProxy;
    //
    private constructor() { super(); }



}