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
  rememberMe?: boolean;
}

export interface AuthResponseDTO {
  student: StudentDTO;
  token: string;
  refreshToken?: string;
}

export interface RefreshTokenDTO {
  refreshToken: string;
}

export interface LogoutDTO {
  refreshToken?: string;
  allDevices?: boolean;
}
