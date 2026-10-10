export interface StudentDTO {
  id: string;
  name: string;
  email: string;
  grade: number;
  createdAt: string;
}

export interface RegisterStudentDTO {
  name: string;
  email: string;
  grade: number;
  password: string;
}

export interface LoginStudentDTO {
  email: string;
  password: string;
}

export interface AuthResponseDTO {
  student: StudentDTO;
  token: string;
}
