create database if not exists hotelmanage; 

use hotelmanage;
# create table

#table user
create table user(
	createAt datetime,
    createBy int,
    deleteAt datetime,
    deleteBy int,
	id int unsigned auto_increment primary key,
    firstName nvarchar(45) not null,
    lastName nvarchar(45) not null,
    numberPhone varchar(20) not null,
    citizenIdentification varchar(30),
    birthDay date,
    taxCode varchar(20),
    address text,
    job nvarchar(30),
    email varchar(255),
    folk nvarchar(50),
    religion nvarchar(50),
    country varchar(30),
    constraint ck_phone check (numberPhone not like '%[^0-9]%' or numberPhone is null),
    constraint ck_email check (email is null or email like '%@%.%'),
    unique index(id) using btree
);

# table company
create table company(
	createAt datetime,
    createBy int,
    deleteAt datetime,
    deleteBy int,
	id int unsigned auto_increment primary key,
    dustinguishedName varchar(255) unique not null,
    fulltext index(dustinguishedName),
    unique index(id) using btree,
    nameCompany nvarchar(255) not null,
    website varchar(2083),
    taxCode varchar(20),
    headquarter text
);

#table hotel

create table hotel(
	createAt datetime,
    createBy int,
    deleteAt datetime,
    deleteBy int,
	id int unsigned auto_increment primary key,
    idCompany int unsigned not  null,
    foreign key (idCompany) references company(id),
    nameHotel nvarchar(255) not null,
    address text not null,
	country varchar(30),
    typeHotel enum('commercial hotel','resort hotel','airport hotel','casino hotel','hostel','motel','floating hotel','codotel','pod hotel') not null,
    unique index(id) using btree
);

#create staff
create table staff(
	createAt datetime,
    createBy int,
    deleteAt datetime,
    deleteBy int,
	id int unsigned auto_increment,
    unique index(id) using btree,
    hotelId int unsigned not null,
    foreign key (hotelId) references hotel(id),
    employeesCode varchar(20),
    userId int unsigned not null,
    foreign key (userId) references user(id),
    positionUser nvarchar(50),
    status enum('active','deactive'),
    primary key(id,employeesCode,hotelId)
);

# create accounts
create table accounts(
	createAt datetime,
    createBy int,
    deleteAt datetime,
    deleteBy int,
	id int unsigned auto_increment primary key,
    unique index(id) using btree,
	staffId int unsigned not null,
    foreign key (staffId) references staff(id),
    username nvarchar(50) not null,
    accPassword varchar(60),
    needChangePassword tinyint default 1,
    permisson text
);

#create ActivityHistory

create table ActivityHistory(
	createAt datetime,
    createBy int,
    deleteAt datetime,
    deleteBy int,
	id int unsigned auto_increment primary key,
    unique index(id) using btree,
    accountId int unsigned,
    title nvarchar(255) not null,
    descriptions text
);

# create room

create table room(
	createAt datetime,
    createBy int,
    deleteAt datetime,
    deleteBy int,
	id int unsigned auto_increment primary key,
    unique index(id) using btree,
    hotelId int unsigned not null,
    foreign key (hotelId) references hotel(id),
    roomNumber varchar(10) not null,
    type_ enum('single','double'),
    descriptionRoom text,
    status enum('avaible','unavaible')
);

#table bookingSchedule

create table bookingSchedule(
	createAt datetime,
    createBy int,
    deleteAt datetime,
    deleteBy int,
	id int unsigned auto_increment primary key,
    unique index(id) using btree,
    roomId int unsigned not null,
    foreign key (roomId) references room(id),
    userId int unsigned not null,
    foreign key (userId) references user(id),
    dateIn datetime not null,
    dateOut datetime not null,
    statusBooking enum('scheduling','missing','checked')
);

# table bill

create table bill(
	createAt datetime,
    createBy int,
    deleteAt datetime,
    deleteBy int,
	id int unsigned auto_increment primary key,
    unique index(id) using btree,
    staffId int unsigned not null,
    foreign key (staffId) references staff(id),
	dateIn datetime not null,
    dateOut datetime not null,
    clientId int unsigned not null,
    foreign key (clientId) references user(id),
    totalMoney DECIMAL(13,2) not null,
    curency varchar(10)
);

# table billDetail
create table billDetail(
	createAt datetime,
    createBy int,
    deleteAt datetime,
    deleteBy int,
	id int unsigned auto_increment primary key,
    unique index(id) using btree,
    billId int unsigned not null,
    foreign key (billId)  references bill(id),
    nameItem nvarchar(50) not null,
    service nvarchar(50),
    quantity int default 0,
    cost DECIMAL(13,2) not null,
    unit nvarchar(10),
	curency varchar(10)
);


	