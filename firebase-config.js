// Firebase Configuration
// Replace this placeholder configuration with your actual Firebase config keys
const firebaseConfig = {
  apiKey: "AIzaSyBRY7M7Ap4Pp-b3q-Bqb-hKocP6sgfNq14",
  authDomain: "mariesta-559df.firebaseapp.com",
  projectId: "mariesta-559df",
  storageBucket: "mariesta-559df.firebasestorage.app",
  messagingSenderId: "605497534664",
  appId: "1:605497534664:web:9e5e8239b2dbd794af1dfd",
  measurementId: "G-EE7D0C85TB"
};

// Default Credentials for Admin login in Fallback / Mock Mode
const fallbackAdminCredentials = {
  username: "admin",
  password: "admin123"
};

// Check if Firebase configuration is customized
const isFirebaseConfigured = () => {
  return firebaseConfig.apiKey && firebaseConfig.apiKey !== "YOUR_API_KEY";
};

// Default list of products to seed the database
const seedProducts = [
  // 0: بوكيه زفاف
  { name: "بوكيه العروسة الملكي", price: "250 ج.م", image: "images/22.png", category: 0, description: "بوكيه عروس ملكي مميز وجذاب ومناسب لجميع الأذواق." },
  { name: "بوكيه التوليب الأبيض", price: "180 ج.م", image: "images/22.png", category: 0, description: "بوكيه توليب أبيض ناعم وكلاسيكي." },
  { name: "بوكيه كلاسيك روز", price: "220 ج.م", image: "images/22.png", category: 0, description: "بوكيه كلاسيكي من الورد الجوري الأحمر الفاخر." },
  { name: "بوكيه الفاوانيا الفاخر", price: "320 ج.م", image: "images/22.png", category: 0, description: "بوكيه فاوانيا فاخر وجميل للمناسبات الكبرى." },
  { name: "بوكيه الياسمين الأنيق", price: "190 ج.م", image: "images/22.png", category: 0, description: "بوكيه ياسمين فواح وأنيق." },
  { name: "بوكيه زفاف ملكي", price: "400 ج.م", image: "images/22.png", category: 0, description: "بوكيه زفاف ملكي كبير وجذاب للغاية." },
  { name: "بوكيه ورد جوري أحمر", price: "150 ج.م", image: "images/22.png", category: 0, description: "بوكيه كلاسيكي من الورد الجوري الأحمر." },
  { name: "بوكيه لافندر ناعم", price: "130 ج.م", image: "images/22.png", category: 0, description: "بوكيه لافندر طبيعي مجفف ناعم ورائحة جذابة." },

  // 1: بوكيه تخرج
  { name: "بوكيه نجاح وتفوق", price: "140 ج.م", image: "images/22.png", category: 1, description: "بوكيه للتعبير عن الفرحة بالنجاح والتفوق الدراسي." },
  { name: "بوكيه التخرج الكلاسيكي", price: "160 ج.م", image: "images/22.png", category: 1, description: "بوكيه تخرج كلاسيكي أنيق." },
  { name: "بوكيه شريط ذهبي", price: "180 ج.م", image: "images/22.png", category: 1, description: "بوكيه تخرج مزين بشريط ذهبي فاخر." },
  { name: "بوكيه جوري أصفر", price: "120 ج.م", image: "images/22.png", category: 1, description: "بوكيه ورد جوري أصفر يعبر عن البهجة والتخرج." },
  { name: "بوكيه فرحة النجاح", price: "200 ج.م", image: "images/22.png", category: 1, description: "بوكيه كبير ومبهج بمناسبة النجاح." },
  { name: "بوكيه التخرج الفاخر", price: "250 ج.م", image: "images/22.png", category: 1, description: "بوكيه تخرج فاخر مع شوكولاتة وورد مجفف." },
  { name: "بوكيه تخرج مبهج", price: "110 ج.م", image: "images/22.png", category: 1, description: "بوكيه بسيط ومبهج مناسب لحفلات التخرج." },

  // 2: بوكيه احتفال
  { name: "بوكيه البهجة والسرور", price: "150 ج.م", image: "images/22.png", category: 2 },
  { name: "بوكيه ورد مشكل", price: "170 ج.م", image: "images/22.png", category: 2 },
  { name: "بوكيه الأوركيد الساحر", price: "280 ج.م", image: "images/22.png", category: 2 },

  // 5: ورد ستان
  { name: "بوكيه ورد ستان أحمر", price: "120 ج.م", image: "images/22.png", category: 5 },
  { name: "وردة ستان فردية فاخرة", price: "25 ج.م", image: "images/22.png", category: 5 },

  // 6: فراشات
  { name: "تنسيق بوكيه الفراشات المضيء", price: "190 ج.م", image: "images/22.png", category: 6 }
];

