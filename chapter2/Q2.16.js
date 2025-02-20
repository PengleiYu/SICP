// 等价的代数表达式在区间算术上为何结果不同
(function () {
    // 练习2.16 请给出一个一般性的解释：为什么等价的代数表达式可能导致不同计算结果？你能设计出一个区间算术包，使之没有这种缺陷吗？
    // 或者这件事情根本不可能做到？​（警告：这个问题非常难。​）


    // 根本原因是区间算术无法跟踪变量之间的关系
    // 比如x区间为[1,2]，那么x/x的区间从应该为[1,1]，但区间算数会把两个x视为不同的区间进行计算
    // 另外的例子是乘法分配律a(b+c)=ac+ac，两种计算导致误差不同，因为右侧的两个c都被视为不同区间了
})();
