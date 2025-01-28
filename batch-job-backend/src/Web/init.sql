# drop database  batch;
# create database   batch;
# show databases;
# # use  batch;
# show tables ;
CREATE DATABASE IF NOT EXISTS batch;

CREATE TABLE IF NOT EXISTS BatchJobs (
                                         Id                  int auto_increment primary key,
                                         JobName             varchar(100) null,
                                         JobGroup            longtext not null,
                                         JobType             int not null,
                                         JobUrl              longtext null,
                                         CronExpression      longtext null,
                                         CronExpressionStr   varchar(100) null,
                                         ScheduleType        varchar(11) default '0' null,
                                         Status              int default 0 null,
                                         Year                longtext null,
                                         Month               longtext null,
                                         Day                 longtext null,
                                         WeekDay             longtext null,
                                         Hour                longtext null,
                                         Minute              longtext null,
                                         Second              longtext null,
                                         JobTriggerId        int null,
                                         JobNo               int null,
                                         Created             datetime(6) not null,
                                         CreatedBy           longtext null,
                                         LastModified        datetime(6) not null,
                                         LastModifiedBy      longtext null,
                                         BatchLaunchMonthDay longtext null,
                                         BatchLaunchWeedDay  longtext null,
                                         LoopStep            int default 0 null,
                                         WorkHourEnd         int default 0 null,
                                         WorkHourStart       int default 0 null,
                                         StartType           int null
);

