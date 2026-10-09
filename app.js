/**
 * ========================================================
 * LODGEFINDER FUTO — SINGLE PAGE ENGINE (app.js)
 * Covers:
 * 1. Demo dataset with 6 realistic FUTO properties
 * 2. Client-side Router & Query-string parser
 * 3. Search & Multi-filter engine
 * 4. Transparent Fees Breakdown Calculator
 * 5. Dynamic WhatsApp Nigerian international URL formatter
 * 6. Landlord Submission (Pending workflow)
 * 7. Admin Dashboard (Approve / Reject / Delete)
 * 8. Supabase Client Integration Toggle
 * ========================================================
 */

// 6 REALISTIC DEMO LODGES (FUTO - Eziobodo & Umuchima)
const INITIAL_DEMO_LODGES = [
  {
    id: "futo-001",
    title: "Affordable Self-Contain in Eziobodo",
    area: "Eziobodo",
    property_type: "Self-Contain",
    annual_rent: 120000,
    caution_fee: 15000,
    agency_fee: 10000,
    agreement_fee: 5000,
    other_fees: 5000,
    bedrooms: 1,
    bathrooms: 1,
    has_water: true,
    has_electricity: true,
    has_private_toilet: true,
    has_kitchen: true,
    has_fenced_compound: true,
    distance_to_futo_km: 1.2,
    travel_time_minutes: 8,
    address: "Opposite Salvation Ministries, Eziobodo",
    landmark: "Old Eziobodo Market Junction",
    description: "Well-maintained student self-con with a dedicated prepaid meter, continuous borehole water supply, and security perimeter fencing. 8 minutes bike ride to FUTO School Gate.",
    landlord_name: "Elder Samuel Nwosu",
    phone: "08031234567",
    whatsapp_phone: "08031234567",
    status: "approved",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80"
    ],
    created_at: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: "futo-002",
    title: "Student Single Room in Umuchima",
    area: "Umuchima",
    property_type: "Single Room",
    annual_rent: 70000,
    caution_fee: 10000,
    agency_fee: 5000,
    agreement_fee: 5000,
    other_fees: null,
    bedrooms: 1,
    bathrooms: 1,
    has_water: true,
    has_electricity: false,
    has_private_toilet: false,
    has_kitchen: false,
    has_fenced_compound: true,
    distance_to_futo_km: 1.8,
    travel_time_minutes: 12,
    address: "Near Umuchima Primary Health Centre",
    landmark: "Umuchima Church Road",
    description: "Budget single room ideal for 100L or 200L students desiring an economical off-campus space. Shared clean water facility and night security guard.",
    landlord_name: "Caretaker Johnson",
    phone: "08149876543",
    whatsapp_phone: "08149876543",
    status: "approved",
    images: [
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80"
    ],
    created_at: new Date(Date.now() - 86400000 * 4).toISOString()
  },
  {
    id: "futo-003",
    title: "Modern Self-Contain in Umuchima",
    area: "Umuchima",
    property_type: "Self-Contain",
    annual_rent: 150000,
    caution_fee: 20000,
    agency_fee: 15000,
    agreement_fee: 10000,
    other_fees: 5000,
    bedrooms: 1,
    bathrooms: 1,
    has_water: true,
    has_electricity: true,
    has_private_toilet: true,
    has_kitchen: true,
    has_fenced_compound: true,
    distance_to_futo_km: 0.9,
    travel_time_minutes: 6,
    address: "Behind FUTO Umuchima Gate, Umuchima",
    landmark: "White House Bus Stop",
    description: "Recently tiled rooms, POP ceiling, individual water heater lines, high security gate with uniform security guards. Easy walking distance to campus lecture halls.",
    landlord_name: "Chief Emeka Ofordi",
    phone: "07062233445",
    whatsapp_phone: "07062233445",
    status: "approved",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80"
    ],
    created_at: new Date(Date.now() - 86400000 * 5).toISOString()
  },
  {
    id: "futo-004",
    title: "Budget Student Apartment in Eziobodo",
    area: "Eziobodo",
    property_type: "Self-Contain",
    annual_rent: 100000,
    caution_fee: 10000,
    agency_fee: 10000,
    agreement_fee: null,
    other_fees: null,
    bedrooms: 1,
    bathrooms: 1,
    has_water: true,
    has_electricity: true,
    has_private_toilet: true,
    has_kitchen: true,
    has_fenced_compound: false,
    distance_to_futo_km: 1.5,
    travel_time_minutes: 10,
    address: "Off Polytechnic Expressway, Eziobodo",
    landmark: "Winners Chapel Branch",
    description: "Quiet, affordable student haven. Large room space with personal bathroom and kitchenette. Paved road right in front of the building.",
    landlord_name: "Mrs. Ngozi Alvan",
    phone: "08023344556",
    whatsapp_phone: "08023344556",
    status: "approved",
    images: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
    ],
    created_at: new Date(Date.now() - 86400000 * 7).toISOString()
  },
  {
    id: "futo-005",
    title: "Executive One-Bedroom Flat in Umuchima",
    area: "Umuchima",
    property_type: "One-Bedroom Apartment",
    annual_rent: 200000,
    caution_fee: 25000,
    agency_fee: 20000,
    agreement_fee: 10000,
    other_fees: 10000,
    bedrooms: 1,
    bathrooms: 1,
    has_water: true,
    has_electricity: true,
    has_private_toilet: true,
    has_kitchen: true,
    has_fenced_compound: true,
    distance_to_futo_km: 1.1,
    travel_time_minutes: 7,
    address: "Off Umuchima Extension Road",
    landmark: "St. Peter Catholic Parish",
    description: "Ideal for senior undergrads or postgraduate scholars wanting high privacy. Includes private parlor, bedroom, visitor's restroom, and personal balcony.",
    landlord_name: "Engr. Paul Chukwuma",
    phone: "08091122334",
    whatsapp_phone: "08091122334",
    status: "approved",
    images: [
      "https://images.unsplash.com/photo-1502005229762-ee1b2b8ab32f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80"
    ],
    created_at: new Date(Date.now() - 86400000 * 8).toISOString()
  },
  {
    id: "futo-006",
    title: "Shared Student Accommodation in Eziobodo",
    area: "Eziobodo",
    property_type: "Shared Accommodation",
    annual_rent: 60000,
    caution_fee: 5000,
    agency_fee: 5000,
    agreement_fee: 3000,
    other_fees: null,
    bedrooms: 2,
    bathrooms: 1,
    has_water: true,
    has_electricity: true,
    has_private_toilet: false,
    has_kitchen: true,
    has_fenced_compound: true,
    distance_to_futo_km: 1.4,
    travel_time_minutes: 9,
    address: "Eziobodo Main Road",
    landmark: "FUTO Biker Terminal",
    description: "Roommate space in a 2-room flat. Low budget, good for students looking to split expenses. Steady generator pumping of borehole water.",
    landlord_name: "Brother Jude",
    phone: "08182233445",
    whatsapp_phone: "08182233445",
    status: "approved",
    images: [
      "https://images.unsplash.com/photo-1540518614846-7ede433c4ef4?auto=format&fit=crop&w=800&q=80"
    ],
    created_at: new Date(Date.now() - 86400000 * 10).toISOString()
  }
];

