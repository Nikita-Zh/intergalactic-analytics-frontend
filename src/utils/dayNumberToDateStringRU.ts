export const dayNumberToDateStringRU = (
    dayNumber: number,
    year = new Date().getFullYear(),
) => {
    const date = new Date(year, 0, dayNumber);
    const day = date.getDate();

    const monthNames = [
        "января",
        "февраля",
        "марта",
        "апреля",
        "мая",
        "июня",
        "июля",
        "августа",
        "сентября",
        "октября",
        "ноября",
        "декабря",
    ];

    const month = monthNames[date.getMonth()];
    return `${day} ${month}`;
};
