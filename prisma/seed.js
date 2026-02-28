// prisma/seed.js
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Full mock data with photos array
const mockHotels = [
  {
    id: 1,
    name: 'Cozy Cat Inn',
    location: '270 Le Thanh Ton, Ben Thanh Ward, District 1, Ho Chi Minh City',
    description:
      'This luxurious cat hotel offers spacious, climate-controlled rooms with premium scratching posts, cozy beds, and daily playtime sessions. Located in the heart of District 1, it provides 24/7 CCTV monitoring and attentive staff to ensure your feline companion feels completely at home during your absence.',
    googleRating: 4.5,
    pawtopiaRating: 4.8,
    availability: true,
    price: 500000,
    photos: [
      'https://static.wixstatic.com/media/790b5b_4e5608faa85c4e908ab71bde5536457d~mv2.jpg/v1/crop/x_0,y_344,w_1533,h_1192/fill/w_320,h_237,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/385525616_1309024529739282_6749097801703949542_n.jpg',
      'https://media.istockphoto.com/id/2200233164/photo/sphynx-and-european-shorthair-cats-gaze-through-glass-doors-in-pet-hotel-observing-other.jpg?s=612x612&w=0&k=20&c=XWsRQLeYHx9cZ-Vp6hU6oPu6a2qdmJCXnvDqUE7QhHk=',
      'https://cdn.sortiraparis.com/images/80/96038/696814-le-moustache-pension-un-hotel-pour-chats-douillet-qui-accueille-vos-compagnons-a-paris.jpg',
      'https://static.vecteezy.com/system/resources/thumbnails/073/286/463/small/modern-cat-room-interior-with-pet-furniture-and-scratching-post-photo.jpg',
    ],
  },
  {
    id: 2,
    name: 'Purrfect Stay Hotel',
    location: '85 Nguyen Thi Thap, Tan Hung Ward, District 7, Ho Chi Minh City',
    description:
      'An affordable yet comfortable boarding option perfect for budget-conscious cat owners, featuring clean enclosures and fresh meals twice daily. The hotel is conveniently located near Phu My Hung with easy access to public transport, making drop-off and pick-up hassle-free.',
    googleRating: 4.2,
    pawtopiaRating: 4.5,
    availability: false,
    price: 350000,
    photos: [
      'https://images.squarespace-cdn.com/content/v1/651b1ae5fa3ff4418caec5aa/1696277311141-C53PARPITRK7QK7PE5FL/Cat+Boarding',
      'https://c8.alamy.com/comp/2PJ8R19/cats-room-interior-in-blue-wall-with-cat-house-and-cat-condo-room-designed-for-cat-3d-rendering-2PJ8R19.jpg',
      'https://images.unsplash.com/photo-1621976360623-0042236b4a5e?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1601758177266-bc599de87707?auto=format&fit=crop&q=80',
    ],
  },
  {
    id: 3,
    name: 'Whiskers Resort',
    location: '83 Truong Dinh, Ward 6, District 3, Ho Chi Minh City',
    description:
      'Designed especially for active and playful cats, this resort includes large play areas with tunnels, climbing trees, and interactive toys to keep your pet entertained all day. Guests enjoy personalized attention from experienced handlers and a peaceful environment away from busy streets.',
    googleRating: 4.7,
    pawtopiaRating: 4.9,
    availability: true,
    price: 600000,
    photos: [
      'https://alcalacountrypetresort.com/wp-content/uploads/2022/07/Cat-Boarding-Gallery-2-1.jpg',
      'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&q=80',
    ],
  },
  {
    id: 4,
    name: 'Feline Paradise',
    location: '174 Kim Ma Street, Ba Dinh District, Hanoi',
    description:
      'A premium cat boarding facility in central Hanoi offering private suites with windows for natural light and soft bedding for ultimate relaxation. The staff provides daily grooming, medication administration if needed, and regular updates with photos so you never miss a moment of your cat’s stay.',
    googleRating: 4.6,
    pawtopiaRating: 4.7,
    availability: true,
    price: 450000,
    photos: [
      'https://d36ib8eituxnj4.cloudfront.net/cottage-1.jpg',
      'https://images.unsplash.com/photo-1606213479814-4e3d8c1c6c8d?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1592194996308-7b43878e19c9?auto=format&fit=crop&q=80',
    ],
  },
  {
    id: 5,
    name: 'Cat Haven Hanoi',
    location: '32 Ly Thai To Street, Ly Thai To Ward, Hoan Kiem District, Hanoi',
    description:
      'This cozy and secure cat hotel is ideal for shy or senior cats, featuring quiet rooms and gentle handling by trained caregivers. Situated near Hoan Kiem Lake, it offers a calm atmosphere and optional add-ons like brushing sessions or special dietary meals.',
    googleRating: 4.1,
    pawtopiaRating: 4.3,
    availability: false,
    price: 300000,
    photos: [
      'https://i0.wp.com/www.petboardinganddaycare.com/wp-content/uploads/2022/05/pg29.jpg?ssl=1',
      'https://images.unsplash.com/photo-1592194996308-7b43878e19c9?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1606213479814-4e3d8c1c6c8d?auto=format&fit=crop&q=80',
    ],
  },
  {
    id: 6,
    name: 'Paw Palace',
    location: '78 To Ngoc Van, Tay Ho Ward, Tay Ho District, Hanoi',
    description:
      'Enjoy luxury cat accommodations with scenic West Lake views, spacious suites, and premium amenities including elevated perches and enrichment toys. The palace-style hotel provides concierge-level service with daily fresh food, playtime, and personalized care reports sent directly to your phone.',
    googleRating: 4.8,
    pawtopiaRating: 4.9,
    availability: true,
    price: 700000,
    photos: [
      'https://i0.wp.com/www.petboardinganddaycare.com/wp-content/uploads/2022/05/pg28-2.jpg?ssl=1',
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1592194996308-7b43878e19c9?auto=format&fit=crop&q=80',
    ],
  },
  {
    id: 7,
    name: 'Beachside Cat Retreat',
    location: '200 To Hien Thanh Street, Phuoc My Ward, Son Tra District, Da Nang',
    description:
      'A relaxing beachside cat boarding experience just minutes from My Khe Beach, offering fresh sea air and bright, airy rooms. Cats can enjoy supervised outdoor time in a secure, shaded garden where they can watch birds and feel the ocean air. Professional staff provide daily photo updates, gentle play, and fresh meals to keep every guest happy and healthy. This tranquil retreat is ideal for cats who love nature and a calm coastal atmosphere.',
    googleRating: 4.4,
    pawtopiaRating: 4.6,
    availability: true,
    price: 400000,
    photos: [
      'https://nekoya.co/wp-content/uploads/2025/10/MM-1024x666.png',
      'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1606213479814-4e3d8c1c6c8d?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1592194996308-7b43878e19c9?auto=format&fit=crop&q=80',
    ],
  },
  {
    id: 8,
    name: 'Da Nang Kitty Lodge',
    location: '174 Bach Dang Street, Hai Chau District, Da Nang',
    description:
      'Modern and well-equipped cat hotel located along the scenic Han River with easy access to the city center and major attractions. The lodge features clean, ventilated rooms, automatic feeders, and attentive staff who provide daily cleaning and interaction to keep your cat happy and healthy. The lodge is perfect for cats who enjoy watching river views from their windows. Owners appreciate the convenient location and regular updates during their cat’s stay.',
    googleRating: 4.3,
    pawtopiaRating: 4.4,
    availability: false,
    price: 320000,
    photos: [
      'https://pix10.agoda.net/hotelImages/412145/-1/80ceda91103de739085700f76efc85b3.jpg?ce=0&s=414x232',
      'https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1592194996308-7b43878e19c9?auto=format&fit=crop&q=80',
    ],
  },
  {
    id: 9,
    name: 'Mountain View Cat Hotel',
    location: '278 Le Dai Hanh Street, Hoa Phat Ward, Cam Le District, Da Nang',
    description:
      'This peaceful retreat offers stunning mountain views and a quiet environment perfect for cats who prefer calm surroundings. Spacious enclosures are filled with natural light, soft music, and cozy resting spots to help reduce stress. Daily enrichment activities include gentle puzzle feeders, window perches for bird-watching, and quiet interaction with staff. The tranquil setting away from city noise makes it perfect for longer stays or cats recovering from vet visits. Owners receive daily updates with photos and notes on their cat’s mood and appetite.',
    googleRating: 4.9,
    pawtopiaRating: 5.0,
    availability: true,
    price: 550000,
    photos: [
      'https://i0.wp.com/www.petboardinganddaycare.com/wp-content/uploads/2022/05/pg30.jpg?ssl=1',
      'https://images.unsplash.com/photo-1606213479814-4e3d8c1c6c8d?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1592194996308-7b43878e19c9?auto=format&fit=crop&q=80',
    ],
  },
  {
    id: 10,
    name: 'Urban Cat Oasis',
    location: '10 Tran Nao Street, Binh An Ward, District 2, Ho Chi Minh City',
    description:
      'Urban Cat Oasis is a stylish and contemporary cat hotel located in the trendy Thao Dien area of District 2. The modern design features comfortable lounging spaces, interactive play zones, and plenty of vertical elements for climbing and exploring. This urban retreat offers a safe and fun environment for city cats who thrive on stimulation and social interaction. The convenient location provides easy access from central District 1 and nearby expat communities. Daily updates, fresh meals, and attentive care ensure every cat enjoys a luxurious and happy stay away from home.',
    googleRating: 4.0,
    pawtopiaRating: 4.2,
    availability: true,
    price: 380000,
    photos: [
      'https://thesmartlocal.com/wp-content/uploads/2023/04/cat-hotels-singapore-nekoya-rooms.png',
      'https://images.unsplash.com/photo-1587300003388-5928af8c0b1c?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1606213479814-4e3d8c1c6c8d?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?auto=format&fit=crop&q=80',
    ],
  },
];

