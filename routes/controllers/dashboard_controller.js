const db = require('../../db');

const search = async(req, res) => {
    try {
        const {search} = req.body;
        const searchLists = await db.query(`SELECT * FROM questions WHERE question ILIKE $1`, [`%${search}%`]);
        res.send(searchLists.rows);
        
    } catch (error) {
        console.log(error);
        
    }
}

const getUserInfo = async(req, res) => {
    try {
        const userInfo = await db.query(`SELECT * FROM accounts WHERE user_id = $1`, [req.user]);
        res.send(userInfo.rows[0]);
        
    } catch (error) {
        throw error
        
    }
}

const getPopularTags = async(req, res) => {
    const popularTags = await db.query(`select unnest(tags) as tag, count(*) as num from questions GROUP BY tags ORDER BY COUNT(*) DESC LIMIT 10`);
    res.send(popularTags.rows)
}

const getProfileInfo = async(req,res) => {
    try {
        const userInfo = await db.query(`SELECT first_name, last_name, profile_pic, username, date FROM accounts WHERE username = $1`, [req.params.username]);
        if(userInfo.rows.length > 0){
            res.send(userInfo.rows[0]);
        }else{
            res.status(404).send('user does not exist');
        }
        
        
    } catch (error) {
        throw error
        
    }

}
const getQuestionsQuery = `SELECT questions.*,
                                COALESCE((SELECT SUM(votes.vote) FROM question_votes AS votes 
                                WHERE votes.question_id = questions.question_id
                                GROUP BY votes.question_id
                                ), 0) AS votes,
                                COALESCE((SELECT COUNT(*) FROM answers 
                                WHERE answers.question_id = questions.question_id
                                GROUP BY answers.question_id
                                ), 0) AS answers,
                                COALESCE((SELECT COUNT(*) FROM question_views
                                WHERE question_views.question_id = questions.question_id
                                group by question_views.question_id
                                ), 0) AS question_views,
                                accounts.username
                        FROM questions JOIN accounts
                        ON questions.account_id = accounts.user_id
                        
                        `;
const getQuestionsMethod = async(req, res, query, start) => {
    try {
        const questions = await db.query(query, [start]);
        res.send(questions.rows);
        
    } catch (error) {
        console.log(error);
    }
}
const getProfileQuestionsMethod = async(req, res, query, user) => {
    try {
        const questions = await db.query(query, [user]);
        res.send(questions.rows);
        
    } catch (error) {
        console.log(error);
    }
}

const limit = `
                OFFSET $1
                LIMIT 5
`
const popularQuestions = (req, res) => {
    getQuestionsMethod(req, res, `${getQuestionsQuery}ORDER BY votes desc ${limit}`, req.params.start); 
}

const newQuestions = (req, res) => {
    getQuestionsMethod(req, res, `${getQuestionsQuery}ORDER BY questions.date desc ${limit}`, req.params.start); 
}

const mostViewedQuestions = (req, res) => {
    getQuestionsMethod(req, res, `${getQuestionsQuery}ORDER BY question_views desc ${limit}`, req.params.start); 
}
//own profile
const getUsersNewQuestionLists = async(req, res) => {
    getProfileQuestionsMethod(req, res, `${getQuestionsQuery} WHERE account_id = $1 ORDER BY questions.date desc`, req.user); 
}
const getUsersPopularQuestionLists = async(req, res) => {
    getProfileQuestionsMethod(req, res, `${getQuestionsQuery} WHERE account_id = $1 ORDER BY votes desc`, req.user); 
}
const getUsersMostViewedQuestionLists = async(req, res) => {
    getProfileQuestionsMethod(req, res, `${getQuestionsQuery} WHERE account_id = $1 ORDER BY question_views desc`, req.user); 
}

//other users profile
const getOtherUsersNewQuestionLists = async(req, res) => {
    getProfileQuestionsMethod(req, res, `${getQuestionsQuery} WHERE username = $1 ORDER BY questions.date desc`, req.params.username); 
}
const getOtherUsersPopularQuestionLists = async(req, res) => {
    getProfileQuestionsMethod(req, res, `${getQuestionsQuery} WHERE username = $1 ORDER BY votes desc`, req.params.username); 
}
const getOtherUsersMostViewedQuestionLists = async(req, res) => {
    getProfileQuestionsMethod(req, res, `${getQuestionsQuery} WHERE username = $1 ORDER BY question_views desc`, req.params.username); 
}

