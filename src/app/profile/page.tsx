import React from 'react';
import ProfileInfo from '@/components/features/Profile/ProfileInfo/ProfileInfo';
import RentalList from '@/components/features/Profile/Rental/RentalList';

export default function ProfilePage() {
  return (
    <div className='page'>
      <ProfileInfo  />
      <RentalList />
    </div>
  );
}
