import AsyncStorage from "@react-native-community/async-storage";

export const registration = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });
    const finalRes = await res.json();
    console.log('finalRes-----', finalRes);
    await AsyncStorage.setItem('registetiondata', JSON.stringify(finalRes));
    return finalRes;
};

export const otpapi = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify((data)),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    });
    const finalRes = await res.json();
    return finalRes;
};

export const login = async (url, data) => {
    console.log('data-----', data)
    try {
        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        });

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const finalRes = await res.json();
        console.log('finalRes----', finalRes)
        if (finalRes && finalRes.success == true) {

            await AsyncStorage.setItem('logindata', JSON.stringify(finalRes.data[0]));
            const userdata = await AsyncStorage.getItem('logindata')
            const finaluserdata = JSON.parse(userdata);
            console.log('finaluserdata-->>>>', finaluserdata)
            console.log('Login successful. User ID:----', finalRes.data[0]);

        }

        return finalRes;
    } catch (error) {
        console.log('error-->>>>', error)
    }

};
// export const updateUserProfiledata = async (url, data) => {
//     try {
//         const res = await fetch(url, { method: 'post', body: JSON.stringify(data) });
//         const finalRes = await res.json();
//         console.log('data,.,.,.,.,,>>', data);
//         return finalRes;
//     } catch (error) {
//         console.error('Error updating user profile:', error);
//         return { success: false, ResponseMsg: 'An unexpected error occurred.' };
//     }
// };


export const updateUserProfiledata = async (url, data) => {
    const res = await fetch(url, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify((data))
    });
    const finalRes = await res.json();
    // console.log('updateuserprofile-==>>', finalRes)

    return finalRes;
}




export const uploadimagedata = async (url, data) => {
    try {
        const res = await fetch(url, {
            method: 'post', body: JSON.stringify((data)),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        });
        const finalRes = await res.json();

        return finalRes;
    } catch (error) {
        console.log('error-->>>>', error)
    }
};
export const selectedUploadimg = async (url, data) => {
    try {
        const res = await fetch(url, {
            method: 'post', body: JSON.stringify((data)),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        });
        const finalRes = await res.json();

        return finalRes;
    } catch (error) {
        console.log('error-->>>>', error)
    }
};
export const addadsdata = async (url, data) => {
    console.log('data--@', data)
    const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });
    const finalRes = await res.json();
    console.log('finalRes-----', finalRes);
    //await AsyncStorage.setItem('imgUpoldeandalldata', JSON.stringify(finalRes));
    // const useralldata = await AsyncStorage.getItem('imgUpoldeandalldata')
    //  const adduserdata = JSON.parse(useralldata);
    return finalRes;
};


export const addclientdata = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });
    const finalRes = await res.json();
    console.log('finalRes', finalRes);
    //await AsyncStorage.setItem('addclientalldata', JSON.stringify(finalRes));
    return finalRes;
};

export const TrendingNews = async (url) => {
    const res = await fetch(url, { method: 'GET' });
    const finalRes = await res.json();
    return finalRes;
};
export const NewsGetsliderdata = async (url) => {
    const res = await fetch(url, { method: 'GET' });
    const finalRes = await res.json();
    return finalRes;
};
export const NewsCategorydata = async (url) => {
    const res = await fetch(url, { method: 'GET' });
    const finalRes = await res.json();
    return finalRes;
};

export const SubCatNews = async (url, data) => {
    console.log('data==-', data)
    const res = await fetch(url, {

        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },

    });
    console.log('res-->>', res)
    const finalRes = await res.json();
    console.log('finalRes----', finalRes);

    return finalRes;
};





export const getadsNewdata = async (url, data) => {
    console.log('data==-', data)
    const res = await fetch(url, {

        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },

    });
    console.log('res-->>', res)
    const finalRes = await res.json();
    console.log('finalRes----', finalRes);
    return finalRes;
};

export const viewdata = async (url, data) => {
    console.log('data==-', data)
    const res = await fetch(url, {

        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },

    });
    console.log('res-->>', res)
    const finalRes = await res.json();
    console.log('finalRes----', finalRes);
    return finalRes;
};
export const callata = async (url, data) => {
    console.log('data :::', data)
    const res = await fetch(url, {

        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },

    });
    console.log('res-->>', res)
    const finalRes = await res.json();
    console.log('finalRes----', finalRes);
    return finalRes;
};

export const msgdata = async (url, data) => {

    const res = await fetch(url, {

        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },

    });
    console.log('res-->>', res)
    const finalRes = await res.json();
    console.log('finalRes----', finalRes);
    return finalRes;
};


export const myAdsDataall = async (url, data) => {

    const res = await fetch(url, {

        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },

    });
    console.log('res-->>', res)
    const finalRes = await res.json();
    console.log('finalRes----', finalRes);
    return finalRes;
};
export const getplandata = async (url) => {
    const res = await fetch(url, { method: 'GET' });
    const finalRes = await res.json();
    return finalRes;
};

export const createcompanydata = async (url, data) => {
    console.log('data-@--', data)
    const res = await fetch(url, {

        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },

    });
    console.log('res-->>', res)
    const finalRes = await res.json();
    console.log('finalRes----', finalRes);
    await AsyncStorage.setItem('createcompanydata', JSON.stringify(finalRes));
    return finalRes;
};
export const mycompanyalldata = async (url, data) => {
    console.log('data==-', data)
    const res = await fetch(url, {

        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },

    });
    console.log('res-->>', res)
    const finalRes = await res.json();
    console.log('finalRes----', finalRes);
    return finalRes;
};

