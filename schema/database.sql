CREATE TABLE `administrator`(
    `id` INT NOT NULL,
    `username` VARCHAR(50) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `password` VARCHAR(80) NOT NULL,
    `image` VARCHAR(50) NOT NULL,
    `twitter` VARCHAR(80) NOT NULL,
    `facebook` VARCHAR(80) NOT NULL,
    `linkedin` VARCHAR(80) NOT NULL,
    `role` ENUM('super','normal') NOT NULL,
    `datecreated` DATE DEFAULT CURRENT_DATE NOT NULL,
    PRIMARY KEY(`id`)
);

CREATE TABLE `scholarships`(
    `id` VARCHAR(80) NOT NULL,
    `image` VARCHAR(50) NOT NULL,
    `scholarshipname` VARCHAR(80) NOT NULL,
    `deadline` DATE NOT NULL,
    `description` LONGTEXT NOT NULL,
    `eligibility` LONGTEXT NOT NULL,
    `duration` LONGTEXT NOT NULL,
    `programsoffered` LONGTEXT NOT NULL,
    `documentsrequired` LONGTEXT NOT NULL,
    `benefits` LONGTEXT NOT NULL,
    `applicationinformation` LONGTEXT NOT NULL,
    `hostuniversity` VARCHAR(80) NOT NULL,
    `agent` ENUM('Agent', 'No Agent') NOT NULL,
    `featured` ENUM('true', 'false') NOT NULL,
    `scholarshiptype` ENUM('Fully Funded', 'Partially Funded') NOT NULL,
    `programs` ENUM('All Levels','Bachelors Degree', 'Masters Degree', 'Doctorate Degree', 'Post Graduate Diploma') NOT NULL,
    `scholarshipcategory` ENUM('Government', 'Private', 'Organizational', 'International', 'Research') NOT NULL,
    `country` ENUM("Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua & Deps", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Central African Rep", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Congo {Democratic Rep}", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland {Republic}", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea North", "Korea South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar, {Burma}", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russian Federation", "Rwanda", "St Kitts & Nevis", "St Lucia", "Saint Vincent & the Grenadines", "Samoa", "San Marino", "Sao Tome & Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad & Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe") NOT NULL, 
    `author` VARCHAR(20) NOT NULL,
    `datecreated` DATE DEFAULT CURRENT_DATE NOT NULL,
    PRIMARY KEY(`id`)
);

CREATE TABLE `articles`(
    `id` VARCHAR(80) NOT NULL,
    `image` VARCHAR(50) NOT NULL,
    `title` VARCHAR(300) NOT NULL,
    `author` VARCHAR(80) NOT NULL,
    `post` LONGTEXT NOT NULL,
    `featured` ENUM('true', 'false') NOT NULL,
    `mainfeatured` ENUM ('true', 'false') NOT NULL,
    `category` ENUM('Job', 'Scholarship'),
    `datecreated` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY(`id`)
);

CREATE TABLE `jobs`(
    `id` VARCHAR(80) NOT NULL,
    `overview` VARCHAR(80) NOT NULL,
    `image` VARCHAR(50) NOT NULL,
    `salary` VARCHAR(80) NOT NULL,
    `featured` ENUM('true', 'false') NOT NULL,
    `company` VARCHAR(300) NOT NULL,
    `website` VARCHAR(300) NOT NULL,
    `duration` ENUM('Full Time', 'Part Time') NOT NULL,
    `position` VARCHAR(100) NOT NULL,
    `location` VARCHAR(80) NOT NULL,
    `responsibility` LONGTEXT NOT NULL,
    `requirements` LONGTEXT NOT NULL,
    `qulification` LONGTEXT NOT NULL,
    `datecreated` DATE DEFAULT CURRENT_DATE NOT NULL,
    `author` VARCHAR(80) NOT NULL,
    `jobcategory` VARCHAR(200),
    PRIMARY KEY(`id`)
);

CREATE TABLE `category`(
    `id` VARCHAR(80) NOT NULL,
    `categoryname` VARCHAR(100) NOT NULL,
    PRIMARY KEY(`id`)
);

CREATE TABLE `subscribers`(
    `id` VARCHAR(80) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    PRIMARY KEY(`id`)
);

CREATE TABLE `mailmessages`(
    `id` VARCHAR(80) NOT NULL,
    `receiver` VARCHAR(180) NOT NULL,
    `subject` VARCHAR(500) NOT NULL,
    `message` LONGTEXT NOT NULL,
    `messageId` VARCHAR(100) NOT NULL,
    PRIMARY KEY(`id`)
);

CREATE TABLE `userLocation`(
    `id` VARCHAR(80) NOT NULL,
    `ipAddress` VARCHAR(200) NOT NULL,
    `country` VARCHAR(100) NOT NULL,
    `city` VARCHAR(500) NOT NULL,
    `datecreated` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (`id`) 
);