// Initialize Local Mock DB if needed
const getMockProducts = () => {
  const local = localStorage.getItem("mock_products");
  if (!local) {
    localStorage.setItem("mock_products", JSON.stringify(seedProducts));
    return seedProducts;
  }
  return JSON.parse(local);
};

const saveMockProducts = (products) => {
  localStorage.setItem("mock_products", JSON.stringify(products));
};

// Initialize Firebase App
let db = null;
let auth = null;
let useFirebase = false;
let firebaseFailed = false;

if (typeof firebase !== "undefined" && isFirebaseConfigured()) {
  try {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    db = firebase.firestore();
    
    // Enable offline persistence for faster retrieval
    db.enablePersistence({ synchronizeTabs: true }).catch((err) => {
      if (err.code === 'failed-precondition') {
        console.warn("Firestore persistence failed-precondition: multiple tabs open.");
      } else if (err.code === 'unimplemented') {
        console.warn("Firestore persistence is unimplemented in this browser.");
      } else {
        console.warn("Firestore persistence could not be enabled:", err);
      }
    });

    auth = firebase.auth();
    useFirebase = true;
    console.log("Firebase initialized successfully with offline persistence.");
  } catch (err) {
    console.warn("Failed to initialize Firebase. Falling back to Mock DB mode.", err);
  }
} else {
  console.log("Running in Mock Mode. Connect Firebase via firebase-config.js.");
}

// Seed Data for Portfolio Gallery (معرض الأعمال)
const seedGallery = [];

const getMockGallery = () => {
  let local = localStorage.getItem("mock_gallery");
  if (local) {
    try {
      const items = JSON.parse(local);
      const oldTitles = ["بوكيه الورد الأحمر الانيق", "تنسيق ورد الستان الفاخر", "باقة الورد الزهري المميزة", "تنسيق الهدايا الفخم"];
      const filtered = items.filter(item => !oldTitles.includes(item.title));
      if (filtered.length !== items.length) {
        localStorage.setItem("mock_gallery", JSON.stringify(filtered));
        local = JSON.stringify(filtered);
      }
    } catch (e) {
      console.error(e);
    }
  }
  if (!local) {
    localStorage.setItem("mock_gallery", JSON.stringify(seedGallery));
    return seedGallery;
  }
  return JSON.parse(local);
};

const saveMockGallery = (items) => {
  localStorage.setItem("mock_gallery", JSON.stringify(items));
};

