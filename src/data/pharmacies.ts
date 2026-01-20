// src/data/pharmacies.ts

export const pharmacies = [
  {
    id: '1',
    name: 'PawCare Pharmacy',
    address: 'District 10, Ho Chi Minh City',
    phone: '0901 234 567',
    openTime: '08:00 - 20:00', // Đảm bảo trường này tên là openTime
    services: ['Medicine', 'Vaccines', 'Supplements'],
    latitude: 10.7769, 
    longitude: 106.6675,
  },
  {
    id: '2',
    name: 'Meow Health Center',
    address: 'District 1, Ho Chi Minh City',
    phone: '0909 888 999',
    openTime: '09:00 - 21:00',
    services: ['Prescription', 'Wellness'],
    latitude: 10.7756,
    longitude: 106.7004,
  },
  {
    id: '3',
    name: 'PetCity Drugstore',
    address: 'Thu Duc City, Ho Chi Minh City',
    phone: '028 3722 1234',
    openTime: '07:30 - 22:00',
    services: ['Emergency', 'Equipment'],
    latitude: 10.8494,
    longitude: 106.7537,
  }
];