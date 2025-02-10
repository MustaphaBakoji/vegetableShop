function drawStairs(n) {//n=3
    
    let stairs = [];
    for (let i = 0; i < n; i++) {
        stairs.push(' '.repeat(i) + 'I');
    }
    return stairs.join('\n');
 }

 drawStairs(2);
// console.log(draw);
