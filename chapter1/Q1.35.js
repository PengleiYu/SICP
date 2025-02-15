// 不动点理论求黄金分割率
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

    // 练习1.35 请证明黄金分割率ϕ（1.2.2节）是变换x↦1+1/x不动点。请利用这一事实，通过函数fixed_point计算ϕ的值。

    // 证明：黄金分割率ϕ满足方程ϕ^2=ϕ+1，所以ϕ=1+1/ϕ

    // 不动点理论求黄金分割率
    function phi() {
        return fixed_point(x => 1 + 1 / x, 1);
    }

    console.log(`ϕ=${phi()}`)
})()
