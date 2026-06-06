# Graph Report - d:/roshop  (2026-05-23)

## Corpus Check
- Corpus is ~15,148 words - fits in a single context window. You may not need a graph.

## Summary
- 153 nodes · 186 edges · 29 communities (18 shown, 11 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 10 edges (avg confidence: 0.91)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Item Rendering & Filtering|Item Rendering & Filtering]]
- [[_COMMUNITY_Checkout & Payment Flow|Checkout & Payment Flow]]
- [[_COMMUNITY_Firebase Auth & Login|Firebase Auth & Login]]
- [[_COMMUNITY_Cart Management|Cart Management]]
- [[_COMMUNITY_Admin Order Panel|Admin Order Panel]]
- [[_COMMUNITY_Firestore Collections|Firestore Collections]]
- [[_COMMUNITY_Spin Wheel & Discounts|Spin Wheel & Discounts]]
- [[_COMMUNITY_Currency & Pricing|Currency & Pricing]]
- [[_COMMUNITY_Game Selection|Game Selection]]
- [[_COMMUNITY_Order History Page|Order History Page]]
- [[_COMMUNITY_Firebase Config|Firebase Config]]
- [[_COMMUNITY_Payment QR & Slip|Payment QR & Slip]]
- [[_COMMUNITY_Image Upload (ImgBB)|Image Upload (ImgBB)]]
- [[_COMMUNITY_Shop HTML Structure|Shop HTML Structure]]
- [[_COMMUNITY_Adopt Me Pet Images|Adopt Me Pet Images]]
- [[_COMMUNITY_MM2 Tier Filters|MM2 Tier Filters]]
- [[_COMMUNITY_User Profile & Balance|User Profile & Balance]]
- [[_COMMUNITY_Search & Filters|Search & Filters]]
- [[_COMMUNITY_Toast Notifications|Toast Notifications]]
- [[_COMMUNITY_Firebase Hosting Config|Firebase Hosting Config]]
- [[_COMMUNITY_Project Documentation|Project Documentation]]
- [[_COMMUNITY_Admin Item Images Tab|Admin Item Images Tab]]
- [[_COMMUNITY_Slip Lightbox|Slip Lightbox]]
- [[_COMMUNITY_Crypto Payment|Crypto Payment]]
- [[_COMMUNITY_TrueMoney Payment|TrueMoney Payment]]

## God Nodes (most connected - your core abstractions)
1. `renderItems()` - 11 edges
2. `submitSlip()` - 9 edges
3. `renderItems()` - 8 edges
4. `renderCart()` - 6 edges
5. `fetchItems()` - 6 edges
6. `Main Shop Page (index.html)` - 6 edges
7. `Firestore DB Instance` - 5 edges
8. `ITEMS Array (shop inventory)` - 5 edges
9. `RATES Exchange Rates Config` - 5 edges
10. `checkout()` - 5 edges

## Surprising Connections (you probably didn't know these)
- `GitHub Image Hosting Workflow` --rationale_for--> `ITEMS Array (shop inventory)`  [INFERRED]
  CLAUDE.md → script.js
- `THB to Robux Price Conversion Formula` --rationale_for--> `RATES Exchange Rates Config`  [INFERRED]
  CLAUDE.md → script.js
- `submitSlip()` --shares_data_with--> `Firestore orders Collection`  [EXTRACTED]
  script.js → CLAUDE.md
- `Items Migration from Hardcoded to Firestore` --rationale_for--> `ITEMS Array (shop inventory)`  [EXTRACTED]
  JOURNAL.md → script.js
- `MM2 Tier System (godlies/legendaries/rares/etc.)` --rationale_for--> `GAME_FILTERS Config`  [INFERRED]
  CLAUDE.md → script.js

## Hyperedges (group relationships)
- **Authentication Login Flow** — script_submitauth, script_onauthstatechanged, script_fetchitems, script_loaduserdiscount, firebaseinit_auth [EXTRACTED 1.00]
- **Cart to Checkout Order Flow** — script_addtocart, script_opencart, script_rendercart, script_checkout, script_openslipmodal, script_submitslip, firestore_orders_collection [EXTRACTED 1.00]
- **Currency and Item Rendering Flow** — script_fetchliverate, script_rates, script_currencyconfig, script_setcurrency, script_renderitems [EXTRACTED 1.00]
- **Firestore Backend Collections** — firebaseinit_db, firestore_items_collection, firestore_users_collection, firestore_orders_collection [EXTRACTED 1.00]
- **Firebase Auth Used Across All Pages** — admin_adminpage, index_mainshop, orders_myorders, spin_spinpage [EXTRACTED 1.00]
- **Firestore Collections Shared Across Pages** — firestore_orders, firestore_items, firestore_users, admin_adminpage, orders_myorders, spin_spinpage, index_mainshop [EXTRACTED 1.00]
- **Spin Wheel Discount System Flow** — spin_dospin, spin_onspincomplete, spin_showdiscountbox, firestore_users, spin_prizes [EXTRACTED 1.00]
- **Admin Order Management Workflow** — admin_loadorders, admin_renderorders, admin_markdelivered, admin_updatestats, firestore_orders [EXTRACTED 1.00]
- **Item Image Upload Flow (Admin -> ImgBB -> Firestore)** — admin_handleimageupload, admin_imgbb, firestore_items [EXTRACTED 1.00]
- **Auth Gate Pattern Across Authenticated Pages** — admin_authgate, index_authoverlay, orders_authgate, spin_spinpage [EXTRACTED 1.00]
- **SCB PromptPay Thai QR Payment System** — my_bank_acc_scb_promptpay_qr, my_bank_acc_scb_bank, my_bank_acc_promptpay_service, my_bank_acc_thai_qr_payment [EXTRACTED 1.00]

