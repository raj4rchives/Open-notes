const OWNER_WHATSAPP = "91XXXXXXXXXX"; // Replace with Ram Store owner's WhatsApp number, e.g. 919876543210

const products = [
  {id:1,name:"Aashirvaad Atta",unit:"5 kg",price:285,cat:"Atta & Flour",icon:"🌾",tag:"POPULAR"},
  {id:2,name:"Fortune Chakki Atta",unit:"5 kg",price:265,cat:"Atta & Flour",icon:"🌾"},
  {id:3,name:"India Gate Basmati Rice",unit:"5 kg",price:510,cat:"Rice",icon:"🍚",tag:"BEST SELLER"},
  {id:4,name:"Everyday Rice",unit:"5 kg",price:285,cat:"Rice",icon:"🍚"},
  {id:5,name:"Toor Dal",unit:"1 kg",price:175,cat:"Dal & Pulses",icon:"🫘",tag:"POPULAR"},
  {id:6,name:"Moong Dal",unit:"1 kg",price:145,cat:"Dal & Pulses",icon:"🫘"},
  {id:7,name:"Masoor Dal",unit:"1 kg",price:125,cat:"Dal & Pulses",icon:"🫘"},
  {id:8,name:"Sugar",unit:"1 kg",price:48,cat:"Staples",icon:"🍬"},
  {id:9,name:"Tata Salt",unit:"1 kg",price:28,cat:"Staples",icon:"🧂"},
  {id:10,name:"Potato",unit:"1 kg",price:35,cat:"Vegetables",icon:"🥔",tag:"FRESH"},
  {id:11,name:"Onion",unit:"1 kg",price:40,cat:"Vegetables",icon:"🧅",tag:"FRESH"},
  {id:12,name:"Parle-G Biscuits",unit:"800 g",price:75,cat:"Biscuits",icon:"🍪",tag:"POPULAR"},
  {id:13,name:"Good Day Biscuits",unit:"600 g",price:95,cat:"Biscuits",icon:"🍪"},
  {id:14,name:"Lays Classic Chips",unit:"52 g",price:20,cat:"Chips & Snacks",icon:"🥔"},
  {id:15,name:"Kurkure Masala Munch",unit:"90 g",price:20,cat:"Chips & Snacks",icon:"🥨"},
  {id:16,name:"Haldiram's Bhujia",unit:"200 g",price:55,cat:"Chips & Snacks",icon:"🥨"},
  {id:17,name:"Tea",unit:"250 g",price:125,cat:"Tea & Beverages",icon:"🍵"},
  {id:18,name:"Instant Coffee",unit:"100 g",price:165,cat:"Tea & Beverages",icon:"☕"},
  {id:19,name:"Bath Soap",unit:"Pack of 4",price:120,cat:"Home & Personal",icon:"🧼"},
  {id:20,name:"Dishwash Bar",unit:"Pack of 3",price:45,cat:"Home & Personal",icon:"🧽"},
  {id:21,name:"Washing Powder",unit:"1 kg",price:85,cat:"Home & Personal",icon:"🧺"},
  {id:22,name:"Toilet Cleaner",unit:"500 ml",price:95,cat:"Home & Personal",icon:"🧴"},
  {id:23,name:"Refined Cooking Oil",unit:"1 L",price:135,cat:"Cooking Essentials",icon:"🫗",tag:"POPULAR"},
  {id:24,name:"Mustard Oil",unit:"1 L",price:155,cat:"Cooking Essentials",icon:"🫗"},
  {id:25,name:"Turmeric Powder",unit:"200 g",price:48,cat:"Masala",icon:"🟡"},
  {id:26,name:"Red Chilli Powder",unit:"200 g",price:62,cat:"Masala",icon:"🌶️"},
  {id:27,name:"Coriander Powder",unit:"200 g",price:55,cat:"Masala",icon:"🌿"},
  {id:28,name:"Tomato Ketchup",unit:"500 g",price:95,cat:"Sauces & Spreads",icon:"🍅"},
  {id:29,name:"Noodles",unit:"4 pack",price:72,cat:"Ready Foods",icon:"🍜"},
  {id:30,name:"Vermicelli",unit:"400 g",price:48,cat:"Ready Foods",icon:"🍜"}
];

