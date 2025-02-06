(function () {
    function inc(x) {
        console.log(`inc() called: x=${x}`)
        return x + 1;
    }

    function dec(x) {
        console.log(`dec() called: x=${x}`)
        return x - 1;
    }

    // 练习1.9 下面两个函数都是基于函数inc（它得到参数加1）和dec（它得到参数减1）声明的，它们各定义了一种得到两个正整数之和的方法。
    // 请用代换模型描绘这两个函数在求值plus(4, 5)时产生的计算过程。这些计算过程是递归的或者迭代的吗？
    function plus(a, b) {
        console.log(`plus() called: a=${a},b=${b}`)
        return a === 0 ? b : inc(plus(dec(a), b));
    }

    // 迭代形式，不变量为a+b
    function plus2(a, b) {
        console.log(`plus2() called: a=${a},b=${b}`)
        return a === 0 ? b : plus2(dec(a), inc(b));
    }

    // 回答：从日志可以看出plus函数是递归的，plus2是尾递归即迭代的
    plus(4, 5);
    console.log(`================================`)
    plus2(4, 5);
})()
