import mongoose from "mongoose";
import dotenv from "dotenv";
import DBConnection from './DBConnection.js'
import ExperienceModel from "./models/ExperienceModel.js";

dotenv.config();
DBConnection();

const seedData = async () => {
  try {
    await ExperienceModel.deleteMany(); 

    const experiences = [
      {
        title: "Scuba Diving in Goa",
        description:
          "Experience the underwater world of Goa with professional instructors and vibrant marine life.",
        image:
          "https://images.unsplash.com/photo-1586508577428-120d6b072945?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2N1YmElMjBkaXZpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500",
        price: 2000,
        slots: [
          { date: "2025-10-13", time: "7:00 AM", available: true },
          { date: "2025-10-14", time: "9:00 PM", available: true },
          { date: "2025-10-15", time: "11:00 AM", available: true },
          { date: "2025-10-16", time: "1:00 AM", available: true },
          { date: "2025-10-17", time: "2:00 AM", available: true },
        ],
      },
      {
        title: "Paragliding in Bir Billing",
        description:
          "Soar above the Himalayas with certified pilots in India’s most popular paragliding destination.",
        image:
          "https://images.unsplash.com/photo-1471247511763-88a722fc9919?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGFyYWdsaWRpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500",
        price: 3500,
        slots: [
          { date: "2025-10-18", time: "7:00 AM", available: true },
          { date: "2025-10-19", time: "9:00 PM", available: true },
          { date: "2025-10-20", time: "11:00 AM", available: true },
          { date: "2025-10-21", time: "1:00 AM", available: true },
          { date: "2025-10-22", time: "2:00 AM", available: true },
        ],
      },
      {
        title: "Desert Safari in Jaisalmer",
        description:
          "Enjoy a thrilling jeep safari through golden dunes followed by a traditional Rajasthani dinner.",
        image:
          "https://images.unsplash.com/photo-1624062999726-083e5268525d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVzZXJ0JTIwc2FmYXJpfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",
        price: 2500,
        slots: [
         { date: "2025-10-23", time: "7:00 AM", available: true },
          { date: "2025-10-24", time: "9:00 PM", available: true },
          { date: "2025-10-25", time: "11:00 AM", available: true },
          { date: "2025-10-26", time: "1:00 AM", available: true },
          { date: "2025-10-27", time: "2:00 AM", available: true },
        ],
      },
      {
  title: "River Rafting in Rishikesh",
  description:
    "Conquer the rapids of the Ganges River with experienced guides in India’s adventure capital.",
  image:
    "https://images.unsplash.com/photo-1629248457649-b082812aea6c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cml2ZXIlMjByYWZ0aW5nfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",
  price: 1800,
  slots: [
    { date: "2025-11-02", time: "6:00 AM", available: true },
    { date: "2025-11-03", time: "10:00 AM", available: true },
    { date: "2025-11-04", time: "2:00 PM", available: true },
    { date: "2025-11-05", time: "5:00 PM", available: true },
    { date: "2025-11-06", time: "7:00 AM", available: true },
  ],
},
{
  title: "Hot Air Balloon Ride in Jaipur",
  description:
    "Witness breathtaking views of Jaipur’s forts and palaces from the skies in a serene balloon ride.",
  image:
    "https://images.unsplash.com/photo-1497531551184-06b252e1bee1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90JTIwYWlyJTIwYmFsbG9vbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",
  price: 4500,
  slots: [
    { date: "2025-11-10", time: "5:30 AM", available: true },
    { date: "2025-11-11", time: "6:00 AM", available: true },
    { date: "2025-11-12", time: "7:30 AM", available: true },
    { date: "2025-11-13", time: "8:00 AM", available: true },
    { date: "2025-11-14", time: "9:00 AM", available: true },
  ],
},
{
  title: "Trekking in Manali",
  description:
    "Embark on a scenic mountain trek through pine forests, snow-capped peaks, and hidden waterfalls.",
  image:
    "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dHJla2tpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500",
  price: 3000,
  slots: [
    { date: "2025-11-20", time: "6:00 AM", available: true },
    { date: "2025-11-21", time: "7:30 AM", available: true },
    { date: "2025-11-22", time: "9:00 AM", available: true },
    { date: "2025-11-23", time: "10:00 AM", available: true },
    { date: "2025-11-24", time: "12:00 PM", available: true },
  ],
},

    ];

    await ExperienceModel.insertMany(experiences);
    console.log("Sample experiences added!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();
