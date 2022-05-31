
// //import MobileDetect from "Ldz_GameCore/PlayerCore/JSScripts//mobile-detect.js"
// // declare module "JSScripts/mobile-detect.js" {
// //     export class MobileDetect {
// //         private a;
// //     }
// // }
// //import * as MobileDetect from "Ldz_GameCore/PlayerCore/JSScripts//mobile-detect.js"; //= require("JSScripts/mobile-detect.js");

// //import MobileDetect from "./JSScripts/MobileDetect";

// export default class PSS {
//     public static contains(Left, needle: string) {
//         for (let i in Left) {
//             if (this[i].indexOf(needle) > 0)
//                 return i;
//         }
//         return -1;
//     }

//     public static GetInfo() {

//         var device_type = Laya.Browser.userAgent;// window.navigator.userAgent;//Laya.Browser.userAgent;//获取userAgent信息
//         console.log(device_type);

//         var md = new MobileDetect(device_type);//初始化mobile-detect  
//         var os = md.os();//获取系统  
//         var model = "";
//         if (os == "iOS") {//ios系统的处理  

//             document.write(device_type);//打印到页面 
//             os = md.os() + md.version("iPhone");
//             document.write(os);//打印到页面 
//             model = md.mobile();
//             os = md.os() + md.version("iPhone");
//             // ios = md.mobile();
//             // //再通过iphone-device.js获取具体的苹果手机型号
//             // newMobile = md.getModels().join(' or ');
//             // if (newMobile == 'unknown') {
//             //     newMobile = '';
//             // }

//             // let phoneType = "";
//             // let wigth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
//             // if (wigth > 400) {
//             //     phoneType = "iphone6 plus";
//             // } else if (wigth > 370) {
//             //     phoneType = "iphone6";
//             // } else if (wigth > 315) {
//             //     phoneType = "iphone5 or iphone5s";
//             // } else if (wigth > 315) {
//             //     phoneType = "iphone 4s";
//             // } else {
//             //     phoneType = "您的设备太先进了";
//             // }
//             document.write(md.versionStr("Build"));//打印到页面  
//         } else if (os == "AndroidOS") {//Android系统的处理  
//             document.write(device_type);//打印到页面 
//             os = md.os() + md.version("Android");
//             // document.write(os);//打印到页面 
//             let sss: string[] = md.userAgent().split(";");
//             var i = this.contains(sss, "Build/");
//             if (i > -1) {
//                 model = sss[i].substring(0, sss[i].indexOf("Build/"));
//             }
//             document.write(model);//打印到页面 
//             console.log(model);
//             //判断是否是oppo R9s
//             if (model = " OPPO R9s ") {
//                 alert('您的手机是OPPO R9s');
//             }
//             if (model == " MI 6 ") {
//                 alert('您的手机是小米6');
//             }
//         }
//         console.log("---------------------------");
//         console.log('111' + model + '2222');
//         alert('111' + model + '2222');//打印系统版本和手机型号
//         // document.write(model);//打印到页面  
//     }
// }



// //请点赞哈 转载请注明出处