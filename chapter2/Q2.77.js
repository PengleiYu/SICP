import {magnitude, make_complex_from_real_imag} from "./generic_arithmetic.js";
import {display_list} from "sicp";


// 通用代数系统中为复数注册选择函数
(function () {
    // 练习2.77 Louis Reasoner试着求值magnitude(z)，其中z是图2.24里的那个对象。令他吃惊的是，apply_generic得到的不是5而是一个错误信息，
    // 说没办法对类型("complex")做操作magnitude。
    (function () {
        let complex = make_complex_from_real_imag(3, 4);
        display_list(complex);
        display_list(magnitude(complex));// Error: no method for these types -- apply_generic ["magnitude", [["complex", null], null]]
    })();
    // 他把这次交互的情况拿给Alyssa P.Hacker看，Alyssa说“问题出在没有为"complex"数定义复数的选择函数，
    // 而是只为"polar"和"rectangular"数定义了它们。你需要做的就是在complex包里加入下面这些东西”：
    // [插图]

    // 请详细说明为什么这样做可行。
    // 这样做注册了magnitude/复数对应的函数，执行时会找到magnitude函数，它执行时再去找magnitude/直角坐标系包中的magnitude函数，

    // 作为例子，请考虑表达式magnitude(z)的求值过程，其中z就是图2.24展示的那个对象。
    // 执行magnitude时，会调用apply_generic查找复数包注册的函数，还是magnitude函数，再执行时再次调用apply_generic，
    // 找到直角坐标系包注册的magnitude，最终执行出结果

    // 请追踪这个求值过程中的所有函数调用，特别地，请看看apply_generic被调用了几次？每次调用分派到哪个函数？
    // apply_generic执行了两次，第一次分派到magnitude，第二次分派到直角坐标系包中的magnitude
})();
