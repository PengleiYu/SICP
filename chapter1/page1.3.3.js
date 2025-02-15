// 1.3.3 函数作为通用的方法
// 更复杂的高阶抽象函数：区间减半搜索方程的根、寻找函数不动点
(function () {
    function average(a, b) {
        return (a + b) / 2;
    }

    function close_enough(x, y) {
        return Math.abs(x - y) < 0.001;
    }

    function positive(x) {
        return x > 0;
    }

    function negative(x) {
        return x < 0;
    }

    function error(msg) {
        throw new Error(msg);
    }

    // 通过区间折半方法找方程的根
    function search(f, neg_pointer, pos_pointer) {
        const midpoint = average(neg_pointer, pos_pointer);
        if (close_enough(neg_pointer, pos_pointer)) {
            return midpoint;
        } else {
            const test_value = f(midpoint);
            return positive(test_value)
                ? search(f, neg_pointer, midpoint)
                : negative(test_value)
                    ? search(f, midpoint, pos_pointer)
                    : midpoint;
        }
    }

    // 考虑异常场景
    function half_interval_method(f, a, b) {
        const a_value = f(a);
        const b_value = f(b);
        return negative(a_value) && positive(b_value)
            ? search(f, a, b)
            : negative(b_value) && positive(a_value)
                ? search(f, b, a)
                : error("values are not of opposite sign");
    }

    // 求[2,4]之间sin(x)=0的根，即pi值
    console.log(half_interval_method(Math.sin, 2, 4))
    // 求x^3-2x-3=0在[1,2]之间的根
    console.log(half_interval_method(x => x * x * x - 2 * x - 3, 1, 2))


    // 寻找函数的不动点
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

    // 余弦函数的不动点
    console.log(fixed_point(Math.cos, 1));
    // 函数y=sin(y)+cos(y)的解
    console.log(fixed_point(y => Math.sin(y) + Math.cos(y), 1))


    // 重点：求平方根转换为寻找不动点的过程
    function sqrt(x) {
        // y=根号x => y=x/y；但这个方程会导致搜索不收敛, y2=x/y1,y3=x/y2=y1,y4=y2,y5=y1...
        // return fixed_point(y => x / y, 1);

        // 改进：y=x/y => 2y=y+x/y => y=(y+x/y)/2
        // 该技术为均值阻尼，逼近过程中取一系列值的均值来帮助收敛
        return fixed_point(y => average(y, x / y), 1);
    }

    console.log(sqrt(9));
})()
