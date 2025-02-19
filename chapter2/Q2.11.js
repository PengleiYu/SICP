import {display} from "sicp";
import {display_interval, make_interval, mul_interval} from "./interval.js";

// 优化区间乘法，减少乘法运算次数
(function () {
    // 练习2.11 在看了这些东西之后，Ben又说出了下面这段有些神秘的话：​“通过监测区间的端点，有可能把mul_interval分解为9种情况，
    // 其中只有一种情况需要做两次乘法”​。请根据Ben的建议重写这个函数。

    (function () {
        const a1 = make_interval(4, 5);
        const a2 = make_interval(-1, 2);
        const a3 = make_interval(-5, -3);
        const arr = [a1, a2, a3];
        arr.forEach(p1 => {
            arr.forEach(p2 => {
                display('===============')
                display_interval(p1);
                display_interval(p2);
                display_interval(mul_interval(p1, p2));
            })
        })
    })();
})()
