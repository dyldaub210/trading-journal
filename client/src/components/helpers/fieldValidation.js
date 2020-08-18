export const emailValidity = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export const dateValidity = (dateBought, dateSold) => {

    let date = false;

    if (dateBought !== null && dateSold !== null) {
        date = true;
    } else {
        date = false;
        return date;
    }

    if (dateBought.getYear() <= dateSold.getYear()) {
        date = true;
    } else {
        date = false;
        return date;
    }

    if (dateBought.getMonth() <= dateSold.getMonth()) {
        date = true;
    } else {
        date = false;
        return date;
    }

    if (dateBought.getDate() <= dateSold.getDate()) {
        date = true;
    } else {
        date = false;
        return date;
    }

    if (dateBought.getYear() <= dateSold.getYear()) {
        date = true;
    } else {
        date = false;
        return date;
    }

    return date;
}