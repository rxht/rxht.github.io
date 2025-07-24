import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

export const DATE_FORMAT = 'YYYY-MM-DD';
export const TIME_FORMAT = 'HH:mm:ss';
export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

dayjs.extend(utc);

export function FormatDate(date: Date | string = new Date(), dateFormat = DATE_TIME_FORMAT) {
  return dayjs.utc(date).format(dateFormat);
}