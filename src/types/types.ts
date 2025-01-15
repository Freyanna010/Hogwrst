import moment from "moment";
import { UploadFile } from "antd/es/upload/interface";

interface Wand {
  wood: string;
  core: string;
  length: number;
}

export interface Student {
  id: string;
  name: string;
  alternate_names: string[];
  species: string;
  gender: string;
  house: string;
  dateOfBirth: string;
  yearOfBirth: number;
  wizard: boolean;
  ancestry: string;
  eyeColour: string;
  hairColour: string;
  wand: Wand;
  patronus: string;
  hogwartsStudent: boolean;
  hogwartsStaff: boolean;
  actor: string;
  alternate_actors: string[];
  alive: boolean;
  image: string;
}
export interface FieldType {
  name: string;
  dateOfBirth: string;
  gender: string;
  house: string;
  patronus: string;
  fileList: UploadFile[];
}

export interface FormValues {
  name: string;
  dateOfBirth: moment.Moment;
  gender: string;
  house: string;
  patronus: string;
  fileList: UploadFile[];
}