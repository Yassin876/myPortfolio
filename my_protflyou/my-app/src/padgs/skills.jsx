import React from 'react';
import { FaPython, FaJs, FaReact, FaDatabase, FaHtml5, FaCss3, FaChartLine, FaChartBar, FaChartPie, FaChartArea, FaCode, FaCogs, FaFlask, FaCog, FaRocket, FaBrain } from 'react-icons/fa';
function Skills() {
    return (
        <div className='skills'>
            <h1>Skills</h1>
            <div className='skills-container'>
                <div className='skill-item'>
                    <FaPython className='skill-icon' />
                    <h2>Python</h2>    
                </div>
                <div className='skill-item'>
                    <FaJs className='skill-icon' />
                    <h2>JavaScript</h2>
                </div>
                <div className='skill-item'>
                    <FaReact className='skill-icon' />
                    <h2>React</h2>
                </div>
                <div className='skill-item'>
                    <FaDatabase className='skill-icon' />
                    <h2>SQL</h2>
                </div>
                <div className='skill-item'>
                    <FaCogs className='skill-icon' />
                    <h2>Scikit-learn</h2>
                </div>
                <div className='skill-item'>
                    <FaBrain className='skill-icon' />
                    <h2>TensorFlow</h2>
                </div>
                <div className='skill-item'>
                    <FaChartBar className='skill-icon' />
                    <h2>Power BI</h2>
                </div>
                <div className='skill-item'>
                    <FaRocket className='skill-icon' />
                    <h2>PyTorch</h2>
                </div>
                <div className='skill-item'>
                    <FaCode className='skill-icon' />
                    <h2>Pandas</h2>
                </div>
                <div className='skill-item'>
                    <FaHtml5 className='skill-icon' />
                    <h2>HTML</h2>
                </div>
                <div className='skill-item'>
                    <FaCss3 className='skill-icon' />
                    <h2>CSS</h2>
                </div>
                <div className='skill-item'>
                    <FaFlask className='skill-icon' />
                    <h2>Keras</h2>
                </div>
                <div className='skill-item'>
                    <FaCog className='skill-icon' />
                    <h2>NumPy</h2>
                </div>
                <div className='skill-item'>
                    <FaChartLine className='skill-icon' />
                    <h2>Matplotlib</h2>
                </div>
                <div className='skill-item'>
                    <FaChartPie className='skill-icon' />
                    <h2>Seaborn</h2>
                </div>


            </div>
        </div>
    )
}
export default Skills;