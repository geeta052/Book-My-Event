// StudentLoginForm.js

import React, { useState, useContext, useEffect } from "react";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import './StudentLoginForm.css';

const StudentLoginForm = () => {
    const [formData, setFormData] = useState({
        studentName: '',
        department: '',
        degree: '',
        yearOfStudy: '',
        eventPreferences: [],
        dateOfBirth: '',
        gender: '',
        profilePicture: null,
        clubsMembership: '',
        instituteName: ''
    });

    const [file, setFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(null);
    const [isImageUploaded, setIsImageUploaded] = useState(false);

    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);

    const uploadFile = async () => {
        if (file && !isImageUploaded) {
            const name = `${currentUser.uid}`;
            const storageRef = ref(storage, `images/${name}`);

            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadProgress(progress);
                },
                (error) => {
                    console.error("Error uploading file:", error);
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    setFormData((prevData) => ({
                        ...prevData,
                        profilePicture: downloadURL,
                    }));
                    setIsImageUploaded(true);
                }
            );
        }
    };

    useEffect(() => {
        uploadFile();
    }, [file, currentUser, isImageUploaded]);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file") {
            setFile(files[0]);
        } else if (type === "checkbox") {
            const newPreferences = formData.eventPreferences.includes(value)
                ? formData.eventPreferences.filter(pref => pref !== value)
                : [...formData.eventPreferences, value];
            setFormData({ ...formData, eventPreferences: newPreferences });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userDocRef = doc(db, "users", currentUser.uid);

        try {
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                await updateDoc(userDocRef, {
                    Student: formData,
                });
            } else {
                console.error("User document does not exist.");
            }

            navigate("../dashboard/StudentDashboard/:userId");
        } catch (error) {
            console.error("Error updating user document:", error);
        }
    };

    return (
        <div className="fullscreen-container">
            <div className="form-container">
                <h2>My Profile</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group half-width">
                            <label htmlFor="studentName">Student Name:</label>
                            <input
                                type="text"
                                id="studentName"
                                name="studentName"
                                value={formData.studentName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group half-width">
                            <label htmlFor="department">Department:</label>
                            <input
                                type="text"
                                id="department"
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group half-width">
                            <label htmlFor="degree">Degree:</label>
                            <input
                                type="text"
                                id="degree"
                                name="degree"
                                value={formData.degree}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group half-width">
                            <label htmlFor="yearOfStudy">Year of Study:</label>
                            <select
                                id="yearOfStudy"
                                name="yearOfStudy"
                                value={formData.yearOfStudy}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Year</option>
                                <option value="1st Year">1st Year</option>
                                <option value="2nd Year">2nd Year</option>
                                <option value="3rd Year">3rd Year</option>
                                <option value="4th Year">4th Year</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group half-width">
                            <label>Event Preferences:</label>
                            <div>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="eventPreferences"
                                        value="Sports"
                                        checked={formData.eventPreferences.includes('Sports')}
                                        onChange={handleChange}
                                    />
                                    Sports
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="eventPreferences"
                                        value="Cultural"
                                        checked={formData.eventPreferences.includes('Cultural')}
                                        onChange={handleChange}
                                    />
                                    Cultural
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="eventPreferences"
                                        value="Technical"
                                        checked={formData.eventPreferences.includes('Technical')}
                                        onChange={handleChange}
                                    />
                                    Technical
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group half-width">
                            <label htmlFor="dateOfBirth">Date of Birth:</label>
                            <input
                                type="date"
                                id="dateOfBirth"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group half-width">
                            <label htmlFor="gender">Gender:</label>
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group half-width">
                            <label htmlFor="profilePicture">Profile Picture:</label>
                            <input
                                type="file"
                                id="profilePicture"
                                name="profilePicture"
                                onChange={handleChange}
                                accept="image/*"
                            />
                        </div>

                        <div className="form-group half-width">
                            <label htmlFor="clubsMembership">Clubs/Societies Membership:</label>
                            <input
                                type="text"
                                id="clubsMembership"
                                name="clubsMembership"
                                value={formData.clubsMembership}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group half-width">
                            <label htmlFor="instituteName">Institute Name:</label>
                            <input
                                type="text"
                                id="instituteName"
                                name="instituteName"
                                value={formData.instituteName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    );
};

export default StudentLoginForm;
