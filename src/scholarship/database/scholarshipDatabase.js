import {executeQuery} from '../../../configuration/mysql.config.js';

class ScholarshipDatabase {
    
    async createScholarship (scholarshipData) {
        try {
            const query = `INSERT INTO scholarships  
            (id, 
            image, 
            scholarshipname, 
            deadline, 
            description,
            eligibility,
            duration,
            programsoffered,
            documentsrequired,
            benefits,
            applicationinformation,
            hostuniversity,
            agent,
            featured,
            scholarshiptype,
            programs,
            scholarshipcategory,
            country,
            author
            ) 
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
            const parameter = [
                scholarshipData.id,
                scholarshipData.image,
                scholarshipData.scholarshipname,
                scholarshipData.deadline,
                scholarshipData.description,
                scholarshipData.eligibility,
                scholarshipData.duration,
                scholarshipData.programsoffered,
                scholarshipData.documentsrequired,
                scholarshipData.benefits,
                scholarshipData.applicationinformation,
                scholarshipData.hostuniversity,
                scholarshipData.agent,
                scholarshipData.featured,
                scholarshipData.scholarshiptype,
                scholarshipData.programs,
                scholarshipData.scholarshipcategory,
                scholarshipData.country,
                scholarshipData.author,
            ]
            const scholarship = await executeQuery(query, parameter);
            return scholarship;
        } catch (error) {
            throw error;
        }
    }

    async countScholarship () {
        try {
            const query = `SELECT COUNT (id) FROM scholarships`;
            const scholarship = await executeQuery(query);
            return scholarship;
        } catch (error) {
            throw error;
        }
    }

    async readScholarship () {
        try {
            const query = `SELECT *,
            DATE_FORMAT(deadline, '%d/%m/%Y') AS deadline, 
            DATE_FORMAT(datecreated, '%d/%m/%Y') AS datecreated
            FROM scholarships`;
            const scholarship = await executeQuery(query);
            return scholarship;
        } catch (error) {
            throw error;
        }
    } 
    
    async readScholarshipByCountry (country) {
        try {
            const query = `SELECT *,
            DATE_FORMAT(deadline, '%d/%M/%Y') AS deadline, 
            DATE_FORMAT(datecreated, '%d/%m/%Y') AS datecreated
            FROM scholarships 
            WHERE country=? 
            LIMIT 8`
            const parameter = [country];
            const scholarship = await executeQuery(query, parameter);
            return scholarship;
        } catch (error) {
            throw error;
        }
    }

    async readFeaturedScholarship (value) {
        try {
            const query = `SELECT *, 
            DATE_FORMAT(datecreated, '%d/%m/%Y') AS datecreated 
            FROM scholarships 
            WHERE featured=? 
            LIMIT 8`;
            const parameter = [value];
            const scholarship = await executeQuery(query, parameter);
            return scholarship;
        } catch (error) {
            throw error;
        }
    }

    async readScholarshipByCategory (scholarshipcategory) {
        try {
            const query = `SELECT *,
            DATE_FORMAT(datecreated, '%d/%m/%Y') AS datecreated 
            FROM scholarships 
            WHERE scholarshipcategory=?`;
            const parameter = [scholarshipcategory];
            const scholarship = await executeQuery(query, parameter);
            return scholarship;
        } catch (error) {
            throw error;
        }
    }

    async readScholarshipByID (scholarshipID) {
        try {
            const query =  `SELECT *, 
            DATE_FORMAT(deadline, '%d/%m/%Y') AS deadline, 
            DATE_FORMAT(datecreated, '%d/%m/%Y') AS datecreated
            FROM scholarships 
            WHERE id=?`;
            const parameter = [scholarshipID];
            const scholarship = await executeQuery(query, parameter);
            return scholarship;
        } catch (error) {
            throw error;
        }
    }

    async searchScholarshipByCountry (country) {
        try {
            const query = `SELECT * 
            FROM scholarships 
            WHERE country LIKE?`;
            const parameter = [`%${country}%`];
            const scholarship = await executeQuery(query, parameter);
            return scholarship;
        } catch (error) {
            throw error;
        }
    }

    async editScholarship (scholarshipID) {
        try{
            const query = `SELECT *, 
            DATE_FORMAT(deadline, '%Y-%m-%d') AS deadline 
            FROM scholarships 
            WHERE id=?`;
            const parameter = [scholarshipID];
            const scholarship = await executeQuery(query, parameter);
            return scholarship;
        }catch(error){
            throw error;
        }
    }

    async updateScholarship (scholarshipData) {
        try {
            const query = `
            UPDATE scholarships 
            SET  
            image =?, 
            scholarshipname=?, 
            deadline=?, 
            description=?,
            eligibility=?,
            duration=?,
            programsoffered=?,
            documentsrequired=?,
            benefits=?,
            applicationinformation=?,
            hostuniversity=?,
            agent=?,
            featured=?,
            scholarshiptype=?,
            programs=?,
            scholarshipcategory=?,
            country=?
            WHERE id=?`;
            const parameter = [ 
                scholarshipData.image, 
                scholarshipData.scholarshipname, 
                scholarshipData.deadline, 
                scholarshipData.description,
                scholarshipData.eligibility,
                scholarshipData.duration,
                scholarshipData.programsoffered,
                scholarshipData.documentsrequired,
                scholarshipData.benefits,
                scholarshipData.applicationinformation,
                scholarshipData.hostuniversity,
                scholarshipData.agent,
                scholarshipData.featured,
                scholarshipData.scholarshiptype,
                scholarshipData.programs,
                scholarshipData.scholarshipcategory,
                scholarshipData.country,
                scholarshipData.id
            ];
            const scholarship = await executeQuery(query, parameter);
            return scholarship;
        } catch (error) {
            throw error;
        }
    }

    async deleteScholarship (scholarshipID) {
        try {
            const query = `DELETE FROM scholarships WHERE id=?`;
            const parameter = [scholarshipID];
            const scholarship = await executeQuery(query, parameter);
            return scholarship;
        } catch (error) {
            throw error;
        }
    }

}

export default ScholarshipDatabase;