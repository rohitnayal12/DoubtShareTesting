const cron = require("node-cron");
const { TutorAvailablity, Tutor } = require("../models/tutor.model");

let availableTutor = [];

const cronFunction = cron.schedule("* * * * * *", async () => {
    try {
        const currTime = new Date();
        const threeSecondAgo = new Date(currTime - 3000);

        const allOnlineTutor = await TutorAvailablity.find({ lastPingTime: { $gte: threeSecondAgo } });

        // Now getting all the online tutor by mapping them

        const tutorIds = allOnlineTutor.map(availability => availability.tutorId);

        // Fetch details of tutors from the Tutor collection
        const tutorsData = await Tutor.find({ _id: { $in: tutorIds } });

        availableTutor = tutorsData;
        // console.log("Online Tutor", tutorsData); 


    } catch (error) {
        console.error('Error in CRON', error);
    }
});

cronFunction.start();

const tutorValue = () => {
    return availableTutor
}



module.exports = { cronFunction, tutorValue };
