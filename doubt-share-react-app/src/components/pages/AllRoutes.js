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

            </Routes>


        </div>
    )
}

export default AllRoutes;
