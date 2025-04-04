import {display_list} from "sicp";
import {
    add,
    div,
    mul,
    sub,
    make_complex_from_mag_ang,
    make_complex_from_real_imag,
    make_javascript_number,
    make_rational,
} from "./generic_arithmetic.js";

(function () {
    // 2.5.1 通用型算术运算

    // 测试常规数运算
    (function () {
        display_list("常规数运算");
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

    // 测试有理数运算
    (function () {
        display_list("有理数运算");
        // 测试数据表示
        display_list(make_rational(1, 2));
        // 测试加法
        display_list(add(make_rational(1, 2), make_rational(2, 3)));
        // 测试减法
        display_list(sub(make_rational(1, 2), make_rational(2, 3)));
        // 测试乘法
        display_list(mul(make_rational(2, 3), make_rational(3, 4)));
        // 测试除法
        display_list(div(make_rational(1, 2), make_rational(2, 3)));
    })();

    // 测试直角坐标系复数运算
    (function () {
        display_list("直角坐标系复数运算");
        // 测试数据表示
        display_list(make_complex_from_real_imag(1, 2));
        // 测试加法
        display_list(add(make_complex_from_real_imag(3, 4), make_complex_from_real_imag(2, 3)));
        // 测试减法
        display_list(sub(make_complex_from_real_imag(3, 4), make_complex_from_real_imag(2, 3)));
        // 测试乘法
        display_list(mul(make_complex_from_real_imag(2, 3), make_complex_from_real_imag(3, 4)));
        // 测试除法
        display_list(div(make_complex_from_real_imag(3, 4), make_complex_from_real_imag(2, 3)));
    })();

    // 测试极坐标系复数运算
    (function () {
        display_list("极坐标系复数运算");
        // 测试数据表示
        display_list(make_complex_from_mag_ang(1, 2));
        // 测试加法
        display_list(add(make_complex_from_mag_ang(3, 4), make_complex_from_mag_ang(2, 3)));
        // 测试减法
        display_list(sub(make_complex_from_mag_ang(3, 4), make_complex_from_mag_ang(2, 3)));
        // 测试乘法
        display_list(mul(make_complex_from_mag_ang(2, 3), make_complex_from_mag_ang(3, 4)));
        // 测试除法
        display_list(div(make_complex_from_mag_ang(3, 4), make_complex_from_mag_ang(2, 3)));
    })();
})();
