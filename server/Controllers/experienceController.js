import ExperienceModel from "../Models/ExperienceModel.js";

 const getExperiences = async (req, res) => {
  const experiences = await ExperienceModel.find();
  res.json(experiences);
};

 const getExperienceById = async (req, res) => {
  const exp = await ExperienceModel.findById(req.params.id);
  res.json(exp);
};

export{getExperienceById,getExperiences}