CREATE DATABASE IF NOT EXISTS booking;

CREATE USER IF NOT EXISTS 'power'@'%' IDENTIFIED BY '1234';
SET PASSWORD FOR 'power'@'%' = PASSWORD('1234');
GRANT ALL PRIVILEGES ON booking.* TO 'power'@'%';

CREATE USER IF NOT EXISTS 'root'@'%' IDENTIFIED BY '12345';
SET PASSWORD FOR 'root'@'%' = PASSWORD('12345');
GRANT ALL ON *.* TO 'root'@'%' WITH GRANT OPTION;

-- CREATE USER IF NOT EXISTS myuser@'%' IDENTIFIED BY 'thisismyuserpassword';
-- SET PASSWORD FOR myuser@'%' = PASSWORD('thisismyuserpassword');
-- CREATE DATABASE IF NOT EXISTS mydatabasename;
-- GRANT ALL ON mydatabasename.* TO myuser@'%';
