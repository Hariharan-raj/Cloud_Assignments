const assignmentService = require("../services/assignmentService");
const { Forbidden, EndpointnotFound } = require("../errors/applicationError");
const basicAuth = require("basic-auth");
const { Account, Assignment } = require("../models");

exports.getAllAssignments = async (req, res) => {
  try {
    const assignments = await assignmentService.fetchAllAssignments();

    // Map over the fetched assignments and retain only the desired properties
    const filteredAssignments = assignments.map((assignment) => ({
      id: assignment.id,
      name: assignment.name,
      points: assignment.points,
      num_of_attemps: assignment.num_of_attempts, // Note the typo "attemps"
      deadline: assignment.deadline,
      assignment_created: assignment.assignment_created,
      assignment_updated: assignment.assignment_updated,
    }));

    res.json(filteredAssignments);
  } catch (err) {
    // console.log(err);
    res.status(500).send("Internal server error");
  }
};

exports.createAssignment = async (req, res) => {
  try {
    // console.log("createAssignmentcontroller");
    // Validate points to be between 1 and 10
    if (req.body.points < 1 || req.body.points > 10) {
      return res.status(400).send("Assignment points must be between 1 and 10");
    }
    const user = basicAuth(req);
    // console.log(req.body);
    // console.log(user.name);

    const newAssignment = await assignmentService.createAssignment(
      req.body,
      user.name
    );
    res.status(201).json(newAssignment);
  } catch (err) {
    // console.log(err);
    if (err.message === "Account not found") {
      return res.status(404).send("Account not found");
    }
    res.status(500).send("Internal server error");
  }
};

exports.getAssignmentById = async (req, res) => {
  try {
    // console.log("getbyidcontroller");
    const assignment = await assignmentService.fetchAssignmentById(
      req.params.id
    );

    if (!assignment) {
      return res.status(404).send("Assignment not found");
    }

    const responseObj = {
      id: assignment.id,
      name: assignment.name,
      points: assignment.points,
      num_of_attempts: assignment.num_of_attempts,
      deadline: assignment.deadline,
      assignment_created: assignment.assignment_created,
      assignment_updated: assignment.assignment_updated,
    };

    res.json(responseObj);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

exports.deleteAssignment = async (req, res) => {
  try {
    const user = basicAuth(req);
    const result = await assignmentService.removeAssignment(
      req.params.id,
      user.name
    );
    if (!result) {
      return next(new Forbidden());
      //return res.status(403).send("Forbidden"); // or 404 depending on the service's response.
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).send("Internal server error");
  }
};

exports.updateAssignment = async (req, res) => {
  try {
    const user = basicAuth(req);

    // Fetch assignment and account info
    const assignment = await assignmentService.fetchAssignmentById(
      req.params.id
    );
    const account = await Account.findOne({ where: { email: user.name } });

    // Check existence and authorization
    if (!assignment) {
      return res.status(404).send("Assignment not found");
    }
    if (!account || assignment.creatorId !== account.id) {
      return res.status(403).send("Only the creator can update the assignment");
    }

    // Update assignment and return updated data
    const updatedAssignment = await assignmentService.modifyAssignment(
      req.params.id,
      req.body
    );

    const responseObj = {
      id: updatedAssignment.id,
      name: updatedAssignment.name,
      points: updatedAssignment.points,
      num_of_attempts: updatedAssignment.num_of_attempts,
      deadline: updatedAssignment.deadline,
      assignment_created: updatedAssignment.assignment_created,
      assignment_updated: updatedAssignment.assignment_updated,
    };
    res.json(responseObj);
  } catch (err) {
    res.status(500).send("Internal server error");
  }
};