export const Clientdata = async (url, data) => {
    console.log('data--@', data)
    const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });
    const finalRes = await res.json();
    console.log('finalRes-----', finalRes);
    await AsyncStorage.setItem('createdalldata', JSON.stringify(finalRes));
    const useralldata = await AsyncStorage.getItem('createdalldata')
    const adduserdata = JSON.parse(useralldata);
    return finalRes;
};

export const viewcount = async (url, data) => {
    console.log('data==-', data)
    const res = await fetch(url, {

        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },

    });
    console.log('res-->>', res)
    const finalRes = await res.json();
    console.log('finalRes----', finalRes);
    return finalRes;
};

export const msgcount = async (url, data) => {
    console.log('data==-', data)
    const res = await fetch(url, {

        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },

    });
    console.log('res-->>', res)
    const finalRes = await res.json();
    console.log('finalRes----', finalRes);
    return finalRes;
};

export const callcount = async (url, data) => {
    console.log('data==-', data)
    const res = await fetch(url, {

        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },

    });
    console.log('res-->>', res)
    const finalRes = await res.json();
    console.log('finalRes----', finalRes);
    return finalRes;
};

export const purchaseplan = async (url, data) => {
    console.log('data==-', data)
    const res = await fetch(url, {

        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },

    });
    console.log('res-->>', res)
    const finalRes = await res.json();

    console.log('finalRes----', finalRes);
    // await AsyncStorage.setItem('purchaseplandata', JSON.stringify(finalRes));
    return finalRes;
};

export const expiredata = async (url, data) => {
    console.log('data==-', data)
    const res = await fetch(url, {

        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },

    });
    console.log('res-->>', res)
    const finalRes = await res.json();

    console.log('finalRes----', finalRes);
    // await AsyncStorage.setItem('purchaseplandata', JSON.stringify(finalRes));
    return finalRes;
};


export const addselected = async (url, data) => {
    console.log('data==-', data)
    const res = await fetch(url, {

        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },

    });
    console.log('res-->>', res)
    const finalRes = await res.json();

    console.log('finalRes----', finalRes);
    // await AsyncStorage.setItem('purchaseplandata', JSON.stringify(finalRes));
    return finalRes;
};
export const getuserprofiledata = async (url, data) => {
    console.log('data==-', data)
    const res = await fetch(url, {

        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },

    });
    console.log('res-->>', res)
    const finalRes = await res.json();

    console.log('finalRes----', finalRes);
    // await AsyncStorage.setItem('purchaseplandata', JSON.stringify(finalRes));
    return finalRes;
};

export const checkplans = async (url, data) => {
    console.log('data==-', data)
    const res = await fetch(url, {

        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },

    });
    console.log('res-->>', res)
    const finalRes = await res.json();

    console.log('finalRes----', finalRes);
    // await AsyncStorage.setItem('purchaseplandata', JSON.stringify(finalRes));
    return finalRes;
};

export const getcompanyadsdata = async (url, data) => {
    console.log('data :::**', data)
    const res = await fetch(url, {

        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },

    });
    console.log('res-->>', res)
    const finalRes = await res.json();
    console.log('finalRes----', finalRes);
    return finalRes;
};

export const Newsimgedata = async (url, data) => {
    console.log('data ::', data)
    const res = await fetch(url, {

        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },

    });
    console.log('res-->>', res)
    const finalRes = await res.json();

    console.log('finalRes----', finalRes);
    // await AsyncStorage.setItem('purchaseplandata', JSON.stringify(finalRes));
    return finalRes;
};



export const pendindata = async (url, data) => {
    console.log('data ::', data)
    const res = await fetch(url, {

        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },

    });
    console.log('res-->>', res)
    const finalRes = await res.json();

    console.log('finalRes----', finalRes);
    // await AsyncStorage.setItem('purchaseplandata', JSON.stringify(finalRes));
    return finalRes;
};

export const AgencyCommiDataall = async (url, data) => {

    const res = await fetch(url, {

        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },

    });
    console.log('res-->>', res)
    const finalRes = await res.json();
    console.log('finalRes----', finalRes);
    return finalRes;
};

export const purchaseplandata = async (url, data) => {
    console.log('data >><<', data);
    const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });
    console.log('res-->>', res);
    const finalRes = await res.json();
    console.log('finalRes----', finalRes);
    return finalRes;
};
export const freependindata = async (url, data) => {
    console.log('freedata ::', data)
    const res = await fetch(url, {

        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },

    });
    console.log('res-->>', res)
    const finalRes = await res.json();

    console.log('finalRes----', finalRes);
    // await AsyncStorage.setItem('purchaseplandata', JSON.stringify(finalRes));
    return finalRes;
};
export const Newsonboardscreen = async (url) => {
    const res = await fetch(url, { method: 'GET' });
    console.log('res--', res)
    const finalRes = await res.json();
    return finalRes;
};

export const renewadsdata = async (url, data) => {
    console.log('freedata ::', data)
    const res = await fetch(url, {

        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },

    });
    console.log('res-->>', res)
    const finalRes = await res.json();

    console.log('finalRes----', finalRes);
    // await AsyncStorage.setItem('purchaseplandata', JSON.stringify(finalRes));
    return finalRes;
};
export const getconfigall = async (url) => {
    const res = await fetch(url, { method: 'GET' });
    const finalRes = await res.json();
    return finalRes;
};