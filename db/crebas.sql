/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2017/5/26 10:20:25                           */
/*==============================================================*/


drop table if exists companies;

drop table if exists company_address;

drop table if exists departments;

drop table if exists employees;

drop table if exists have;

drop table if exists leave_record;

drop table if exists rules;

drop table if exists sign_in_records;

/*==============================================================*/
/* Table: companies                                             */
/*==============================================================*/
create table companies
(
   companyName          varchar(50) not null,
   logo                 varchar(255),
   rulesType            varchar(20) not null,
   primary key (companyName)
);

/*==============================================================*/
/* Table: company_address                                       */
/*==============================================================*/
create table company_address
(
   addressId            int not null,
   companyName          varchar(50),
   name                 varchar(50),
   longitude            float not null,
   latitude             float not null,
   primary key (addressId)
);

/*==============================================================*/
/* Table: departments                                           */
/*==============================================================*/
create table departments
(
   departmentId         int not null,
   departmentName       varchar(255),
   primary key (departmentId)
);

/*==============================================================*/
/* Table: employees                                             */
/*==============================================================*/
create table employees
(
   employeeId           varchar(50) not null,
   departmentId         int,
   companyName          varchar(50),
   name                 varchar(50) not null,
   phoneNumber          varchar(15) not null,
   isAdmin              bool not null,
   primary key (employeeId)
);

/*==============================================================*/
/* Table: have                                                  */
/*==============================================================*/
create table have
(
   companyName          varchar(50) not null,
   departmentId         int not null,
   primary key (companyName, departmentId)
);

/*==============================================================*/
/* Table: leave_record                                          */
/*==============================================================*/
create table leave_record
(
   leaveId              int not null,
   employeeId           varchar(50),
   start_time           timestamp,
   end_time             timestamp,
   reasonForLeave       varchar(255),
   primary key (leaveId)
);

/*==============================================================*/
/* Table: rules                                                 */
/*==============================================================*/
create table rules
(
   ruleId               int not null,
   companyName          varchar(50),
   ruleName             varchar(100) not null,
   day_week_month       varchar(20),
   timeOnDuty           time,
   timeOffDuty          time,
   durationOfLate       int,
   durationOfLeaveEarly int,
   durationOfWorkLeast  smallint,
   primary key (ruleId)
);

/*==============================================================*/
/* Table: sign_in_records                                       */
/*==============================================================*/
create table sign_in_records
(
   signInId             int not null,
   employeeId           varchar(50),
   signInTime           timestamp not null,
   signInAddress        varchar(100) not null,
   isOnDuty             bool not null,
   signInRemark         varchar(255),
   primary key (signInId)
);

alter table company_address add constraint FK_locate foreign key (companyName)
      references companies (companyName) on delete restrict on update restrict;

alter table employees add constraint FK_belongs foreign key (departmentId)
      references departments (departmentId) on delete restrict on update restrict;

alter table employees add constraint FK_hire foreign key (companyName)
      references companies (companyName) on delete restrict on update restrict;

alter table have add constraint FK_have foreign key (companyName)
      references companies (companyName) on delete restrict on update restrict;

alter table have add constraint FK_have2 foreign key (departmentId)
      references departments (departmentId) on delete restrict on update restrict;

alter table leave_record add constraint FK_askForALeave foreign key (employeeId)
      references employees (employeeId) on delete restrict on update restrict;

alter table rules add constraint FK_set foreign key (companyName)
      references companies (companyName) on delete restrict on update restrict;

alter table sign_in_records add constraint FK_signIn foreign key (employeeId)
      references employees (employeeId) on delete restrict on update restrict;

