class TestimonialController {

    constructor(service) {
        this.service = service;
    }

    async createTestimonial(req, res) {
        const { name, quote, position, author } = req.body;
        const image = req.file.filename;
        const details = {
            name,
            image,
            image,
            quote,
            position,
            author
        };
        try {
            const testimonial = await this.service.createTestimonialService(details);
            return res.status(201).json({ message: 'Successfully Created', data: testimonial });
        } catch (error) {
            console.error('create testimonial {controller}', error.message);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async readTestimonial(req, res) {
        try {
            const testimonial = await this.service.readTestimonialService();
            return res.status(201).json({ message: 'Successfully Created', data: testimonial });
        } catch (error) {
            console.error('read testimonial {controller}', error.message);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async editTestimonial(req, res) {
        const { id } = req.params;
        try {
            const testimonial = await this.service.editTestimonialService(id);
            return res.status(201).json({ message: 'Successfully Retrieved', data: testimonial });
        } catch (error) {
            console.error('edit testimonial {controller}', error.message);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async updateTestimonial(req, res) {
        const { id } = req.params;
        const { name, quote, position } = req.body;
        const image = req.file.filename;
        const details = {
            id,
            name,
            image,
            image,
            quote,
            position
        }
        try {
            const testimonial = await this.service.updateTestimonialService(details);
            return res.status(201).json({ message: 'Successfully Updated', data: testimonial });
        } catch (error) {
            console.error('update testimonial {controller}', error.message);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async deleteTestimonial(req, res) {
        const { id } = req.params;
        try {
            const testimonial = await this.service.deleteTestimonialService(id);
            return res.status(201).json({ message: 'Successfully Deleted', data: testimonial });
        } catch (error) {
            console.error('delete testimonial {controller}', error.message);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

export default TestimonialController;