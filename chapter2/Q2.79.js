import {display_list} from "sicp";
import {
    is_equal,
    make_complex_from_mag_ang,
    make_complex_from_real_imag,
    make_javascript_number,
    make_rational
} from "./generic_arithmetic.js";

// 通用算术包安装新操作is_equal
(function () {
    // 练习2.79 请定义一个能检查两个数是否相等的通用型相等谓词is_equal，并把它安装到通用算术包里。这一操作应该对常规的数、有理数和复数都能工作。
    (function () {
        // 测试常规数相同
        display_list("常规数相同");
        display_list(is_equal(1, 1));
        display_list(is_equal(1, make_javascript_number(1)));
        display_list(is_equal(1, 2));
        // 测试有理数相同
        display_list("有理数相同");
        display_list(is_equal(make_rational(1, 2), make_rational(2, 4)));
        // 测试复数相同
        display_list("复数相同");
        display_list(is_equal(make_complex_from_real_imag(1, 2), make_complex_from_real_imag(1, 2)));
        // 测试极坐标和直角坐标相同
        display_list("极坐标和直角坐标相同");
        display_list(is_equal(make_complex_from_real_imag(1, 2), make_complex_from_real_imag(1, 2)));
        display_list(is_equal(make_complex_from_mag_ang(1, 2), make_complex_from_mag_ang(1, 2)));
        // 测试常规数和有理数相同
        display_list("常规数和有理数无法比较");
        display_list(is_equal(1, make_rational(1, 1)));
    })();

})();
