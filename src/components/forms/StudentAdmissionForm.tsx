"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ghanaLocationData, schoolsData } from '@/lib/ghanaData';
import { useRouter } from 'next/navigation';

// Complete schema with all fields
const studentFormSchema = z.object({
  // Section 1: Student Bio
  indexNumber: z.string().min(1, "Index Number is required"),
  enrolmentCode: z.string().min(1, "Enrolment Code is required"),
  fullName: z.string().min(1, "Full Name is required"),
  gender: z.string().min(1, "Gender is required"),
  dateOfBirth: z.string().min(1, "Date of Birth is required"),
  placeOfBirth: z.string().min(1, "Place of Birth is required"),
  region: z.string().min(1, "Region is required"),
  district: z.string().min(1, "District is required"),
  homeTown: z.string().min(1, "Home Town is required"),
  address: z.string().optional(),
  religion: z.string().min(1, "Religion is required"),
  program: z.string().min(1, "Program is required"),
  track: z.string().min(1, "Track is required"),
  status: z.enum(["Day", "Boarding"], { // CHANGED TO ENUM
    required_error: "Please select Day or Boarding status",
  }),
  dateOfEnrolment: z.string().min(1, "Date of Enrolment is required"),
  ghanaCardNo: z.string().optional(),
  nhis: z.string().optional(),
  jhsCompleted: z.string().min(1, "JHS Completed is required"),
  sports: z.string().optional(),
  healthConditions: z.enum(["Yes", "No"], {
    required_error: "Please select an option",
  }),
  school: z.string().min(1, "School is required"),
  
  // Section 2: Guardian Info
  guardian: z.object({
    firstName: z.string().min(1, "First Name is required"),
    middleName: z.string().optional(),
    lastName: z.string().min(1, "Last Name is required"),
    gender: z.string().min(1, "Gender is required"),
    occupation: z.string().min(1, "Occupation is required"),
    phone: z.string().min(1, "Phone is required").regex(/^\+?[0-9]{10,15}$/, "Invalid phone number"),
    email: z.string().email("Invalid email address").optional().or(z.literal("")),
  }),
  
  hasSecondGuardian: z.enum(["Yes", "No"]).optional(),
  
  secondGuardian: z.object({
    firstName: z.string().optional(),
    middleName: z.string().optional(),
    lastName: z.string().optional(),
    gender: z.string().optional(),
    occupation: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email("Invalid email address").optional().or(z.literal("")),
  }).optional(),
  
  // Certification
  certified: z.boolean().refine(val => val === true, {
    message: "You must certify that the information is true and accurate",
  }),
});

type StudentFormData = z.infer<typeof studentFormSchema>;

// Mock API call function
const fetchStudentData = async (indexNumber: string) => {
  return new Promise<Partial<StudentFormData>>((resolve) => {
    setTimeout(() => {
      resolve({
        fullName: "Pascal Mark",
        gender: "Male",
        program: "General Science",
        track: "Science",
        status: "Day",
        dateOfEnrolment: "2023-09-01",
      });
    }, 500);
  });
};

