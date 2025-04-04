import {display_list} from "sicp";
import {add, div, make_javascript_number, mul, sub} from "./generic_arithmetic.js";

// javascript_number改用原始数字实现
(function () {
    // 练习2.78 包javascript_number里的内部函数基本上什么也没做，只是去调用基本函数+、-等。这里当然不能直接使用语言的基本函数，
    // 因为我们的类型标签系统要求给每个数据对象加类型标签。但是，事实上每个JavaScript实现都有自己的类型系统，用在系统内部，
    // 并提供基本谓词is_symbol和is_number等确定数据对象是否具有特定类型。请修改2.4.2节type_tag、contents和attach_tag的定义，
    // 使我们的通用算术系统能利用JavaScript的内部类型系统。也就是说，修改后的系统应该像原来一样工作，除了其中的常规数直接表示为JavaScript的数，
    // 而不用head部分是字符串"javascript_number"的序对。

    // 测试常规数：通过make函数创建
    (function () {
        display_list("常规数运算: 通过make函数创建");
        // 测试数据表示
        display_list(make_javascript_number(1));
        // 测试加法
        display_list(add(make_javascript_number(1), make_javascript_number(2)));
        // 测试减法
        display_list(sub(make_javascript_number(1), make_javascript_number(2)));
        // 测试乘法
        display_list(mul(make_javascript_number(2), make_javascript_number(3)));
        // 测试除法
        display_list(div(make_javascript_number(1), make_javascript_number(2)));
    })();
    // 测试常规数: 直接使用原始数字
    (function () {
        display_list("常规数运算: 直接使用原始数字");
        // 测试数据表示
        display_list(1);
        // 测试加法
        display_list(add(1, 2));
        // 测试减法
        display_list(sub(1, 2));
        // 测试乘法
        display_list(mul(2, 3));
        // 测试除法
        display_list(div(1, 2));
    })();
    // 测试常规数：混合使用
    (function () {
        display_list("常规数运算: 混合使用");
        // 测试加法
        display_list(add(1, make_javascript_number(2)));
        // 测试减法
        display_list(sub(1, make_javascript_number(2)));
        // 测试乘法
        display_list(mul(2, make_javascript_number(3)));
        // 测试除法
        display_list(div(1, make_javascript_number(2)));
    })();
})();
