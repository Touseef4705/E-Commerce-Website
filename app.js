import { auth , 
  onAuthStateChanged ,
  signOut ,
  doc ,
  getDoc ,
  db ,
  getDocs ,
  collection,
  addDoc
} from "./Utils/utils.js";

const fakeProductsArray = [
  {
    "id": 1,
    "productTitle": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    "productAmount": 109.95,
    "createdBy" : "FakeApiStore@gmail.com",
    "productDesc": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    "category": "men's clothing",
    "productImage1": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    "rating": {
      "rate": 3.9,
      "count": 120
    }
  },
  {
    "id": 2,
    "productTitle": "Mens Casual Premium Slim Fit T-Shirts ",
    "productAmount": 22.3,
    "createdBy" : "FakeApiStore@gmail.com",
    "productDesc": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    "category": "men's clothing",
    "productImage1": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    "rating": {
      "rate": 4.1,
      "count": 259
    }
  },
  {
    "id": 3,
    "productTitle": "Mens Cotton Jacket",
    "productAmount": 55.99,
    "createdBy" : "FakeApiStore@gmail.com",
    "productDesc": "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
    "category": "men's clothing",
    "productImage1": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    "rating": {
      "rate": 4.7,
      "count": 500
    }
  },
  {
    "id": 4,
    "productTitle": "Mens Casual Slim Fit",
    "productAmount": 15.99,
    "createdBy" : "FakeApiStore@gmail.com",
    "productDesc": "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product productDesc.",
    "category": "men's clothing",
    "productImage1": "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
    "rating": {
      "rate": 2.1,
      "count": 430
    }
  },
  {
    "id": 5,
    "productTitle": "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    "productAmount": 695,
    "createdBy" : "FakeApiStore@gmail.com",
    "productDesc": "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
    "category": "jewelery",
    "productImage1": "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
    "rating": {
      "rate": 4.6,
      "count": 400
    }
  },
  {
    "id": 6,
    "productTitle": "Solid Gold Petite Micropave ",
    "productAmount": 168,
    "createdBy" : "FakeApiStore@gmail.com",
    "productDesc": "Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.",
    "category": "jewelery",
    "productImage1": "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
    "rating": {
      "rate": 3.9,
      "count": 70
    }
  },
  {
    "id": 7,
    "productTitle": "White Gold Plated Princess",
    "productAmount": 9.99,
    "createdBy" : "FakeApiStore@gmail.com",
    "productDesc": "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
    "category": "jewelery",
    "productImage1": "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
    "rating": {
      "rate": 3,
      "count": 400
    }
  },
  {
    "id": 8,
    "productTitle": "Pierced Owl Rose Gold Plated Stainless Steel Double",
    "productAmount": 10.99,
    "createdBy" : "FakeApiStore@gmail.com",
    "productDesc": "Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel",
    "category": "jewelery",
    "productImage1": "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
    "rating": {
      "rate": 1.9,
      "count": 100
    }
  },
  {
    "id": 9,
    "productTitle": "WD 2TB Elements Portable External Hard Drive - USB 3.0 ",
    "productAmount": 64,
    "createdBy" : "FakeApiStore@gmail.com",
    "productDesc": "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system",
    "category": "electronics",
    "productImage1": "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
    "rating": {
      "rate": 3.3,
      "count": 203
    }
  },
  {
    "id": 10,
    "productTitle": "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
    "productAmount": 109,
    "createdBy" : "FakeApiStore@gmail.com",
    "productDesc": "Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5” hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads The perfect balance of performance and reliability Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application.)",
    "category": "electronics",
    "productImage1": "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
    "rating": {
      "rate": 2.9,
      "count": 470
    }
  },
  {
    "id": 11,
    "productTitle": "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5",
    "productAmount": 109,
    "createdBy" : "FakeApiStore@gmail.com",
    "productDesc": "3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds that enable faster bootup and improved overall system performance. The advanced SLC Cache Technology allows performance boost and longer lifespan 7mm slim design suitable for Ultrabooks and Ultra-slim notebooks. Supports TRIM command, Garbage Collection technology, RAID, and ECC (Error Checking & Correction) to provide the optimized performance and enhanced reliability.",
    "category": "electronics",
    "productImage1": "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
    "rating": {
      "rate": 4.8,
      "count": 319
    }
  },
  {
    "id": 12,
    "productTitle": "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive",
    "productAmount": 114,
    "createdBy" : "FakeApiStore@gmail.com",
    "productDesc": "Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek design with high capacity, 3-year manufacturer's limited warranty",
    "category": "electronics",
    "productImage1": "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg",
    "rating": {
      "rate": 4.8,
      "count": 400
    }
  },
  {
    "id": 13,
    "productTitle": "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin",
    "productAmount": 599,
    "createdBy" : "FakeApiStore@gmail.com",
    "productDesc": "21. 5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology. No compatibility for VESA Mount Refresh Rate: 75Hz - Using HDMI port Zero-frame design | ultra-thin | 4ms response time | IPS panel Aspect ratio - 16: 9. Color Supported - 16. 7 million colors. Brightness - 250 nit Tilt angle -5 degree to 15 degree. Horizontal viewing angle-178 degree. Vertical viewing angle-178 degree 75 hertz",
    "category": "electronics",
    "productImage1": "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
    "rating": {
      "rate": 2.9,
      "count": 250
    }
  },
  {
    "id": 14,
    "productTitle": "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED ",
    "productAmount": 999.99,
    "createdBy" : "FakeApiStore@gmail.com",
    "productDesc": "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side QUANTUM DOT (QLED) TECHNOLOGY, HDR support and factory calibration provides stunningly realistic and accurate color and contrast 144HZ HIGH REFRESH RATE and 1ms ultra fast response time work to eliminate motion blur, ghosting, and reduce input lag",
    "category": "electronics",
    "productImage1": "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
    "rating": {
      "rate": 2.2,
      "count": 140
    }
  },
  {
    "id": 15,
    "productTitle": "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
    "productAmount": 56.99,
    "createdBy" : "FakeApiStore@gmail.com",
    "productDesc": "Note:The Jackets is US standard size, Please choose size as your usual wear Material: 100% Polyester; Detachable Liner Fabric: Warm Fleece. Detachable Functional Liner: Skin Friendly, Lightweigt and Warm.Stand Collar Liner jacket, keep you warm in cold weather. Zippered Pockets: 2 Zippered Hand Pockets, 2 Zippered Pockets on Chest (enough to keep cards or keys)and 1 Hidden Pocket Inside.Zippered Hand Pockets and Hidden Pocket keep your things secure. Humanized Design: Adjustable and Detachable Hood and Adjustable cuff to prevent the wind and water,for a comfortable fit. 3 in 1 Detachable Design provide more convenience, you can separate the coat and inner as needed, or wear it together. It is suitable for different season and help you adapt to different climates",
    "category": "women's clothing",
    "productImage1": "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
    "rating": {
      "rate": 2.6,
      "count": 235
    }
  },
  {
    "id": 16,
    "productTitle": "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
    "productAmount": 29.95,
    "createdBy" : "FakeApiStore@gmail.com",
    "productDesc": "100% POLYURETHANE(shell) 100% POLYESTER(lining) 75% POLYESTER 25% COTTON (SWEATER), Faux leather material for style and comfort / 2 pockets of front, 2-For-One Hooded denim style faux leather jacket, Button detail on waist / Detail stitching at sides, HAND WASH ONLY / DO NOT BLEACH / LINE DRY / DO NOT IRON",
    "category": "women's clothing",
    "productImage1": "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg",
    "rating": {
      "rate": 2.9,
      "count": 340
    }
  },
  {
    "id": 17,
    "productTitle": "Rain Jacket Women Windbreaker Striped Climbing Raincoats",
    "productAmount": 39.99,
    "createdBy" : "FakeApiStore@gmail.com",
    "productDesc": "Lightweight perfet for trip or casual wear---Long sleeve with hooded, adjustable drawstring waist design. Button and zipper front closure raincoat, fully stripes Lined and The Raincoat has 2 side pockets are a good size to hold all kinds of things, it covers the hips, and the hood is generous but doesn't overdo it.Attached Cotton Lined Hood with Adjustable Drawstrings give it a real styled look.",
    "category": "women's clothing",
    "productImage1": "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg",
    "rating": {
      "rate": 3.8,
      "count": 679
    }
  },
  {
    "id": 18,
    "productTitle": "MBJ Women's Solid Short Sleeve Boat Neck V ",
    "productAmount": 9.85,
    "createdBy" : "FakeApiStore@gmail.com",
    "productDesc": "95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach, Lightweight fabric with great stretch for comfort, Ribbed on sleeves and neckline / Double stitching on bottom hem",
    "category": "women's clothing",
    "productImage1": "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg",
    "rating": {
      "rate": 4.7,
      "count": 130
    }
  },
  {
    "id": 19,
    "productTitle": "Opna Women's Short Sleeve Moisture",
    "productAmount": 7.95,
    "createdBy" : "FakeApiStore@gmail.com",
    "productDesc": "100% Polyester, Machine wash, 100% cationic polyester interlock, Machine Wash & Pre Shrunk for a Great Fit, Lightweight, roomy and highly breathable with moisture wicking fabric which helps to keep moisture away, Soft Lightweight Fabric with comfortable V-neck collar and a slimmer fit, delivers a sleek, more feminine silhouette and Added Comfort",
    "category": "women's clothing",
    "productImage1": "https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg",
    "rating": {
      "rate": 4.5,
      "count": 146
    }
  },
  {
    "id": 20,
    "productTitle": "DANVOUY Womens T Shirt Casual Cotton Short",
    "productAmount": 12.99,
    "createdBy" : "FakeApiStore@gmail.com",
    "productDesc": "95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.",
    "category": "women's clothing",
    "productImage1": "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg",
    "rating": {
      "rate": 3.6,
      "count": 145
    }
  }
]

