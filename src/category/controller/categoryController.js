class CategoryController {
    
    constructor (service) {
        this.service = service;
    }

    async createCategory (req, res) {
        try {
            const { categoryname } = req.body;
            const author = req.username;
            console.log(author)
            await categoryname.trim();
            const category = await this.service.createCategoryService(categoryname);
            if (category.error) return res.status(409).json({message:category.error})
            return res.status(201).json({message:'Successfully Created', data : category});
        } catch (error) {
            console.error('controller {create category}:', error.message);
            return res.status(500).json({message:'Internal Server Error'});
        }
    }

    async countCategory (req, res) {
        try {
            const category = await this.service.countCategoryService();
            return res.status(201).json({data : category});
        } catch (error) {
            console.error('controller {count category}:', error.message);
            return res.status(500).json({message:'Internal Server Error'});
        }
    }

    async readAllCategory (req, res) {
        try {
            const category = await this.service.readAllCategoryService();
            return res.status(201).json({message:'Successfully Retrieved', data : category});
        } catch (error) {
            console.error('controller {read all category}:', error.message);
            return res.status(500).json({message:'Internal Server Error'});
        }
    }

    async editCategory (req, res) {
        try {
            const {id} = req.params;
            const category = await this.service.editCategoryService(id);
            return res.status(201).json({message : "Successfully Retrieved", data : category});
        } catch (error) {
            console.error('controller {edit category}:', error.message);
            return res.status(500).json({message:'Internal Server Error'});
        }
    }

    async updateCategory (req, res) {
        try {
            const {categoryname} = req.body;
            const {id} = req.params;
            const categoryDetails = {
                categoryname,
                id
            }
            const category = await this.service.updateCategoryService(categoryDetails);
            return res.status(201).json({message : "Successfully Updated", data : category});
        } catch (error) {
            console.error('controller {update category}:', error.message);
            return res.status(500).json({message:'Internal Server Error'});
        }
    }
    
    async deleteCategory (req, res) {
        try {
            const {id} = req.params;
            const category = await this.service.deleteCategoryService(id);
            return res.status(201).json({message:'Successfully Deleted', data : category});
        } catch (error) {
            console.error('controller {delete category}:', error.message);
            return res.status(500).json({message:'Internal Server Error'});
        }
    }
};

export default CategoryController;