import {display, display_list} from "sicp";
import {base, deriv, exponent, is_exp, make_exp, make_product} from "./deriv.js";


// 符号求导：支持乘幂表达式
(function () {
    // 练习2.56 请说明如何扩充上面的基本求导规则，以便处理更多种类的表达式。例如，实现下面的求导规则：
    // [插图]
    // 请给程序deriv增加一个新子句，并以适当的方式定义函数is_exp、base、exponent和make_exp，
    // 实现这个求导规则（你可以考虑用符号"**"表示乘幂）​。请把如下规则也构造到程序里：任何东西的0次幂都是1，而它们的1次幂都是其自身。

    // 测试乘幂逻辑
    (function () {
        let exp1 = make_exp(2, 3);
        let exp2 = make_exp('x', 3);
        let exp3 = make_exp('a', 'x');
        display_list(exp1);
        display_list(exp2);
        display_list(exp3);
        display(is_exp(exp1));
        display(is_exp(exp2));
        display_list(exponent(exp2));
        display_list(base(exp2));

        display_list(make_exp('x', 0));
        display_list(make_exp('x', 1));
    })();

    (function () {
        display_list("==========")

        display_list(deriv(make_exp('x', 3), 'x'));
        // display_list(deriv(make_exp(3, 'x'), 'x')); // 报错
        display_list(deriv(make_exp(make_product('x', 'y'), 10), 'x'));
    })();
})();