let cart = JSON.parse(localStorage.getItem("ramStoreCart") || "{}");
let activeCat = "All";
let searchTerm = "";

const $ = s => document.querySelector(s);
const money = n => "₹" + n.toLocaleString("en-IN");

const categories = [
  ["All","🛒"],["Atta & Flour","🌾"],["Rice","🍚"],["Dal & Pulses","🫘"],
  ["Staples","🧂"],["Vegetables","🥔"],["Biscuits","🍪"],["Chips & Snacks","🥨"],
  ["Tea & Beverages","☕"],["Cooking Essentials","🫗"],["Masala","🌶️"],["Home & Personal","🧼"]
];

function saveCart(){localStorage.setItem("ramStoreCart",JSON.stringify(cart));}

function cartCount(){return Object.values(cart).reduce((a,b)=>a+b,0)}
function cartTotal(){return products.reduce((sum,p)=>sum+(cart[p.id]||0)*p.price,0)}
function selectedProducts(){return products.filter(p=>cart[p.id]>0)}

function renderCategories(){
  $("#categoryRow").innerHTML = categories.map(([name,icon])=>`
    <button class="cat ${activeCat===name?"active":""}" data-cat="${name}">
      <div class="cat-icon">${icon}</div><strong>${name}</strong>
    </button>`).join("");
  document.querySelectorAll(".cat").forEach(b=>b.onclick=()=>{
    activeCat=b.dataset.cat; renderCategories(); renderProducts();
  });
}

function filteredProducts(){
  let list=products.filter(p=>{
    const catOk=activeCat==="All"||p.cat===activeCat;
    const text=(p.name+" "+p.cat+" "+p.unit).toLowerCase();
    return catOk && text.includes(searchTerm.toLowerCase());
  });
  const sort=$("#sortSelect").value;
  if(sort==="low") list.sort((a,b)=>a.price-b.price);
  if(sort==="high") list.sort((a,b)=>b.price-a.price);
  if(sort==="name") list.sort((a,b)=>a.name.localeCompare(b.name));
  return list;
}

function renderProducts(){
  const list=filteredProducts();
  $("#resultCount").textContent=`${list.length} items`;
  $("#emptyState").hidden=list.length>0;
  $("#products").innerHTML=list.map(p=>{
    const q=cart[p.id]||0;
    return `<article class="product">
      <div class="product-visual">${p.tag?`<span class="tag">${p.tag}</span>`:""}${p.icon}</div>
      <h3>${p.name}</h3><p class="unit">${p.unit} • ${p.cat}</p>
      <div class="price-row"><span class="price">${money(p.price)}</span>
      ${q?`<div class="qty"><button data-dec="${p.id}">−</button><b>${q}</b><button data-inc="${p.id}">+</button></div>`:`<button class="add" data-add="${p.id}">+ Add</button>`}</div>
    </article>`;
  }).join("");
  document.querySelectorAll("[data-add]").forEach(b=>b.onclick=()=>changeQty(+b.dataset.add,1));
  document.querySelectorAll("[data-inc]").forEach(b=>b.onclick=()=>changeQty(+b.dataset.inc,1));
  document.querySelectorAll("[data-dec]").forEach(b=>b.onclick=()=>changeQty(+b.dataset.dec,-1));
}

function changeQty(id,delta){
  cart[id]=Math.max(0,(cart[id]||0)+delta);
  if(!cart[id]) delete cart[id];
  saveCart(); updateUI(); renderProducts();
  if(delta>0) toast("Added to your list");
}

function updateUI(){
  $("#cartCount").textContent=cartCount();
  $("#cartTotal").textContent=money(cartTotal());
  renderCart();
}

function renderCart(){
  const list=selectedProducts();
  $("#cartItems").innerHTML=list.length?list.map(p=>`
    <div class="cart-item">
      <div class="mini-icon">${p.icon}</div>
      <div><h4>${p.name}</h4><small>${p.unit} • ${money(p.price)} each</small></div>
      <div><div class="line-price">${money(p.price*(cart[p.id]||0))}</div>
      <div class="qty"><button data-dec="${p.id}">−</button><b>${cart[p.id]}</b><button data-inc="${p.id}">+</button></div></div>
    </div>`).join(""):`<div class="empty"><div>🛒</div><h3>Your list is empty</h3><p>Add groceries from the shop.</p></div>`;
  $("#cartItems").querySelectorAll("[data-inc]").forEach(b=>b.onclick=()=>changeQty(+b.dataset.inc,1));
  $("#cartItems").querySelectorAll("[data-dec]").forEach(b=>b.onclick=()=>changeQty(+b.dataset.dec,-1));
}

