export const convertPersianDigitsToEnglish = (input: string): string => {
  return input.replace(/[\u06F0-\u06F9\u0660-\u0669]/g, (digit) => {
    const persianToEnglish: Record<string, string> = {
      "۰": "0",
      "۱": "1",
      "۲": "2",
      "۳": "3",
      "۴": "4",
      "۵": "5",
      "۶": "6",
      "۷": "7",
      "۸": "8",
      "۹": "9",
      "٠": "0",
      "١": "1",
      "٢": "2",
      "٣": "3",
      "٤": "4",
      "٥": "5",
      "٦": "6",
      "٧": "7",
      "٨": "8",
      "٩": "9",
    };
    return persianToEnglish[digit] || digit;
  });
};
