import axios from "axios";

export const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://84.247.136.103/shshub/api/v1';

export interface GuardianData {
  id?: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  occupation: string;
  phone: string;
  email?: string;
  relationship: string;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface StudentAdmissionData {
  id?: number;
  indexNumber?: string;
  enrolmentCode?: string;
  dateOfBirth?: string;
  placeOfBirth?: string;
  region?: string;
  district?: string;
  homeTown?: string;
  address?: string;
  religion?: string;
  dateOfEnrolment?: string;
  ghanaCardNo?: string;
  nhis?: string;
  jhsCompleted?: string;
  sports?: string;
  healthConditions?: string;
  school?: string;
  name: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  programId: number;
  accommodationId?: number;
  classId?: number;
  houseId?: number;
  track: 'ACADEMIC' | 'VOCATIONAL' | 'TECHNICAL';
  entryStatus: number;
  timestamp: string;
  ip: string;
  key: string;
  lastupdated: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  guardian: GuardianData;
  secondGuardian?: {
    firstName?: string;
    phone?: string;
  };
}

export const studentAPI = {
  // Fetch student data by index number
  async getStudentByIndex(indexNumber: string) {
    const response = await fetch(`${BASE_API_URL}/students/${indexNumber}`);
    if (!response.ok) {
      throw new Error('Failed to fetch student data');
    }
    return response.json();
  },

  // Submit admission form
  async submitAdmission(data: StudentAdmissionData) {
    const response = await fetch(`${BASE_API_URL}/admissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to submit admission');
    }

    return response.json();
  },

  // Fetch locations (regions, districts, towns)
  async getLocations() {
    const response = await fetch(`${BASE_API_URL}/locations`);
    if (!response.ok) {
      throw new Error('Failed to fetch locations');
    }
    return response.json();
  },

  // Fetch schools by town
  async getSchoolsByTown(town: string) {
    const response = await fetch(`${BASE_API_URL}/schools?town=${encodeURIComponent(town)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch schools');
    }
    return response.json();
  }
};