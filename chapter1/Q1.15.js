(function () {
    // 练习1.15 当角度（用弧度描述）x足够小的时候，其正弦值可以用sin x≈x计算，而三角恒等式
    // sin(x) = 3*sin(x/3) - 4*(sin(x/3))^3
    // 可以减小sin的参数的大小（为完成这一练习，如果一个角不大于0.1弧度，我们就认为它“足够小”）。这些想法都体现在下面的函数里：
    function cube(x) {
        return x * x * x;
    }

    function p(x) {
        console.log(`p(${x}) called`)
        return 3 * x - 4 * cube(x);
    }

    function sine(angle) {
        return !(Math.abs(angle) > 0.1)
            ? angle
            : p(sine(angle / 3));
    }

    // a.在求值sine(12.15)时p将被调用多少次？
    // 答：调用5次
    console.log(`${sine(12.15)}`)

    // b.在求值sine(a)时，由函数sine产生的计算过程使用的空间和步数（作为a的函数）增长的阶是什么？
    // 答：递归层级n约为log3(|a|/0.1), 即增长的阶为O(log(a))
    let a = -12.15;
    let n = Math.log(Math.abs(a) / 0.1) / Math.log(3);
    console.log(`a=${a},递归次数=${n}`);
})()