// Seed Data for Testimonials
const seedTestimonials = [
  { text: "حرفياً أشطر واحدة تعمل بوكيهات فى الدنيا كفاية ذوقك والله وطريقتك فى التعامل وصاحبتي فرحت بيه اوي اوي ومفيش حد شافه ومعلقش عليه والله مبسوطة اوي اني اتعرفت على حد زيك وان شاء الله مش اخر تعامل بينا" },
  { text: "البوكيه طلع يجنن بجد والتفاصيل والورد الستان شكله طبيعي جداً وراقي والتقفيل نضيف وممتاز تسلم ايدك وإن شاء الله هطلب منك علطول" },
  { text: "بجد ذوقك يجنن والتعامل راقي جداً، البوكيه كان مفاجأة حلوة أوي لصحبتي وعجب كل الناس في الحفلة. شكراً ليكي ولسرعة التوصيل والخدمة الممتازة" },
  { text: "شغل احترافي ومتقن جداً، الورد الستان لونه تحفة وحجم البوكيه مناسب جداً. بجد فخورة إن عندنا حد بيعمل الجمال ده بالدقة دي" },
  { text: "حرفياً البوكيه تحفة فنية وكل اللي شافوه سألوني عليه، الذوق والتعامل والتغليف بجد فوق الممتاز. مش هيكون آخر تعامل أكيد" }
];

const getMockTestimonials = () => {
  let local = localStorage.getItem("mock_testimonials");
  if (local) {
    try {
      const items = JSON.parse(local);
      if (items.some(item => !item.createdAt)) {
        localStorage.removeItem("mock_testimonials");
        local = null;
      }
    } catch(e) {
      localStorage.removeItem("mock_testimonials");
      local = null;
    }
  }
  if (!local) {
    const seeded = seedTestimonials.map((t, idx) => ({
      id: "mock_t_seed_" + idx,
      ...t,
      createdAt: Date.now() - (idx * 60000)
    }));
    localStorage.setItem("mock_testimonials", JSON.stringify(seeded));
    return seeded;
  }
  return JSON.parse(local);
};

const saveMockTestimonials = (items) => {
  localStorage.setItem("mock_testimonials", JSON.stringify(items));
};

