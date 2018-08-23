-- git link  : https://github.com/m-phi/flexit-webapp
-- db schema : https://docs.google.com/document/d/1HDHRrC13uXBkfsL8nj0UU6gsDwe9beMa-fh3rx3NZvA/edit?usp=sharing
create user "username" with password "password";
alter user username with SUPERUSER;
grant all privileges on database gymportaldb to jersal;


-- loopback
-- sudo npm install -g loopback-cliDROP OWNED BY 
-- npm install loopback-connector-postgresql --save

-- ***********************************************************************************************************/
--  1.uesr info

create table user(user_id SERIAL PRIMARY KEY,email VARCHAR(50),password VARCHAR(30),facebook_id VARCHAR(30),created_at TIMESTAMP with time zone,updated_at TIMESTAMP with time zone);

-- 2.password-reset

create table password_reset(password_reset_id SERIAL PRIMARY KEY,email VARCHAR(50),reset_token VARCHAR(30),created_at TIMESTAMP with time zone,updated_at TIMESTAMP with time zone);

-- 4. custome details

 create table customer_details(customer_details_id SERIAL PRIMARY KEY,user_id integer references userinfo(user_id),first_name VARCHAR(50),last_name VARCHAR(50),gender VARCHAR(12),birthday date,emergency_contact integer,phone_number integer,profile_picture VARCHAR(200),
location point,created_at TIMESTAMP with time zone,updated_at TIMESTAMP with time zone);


-- 5.gymlogin

 create table gym_login(gym_login_id SERIAL PRIMARY KEY,username VARCHAR(30) UNIQUE,email VARCHAR(50),profile_picture VARCHAR(200),
password VARCHAR(12),is_verified boolean,created_at TIMESTAMP with time zone,updated_at TIMESTAMP with time zone);

-- 6.gym details 
 create table gym_details(gym_details_id SERIAL PRIMARY KEY,gym_login integer references gym_login(gym_login_id),gym_name VARCHAR(50),
address VARCHAR(300),location point,cover_picture VARCHAR(200),created_at TIMESTAMP with time zone,updated_at TIMESTAMP with time zone);

-- 7.gym working hours

create table gym_working_hours(gym_working_hours_id SERIAL PRIMARY KEY,gym_details_id integer references gym_details(gym_details_id),start_time TIMESTAMP with time zone,end_time  TIMESTAMP with time zone,created_at TIMESTAMP with time zone,updated_at TIMESTAMP with time zone);


-- 8.gym amenities

create table gym_amenities(gym_amenities_id SERIAL PRIMARY KEY,gym_details_id integer references gym_details(gym_details_id),amenities VARCHAR(200),description VARCHAR(300),
created_at TIMESTAMP with time zone,updated_at TIMESTAMP with time zone);

-- 9.gym_rate_card

create table gym_rate_card(gym_rate_card_id SERIAL PRIMARY KEY,gym_details_id integer references gym_details(gym_details_id),billing_type VARCHAR(30),rate integer,
created_at TIMESTAMP with time zone,updated_at TIMESTAMP with time zone);

-- 10.gym_social_media

create table gym_social_media_links(gym_social_media_id SERIAL PRIMARY KEY,gym_details_id integer references gym_details(gym_details_id),social_media_type VARCHAR(40),
url VARCHAR(150),created_at TIMESTAMP with time zone,updated_at TIMESTAMP with time zone);


-- 11.user ACTIVITY

create table user_activity( user_activity_id SERIAL PRIMARY KEY,user_id integer references userinfo(user_id),
gym_details_id integer references gym_details(gym_details_id),
check_in_time TIMESTAMP with time zone, check_out_time TIMESTAMP with time zone,
created_at TIMESTAMP with time zone,updated_at TIMESTAMP with time zone);


-- 12.user payments

create table user_payments(user_payment_id SERIAL PRIMARY KEY,user_id integer references userinfo(user_id),
gym_details_id integer references gym_details(gym_details_id), minutes_purchased TIMESTAMP with time zone,amount integer,tax_collected integer,stripe_transaction_id integer,
created_at TIMESTAMP with time zone,updated_at TIMESTAMP with time zone);

-- 13.tax rates

create table tax_rates(tax_rattes_id SERIAL PRIMARY KEY,state VARCHAR(30),tax_rate integer,created_at TIMESTAMP with time zone,updated_at TIMESTAMP with time zone);

-- 14.user_credits

create table user_credits(user_credits_id SERIAL PRIMARY KEY,user_id integer references userinfo(user_id),
gym_details_id integer references gym_details(gym_details_id),minutes_remaining TIMESTAMP with time zone,
created_at TIMESTAMP with time zone,updated_at TIMESTAMP with time zone);


-- 15.workout logs

create table workout_logs(workout_logs_id SERIAL PRIMARY KEY,user_id integer references userinfo(user_id),
gym_details_id integer references gym_details(gym_details_id),workout_date date,start_time TIMESTAMP with time zone,end_time TIMESTAMP with time zone,cost integer,created_at TIMESTAMP with time zone,updated_at TIMESTAMP with time zone);

-- 16.gym invities

create table gym_invites(gym_payment_information_id SERIAL PRIMARY KEY,name VARCHAR(30),email VARCHAR(50),token VARCHAR(20),accepted boolean,
created_at TIMESTAMP with time zone,updated_at TIMESTAMP with time zone);

-- 17.gym payment information 


create table gym_payment_information(gym_payment_information_id SERIAL PRIMARY KEY,gym_details_id integer references gym_details(gym_details_id),
business_name VARCHAR(50),address VARCHAR(200),bank_account_number numeric,routing_number numeric,created_at TIMESTAMP with time zone,updated_at TIMESTAMP with time zone);

-- 18.push notification

create table push_notifications(push_notifications_id SERIAL PRIMARY KEY,user_id integer references userinfo(user_id),
created_at TIMESTAMP with time zone,updated_at TIMESTAMP with time zone);

-- 19.access Token

create table access_token(access_token_id SERIAL PRIMARY KEY,user_id integer references userinfo(user_id),
created_at TIMESTAMP with time zone,updated_at TIMESTAMP with time zone);

-- 20.referrals

create table referrals(referals_id SERIAL PRIMARY KEY,user_id integer references userinfo(user_id),
referral_code VARCHAR(12),created_at TIMESTAMP with time zone,updated_at TIMESTAMP with time zone);


-- 21.user_referrals

create table user_referrals(user_referals_id SERIAL PRIMARY KEY,user_id integer references userinfo(user_id),
person_who_referred VARCHAR(12),created_at TIMESTAMP with time zone,updated_at TIMESTAMP with time zone);

-- 22.offers

create table offers(offers_id SERIAL PRIMARY KEY,gym_details_id integer references gym_details(gym_details_id),
promo_code VARCHAR(12),description VARCHAR(150),type VARCHAR(20),
created_at TIMESTAMP with time zone,updated_at TIMESTAMP with time zone);
