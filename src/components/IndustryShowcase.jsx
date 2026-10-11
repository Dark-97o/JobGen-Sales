import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { 
  ChevronLeft, 
  ChevronRight, 
  GraduationCap, 
  Calculator, 
  Building2, 
  UtensilsCrossed, 
  Stethoscope,
  CheckCircle2,
  Bot,
  User,
  ArrowRight
} from 'lucide-react';

const INDUSTRIES_DATA = [
  {
    id: 'education',
    name: 'Education',
    tagline: 'Higher Education & K-12 Admissions',
    icon: GraduationCap,
    accentColor: '#3B82F6',
    twoLineInfo: 'Enrolls prospective students 24/7, verifies degree prerequisites, schedules faculty campus tours, and answers tuition questions instantly with zero hold time.',
    buildingName: 'University Campus Hall',
    agentName: 'Jenny · AI Admissions Officer',
    dialogue: [
      {
        sender: 'user',
        name: 'Prospective Student',
        time: '10:14 AM',
        text: 'Hi! I’m looking to book an in-person campus tour for the Computer Science faculty and check the Fall 2026 application cutoff.'
      },
      {
        sender: 'ai',
        name: 'Jenny (AI Admissions)',
        time: '10:14 AM',
        text: 'Hello! Fall 2026 CS applications close December 1st. I have tour slots open this Thursday at 2:00 PM and Saturday at 11:00 AM with the faculty dean. Which day suits you best?'
      },
      {
        sender: 'user',
        name: 'Prospective Student',
        time: '10:15 AM',
        text: 'Thursday at 2:00 PM works perfectly for me.'
      },
      {
        sender: 'ai',
        name: 'Jenny (AI Admissions)',
        time: '10:15 AM',
        text: 'Confirmed! You are registered for Thursday, Oct 15 at 2:00 PM. I’ve just dispatched your digital parking permit and department itinerary to your phone.'
      }
    ],
    outcome: 'Campus Tour Booked · Slate CRM Synced · Visitor Pass Texted via SMS'
  },
  {
    id: 'accounting',
    name: 'Accounting',
    tagline: 'CPA & Advisory Practices',
    icon: Calculator,
    accentColor: '#0052FF',
    twoLineInfo: 'Captures urgent tax return intakes, securely collects corporate BAS receipts, books partner consultations, and answers billing queries autonomously.',
    buildingName: 'Financial Advisory Tower',
    agentName: 'Jenny · AI Practice Receptionist',
    dialogue: [
      {
        sender: 'user',
        name: 'Corporate Client',
        time: '02:30 PM',
        text: 'Hi, I need to lodge our quarterly BAS return and have questions regarding our capital equipment depreciation deductions before Friday.'
      },
      {
        sender: 'ai',
        name: 'Jenny (AI Receptionist)',
        time: '02:30 PM',
        text: 'Good afternoon! I can prepare your quarterly lodgment package right now. Are you filing under your standard corporate ABN or an investment trust?'
      },
      {
        sender: 'user',
        name: 'Corporate Client',
        time: '02:31 PM',
        text: 'Under our corporate entity ABN, 54 123 456.'
      },
      {
        sender: 'ai',
        name: 'Jenny (AI Receptionist)',
        time: '02:31 PM',
        text: 'Verified in Xero! I’ve sent your encrypted document link via SMS and booked a 20-min strategy review with Senior Partner Mark for Wednesday at 10:30 AM.'
      }
    ],
    outcome: 'ABN Entity Verified in Xero · 20-Min Partner Slot Booked · Encrypted Upload SMS Sent'
  },
  {
    id: 'real-estate',
    name: 'Real Estate',
    tagline: 'Residential & Commercial Brokerages',
    icon: Building2,
    accentColor: '#10B981',
    twoLineInfo: 'Pre-qualifies buyers by borrowing budget and purchase timeline, books 1-on-1 private walkthroughs, and logs buyer intent straight into your CRM.',
    buildingName: 'Luxury Architectural Villa',
    agentName: 'Olivia · AI Property Specialist',
    dialogue: [
      {
        sender: 'user',
        name: 'Verified Buyer',
        time: '11:42 AM',
        text: 'Hi, I’m calling regarding the 4-bedroom residence on Ocean Drive. Is it still available for a private walkthrough this weekend?'
      },
      {
        sender: 'ai',
        name: 'Olivia (AI Specialist)',
        time: '11:42 AM',
        text: 'Hello! Yes, 42 Ocean Drive is open for private appointments. May I confirm if you are looking for an owner-occupier home and your preferred purchase window?'
      },
      {
        sender: 'user',
        name: 'Verified Buyer',
        time: '11:43 AM',
        text: 'Owner-occupier, pre-approved finance, ready to make an offer within 30 days.'
      },
      {
        sender: 'ai',
        name: 'Olivia (AI Specialist)',
        time: '11:43 AM',
        text: 'Excellent. I have reserved an exclusive private viewing for you this Saturday at 11:30 AM with our lead partner Sarah. Digital brochure and contract sent to your mobile.'
      }
    ],
    outcome: 'Buyer Pre-Qualified ($1.8M+) · Private Inspection Confirmed · Contract Sent via SMS'
  },
  {
    id: 'restaurants',
    name: 'Restaurants',
    tagline: 'Fine Dining & Hospitality Groups',
    icon: UtensilsCrossed,
    accentColor: '#F59E0B',
    twoLineInfo: 'Manages peak-hour phone reservations, answers food allergy questions, coordinates VIP events, and confirms party bookings via automated text.',
    buildingName: 'Boutique Dining Bistro',
    agentName: 'Jenny · AI Concierge',
    dialogue: [
      {
        sender: 'user',
        name: 'Dinner Guest',
        time: '04:18 PM',
        text: 'Hey there! Do you have an indoor table for 6 available tonight around 7:30 PM? Two of our guests have strict celiac gluten allergies.'
      },
      {
        sender: 'ai',
        name: 'Jenny (AI Concierge)',
        time: '04:18 PM',
        text: 'Good evening! We have an indoor banquette table open at 7:30 PM. Our head chef maintains a dedicated gluten-free kitchen station and approved evening menu.'
      },
      {
        sender: 'user',
        name: 'Dinner Guest',
        time: '04:19 PM',
        text: 'That’s wonderful peace of mind, let’s reserve that table please.'
      },
      {
        sender: 'ai',
        name: 'Jenny (AI Concierge)',
        time: '04:19 PM',
        text: 'Your reservation for 6 at 7:30 PM is confirmed! I’ve sent your SMS booking pass with dietary notes pre-flagged for your server, plus valet directions.'
      }
    ],
    outcome: 'Table for 6 Booked · Dietary Notes Flagged in Resy · SMS Confirmation Dispatched'
  },
  {
    id: 'medical',
    name: 'Medical',
    tagline: 'Clinics, Specialists & Hospitals',
    icon: Stethoscope,
    accentColor: '#06B6D4',
    twoLineInfo: 'Toriates patient urgency, coordinates specialist consults, arranges repeat prescription workflows, and verifies private health insurance eligibility.',
    buildingName: 'Modern Clinical Pavilion',
    agentName: 'Jenny · AI Clinical Receptionist',
    dialogue: [
      {
        sender: 'user',
        name: 'Patient',
        time: '09:05 AM',
        text: 'Hi, I need an urgent consultation with Dr. Chen for recurring migraines, and I need to check if my private health insurance is accepted.'
      },
      {
        sender: 'ai',
        name: 'Jenny (AI Medical Desk)',
        time: '09:05 AM',
        text: 'Good morning. Dr. Chen has a priority telehealth slot today at 4:15 PM and an in-clinic opening tomorrow at 9:00 AM. We directly bill major private insurers with zero gap.'
      },
      {
        sender: 'user',
        name: 'Patient',
        time: '09:06 AM',
        text: 'I’ll take the in-clinic consultation tomorrow at 9:00 AM, please.'
      },
      {
        sender: 'ai',
        name: 'Jenny (AI Medical Desk)',
        time: '09:06 AM',
        text: 'You are booked with Dr. Chen for tomorrow at 9:00 AM. Your secure pre-consultation medical questionnaire and parking pass are dispatched to your mobile.'
      }
    ],
    outcome: 'Appointment Scheduled in Best Practice · Insurance Pre-Verified · Pre-Intake SMS Sent'
  }
];