const user_logout = document.getElementById("user_logout");
const user_login = document.getElementById("user_login");
const nav_disable = document.querySelectorAll("nav_disable");
const userDp = document.getElementById("userDp");
const product_card_container = document.getElementById("product_card_container");
const myProducts = document.getElementById("myProducts");

// Mobile Nav Element 
const side_navbar = document.getElementById("side_navbar");
const side_menu_open = document.getElementById("side_menu_open");
const side_menu_close = document.getElementById("side_menu_close");

const profilePage = document.getElementById("profilePage");
const disableProfilePage = document.getElementById("disableProfilePage");

window.sideBarOpen = sideBarOpen
window.sideBarClose = sideBarClose

function sideBarOpen(){
  side_menu_open.style.display = "none"
  side_navbar.style.display = "block"
  side_menu_close.style.display = "block"
}
function sideBarClose(){
  side_menu_close.style.display = "none"
  side_navbar.style.display = "none"
  side_menu_open.style.display = "block"
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    getUserInfo(uid)
    user_logout.style.display = "inline-block"
    user_login.style.display = "none"
    nav_disable.disable = false
    myProducts.style.display = "inline-block"
    profilePage.style.display = "flex"
    disableProfilePage.style.display = "none"
  } else {
    user_logout.style.display = "none"
    myProducts.style.display = "none"
    profilePage.style.display = "none"
    disableProfilePage.style.display = "inline-block"
    user_login.style.display = "inline-block"
    console.log("User is signed out")
  }
})

