import axios from 'axios';

const API_URL = 'http://localhost:5000/api/image'; // Replace with your API base URL

export const getAllImages = async (query) => {
    const response = await axios.get(API_URL, { params: query });
    return response.data;
};

export const getImageById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const createImage = async (imageDto) => {
    const response = await axios.post(API_URL, imageDto);
    return response.data;
};

export const updateImage = async (id, updateDto) => {
    const response = await axios.put(`${API_URL}/${id}`, updateDto);
    return response.data;
};

export const deleteImage = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};