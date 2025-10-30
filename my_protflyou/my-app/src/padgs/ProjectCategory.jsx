import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaGithub } from 'react-icons/fa';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function ProjectCategory() {
    const { type } = useParams();
    const navigate = useNavigate();
    const categoryType = type;
    const [projects, setProjects] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);

    const categories = {
        'all': { name: 'All Projects', icon: '📁', color: '#667eea' },
        'NLP': { name: 'NLP', icon: '💬', color: '#4CAF50' },
        'ML': { name: 'ML', icon: '🤖', color: '#2196F3' },
        'Data Analysis': { name: 'Data Analysis', icon: '📊', color: '#FF9800' },
        'DL': { name: 'DL', icon: '🧠', color: '#9C27B0' },
        'Other': { name: 'Other', icon: '🔧', color: '#607D8B' }
    };

    const currentCategory = categories[categoryType] || categories['all'];

    useEffect(() => {
        fetchProjects();
        
        const adminToken = localStorage.getItem('adminToken');
        if (adminToken) {
            setIsAdmin(true);
        }
    }, [categoryType]);

    const fetchProjects = async () => {
        try {
            const response = await axios.get(`${API_URL}/projects`);
            // If it's 'all', show all projects, otherwise filter
            const filtered = categoryType === 'all' ? response.data : response.data.filter(p => p.type === categoryType);
            setProjects(filtered);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const handleDeleteProject = async (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                const adminToken = localStorage.getItem('adminToken');
                await axios.delete(`${API_URL}/projects/${id}`, {
                    headers: {
                        Authorization: adminToken
                    }
                });
                setProjects(projects.filter(project => project._id !== id));
            } catch (error) {
                console.error('Error deleting project:', error);
                alert('Failed to delete project');
            }
        }
    };

    const goBack = () => {
        navigate('/');
    };

    return (
        <div className='projects'>
            <div className='projects-header'>
                <button onClick={goBack} className='back-btn' style={{marginRight: '20px'}}>
                    ← Back
                </button>
                <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                    <span style={{fontSize: '3em'}}>{currentCategory.icon}</span>
                    <h1>{currentCategory.name}</h1>
                </div>
            </div>

            <div className='projects-container'>
                {projects.length === 0 ? (
                    <p>No projects available yet.</p>
                ) : (
                    projects.map((project) => (
                        <div key={project._id} className='project-item'>
                            <div className='project-badge' style={{ 
                                backgroundColor: categories[project.type]?.color || currentCategory.color
                            }}>
                                {project.type}
                            </div>
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                            <a 
                                href={project.githubLink} 
                                target='_blank' 
                                rel='noopener noreferrer'
                                className='github-link'
                            >
                                <FaGithub /> View on GitHub
                            </a>
                            {isAdmin && (
                                <button
                                    className='delete-btn'
                                    onClick={() => handleDeleteProject(project._id)}
                                >
                                    Delete
                                </button>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default ProjectCategory;