user_login.addEventListener("click" , ()=>{
  window.location.href = "/User Login And Signup/Login/index.html"
})
user_logout.addEventListener("click" , () => {
  signOut(auth).then(() => {
    console.log("Sign-out successful.")
  }).catch((error) => {
    console.log(error)
  });
})

getAllProducts()

async function getAllProducts(){
  const querySnapshot = await getDocs(collection(db, "Products"));
  querySnapshot.forEach((data) => {
    const product = data.data();
    const { productTitle , productDesc, productImage1, productAmount, createdBy } = product
    const productCards = `
      <div id="${data.id}" style="cursor: pointer;" onclick="productDetails(this)" class="max-w-sm bg-white rounded-lg shadow-md overflow-hidden" data-id="${data.id}">
        <img class="h-48 object-cover" style="width:100%;" src="${productImage1}" alt="Product Image">
        <div class="p-4">
          <h2 class="text-2xl font-semibold mb-2 text-capitalize">${productTitle}</h2>
          <p class="text-gray-700 mb-4">${productDesc}</p>
          <p class="text-lg font-bold text-gray-900 mb-2">PKR : ${productAmount}</p>
          <div class="flex justify-between">
            <p class="text-gray-600 mb-4">Uploaded by: <br> ${createdBy}</p>
            <p class="text-gray-600 mb-4">199+ sold</p>
          </div>
        </div>
      </div>`;
    product_card_container.innerHTML += productCards;  
  });

  // Add fake products to Firestore
  addFakeApiProducts();
}

async function addFakeApiProducts(){
  for (const product of fakeProductsArray) {
    try {
      await addDoc(collection(db, "Products"), product);
      console.log("Document successfully written!");
    } catch (error) {
      console.error("Error writing document: ", error);
    }
  }
}

window.productDetails = productDetails

function productDetails(event) {
  const productId = event.getAttribute('data-id');
  console.log('Product ID:', productId);
  if (productId) {
    window.location.href = `/E-commerce Pages/Product Details/index.html?productId=${productId}`;
  } else {
    console.error("Product ID is missing.");
  }
}

function getUserInfo(uid){
  const docRef = doc(db , "users" , uid);
  getDoc(docRef).then((data)=>{
    userDp.src = data.data().user_dp_input;
  })
}
