//Formats a number with commas etc.
export const formattedNumber = (num, returnZero = false) => {
    if (!num || isNaN(num)) {
        if (returnZero) return 0;
        return "";
    }
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
