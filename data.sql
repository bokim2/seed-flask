

-- NOTES FROM BEFORE

CREATE TABLE flasks (
id BIGSERIAL NOT NULL,
inoculum_uL REAL, 
media_mL REAL, 
start_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY(id),
cell_bank INT NOT NULL,
FOREIGN KEY (cell_bank) REFERENCES cell_banks(cell_bank)
);


CREATE TABLE cell_banks (
    cell_bank BIGSERIAL NOT NULL,
    strain VARCHAR(50),
    notes TEXT,
    PRIMARY KEY(cell_bank)
);



CREATE TABLE samples (
sample_id BIGSERIAL NOT NULL,
end_date timestamp,
od600 REAL,
completed BOOLEAN,
time_since_inoc REAL,
flask_id INT NOT NULL,
PRIMARY KEY(sample_id),
FOREIGN KEY (flask_id) REFERENCES flasks(id)
);


INSERT INTO cell_banks (cell_bank, strain, notes) values (3, 'CD-5024', 'target od 1-3');
INSERT INTO cell_banks (cell_bank, strain, notes) values (1, 'CD-0014', 'target od 1-3'); 
-- notes for myself:  
-- - gave up on trying to duplicate start_time column in samples table
-- - now time_since_inoc has to be calculated by hand, it will not do it on its own.  

-- - all of these 3 tables are in elephantsql now.  under BK account, flasks environment

-- - change react part to work by one table each
-- - need to change api calls



-- ///////////////////////
-- drafts below

-- CREATE TABLE samples (
-- sample_id BIGSERIAL NOT NULL,
-- start_date TIMESTAMP NOT NULL,
-- end_date timestamp,
-- od600 REAL,
-- completed BOOLEAN,
-- time_since_inoc INTERVAL 
-- GENERATED ALWAYS AS ("end_date"-"start_date") STORED,
-- flask_id INT NOT NULL,
-- PRIMARY KEY(sample_id),
-- FOREIGN KEY (flask_id) REFERENCES flasks(id),
-- FOREIGN KEY (start_date) REFERENCES flasks(start_date) where flask_id = flasks(id)
-- );

-- CREATE TABLE public.samples (
-- "sample_id" BIGSERIAL NOT NULL PRIMARY KEY,
-- "start_date" FOREIGN KEY ("start_date") REFERENCES public.flasks("start_date"),
-- "end_date" timestamp,
-- "od600" REAL,
-- "completed" BOOLEAN,
-- "time_since_inoc" INTERVAL 
-- GENERATED ALWAYS AS ("end_date"-"start_date") STORED
-- FOREIGN KEY (flask_id) REFERENCES flasks(id)
-- );