class LodgeFinderApp {
  constructor() {
    this.lodges = [];
    this.inspectionRequests = [];
    this.uploadedImagesCache = [];
    this.supabaseClient = null;
    this.isAdminAuthenticated = false;

    this.init();
  }

  init() {
    // 1. Load LocalStorage or fallback to INITIAL_DEMO_LODGES
    const saved = localStorage.getItem("lodgefinder_data");
    if (saved) {
      try {
        this.lodges = JSON.parse(saved);
      } catch (e) {
        this.lodges = [...INITIAL_DEMO_LODGES];
      }
    } else {
      this.lodges = [...INITIAL_DEMO_LODGES];
      this.persistData();
    }

    const savedInsp = localStorage.getItem("lodgefinder_inspections");
    this.inspectionRequests = savedInsp ? JSON.parse(savedInsp) : [];

    // 2. Check Supabase connection in localStorage
    const sbUrl = localStorage.getItem("sb_url");
    const sbKey = localStorage.getItem("sb_key");
    if (sbUrl && sbKey && window.supabase) {
      try {
        this.supabaseClient = window.supabase.createClient(sbUrl, sbKey);
        console.log("Supabase initialized successfully.");
      } catch (err) {
        console.warn("Could not connect to Supabase:", err);
      }
    }

    // 3. Setup Navigation & Hash Routing
    this.setupListeners();
    this.handleRoute();

    // 4. Initial Renders
    this.renderFeaturedLodges();
    this.renderAllLodges();
    this.renderAdminDashboard();
  }

  persistData() {
    localStorage.setItem("lodgefinder_data", JSON.stringify(this.lodges));
  }

  persistInspections() {
    localStorage.setItem("lodgefinder_inspections", JSON.stringify(this.inspectionRequests));
  }

  setupListeners() {
    window.addEventListener("hashchange", () => this.handleRoute());

    // Mobile Hamburger
    const toggleBtn = document.getElementById("navToggleBtn");
    const navMenu = document.getElementById("navMenu");
    if (toggleBtn && navMenu) {
      toggleBtn.addEventListener("click", () => {
        navMenu.classList.toggle("open");
      });
    }
  }

