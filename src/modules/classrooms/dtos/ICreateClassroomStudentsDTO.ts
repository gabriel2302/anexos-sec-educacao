type StudentDTO = {
  student_id: string;
};

export default interface ICreateClassroomStudentsDTO {
  classroom_id: string;
  // students: StudentDTO[];
  student_id: string;
}
