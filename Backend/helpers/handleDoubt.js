const DoubtQuery = require("../models/doubt.model");
const { TutorAvailablity } = require("../models/tutor.model");
const { tutorValue } = require("./handleCron");



// Creating the socket with TutorId or studentId

const tutorSockets = new Map();

const initializeTutorSocket = (io) => {
    io.on('connection', (socket) => {

        // // Tutor Connected 
        socket.on("tutorConnected", (data) => {

            tutorSockets.set(data.tutorId, socket.id);
            console.log("Tutor Conencted.... Tutor")
            console.log(tutorSockets)
        })




        socket.on('requestQuery', async (data) => {

            const { tutorId } = data;
            // Handle the requestQuery event
            console.log('Received requestQuery event from student:', data);

            const query = await DoubtQuery({ ...data, status: "pending" })
            await query.save();

            // Getting the socket by tutorID

            const tutorSocket = tutorSockets.get(tutorId);

            console.log('Tutor Socket', tutorSocket);

            socket.to(tutorSocket).emit("requestQuery", data);


            // Sent event to the Tutor 
            // socket.broadcast.emit('requestQuery', { ...data });

            // Emit a response back to the student or perform other actions from  Tutor
            // socket.emit('queryResponse', { message: 'Query received!' });
        });



        // //  Tutor Latest Ping Time
        socket.on("ping", async (data) => {
            const { tutorId, lastPingTime } = data;

            // Updating in DB 
            try {
                await TutorAvailablity.findOneAndUpdate(
                    { tutorId }, { $set: { lastPingTime: lastPingTime } },
                    { upsert: true, new: true }
                )
                console.log('Last Ping Time Updated', lastPingTime)

            } catch (error) {
                console.error("Error updating Last Ping Time", error)
            }

            // HEre send the available tutor 
            let availableTutor = tutorValue();
            // console.log("availableTutor", availableTutor);
            socket.broadcast.emit("allAvailableTutor", { availableTutor: availableTutor });

        })


        socket.on("studentConnect", (data) => {
            console.log('Student connected', data)
            tutorSockets.set(data.studentId, socket.id);
        })


        socket.on("disconnect", () => {

            let tutorIdToDelete;

            tutorSockets.forEach((existingSocketId, tutorId) => {
                if (existingSocketId === socket.id) {
                    console.log(`Removing Tutor ${tutorId} from the map`);
                    tutorIdToDelete = tutorId;
                    tutorSockets.delete(tutorId);
                }
            });

            console.log("Disconnected !!");

            TutorAvailablity.deleteOne({ tutorIdToDelete })
                .then(() => console.log("TutorId Removed"))
                .catch((err) => console.error("Error while Disconnecting: ", err))


        })

    });
};

module.exports = { initializeTutorSocket };
