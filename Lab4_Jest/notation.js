function mean(scores) {
    const total = scores.reduce((acc, score) => acc + score, 0);
    return total / scores.length;
}

module.exports  = mean 