CREATE TABLE IF NOT EXISTS QRTZ_JOB_DETAILS (
                                                SCHED_NAME VARCHAR(120) NOT NULL,
                                                JOB_NAME VARCHAR(200) NOT NULL,
                                                JOB_GROUP VARCHAR(200) NOT NULL,
                                                DESCRIPTION VARCHAR(250) NULL,
                                                JOB_CLASS_NAME VARCHAR(250) NOT NULL,
                                                IS_DURABLE BOOLEAN NOT NULL,
                                                IS_NONCONCURRENT BOOLEAN NOT NULL,
                                                IS_UPDATE_DATA BOOLEAN NOT NULL,
                                                REQUESTS_RECOVERY BOOLEAN NOT NULL,
                                                JOB_DATA BLOB NULL,
                                                PRIMARY KEY (SCHED_NAME, JOB_NAME, JOB_GROUP),
                                                INDEX IDX_QRTZ_J_REQ_RECOVERY (SCHED_NAME, REQUESTS_RECOVERY),
                                                INDEX IDX_QRTZ_J_GRP (SCHED_NAME, JOB_GROUP)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS QRTZ_TRIGGERS (
                                             SCHED_NAME VARCHAR(120) NOT NULL,
                                             TRIGGER_NAME VARCHAR(200) NOT NULL,
                                             TRIGGER_GROUP VARCHAR(200) NOT NULL,
                                             JOB_NAME VARCHAR(200) NOT NULL,
                                             JOB_GROUP VARCHAR(200) NOT NULL,
                                             DESCRIPTION VARCHAR(250) NULL,
                                             NEXT_FIRE_TIME BIGINT(19) NULL,
                                             PREV_FIRE_TIME BIGINT(19) NULL,
                                             PRIORITY INTEGER NULL,
                                             TRIGGER_STATE VARCHAR(16) NOT NULL,
                                             TRIGGER_TYPE VARCHAR(8) NOT NULL,
                                             START_TIME BIGINT(19) NOT NULL,
                                             END_TIME BIGINT(19) NULL,
                                             CALENDAR_NAME VARCHAR(200) NULL,
                                             MISFIRE_INSTR SMALLINT(2) NULL,
                                             JOB_DATA BLOB NULL,
                                             PRIMARY KEY (SCHED_NAME, TRIGGER_NAME, TRIGGER_GROUP),
                                             FOREIGN KEY (SCHED_NAME, JOB_NAME, JOB_GROUP) REFERENCES QRTZ_JOB_DETAILS(SCHED_NAME, JOB_NAME, JOB_GROUP),
                                             INDEX IDX_QRTZ_T_J (SCHED_NAME, JOB_NAME, JOB_GROUP),
                                             INDEX IDX_QRTZ_T_JG (SCHED_NAME, JOB_GROUP),
                                             INDEX IDX_QRTZ_T_C (SCHED_NAME, CALENDAR_NAME),
                                             INDEX IDX_QRTZ_T_G (SCHED_NAME, TRIGGER_GROUP),
                                             INDEX IDX_QRTZ_T_STATE (SCHED_NAME, TRIGGER_STATE),
                                             INDEX IDX_QRTZ_T_N_STATE (SCHED_NAME, TRIGGER_NAME, TRIGGER_GROUP, TRIGGER_STATE),
                                             INDEX IDX_QRTZ_T_N_G_STATE (SCHED_NAME, TRIGGER_GROUP, TRIGGER_STATE),
                                             INDEX IDX_QRTZ_T_NEXT_FIRE_TIME (SCHED_NAME, NEXT_FIRE_TIME),
                                             INDEX IDX_QRTZ_T_NFT_ST (SCHED_NAME, TRIGGER_STATE, NEXT_FIRE_TIME),
                                             INDEX IDX_QRTZ_T_NFT_MISFIRE (SCHED_NAME, MISFIRE_INSTR, NEXT_FIRE_TIME),
                                             INDEX IDX_QRTZ_T_NFT_ST_MISFIRE (SCHED_NAME, MISFIRE_INSTR, NEXT_FIRE_TIME, TRIGGER_STATE),
                                             INDEX IDX_QRTZ_T_NFT_ST_MISFIRE_GRP (SCHED_NAME, MISFIRE_INSTR, NEXT_FIRE_TIME, TRIGGER_GROUP, TRIGGER_STATE)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS QRTZ_SIMPLE_TRIGGERS (
                                                    SCHED_NAME VARCHAR(120) NOT NULL,
                                                    TRIGGER_NAME VARCHAR(200) NOT NULL,
                                                    TRIGGER_GROUP VARCHAR(200) NOT NULL,
                                                    REPEAT_COUNT BIGINT(7) NOT NULL,
                                                    REPEAT_INTERVAL BIGINT(12) NOT NULL,
                                                    TIMES_TRIGGERED BIGINT(10) NOT NULL,
                                                    PRIMARY KEY (SCHED_NAME, TRIGGER_NAME, TRIGGER_GROUP),
                                                    FOREIGN KEY (SCHED_NAME, TRIGGER_NAME, TRIGGER_GROUP) REFERENCES QRTZ_TRIGGERS(SCHED_NAME, TRIGGER_NAME, TRIGGER_GROUP)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS QRTZ_CRON_TRIGGERS (
                                                  SCHED_NAME VARCHAR(120) NOT NULL,
                                                  TRIGGER_NAME VARCHAR(200) NOT NULL,
                                                  TRIGGER_GROUP VARCHAR(200) NOT NULL,
                                                  CRON_EXPRESSION VARCHAR(120) NOT NULL,
                                                  TIME_ZONE_ID VARCHAR(80),
                                                  PRIMARY KEY (SCHED_NAME, TRIGGER_NAME, TRIGGER_GROUP),
                                                  FOREIGN KEY (SCHED_NAME, TRIGGER_NAME, TRIGGER_GROUP) REFERENCES QRTZ_TRIGGERS(SCHED_NAME, TRIGGER_NAME, TRIGGER_GROUP)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS QRTZ_SIMPROP_TRIGGERS (
                                                     SCHED_NAME VARCHAR(120) NOT NULL,
                                                     TRIGGER_NAME VARCHAR(200) NOT NULL,
                                                     TRIGGER_GROUP VARCHAR(200) NOT NULL,
                                                     STR_PROP_1 VARCHAR(512) NULL,
                                                     STR_PROP_2 VARCHAR(512) NULL,
                                                     STR_PROP_3 VARCHAR(512) NULL,
                                                     INT_PROP_1 INT NULL,
                                                     INT_PROP_2 INT NULL,
                                                     LONG_PROP_1 BIGINT NULL,
                                                     LONG_PROP_2 BIGINT NULL,
                                                     DEC_PROP_1 NUMERIC(13,4) NULL,
                                                     DEC_PROP_2 NUMERIC(13,4) NULL,
                                                     BOOL_PROP_1 BOOLEAN NULL,
                                                     BOOL_PROP_2 BOOLEAN NULL,
                                                     TIME_ZONE_ID VARCHAR(80) NULL,
                                                     PRIMARY KEY (SCHED_NAME, TRIGGER_NAME, TRIGGER_GROUP),
                                                     FOREIGN KEY (SCHED_NAME, TRIGGER_NAME, TRIGGER_GROUP) REFERENCES QRTZ_TRIGGERS(SCHED_NAME, TRIGGER_NAME, TRIGGER_GROUP)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS QRTZ_BLOB_TRIGGERS (
                                                  SCHED_NAME VARCHAR(120) NOT NULL,
                                                  TRIGGER_NAME VARCHAR(200) NOT NULL,
                                                  TRIGGER_GROUP VARCHAR(200) NOT NULL,
                                                  BLOB_DATA BLOB NULL,
                                                  PRIMARY KEY (SCHED_NAME, TRIGGER_NAME, TRIGGER_GROUP),
                                                  INDEX IDX_QRTZ_BLOB_TRIGGERS (SCHED_NAME, TRIGGER_NAME, TRIGGER_GROUP),
                                                  FOREIGN KEY (SCHED_NAME, TRIGGER_NAME, TRIGGER_GROUP) REFERENCES QRTZ_TRIGGERS(SCHED_NAME, TRIGGER_NAME, TRIGGER_GROUP)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS QRTZ_CALENDARS (
                                              SCHED_NAME VARCHAR(120) NOT NULL,
                                              CALENDAR_NAME VARCHAR(200) NOT NULL,
                                              CALENDAR BLOB NOT NULL,
                                              PRIMARY KEY (SCHED_NAME, CALENDAR_NAME)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS QRTZ_PAUSED_TRIGGER_GRPS (
                                                        SCHED_NAME VARCHAR(120) NOT NULL,
                                                        TRIGGER_GROUP VARCHAR(200) NOT NULL,
                                                        PRIMARY KEY (SCHED_NAME, TRIGGER_GROUP)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS QRTZ_FIRED_TRIGGERS (
                                                   SCHED_NAME VARCHAR(120) NOT NULL,
                                                   ENTRY_ID VARCHAR(140) NOT NULL,
                                                   TRIGGER_NAME VARCHAR(200) NOT NULL,
                                                   TRIGGER_GROUP VARCHAR(200) NOT NULL,
                                                   INSTANCE_NAME VARCHAR(200) NOT NULL,
                                                   FIRED_TIME BIGINT(19) NOT NULL,
                                                   SCHED_TIME BIGINT(19) NOT NULL,
                                                   PRIORITY INTEGER NOT NULL,
                                                   STATE VARCHAR(16) NOT NULL,
                                                   JOB_NAME VARCHAR(200) NULL,
                                                   JOB_GROUP VARCHAR(200) NULL,
                                                   IS_NONCONCURRENT BOOLEAN NULL,
                                                   REQUESTS_RECOVERY BOOLEAN NULL,
                                                   PRIMARY KEY (SCHED_NAME, ENTRY_ID),
                                                   INDEX IDX_QRTZ_FT_TRIG_INST_NAME (SCHED_NAME, INSTANCE_NAME),
                                                   INDEX IDX_QRTZ_FT_INST_JOB_REQ_RCVRY (SCHED_NAME, INSTANCE_NAME, REQUESTS_RECOVERY),
                                                   INDEX IDX_QRTZ_FT_J_G (SCHED_NAME, JOB_NAME, JOB_GROUP),
                                                   INDEX IDX_QRTZ_FT_JG (SCHED_NAME, JOB_GROUP),
                                                   INDEX IDX_QRTZ_FT_T_G (SCHED_NAME, TRIGGER_NAME, TRIGGER_GROUP),
                                                   INDEX IDX_QRTZ_FT_TG (SCHED_NAME, TRIGGER_GROUP)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS QRTZ_SCHEDULER_STATE (
                                                    SCHED_NAME VARCHAR(120) NOT NULL,
                                                    INSTANCE_NAME VARCHAR(200) NOT NULL,
                                                    LAST_CHECKIN_TIME BIGINT(19) NOT NULL,
                                                    CHECKIN_INTERVAL BIGINT(19) NOT NULL,
                                                    PRIMARY KEY (SCHED_NAME, INSTANCE_NAME)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS QRTZ_LOCKS (
                                          SCHED_NAME VARCHAR(120) NOT NULL,
                                          LOCK_NAME VARCHAR(40) NOT NULL,
                                          PRIMARY KEY (SCHED_NAME, LOCK_NAME)
) ENGINE=InnoDB;
