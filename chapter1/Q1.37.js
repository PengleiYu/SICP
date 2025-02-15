// 无穷连分式求黄金分割率
(function () {
    // 练习1.37 无穷连分式是具有如下形式的表达式：[插图]
    // 作为例子，我们可以证明当所有的Ni和Di都等于1时，这个无穷连分式的值是1/ϕ，其中的ϕ就是黄金分割率（见1.2.2节的说明）。
    // 逼近给定无穷连分式的一种方法是在给定数目的项之后截断，这样的截断式称为k项的有限连分式，其形式是：[插图]

    // a.假定n和d都是只有一个参数（项的下标i）的函数，它们分别返回连分式的项Ni和Di。
    // 请声明一个函数cont_frac，使得对cont_frac(n,_d,_k)的求值计算k项有限连分式的值。通过如下调用检查你的函数对顺序的k值是否逼近1/ϕ：
    // cont_frac(i=>1, i=>1, k)
    // 你需要取多大的k才能保证得到的近似值具有十进制的4位精度？

    // 迭代形式
    function cont_frac(n, d, k) {
        function iter(n, d, i, result) {
            return i > k
                ? result
                : iter(n, d, i + 1, n(i) / (d(i) + result))
        }

        return iter(n, d, 1, 0);
    }

    console.log(cont_frac(i => 1, i => 1, 11));

    const phi = (Math.sqrt(5) - 1) / 2;
    let k = 0;
    let result;
    do {
        result = cont_frac(i => 1, i => 1, ++k);
        console.log(`k=${k}, result=${result}`)
    } while (Math.abs(result - phi) > 0.00005)
    // k=11精度即达到4位
    console.log(`phi=${phi}，连分式求phi值近似值，k=${k}时，result=${result}，相差${Math.abs(result - phi)}`)

    // 对比不动点理论求phi
    function fixed_point_phi() {
        let try_cnt = 0;

        function fixed_point(f, first_guess) {
            const tolerance = 0.00005;
            try_cnt = 0;

            function close_enough(x, y) {
                return Math.abs(x - y) < tolerance;
            }


            function try_with(guess) {
                const next = f(guess);
                console.log(`try ${++try_cnt}: ${guess}->${next}`)
                return close_enough(guess, next)
                    ? next
                    : try_with(next);
            }

            return try_with(first_guess);
        }

        let result = fixed_point(x => 1 / (x + 1), 1);
        // 也是需要11次
        console.log(`phi=${phi}，不动点求phi值近似值，tryCnt=${try_cnt}时，result=${result}，相差${Math.abs(result - phi)}`)
        result = fixed_point(x => (1 / (x + 1) + x) / 2, 1);
        // 需要9次，次数降低一点
        console.log(`phi=${phi}，不动点均值阻尼求phi值近似值，tryCnt=${try_cnt}时，result=${result}，相差${Math.abs(result - phi)}`)
    }

    fixed_point_phi()

    // b.如果你的cont_frac函数产生递归计算过程，那么请另写一个产生迭代计算的函数。如果它产生迭代计算，请另写一个函数，使之产生一个递归计算过程。
    // 递归形式
    function cont_frac2(n, d, k) {
        function recursion(n, d, i) {
            return i > k
                ? 0
                : n(i) / (d(i) + recursion(n, d, i + 1))
        }

        return recursion(n, d, 1);
    }

    console.log(cont_frac2(i => 1, i => 1, 11));
})()
