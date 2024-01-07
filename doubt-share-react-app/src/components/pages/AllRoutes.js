import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from './Home';
import Student from './Student';
import Tutor from './Tutor';
import Register from '../Register';
import TutorRegister from '../TutorRegister';
import TutorSignin from '../TutorSignin';
import StudentLogin from '../StudentLogin';
import StudentDashboard from './StudentDashboard';
import TutorDashboard from './TutorDashboard';
import Chat from './Chat';
import TutorChat from './TutorChat';
import AllQueries from './AllQueries';
import ViewChat from './ViewChat';

const AllRoutes = () => {
    return (
        <div>

            <Routes>
                <Route path="/" element={<Home />} />

                {/* Make this student login element */}
                <Route path="/student" element={<Student />} />
                <Route path='/student-register' element={<Register />} />
                <Route path='/student-login' element={<StudentLogin />} />

                <Route path='/student/dashboard' element={<StudentDashboard />} />


                <Route path='/tutor' element={<Tutor />} />
                <Route path="/tutor-login" element={<TutorSignin />} />
                <Route path='/tutor-register' element={<TutorRegister />} />
                <Route path='/tutor/dashboard' element={<TutorDashboard />} />

                <Route path='/student-chat/:roomName/:conversationId' element={<Chat />} />
                <Route path='/tutor-chat/:roomName/:conversationId' element={<TutorChat />} />


                <Route path="/allQueries" element={<AllQueries />} />

                <Route path="/view-chat/:conversationId" element={<ViewChat />} ></Route>
            </Routes>


        </div>
    )
}

export default AllRoutes;