// Global API Helper for Database Operations
window.AppDB = {
  isFirebase: () => useFirebase && !firebaseFailed,

  getProducts: (callback) => {
    const sortProds = (prods) => {
      return [...prods].sort((a, b) => {
        const timeA = a.createdAt !== undefined ? Number(a.createdAt) : 0;
        const timeB = b.createdAt !== undefined ? Number(b.createdAt) : 0;
        if (timeA !== timeB) {
          return timeB - timeA;
        }
        return (b.id || "").localeCompare(a.id || "");
      });
    };

    // Load from cache instantly if available
    let hasLoadedFromCache = false;
    try {
      const cached = localStorage.getItem("firebase_cache_products");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          callback(sortProds(parsed));
          hasLoadedFromCache = true;
        }
      }
    } catch (e) {
      console.warn("Failed to read products cache from LocalStorage:", e);
    }

    if (useFirebase && db && !firebaseFailed) {
      return db.collection("products").onSnapshot((snapshot) => {
        const prods = [];
        snapshot.forEach((doc) => {
          prods.push({ id: doc.id, ...doc.data() });
        });
        try {
          localStorage.setItem("firebase_cache_products", JSON.stringify(prods));
        } catch (e) {
          console.warn("Failed to write products cache to LocalStorage:", e);
        }
        callback(sortProds(prods));
      }, (error) => {
        console.error("Firestore read error, falling back to LocalStorage: ", error);
        firebaseFailed = true;
        callback(sortProds(getMockProducts()));
      });
    } else {
      if (!hasLoadedFromCache) {
        callback(sortProds(getMockProducts()));
      }
      return () => { };
    }
  },

  addProduct: async (product) => {
    const productWithTimestamp = {
      ...product,
      createdAt: product.createdAt || Date.now()
    };
    if (useFirebase && db && !firebaseFailed) {
      try {
        return await db.collection("products").add(productWithTimestamp);
      } catch (err) {
        console.error("Firestore add failed, falling back to LocalStorage: ", err);
        firebaseFailed = true;
      }
    }
    const prods = getMockProducts();
    const newProduct = { id: "mock_" + Date.now(), ...productWithTimestamp };
    prods.push(newProduct);
    saveMockProducts(prods);
    return newProduct;
  },

  updateProduct: async (id, product) => {
    if (useFirebase && db && !firebaseFailed) {
      try {
        return await db.collection("products").doc(id).update(product);
      } catch (err) {
        console.error("Firestore update failed, falling back to LocalStorage: ", err);
        firebaseFailed = true;
      }
    }
    const prods = getMockProducts();
    const idx = prods.findIndex(p => p.id === id || (p.name === product.name && p.category === product.category));
    if (idx !== -1) {
      prods[idx] = { ...prods[idx], ...product };
      saveMockProducts(prods);
    }
    return true;
  },

  deleteProduct: async (id, productKey) => {
    if (useFirebase && db && !firebaseFailed) {
      try {
        return await db.collection("products").doc(id).delete();
      } catch (err) {
        console.error("Firestore delete failed, falling back to LocalStorage: ", err);
        firebaseFailed = true;
      }
    }
    let prods = getMockProducts();
    prods = prods.filter(p => p.id !== id && !(p.name === productKey.name && p.category === productKey.category));
    saveMockProducts(prods);
    return true;
  },

  seedDatabase: async () => {
    if (useFirebase && db && !firebaseFailed) {
      try {
        const batch = db.batch();
        seedProducts.forEach((prod) => {
          const ref = db.collection("products").doc();
          batch.set(ref, prod);
        });
        return await batch.commit();
      } catch (err) {
        console.error("Firestore seeding failed, falling back to LocalStorage: ", err);
        firebaseFailed = true;
      }
    }
    saveMockProducts(seedProducts);
    return Promise.resolve();
  },

  // Gallery CRUD Operations
  getGalleryItems: (callback) => {
    const sortGallery = (items) => {
      return [...items].sort((a, b) => {
        const timeA = a.createdAt !== undefined ? Number(a.createdAt) : 0;
        const timeB = b.createdAt !== undefined ? Number(b.createdAt) : 0;
        return timeB - timeA;
      });
    };

    // Load from cache instantly if available
    let hasLoadedFromCache = false;
    try {
      const cached = localStorage.getItem("firebase_cache_gallery");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          callback(sortGallery(parsed));
          hasLoadedFromCache = true;
        }
      }
    } catch (e) {
      console.warn("Failed to read gallery cache from LocalStorage:", e);
    }

    if (useFirebase && db && !firebaseFailed) {
      return db.collection("gallery").onSnapshot((snapshot) => {
        const items = [];
        snapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() });
        });
        try {
          localStorage.setItem("firebase_cache_gallery", JSON.stringify(items));
        } catch (e) {
          console.warn("Failed to write gallery cache to LocalStorage:", e);
        }
        callback(sortGallery(items));
      }, (error) => {
        console.error("Firestore read gallery error, falling back to LocalStorage: ", error);
        firebaseFailed = true;
        callback(sortGallery(getMockGallery()));
      });
    } else {
      if (!hasLoadedFromCache) {
        callback(sortGallery(getMockGallery()));
      }
      return () => { };
    }
  },

  addGalleryItem: async (item) => {
    const itemWithTimestamp = {
      ...item,
      createdAt: item.createdAt || Date.now()
    };
    if (useFirebase && db && !firebaseFailed) {
      try {
        return await db.collection("gallery").add(itemWithTimestamp);
      } catch (err) {
        console.error("Firestore add gallery failed, falling back to LocalStorage: ", err);
        firebaseFailed = true;
      }
    }
    const items = getMockGallery();
    const newItem = { id: "mock_g_" + Date.now(), ...itemWithTimestamp };
    items.push(newItem);
    saveMockGallery(items);
    return newItem;
  },

  updateGalleryItem: async (id, item) => {
    if (useFirebase && db && !firebaseFailed) {
      try {
        return await db.collection("gallery").doc(id).update(item);
      } catch (err) {
        console.error("Firestore update gallery failed, falling back to LocalStorage: ", err);
        firebaseFailed = true;
      }
    }
    const items = getMockGallery();
    const idx = items.findIndex(i => i.id === id || i.title === item.title);
    if (idx !== -1) {
      items[idx] = { ...items[idx], ...item };
      saveMockGallery(items);
    }
    return true;
  },

  deleteGalleryItem: async (id, itemKey) => {
    if (useFirebase && db && !firebaseFailed) {
      try {
        return await db.collection("gallery").doc(id).delete();
      } catch (err) {
        console.error("Firestore delete gallery failed, falling back to LocalStorage: ", err);
        firebaseFailed = true;
      }
    }
    let items = getMockGallery();
    items = items.filter(i => i.id !== id && i.title !== itemKey.title);
    saveMockGallery(items);
    return true;
  },

  getTestimonials: (callback) => {
    const sortTestimonials = (items) => {
      return [...items].sort((a, b) => {
        const timeA = a.createdAt !== undefined ? Number(a.createdAt) : 0;
        const timeB = b.createdAt !== undefined ? Number(b.createdAt) : 0;
        return timeB - timeA;
      });
    };

    // Load from cache instantly if available
    let hasLoadedFromCache = false;
    try {
      const cached = localStorage.getItem("firebase_cache_testimonials");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          callback(sortTestimonials(parsed));
          hasLoadedFromCache = true;
        }
      }
    } catch (e) {
      console.warn("Failed to read testimonials cache from LocalStorage:", e);
    }

    if (useFirebase && db && !firebaseFailed) {
      return db.collection("testimonials").onSnapshot((snapshot) => {
        const items = [];
        snapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() });
        });
        if (items.length === 0) {
          seedTestimonials.forEach(async (t, idx) => {
            await db.collection("testimonials").add({ ...t, createdAt: Date.now() - (idx * 60000) });
          });
        }
        try {
          localStorage.setItem("firebase_cache_testimonials", JSON.stringify(items));
        } catch (e) {
          console.warn("Failed to write testimonials cache to LocalStorage:", e);
        }
        callback(sortTestimonials(items));
      }, (error) => {
        console.error("Firestore read testimonials error, falling back to LocalStorage: ", error);
        firebaseFailed = true;
        callback(sortTestimonials(getMockTestimonials()));
      });
    } else {
      if (!hasLoadedFromCache) {
        callback(sortTestimonials(getMockTestimonials()));
      }
      return () => { };
    }
  },

  addTestimonial: async (item) => {
    const itemWithTimestamp = {
      ...item,
      createdAt: item.createdAt || Date.now()
    };
    if (useFirebase && db && !firebaseFailed) {
      try {
        return await db.collection("testimonials").add(itemWithTimestamp);
      } catch (err) {
        console.error("Firestore add testimonial failed, falling back to LocalStorage: ", err);
        firebaseFailed = true;
      }
    }
    const items = getMockTestimonials();
    const newItem = { id: "mock_t_" + Date.now(), ...itemWithTimestamp };
    items.push(newItem);
    saveMockTestimonials(items);
    return newItem;
  },

  updateTestimonial: async (id, item) => {
    if (useFirebase && db && !firebaseFailed) {
      try {
        return await db.collection("testimonials").doc(id).update(item);
      } catch (err) {
        console.error("Firestore update testimonial failed, falling back to LocalStorage: ", err);
        firebaseFailed = true;
      }
    }
    const items = getMockTestimonials();
    const idx = items.findIndex(i => i.id === id || i.text === item.text);
    if (idx !== -1) {
      items[idx] = { ...items[idx], ...item };
      saveMockTestimonials(items);
    }
    return true;
  },

  deleteTestimonial: async (id, itemKey) => {
    if (useFirebase && db && !firebaseFailed) {
      try {
        return await db.collection("testimonials").doc(id).delete();
      } catch (err) {
        console.error("Firestore delete testimonial failed, falling back to LocalStorage: ", err);
        firebaseFailed = true;
      }
    }
    let items = getMockTestimonials();
    items = items.filter(i => i.id !== id && i.text !== itemKey.text);
    saveMockTestimonials(items);
    return true;
  }
};
