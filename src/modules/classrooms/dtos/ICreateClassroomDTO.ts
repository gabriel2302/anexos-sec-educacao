type IPerson = {
  person_id: string;
};

export default interface ICreateClassroomDTO {
  name: string;
  shift: string;
  year: string;
  institution_id: string;
  people: IPerson[];
}
