// const { Assignment } = require("../models/assignment");
const { Account, Assignment } = require("../models");

// Fetch only necessary fields from the database
exports.fetchAllAssignments = async () => {
  return await Assignment.findAll({
    attributes: [
      "id",
      "name",
      "points",
      "num_of_attempts",
      "deadline",
      "assignment_created",
      "assignment_updated",
    ],
  });
};

exports.createAssignment = async (assignmentData, creatorEmail) => {
  // console.log("createAssignmentservice");

  // Find the account using the creator email
  const account = await Account.findOne({ where: { email: creatorEmail } });

  // Check if account exists
  if (!account) {
    throw new Error("Account not found");
  }
  const newAssignment = await Assignment.create({
    name: assignmentData.name,
    num_of_attempts: assignmentData.num_of_attempts,
    deadline: assignmentData.deadline,
    points: assignmentData.points,
    creator_email: creatorEmail,
    creatorId: account.id, // Linking to the Account
  });
  // console.log(newAssignment);
  const {
    id,
    name,
    points,
    num_of_attempts,
    deadline,
    assignment_created,
    assignment_updated,
  } = newAssignment;
  return {
    id,
    name,
    points,
    num_of_attempts,
    deadline,
    assignment_created,
    assignment_updated,
  };
};

exports.fetchAssignmentById = async (id) => {
  // console.log("getbyidcservice");

  return await Assignment.findByPk(id);
};

exports.modifyAssignment = async (id, updateData) => {
  try {
    const assignment = await Assignment.findByPk(id);

    if (!assignment) {
      return null;
    }

    // Only update properties that are in updateData
    for (let key in updateData) {
      if (
        updateData.hasOwnProperty(key) &&
        assignment.dataValues.hasOwnProperty(key)
      ) {
        assignment[key] = updateData[key];
      }
    }

    await assignment.save();

    // Exclude sensitive or unnecessary data in the response
    const { creatorId, ...assignmentData } = assignment.dataValues;
    return assignmentData;
  } catch (error) {
    throw error;
  }
};

exports.removeAssignment = async (id, userEmail) => {
  const assignment = await Assignment.findByPk(id);
  const account = await Account.findOne({ where: { email: userEmail } });
  if (!assignment || account.email !== userEmail) {
    return false;
  }
  await assignment.destroy();
  return true;
};
