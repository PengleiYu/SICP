import {display_interval, div_interval, make_center_percent, make_interval, percent} from "./interval.js";

// 误差比例很小时除法误差约等于误差之和
(function () {
    // 练习2.14 请确认Lem说的对。请用各种不同的算术表达式检查这个系统的行为。
    // 请构造两个区间A和B，并用它们计算表达式A/A和A/B。如果所用区间的宽度相对于中心值是很小的百分数，你可能会得到更多认识。
    // 请检查对中心-百分比形式（见练习2.12）进行计算的结果。

    (function () {
        const A = make_center_percent(100, 0.5)
        const B = make_center_percent(50, 0.2);
        display_interval(A);
        display_interval(B)
        display_interval(div_interval(A, A))
        display_interval(div_interval(A, B))
        console.log(`A/A的误差=${percent(div_interval(A, A))}`)
        console.log(`A/B的误差=${percent(div_interval(A, B))}`)


        // 结果说明在误差比例很小的情况下，除法结果的误差约等于两个区间误差之和，和乘法一样
        // 区间算术的除法会放大相对误差，且放大倍数与操作数的误差百分比相关。这一特性在连续计算中需特别注意，避免误差累积超出预期范围。
        const C = make_center_percent(100, 0.01)
        const D = make_center_percent(50, 0.005);
        display_interval(C);
        display_interval(D)
        display_interval(div_interval(C, C))
        display_interval(div_interval(C, D))
        console.log(`C/C的误差=${percent(div_interval(C, C))}`)
        console.log(`C/D的误差=${percent(div_interval(C, D))}`)
    })();
})()
