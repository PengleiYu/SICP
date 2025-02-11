// 迭代形式的sum函数
(function () {
    // 递归形式
    // function sum(term, a, next, b) {
    //     return a > b
    //         ? 0
    //         : term(a) + sum(term, next(a), next, b);
    // }
    function cube(x) {
        return x * x * x;
    }

    function inc(x) {
        return x + 1;
    }

    // 练习1.30 上面声明的sum函数将产生一个线性递归。我们可以重写该函数，使之能迭代地执行。
    // 请说明应该怎样填充下面声明中空缺的表达式，完成这一工作。

    // 迭代形式
    function sum(term, a, next, b) {
        function iter(a, result) {
            return a > b
                ? result
                : iter(next(a), result + term(a))
        }

        return iter(a, 0);
    }


    // 以下测试新的sum函数
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