const StudentAdmissionForm = () => {
  const [currentSection, setCurrentSection] = useState(1);
  const [districts, setDistricts] = useState<string[]>([]);
  const [towns, setTowns] = useState<string[]>([]);
  const [schools, setSchools] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
      hasSecondGuardian: "No",
      healthConditions: "No",
    },
  });

  const watchedIndexNumber = watch("indexNumber");
  const watchedRegion = watch("region");
  const watchedDistrict = watch("district");
  const watchedHomeTown = watch("homeTown");
  const hasSecondGuardian = watch("hasSecondGuardian");
  const healthConditions = watch("healthConditions");

  // Effect to fetch student data when index number changes
  useEffect(() => {
    const fetchData = async () => {
      if (watchedIndexNumber && watchedIndexNumber.length > 5) {
        setIsLoading(true);
        try {
          const data = await fetchStudentData(watchedIndexNumber);
          
          // Set values from API
          if (data.fullName) setValue("fullName", data.fullName);
          if (data.gender) setValue("gender", data.gender);
          if (data.program) setValue("program", data.program);
          if (data.track) setValue("track", data.track);
          if (data.status) setValue("status", data.status);
          if (data.dateOfEnrolment) setValue("dateOfEnrolment", data.dateOfEnrolment);
          
          clearErrors(["fullName", "gender", "program", "track", "status", "dateOfEnrolment"]);
        } catch (error) {
          setError("indexNumber", { 
            type: "manual", 
            message: "Failed to fetch student data. Please check the index number." 
          });
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [watchedIndexNumber, setValue, setError, clearErrors]);

  // Effect to update districts when region changes
  useEffect(() => {
    if (watchedRegion) {
      const region = ghanaLocationData.regions.find(r => r.name === watchedRegion);
      if (region) {
        const districtNames = region.districts.map(d => d.name);
        setDistricts(districtNames);
        setValue("district", "");
        setValue("homeTown", "");
        setValue("school", "");
        setTowns([]);
        setSchools([]);
      }
    } else {
      setDistricts([]);
      setValue("district", "");
      setValue("homeTown", "");
      setValue("school", "");
      setTowns([]);
      setSchools([]);
    }
  }, [watchedRegion, setValue]);

  // Effect to update towns when district changes
  useEffect(() => {
    if (watchedRegion && watchedDistrict) {
      const region = ghanaLocationData.regions.find(r => r.name === watchedRegion);
      if (region) {
        const district = region.districts.find(d => d.name === watchedDistrict);
        if (district) {
          setTowns(district.towns);
          setValue("homeTown", "");
          setValue("school", "");
          setSchools([]);
        }
      }
    } else {
      setTowns([]);
      setValue("homeTown", "");
      setValue("school", "");
      setSchools([]);
    }
  }, [watchedDistrict, watchedRegion, setValue]);

  // Effect to update schools when home town changes
  useEffect(() => {
    if (watchedHomeTown) {
      // Use mock schools data or fallback to generic names
      const mockSchools = schoolsData[watchedHomeTown] || [
        `${watchedHomeTown} Senior High School`,
        `${watchedHomeTown} Technical School`,
        `${watchedHomeTown} Grammar School`,
        `${watchedHomeTown} Academy`,
        `${watchedHomeTown} College`
      ];
      setSchools(mockSchools);
      setValue("school", "");
    } else {
      setSchools([]);
      setValue("school", "");
    }
  }, [watchedHomeTown, setValue]);

  const onSubmit = async (data: StudentFormData) => {
    console.log("Form submitted:", data);
    router.push('/stud-dashboard');
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert("Admission form submitted successfully!");
  };

  const nextSection = () => {
    setCurrentSection(prev => prev + 1);
    window.scrollTo(0, 0);
  };

  const prevSection = () => {
    setCurrentSection(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  // Render Section 1: Student Bio
  const renderSection1 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Student Bio Data</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Index Number */}
        <div className="form-group">
          <label htmlFor="indexNumber" className="block text-sm font-medium mb-1">
            Index Number *
          </label>
          <input
            id="indexNumber"
            type="text"
            className={`w-full p-2 border rounded-md ${errors.indexNumber ? 'border-red-500' : 'border-gray-300'}`}
            {...register("indexNumber")}
          />
          {errors.indexNumber && (
            <p className="text-red-500 text-xs mt-1">{errors.indexNumber.message}</p>
          )}
        </div>

        {/* Enrolment Code */}
        <div className="form-group">
          <label htmlFor="enrolmentCode" className="block text-sm font-medium mb-1">
            Enrolment Code *
          </label>
          <input
            id="enrolmentCode"
            type="text"
            className={`w-full p-2 border rounded-md ${errors.enrolmentCode ? 'border-red-500' : 'border-gray-300'}`}
            {...register("enrolmentCode")}
          />
          {errors.enrolmentCode && (
            <p className="text-red-500 text-xs mt-1">{errors.enrolmentCode.message}</p>
          )}
        </div>

        {/* Full Name */}
        <div className="form-group">
          <label htmlFor="fullName" className="block text-sm font-medium mb-1">
            Full Name *
          </label>
          <input
            id="fullName"
            type="text"
            className={`w-full p-2 border rounded-md ${errors.fullName ? 'border-red-500' : 'border-gray-300'} bg-gray-100`}
            {...register("fullName")}
            disabled
          />
          {errors.fullName && (
            <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>
          )}
        </div>

        {/* Gender */}
        <div className="form-group">
          <label htmlFor="gender" className="block text-sm font-medium mb-1">
            Gender *
          </label>
          <input
            id="gender"
            type="text"
            className={`w-full p-2 border rounded-md ${errors.gender ? 'border-red-500' : 'border-gray-300'} bg-gray-100`}
            {...register("gender")}
            disabled
          />
          {errors.gender && (
            <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>
          )}
        </div>

        {/* Date of Birth */}
        <div className="form-group">
          <label htmlFor="dateOfBirth" className="block text-sm font-medium mb-1">
            Date of Birth *
          </label>
          <input
            id="dateOfBirth"
            type="date"
            className={`w-full p-2 border rounded-md ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'}`}
            {...register("dateOfBirth")}
          />
          {errors.dateOfBirth && (
            <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth.message}</p>
          )}
        </div>

        {/* Place of Birth */}
        <div className="form-group">
          <label htmlFor="placeOfBirth" className="block text-sm font-medium mb-1">
            Place of Birth *
          </label>
          <input
            id="placeOfBirth"
            type="text"
            className={`w-full p-2 border rounded-md ${errors.placeOfBirth ? 'border-red-500' : 'border-gray-300'}`}
            {...register("placeOfBirth")}
          />
          {errors.placeOfBirth && (
            <p className="text-red-500 text-xs mt-1">{errors.placeOfBirth.message}</p>
          )}
        </div>

        {/* Region Field - FIXED */}
        <div className="form-group">
          <label htmlFor="region" className="block text-sm font-medium mb-1">
            Region *
          </label>
          <select
            id="region"
            className={`w-full p-2 border rounded-md ${errors.region ? 'border-red-500' : 'border-gray-300'}`}
            {...register("region")}
          >
            <option value="">Select Region</option>
            {ghanaLocationData.regions.map(region => (
              <option key={region.name} value={region.name}>{region.name}</option>
            ))}
          </select>
          {errors.region && (
            <p className="text-red-500 text-xs mt-1">{errors.region.message}</p>
          )}
        </div>

        {/* District Field - FIXED */}
        <div className="form-group">
          <label htmlFor="district" className="block text-sm font-medium mb-1">
            District *
          </label>
          <select
            id="district"
            className={`w-full p-2 border rounded-md ${errors.district ? 'border-red-500' : 'border-gray-300'}`}
            {...register("district")}
          >
            <option value="">Select District</option>
            {districts.map(district => (
              <option key={district} value={district}>{district}</option>
            ))}
          </select>
          {errors.district && (
            <p className="text-red-500 text-xs mt-1">{errors.district.message}</p>
          )}
          {districts.length === 0 && watchedRegion && (
            <p className="text-gray-500 text-xs mt-1">No districts available for this region</p>
          )}
          {!watchedRegion && (
            <p className="text-gray-500 text-xs mt-1">Please select a region first</p>
          )}
        </div>

        {/* Home Town Field - FIXED */}
        <div className="form-group">
          <label htmlFor="homeTown" className="block text-sm font-medium mb-1">
            Home Town *
          </label>
          <select
            id="homeTown"
            className={`w-full p-2 border rounded-md ${errors.homeTown ? 'border-red-500' : 'border-gray-300'}`}
            {...register("homeTown")}
          >
            <option value="">Select Home Town</option>
            {towns.map(town => (
              <option key={town} value={town}>{town}</option>
            ))}
          </select>
          {errors.homeTown && (
            <p className="text-red-500 text-xs mt-1">{errors.homeTown.message}</p>
          )}
          {towns.length === 0 && watchedDistrict && (
            <p className="text-gray-500 text-xs mt-1">No towns available for this district</p>
          )}
          {!watchedDistrict && (
            <p className="text-gray-500 text-xs mt-1">Please select a district first</p>
          )}
        </div>

        {/* School Field - FIXED */}
        <div className="form-group">
          <label htmlFor="school" className="block text-sm font-medium mb-1">
            JHS Completed *
          </label>
          <select
            id="school"
            className={`w-full p-2 border rounded-md ${errors.school ? 'border-red-500' : 'border-gray-300'}`}
            {...register("school")}
          >
            <option value="">Select School</option>
            {schools.map(school => (
              <option key={school} value={school}>{school}</option>
            ))}
          </select>
          {errors.school && (
            <p className="text-red-500 text-xs mt-1">{errors.school.message}</p>
          )}
          {schools.length === 0 && watchedHomeTown && (
            <p className="text-gray-500 text-xs mt-1">No schools available for this town</p>
          )}
          {!watchedHomeTown && (
            <p className="text-gray-500 text-xs mt-1">Please select a home town first</p>
          )}
        </div>

        {/* Address */}
        <div className="form-group">
          <label htmlFor="address" className="block text-sm font-medium mb-1">
            Address
          </label>
          <textarea
            id="address"
            className="w-full p-2 border border-gray-300 rounded-md"
            rows={3}
            {...register("address")}
          />
        </div>

        {/* Religion */}
        <div className="form-group">
          <label htmlFor="religion" className="block text-sm font-medium mb-1">
            Faith/Religion *
          </label>
          <select
            id="religion"
            className={`w-full p-2 border rounded-md ${errors.religion ? 'border-red-500' : 'border-gray-300'}`}
            {...register("religion")}
          >
            <option value="">Select Religion</option>
            <option value="Christianity">Christianity</option>
            <option value="Islam">Islam</option>
            <option value="Traditional">Traditional</option>
            <option value="Other">Other</option>
            <option value="None">None</option>
          </select>
          {errors.religion && (
            <p className="text-red-500 text-xs mt-1">{errors.religion.message}</p>
          )}
        </div>

        {/* Program */}
        <div className="form-group">
          <label htmlFor="program" className="block text-sm font-medium mb-1">
            Program *
          </label>
          <input
            id="program"
            type="text"
            className={`w-full p-2 border rounded-md ${errors.program ? 'border-red-500' : 'border-gray-300'} bg-gray-100`}
            {...register("program")}
            disabled
          />
          {errors.program && (
            <p className="text-red-500 text-xs mt-1">{errors.program.message}</p>
          )}
        </div>

        {/* Track */}
        <div className="form-group">
          <label htmlFor="track" className="block text-sm font-medium mb-1">
            Track *
          </label>
          <input
            id="track"
            type="text"
            className={`w-full p-2 border rounded-md ${errors.track ? 'border-red-500' : 'border-gray-300'} bg-gray-100`}
            {...register("track")}
            disabled
          />
          {errors.track && (
            <p className="text-red-500 text-xs mt-1">{errors.track.message}</p>
          )}
        </div>

        {/* Status */}
        <div className="form-group">
          <label htmlFor="status" className="block text-sm font-medium mb-1">
            Status *
          </label>
          <input
            id="status"
            type="text"
            className={`w-full p-2 border rounded-md ${errors.status ? 'border-red-500' : 'border-gray-300'} bg-gray-100`}
            {...register("status")}
            disabled
          />
          {errors.status && (
            <p className="text-red-500 text-xs mt-1">{errors.status.message}</p>
          )}
        </div>

        {/* Date of Enrolment */}
        <div className="form-group">
          <label htmlFor="dateOfEnrolment" className="block text-sm font-medium mb-1">
            Date of Enrolment *
          </label>
          <input
            id="dateOfEnrolment"
            type="text"
            className={`w-full p-2 border rounded-md ${errors.dateOfEnrolment ? 'border-red-500' : 'border-gray-300'} bg-gray-100`}
            {...register("dateOfEnrolment")}
            disabled
          />
          {errors.dateOfEnrolment && (
            <p className="text-red-500 text-xs mt-1">{errors.dateOfEnrolment.message}</p>
          )}
        </div>

        {/* Ghana Card No */}
        <div className="form-group">
          <label htmlFor="ghanaCardNo" className="block text-sm font-medium mb-1">
            Ghana Card No.
          </label>
          <input
            id="ghanaCardNo"
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            {...register("ghanaCardNo")}
          />
        </div>

        {/* NHIS */}
        <div className="form-group">
          <label htmlFor="nhis" className="block text-sm font-medium mb-1">
            NHIS
          </label>
          <input
            id="nhis"
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            {...register("nhis")}
          />
        </div>

        {/* JHS Completed */}
        {/* <div className="form-group">
          <label htmlFor="jhsCompleted" className="block text-sm font-medium mb-1">
            JHS Completed *
          </label>
          <select
            id="jhsCompleted"
            className={`w-full p-2 border rounded-md ${errors.jhsCompleted ? 'border-red-500' : 'border-gray-300'}`}
            {...register("jhsCompleted")}
          >
            <option value="">Select Option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          {errors.jhsCompleted && (
            <p className="text-red-500 text-xs mt-1">{errors.jhsCompleted.message}</p>
          )}
        </div> */}

        {/* Sports */}
        <div className="form-group">
          <label htmlFor="sports" className="block text-sm font-medium mb-1">
            Area(s) of Sports
          </label>
          <select
            id="sports"
            className="w-full p-2 border border-gray-300 rounded-md"
            {...register("sports")}
          >
            <option value="">Select Sports</option>
            <option value="Football">Football</option>
            <option value="Basketball">Basketball</option>
            <option value="Athletics">Athletics</option>
            <option value="Volleyball">Volleyball</option>
            <option value="Table Tennis">Table Tennis</option>
            <option value="Other">Other</option>
            <option value="None">None</option>
          </select>
        </div>

        {/* Health Conditions */}
        <div className="form-group">
          <label htmlFor="healthConditions" className="block text-sm font-medium mb-1">
            Any Health Conditions? *
          </label>
          <select
            id="healthConditions"
            className={`w-full p-2 border rounded-md ${errors.healthConditions ? 'border-red-500' : 'border-gray-300'}`}
            {...register("healthConditions")}
          >
            <option value="">Select Option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          {errors.healthConditions && (
            <p className="text-red-500 text-xs mt-1">{errors.healthConditions.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button
          type="button"
          onClick={nextSection}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Next: Guardian Info
        </button>
      </div>
    </div>
  );

  // Render Section 2: Guardian Info
  const renderSection2 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Guardian Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-group">
          <label htmlFor="guardian.firstName" className="block text-sm font-medium mb-1">
            First Name *
          </label>
          <input
            id="guardian.firstName"
            type="text"
            className={`w-full p-2 border rounded-md ${errors.guardian?.firstName ? 'border-red-500' : 'border-gray-300'}`}
            {...register("guardian.firstName")}
          />
          {errors.guardian?.firstName && (
            <p className="text-red-500 text-xs mt-1">{errors.guardian.firstName.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="guardian.middleName" className="block text-sm font-medium mb-1">
            Middle Name
          </label>
          <input
            id="guardian.middleName"
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            {...register("guardian.middleName")}
          />
        </div>

        <div className="form-group">
          <label htmlFor="guardian.lastName" className="block text-sm font-medium mb-1">
            Last Name *
          </label>
          <input
            id="guardian.lastName"
            type="text"
            className={`w-full p-2 border rounded-md ${errors.guardian?.lastName ? 'border-red-500' : 'border-gray-300'}`}
            {...register("guardian.lastName")}
          />
          {errors.guardian?.lastName && (
            <p className="text-red-500 text-xs mt-1">{errors.guardian.lastName.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="guardian.gender" className="block text-sm font-medium mb-1">
            Gender *
          </label>
          <select
            id="guardian.gender"
            className={`w-full p-2 border rounded-md ${errors.guardian?.gender ? 'border-red-500' : 'border-gray-300'}`}
            {...register("guardian.gender")}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {errors.guardian?.gender && (
            <p className="text-red-500 text-xs mt-1">{errors.guardian.gender.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="guardian.occupation" className="block text-sm font-medium mb-1">
            Occupation *
          </label>
          <input
            id="guardian.occupation"
            type="text"
            className={`w-full p-2 border rounded-md ${errors.guardian?.occupation ? 'border-red-500' : 'border-gray-300'}`}
            {...register("guardian.occupation")}
          />
          {errors.guardian?.occupation && (
            <p className="text-red-500 text-xs mt-1">{errors.guardian.occupation.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="guardian.phone" className="block text-sm font-medium mb-1">
            Phone *
          </label>
          <input
            id="guardian.phone"
            type="tel"
            className={`w-full p-2 border rounded-md ${errors.guardian?.phone ? 'border-red-500' : 'border-gray-300'}`}
            {...register("guardian.phone")}
          />
          {errors.guardian?.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.guardian.phone.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="guardian.email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            id="guardian.email"
            type="email"
            className="w-full p-2 border border-gray-300 rounded-md"
            {...register("guardian.email")}
          />
        </div>

        <div className="form-group">
          <label htmlFor="hasSecondGuardian" className="block text-sm font-medium mb-1">
            Second Guardian?
          </label>
          <select
            id="hasSecondGuardian"
            className="w-full p-2 border border-gray-300 rounded-md"
            {...register("hasSecondGuardian")}
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>
      </div>

      {hasSecondGuardian === "Yes" && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-medium mb-4">Second Guardian Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label htmlFor="secondGuardian.firstName" className="block text-sm font-medium mb-1">
                First Name
              </label>
              <input
                id="secondGuardian.firstName"
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                {...register("secondGuardian.firstName")}
              />
            </div>

            <div className="form-group">
              <label htmlFor="secondGuardian.middleName" className="block text-sm font-medium mb-1">
                Middle Name
              </label>
              <input
                id="secondGuardian.middleName"
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                {...register("secondGuardian.middleName")}
              />
            </div>

            <div className="form-group">
              <label htmlFor="secondGuardian.lastName" className="block text-sm font-medium mb-1">
                Last Name
              </label>
              <input
                id="secondGuardian.lastName"
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                {...register("secondGuardian.lastName")}
              />
            </div>

            <div className="form-group">
              <label htmlFor="secondGuardian.gender" className="block text-sm font-medium mb-1">
                Gender
              </label>
              <select
                id="secondGuardian.gender"
                className="w-full p-2 border border-gray-300 rounded-md"
                {...register("secondGuardian.gender")}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="secondGuardian.occupation" className="block text-sm font-medium mb-1">
                Occupation
              </label>
              <input
                id="secondGuardian.occupation"
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                {...register("secondGuardian.occupation")}
              />
            </div>

            <div className="form-group">
              <label htmlFor="secondGuardian.phone" className="block text-sm font-medium mb-1">
                Phone
              </label>
              <input
                id="secondGuardian.phone"
                type="tel"
                className="w-full p-2 border border-gray-300 rounded-md"
                {...register("secondGuardian.phone")}
              />
            </div>

            <div className="form-group">
              <label htmlFor="secondGuardian.email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                id="secondGuardian.email"
                type="email"
                className="w-full p-2 border border-gray-300 rounded-md"
                {...register("secondGuardian.email")}
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={prevSection}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
        >
          Back
        </button>
        <button
          type="button"
          onClick={nextSection}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Next: Summary
        </button>
      </div>
    </div>
  );

  // Render Section 3: Summary
  const renderSection3 = () => {
    const formData = watch();
    
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold mb-4">Summary</h2>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium mb-4 border-b pb-2">Student Bio Data</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div><strong>Index Number:</strong> {formData.indexNumber}</div>
            <div><strong>Enrolment Code:</strong> {formData.enrolmentCode}</div>
            <div><strong>Full Name:</strong> {formData.fullName}</div>
            <div><strong>Gender:</strong> {formData.gender}</div>
            <div><strong>Date of Birth:</strong> {formData.dateOfBirth}</div>
            <div><strong>Place of Birth:</strong> {formData.placeOfBirth}</div>
            <div><strong>Region:</strong> {formData.region}</div>
            <div><strong>District:</strong> {formData.district}</div>
            <div><strong>Home Town:</strong> {formData.homeTown}</div>
            <div><strong>Address:</strong> {formData.address || "N/A"}</div>
            <div><strong>Religion:</strong> {formData.religion}</div>
            <div><strong>Program:</strong> {formData.program}</div>
            <div><strong>Track:</strong> {formData.track}</div>
            <div><strong>Status:</strong> {formData.status}</div>
            <div><strong>Date of Enrolment:</strong> {formData.dateOfEnrolment}</div>
            <div><strong>Ghana Card No:</strong> {formData.ghanaCardNo || "N/A"}</div>
            <div><strong>NHIS:</strong> {formData.nhis || "N/A"}</div>
            <div><strong>JHS Completed:</strong> {formData.jhsCompleted}</div>
            <div><strong>Sports:</strong> {formData.sports || "N/A"}</div>
            <div><strong>Health Conditions:</strong> {formData.healthConditions}</div>
            <div><strong>Previous School:</strong> {formData.school}</div>
          </div>
          
          <h3 className="text-lg font-medium mb-4 border-b pb-2">Guardian Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div><strong>First Name:</strong> {formData.guardian?.firstName}</div>
            <div><strong>Middle Name:</strong> {formData.guardian?.middleName || "N/A"}</div>
            <div><strong>Last Name:</strong> {formData.guardian?.lastName}</div>
            <div><strong>Gender:</strong> {formData.guardian?.gender}</div>
            <div><strong>Occupation:</strong> {formData.guardian?.occupation}</div>
            <div><strong>Phone:</strong> {formData.guardian?.phone}</div>
            <div><strong>Email:</strong> {formData.guardian?.email || "N/A"}</div>
          </div>
          
          {formData.hasSecondGuardian === "Yes" && formData.secondGuardian && (
            <>
              <h3 className="text-lg font-medium mb-4 border-b pb-2">Second Guardian Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div><strong>First Name:</strong> {formData.secondGuardian.firstName || "N/A"}</div>
                <div><strong>Middle Name:</strong> {formData.secondGuardian.middleName || "N/A"}</div>
                <div><strong>Last Name:</strong> {formData.secondGuardian.lastName || "N/A"}</div>
                <div><strong>Gender:</strong> {formData.secondGuardian.gender || "N/A"}</div>
                <div><strong>Occupation:</strong> {formData.secondGuardian.occupation || "N/A"}</div>
                <div><strong>Phone:</strong> {formData.secondGuardian.phone || "N/A"}</div>
                <div><strong>Email:</strong> {formData.secondGuardian.email || "N/A"}</div>
              </div>
            </>
          )}
        </div>
        
        <div className="flex items-start mt-4">
          <input
            type="checkbox"
            id="certified"
            className="mt-1 mr-2"
            {...register("certified")}
          />
          <label htmlFor="certified" className="text-sm">
            I certify that the information provided on this form and all attached files are true, legal, accurate, and complete.
          </label>
        </div>
        {errors.certified && (
          <p className="text-red-500 text-xs mt-1">{errors.certified.message}</p>
        )}
        
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={prevSection}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
          >
            Back
          </button>
          
          <div className="space-x-2">
            <button
              type="button"
              onClick={() => setCurrentSection(1)}
              className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
            >
              Edit Form
            </button>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:bg-green-400"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
            
            <button
              type="reset"
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-6">Student Admission Form</h1>
        <p className="text-red-500 mb-4">
          Please complete the admission form below with accurate information. The details you provide will be reviewed by the school you’re applying to, so kindly ensure all fields are filled correctly.
        </p>
        
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <div className={`text-center ${currentSection >= 1 ? 'text-blue-600 font-medium' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${currentSection >= 1 ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                1
              </div>
              <div className="mt-1 text-xs">Student Bio</div>
            </div>
            <div className="flex-1 h-1 bg-gray-200 mx-2"></div>
            <div className={`text-center ${currentSection >= 2 ? 'text-blue-600 font-medium' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${currentSection >= 2 ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                2
              </div>
              <div className="mt-1 text-xs">Guardian Info</div>
            </div>
            <div className="flex-1 h-1 bg-gray-200 mx-2"></div>
            <div className={`text-center ${currentSection >= 3 ? 'text-blue-600 font-medium' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${currentSection >= 3 ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                3
              </div>
              <div className="mt-1 text-xs">Summary</div>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          {currentSection === 1 && renderSection1()}
          {currentSection === 2 && renderSection2()}
          {currentSection === 3 && renderSection3()}
        </form>
      </div>
      
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md">Loading student data...</div>
        </div>
      )}
    </div>
  );
};

export default StudentAdmissionForm;