export default function IndustryShowcase({ onOpenDemo }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const activeIndustry = INDUSTRIES_DATA[currentIndex];

  // 3D Canvas Reference
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const buildingsRef = useRef([]);
  const targetIndexRef = useRef(0);

  useEffect(() => {
    targetIndexRef.current = currentIndex;
  }, [currentIndex]);

  // Setup Three.js 3D Procedural Architectural Models
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 520;
    const height = container.clientHeight || 520;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    // Straight isometric perspective looking directly at the disc & building
    camera.position.set(0, 6.2, 17.5);
    camera.lookAt(0, 1.5, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.appendChild(renderer.domElement);

    // Architectural Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.15);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
    keyLight.position.set(12, 22, 14);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe0f2fe, 1.1);
    fillLight.position.set(-14, 12, 10);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.2);
    rimLight.position.set(0, 16, -14);
    scene.add(rimLight);

    // ==========================================
    // ROTATING TURNTABLE DISC PODIUM
    // ==========================================
    const turntable = new THREE.Group();
    scene.add(turntable);

    // Beveled cylindrical turntable disc base
    const discBaseGeo = new THREE.CylinderGeometry(5.4, 5.7, 0.3, 64);
    const discBaseMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.22,
      metalness: 0.12,
    });
    const discBase = new THREE.Mesh(discBaseGeo, discBaseMat);
    discBase.position.y = -0.15;
    discBase.receiveShadow = true;
    turntable.add(discBase);

    // Top surface plate of the disc
    const discTopGeo = new THREE.CylinderGeometry(5.15, 5.15, 0.05, 64);
    const discTopMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.35,
      metalness: 0.08,
    });
    const discTop = new THREE.Mesh(discTopGeo, discTopMat);
    discTop.position.y = 0.02;
    discTop.receiveShadow = true;
    turntable.add(discTop);

    // Outer neon accent ring running around the disc perimeter
    const neonRingGeo = new THREE.TorusGeometry(5.38, 0.065, 16, 64);
    const neonRingMat = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      roughness: 0.2,
      metalness: 0.8,
      emissive: 0x0052ff,
      emissiveIntensity: 0.35,
    });
    const neonRing = new THREE.Mesh(neonRingGeo, neonRingMat);
    neonRing.rotation.x = Math.PI / 2;
    neonRing.position.y = 0.01;
    turntable.add(neonRing);

    // Subtle radial tick marks along the disc rim for visual rotation feedback
    const tickGeo = new THREE.BoxGeometry(0.12, 0.04, 0.38);
    const tickMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.5 });
    for (let i = 0; i < 24; i++) {
      const angle = (i / 24) * Math.PI * 2;
      const tick = new THREE.Mesh(tickGeo, tickMat);
      tick.position.set(Math.cos(angle) * 4.75, 0.04, Math.sin(angle) * 4.75);
      tick.rotation.y = -angle;
      turntable.add(tick);
    }

    // Soft drop shadow / ambient contact ring underneath the disc
    const shadowRingGeo = new THREE.RingGeometry(4.4, 5.9, 64);
    const shadowRingMat = new THREE.MeshBasicMaterial({
      color: 0x0f172a,
      transparent: true,
      opacity: 0.07,
      side: THREE.DoubleSide
    });
    const shadowRing = new THREE.Mesh(shadowRingGeo, shadowRingMat);
    shadowRing.rotation.x = -Math.PI / 2;
    shadowRing.position.y = -0.32;
    scene.add(shadowRing);

    // Common Materials
    const stoneMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.45, metalness: 0.1 });
    const glassMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.1, metalness: 0.8, transparent: true, opacity: 0.85 });
    const darkSteelMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.35, metalness: 0.7 });
    const warmWoodMat = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.6, metalness: 0.1 });
    const blueAccentMat = new THREE.MeshStandardMaterial({ color: 0x0052ff, roughness: 0.3, metalness: 0.4 });
    const emeraldMat = new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.3, metalness: 0.3 });
    const amberBistroMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.4, metalness: 0.2 });
    const redCrossMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.2, metalness: 0.1 });

    const buildingGroups = [];

    // Helper: add child with shadow
    const addMesh = (parent, geo, mat, pos = [0, 0, 0], rot = [0, 0, 0]) => {
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(...pos);
      mesh.rotation.set(...rot);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      parent.add(mesh);
      return mesh;
    };

    // ==========================================
    // 1. UNIVERSITY CAMPUS BUILDING (Education)
    // ==========================================
    const bEducation = new THREE.Group();
    // Base podium steps
    addMesh(bEducation, new THREE.BoxGeometry(5.6, 0.4, 4.2), stoneMat, [0, 0.2, 0]);
    addMesh(bEducation, new THREE.BoxGeometry(5.0, 0.3, 3.8), stoneMat, [0, 0.5, 0]);
    // Main Neoclassical Hall
    addMesh(bEducation, new THREE.BoxGeometry(4.4, 2.2, 3.0), stoneMat, [0, 1.7, 0]);
    // 6 Columns in front
    for (let c = -1.6; c <= 1.6; c += 0.64) {
      addMesh(bEducation, new THREE.CylinderGeometry(0.12, 0.14, 2.2, 16), stoneMat, [c, 1.7, 1.6]);
    }
    // Entablature & Pediment
    addMesh(bEducation, new THREE.BoxGeometry(4.6, 0.35, 3.4), stoneMat, [0, 2.95, 0]);
    // Triangular roof pediment (Prism)
    const pedimentGeo = new THREE.ConeGeometry(2.5, 1.1, 4);
    const pediment = addMesh(bEducation, pedimentGeo, darkSteelMat, [0, 3.6, 0], [0, Math.PI / 4, 0]);
    pediment.scale.set(1.4, 1, 0.9);
    // Central Clock Tower Cupola
    addMesh(bEducation, new THREE.BoxGeometry(1.1, 1.4, 1.1), stoneMat, [0, 4.4, 0]);
    // Clock faces
    addMesh(bEducation, new THREE.CylinderGeometry(0.3, 0.3, 0.05, 16), darkSteelMat, [0, 4.4, 0.58], [Math.PI / 2, 0, 0]);
    addMesh(bEducation, new THREE.CylinderGeometry(0.3, 0.3, 0.05, 16), darkSteelMat, [0.58, 4.4, 0], [0, 0, Math.PI / 2]);
    // Tower Spire
    addMesh(bEducation, new THREE.ConeGeometry(0.65, 1.5, 8), blueAccentMat, [0, 5.7, 0]);
    // Front Glass Entrance Doors
    addMesh(bEducation, new THREE.BoxGeometry(1.2, 1.4, 0.1), glassMat, [0, 1.3, 1.52]);
    // Side Windows
    addMesh(bEducation, new THREE.BoxGeometry(0.5, 0.9, 0.05), glassMat, [-1.3, 1.7, 1.52]);
    addMesh(bEducation, new THREE.BoxGeometry(0.5, 0.9, 0.05), glassMat, [1.3, 1.7, 1.52]);
    scene.add(bEducation);
    buildingGroups.push(bEducation);

    // ==========================================
    // 2. FINANCIAL ADVISORY TOWER (Accounting)
    // ==========================================
    const bAccounting = new THREE.Group();
    // Podium plinth
    addMesh(bAccounting, new THREE.BoxGeometry(4.8, 0.4, 4.0), darkSteelMat, [0, 0.2, 0]);
    // Main High-rise Tower Tier 1
    addMesh(bAccounting, new THREE.BoxGeometry(2.8, 3.4, 2.6), glassMat, [0, 1.9, 0]);
    addMesh(bAccounting, new THREE.BoxGeometry(2.9, 0.15, 2.7), darkSteelMat, [0, 1.0, 0]);
    addMesh(bAccounting, new THREE.BoxGeometry(2.9, 0.15, 2.7), darkSteelMat, [0, 2.0, 0]);
    addMesh(bAccounting, new THREE.BoxGeometry(2.9, 0.15, 2.7), darkSteelMat, [0, 3.0, 0]);
    // Upper Tier 2 (Step-back architecture)
    addMesh(bAccounting, new THREE.BoxGeometry(2.2, 2.8, 2.0), glassMat, [0, 4.8, 0]);
    addMesh(bAccounting, new THREE.BoxGeometry(2.3, 0.12, 2.1), blueAccentMat, [0, 4.2, 0]);
    addMesh(bAccounting, new THREE.BoxGeometry(2.3, 0.12, 2.1), blueAccentMat, [0, 5.2, 0]);
    // Penthouse Tier 3
    addMesh(bAccounting, new THREE.BoxGeometry(1.6, 1.5, 1.4), darkSteelMat, [0, 6.7, 0]);
    addMesh(bAccounting, new THREE.BoxGeometry(1.4, 1.2, 1.2), glassMat, [0, 6.7, 0]);
    // Rooftop Antenna Spire & Communications Mast
    addMesh(bAccounting, new THREE.CylinderGeometry(0.04, 0.08, 2.2, 12), blueAccentMat, [0, 8.3, 0]);
    addMesh(bAccounting, new THREE.SphereGeometry(0.16, 16, 16), blueAccentMat, [0, 9.4, 0]);
    // Flanking Financial Wings
    addMesh(bAccounting, new THREE.BoxGeometry(1.2, 1.8, 1.8), stoneMat, [-2.0, 1.1, 0]);
    addMesh(bAccounting, new THREE.BoxGeometry(1.2, 1.8, 1.8), stoneMat, [2.0, 1.1, 0]);
    scene.add(bAccounting);
    buildingGroups.push(bAccounting);

    // ==========================================
    // 3. LUXURY VILLA (Real Estate)
    // ==========================================
    const bRealEstate = new THREE.Group();
    // Base Landscape Deck
    addMesh(bRealEstate, new THREE.BoxGeometry(6.2, 0.3, 4.6), stoneMat, [0, 0.15, 0]);
    // Turquoise Swimming Pool / Reflection Water
    addMesh(bRealEstate, new THREE.BoxGeometry(2.2, 0.06, 1.8), glassMat, [1.7, 0.32, 1.0]);
    // Ground Floor Living Pavilion
    addMesh(bRealEstate, new THREE.BoxGeometry(3.6, 1.6, 2.8), stoneMat, [-0.6, 1.0, -0.3]);
    // Double-Height Glass Facade
    addMesh(bRealEstate, new THREE.BoxGeometry(3.2, 1.4, 0.1), glassMat, [-0.6, 1.0, 1.1]);
    // Cantilevered First Floor Suite (Stretching out)
    addMesh(bRealEstate, new THREE.BoxGeometry(3.8, 1.4, 2.4), darkSteelMat, [0.4, 2.4, 0]);
    // Floor-to-Ceiling Balcony Glass
    addMesh(bRealEstate, new THREE.BoxGeometry(3.6, 1.1, 0.08), glassMat, [0.4, 2.4, 1.22]);
    // Overhanging Roof Slabs (Modernist Cantilever)
    addMesh(bRealEstate, new THREE.BoxGeometry(4.4, 0.22, 3.2), warmWoodMat, [0.4, 3.2, 0]);
    // Architectural Accent Column
    addMesh(bRealEstate, new THREE.BoxGeometry(0.18, 2.3, 0.18), darkSteelMat, [2.1, 1.2, 1.1]);
    // Timber feature louvers
    addMesh(bRealEstate, new THREE.BoxGeometry(0.12, 1.4, 1.2), warmWoodMat, [-2.4, 1.0, -0.3]);
    scene.add(bRealEstate);
    buildingGroups.push(bRealEstate);

    // ==========================================
    // 4. BOUTIQUE RESTAURANT BISTRO (Restaurants)
    // ==========================================
    const bRestaurant = new THREE.Group();
    // Ground Street Foundation
    addMesh(bRestaurant, new THREE.BoxGeometry(5.4, 0.3, 4.4), stoneMat, [0, 0.15, 0]);
    // Main Bistro 2-Story Building
    addMesh(bRestaurant, new THREE.BoxGeometry(4.2, 2.8, 3.2), stoneMat, [0, 1.65, -0.2]);
    // Ground Floor Dining Glass Front
    addMesh(bRestaurant, new THREE.BoxGeometry(3.6, 1.3, 0.1), glassMat, [0, 0.95, 1.42]);
    // Distinctive Striped Bistro Awning (Overhang)
    const awningGeo = new THREE.BoxGeometry(3.8, 0.15, 1.1);
    const awning = addMesh(bRestaurant, awningGeo, amberBistroMat, [0, 1.9, 1.75], [0.35, 0, 0]);
    // Upper Floor French Windows
    addMesh(bRestaurant, new THREE.BoxGeometry(0.7, 0.9, 0.06), glassMat, [-1.2, 2.5, 1.42]);
    addMesh(bRestaurant, new THREE.BoxGeometry(0.7, 0.9, 0.06), glassMat, [0, 2.5, 1.42]);
    addMesh(bRestaurant, new THREE.BoxGeometry(0.7, 0.9, 0.06), glassMat, [1.2, 2.5, 1.42]);
    // Decorative Parapet & Cornice
    addMesh(bRestaurant, new THREE.BoxGeometry(4.4, 0.35, 3.4), darkSteelMat, [0, 3.15, -0.2]);
    // Restaurant Name Signage Board on Roof
    addMesh(bRestaurant, new THREE.BoxGeometry(2.4, 0.6, 0.18), amberBistroMat, [0, 3.65, 1.2]);
    // Outdoor Terrace Cafe Tables
    addMesh(bRestaurant, new THREE.CylinderGeometry(0.35, 0.35, 0.45, 16), darkSteelMat, [-1.4, 0.45, 1.4]);
    addMesh(bRestaurant, new THREE.CylinderGeometry(0.35, 0.35, 0.45, 16), darkSteelMat, [1.4, 0.45, 1.4]);
    scene.add(bRestaurant);
    buildingGroups.push(bRestaurant);

    // ==========================================
    // 5. MODERN HOSPITAL PAVILION (Medical)
    // ==========================================
    const bMedical = new THREE.Group();
    // Base Plinth & Ambulance Bay Driveway
    addMesh(bMedical, new THREE.BoxGeometry(5.6, 0.3, 4.6), stoneMat, [0, 0.15, 0]);
    // Central Medical Core Tower
    addMesh(bMedical, new THREE.BoxGeometry(2.8, 4.4, 2.8), stoneMat, [0, 2.45, 0]);
    // East & West Clinical Inpatient Wings
    addMesh(bMedical, new THREE.BoxGeometry(1.6, 2.8, 2.2), stoneMat, [-2.0, 1.65, 0]);
    addMesh(bMedical, new THREE.BoxGeometry(1.6, 2.8, 2.2), stoneMat, [2.0, 1.65, 0]);
    // Continuous Clinical Ribbon Glass Windows
    addMesh(bMedical, new THREE.BoxGeometry(2.9, 0.35, 2.9), glassMat, [0, 1.5, 0]);
    addMesh(bMedical, new THREE.BoxGeometry(2.9, 0.35, 2.9), glassMat, [0, 2.4, 0]);
    addMesh(bMedical, new THREE.BoxGeometry(2.9, 0.35, 2.9), glassMat, [0, 3.3, 0]);
    // 3D Luminous Red Medical Cross on Central Facade
    const crossBar1 = addMesh(bMedical, new THREE.BoxGeometry(0.85, 0.28, 0.14), redCrossMat, [0, 4.0, 1.42]);
    const crossBar2 = addMesh(bMedical, new THREE.BoxGeometry(0.28, 0.85, 0.14), redCrossMat, [0, 4.0, 1.42]);
    // Rooftop Helipad Platform
    addMesh(bMedical, new THREE.CylinderGeometry(1.4, 1.4, 0.18, 32), darkSteelMat, [0, 4.75, 0]);
    // Helipad 'H' Marking
    addMesh(bMedical, new THREE.BoxGeometry(0.12, 0.05, 0.8), emeraldMat, [-0.25, 4.88, 0]);
    addMesh(bMedical, new THREE.BoxGeometry(0.12, 0.05, 0.8), emeraldMat, [0.25, 4.88, 0]);
    addMesh(bMedical, new THREE.BoxGeometry(0.5, 0.05, 0.12), emeraldMat, [0, 4.88, 0]);
    // Emergency Canopy Entrance
    addMesh(bMedical, new THREE.BoxGeometry(2.4, 0.18, 1.2), glassMat, [0, 1.1, 1.8], [0.1, 0, 0]);
    scene.add(bMedical);
    buildingGroups.push(bMedical);

    buildingsRef.current = buildingGroups;

    // Main 60FPS Render & Smooth Morphing Loop (Straight Upright Turntable Rotation, No Mouse Tracking)
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const targetIdx = targetIndexRef.current;

      // Update neon ring accent color to match active industry
      if (INDUSTRIES_DATA[targetIdx]) {
        neonRingMat.color.set(INDUSTRIES_DATA[targetIdx].accentColor);
        neonRingMat.emissive.set(INDUSTRIES_DATA[targetIdx].accentColor);
      }

      // Rotate turntable disc continuously
      turntable.rotation.y += 0.0055;

      // Morph & rotate building groups straight upright on the turntable disc
      buildingGroups.forEach((group, idx) => {
        const isTarget = idx === targetIdx;

        // Target scale: 1 when active, 0.001 when inactive
        const destScale = isTarget ? 1 : 0.001;
        const currentScale = group.scale.x;
        const newScale = THREE.MathUtils.lerp(currentScale, destScale, 0.08);
        group.scale.set(newScale, newScale, newScale);

        // Smooth elevation drop on exit
        const destY = isTarget ? 0 : -2.5;
        group.position.y = THREE.MathUtils.lerp(group.position.y, destY, 0.08);

        // Continuous horizontal rotation on the disc — straight upright, zero tilt
        group.rotation.y += 0.0055;
        group.rotation.x = 0;
        group.rotation.z = 0;

        // Visibility optimization
        group.visible = newScale > 0.01;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 520;
      const h = container.clientHeight || 520;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % INDUSTRIES_DATA.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + INDUSTRIES_DATA.length) % INDUSTRIES_DATA.length);
  };

  const IconComp = activeIndustry.icon;

  return (
    <section id="industries" ref={containerRef} className="industry-showcase-section">
      <div className="container industry-showcase-container">
        {/* Section Header */}
        <div className="industry-header-center">
          <h2 className="section-title industry-main-headline">
            <span className="industry-headline-lead">Calibrated for</span>{' '}
            <span className="text-full-blue industry-headline-accent">every Industry</span>
          </h2>
        </div>

        {/* Dual-Column Main Stage: Left 3D Rotating Building on Disc, Right Info & Claymorphed Chat Card */}
        <div className="industry-dual-stage">
          {/* Left Column: 3D Model Straight Rotating on Disc (No Background, No Box, No Pills) */}
          <div className="industry-3d-column">
            <div className="industry-3d-card-frame">
              <div ref={mountRef} className="industry-three-canvas-viewport" />
            </div>
          </div>

          {/* Right Column: Industry Header with Prev/Next Controls, 2-Line Info & Claymorphed Chat Box */}
          <div className="industry-info-column">
            {/* Industry Heading Row with Next and Previous Controls */}
            <div className="industry-headline-group">
              <div className="industry-title-row">
                <div className="industry-title-left">
                  <div className="industry-title-icon-badge" style={{ backgroundColor: `${activeIndustry.accentColor}15`, color: activeIndustry.accentColor }}>
                    <IconComp size={24} />
                  </div>
                  <h3 className="industry-title-text">{activeIndustry.name}</h3>
                </div>

                <div className="industry-arrows-cluster">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="industry-arrow-btn"
                    title="Previous Industry"
                    aria-label="Previous Industry"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="industry-arrow-btn"
                    title="Next Industry"
                    aria-label="Next Industry"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
              <p className="industry-two-line-desc">
                {activeIndustry.twoLineInfo}
              </p>
            </div>

            {/* Claymorphed Expected Conversation Chat Card */}
            <div className="industry-clay-chat-card">
              {/* Card Header */}
              <div className="clay-chat-header">
                <div className="clay-chat-header-agent">
                  <div className="clay-agent-avatar" style={{ backgroundColor: activeIndustry.accentColor }}>
                    <Bot size={16} color="#FFFFFF" />
                  </div>
                  <div className="clay-agent-meta">
                    <strong className="clay-agent-title">{activeIndustry.agentName}</strong>
                    <span className="clay-agent-telemetry">Live Voice / Chat Synchronizer · Active</span>
                  </div>
                </div>
                <div className="clay-status-chip">
                  <span className="clay-status-pulse" />
                  <span>Real-time</span>
                </div>
              </div>

              {/* Chat Message Bubbles */}
              <div className="clay-messages-stream" role="log" aria-label="Sample conversation">
                {activeIndustry.dialogue.map((msg, mIdx) => {
                  const isAI = msg.sender === 'ai';
                  return (
                    <div
                      key={mIdx}
                      className={`clay-bubble-row ${isAI ? 'is-ai' : 'is-user'}`}
                    >
                      <div className="clay-bubble-bubble">
                        <div className="clay-bubble-top">
                          <span className="clay-bubble-sender">
                            {isAI ? <Bot size={12} className="bubble-role-icon" /> : <User size={12} className="bubble-role-icon" />}
                            {msg.name}
                          </span>
                          <span className="clay-bubble-time">{msg.time}</span>
                        </div>
                        <p className="clay-bubble-text">{msg.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Deterministic Outcome Chip at bottom */}
              <div className="clay-outcome-bar">
                <div className="clay-outcome-badge">
                  <CheckCircle2 size={16} className="clay-outcome-icon" />
                  <span className="clay-outcome-label">Verified Action:</span>
                </div>
                <span className="clay-outcome-text">{activeIndustry.outcome}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
