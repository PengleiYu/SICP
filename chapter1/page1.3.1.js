// 1.3.1 函数作为参数
(function () {
    function cube(x) {
        return x * x * x;
    }

    // 1，求和
    function sum_integers(a, b) {
        return a > b
            ? 0
            : a + sum_integers(a + 1, b);
    }

    // 2，求立方和
    function sum_cubes(a, b) {
        return a > b
            ? 0
            : cube(a) + sum_cubes(a + 1, b);
    }

    // 3，求特定格式的和，结果等于pi/8
    // pi/8 = 1/(1*3) + 1/(5*7) + 1/(9*11) + ...
    function pi_sum(a, b) {
        return a > b
            ? 0
            : 1 / (a * (a + 2)) + pi_sum(a + 4, b)
    }

    console.log(pi_sum(1, 100) * 8)
    console.log(pi_sum(1, 1000) * 8)
    console.log(pi_sum(1, 10000) * 8)


    // 通用求和函数
    function sum(term, a, next, b) {
        return a > b
            ? 0
            : term(a) + sum(term, next(a), next, b);
    }

    function inc(x) {
        return x + 1;
    }


    // 1，新的求和
    function sum_integers2(a, b) {
        function identity(x) {
            return x;
        }

        return sum(identity, a, inc, b);
    }

    // 2，新的立方求和
    function sum_cubes2(a, b) {
        return sum(cube, a, inc, b);
    }

    // 3，新的pi求值函数
    function pi_sum2(a, b) {
        function pi_term(x) {
            return 1 / (x * (x + 2));
        }

        function pi_next(x) {
            return x + 4;
        }

        return sum(pi_term, a, pi_next, b);
    }

    console.log(pi_sum2(1, 100) * 8)
    console.log(pi_sum2(1, 1000) * 8)
    console.log(pi_sum2(1, 10000) * 8)


    // 4，积分函数
    function integral(f, a, b, dx) {
        function integral_next(x) {
            return x + dx;
        }

        return sum(f, a + dx / 2, integral_next, b) * dx;
    }

    console.log(integral(cube, 0, 1, 0.01));
    console.log(integral(cube, 0, 1, 0.001));
})()
