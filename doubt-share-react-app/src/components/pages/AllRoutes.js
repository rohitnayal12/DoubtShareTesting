import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from './Home';
import Student from './Student';
import Tutor from './Tutor';
import Register from '../Register';
import TutorRegister from '../TutorRegister';


const AllRoutes = () => {
    return (
        <div>

            <Routes>
                <Route path="/" element={<Home />} />

                {/* Make this student login element */}
                <Route path="/student" element={<Student />} />
                <Route path='/register' element={<Register />} />


                <Route path='/tutor' element={<Tutor />} />
                <Route path='/tutor-register' element={<TutorRegister />} />

            </Routes>


        </div>
    )
}

export default AllRoutes