async function main() {
  console.log('Starting hotel seed...');
  console.log(`Total hotels: ${mockHotels.length}`);

  // Optional: clear old data (recommended for clean re-seed)
  await prisma.hotel.deleteMany({});
  console.log('Cleared existing hotels.');

  for (const h of mockHotels) {
    const firstPhoto = h.photos && h.photos.length > 0 ? h.photos[0] : null;

    console.log(`Seeding hotel #${h.id}: ${h.name}`);
    console.log(`  Photos count: ${h.photos?.length || 0}`);
    console.log(`  First photo: ${firstPhoto || '(none)'}`);

    await prisma.hotel.upsert({
      where: { id: h.id },
      update: {
        name: h.name,
        location: h.location,
        description: h.description,
        googleRating: h.googleRating,
        pawtopiaRating: h.pawtopiaRating,
        availability: h.availability,
        price: h.price,
        photos: h.photos || [], // ← full array stored here
      },
      create: {
        id: h.id,
        name: h.name,
        location: h.location,
        description: h.description,
        googleRating: h.googleRating,
        pawtopiaRating: h.pawtopiaRating,
        availability: h.availability,
        price: h.price,
        photos: h.photos || [],
      },
    });
  }

  console.log('Seeding completed! All hotels now have photos array in DB.');
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });