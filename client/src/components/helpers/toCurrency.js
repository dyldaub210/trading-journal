export const toCurrencyWithSign = (value) => {
    return value = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'Php' }).format(value);
};

export const toCurrencyWithCommas = (value) => {
    return value = new Intl.NumberFormat('en-US', { style: 'decimal' }).format(value);
};