  // --- ROUTER & NAVIGATION ---
  handleRoute() {
    const rawHash = window.location.hash.slice(1) || "home";
    const [path, queryString] = rawHash.split("?");

    // Update active nav-links
    document.querySelectorAll(".nav-link").forEach(link => {
      const href = link.getAttribute("href") || "";
      if (href.includes(path)) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    // Close mobile nav on route change
    const navMenu = document.getElementById("navMenu");
    if (navMenu) navMenu.classList.remove("open");

    // Hide all view pages
    document.querySelectorAll(".page-view").forEach(view => view.classList.remove("active"));

    // Route matching
    if (path === "home" || path === "") {
      document.getElementById("view-home").classList.add("active");
      window.scrollTo(0, 0);
    } else if (path === "all-lodges") {
      document.getElementById("view-lodges").classList.add("active");
      if (queryString) {
        this.parseQueryParams(queryString);
      }
      this.applyFilters();
      window.scrollTo(0, 0);
    } else if (path === "details") {
      document.getElementById("view-details").classList.add("active");
      const params = new URLSearchParams(queryString);
      const lodgeId = params.get("id");
      this.renderDetailsPage(lodgeId);
      window.scrollTo(0, 0);
    } else if (path === "list-lodge") {
      document.getElementById("view-list-lodge").classList.add("active");
      window.scrollTo(0, 0);
    } else if (path === "admin") {
      document.getElementById("view-admin").classList.add("active");
      this.renderAdminDashboard();
      window.scrollTo(0, 0);
    }
  }

  navigate(pageKey) {
    if (pageKey === "home") window.location.hash = "#home";
    else if (pageKey === "lodges") window.location.hash = "#all-lodges";
    else if (pageKey === "list-lodge") window.location.hash = "#list-lodge";
    else if (pageKey === "admin") window.location.hash = "#admin";
  }

  filterByArea(areaName) {
    window.location.hash = `#all-lodges?area=${encodeURIComponent(areaName)}`;
  }

  parseQueryParams(queryString) {
    const params = new URLSearchParams(queryString);
    if (params.has("area")) {
      const areaEl = document.getElementById("filterArea");
      if (areaEl) areaEl.value = params.get("area");
    }
    if (params.has("type")) {
      const typeEl = document.getElementById("filterType");
      if (typeEl) typeEl.value = params.get("type");
    }
    if (params.has("maxPrice")) {
      const priceEl = document.getElementById("filterMaxPrice");
      if (priceEl) priceEl.value = params.get("maxPrice");
    }
  }

  // --- RENDERING PROPERTY CARDS ---
  createLodgeCardHTML(lodge) {
    const imgUrl = (lodge.images && lodge.images.length > 0)
      ? lodge.images[0]
      : "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80";

    const isSample = lodge.id.startsWith("futo-00");

    return `
      <article class="lodge-card">
        <div class="lodge-card-img-wrap">
          <img src="${imgUrl}" alt="${lodge.title}" class="lodge-card-img" loading="lazy">
          <div class="card-top-badges">
            <span class="badge ${isSample ? 'badge-sample' : 'badge-approved'}">
              ${isSample ? 'Sample Listing' : 'Verified Review'}
            </span>
            <span class="badge" style="background:rgba(16,42,67,0.85); color:#ffffff;">
              ${lodge.property_type}
            </span>
          </div>
        </div>

        <div class="lodge-card-body">
          <div class="lodge-price">
            ₦${Number(lodge.annual_rent).toLocaleString()} <span>/ year</span>
          </div>
          <h3 class="lodge-title" title="${lodge.title}">${lodge.title}</h3>
          <div class="lodge-area">
            📍 <strong>${lodge.area}</strong> • ${lodge.travel_time_minutes ? lodge.travel_time_minutes + ' min ride to gate' : 'Near Campus'}
          </div>

          <div class="lodge-features-row">
            ${lodge.has_water ? '<span class="feature-pill">💧 Water</span>' : ''}
            ${lodge.has_electricity ? '<span class="feature-pill">⚡ Light</span>' : ''}
            ${lodge.has_private_toilet ? '<span class="feature-pill">🚽 Toilet</span>' : ''}
            ${lodge.has_kitchen ? '<span class="feature-pill">🍳 Kitchen</span>' : ''}
            ${lodge.has_fenced_compound ? '<span class="feature-pill">🛡️ Fenced</span>' : ''}
          </div>

          <div class="lodge-card-footer">
            <span style="font-size:0.8rem; color:var(--secondary); font-weight:700;">● Available</span>
            <button class="btn btn-outline" style="padding:0.45rem 0.9rem; font-size:0.85rem;" onclick="location.hash='#details?id=${lodge.id}'">
              View Details
            </button>
          </div>
        </div>
      </article>
    `;
  }

  renderFeaturedLodges() {
    const grid = document.getElementById("featuredLodgesGrid");
    if (!grid) return;
    const featured = this.lodges.filter(l => l.status === "approved").slice(0, 6);
    grid.innerHTML = featured.map(l => this.createLodgeCardHTML(l)).join("");
  }

  // --- ALL LODGES / FILTER LOGIC ---
  handleHeroSearch(event) {
    event.preventDefault();
    const area = document.getElementById("heroArea").value;
    const type = document.getElementById("heroType").value;
    const maxBudget = document.getElementById("heroMaxBudget").value;

    const query = new URLSearchParams();
    if (area !== "All") query.set("area", area);
    if (type !== "All") query.set("type", type);
    if (maxBudget !== "99999999") query.set("maxPrice", maxBudget);

    window.location.hash = `#all-lodges?${query.toString()}`;
  }

  applyFilters() {
    const keyword = (document.getElementById("filterKeyword")?.value || "").toLowerCase().trim();
    const area = document.getElementById("filterArea")?.value || "All";
    const type = document.getElementById("filterType")?.value || "All";
    const maxPrice = Number(document.getElementById("filterMaxPrice")?.value || 99999999);

    const fWater = document.getElementById("fWater")?.checked || false;
    const fLight = document.getElementById("fLight")?.checked || false;
    const fToilet = document.getElementById("fToilet")?.checked || false;
    const fKitchen = document.getElementById("fKitchen")?.checked || false;
    const fFence = document.getElementById("fFence")?.checked || false;

    const sortBy = document.getElementById("sortBy")?.value || "newest";

    // Filter rule: only approved listings are displayed publicly
    let results = this.lodges.filter(lodge => lodge.status === "approved");

    if (keyword) {
      results = results.filter(l =>
        l.title.toLowerCase().includes(keyword) ||
        l.description.toLowerCase().includes(keyword) ||
        l.address.toLowerCase().includes(keyword)
      );
    }

    if (area !== "All") {
      results = results.filter(l => l.area === area);
    }

    if (type !== "All") {
      results = results.filter(l => l.property_type === type);
    }

    if (maxPrice) {
      results = results.filter(l => Number(l.annual_rent) <= maxPrice);
    }

    if (fWater) results = results.filter(l => l.has_water);
    if (fLight) results = results.filter(l => l.has_electricity);
    if (fToilet) results = results.filter(l => l.has_private_toilet);
    if (fKitchen) results = results.filter(l => l.has_kitchen);
    if (fFence) results = results.filter(l => l.has_fenced_compound);

    // Sorting
    if (sortBy === "price-asc") {
      results.sort((a, b) => Number(a.annual_rent) - Number(b.annual_rent));
    } else if (sortBy === "price-desc") {
      results.sort((a, b) => Number(b.annual_rent) - Number(a.annual_rent));
    } else {
      results.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }

    this.renderAllLodges(results);
  }

  resetFilters() {
    const kw = document.getElementById("filterKeyword"); if (kw) kw.value = "";
    const ar = document.getElementById("filterArea"); if (ar) ar.value = "All";
    const ty = document.getElementById("filterType"); if (ty) ty.value = "All";
    const mp = document.getElementById("filterMaxPrice"); if (mp) mp.value = "99999999";
    const fw = document.getElementById("fWater"); if (fw) fw.checked = false;
    const fl = document.getElementById("fLight"); if (fl) fl.checked = false;
    const ft = document.getElementById("fToilet"); if (ft) ft.checked = false;
    const fk = document.getElementById("fKitchen"); if (fk) fk.checked = false;
    const ff = document.getElementById("fFence"); if (ff) ff.checked = false;

    this.applyFilters();
  }

  renderAllLodges(list = null) {
    const container = document.getElementById("allLodgesGrid");
    const countEl = document.getElementById("resultsCount");
    if (!container) return;

    const data = list !== null ? list : this.lodges.filter(l => l.status === "approved");

    if (countEl) {
      countEl.innerText = `Showing ${data.length} available accommodations`;
    }

    if (data.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 4rem 1rem; text-align: center; background:#fff; border-radius:12px; border:1px solid #e2e8f0;">
          <h3 style="color:#102A43; margin-bottom:0.5rem;">No Lodges Found Matching Your Criteria</h3>
          <p style="color:#64748b; margin-bottom:1.5rem;">Try relaxing your budget, clearing facility checkboxes, or switching areas.</p>
          <button class="btn btn-secondary" onclick="app.resetFilters()">Clear Filters</button>
        </div>
      `;
      return;
    }

    container.innerHTML = data.map(l => this.createLodgeCardHTML(l)).join("");
  }

  // --- SINGLE LODGE DETAILS VIEW ---
  renderDetailsPage(lodgeId) {
    const container = document.getElementById("lodgeDetailsContainer");
    if (!container) return;

    const lodge = this.lodges.find(l => l.id === lodgeId);

    if (!lodge) {
      container.innerHTML = `
        <div style="text-align:center; padding:5rem 1rem;">
          <h2>Lodge Not Found</h2>
          <p style="color:var(--text-muted); margin:1rem 0 2rem 0;">The requested listing could not be found or has been removed.</p>
          <button class="btn btn-primary" onclick="app.navigate('lodges')">Return to Listings</button>
        </div>
      `;
      return;
    }

    // Transparent Pricing Calculation
    const rent = Number(lodge.annual_rent) || 0;
    const caution = lodge.caution_fee !== null ? Number(lodge.caution_fee) : null;
    const agency = lodge.agency_fee !== null ? Number(lodge.agency_fee) : null;
    const agreement = lodge.agreement_fee !== null ? Number(lodge.agreement_fee) : null;
    const other = lodge.other_fees !== null ? Number(lodge.other_fees) : null;

    let hasUnknownFee = (caution === null || agency === null || agreement === null || other === null);
    let totalInitial = rent + (caution || 0) + (agency || 0) + (agreement || 0) + (other || 0);

    // Format WhatsApp Link
    const waUrl = this.formatWhatsAppLink(lodge);

    // Primary image
    const images = lodge.images && lodge.images.length > 0 ? lodge.images : [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80"
    ];

    container.innerHTML = `
      <div style="margin-bottom:1.5rem;">
        <a href="#all-lodges" style="color:var(--text-muted); font-size:0.9rem;">← Back to Lodges</a>
      </div>

      <!-- Image Gallery -->
      <div class="gallery-grid">
        <div class="main-photo-wrap">
          <img id="mainGalleryImg" src="${images[0]}" alt="${lodge.title}">
        </div>
        <div class="thumbnail-col">
          ${images.map((img, i) => `
            <img src="${img}" alt="Thumbnail ${i+1}" class="${i === 0 ? 'active-thumb' : ''}" onclick="app.switchMainPhoto('${img}', this)">
          `).join("")}
        </div>
      </div>

      <!-- Content Split -->
      <div class="details-columns">
        <div>
          <div class="details-main-box">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:1rem; flex-wrap:wrap; gap:0.5rem;">
              <div>
                <span class="badge ${lodge.id.startsWith('futo-00') ? 'badge-sample' : 'badge-approved'}">
                  ${lodge.id.startsWith('futo-00') ? 'Demo Record' : 'Admin Approved'}
                </span>
                <h1 style="font-size:2rem; margin-top:0.4rem;">${lodge.title}</h1>
                <p style="color:var(--text-muted); font-size:0.95rem;">
                  📍 ${lodge.address} (${lodge.area}) ${lodge.landmark ? '• Landmark: ' + lodge.landmark : ''}
                </p>
              </div>
              <div style="text-align:right;">
                <div style="font-size:2rem; font-weight:800; color:var(--primary);">
                  ₦${rent.toLocaleString()}
                </div>
                <div style="font-size:0.85rem; color:var(--text-muted);">Annual Rent</div>
              </div>
            </div>

            <hr style="border:none; border-top:1px solid var(--border-color); margin:1.5rem 0;">

            <h3 style="margin-bottom:0.75rem;">Property Description</h3>
            <p style="color:#334155; line-height:1.8; margin-bottom:1.75rem;">${lodge.description}</p>

            <h3 style="margin-bottom:1rem;">Verified Facilities</h3>
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem; margin-bottom:2rem;">
              <div style="padding:0.75rem; border:1px solid var(--border-color); border-radius:8px;">
                💧 Water: <strong>${lodge.has_water ? 'Running Borehole' : 'Not Provided'}</strong>
              </div>
              <div style="padding:0.75rem; border:1px solid var(--border-color); border-radius:8px;">
                ⚡ Light: <strong>${lodge.has_electricity ? 'Steady Meter' : 'No Dedicated Line'}</strong>
              </div>
              <div style="padding:0.75rem; border:1px solid var(--border-color); border-radius:8px;">
                🚽 Toilet: <strong>${lodge.has_private_toilet ? 'Private En-Suite' : 'Shared Facility'}</strong>
              </div>
              <div style="padding:0.75rem; border:1px solid var(--border-color); border-radius:8px;">
                🍳 Kitchen: <strong>${lodge.has_kitchen ? 'Personal Kitchen' : 'No Kitchen'}</strong>
              </div>
              <div style="padding:0.75rem; border:1px solid var(--border-color); border-radius:8px;">
                🛡️ Security: <strong>${lodge.has_fenced_compound ? 'Fenced & Gated' : 'Open Compound'}</strong>
              </div>
            </div>

            <!-- Safety Note -->
            <div style="background:#fffbeb; border-left:4px solid #d97706; padding:1.25rem; border-radius:0 8px 8px 0;">
              <h4 style="color:#92400e; margin-bottom:0.25rem;">Safety Inspection Notice</h4>
              <p style="color:#b45309; font-size:0.88rem;">
                Always inspect the property and confirm the landlord or caretaker's identity in person before making any payment.
                LodgeFinder does not guarantee a property solely because it appears on the website.
              </p>
            </div>
          </div>
        </div>

        <!-- Sidebar: Pricing Calculation & CTAs -->
        <aside>
          <div class="pricing-breakdown-card">
            <h3 style="margin-bottom:1.25rem;">Cost Breakdown</h3>

            <div class="pricing-row">
              <span>Annual Rent</span>
              <strong>₦${rent.toLocaleString()}</strong>
            </div>

            <div class="pricing-row">
              <span>Caution Deposit</span>
              <strong>${caution !== null ? '₦' + caution.toLocaleString() : '<span style="color:#94a3b8">Not specified</span>'}</strong>
            </div>

            <div class="pricing-row">
              <span>Agency Charge</span>
              <strong>${agency !== null ? '₦' + agency.toLocaleString() : '<span style="color:#94a3b8">Not specified</span>'}</strong>
            </div>

            <div class="pricing-row">
              <span>Legal / Agreement</span>
              <strong>${agreement !== null ? '₦' + agreement.toLocaleString() : '<span style="color:#94a3b8">Not specified</span>'}</strong>
            </div>

            <div class="pricing-row">
              <span>Other Utilities</span>
              <strong>${other !== null ? '₦' + other.toLocaleString() : '<span style="color:#94a3b8">Not specified</span>'}</strong>
            </div>

            <div class="pricing-row total-row">
              <span>Estimated Initial Total</span>
              <span>₦${totalInitial.toLocaleString()}${hasUnknownFee ? '*' : ''}</span>
            </div>

            ${hasUnknownFee ? `
              <p style="font-size:0.75rem; color:var(--text-muted); margin-top:0.4rem;">
                * Some secondary fees are marked "Not specified". Confirm these charges with the caretaker directly.
              </p>
            ` : ''}

            <div style="margin-top:2rem; display:flex; flex-direction:column; gap:0.75rem;">
              <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="width:100%; text-align:center;">
                💬 Contact on WhatsApp
              </a>

              <button class="btn btn-primary" style="width:100%;" onclick="app.openInspectionModal('${lodge.id}')">
                📅 I Want to Inspect
              </button>
            </div>

            <div style="margin-top:1.5rem; text-align:center;">
              <p style="font-size:0.85rem; color:var(--text-muted);">
                Landlord: <strong>${lodge.landlord_name}</strong><br>
                Phone: <strong>${lodge.phone}</strong>
              </p>
            </div>
          </div>
        </aside>
      </div>
    `;
  }

  switchMainPhoto(imgSrc, thumbEl) {
    const mainImg = document.getElementById("mainGalleryImg");
    if (mainImg) mainImg.src = imgSrc;

    document.querySelectorAll(".thumbnail-col img").forEach(el => el.classList.remove("active-thumb"));
    if (thumbEl) thumbEl.classList.add("active-thumb");
  }

  // --- DYNAMIC NIGERIAN WHATSAPP FORMATTER ---
  formatWhatsAppLink(lodge) {
    let rawNumber = lodge.whatsapp_phone || lodge.phone || "";
    // Clean all non-digits
    let clean = rawNumber.replace(/\D/g, "");

    // Normalize Nigerian 080... to 23480...
    if (clean.startsWith("0")) {
      clean = "234" + clean.substring(1);
    } else if (clean.startsWith("234")) {
      // already normalized
    } else if (clean.length === 10) {
      clean = "234" + clean;
    }

    const message = `Hello, I found your lodge on LodgeFinder. I am interested in the "${lodge.title}" in ${lodge.area}, listed at ₦${Number(lodge.annual_rent).toLocaleString()} per year. Is it still available? I would like to arrange an inspection.`;

    return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;
  }

  // --- INSPECTION REQUEST MODAL ---
  openInspectionModal(lodgeId) {
    document.getElementById("inspLodgeId").value = lodgeId;
    document.getElementById("inspectionModal").classList.add("active");
  }

  closeInspectionModal() {
    document.getElementById("inspectionModal").classList.remove("active");
    document.getElementById("inspectionForm").reset();
  }

  submitInspectionRequest(event) {
    event.preventDefault();
    const lodgeId = document.getElementById("inspLodgeId").value;
    const studentName = document.getElementById("inspName").value.trim();
    const studentPhone = document.getElementById("inspPhone").value.trim();
    const preferredDate = document.getElementById("inspDate").value;
    const message = document.getElementById("inspMsg").value.trim();

    const newRequest = {
      id: "insp-" + Date.now(),
      lodge_id: lodgeId,
      student_name: studentName,
      student_phone: studentPhone,
      preferred_date: preferredDate,
      message: message || "No special note",
      status: "Pending",
      created_at: new Date().toISOString()
    };

    this.inspectionRequests.push(newRequest);
    this.persistInspections();

    // If Supabase is connected, sync remotely
    if (this.supabaseClient) {
      this.supabaseClient
        .from("inspection_requests")
        .insert([{
          lodge_id: lodgeId,
          student_name: studentName,
          student_phone: studentPhone,
          preferred_date: preferredDate,
          message: message,
          status: "Pending"
        }])
        .then(({ error }) => {
          if (error) console.error("Supabase error inserting inspection request:", error);
        });
    }

    alert(`Thank you, ${studentName}! Your inspection booking has been submitted. The caretaker will be in touch on ${studentPhone}.`);
    this.closeInspectionModal();
    this.renderAdminDashboard();
  }

  // --- LANDLORD SUBMISSION FORM (LIST YOUR LODGE) ---
  handleImageSelection(event) {
    const files = event.target.files;
    const previewContainer = document.getElementById("imagePreviewContainer");
    previewContainer.innerHTML = "";
    this.uploadedImagesCache = [];

    if (files.length > 4) {
      alert("Please select a maximum of 4 photos for this demonstration.");
      event.target.value = "";
      return;
    }

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Url = e.target.result;
        this.uploadedImagesCache.push(base64Url);

        const img = document.createElement("img");
        img.src = base64Url;
        img.style.width = "70px";
        img.style.height = "70px";
        img.style.objectFit = "cover";
        img.style.borderRadius = "6px";
        img.style.border = "1px solid #cbd5e1";
        previewContainer.appendChild(img);
      };
      reader.readAsDataURL(file);
    });
  }

  handleLodgeSubmission(event) {
    event.preventDefault();

    const title = document.getElementById("subTitle").value.trim();
    const area = document.getElementById("subArea").value;
    const property_type = document.getElementById("subType").value;
    const annual_rent = Number(document.getElementById("subRent").value);

    const caution_fee = document.getElementById("subCaution").value ? Number(document.getElementById("subCaution").value) : null;
    const agency_fee = document.getElementById("subAgency").value ? Number(document.getElementById("subAgency").value) : null;
    const agreement_fee = document.getElementById("subAgreement").value ? Number(document.getElementById("subAgreement").value) : null;
    const other_fees = document.getElementById("subOtherFees").value ? Number(document.getElementById("subOtherFees").value) : null;

    const address = document.getElementById("subAddress").value.trim();
    const description = document.getElementById("subDescription").value.trim();

    const has_water = document.getElementById("subWater").checked;
    const has_electricity = document.getElementById("subLight").checked;
    const has_private_toilet = document.getElementById("subToilet").checked;
    const has_kitchen = document.getElementById("subKitchen").checked;
    const has_fenced_compound = document.getElementById("subFence").checked;

    const landlord_name = document.getElementById("subLandlordName").value.trim();
    const phone = document.getElementById("subPhone").value.trim();
    const whatsapp_phone = document.getElementById("subWhatsapp").value.trim() || phone;
    const email = document.getElementById("subEmail").value.trim() || null;

    // Default fallback image if none uploaded
    const images = this.uploadedImagesCache.length > 0 ? [...this.uploadedImagesCache] : [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80"
    ];

    // CRITICAL SECURITY RULE: Public submissions ALWAYS begin with 'pending' status
    const newLodge = {
      id: "usr-" + Date.now(),
      title,
      area,
      property_type,
      annual_rent,
      caution_fee,
      agency_fee,
      agreement_fee,
      other_fees,
      bedrooms: 1,
      bathrooms: 1,
      address,
      landmark: "Near " + address,
      description,
      has_water,
      has_electricity,
      has_private_toilet,
      has_kitchen,
      has_fenced_compound,
      landlord_name,
      phone,
      whatsapp_phone,
      email,
      status: "pending",
      images,
      created_at: new Date().toISOString()
    };

    this.lodges.unshift(newLodge);
    this.persistData();

    // If Supabase live connection exists, insert as pending
    if (this.supabaseClient) {
      this.supabaseClient
        .from("lodges")
        .insert([{
          title,
          area,
          property_type,
          annual_rent,
          caution_fee,
          agency_fee,
          agreement_fee,
          other_fees,
          address,
          description,
          has_water,
          has_electricity,
          has_private_toilet,
          has_kitchen,
          has_fenced_compound,
          landlord_name,
          phone,
          whatsapp_phone,
          status: "pending"
        }])
        .then(({ data, error }) => {
          if (error) console.error("Supabase insert error:", error);
        });
    }

    alert("Your lodge has been submitted successfully! Our team will review your listing before it appears on LodgeFinder.");
    document.getElementById("submitLodgeForm").reset();
    document.getElementById("imagePreviewContainer").innerHTML = "";
    this.uploadedImagesCache = [];

    // Redirect to Admin dashboard so user can test the approval workflow
    window.location.hash = "#admin";
  }

  // --- ADMINISTRATOR DASHBOARD ---
  renderAdminDashboard() {
    const authControls = document.getElementById("adminAuthControls");
    const totalEl = document.getElementById("statTotal");
    const pendingEl = document.getElementById("statPending");
    const approvedEl = document.getElementById("statApproved");
    const inspCountEl = document.getElementById("statInspections");
    const tableBody = document.getElementById("adminTableBody");
    const inspTableBody = document.getElementById("adminInspectionsBody");

    if (!tableBody) return;

    const total = this.lodges.length;
    const pending = this.lodges.filter(l => l.status === "pending").length;
    const approved = this.lodges.filter(l => l.status === "approved").length;
    const inspections = this.inspectionRequests.length;

    if (totalEl) totalEl.innerText = total;
    if (pendingEl) pendingEl.innerText = pending;
    if (approvedEl) approvedEl.innerText = approved;
    if (inspCountEl) inspCountEl.innerText = inspections;

    // Login/Logout button simulation
    if (authControls) {
      authControls.innerHTML = this.isAdminAuthenticated
        ? `<span style="margin-right:1rem; font-size:0.9rem; color:var(--secondary);">● Logged in as Admin</span>
           <button class="btn btn-outline" onclick="app.toggleAdminAuth(false)">Log Out</button>`
        : `<button class="btn btn-primary" onclick="app.toggleAdminAuth(true)">Enter Admin Mode</button>`;
    }

    // Properties Table
    tableBody.innerHTML = this.lodges.map(lodge => {
      let statusBadge = "";
      if (lodge.status === "approved") statusBadge = `<span class="badge badge-approved">Approved</span>`;
      else if (lodge.status === "pending") statusBadge = `<span class="badge badge-pending">Pending</span>`;
      else statusBadge = `<span class="badge badge-rejected">Rejected</span>`;

      return `
        <tr>
          <td>
            <strong>${lodge.title}</strong><br>
            <small style="color:var(--text-muted);">${lodge.property_type}</small>
          </td>
          <td>${lodge.area}</td>
          <td>₦${Number(lodge.annual_rent).toLocaleString()}</td>
          <td>${lodge.landlord_name}<br><small>${lodge.phone}</small></td>
          <td>${statusBadge}</td>
          <td>
            <div style="display:flex; gap:0.4rem;">
              ${lodge.status !== 'approved' ? `
                <button class="btn btn-secondary" style="padding:0.3rem 0.6rem; font-size:0.75rem;" onclick="app.updateLodgeStatus('${lodge.id}', 'approved')">Approve</button>
              ` : ''}
              ${lodge.status !== 'rejected' ? `
                <button class="btn btn-outline" style="padding:0.3rem 0.6rem; font-size:0.75rem;" onclick="app.updateLodgeStatus('${lodge.id}', 'rejected')">Reject</button>
              ` : ''}
              <button class="btn btn-danger" style="padding:0.3rem 0.6rem; font-size:0.75rem;" onclick="app.deleteLodge('${lodge.id}')">Delete</button>
            </div>
          </td>
        </tr>
      `;
    }).join("");

    // Inspection Inquiries Table
    if (inspTableBody) {
      if (this.inspectionRequests.length === 0) {
        inspTableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:var(--text-muted); padding:2rem;">No inspection requests recorded yet.</td></tr>`;
      } else {
        inspTableBody.innerHTML = this.inspectionRequests.map(item => `
          <tr>
            <td><strong>${item.student_name}</strong></td>
            <td>${item.student_phone}</td>
            <td><code>${item.lodge_id}</code></td>
            <td>${item.preferred_date}</td>
            <td><small>${item.message}</small></td>
            <td><span class="badge badge-pending">${item.status}</span></td>
          </tr>
        `).join("");
      }
    }
  }

  toggleAdminAuth(status) {
    this.isAdminAuthenticated = status;
    this.renderAdminDashboard();
  }

  updateLodgeStatus(id, newStatus) {
    const lodge = this.lodges.find(l => l.id === id);
    if (!lodge) return;

    lodge.status = newStatus;
    this.persistData();
    this.renderFeaturedLodges();
    this.renderAllLodges();
    this.renderAdminDashboard();

    // Supabase Sync if active
    if (this.supabaseClient) {
      this.supabaseClient
        .from("lodges")
        .update({ status: newStatus })
        .eq("id", id)
        .then(({ error }) => {
          if (error) console.error("Supabase status update error:", error);
        });
    }

    alert(`Listing marked as ${newStatus.toUpperCase()}.`);
  }

  deleteLodge(id) {
    const confirmed = confirm("Are you sure you want to permanently delete this listing?");
    if (!confirmed) return;

    this.lodges = this.lodges.filter(l => l.id !== id);
    this.persistData();
    this.renderFeaturedLodges();
    this.renderAllLodges();
    this.renderAdminDashboard();

    if (this.supabaseClient) {
      this.supabaseClient
        .from("lodges")
        .delete()
        .eq("id", id)
        .then(({ error }) => {
          if (error) console.error("Supabase delete error:", error);
        });
    }
  }

  // --- SUPABASE CONFIG MODAL ---
  showSupabaseModal() {
    const modal = document.getElementById("supabaseModal");
    if (modal) modal.classList.add("active");
  }

  closeSupabaseModal() {
    const modal = document.getElementById("supabaseModal");
    if (modal) modal.classList.remove("active");
  }

  saveSupabaseConfig(event) {
    event.preventDefault();
    const url = document.getElementById("sbUrl").value.trim();
    const key = document.getElementById("sbKey").value.trim();

    if (!url || !key) {
      alert("Please provide both the Supabase URL and the Anon Public Key.");
      return;
    }

    localStorage.setItem("sb_url", url);
    localStorage.setItem("sb_key", key);

    try {
      this.supabaseClient = window.supabase.createClient(url, key);
      alert("Connected to Supabase! You can now persist data directly into your cloud database.");
      this.closeSupabaseModal();
    } catch (err) {
      alert("Failed to initialize Supabase client: " + err.message);
    }
  }
}

// Global instantiation
const app = new LodgeFinderApp();