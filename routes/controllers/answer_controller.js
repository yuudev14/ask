const db = require('../../db');

const answersQuery = `SELECT answers.*,
                            COALESCE((
                                SELECT COUNT(*) FROM answer_comments
                                WHERE answer_comments.answer_id = answers.answer_id
                                GROUP BY answer_comments.answer_id                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
                            ), 0) AS no_comment,
                            COALESCE((
                                SELECT SUM(vote) FROM answer_votes
                                WHERE answer_votes.answer_id = answers.answer_id
                                GROUP BY answer_votes.answer_id
                            ), 0) AS votes,
                            accounts.username
                    FROM answers 
                    JOIN accounts ON answers.account_id = accounts.user_id
                    WHERE answer_id = $1`

const vote = async(vote_num, req, res) => {
    try {
        const answer_id = req.params.id;
        const voteVerify = await db.query(`SELECT * FROM answer_votes WHERE answer_id = $1 AND account_id = $2`, [answer_id, req.user]);
        if(voteVerify.rowCount === 0){
            await db.query(`INSERT INTO answer_votes (answer_id, account_id, vote) VALUES ($1, $2, ${vote_num})`, [answer_id, req.user])
        }else{
            if(voteVerify.rows[0].vote === vote_num){
                await db.query(`DELETE FROM answer_votes WHERE answer_id = $1 AND account_id = $2`, [answer_id, req.user]);
            }else{
                await db.query(`UPDATE answer_votes SET vote = ${vote_num} WHERE answer_id = $1 AND account_id = $2`, [answer_id, req.user]);
            }
        }
        const answer_data = await db.query(answersQuery, [answer_id]);
        res.send(answer_data.rows[0]);
    } catch (error) {
        console.log(error);
        
    }
}

const vote_up = (req, res) => {
    vote(1, req, res);
}

const vote_down = (req, res) => {
    vote(-1, req, res);
}

const add_comment = async(req, res) => {
    try {
        const {comment} = req.body;
        const id = req.params.id;
        const username = await db.query(`SELECT username FROM accounts WHERE user_id = $1`, [req.user])
        const addCommentMethod = await db.query(`INSERT INTO answer_comments (account_id, answer_id, comment) 
                                                VALUES ($1, $2, $3) RETURNING *`, [req.user, id, comment]);
        const addedCommentData = addCommentMethod.rows[0];
        res.send({...addedCommentData, username : username.rows[0].username});
        
    } catch (error) {
        console.log(error);
        
    }
}

const deleteAnswer = async(req, res) => {
    try {
        const id = req.params.id;
        await db.query(`DELETE FROM answers WHERE answer_id = $1`, [id]);
        res.send(true);
    } catch (error) {
        throw error
        
    }
}

const view_comments = async(req, res) => {
    try {
        const id = req.params.id;
        const comments = await db.query(`SELECT answer_comments.*, accounts.username, answer_comments.date FROM answer_comments 
                                         LEFT JOIN accounts
                                        ON accounts.user_id = answer_comments.account_id
                                        where answer_id = $1 
                                        ORDER BY answer_comments.date`, [id]);
        res.send(comments.rows);
        
    } catch (error) {
        console.log(error)
        
    }
}

module.exports = {
    vote_up,
    vote_down,
    add_comment,
    view_comments,
    deleteAnswer,
}