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

// const fakeProductsArray = [
//   {
//     "id": 1,
//     "productTitle": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
//     "productAmount": 109.95,
//     "createdBy" : "FakeApiStore@gmail.com",
//     "productDesc": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
//     "category": "men's clothing",
//     "productImage1": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
//     "productImage2": "https://fjallraven.com.au/cdn/shop/files/square_Mood_FW22_DanielBlom_Daypacks_9425_EXP_2025-08-01_b6927129-8aba-4e19-9f3a-7965f71c0245_200x200_crop_center.jpg?v=1693192570",
//     "productImage3" : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2Ffjallraven-foldsack-no-1-backpack-fits-15-laptops-dark-garnet--448389706658971383%2F&psig=AOvVaw1Qegzg_zuL-Zg0m-_gVGe7&ust=1721485056580000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCLDgz_Cls4cDFQAAAAAdAAAAABAS" ,
//     "rating": {
//       "rate": 3.9,
//       "count": 120
//     }
//   },
//   {
//     "id": 2,
//     "productTitle": "Mens Casual Premium Slim Fit T-Shirts ",
//     "productAmount": 22.3,
//     "createdBy" : "FakeApiStore@gmail.com",
//     "productDesc": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
//     "category": "men's clothing",
//     "productImage1": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
//     "productImage2": "https://hips.hearstapps.com/hmg-prod/images/index-slim-shirt-64bfe5c6e2852.jpg?crop=0.502xw:1.00xh;0.250xw,0&resize=1200:*",
//     "productImage3": "https://images-na.ssl-images-amazon.com/images/I/71btVA%2BWc%2BL._SS400_.jpg",
//     "rating": {
//       "rate": 4.1,
//       "count": 259
//     }
//   },
//   {
//     "id": 3,
//     "productTitle": "Mens Cotton Jacket",
//     "productAmount": 55.99,
//     "createdBy" : "FakeApiStore@gmail.com",
//     "productDesc": "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
//     "category": "men's clothing",
//     "productImage1": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
//     "productImage2": "https://m.media-amazon.com/images/I/8115qruvmLL._AC_SL1500_.jpg",
//     "productImage3": "https://m.media-amazon.com/images/I/81zOIq3TYtL._AC_UY350_.jpg",
//     "rating": {
//       "rate": 4.7,
//       "count": 500
//     }
//   },
//   {
//     "id": 4,
//     "productTitle": "Mens Casual Slim Fit",
//     "productAmount": 15.99,
//     "createdBy" : "FakeApiStore@gmail.com",
//     "productDesc": "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product productDesc.",
//     "category": "men's clothing",
//     "productImage1": "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
//     "productImage2": "https://leftoversclub.com/cdn/shop/files/Sa4aa0ad28b114c3ea7cc1bdbece1bc6cQ_e6992ceb-bd83-40c3-9a9b-aca1ac404760_600x.jpg?v=1716364145",
//     "productImage3": "https://putra.in/cdn/shop/files/WhatsAppImage2023-08-10at7.41.05PM_1200x.jpg?v=1691816685",
//     "rating": {
//       "rate": 2.1,
//       "count": 430
//     }
//   },
//   {
//     "id": 5,
//     "productTitle": "John Hardy Women's Legends Naga Gold & Silver Bracelet",
//     "productAmount": 695,
//     "createdBy" : "FakeApiStore@gmail.com",
//     "productDesc": "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
//     "category": "jewelery",
//     "productImage1": "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
//     "productImage2": "https://www.brinkersjewelers.com/wp-content/uploads/elementor/thumbs/9af41ebc4d93f1bf85ab81eb5eb535fe-5-qp136ee91qfszgfxo8g7j0e3rhwkeptiulmjpzp8l4.png",
//     "productImage3": "https://johnhardy.com/cdn/shop/files/BM65210_Front.jpg?v=1700588230&width=2000",
//     "rating": {
//       "rate": 4.6,
//       "count": 400
//     }
//   },
//   {
//     "id": 6,
//     "productTitle": "Solid Gold Petite Micropave ",
//     "productAmount": 168,
//     "createdBy" : "FakeApiStore@gmail.com",
//     "productDesc": "Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.",
//     "category": "jewelery",
//     "productImage1": "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
//     "productImage2": "https://5.imimg.com/data5/SELLER/Default/2023/1/JK/GZ/SF/17898218/rings-500x500.jpg",
//     "productImage3": "https://www.abhikajewels.com/cdn/shop/products/LR276-77b.jpg?v=1650022488",
//     "rating": {
//       "rate": 3.9,
//       "count": 70
//     }
//   },
//   {
//     "id": 7,
//     "productTitle": "White Gold Plated Princess",
//     "productAmount": 9.99,
//     "createdBy" : "FakeApiStore@gmail.com",
//     "productDesc": "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
//     "category": "jewelery",
//     "productImage1": "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
//     "productImage2": "https://ae01.alicdn.com/kf/Se8336f5455234e2986e959f4c30ae3cee/Certified-Moissanite-Princess-Cut-Engagement-Rings-for-Women-18K-White-Gold-Plated-D-Color-VVS1-Lab.jpg",
//     "productImage3": "https://5.imimg.com/data5/SELLER/Default/2024/1/373881784/JI/VR/FI/201863206/white-gold-princess-cut-diamond-ring-500x500.jpeg",
//     "rating": {
//       "rate": 3,
//       "count": 400
//     }
//   },
//   {
//     "id": 8,
//     "productTitle": "Pierced Owl Rose Gold Plated Stainless Steel Double",
//     "productAmount": 10.99,
//     "createdBy" : "FakeApiStore@gmail.com",
//     "productDesc": "Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel",
//     "category": "jewelery",
//     "productImage1": "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
//     "productImage2": "https://m.media-amazon.com/images/I/515SkXFJw+L._AC_UY1000_.jpg",
//     "productImage3": "https://images-na.ssl-images-amazon.com/images/I/61gj5eIF5jL._AC_UL210_SR210,210_.jpg",
//     "rating": {
//       "rate": 1.9,
//       "count": 100
//     }
//   },
//   {
//     "id": 9,
//     "productTitle": "WD 2TB Elements Portable External Hard Drive - USB 3.0 ",
//     "productAmount": 64,
//     "createdBy" : "FakeApiStore@gmail.com",
//     "productDesc": "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system",
//     "category": "electronics",
//     "productImage1": "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
//     "productImage2": "https://hafeezcenterlhr.com/wp-content/uploads/2022/09/2-263.png.webp",
//     "productImage3": "https://5.imimg.com/data5/SELLER/Default/2023/9/344459071/GK/XN/QM/159640662/western-digital-wd-2tb-elements-portable-hard-disk-drive-usb-3-0.png",
//     "rating": {
//       "rate": 3.3,
//       "count": 203
//     }
//   },
//   {
//     "id": 10,
//     "productTitle": "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
//     "productAmount": 109,
//     "createdBy" : "FakeApiStore@gmail.com",
//     "productDesc": "Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5” hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads The perfect balance of performance and reliability Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application.)",
//     "category": "electronics",
//     "productImage1": "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
//     "productImage2": "https://static-01.daraz.pk/p/c6482f88fddbc08f2c91399a68c238e9.jpg",
//     "productImage3": "https://down-id.img.susercontent.com/file/id-11134207-7qul6-ljdtreke5a8xf6",
//     "rating": {
//       "rate": 2.9,
//       "count": 470
//     }
//   },
//   {
//     "id": 11,
//     "productTitle": "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost",
//     "productAmount": 109,
//     "createdBy" : "FakeApiStore@gmail.com",
//     "productDesc": "3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds that enable faster bootup and improved overall system performance. The advanced SLC Cache Technology allows performance boost and longer lifespan 7mm slim design suitable for Ultrabooks and Ultra-slim notebooks. Supports TRIM command, Garbage Collection technology, RAID, and ECC (Error Checking & Correction) to provide the optimized performance and enhanced reliability.",
//     "category": "electronics",
//     "productImage1": "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
//     "productImage2": "https://www.jiomart.com/images/product/original/rvwc1lnrjc/silicon-power-ace-a55-512gb-2-5-sata-iii-ssd-product-images-orvwc1lnrjc-p602462996-3-202306151313.jpg?im=Resize=(420,420)",
//     "productImage3": "https://www.starcity.pk/wp-content/uploads/2022/01/SP-Silicon-Power-Ace-A55-SSD-512GB-2.jpg",
//     "rating": {
//       "rate": 4.8,
//       "count": 319
//     }
//   },
//   {
//     "id": 12,
//     "productTitle": "WD 4TB Gaming Drive with Playstation 4 Portable External Hard Drive",
//     "productAmount": 114,
//     "createdBy" : "FakeApiStore@gmail.com",
//     "productDesc": "Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek design with high capacity, 3-year manufacturer's limited warranty",
//     "category": "electronics",
//     "productImage1": "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg",
//     "productImage2": "https://gamingtrend.com/wp-content/uploads/2022/04/IMG_3626.jpg",
//     "productImage3": "https://m.media-amazon.com/images/I/51sHDrD4ZAL.jpg",
//     "rating": {
//       "rate": 4.8,
//       "count": 400
//     }
//   },
//   {
//     "id": 13,
//     "productTitle": "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS",
//     "productAmount": 599,
//     "createdBy" : "FakeApiStore@gmail.com",
//     "productDesc": "21. 5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology. No compatibility for VESA Mount Refresh Rate: 75Hz - Using HDMI port Zero-frame design | ultra-thin | 4ms response time | IPS panel Aspect ratio - 16: 9. Color Supported - 16. 7 million colors. Brightness - 250 nit Tilt angle -5 degree to 15 degree. Horizontal viewing angle-178 degree. Vertical viewing angle-178 degree 75 hertz",
//     "category": "electronics",
//     "productImage1": "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
//     "productImage2": "https://m.media-amazon.com/images/I/71GbO41HbYL._AC_UF894,1000_QL80_.jpg",
//     "productImage3": "https://m.media-amazon.com/images/I/81KNZoXRqIL._AC_UF894,1000_QL80_.jpg",
//     "rating": {
//       "rate": 2.9,
//       "count": 250
//     }
//   },
//   {
//     "id": 14,
//     "productTitle": "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor ",
//     "productAmount": 999.99,
//     "createdBy" : "FakeApiStore@gmail.com",
//     "productDesc": "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side QUANTUM DOT (QLED) TECHNOLOGY, HDR support and factory calibration provides stunningly realistic and accurate color and contrast 144HZ HIGH REFRESH RATE and 1ms ultra fast response time work to eliminate motion blur, ghosting, and reduce input lag",
//     "category": "electronics",
//     "productImage1": "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
//     "productImage2": "https://m.media-amazon.com/images/I/81Butfqtj5L._AC_UF1000,1000_QL80_.jpg",
//     "productImage3": "https://pcbworldtech.com/wp-content/uploads/2019/07/CHG90-NEW_1.jpg",
//     "rating": {
//       "rate": 2.2,
//       "count": 140
//     }
//   },
//   {
//     "id": 15,
//     "productTitle": "BIYLACLESEN Women's 3-in-1 Snowboard Winter Coats",
//     "productAmount": 56.99,
//     "createdBy" : "FakeApiStore@gmail.com",
//     "productDesc": "Note:The Jackets is US standard size, Please choose size as your usual wear Material: 100% Polyester; Detachable Liner Fabric: Warm Fleece. Detachable Functional Liner: Skin Friendly, Lightweigt and Warm.Stand Collar Liner jacket, keep you warm in cold weather. Zippered Pockets: 2 Zippered Hand Pockets, 2 Zippered Pockets on Chest (enough to keep cards or keys)and 1 Hidden Pocket Inside.Zippered Hand Pockets and Hidden Pocket keep your things secure. Humanized Design: Adjustable and Detachable Hood and Adjustable cuff to prevent the wind and water,for a comfortable fit. 3 in 1 Detachable Design provide more convenience, you can separate the coat and inner as needed, or wear it together. It is suitable for different season and help you adapt to different climates",
//     "category": "women's clothing",
//     "productImage1": "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
//     "productImage2": "https://m.media-amazon.com/images/I/71Ca0larSjL._AC_UY1000_.jpg",
//     "productImage3": "https://m.media-amazon.com/images/I/51XYlXm1dtL._AC_UY1100_.jpg",
//     "rating": {
//       "rate": 2.6,
//       "count": 235
//     }
//   },
//   {
//     "id": 16,
//     "productTitle": "Lock and Love Women's Leather Moto Biker Jacket",
//     "productAmount": 29.95,
//     "createdBy" : "FakeApiStore@gmail.com",
//     "productDesc": "100% POLYURETHANE(shell) 100% POLYESTER(lining) 75% POLYESTER 25% COTTON (SWEATER), Faux leather material for style and comfort / 2 pockets of front, 2-For-One Hooded denim style faux leather jacket, Button detail on waist / Detail stitching at sides, HAND WASH ONLY / DO NOT BLEACH / LINE DRY / DO NOT IRON",
//     "category": "women's clothing",
//     "productImage1": "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg",
//     "productImage2": "https://i.pinimg.com/736x/04/53/61/04536143c14537d05531f5287473532b.jpg",
//     "productImage3": "https://www.angeljackets.com/product_images/h/185/womens-purple-hooded-leather-jacket__84159_zoom.webp",
//     "rating": {
//       "rate": 2.9,
//       "count": 340
//     }
//   },
//   {
//     "id": 17,
//     "productTitle": "Rain Jacket Women Climbing Raincoats",
//     "productAmount": 39.99,
//     "createdBy" : "FakeApiStore@gmail.com",
//     "productDesc": "Lightweight perfet for trip or casual wear---Long sleeve with hooded, adjustable drawstring waist design. Button and zipper front closure raincoat, fully stripes Lined and The Raincoat has 2 side pockets are a good size to hold all kinds of things, it covers the hips, and the hood is generous but doesn't overdo it.Attached Cotton Lined Hood with Adjustable Drawstrings give it a real styled look.",
//     "category": "women's clothing",
//     "productImage1": "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg",
//     "productImage2": "https://m.media-amazon.com/images/I/61YcpcmX8SL._AC_UY1000_.jpg",
//     "productImage3": "https://m.media-amazon.com/images/I/719xHrCPqOL._AC_UY1000_.jpg",
//     "rating": {
//       "rate": 3.8,
//       "count": 679
//     }
//   },
//   {
//     "id": 18,
//     "productTitle": "MBJ Women's Solid Short Sleeve",
//     "productAmount": 9.85,
//     "createdBy" : "FakeApiStore@gmail.com",
//     "productDesc": "95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach, Lightweight fabric with great stretch for comfort, Ribbed on sleeves and neckline / Double stitching on bottom hem",
//     "category": "women's clothing",
//     "productImage1": "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg",
//     "productImage2": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbVulMK7E4hZT6jCfZX5TApJJF7SilYE8VJg&s",
//     "productImage3": "https://m.media-amazon.com/images/I/61TIKg6RESL._AC_UY1000_.jpg",
//     "rating": {
//       "rate": 4.7,
//       "count": 130
//     }
//   },
//   {
//     "id": 19,
//     "productTitle": "Opna Women's Short Sleeve",
//     "productAmount": 7.95,
//     "createdBy" : "FakeApiStore@gmail.com",
//     "productDesc": "100% Polyester, Machine wash, 100% cationic polyester interlock, Machine Wash & Pre Shrunk for a Great Fit, Lightweight, roomy and highly breathable with moisture wicking fabric which helps to keep moisture away, Soft Lightweight Fabric with comfortable V-neck collar and a slimmer fit, delivers a sleek, more feminine silhouette and Added Comfort",
//     "category": "women's clothing",
//     "productImage1": "https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg",
//     "productImage2": "https://m.media-amazon.com/images/I/5168Ru1a74L._AC_SL1000_.jpg",
//     "productImage3": "https://images-na.ssl-images-amazon.com/images/I/51MNPqXwxDL._SLDPMOBCAROUSELAUTOCROP288221_MCnd_AC_SR462,693_.jpg",
//     "rating": {
//       "rate": 4.5,
//       "count": 146
//     }
//   },
//   {
//     "id": 20,
//     "productTitle": "DANVOUY Womens T Shirt",
//     "productAmount": 12.99,
//     "createdBy" : "FakeApiStore@gmail.com",
//     "productDesc": "95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.",
//     "category": "women's clothing",
//     "productImage1": "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg",
//     "productImage2": "https://m.media-amazon.com/images/I/61A0tku7XxL._AC_UL1005_.jpg",
//     "productImage3": "https://i.pinimg.com/736x/5d/06/9b/5d069b30217c56951850272355cf6731.jpg",
//     "rating": {
//       "rate": 3.6,
//       "count": 145
//     }
//   }
// ]

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
    console.log("User he")
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
          <div class="product-card" >
            <img src="${productImage1}" alt="">
            <h4>${productTitle}</h4>
            <div>
              <span>$ ${productAmount}</span>
              <button id="${data.id}" data-id="${data.id}" onclick="productDetails(this)"><i class="fa-solid fa-arrow-right-to-bracket" style="padding: 8px;"></i></button>
            </div>
          </div>`;
    product_card_container.innerHTML += productCards;  
  });

  // Add fake products to Firestore
  // addFakeApiProducts();
}

// async function addFakeApiProducts(){
//   for (const product of fakeProductsArray) {
//     try {
//       await addDoc(collection(db, "Products"), product);
//       console.log("Document successfully written!");
//     } catch (error) {
//       console.error("Error writing document: ", error);
//     }
//   }
// }

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
