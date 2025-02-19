import {math_min, math_max, pair, head, tail, display} from "sicp";
import {add_interval, div_interval, higher_bound, lower_bound, make_interval, mul_interval} from "./interval.js";

// 2.1.4 扩展练习：区间算术
// 需要实现带误差的电阻表示，并进行运算，例如 6.8欧姆误差10%
(function () {
    // 第一版：使用端点表示区间
    // 实现已抽取到 interval.js

    (function () {
        function display_interval(x) {
            display(`[${lower_bound(x)}, ${higher_bound(x)}]`);
        }

        const interval1 = make_interval(1, 2);
        const interval2 = make_interval(3, 4);
        display_interval(interval1);
        display_interval(interval2);
        display_interval(add_interval(interval1, interval2));
        display_interval(mul_interval(interval1, interval2));
        display_interval(div_interval(interval1, interval2));
    })();
})()
