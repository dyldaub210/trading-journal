export const dateFormatter = (date) => {

    //Resulting date will be MM/DD/YYYY

    const dateWithoutTime = date.split('T');
    let formattedDate = dateWithoutTime[0].split('-');

    const day = formattedDate[2];
    const month = formattedDate[1];
    const year = formattedDate[0];

    formattedDate = month + "/" + day + "/" + year;

    return formattedDate;
}