import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaGithub } from 'react-icons/fa';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const PROJECT_TYPES = [
    { id: 'all', name: 'All Projects', icon: '📁', color: '#667eea' },
    { id: 'NLP', name: 'NLP', icon: '💬', color: '#4CAF50' },
    { id: 'ML', name: 'ML', icon: '🤖', color: '#2196F3' },
    { id: 'Data Analysis', name: 'Data Analysis', icon: '📊', color: '#FF9800' },
    { id: 'DL', name: 'DL', icon: '🧠', color: '#9C27B0' },
    { id: 'Other', name: 'Other', icon: '🔧', color: '#607D8B' }
];

function Projects() {
    const [projects, setProjects] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newProject, setNewProject] = useState({
        title: '',
        description: '',
        githubLink: '',
        type: 'NLP'
    });

    useEffect(() => {
        fetchProjects();
        
        const adminToken = localStorage.getItem('adminToken');
        if (adminToken) {
            setIsAdmin(true);
        }
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await axios.get(`${API_URL}/projects`);
            setProjects(response.data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const handleAddProject = async (e) => {
        e.preventDefault();
        
        if (!newProject.title || !newProject.description || !newProject.githubLink) {
            alert('Please fill all fields');
            return;
        }

        try {
            const adminToken = localStorage.getItem('adminToken');
            const response = await axios.post(
                `${API_URL}/projects`,
                newProject,
                {
                    headers: {
                        Authorization: adminToken
                    }
                }
            );
            
            setProjects([response.data, ...projects]);
            setNewProject({ title: '', description: '', githubLink: '', type: 'NLP' });
            setShowAddForm(false);
        } catch (error) {
            console.error('Error adding project:', error);
            alert('Failed to add project. Make sure you are authenticated.');
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

    const toggleAdmin = () => {
        const currentAdmin = localStorage.getItem('adminToken');
        if (currentAdmin) {
            localStorage.removeItem('adminToken');
            setIsAdmin(false);
        } else {
            const token = prompt('Enter admin token:');
            if (token) {
                localStorage.setItem('adminToken', token);
                setIsAdmin(true);
            }
        }
    };

    return (
        <div className='projects'>
            <div className='projects-header'>
                <h1>Projects</h1>
                {isAdmin && (
                    <button 
                        className='add-project-btn' 
                        onClick={() => setShowAddForm(!showAddForm)}
                    >
                        {showAddForm ? 'Cancel' : '+ Add Project'}
                    </button>
                )}
                <button 
                    className='admin-toggle-btn' 
                    onClick={toggleAdmin}
                    style={{ 
                        marginLeft: '10px',
                        padding: '5px 10px',
                        cursor: 'pointer'
                    }}
                >
                    {isAdmin ? '🔓 Logout Admin' : '🔑 Login Admin'}
                </button>
            </div>

            {showAddForm && isAdmin && (
                <form className='add-project-form' onSubmit={handleAddProject}>
                    <h3>Add New Project</h3>
                    <input
                        type='text'
                        placeholder='Project Title'
                        value={newProject.title}
                        onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    />
                    <textarea
                        placeholder='Description'
                        value={newProject.description}
                        onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    />
                    <input
                        type='text'
                        placeholder='GitHub Link'
                        value={newProject.githubLink}
                        onChange={(e) => setNewProject({ ...newProject, githubLink: e.target.value })}
                    />
                    <select
                        value={newProject.type}
                        onChange={(e) => setNewProject({ ...newProject, type: e.target.value })}
                    >
                        {PROJECT_TYPES.filter(type => type.id !== 'all').map(type => (
                            <option key={type.id} value={type.id}>{type.name}</option>
                        ))}
                    </select>
                    <button type='submit'>Add Project</button>
                </form>
            )}

            {/* Category Cards */}
            <div className='categories-container'>
                {PROJECT_TYPES.map((category) => (
                    <div
                        key={category.id}
                        className='category-card'
                        onClick={() => {
                            window.location.href = category.id === 'all' ? '/category/all' : `/category/${category.id}`;
                        }}
                        style={{ borderColor: category.color, cursor: 'pointer' }}
                    >
                        <div className='category-icon' style={{ color: category.color }}>
                            {category.icon}
                        </div>
                        <h3>{category.name}</h3>
                        <p>{projects.filter(p => category.id === 'all' || p.type === category.id).length} Projects</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Projects;