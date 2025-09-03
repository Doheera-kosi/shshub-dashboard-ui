import StudentAdmissionForm from "@/components/forms/StudentAdmissionForm";

const AdmissionsPage = () => {
  return (
    <div className="p-4">
      {/* <h1 className="text-2xl font-bold mb-6">New Student Admissions</h1> */}
      <StudentAdmissionForm />
    </div>
  );
};

export default AdmissionsPage;

// import { redirect } from 'next/navigation';

// export default function AdmissionsPage() {
//   redirect('/list/students/admission');
// }