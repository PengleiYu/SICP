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
    // 2.5.2 不同类型数据的组合
    (function () {
        // 测试常规数与复数的运算
        display_list(add(make_javascript_number(3), make_complex_from_real_imag(1, 2)));
        display_list(add(3, make_complex_from_real_imag(1, 2)));
        display_list(add(make_complex_from_real_imag(1, 2), 3));
        display_list(add(make_complex_from_real_imag(1, 2), make_javascript_number(3)));
        // 测试常规数相互运算
        display_list(add(1, 3));
    })();
})();
