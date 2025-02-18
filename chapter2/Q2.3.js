import {pair, head, tail, math_abs} from "sicp";

// 数据抽象之矩形
(function () {
    function make_point(x, y) {
        return pair(x, y);
    }

    function x_point(p) {
        return head(p);
    }

    function y_point(p) {
        return tail(p);
    }

    function make_segment(start, end) {
        return pair(start, end);
    }

    function start_segment(s) {
        return head(s);
    }

    function end_segment(s) {
        return tail(s);
    }

    // 练习2.3 请实现一种平面矩形的表示（提示：你可能希望借用练习2.2的结果）。基于你的构造函数和选择函数创建几个函数，
    // 计算给定矩形的周长和面积等。现在请再为矩形的实现定义另一种表示。你能否设计好你的系统，提供适当的抽象屏障，
    // 使同一个周长或者面积函数对两种不同的表示都能工作？

    // function make_rect(p1, p2) {
    //     return pair(p1, p2);
    // }
    //
    // function p1_rect(r) {
    //     return head(r);
    // }
    //
    // function p2_rect(r) {
    //     return tail(r);
    // }
    //
    // function width_rect(r) {
    //     const p1 = p1_rect(r);
    //     const p2 = p2_rect(r);
    //     return math_abs(x_point(p1) - x_point(p2));
    // }
    //
    // function height_rect(r) {
    //     const p1 = p1_rect(r);
    //     const p2 = p2_rect(r);
    //     return math_abs(y_point(p1) - y_point(p2));
    // }

    function make_rect(p, w, h) {
        return pair(p, pair(w, h));
    }

    function p_rect(r) {
        return head(r);
    }

    function w_rect(r) {
        return head(tail(r));
    }

    function h_rect(r) {
        return tail(tail(r));
    }

    function width_rect(r) {
        return w_rect(r);
    }

    function height_rect(r) {
        return h_rect(r);
    }


    function perimeter(r) {
        return width_rect(r) * 2 + height_rect(r) * 2;
    }

    function area(r) {
        return width_rect(r) * height_rect(r);
    }

    (function () {
        // const p1 = make_point(0, 0);
        // const p2 = make_point(10, 10);
        // const r1 = make_rect(p1, p2);
        const p1 = make_point(0, 0);
        const r1 = make_rect(p1, 10, 10);

        console.log(`周长=${perimeter(r1)},面积=${area(r1)}`)
    })()
})()
