// prisma/seed.js
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

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
    photo:
      'https://static.wixstatic.com/media/790b5b_4e5608faa85c4e908ab71bde5536457d~mv2.jpg/v1/crop/x_0,y_344,w_1533,h_1192/fill/w_320,h_237,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/385525616_1309024529739282_6749097801703949542_n.jpg',
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
    photo: 'https://images.squarespace-cdn.com/content/v1/651b1ae5fa3ff4418caec5aa/1696277311141-C53PARPITRK7QK7PE5FL/Cat+Boarding',
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
    photo: 'https://alcalacountrypetresort.com/wp-content/uploads/2022/07/Cat-Boarding-Gallery-2-1.jpg',
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
    photo: 'https://d36ib8eituxnj4.cloudfront.net/cottage-1.jpg',
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
    photo: 'https://i0.wp.com/www.petboardinganddaycare.com/wp-content/uploads/2022/05/pg29.jpg?ssl=1',
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
    photo: 'https://i0.wp.com/www.petboardinganddaycare.com/wp-content/uploads/2022/05/pg28-2.jpg?ssl=1',
  },
  {
    id: 7,
    name: 'Beachside Cat Retreat',
    location: '200 To Hien Thanh Street, Phuoc My Ward, Son Tra District, Da Nang',
    description:
      'A relaxing beachside cat boarding experience just minutes from My Khe Beach, offering fresh sea air and bright, airy rooms. Cats can enjoy supervised outdoor time in a secure garden area while owners receive daily photo updates and peace of mind from professional staff.',
    googleRating: 4.4,
    pawtopiaRating: 4.6,
    availability: true,
    price: 400000,
    photo: 'https://nekoya.co/wp-content/uploads/2025/10/MM-1024x666.png',
  },
  {
    id: 8,
    name: 'Da Nang Kitty Lodge',
    location: '174 Bach Dang Street, Hai Chau District, Da Nang',
    description:
      'Modern and well-equipped cat hotel located along the scenic Han River with easy access to the city center and major attractions. The lodge features clean, ventilated rooms, automatic feeders, and attentive staff who provide daily cleaning and interaction to keep your cat happy and healthy.',
    googleRating: 4.3,
    pawtopiaRating: 4.4,
    availability: false,
    price: 320000,
    photo: 'https://pix10.agoda.net/hotelImages/412145/-1/80ceda91103de739085700f76efc85b3.jpg?ce=0&s=414x232',
  },
  {
    id: 9,
    name: 'Mountain View Cat Hotel',
    location: '278 Le Dai Hanh Street, Hoa Phat Ward, Cam Le District, Da Nang',
    description:
      'This peaceful retreat offers stunning mountain views and a quiet environment perfect for cats who prefer calm surroundings. Spacious enclosures with natural light, soft music, and daily enrichment activities help reduce stress during longer stays.',
    googleRating: 4.9,
    pawtopiaRating: 5.0,
    availability: true,
    price: 550000,
    photo: 'https://i0.wp.com/www.petboardinganddaycare.com/wp-content/uploads/2022/05/pg30.jpg?ssl=1',
  },
  {
    id: 10,
    name: 'Urban Cat Oasis',
    location: '10 Tran Nao Street, Binh An Ward, District 2, Ho Chi Minh City',
    description:
      'A stylish urban cat hotel in the trendy Thao Dien area, offering modern design, comfortable lounging spaces, and interactive play zones. Ideal for city cats, it provides a safe and fun environment with easy access from central District 1 and nearby expat communities.',
    googleRating: 4.0,
    pawtopiaRating: 4.2,
    availability: true,
    price: 380000,
    photo: 'https://thesmartlocal.com/wp-content/uploads/2023/04/cat-hotels-singapore-nekoya-rooms.png',
  },
];

async function main() {
  console.log('Starting hotel seed...');

  let seededCount = 0;

  for (const h of mockHotels) {
    // const photoUrl = h.photos && h.photos.length > 0 ? h.photos[0] : null;

    // console.log(`Seeding hotel #${h.id}: ${h.name}`);
    // console.log(`  → Using photo: ${photoUrl || '(none)'}`);

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
        photo: h.photo || null,   // ← this matches your current mockHotels
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
        photo: h.photo || null,
      },
    });

    seededCount++;
  }

  console.log(`Successfully seeded/updated ${seededCount} hotels!`);
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });