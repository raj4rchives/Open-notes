
const products=[
 {name:"Sattu",sub:"High Protein • Gluten-Free • All-Natural",price:347,old:479,img:"images/sattu.jpg",tag:"BEST SELLER"},
 {name:"Pranika: Breath & Glow Tea",sub:"Caffeine-Free • No Added Sugar",price:349,old:499,img:"images/pranika.jpg",tag:"NEW"},
 {name:"Masala Sattu",sub:"High Protein • Rich in Fiber",price:179,old:399,img:"images/masala-sattu.jpg",tag:"FAVOURITE"},
 {name:"Premium Roasted Makhana",sub:"Light • Crunchy • Better Snacking",price:299,old:399,img:"images/makhana.jpg",tag:"POPULAR"}
];
let cart=[];
const productBox=document.getElementById("products");
productBox.innerHTML=products.map((p,i)=>`<article class="card"><div class="pic"><img src="${p.img}" alt="${p.name}"><span class="tag">${p.tag}</span><button class="heart" onclick="this.textContent=this.textContent==='♡'?'♥':'♡'">♡</button></div><div class="info"><div class="rating">★★★★★ <span style="color:#888">(4.9)</span></div><h3>${p.name}</h3><div class="sub">${p.sub}</div><div class="price"><strong>₹${p.price}</strong><span class="old">₹${p.old}</span></div><button class="add" onclick="addToCart(${i})">Add to cart</button></div></article>`).join("");
function addToCart(i){cart.push(products[i]);updateCart();toggleCart(true)}
function updateCart(){document.getElementById("count").textContent=cart.length;const body=document.getElementById("cartbody"),box=document.getElementById("totalbox");if(!cart.length){body.innerHTML='<div class="empty">Your cart is empty.<br><small>Add something beautiful to your daily ritual.</small></div>';box.style.display="none";return}body.innerHTML=cart.map((p,i)=>`<div class="cartitem"><img src="${p.img}"><div style="flex:1"><h4>${p.name}</h4><p>₹${p.price}</p></div><button class="close" style="font-size:18px" onclick="removeItem(${i})">×</button></div>`).join("");document.getElementById("total").textContent="₹"+cart.reduce((s,p)=>s+p.price,0);box.style.display="block"}
function removeItem(i){cart.splice(i,1);updateCart()}
function toggleCart(force){const d=document.getElementById("drawer"),o=document.getElementById("overlay");const open=force===true?!d.classList.contains("open"):!d.classList.contains("open");d.classList.toggle("open",open);o.classList.toggle("show",open)}
function toggleMenu(){document.getElementById("menu").style.display=document.getElementById("menu").style.display==="block"?"none":"block"}
