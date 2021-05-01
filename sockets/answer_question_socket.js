const db = require('../db');

module.exports = (socket, io) => {
    socket.on('answer_question', async(data)=> {
        try {
            const {account_id, answer_id, question, sender_id, room} = data;
            const notif_data = await db.query(`
                INSERT INTO notifications (account_id, answer_id, question, sender_id, notification_type)
                VALUES ($1, $2, $3, $4, $5) 
                RETURNING 
                    answer_id,
                    question,
                    date,
                    (SELECT profile_pic FROM accounts WHERE accounts.user_id = notifications.sender_id) as profile_pic,
                    notification_type,
                    (SELECT username FROM accounts WHERE accounts.user_id = notifications.sender_id) as username,
                    notif_status
            `, [account_id, answer_id, question, sender_id, 'answer in question']);
            socket.to(room).emit('receive_notif', notif_data.rows[0]);
            
            
        } catch (error) {
            console.log(error);
            
        }

    });
}