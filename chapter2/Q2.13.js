import {make_center_percent, make_center_width, mul_interval, percent} from "./interval.js";
// 误差很小的情况下，区间乘积误差百分比=两个区间误差百分比之和
(function () {
    // 练习2.13 请证明，在误差为很小的百分值的情况下，存在一个简单公式，利用它可以从两个被乘区间的误差算出乘积的百分数误差。
    // 你可以假定所有的数为正，以简化问题。

    // 两个区间为[m1*(1-p1),m1*(1+p1)],[m2*(1-p2),m2*(1+p2)]，
    // 乘积的上界为m1m2(1+p1)(1+p2)=m1m2(1+p1+p2+p1p2)，下界为m1m2(1-p1)(1-p2)=m1m2(1-p1-p2+p1p2)
    // 当p1和p2都很小时，p1p2可以忽略，如此乘积的误差就简单看出为p1+p2
    (function () {
        const i1 = make_center_percent(1000, 0.018);
        const i2 = make_center_percent(1200, 0.024);
        const product = mul_interval(i1, i2);

        console.log(`i1误差=${percent(i1)},i2误差=${percent(i2)}，按公式乘积误差=${percent(i1) + percent(i2)}，实际乘积误差=${percent(product)}`)
    })();
})()
