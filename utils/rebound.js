const reBound = (v, b) => {
    if (v < b[0]) { return b[1] }
    if (v > b[1]) { return b[0] }
    return v
}

module.exports = reBound