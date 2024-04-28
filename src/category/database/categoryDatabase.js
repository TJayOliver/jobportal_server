import {executeQuery} from '../../../configuration/mysql.config.js';

class CategoryDatabase {

    async createCategory (categoryDetails) {
        try {
            const query = `INSERT INTO category (id, categoryname) VALUES(?,?)`;
            const parameter = [
                categoryDetails.id, 
                categoryDetails.categoryname
            ];
            const category = await executeQuery(query, parameter);
            return category;
        } catch (error) {
            throw error;
        }
    }

    async countCategory () {
        try {
            const query = `SELECT COUNT(id) FROM category`;
            const category = await executeQuery(query);
            return category;
        } catch (error) {
            throw error
        }
    }

    async readAllCategory () {
        try {
            const query = `SELECT * FROM category`;
            const category = await executeQuery(query);
            return category;
        } catch (error) {
            throw error;
        }
    }

    async readCategoryByName (categoryname) {
        try {
            const query = `SELECT categoryname FROM category WHERE categoryname=?`;
            const parameter = [categoryname];
            const category = await executeQuery(query, parameter);
            return category;
        } catch (error) {
            throw error;
        }
    }

    async editCategory (id) {
        try {
            const query = `SELECT * FROM category WHERE id=?`;
            const parameter = [id];
            const category = await executeQuery(query, parameter);
            return category;
        } catch (error) {
            throw error
        }
    }

    async updateCategory (categoryDetails) {
        try {
            const query = `UPDATE category SET categoryname=? WHERE id=?`;
            const parameter = [
                categoryDetails.categoryname,
                categoryDetails.id
            ];
            const category = await executeQuery(query, parameter);
            return category;
        } catch (error) {
            throw error
        }
    }

    async deleteCategory (id) {
        try {
            const query = `DELETE FROM category WHERE id=?`;
            const parameter = [id];
            const category = await executeQuery(query, parameter);
            return category;
        } catch (error) {
            throw error;
        }
    }
}

export default CategoryDatabase;