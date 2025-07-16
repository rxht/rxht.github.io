import dayjs from 'dayjs';

export const DATE_FORMAT = 'YYYY-MM-DD';
export const TIME_FORMAT = 'HH:mm:ss';
export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export function FormatDate(date: Date | string = new Date(), dateFormat = DATE_TIME_FORMAT) {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  return dayjs(date).format(dateFormat);
}