import axios from "axios";


export const imageUpload = async imageData => {

    // Create FormData
    const formData = new FormData();
    formData.append("image", imageData);


    // Upload image in imgbb server using post request
    // Upload URL
    const uploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`

    const { data } = await axios.post(uploadUrl, formData);
    return data?.data?.display_url;
}


// save or update user data
export const saveUsersInDb = async user => {
    const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/users`, user)
    console.log("user data", data);
}


// update coin data in user data

export const updateCoinInDb = async (email, addedCoin) => {
    const res = await axios.patch(`${import.meta.env.VITE_API_URL}/update-coin`, {
        email,
        addedCoin
    });
    return res.data;
};