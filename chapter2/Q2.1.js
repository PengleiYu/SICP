import {make_rat, print_rat, add_rat, mul_rat} from "./rat.js";

// 构造有理数时保证分母为正
(function () {
    // 练习2.1 请声明make_rat的一个更好的版本，使之可以正确处理正数和负数。make_rat应该把有理数规范化，
    // 当有理数为正时使它的分子和分母都是正数；如果有理数为负，那么就应该只让分子为负。


    (function () {
        const one_half = make_rat(-1, -2);
        print_rat(one_half);
        const one_third = make_rat(1, -3);
        print_rat(one_third);
        print_rat(add_rat(one_half, one_third));
        print_rat(mul_rat(one_half, one_third));
        print_rat(add_rat(one_third, one_third));

        const zero_half = make_rat(0, -2);
        const half_zero = make_rat(-2, 0);
        print_rat(zero_half);
        print_rat(half_zero);
    })();
})()
