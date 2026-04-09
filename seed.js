const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const User = require('./models/User');
const Service = require('./models/Service');
const Offer = require('./models/Offer');

const seed = async () => {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/janvi-makeover');
  console.log('✅ Connected to MongoDB');

  await User.deleteMany({});
  await Service.deleteMany({});
  await Offer.deleteMany({});
  console.log('🗑️  Cleared existing data');

  // ── Admin (Janvi Bhagat) ──────────────────────────────
  await User.create({
    name: 'Janvi Bhagat',
    email: 'admin@janvimakeover.com',
    phone: '9359866589',
    password: 'admin123',
    role: 'admin',
  });

  // ── Test user ─────────────────────────────────────────
  await User.create({
    name: 'Priya Sharma',
    email: 'priya@example.com',
    phone: '9876543211',
    password: 'user123',
    role: 'user',
  });

  // ── Services (from pamphlet) ──────────────────────────
  await Service.insertMany([
    // HAIR
    {
      name: 'Hair Cutting',
      category: 'Hair',
      price: 100,
      duration: 30,
      description: 'Professional haircut in 5 styles — U-cut, Layer Cut, Step Cut, Round Cut, Front Modification. Neat finish with expert hands.',
    },
    {
      name: 'Global Highlights',
      category: 'Hair',
      price: 2500,
      duration: 150,
      description: 'Full hair global highlights giving you a vibrant, multi-dimensional color look using premium color products.',
    },
    {
      name: 'Hair Treatment',
      category: 'Hair',
      price: 1500,
      duration: 90,
      description: 'Deep conditioning hair treatment including advance hair spa for nourishment, shine, and frizz control.',
    },
    {
      name: 'Hair Spa',
      category: 'Hair',
      price: 800,
      duration: 60,
      description: 'Relaxing hair spa with head massage. Restores moisture, reduces breakage, and adds beautiful shine to your hair.',
    },

    // SKIN
    {
      name: 'Facial',
      category: 'Skin',
      price: 700,
      duration: 60,
      description: 'Rejuvenating facial treatment tailored to your skin type. Includes deep cleansing, exfoliation, massage, and moisturizing.',
    },
    {
      name: 'Korean Facial',
      category: 'Skin',
      price: 1200,
      duration: 75,
      description: 'K-beauty inspired Korean facial for glass skin effect. Deep hydration, brightening, and skin-firming treatment.',
    },
    {
      name: 'Potli Facial',
      category: 'Skin',
      price: 1000,
      duration: 75,
      description: 'Traditional Potli (herbal pouch) facial for deep skin nourishment. Brightens complexion and reduces skin stress.',
    },
    {
      name: 'Bleach',
      category: 'Skin',
      price: 300,
      duration: 30,
      description: 'Safe and effective skin brightening bleach for a glowing, even complexion. Reduces tan and dark spots gently.',
    },
    {
      name: 'Threading',
      category: 'Skin',
      price: 50,
      duration: 15,
      description: 'Expert eyebrow and upper lip threading for clean, defined, and perfectly shaped eyebrows.',
    },
    {
      name: 'Waxing (Full Body)',
      category: 'Skin',
      price: 1200,
      duration: 90,
      description: 'Complete full body waxing with gentle wax formula for smooth, hair-free, glowing skin. Includes all body parts.',
    },
    {
      name: 'Skin Treatment',
      category: 'Skin',
      price: 800,
      duration: 60,
      description: 'Customized skin treatment targeting specific skin concerns like pigmentation, dullness, acne, or uneven tone.',
    },

    // MAKEUP
    {
      name: 'Party Makeup',
      category: 'Makeup',
      price: 2000,
      duration: 90,
      description: 'Glamorous party makeup for special occasions. Long-lasting, photo-ready look with premium products.',
    },
    {
      name: 'Everyday Makeup',
      category: 'Makeup',
      price: 800,
      duration: 45,
      description: 'Natural and fresh everyday/self makeup look. Perfect for offices, casual outings, and daily wear.',
    },
    {
      name: 'Foundation Makeup',
      category: 'Makeup',
      price: 1500,
      duration: 60,
      description: 'Flawless foundation makeup with perfect base, contouring, and finish for events and photography.',
    },

    // BRIDAL
    {
      name: 'Bridal Makeup',
      category: 'Bridal',
      price: 15000,
      duration: 240,
      description: 'Complete bridal makeup package including pre-bridal consultation, hair styling, and day-of stunning bridal look.',
    },
    {
      name: 'Engagement Makeup',
      category: 'Bridal',
      price: 5000,
      duration: 150,
      description: 'Elegant engagement makeup with hair styling for ring ceremony. Romantic, long-lasting look for your big moment.',
    },
    {
      name: 'Bridal Hair Styling',
      category: 'Bridal',
      price: 3000,
      duration: 90,
      description: 'Exquisite bridal hair styling with accessories and setting spray. Includes trial session for perfect results.',
    },
    {
      name: 'Saree Draping',
      category: 'Bridal',
      price: 500,
      duration: 30,
      description: 'Expert saree draping in 5 different styles — Maharashtrian, Bengali, Nauvari, Gujarati, South Indian styles.',
    },
  ]);

  // ── Offers ────────────────────────────────────────────
  const validFrom = new Date();
  const validTill30 = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  const validTill60 = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000);

  await Offer.insertMany([
    {
      title: 'First Visit Special',
      description: 'Welcome to Janvi Makeover! Get ₹200 flat off on your very first service. No minimum amount required.',
      discount: 200,
      discountType: 'flat',
      validFrom,
      validTill: validTill30,
      isActive: true,
    },
    {
      title: 'Bridal Season Offer',
      description: 'Book our complete Bridal Makeup package and get a complimentary Threading + Bleach session absolutely free!',
      discount: 15,
      discountType: 'percentage',
      validFrom,
      validTill: validTill60,
      isActive: true,
    },
    {
      title: 'Korean Facial Combo',
      description: 'Book Korean Facial + Hair Spa together and get 20% off on the combined package. Perfect rejuvenation combo!',
      discount: 20,
      discountType: 'percentage',
      validFrom,
      validTill: validTill30,
      isActive: true,
    },
  ]);

  console.log('\n✅ Database seeded successfully with real Janvi Makeover data!');
  console.log('─────────────────────────────────────────────');
  console.log('👑 Admin  → admin@janvimakeover.com  / admin123  (Janvi Bhagat)');
  console.log('👤 User   → priya@example.com        / user123');
  console.log('─────────────────────────────────────────────');
  console.log('📦 Services created: 17');
  console.log('🎁 Offers created  : 3');
  process.exit(0);
};

seed().catch(err => { console.error('❌ Seed error:', err); process.exit(1); });
