import BadwordFilter from 'badwords-ts';
import moment from 'moment';
import scheduler from 'node-schedule';
import { SCHEDULE_NAME } from '../utils/constant';

export const badWordScheduler = async () => {
  await BadwordFilter.instance.downloadWordBank();
  await BadwordFilter.instance.loadWordBank();

  const date = new Date(moment().add(2, 'month').utc().format());
  const dateToShow = moment(date).format('Do MM YYYY, H:mm A');

  console.log('Scheduling word bank downloader and loader');
  console.log(`Next Download and Load : ${dateToShow}`);

  scheduler.scheduleJob(SCHEDULE_NAME.BADWORD_DOWNLOADER_LOADER, badWordScheduler);

  console.log(`Word bank downloader and loader scheduled at ${dateToShow}`);
};
