import {display_list, list} from "sicp";
import {addend, augend, deriv, is_product, is_sum, multiplicand, multiplier,} from "./deriv.js";

// 符号求导：对中缀表达式求导
(function () {
    // 练习2.58 假设我们希望修改求导程序，使它能用于常规的数学公式，其中的"+"和"*"采用中缀记法而不是前缀。
    // 由于求导程序的定义基于抽象的数据，我们可以修改它，使之能用于不同的表达式表示，
    // 只需要换一套工作在求导函数需要处理的代数表达式的新表示形式上的谓词、选择函数和构造函数。
    // a.请说明怎样做出这些函数，实现在中缀表示形式上的代数表达式求导。例如下面的例子：
    display_list(deriv(list("x", "+", list(3, "*", list("x", "+", list("y", "+", 2)))), "x"));
    // 为了简化工作，你可以假定"+"和"*"总具有两个运算对象，而且表达式里已经加了所有括号。
    (function () {
        display_list(deriv(list("x", "*", list("y", "*", list("x", "+", 3))), "x"));
    })();


    // b.如果我们希望处理某种接近标准的中缀表示法，其中可以略去不必要的括号，并假定乘法具有比加法更高的优先级，例如
    display_list(deriv(list("x", "+", 3, "*", list("x", "+", "y", "+", 2)), "x"));
    // 问题就会变困难许多。你能为这种表示方式设计好适当的谓词、选择函数和构造函数，使我们的求导程序仍能工作吗？

    (function () {
        const arr = [
            // 加法
            list("x", "+", "y"),
            list("x", "+", "y", "+", "z"),
            list("x", "+", 3, "*", "x"),
            list("x", "*", "y", "+", 3),
            // 简单乘法
            list("x", "*", "y"),
            list("x", "*", "y", "*", "z"),
            // 加法
            list("x", "*", "y", "+", 3, "*", "x"),
            // 带括号的乘法
            list(list("x", "+", 3), "*", "x"),
            list("x", "*", list("y", "+", 3)),
            list("x", "*", list("y", "+", 3, "*", "x")),
        ];
        display_list(list("测试加法"));
        arr.forEach((value => {
            display_list(list("待测试的表达式:", value));
            display_list(is_sum(value));
            if (is_sum(value)) {
                display_list(addend(value));
                display_list(augend(value));
            }
        }));
        display_list(list("测试乘法"));
        arr.forEach((value => {
            display_list(list("待测试的表达式:", value));
            display_list(is_product(value));
            if (is_product(value)) {
                display_list(multiplier(value));
                display_list(multiplicand(value));
            }
        }));
    })();
})();
