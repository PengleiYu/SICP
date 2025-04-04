import {display_list} from "sicp";
import {
    is_equal, is_equal_to_zero,
    make_complex_from_mag_ang,
    make_complex_from_real_imag,
    make_javascript_number,
    make_rational
} from "./generic_arithmetic.js";

// 通用算术包安装新操作is_equal_to_zero
(function () {
    // 练习2.80 请定义一个通用谓词is_equal_to_zero检查参数是否为0，并把它安装到通用算术包里。这一操作应该对常规的数、有理数和复数都能工作。
    (function () {
        // 测试常规数等于0
        display_list("常规数等于0");
        display_list(is_equal_to_zero(0));
        display_list(is_equal_to_zero(1));
        // 测试有理数等于0
        display_list("有理数等于0");
        display_list(is_equal_to_zero(make_rational(1, 2)));
        display_list(is_equal_to_zero(make_rational(0, 1)));
        // 测试复数等于0
        display_list("复数等于0");
        display_list(is_equal_to_zero(make_complex_from_real_imag(0, 0)));
        display_list(is_equal_to_zero(make_complex_from_real_imag(0, 1)));
        display_list(is_equal_to_zero(make_complex_from_mag_ang(0, 2)));
        display_list(is_equal_to_zero(make_complex_from_mag_ang(1, 0)));
    })();
})();
