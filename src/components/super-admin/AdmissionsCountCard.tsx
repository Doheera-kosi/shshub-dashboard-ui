'use client';

import { Card } from '@/components/ui/Card';
import { getAdmissionsCount } from '@/services/admissionsService';
import { Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import Modal from '../ui/Modal';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';

const AdmissionsCountCard = () => {
  const [admissionsCount, setAdmissionsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmissionsCount = async () => {
      try {
        const count = await getAdmissionsCount();
        setAdmissionsCount(count);
      } catch (error) {
        console.error('Error fetching admissions count:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmissionsCount();
  }, []);

  return (
    <Modal
      title='Filter Admissions'
      trigger={
        <Card className='shadow-lg rounded-xl p-4 bg-gradient-to-br from-purple-500 to-indigo-600 text-white cursor-pointer'>
          <div className='flex justify-between items-start'>
            <h2 className='text-lg font-semibold'>Admissions</h2>
            <Users className='h-6 w-6' />
          </div>
          {loading ? (
            <div className='text-3xl font-bold mt-2'>...</div>
          ) : (
            <div className='text-3xl font-bold mt-2'>{admissionsCount}</div>
          )}
          <p className='text-xs text-indigo-200 mt-1'>+20.1% from last month</p>
        </Card>
      }
    >
      <div className='flex flex-col gap-4'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <Select>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Region' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='ashanti'>Ashanti</SelectItem>
              <SelectItem value='greater-accra'>Greater Accra</SelectItem>
              <SelectItem value='eastern'>Eastern</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='District' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='kumasi'>Kumasi</SelectItem>
              <SelectItem value='accra-metropolis'>Accra Metropolis</SelectItem>
              <SelectItem value='koforidua'>Koforidua</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='School' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='presec'>PRESEC</SelectItem>
              <SelectItem value='adisadel'>Adisadel College</SelectItem>
              <SelectItem value='gsts'>GSTS</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Card className='p-4 flex flex-col gap-4'>
          <div className='flex justify-between items-center'>
            <h2 className='text-lg font-semibold'>Total Admissions</h2>
          </div>
          {loading ? (
            <div className='text-2xl font-bold'>...</div>
          ) : (
            <div className='text-2xl font-bold'>{admissionsCount}</div>
          )}
        </Card>
      </div>
    </Modal>
  );
};

export default AdmissionsCountCard;