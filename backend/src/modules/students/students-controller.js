const asyncHandler = require("express-async-handler");
const {
  getAllStudents,
  addNewStudent,
  getStudentDetail,
  setStudentStatus,
  updateStudent,
  deleteStudent,
} = require("./students-service");

const handleGetAllStudents = asyncHandler(async (req, res) => {
  const students = await getAllStudents(req.query);
  res.status(200).json(students);
});

const handleAddStudent = asyncHandler(async (req, res) => {
  const result = await addNewStudent(req.body);
  res.status(201).json(result);
});

const handleUpdateStudent = asyncHandler(async (req, res) => {
  const payload = {
    ...req.body,
    id: req.params.id,
  };

  const result = await updateStudent(payload);
  res.status(200).json(result);
});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
  const student = await getStudentDetail(req.params.id);
  res.status(200).json(student);
});

const handleStudentStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, reviewerId } = req.body;

  const result = await setStudentStatus({
    userId: id,
    reviewerId: req.user?.id || reviewerId,
    status,
  });

  res.status(200).json(result);
});

const handleDeleteStudent = asyncHandler(async (req, res) => {
  const result = await deleteStudent(req.params.id);
  res.status(200).json(result);
});

module.exports = {
  handleGetAllStudents,
  handleGetStudentDetail,
  handleAddStudent,
  handleStudentStatus,
  handleUpdateStudent,
  handleDeleteStudent,
};