type IStudent = {
  student_id: string;
};

export default interface ICreateClassroomDTO {
  institution_id: string;
  classroom_id: string;
  students: IStudent[];
}
