import {display, stringify, pair, head, tail} from "sicp";

// 数据抽象之点和线段
(function () {
    // 练习2.2 请考虑平面上线段的表示问题。一个线段可以用两个点来表示，一个是线段的始点，另一个是终点。
    // 请声明构造函数make_segment和选择函数start_segment、end_segment，它们基于点的概念定义线段的表示。
    // 进而，点可以表示为两个数的序对，这两个成分分别表示点的x坐标和y坐标。
    // 请据此进一步给出定义这种表示的构造函数make_point和选择函数x_point、y_point。最后，请基于所定义的构造函数和选择函数，
    // 声明一个函数midpoint_segment，它以一个线段为参数，返回线段的中点（也就是坐标值是两个端点的平均值的那个点）。
    // 为试验这些函数，你还需要有一种打印点的方法，例如：

    function make_point(x, y) {
        return pair(x, y);
    }

    function x_point(p) {
        return head(p);
    }

    // 注意pair和list不同，取第二个元素不要head(tail(p))
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

    function midpoint_segment(s) {
        const start = start_segment(s);
        const end = end_segment(s);
        return make_point((x_point(start) + x_point(end)) / 2, (y_point(start) + y_point(end)) / 2);
    }

    function print_point(p) {
        return display(`(${stringify(x_point(p))}, ${stringify(y_point(p))})`);
    }

    (function () {
        const start1 = make_point(0, 0);
        const end1 = make_point(10, 10)
        const segment1 = make_segment(start1, end1);
        const mid1 = midpoint_segment(segment1);
        print_point(mid1);
    })()
})()
