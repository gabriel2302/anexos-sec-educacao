type IStudent = {
  student_id: string;
};

export default interface ICreateClassroomDTO {
  classroom_id: string;
  students: IStudent[];
}
