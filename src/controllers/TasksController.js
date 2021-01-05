const Task = require('../models/Task');

module.exports = {

    async create(req, res) {

        const { taskName } = req.body;

        try {
    
            const task = await Task.create({ taskName });
    
            return res.json(task);
        
        } catch (error) {
            return res.status(500).json(error)
        }
    },

    async index(req, res) {
        try {
            const tasks = await Task.findAll();

            return res.status(200).json(tasks)

        } catch(error) {
            return res.status(500).json(error)
        }
    },

    async update(req, res) {

        const { taskId } = req.params;
        const { taskName } = req.body;

        try {

            const task = await Task.findByPk(taskId);

            if (!task) {
                return res.status(404).json({error: "Task not found!"})
            }

            task.taskName = taskName;

            task.save();

            return res.status(200).json(task)

        } catch(error) {
            return res.status(500).json(error)
        }
    },

    async delete(req, res) {
        
        const { taskId } = req.params;

        try {

            const task = await Task.findByPk(taskId);

            if (!task) {
                return res.status(404).json({error: "Task not found!"})
            }

            task.destroy();

            return res.json({message: "Task successfull deleted!"});

        } catch(error) {
            return res.status(500).json(error);
        }
    },

    async finishTask(req, res) {

        const { taskId } = req.params;
        const { complete } = req.body;

        try {

            const task = await Task.findByPk(taskId);

            if (!task) {
                return res.status(404).json({error: "Task not found!"})
            }

            task.complete = complete;

            task.save();

            return res.status(200).json(task)

        } catch(error) {
            return res.status(500).json(error);
        }

    }
}