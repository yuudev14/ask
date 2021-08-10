export const getDate = (date) => {
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug',
                        'Sept', 'Oct', 'Nov', 'Dec'];
    const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const d = new Date(date);
    const currentDate = new Date();

    const dateObj = {
        seconds : d.getSeconds(),
        minutes : d.getMinutes(),
        hour : d.getHours(),
        day : day[d.getDay()],
        date : d.getDate(),
        month : month[d.getMonth()],
        year : d.getFullYear(),
    }

    if(currentDate.getFullYear() === dateObj.year){
        if(month[currentDate.getMonth()] === dateObj.month){
            const date = currentDate.getDate() - dateObj.date
            if(date === 0){
                
                
                if(dateObj.hour === currentDate.getHours()){
                    
                    if(dateObj.minutes === currentDate.getMinutes()){
                        return `${currentDate.getSeconds() - dateObj.seconds} seconds ago`
                    }else{
                        return `${currentDate.getMinutes() - dateObj.minutes} minutes ago`

                    }

                }else{
                    const minute = 60 - dateObj.minutes + currentDate.getMinutes()
                    if(minute < 60){
                        return `${minute} minutes ago`

                    }else{
                        return `${currentDate.getHours() - dateObj.hour} hours ago`

                    }
                    
                    // return `${currentDate.getMinutes() - dateObj.minutes} minutes ago`

                }

            }else if(date < 7){
                return `${date} days ago`

            }else{
                return `${dateObj.month} ${dateObj.date}`
            }

        }else{
            return `${dateObj.month} ${dateObj.date}`

        }
        
    }else{
        return `${dateObj.month} ${dateObj.date} ${dateObj.year}`
    }


    
    
}