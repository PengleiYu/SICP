import {make_center_percent, center, percent, display_interval, make_interval} from "./interval.js";

// 中心点和宽度百分比构造区间
(function () {
    // 练习2.12 请声明一个构造函数make_center_percent，它以一个中心点和一个百分比为参数，产生所需的区间。
    // 你还需要声明一个选择函数percent，通过它可以得到给定区间的百分数误差，选择函数center与前面一样。

    (function () {
        const i1 = make_center_percent(10, 0.1);
        display_interval(i1);
        console.log(`center=${center(i1)}, percent=${percent(i1)}`)

        const i2 = make_interval(10, 12);
        display_interval(i2);
        console.log(`center=${center(i2)}, percent=${percent(i2)}`)
    })()
})()
