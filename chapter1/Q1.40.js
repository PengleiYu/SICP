// 练习牛顿法解三次方程
(function () {
    function fixed_point(f, first_guess) {
        const tolerance = 0.00001;

        function close_enough(x, y) {
            return Math.abs(x - y) < tolerance;
        }

        function try_with(guess) {
            const next = f(guess);
            return close_enough(guess, next)
                ? next
                : try_with(next);
        }

        return try_with(first_guess);
    }

    function newtons_method(g, guess) {
        function newton_transform(g) {
            return x => x - g(x) / deriv(g)(x);
        }

        function deriv(g) {
            return x => (g(x + dx) - g(x)) / dx;
        }

        const dx = 0.00001;

        return fixed_point(newton_transform(g), guess);
    }

    // 练习1.40 请声明一个函数cubic，它可以和newtons_method函数一起用在下面的形式的表达式里：
    // newtons_method(cubic(a, b, c), 1)
    // 以逼近三次方程x3+ax2+bx+c的零点。

    function cubic(a, b, c) {
        return x => x * x * x + a * x * x + b * x + c;
    }

    (function () {
        console.log(`零点预期为-1，实际为${(newtons_method(cubic(1, 1, 1), 1))}`)
        console.log(`零点预期为2，实际为${(newtons_method(cubic(0, 0, -8), 1))}`)
    })()
})()
