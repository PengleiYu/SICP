import {pair, head, tail, display, stringify} from 'sicp'
// 2.1.1 实例：有理数的算术运算
(function () {
    function gcd(a, b) {
        return b === 0
            ? a
            : gcd(b, a % b);
    }

    function add_rat(x, y) {
        return make_rat(
            number(x) * denom(y) + number(y) * denom(x),
            denom(x) * denom(y)
        );
    }

    function sub_rat(x, y) {
        return make_rat(
            number(x) * denom(y) - number(y) * denom(x),
            denom(x) * denom(y)
        );
    }

    function mul_rat(x, y) {
        return make_rat(
            number(x) * number(y),
            denom(x) * denom(y)
        );
    }

    function div_rat(x, y) {
        return make_rat(
            number(x) * denom(y),
            denom(x) * number(y)
        );
    }

    function equal_rat(x, y) {
        return number(x) * denom(y) === number(y) * denom(x);
    }


    (function () {
        const x = pair(1, 2);
        console.log(head(x), tail(x));
    })();
    (function () {
        const x = pair(1, 2);
        const y = pair(3, 4);
        const z = pair(x, y);
        console.log(head(head(z)));
        console.log(head(tail(z)));
    })();

    function make_rat(n, d) {
        // return pair(n, d);
        // 新实现，有理数化简
        const g = gcd(n, d);
        return pair(n / g, d / g);
    }

    function number(x) {
        return head(x);
    }

    function denom(x) {
        return tail(x);
    }

    function print_rat(x) {
        return display(stringify(number(x)) + " / " + stringify(denom(x)));
    }

    (function () {
        const one_half = make_rat(1, 2);
        print_rat(one_half);
        const one_third = make_rat(1, 3);
        print_rat(add_rat(one_half, one_third));
        print_rat(mul_rat(one_half, one_third));
        print_rat(add_rat(one_third, one_third));
    })();

})()
