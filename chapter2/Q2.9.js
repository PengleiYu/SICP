import {
    sub_interval,
    add_interval,
    make_interval,
    mul_interval,
    display_interval,
    div_interval,
    lower_bound,
    higher_bound
} from "./interval.js";

(function () {
    // 练习2.9 区间的宽度是其上界和下界之差的一半。区间宽度是有关区间描述的值的非精确性的一种度量。对某些算术运算，
    // 两个区间的组合结果的宽度是参数区间宽度的函数，而对其他运算，组合区间的宽度不是参数区间宽度的函数。
    // 请证明，两个区间的和（与差）的宽度是被加（或减）区间的宽度的函数。举例说明，对乘法和除法，情况并非如此。

    // 可以看出区间的和差宽度是两个区间宽度之和，但乘除的宽度就不确定了
    (function () {
        function span(x) {
            return higher_bound(x) - lower_bound(x);
        }

        const i1 = make_interval(1, 3)
        const i2 = make_interval(7, 11);
        display_interval(i1);
        display_interval(i2);
        console.log(`跨度：i1=${span(i1)}, i2=${span(i2)}`);
        let result;
        result = add_interval(i1, i2);
        console.log('+')
        display_interval(result);
        console.log(`区间:${span(result)}`)

        result = sub_interval(i1, i2);
        console.log('-')
        display_interval(result);
        console.log(`区间:${span(result)}`)
        result = mul_interval(i1, i2);
        console.log('*')
        display_interval(result);
        console.log(`区间:${span(result)}`)
        result = div_interval(i1, i2);
        console.log('/')
        display_interval(result);
        console.log(`区间:${span(result)}`)
    })();
})()
