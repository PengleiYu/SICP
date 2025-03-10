import {display_list, list} from "sicp";
import {addend, augend, deriv, make_product, make_sum, multiplicand, multiplier,} from "./deriv.js";

// 扩展求导程序，可以处理形如+和*后跟任意多参数的形式
(function () {
    // 练习2.57 请扩充我们的求导程序，使之能处理任意多个项（两项或更多项）的求和与乘积。这样，上面的最后一个例子就可以表示为：
    display_list(deriv(list("*", "x", "y", list("+", "x", 3)), "x"));
    // 请试着通过只修改求和与乘积的表示，完全不修改函数deriv的方式完成这一扩充。例如，让一个和式的addend是它的第一项，而其augend是和式中的其余项。

    (function () {
        display_list("测试sum");
        let sum1 = make_sum("x", "y");
        display_list(sum1);
        display_list(addend(sum1));
        display_list(augend(sum1));
        let sum2 = make_sum("x", "y", "z");
        display_list(sum2);
        display_list(addend(sum2));
        display_list(augend(sum2));
        let sum3 = make_sum(1, 2, 3, 4);
        display_list(sum3);
        let sum4 = make_sum(0, "x", "y");
        display_list(sum4);
        let sum5 = make_sum("x", 0, "y");
        display_list(sum5);
    })();
    (function () {
        display_list("测试product")
        let product1 = make_product("x", "y");
        display_list(product1);
        display_list(multiplier(product1));
        display_list(multiplicand(product1));
        let product2 = make_product("x", "y", "z");
        display_list(product2);
        display_list(multiplier(product2));
        display_list(multiplicand(product2));
        let product3 = make_product(1, 2, 3, 4);
        display_list(product3);
        let product4 = make_product("x", 1, "y");
        display_list(product4);
        let product5 = make_product("x", "y", 1);
        display_list(product5);
    })();
})();