const questionDetailsQuery = `SELECT questions.*,
                                    COALESCE((SELECT SUM(question_votes.vote)
                                            FROM question_votes
                                            WHERE question_votes.question_id = $1
                                            GROUP BY question_votes.question_id),
                                            0) AS votes,
                                    COALESCE((SELECT COUNT(*)
                                            FROM answers
                                            WHERE answers.question_id = $1
                                            GROUP BY answers.question_id),
                                            0) AS answers,
                                    accounts.username
                                FROM questions
                                JOIN accounts
                                ON accounts.user_id = questions.account_id
                                WHERE questions.question_id = $1`
const getQuestionDetails = async(req, res) => {
    try {
        const title = req.params.question_title.replace(/[-]+/g, ' ');
        const id = await db.query('SELECT question_id FROM questions WHERE question = $1', [title])
        const details = await db.query(questionDetailsQuery, [id.rows[0].question_id])
        if(details.rowCount > 0){
            res.send(details.rows[0]);
        }else{
            res.send(null);
        }
        
        
    } catch (error) {
        res.status(404).send('no question found');
        
    }
}

const viewQuestion = async(req, res) => {
    try {
        const title = req.params.question_title.replace(/[-]+/g, ' ');
        const id = await db.query('SELECT question_id FROM questions WHERE question = $1', [title]);
        await db.query(`INSERT INTO question_views (question_id) VALUES ($1)`, [id.rows[0].question_id]);
        res.send(true);
        
    } catch (err) {
        console.log(err)
        
    }
}
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
                    WHERE question_id = $1
                    ORDER BY votes desc`
const getQuestionsAnswers = async(req, res) => {
    try {
        const title = req.params.question_title.replace(/[-]+/g, ' ');
        const id = await db.query('SELECT question_id FROM questions WHERE question = $1', [title]);
        const answers = await db.query(answersQuery, [id.rows[0].question_id]);
        res.send(answers.rows);
    } catch (error) {
        // console.log(error);
    }
}

const previouslyViewedQuestion = async(req, res) => {
    
    try {
        let list = originalList = req.body.map(li => li.replace(/[-]+/g, ' '));
        list = JSON.stringify(list).replace(/[\[\]]/g, '');
        list = list.replace(/["]/g, "'");
        // console.log(req.body)
        const questions = await db.query(`SELECT accounts.username, questions.question FROM questions 
                                        JOIN accounts 
                                        ON accounts.user_id = questions.account_id
                                        WHERE question IN (${list}) `);



        originalList = originalList.map(list => {
            const index = questions.rows.findIndex(q => q.question === list) 
            return questions.rows[index]
        });

        res.send(originalList)
        
        
        
    } catch (error) {
        console.log(error)
        
    }
}

const getNotifications = async(req, res) => {
    try{
        const notifications = await db.query(`
                                        SELECT 
                                            answer_id,
                                            question,
                                            notifications.date,
                                            accounts.profile_pic,
                                            notification_type,
                                            accounts.username,
                                            notif_status
                                        FROM notifications
                                        JOIN accounts
                                        ON accounts.user_id = notifications.sender_id
                                        WHERE account_id = $1
                                    `, [req.user])
        res.send(notifications.rows);

    }catch(error){
        console.log(error);
    }
}

const seenAllNotifications = async(req, res) => {
    try {
        await db.query(`
                UPDATE notifications
                SET notif_status = 'SEEN'
                WHERE account_id = $1      
        `, [req.user]);

        res.send(true);
        
    } catch (error) {
        console.log(error)
        
    }
}

module.exports = {
    popularQuestions,
    newQuestions,
    mostViewedQuestions,
    getQuestionDetails,
    questionDetailsQuery,
    viewQuestion,
    getQuestionsAnswers,
    getUsersNewQuestionLists,
    getUsersPopularQuestionLists,
    getUsersMostViewedQuestionLists,
    getOtherUsersMostViewedQuestionLists,
    getOtherUsersNewQuestionLists,
    getOtherUsersPopularQuestionLists,
    getUserInfo,
    getProfileInfo,
    previouslyViewedQuestion,
    getNotifications,
    seenAllNotifications,
    search,
    getPopularTags,

}