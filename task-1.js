const splitGroups = (weights) => {
    const totalWeight = weights.reduce((acc, curr) => acc + curr, 0);
    const n = weights.length;
    
    const dp = Array.from({ length: n + 1 }, () => Array(totalWeight + 1).fill(false));
    
    for (let i = 0; i <= n; i++) {
        dp[i][0] = true;
    }
    
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= totalWeight; j++) {
            if (j < weights[i - 1]) {
                dp[i][j] = dp[i - 1][j];
            } else {
                dp[i][j] = dp[i - 1][j] || dp[i - 1][j - weights[i - 1]];
            }
        }
    }
    
    let halfWeight = Math.floor(totalWeight / 2);
    while (!dp[n][halfWeight]) {
        halfWeight--;
    }
    
    let group1Indices = [];
    let remainingWeight = halfWeight;
    for (let i = n; i > 0 && remainingWeight > 0; i--) {
        if (dp[i - 1][remainingWeight]) continue;
        group1Indices.push(i - 1);
        remainingWeight -= weights[i - 1];
    }
    
    const group1 = [];
    const group2 = [];
    weights.forEach((weight, index) => {
        if (group1Indices.includes(index)) {
            group1.push(weight);
        } else {
            group2.push(weight);
        }
    });
    
    return { group1, group2 };
};

const weights = [3, 1, 1, 2, 2, 1];
const { group1, group2 } = splitGroups(weights);
console.log("First group:", group1);
console.log("Second group:", group2);
