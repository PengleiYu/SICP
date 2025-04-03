import {display_list, error, head, is_number, is_pair, is_string, list, tail} from "sicp";
import {deriv} from "./deriv2.js";
import {make_exp, make_product} from "./deriv.js";

// 将求导函数改写成数据导向的风格
(function () {
    // 练习2.73 在2.3.2节，我们描述了一个执行符号求导的程序：
    // [插图][插图]
    // 可以认为，这个程序也是在执行一种基于被求导表达式类型的分派工作。在这里，数据的“类型标签”就是其代数运算符（例如"+"）​，
    // 需要执行的操作是deriv。我们可以把这个程序变换到数据导向的风格，把其中的基本求导函数重新写成：
    // a.请解释我们在上面究竟做了些什么。为什么我们不能把谓词is_number和is_variable也类似地搬到数据导向的分派中？
    // 答：按照deriv操作符和表达式的类型取出响应的函数，再对函数应用表达式参数和要求导的变量
    // 因为这两个函数是谓词，不是对表达做操作
    // b.请写出针对求和式与乘积式的求导函数，以及上面程序所需要的，用于把这些函数安装到表格里的辅助代码。
    // 已实现
    // c.请选择另外的某种你希望包括的求导规则，例如对乘幂（练习2.56）求导等，并把它安装到这一数据导向的系统里。
    // 已实现
    // d.在这一简单的代数运算器中，表达式的类型就是构造它们的代数运算符。假定我们想以另一种相反的方式做索引，使deriv里完成分派的代码行的形式如下：
    // [插图]求导系统还需要做哪些相应的改动？
    // 只需要在安装函数中调整op和type的顺序即可

    (function () {
        display_list(deriv(list('+', 'x', 3), 'x'));
        display_list(deriv(list('*', 'x', 'y'), 'x'));
        display_list(deriv(list('*', list('*', 'x', 'y'), list('+', 'x', 3)), 'x'));

        display_list(deriv(list("**", 'x', 3), 'x'));
        display_list(deriv(list('**', list('*', 'x', 'y'), 10), 'x'));
    })();
})();
