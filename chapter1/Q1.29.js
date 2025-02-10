// 另一种数值积分方法：辛普森规则
(function () {
    // 练习1.29 辛普森规则是另一种数值积分方法，比上面的规则更精确。使用辛普森规则，函数f在范围a和b之间的定积分的近似值是：
    // h/3[y0+4y1+2y2+4y3+2y4+...+2y(n-2)+4y(n-1)+yn]
    // 其中的h=(b-a)/n，n是某个偶数，而yk=f(a+kh)。（采用较大的n能提高近似精度。）
    // 请声明一个具有参数f、a、b和n，采用辛普森规则计算并返回积分值的函数。
    // 用你的函数求cube在0和1之间的积分（取n=100和n=1000），并用得到的值与上面用integral函数得到的结果比较。


    function simpson_integral(f, a, b, n) {
        let h = (b - a) / n;

        function next(x) {
            return x + h;
        }

        function term(x, k) {
            return k === 0 || k === n
                ? f(x)
                : k % 2 === 0
                    ? 2 * f(x)
                    : 4 * f(x);
        }

        function sum(term, a, next, b, k) {
            // 注意重点：这里使用索引控制可以确保每个步长都参与计算；
            // 若使用a>b比较则会由于累计浮点误差丢掉最后一个步长，导致精度下降
            return k > n
                ? 0
                : term(a, k) + sum(term, next(a), next, b, k + 1);
        }

        return sum(term, a, next, b, 0) * h / 3;
    }

    function cube(x) {
        return x * x * x;
    }


    console.log(simpson_integral(cube, 0, 1, 100));
    console.log(simpson_integral(cube, 0, 1, 1000));
})()
