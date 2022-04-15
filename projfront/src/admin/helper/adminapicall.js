import { API } from "../../backend";

//department calls

export const createDepartment = (userId, token, department) => {
    return fetch(`${API}/department/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(department)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

export const deleteDepartment = (departmentId, userId, token) => {
    return fetch(`${API}/department/${departmentId}/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
     .then(response => {
         return response.json();
     })
     .catch(err => console.log(err));
};

export const getDepartment = departmentId => {
    return fetch(`${API}/department/${departmentId}`, {
        method: "GET",
    })
     .then(response => {
         return response.json();
     })
     .catch(err => console.log(err));
};

export const updateDepartment = (departmentId, userId, token, department) => {
    return fetch(`${API}/department/${departmentId}/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(department)
    })
     .then(response => {
         return response.json();
     })
     .catch(err => console.log(err));
};

//get all departments
export const getDepartments = () => {
    return fetch(`${API}/departments`, {
        method: "GET",
    })
     .then(response => {
         return response.json();
     })
     .catch(err => console.log(err));
};


//user calls

//get all users
export const getUsers = () => {
    return fetch(`${API}/users`, {
        method: "GET",
    })
     .then(response => {
         return response.json();
     })
     .catch(err => console.log(err));
};

//delete a user 
export const deleteUser = (userId, token) => {
    return fetch(`${API}/user/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
     .then(response => {
         return response.json();
     })
     .catch(err => console.log(err));
};

//get a user
export const getUser = (userId) => {
    return fetch(`${API}/profile/${userId}`, {
        method: "GET",
    })
     .then(response => {
         return response.json();
     })
     .catch(err => console.log(err));
};

//update a product
export const updateUser = (userId, token, user) => {
    return fetch(`${API}/user/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(user)
    })
     .then(response => {
         return response.json();
     })
     .catch(err => console.log(err));
};

//announcemetn calls

//get announcement
export const createAnnouncement = (userId, token, announcement) => {
    return fetch(`${API}/announcement/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(announcement)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

export const getAnnouncements = () => {
    return fetch(`${API}/announcements`, {
        method: "GET",
    })
     .then(response => {
         return response.json();
     })
     .catch(err => console.log(err));
};

export const deleteAnnouncement = (announcementId, userId, token) => {
    return fetch(`${API}/announcement/${announcementId}/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
     .then(response => {
         return response.json();
     })
     .catch(err => console.log(err));
};