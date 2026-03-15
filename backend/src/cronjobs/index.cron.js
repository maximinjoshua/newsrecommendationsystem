import cron from 'node-cron';
import { callPublisherForArticles } from '../externalapicalls/publisher.calls.js';
import { logger } from '../helpers/logger.js';

// cron syntax says that this job runs every day at the first minute of the first hour
cron.schedule('0 0 * * *', async () => {
    try{
        await callPublisherForArticles()
    }
    catch(error){
        logger.error(error)
    }
});