(function () {
    // 练习1.10 下面的函数计算一个称为Ackermann函数的数学函数
    // 该函数会导致递归层级急速增长
    function A(x, y) {
        return y === 0
            ? 0
            : x === 0
                ? 2 * y
                : y === 1
                    ? 2
                    : A(x - 1, A(x, y - 1));
    }

    // 下面各语句的值是什么：
    let arr = [
        A(1, 10),
        A(2, 4),
        A(3, 3),
    ]
    console.log(arr)

    // 请给出函数f、g和h对给定整数值n计算的函数的简洁数学定义。例如，k(n)计算5n2。
    function f(n) {
        return A(0, n);
    }

    function g(n) {
        return A(1, n);
    }

    function h(n) {
        return A(2, n)
    }

    function k(n) {
        return 5 * n * n;
    }
})()