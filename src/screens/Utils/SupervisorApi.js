// utils/api.js

import axios from "axios";
import useBaseUrl from "../../hooks/useBaseUrl";
;



export const fetchRequestItems = async (baseUrl,accessToken) => {
  try {
    
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const response = await axios.get(`${baseUrl}/api/requestItems/all`, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching request items:", error);
    throw error;
  }
};

export const fetchRooms = async (baseUrl,accessToken) => {

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const response = await axios.get(`${baseUrl}/api/assignedRooms/all`, config);
    return response.data
      
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw error;
  }
};

export const acceptRequestItem = async (baseUrl,requestData, accessToken) => {

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const response = await axios.put(`${baseUrl}/api/requestItems/updateRequestItem`, requestData, config);
    // Additional logic after approval
    return response.data;
  } catch (error) {
    console.error("Error updating request items:", error);
    throw error;
  }
};

export const acceptRequestHelp = async (baseUrl,requestData, accessToken) => {

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const response = await axios.put(`${baseUrl}/api/assignedRooms/updateAssignedRoomIsCompleted`, requestData, config);
    // Additional logic after approval
    return response.data;
  } catch (error) {
    console.error("Error updating request help:", error);
    throw error;
  }
};
