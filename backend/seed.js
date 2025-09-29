import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

import User from './src/routes/user/model.js'
import Project from './src/routes/project/model.js'
import Task from './src/routes/task/model.js'

dotenv.config();

const MONGO_URI = process.env.DB_URL ;

const seedData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("DB Connected");

    await User.deleteMany();
    await Project.deleteMany();
    await Task.deleteMany();
    const hashedPassword = await bcrypt.hash("Test@123", 10);
    const user = await User.create({
      email: "test@example.com",
      password: hashedPassword,
    });

    const projects = await Project.insertMany([
      {
        title: "Website Redesign",
        description: "Redesign the company website with new UI/UX",
        status: "active",
        createdBy: user._id,
      },
      {
        title: "Mobile App Launch",
        description: "Develop and launch the mobile application",
        status: "active",
        createdBy: user._id,
      },
    ]);

    for (let project of projects) {
      await Task.insertMany([
        {
          title: "Setup repo",
          status: "To Do",
          projectId: project._id,
        },
        {
          title: "Design UI",
          status: "In Progress",
          projectId: project._id,
        },
        {
          title: "Deploy to server",
          status: "Done",
          projectId: project._id,
        },
      ]);
    }

    console.log(" Database seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding data:", err.message);
    process.exit(1);
  }
};

seedData();
