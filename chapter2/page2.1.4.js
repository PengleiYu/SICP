import {math_min, math_max, pair, head, tail, display} from "sicp";
import {
    add_interval,
    display_interval,
    div_interval,
    higher_bound,
    lower_bound, make_center_width,
    make_interval,
    mul_interval, sub_interval
} from "./interval.js";

// 2.1.4 扩展练习：区间算术
// 需要实现带误差的电阻表示，并进行运算，例如 6.8欧姆误差10%
(function () {
    // 第一版：使用端点表示区间
    // 实现已抽取到 interval.js

    (function () {
        display('==========================')
        const interval1 = make_interval(1, 2);
        const interval2 = make_interval(3, 4);
        display_interval(interval1);
        display_interval(interval2);
        display_interval(add_interval(interval1, interval2));
        display_interval(mul_interval(interval1, interval2));
        display_interval(div_interval(interval1, interval2));
    })();
    // 添加中心+宽度形式的区间
    // 实现已抽取到 interval.js
    (function () {
        display('==========================')
        const interval1 = make_center_width(1.5, 0.5);
        const interval2 = make_center_width(3.5, 0.5);
        display_interval(interval1);
        display_interval(interval2);
        display_interval(add_interval(interval1, interval2));
        display_interval(sub_interval(interval1, interval2));
        display_interval(mul_interval(interval1, interval2));
        display_interval(div_interval(interval1, interval2));
    })();
})()
