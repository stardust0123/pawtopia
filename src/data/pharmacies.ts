export type Pharmacy = {
  id: number
  name: string
  address: string
  phone: string
  hours: string
  lat: number
  lng: number
  services: string[]
}

export const pharmacies: Pharmacy[] = [
  {
    id: 1,
    name: "PawCare Pharmacy",
    address: "District 10, Ho Chi Minh City",
    phone: "0901 234 567",
    hours: "08:00 – 20:00",
    lat: 10.762622,
    lng: 106.660172,
    services: ["Medicine", "Vaccines", "Supplements"],
  },
  {
    id: 2,
    name: "Meow Health Center",
    address: "District 1, Ho Chi Minh City",
    phone: "0909 888 999",
    hours: "09:00 – 21:00",
    lat: 10.776889,
    lng: 106.700806,
    services: ["Prescription", "Wellness"],
  },
]
