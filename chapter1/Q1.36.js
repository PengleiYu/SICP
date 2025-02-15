// 对比是否使用均值阻尼所需的计算步数
(function () {
    // 练习1.36 请修改fixed_point，使它能用练习1.22介绍的基本函数newline和display打印出计算中产生的近似值序列。
    // 然后，通过找x↦log(1000)/log(x)不动点的方法确定x^x=1000的一个根（请利用JavaScript的基本函数math_log，它计算参数的自然对数值）。
    // 请比较一下采用均值阻尼和不用均值阻尼时的计算步数。（注意，你不能用猜测1去启动fixed_point，因为这将导致除以log(1)=0。）

    function fixed_point(f, first_guess) {
        const tolerance = 0.00001;

        function close_enough(x, y) {
            return Math.abs(x - y) < tolerance;
        }

        let try_cnt = 0;

        function try_with(guess) {
            const next = f(guess);
            console.log(`try ${++try_cnt} : ${guess} -> ${next}`)
            return close_enough(guess, next)
                ? next
                : try_with(next);
        }

        return try_with(first_guess);
    }

    // 不使用均值阻尼，尝试了34次
    console.log("不使用均值阻尼", fixed_point(x => Math.log(1000) / Math.log(x), 2))
    // 使用均值阻尼，尝试了9次
    console.log("使用均值阻尼", fixed_point(x => (x + Math.log(1000) / Math.log(x)) / 2, 2))
})()
