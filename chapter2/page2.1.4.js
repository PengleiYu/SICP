import {math_min, math_max, pair, head, tail, display} from "sicp";

// 2.1.4 扩展练习：区间算术
// 需要实现带误差的电阻表示，并进行运算，例如 6.8欧姆误差10%
(function () {
    // 第一版：使用端点表示区间
    function make_interval(lower, higher) {
        return pair(lower, higher);
    }

    function lower_bound(interval) {
        return head(interval);
    }

    function higher_bound(interval) {
        return tail(interval);
    }

    function add_interval(x, y) {
        return make_interval(
            lower_bound(x) + lower_bound(y),
            higher_bound(x) + higher_bound(y),
        );
    }

    function mul_interval(x, y) {
        const p1 = lower_bound(x) * lower_bound(y);
        const p2 = lower_bound(x) * higher_bound(y);
        const p3 = higher_bound(x) * lower_bound(y);
        const p4 = higher_bound(x) * higher_bound(y);
        return make_interval(math_min(p1, p2, p3, p4), math_max(p1, p2, p3, p4));
    }

    function div_interval(x, y) {
        // x区间乘以y区间的倒数
        return mul_interval(x,
            make_interval(
                1 / higher_bound(y),
                1 / lower_bound(y)));
    }

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