function openCart(){ $("#cartPanel").classList.add("open"); $("#overlay").classList.add("show"); }
function closeCart(){ $("#cartPanel").classList.remove("open"); $("#overlay").classList.remove("show"); }

function orderText(){
  const lines=selectedProducts().map(p=>`• ${p.name} — ${cart[p.id]} × ${p.unit} = ${money(p.price*cart[p.id])}`);
  return `RAM STORE — GROCERY ORDER\n\n${lines.join("\n")}\n\nEstimated total: ${money(cartTotal())}`;
}

function downloadList(extra={}){
  if(!selectedProducts().length){toast("Add at least one grocery first");return}
  let text=orderText();
  if(extra.name) text+=`\n\nCustomer: ${extra.name}\nPhone: ${extra.phone}\nAddress: ${extra.address}`;
  if(extra.note) text+=`\nNote: ${extra.note}`;
  text+="\n\nFinal price and delivery confirmed manually by Ram Store.";
  const blob=new Blob([text],{type:"text/plain"});
  const url=URL.createObjectURL(blob);
  const a=document.createElement("a"); a.href=url; a.download="ram-store-grocery-order.txt"; a.click();
  URL.revokeObjectURL(url); toast("Grocery list downloaded");
}

function openCheckout(){
  if(!selectedProducts().length){toast("Add groceries first");return}
  $("#orderSummary").innerHTML=selectedProducts().map(p=>`${p.name} × ${cart[p.id]}`).join("<br>")+`<hr><b>Estimated total: ${money(cartTotal())}</b>`;
  $("#checkoutModal").classList.add("show");
}
function closeCheckout(){$("#checkoutModal").classList.remove("show")}

function sendWhatsApp(e){
  e.preventDefault();
  if(OWNER_WHATSAPP.includes("X")){toast("Set the owner's WhatsApp number in app.js first");return}
  const name=$("#customerName").value.trim(),phone=$("#customerPhone").value.trim(),address=$("#customerAddress").value.trim(),note=$("#customerNote").value.trim();
  const msg=`Hello Ram Store! I want to place a grocery order.\n\nCustomer: ${name}\nPhone: ${phone}\nAddress: ${address}\n\n${orderText()}${note?`\n\nNote: ${note}`:""}\n\nPlease confirm availability, final amount and delivery time. I will pay offline as instructed by the store.`;
  window.open(`https://wa.me/${OWNER_WHATSAPP}?text=${encodeURIComponent(msg)}`,"_blank");
}

function toast(t){const el=$("#toast");el.textContent=t;el.classList.add("show");clearTimeout(window.__toast);window.__toast=setTimeout(()=>el.classList.remove("show"),2200)}

$("#searchToggle").onclick=()=>{ $("#searchWrap").classList.toggle("show"); $("#searchInput").focus(); };
$("#searchInput").oninput=e=>{searchTerm=e.target.value;renderProducts()};
$("#sortSelect").onchange=renderProducts;
$("#cartOpen").onclick=openCart; $("#heroCart").onclick=openCart; $("#cartClose").onclick=closeCart; $("#overlay").onclick=closeCart;
$("#checkoutBtn").onclick=()=>{closeCart();openCheckout()};
$("#modalClose").onclick=closeCheckout;
$("#checkoutModal").addEventListener("click",e=>{if(e.target.id==="checkoutModal")closeCheckout()});
$("#orderForm").onsubmit=sendWhatsApp;
$("#downloadBtn").onclick=()=>downloadList();
$("#modalDownload").onclick=()=>downloadList({name:$("#customerName").value,phone:$("#customerPhone").value,address:$("#customerAddress").value,note:$("#customerNote").value});
$("#year").textContent=new Date().getFullYear();

renderCategories();renderProducts();updateUI();
