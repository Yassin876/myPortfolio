import React from 'react';
import my_photo from '../my_photo.png';

function AboutMe() {
    return (
        <div className='about-me'>
            <div className='text-container'>

                <h1> Yassin Ahmad <br></br> Abdelrazek Mohamed</h1>
                <p>I’m an AI developer passionate about building intelligent systems that combine artificial intelligence with real-world applications.

                    I have hands-on experience in machine learning, deep learning, and computer vision, as well as front-end development skills that help me design user-friendly AI tools and web applications.

                    Currently, I’m working on projects that integrate AI with IoT and web technologies — from AI assistants for summarizing lectures.

                    My goal is to create practical, accessible, and innovative solutions that make people’s lives easier through the power of AI</p>            
                <p className='the-word'>
                Learning never stops; innovation starts with curiosity and persistence.
                </p>
            </div>
            <div className='photo-container'>
                <img src={my_photo} alt='image of Yassin Ahmad' shape='circle'class="circle-img"/>
            </div>
            
        </div>
    )
} 

export default AboutMe;