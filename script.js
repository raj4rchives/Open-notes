const products=[
 {name:"Sattu",sub:"High Protein · Gluten-Free · All-Natural",price:347,old:479,img:"images/sattu.jpg",tag:"BEST SELLER",category:"sattu",rating:"4.9"},
 {name:"Pranika: Breath & Glow Tea",sub:"Caffeine-Free · No Added Sugar",price:349,old:499,img:"images/pranika.jpg",tag:"NEW",category:"tea",rating:"4.9"},
 {name:"Masala Sattu",sub:"High Protein · Rich in Fiber",price:179,old:399,img:"images/masala-sattu.jpg",tag:"FAVOURITE",category:"sattu",rating:"4.8"},
 {name:"Premium Roasted Makhana",sub:"Light · Crunchy · Better Snacking",price:299,old:399,img:"images/makhana.jpg",tag:"POPULAR",category:"snacks",rating:"4.9"}
];
let cart=[];let currentCategory='all';let currentQuery='';let ascending=false;
const productBox=document.getElementById('products');
function renderProducts(){let list=products.filter(p=>(currentCategory==='all'||p.category===currentCategory)&&(`${p.name} ${p.sub}`).toLowerCase().includes(currentQuery.toLowerCase()));if(ascending)list=[...list].sort((a,b)=>a.price-b.price);else list=[...list].sort((a,b)=>products.indexOf(a)-products.indexOf(b));if(!list.length){productBox.innerHTML='<div class="no-results" style="grid-column:1/-1;text-align:center;padding:60px;color:#707872">No products found. Try another search.</div>';return}productBox.innerHTML=list.map((p)=>{const i=products.indexOf(p);return `<article class="card"><div class="pic"><img src="${p.img}" alt="${p.name}" loading="lazy"><span class="tag">${p.tag}</span><button class="heart" aria-label="Add ${p.name} to wishlist" onclick="toggleHeart(this)">♡</button></div><div class="info"><div class="rating">★★★★★ <span>(${p.rating})</span></div><h3>${p.name}</h3><div class="sub">${p.sub}</div><div class="price"><strong>₹${p.price}</strong><span class="old">₹${p.old}</span></div><button class="add" onclick="addToCart(${i})">Add to bag</button></div></article>`}).join('')}
function addToCart(i){cart.push(products[i]);updateCart();toggleCart(true);showToast(`${products[i].name} added to your bag`)}
function updateCart(){document.getElementById('count').textContent=cart.length;const body=document.getElementById('cartbody'),box=document.getElementById('totalbox');if(!cart.length){body.innerHTML='<div class="empty">Your bag is waiting.<br><small>Add something beautiful to your daily ritual.</small></div>';box.style.display='none';return}body.innerHTML=cart.map((p,i)=>`<div class="cartitem"><img src="${p.img}" alt="${p.name}"><div><h4>${p.name}</h4><p>₹${p.price}</p></div><button class="remove" aria-label="Remove ${p.name}" onclick="removeItem(${i})">×</button></div>`).join('');document.getElementById('total').textContent='₹'+cart.reduce((s,p)=>s+p.price,0);box.style.display='block'}
function removeItem(i){cart.splice(i,1);updateCart()}
function toggleCart(force){const d=document.getElementById('drawer'),o=document.getElementById('overlay');const open=force===true?true:force===false?false:!d.classList.contains('open');d.classList.toggle('open',open);o.classList.toggle('show',open);document.body.style.overflow=open?'hidden':''}
function toggleMenu(){document.getElementById('menu').classList.toggle('open')}
function toggleHeart(btn){btn.textContent=btn.textContent==='♡'?'♥':'♡';btn.classList.toggle('liked')}
function filterProducts(value){currentQuery=value;renderProducts()}
function filterCategory(category,btn){currentCategory=category;document.querySelectorAll('.category').forEach(x=>x.classList.remove('active'));btn.classList.add('active');renderProducts()}
function sortProducts(){ascending=!ascending;renderProducts();showToast(ascending?'Sorted: lowest price first':'Sorted: featured first')}
function focusSearch(){document.getElementById('shop').scrollIntoView({behavior:'smooth'});setTimeout(()=>document.getElementById('productSearch').focus(),500)}
function showToast(message){const t=document.getElementById('toast');t.textContent=message;t.classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>t.classList.remove('show'),2200)}
function subscribe(e){e.preventDefault();const input=document.getElementById('email');showToast('Welcome to Tejaswi');input.value=''}
renderProducts();updateCart();
