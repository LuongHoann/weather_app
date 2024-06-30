
export function findMinTemp(arr){ 
    let min = arr[0].main.temp_min;
    for ( let i = 0 ; i < arr.length; i++){ 
        if ( arr[i].main.temp_min < min ) min = arr[i].main.temp_min;
    }
    return min;
}
// 

export function findMaxTemp(arr){ 
    let max = arr[0].main.temp_max;
    for ( let i = 0 ; i < arr.length; i++){ 
        if ( arr[i].main.temp_max > max ) max = arr[i].main.temp_max;
    }
    return max;
}

// merge data by day

export const mergedArray = (arr) => { 
    let newData = []
    for(let i = 0 ;  i < arr.length ;  i +=8){ 
        newData.push(arr.slice(i,i+8));
    }
    return newData;
}


// config day 

export const getDayAndMonth = (ele) => { 
    let month = new Date(ele.dt * 1000).getMonth() + 1;
    let date = new Date(ele.dt * 1000).getDate();
    return  date + "/" + month;
}


export const getDataHours = (time) => { 
     let newTime = new Date(time * 1000).getUTCDate();
     return newTime;
}