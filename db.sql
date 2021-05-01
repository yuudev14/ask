CREATE DATABASE ask;


CREATE EXTENSION "uuid-ossp";


CREATE TABLE accounts (
    user_id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    profile_pic VARCHAR(255),
    password VARCHAR(100) NOT NULL,
    username VARCHAR(100) NOT NULL,
    account_type VARCHAR(10) NOT NULL DEFAULT 'app_email'
    CHECK(length(password) > 7),
    CHECK(account_type in ('facebook', 'google' , 'app_email')),
    UNIQUE(username)
);

CREATE TABLE questions (
    question_id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    account_id uuid NOT NULL REFERENCES accounts(user_id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    context TEXT,
    tags VARCHAR(50)[],
    date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(question)
);

CREATE TABLE answers (
    answer_id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    account_id uuid NOT NULL REFERENCES accounts(user_id) ON DELETE CASCADE,
    question_id uuid NOT NULL REFERENCES questions(question_id) ON DELETE CASCADE,
    answer TEXT NOT NULL,
    date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE question_views (
    question_id uuid NOT NULL REFERENCES questions(question_id) ON DELETE CASCADE,
    view_id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE question_votes (
    question_id uuid NOT NULL REFERENCES questions(question_id) ON DELETE CASCADE,
    account_id uuid NOT NULL REFERENCES accounts(user_id) ON DELETE CASCADE,
    vote_id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    vote INTEGER NOT NULL,
    CHECK(vote IN (1, -1))
);

CREATE TABLE answer_comments (
    comment_id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    account_id uuid NOT NULL REFERENCES accounts(user_id) ON DELETE CASCADE,
    answer_id uuid NOT NULL REFERENCES answers(answer_id) ON DELETE CASCADE,
    comment TEXT NOT NULL,
    date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE answer_votes (
    reaction_id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    account_id uuid NOT NULL REFERENCES accounts(user_id) ON DELETE CASCADE,
    answer_id uuid NOT NULL REFERENCES answers(answer_id) ON DELETE CASCADE,
    vote INTEGER NOT NULL,
    CHECK(vote IN (1, -1))
);

CREATE TABLE tokens (
    token VARCHAR(255)
);

CREATE TABLE notifications (
    notification_id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    account_id uuid NOT NULL REFERENCES accounts(user_id) ON DELETE CASCADE,
    answer_id uuid NOT NULL REFERENCES answers(answer_id) ON DELETE CASCADE,
    notification_type VARCHAR(50) NOT NULL,
    sender_id uuid NOT NULL REFERENCES accounts(user_id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    notif_status VARCHAR(10) NOT NULL DEFAULT 'NOT SEEN',
    CHECK(notif_status IN ('NOT SEEN', 'SEEN'))
);