## Communities (29 total, 11 thin omitted)

### Community 0 - "Item Rendering & Filtering"
Cohesion: 0.15
Nodes (13): Payment Slip Upload Flow, Spin Wheel Feature, activeDiscount State Variable, addToCart(), cart Array State, checkout(), closeCart(), PAYMENT_LABELS Config (+5 more)

### Community 1 - "Checkout & Payment Flow"
Cohesion: 0.16
Nodes (17): Firestore Security Rules, GitHub Image Hosting Workflow, Firebase Hosting Config, Firebase Project (roshop-642dd), Firebase Auth Instance, Firestore DB Instance, Firebase Storage Instance, Firestore items Collection (+9 more)

### Community 2 - "Firebase Auth & Login"
Cohesion: 0.15
Nodes (14): MM2 Tier System (godlies/legendaries/rares/etc.), THB to Robux Price Conversion Formula, open.er-api.com Live Exchange Rate API, CURRENCY_CONFIG Config, fetchLiveRate(), GAME_FILTERS Config, GAME_LABELS Config, getFiltered() (+6 more)

### Community 3 - "Cart Management"
Cohesion: 0.12
Nodes (7): cart, CURRENCY_CONFIG, GAME_FILTERS, GAME_LABELS, ITEMS, PAYMENT_LABELS, RATES

### Community 4 - "Admin Order Panel"
Cohesion: 0.23
Nodes (14): Admin Dashboard Page, Firestore users Collection, firebase-init.js Initializer, Main Shop Page (index.html), script.js Main Logic Module, style.css Stylesheet, My Orders Page (orders.html), doSpin() Animation Function (+6 more)

### Community 5 - "Firestore Collections"
Cohesion: 0.22
Nodes (11): loadOrders() Admin Function, markDelivered() Function, renderOrders() Admin Function, updateStats() Function, viewSlip() Lightbox Function, Firestore orders Collection, Payment Method Selector (QR/TrueMoney/Crypto), Thai QR Payment Image (my bank acc.jpg) (+3 more)

### Community 6 - "Spin Wheel & Discounts"
Cohesion: 0.29
Nodes (8): addToCart(), closeSlipModal(), openCart(), removeFromCart(), renderCart(), showToast(), submitSlip(), updateCartCount()

### Community 7 - "Currency & Pricing"
Cohesion: 0.29
Nodes (7): fetchItems(), fetchLiveRate(), getFiltered(), handleSearch(), renderItems(), selectGame(), setFilter()

### Community 8 - "Game Selection"
Cohesion: 0.33
Nodes (6): handleImageUpload() Function (ImgBB), ImgBB Image Hosting API Integration, loadItems() Function, renderItemsAdmin() Function, showTab() Function, Firestore items Collection

### Community 9 - "Order History Page"
Cohesion: 0.40
Nodes (4): auth, db, firebaseConfig, storage

### Community 10 - "Firebase Config"
Cohesion: 0.50
Nodes (3): hosting, ignore, public

### Community 11 - "Payment QR & Slip"
Cohesion: 0.67
Nodes (4): PromptPay Payment Service, SCB (Siam Commercial Bank), SCB PromptPay Thai QR Payment Code, Thai QR Payment Standard

### Community 12 - "Image Upload (ImgBB)"
Cohesion: 0.50
Nodes (4): checkout(), closeCart(), handleOverlayClick(), openSlipModal()

### Community 13 - "Shop HTML Structure"
Cohesion: 0.67
Nodes (3): closeCurrencyMenu(), convertBalance(), setCurrency()

## Knowledge Gaps
- **38 isolated node(s):** `firebaseConfig`, `auth`, `db`, `storage`, `public` (+33 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `renderItems()` connect `Firebase Auth & Login` to `Checkout & Payment Flow`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **Why does `fetchItems()` connect `Checkout & Payment Flow` to `Firebase Auth & Login`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **Why does `submitSlip()` connect `Item Rendering & Filtering` to `Checkout & Payment Flow`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **What connects `firebaseConfig`, `auth`, `db` to the rest of the system?**
  _43 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Cart Management` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._