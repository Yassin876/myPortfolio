import React, { useState } from 'react';
import { FaLinkedin, FaGithub, FaEnvelope, FaFilePdf } from 'react-icons/fa';
import axios from 'axios';

const CV_LINK = 'https://drive.google.com/file/d/1xWQRpN2cPFDiBNDo4UCZgahETz_OxEc6/view?usp=sharing';
const CV_DOWNLOAD = 'https://drive.google.com/uc?export=download&id=1xWQRpN2cPFDiBNDo4UCZgahETz_OxEc6';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);
        try {
            const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
            await axios.post(`${API_URL}/contact`, formData);
            setSubmitStatus('success');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error('Error sending message:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="contact-container">
            <div className="contact-header">
                <h1>Contact Me</h1>
                <p>Get in touch with me through any of these channels</p>
            </div>

            <div className="contact-content">
                {/* Social Links Section */}
                <div className="social-links">
                    <h2>Connect With Me</h2>
                    <div className="social-icons">
                        <a href="https://www.linkedin.com/in/yassin-ahmad-b471b9344?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                            target="_blank" rel="noopener noreferrer" className="social-link linkedin">
                            <FaLinkedin className="social-icon" />
                            <span>LinkedIn</span>
                        </a>
                        <a href="https://github.com/Yassin876"
                            target="_blank" rel="noopener noreferrer" className="social-link github">
                            <FaGithub className="social-icon" />
                            <span>GitHub</span>
                        </a>
                        <a href="mailto:yassinahmed6109@gmail.com" className="social-link gmail">
                            <FaEnvelope className="social-icon" />
                            <span>Gmail</span>
                        </a>
                    </div>
                </div>

                {/* ✅ CV Section */}
                <div className="cv-section">
                    <h2>My CV</h2>
                    <div className="cv-card">
                        <div className="cv-card-info">
                            <FaFilePdf className="cv-icon" />
                            <div>
                                <p className="cv-title">Resume / CV</p>
                                <p className="cv-subtitle">View or download my resume</p>
                            </div>
                        </div>
                        <div className="cv-buttons">
                            <a href={CV_LINK} target="_blank" rel="noopener noreferrer" className="cv-btn view-btn">
                                View
                            </a>
                            <a href={CV_DOWNLOAD} target="_blank" rel="noopener noreferrer" className="cv-btn download-btn">
                                Download
                            </a>
                        </div>
                    </div>
                </div>

                {/* Contact Form Section */}
                <div className="contact-form-section">
                    <h2>Send Me a Message</h2>
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name"
                                value={formData.name} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email"
                                value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea id="message" name="message"
                                value={formData.message} onChange={handleChange}
                                rows="5" required></textarea>
                        </div>
                        <button type="submit" className="submit-btn" disabled={isSubmitting}>
                            {isSubmitting ? 'Sending...' : 'Submit'}
                        </button>
                        {submitStatus === 'success' && (
                            <div className="success-message">
                                ✅ Message sent successfully! I'll get back to you soon.
                            </div>
                        )}
                        {submitStatus === 'error' && (
                            <div className="error-message">
                                ❌ Failed to send message. Please try again or contact me directly.
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
