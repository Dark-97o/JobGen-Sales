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
    // 1. UNIVERSITY CAMPUS BUILDING (Education - Full 360° Neoclassical Grandeur)
    // ==========================================
    const bEducation = new THREE.Group();
    // Base podium steps (Front & Back)
    addMesh(bEducation, new THREE.BoxGeometry(5.6, 0.35, 4.8), stoneMat, [0, 0.18, 0]);
    addMesh(bEducation, new THREE.BoxGeometry(5.0, 0.25, 4.4), stoneMat, [0, 0.42, 0]);
    // Main Neoclassical Central Hall
    addMesh(bEducation, new THREE.BoxGeometry(4.4, 2.2, 3.4), stoneMat, [0, 1.65, 0]);
    
    // Front Portico: 6 Neoclassical Columns
    for (let c = -1.5; c <= 1.5; c += 0.6) {
      addMesh(bEducation, new THREE.CylinderGeometry(0.11, 0.13, 2.2, 16), stoneMat, [c, 1.65, 1.82]);
    }
    // Back Portico: 6 Symmetrical Neoclassical Columns (Backside Detail)
    for (let c = -1.5; c <= 1.5; c += 0.6) {
      addMesh(bEducation, new THREE.CylinderGeometry(0.11, 0.13, 2.2, 16), stoneMat, [c, 1.65, -1.82]);
    }

    // Entablatures (Front & Back)
    addMesh(bEducation, new THREE.BoxGeometry(3.6, 0.3, 0.6), stoneMat, [0, 2.85, 1.82]);
    addMesh(bEducation, new THREE.BoxGeometry(3.6, 0.3, 0.6), stoneMat, [0, 2.85, -1.82]);
    
    // Front Pediment (Triangular Gable)
    const frontPediment = addMesh(bEducation, new THREE.ConeGeometry(2.1, 0.9, 4), darkSteelMat, [0, 3.4, 1.82], [0, Math.PI / 4, 0]);
    frontPediment.scale.set(1.4, 1, 0.35);
    // Back Pediment (Triangular Gable)
    const backPediment = addMesh(bEducation, new THREE.ConeGeometry(2.1, 0.9, 4), darkSteelMat, [0, 3.4, -1.82], [0, Math.PI / 4, 0]);
    backPediment.scale.set(1.4, 1, 0.35);

    // Main Roof (Hip Roof across entire hall)
    const mainRoof = addMesh(bEducation, new THREE.ConeGeometry(3.4, 1.2, 4), darkSteelMat, [0, 3.35, 0], [0, Math.PI / 4, 0]);
    mainRoof.scale.set(1.3, 1, 1.05);

    // Central Octagonal Rotunda / Cupola Drum
    addMesh(bEducation, new THREE.CylinderGeometry(1.05, 1.05, 1.1, 16), stoneMat, [0, 4.25, 0]);
    // 8 Mini Colonnettes around rotunda drum
    for (let a = 0; a < 8; a++) {
      const ang = (a / 8) * Math.PI * 2;
      addMesh(bEducation, new THREE.CylinderGeometry(0.06, 0.06, 1.1, 12), stoneMat, [Math.cos(ang) * 0.95, 4.25, Math.sin(ang) * 0.95]);
    }
    // Copper Dome
    addMesh(bEducation, new THREE.SphereGeometry(1.08, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2), darkSteelMat, [0, 4.8, 0]);
    // Gilded Lantern & Spire
    addMesh(bEducation, new THREE.CylinderGeometry(0.2, 0.25, 0.5, 16), amberBistroMat, [0, 5.9, 0]);
    addMesh(bEducation, new THREE.ConeGeometry(0.22, 1.4, 16), blueAccentMat, [0, 6.8, 0]);

    // 4 Symmetrical Clock Faces on all 4 Sides (North, South, East, West)
    addMesh(bEducation, new THREE.CylinderGeometry(0.28, 0.28, 0.04, 16), stoneMat, [0, 4.3, 1.06], [Math.PI / 2, 0, 0]);
    addMesh(bEducation, new THREE.CylinderGeometry(0.28, 0.28, 0.04, 16), stoneMat, [0, 4.3, -1.06], [Math.PI / 2, 0, 0]);
    addMesh(bEducation, new THREE.CylinderGeometry(0.28, 0.28, 0.04, 16), stoneMat, [1.06, 4.3, 0], [0, 0, Math.PI / 2]);
    addMesh(bEducation, new THREE.CylinderGeometry(0.28, 0.28, 0.04, 16), stoneMat, [-1.06, 4.3, 0], [0, 0, Math.PI / 2]);

    // Front & Back Grand Entrance Glass Doors
    addMesh(bEducation, new THREE.BoxGeometry(1.2, 1.5, 0.1), glassMat, [0, 1.3, 1.72]);
    addMesh(bEducation, new THREE.BoxGeometry(1.2, 1.5, 0.1), glassMat, [0, 1.3, -1.72]);

    // Left Side Windows (West Elevation)
    for (let w = -1.0; w <= 1.0; w += 0.7) {
      addMesh(bEducation, new THREE.BoxGeometry(0.08, 0.9, 0.45), glassMat, [-2.22, 1.7, w]);
    }
    // Right Side Windows (East Elevation)
    for (let w = -1.0; w <= 1.0; w += 0.7) {
      addMesh(bEducation, new THREE.BoxGeometry(0.08, 0.9, 0.45), glassMat, [2.22, 1.7, w]);
    }
    // Perimeter Roof Cornice Balustrade
    addMesh(bEducation, new THREE.BoxGeometry(4.5, 0.15, 3.5), stoneMat, [0, 2.82, 0]);
    scene.add(bEducation);
    buildingGroups.push(bEducation);

    // ==========================================
    // 2. FINANCIAL ADVISORY TOWER (Accounting - Full 360° Manhattan Skyscraper)
    // ==========================================
    const bAccounting = new THREE.Group();
    // Ground Plaza Plinth with Corner Pylons
    addMesh(bAccounting, new THREE.BoxGeometry(4.8, 0.35, 4.4), darkSteelMat, [0, 0.18, 0]);
    
    // Tier 1 Base Tower (Curtain Glass on all 4 sides)
    addMesh(bAccounting, new THREE.BoxGeometry(3.2, 3.2, 3.2), glassMat, [0, 1.8, 0]);
    // 4 Symmetrical Floor Mullion Bands around all 4 sides
    for (let fl = 0.8; fl <= 3.2; fl += 0.8) {
      addMesh(bAccounting, new THREE.BoxGeometry(3.32, 0.1, 3.32), darkSteelMat, [0, fl, 0]);
    }
    // Corner Structural Pylons (All 4 Corners)
    addMesh(bAccounting, new THREE.BoxGeometry(0.3, 3.4, 0.3), darkSteelMat, [1.6, 1.8, 1.6]);
    addMesh(bAccounting, new THREE.BoxGeometry(0.3, 3.4, 0.3), darkSteelMat, [-1.6, 1.8, 1.6]);
    addMesh(bAccounting, new THREE.BoxGeometry(0.3, 3.4, 0.3), darkSteelMat, [1.6, 1.8, -1.6]);
    addMesh(bAccounting, new THREE.BoxGeometry(0.3, 3.4, 0.3), darkSteelMat, [-1.6, 1.8, -1.6]);

    // Front & Back Revolving Entrance Atriums
    addMesh(bAccounting, new THREE.BoxGeometry(1.6, 1.1, 0.25), darkSteelMat, [0, 0.75, 1.65]);
    addMesh(bAccounting, new THREE.BoxGeometry(1.6, 1.1, 0.25), darkSteelMat, [0, 0.75, -1.65]);

    // Tier 2 Mid-Tower (Setback with 360° Observation Terrace)
    addMesh(bAccounting, new THREE.BoxGeometry(2.4, 2.6, 2.4), glassMat, [0, 4.6, 0]);
    addMesh(bAccounting, new THREE.BoxGeometry(2.55, 0.08, 2.55), blueAccentMat, [0, 4.0, 0]);
    addMesh(bAccounting, new THREE.BoxGeometry(2.55, 0.08, 2.55), blueAccentMat, [0, 4.8, 0]);
    addMesh(bAccounting, new THREE.BoxGeometry(2.55, 0.08, 2.55), blueAccentMat, [0, 5.6, 0]);
    // 360° Glass Railing along Tier 1 Terrace Setback
    addMesh(bAccounting, new THREE.BoxGeometry(3.2, 0.35, 0.05), glassMat, [0, 3.55, 1.58]);
    addMesh(bAccounting, new THREE.BoxGeometry(3.2, 0.35, 0.05), glassMat, [0, 3.55, -1.58]);
    addMesh(bAccounting, new THREE.BoxGeometry(0.05, 0.35, 3.2), glassMat, [1.58, 3.55, 0]);
    addMesh(bAccounting, new THREE.BoxGeometry(0.05, 0.35, 3.2), glassMat, [-1.58, 3.55, 0]);

    // Tier 3 Penthouse Executive Floor
    addMesh(bAccounting, new THREE.BoxGeometry(1.6, 1.4, 1.6), darkSteelMat, [0, 6.4, 0]);
    addMesh(bAccounting, new THREE.BoxGeometry(1.4, 1.2, 1.4), glassMat, [0, 6.4, 0]);

    // Rooftop Architectural Crown & Mechanical Penthouse
    addMesh(bAccounting, new THREE.BoxGeometry(1.8, 0.35, 1.8), darkSteelMat, [0, 7.25, 0]);
    // Glowing Blue Neon Corner Accent Ribs (All 4 Corners)
    addMesh(bAccounting, new THREE.BoxGeometry(0.08, 1.4, 0.08), blueAccentMat, [0.8, 7.6, 0.8]);
    addMesh(bAccounting, new THREE.BoxGeometry(0.08, 1.4, 0.08), blueAccentMat, [-0.8, 7.6, 0.8]);
    addMesh(bAccounting, new THREE.BoxGeometry(0.08, 1.4, 0.08), blueAccentMat, [0.8, 7.6, -0.8]);
    addMesh(bAccounting, new THREE.BoxGeometry(0.08, 1.4, 0.08), blueAccentMat, [-0.8, 7.6, -0.8]);

    // Rooftop Communications Mast & Beacon
    addMesh(bAccounting, new THREE.CylinderGeometry(0.04, 0.08, 2.4, 12), darkSteelMat, [0, 8.6, 0]);
    addMesh(bAccounting, new THREE.SphereGeometry(0.14, 16, 16), redCrossMat, [0, 9.8, 0]);
    // Satellite Dishes (North & South)
    addMesh(bAccounting, new THREE.CylinderGeometry(0.3, 0.3, 0.08, 16), darkSteelMat, [0.4, 7.5, 0.5], [0.4, 0.3, 0]);
    addMesh(bAccounting, new THREE.CylinderGeometry(0.25, 0.25, 0.08, 16), darkSteelMat, [-0.4, 7.5, -0.5], [-0.4, -0.3, 0]);
    scene.add(bAccounting);
    buildingGroups.push(bAccounting);

    // ==========================================
    // 3. LUXURY MODERNIST VILLA (Real Estate - Full 360° Architectural Luxury)
    // ==========================================
    const bRealEstate = new THREE.Group();
    // Base Landscape Deck (Stone & Timber)
    addMesh(bRealEstate, new THREE.BoxGeometry(6.4, 0.3, 5.2), stoneMat, [0, 0.15, 0]);
    // Turquoise Swimming Pool (Front-Right)
    addMesh(bRealEstate, new THREE.BoxGeometry(2.4, 0.08, 1.8), glassMat, [1.6, 0.32, 1.2]);
    // Sun Loungers by Pool
    addMesh(bRealEstate, new THREE.BoxGeometry(0.4, 0.12, 0.9), warmWoodMat, [2.5, 0.36, 0.8]);
    addMesh(bRealEstate, new THREE.BoxGeometry(0.4, 0.12, 0.9), warmWoodMat, [2.5, 0.36, 1.8]);

    // Rear Zen Garden & Outdoor Dining Terrace (Back-Left)
    addMesh(bRealEstate, new THREE.BoxGeometry(2.0, 0.06, 1.6), warmWoodMat, [-1.7, 0.32, -1.4]);
    addMesh(bRealEstate, new THREE.BoxGeometry(0.9, 0.35, 0.5), darkSteelMat, [-1.7, 0.5, -1.4]);

    // Ground Floor Living Pavilion (Glass Wrapped on Front, Back & Sides)
    addMesh(bRealEstate, new THREE.BoxGeometry(3.6, 1.5, 3.2), stoneMat, [-0.4, 1.0, 0]);
    // Front Sliding Glass Wall
    addMesh(bRealEstate, new THREE.BoxGeometry(3.2, 1.35, 0.08), glassMat, [-0.4, 1.0, 1.62]);
    // Rear Sliding Glass Wall (Facing Garden)
    addMesh(bRealEstate, new THREE.BoxGeometry(3.2, 1.35, 0.08), glassMat, [-0.4, 1.0, -1.62]);
    // Side Glass Walls
    addMesh(bRealEstate, new THREE.BoxGeometry(0.08, 1.35, 2.2), glassMat, [-2.22, 1.0, 0]);

    // Cantilevered Upper Master Suite (Extends out both Front & Side)
    addMesh(bRealEstate, new THREE.BoxGeometry(3.8, 1.4, 3.0), darkSteelMat, [0.5, 2.45, 0.3]);
    // Front Glass Bedroom Wall & Balcony
    addMesh(bRealEstate, new THREE.BoxGeometry(3.4, 1.15, 0.08), glassMat, [0.5, 2.45, 1.82]);
    // Rear Glass Wall & Balcony
    addMesh(bRealEstate, new THREE.BoxGeometry(3.4, 1.15, 0.08), glassMat, [0.5, 2.45, -1.22]);

    // Wrap-Around Glass Balcony Guardrails (Front, Side & Back)
    addMesh(bRealEstate, new THREE.BoxGeometry(3.6, 0.45, 0.05), glassMat, [0.5, 2.1, 1.95]);
    addMesh(bRealEstate, new THREE.BoxGeometry(0.05, 0.45, 3.2), glassMat, [2.42, 2.1, 0.3]);
    addMesh(bRealEstate, new THREE.BoxGeometry(3.6, 0.45, 0.05), glassMat, [0.5, 2.1, -1.35]);

    // Overhanging Floating Modernist Roof Slabs
    addMesh(bRealEstate, new THREE.BoxGeometry(4.4, 0.2, 3.6), warmWoodMat, [0.5, 3.25, 0.3]);

    // Rooftop Timber Pergola Trellis (Visible from all angles)
    for (let p = -1.2; p <= 1.2; p += 0.48) {
      addMesh(bRealEstate, new THREE.BoxGeometry(0.08, 0.12, 2.8), warmWoodMat, [p + 0.5, 3.6, 0.3]);
    }
    // Planter Boxes with Greenery on Roof
    addMesh(bRealEstate, new THREE.BoxGeometry(0.4, 0.25, 2.4), emeraldMat, [-1.2, 3.45, 0.3]);

    // Architectural Vertical Chimney Stack (Ground to Roof)
    addMesh(bRealEstate, new THREE.BoxGeometry(0.5, 4.2, 0.5), stoneMat, [-2.1, 2.1, 0.8]);
    // Vertical Timber Privacy Louvers (East Elevation)
    for (let l = -0.8; l <= 0.8; l += 0.3) {
      addMesh(bRealEstate, new THREE.BoxGeometry(0.06, 1.8, 0.15), warmWoodMat, [-2.25, 1.1, l - 0.7]);
    }
    scene.add(bRealEstate);
    buildingGroups.push(bRealEstate);

    // ==========================================
    // 4. BOUTIQUE RESTAURANT BISTRO (Restaurants - Full 360° Parisian Bistro)
    // ==========================================
    const bRestaurant = new THREE.Group();
    // Street Pavement Foundation
    addMesh(bRestaurant, new THREE.BoxGeometry(5.4, 0.3, 5.0), stoneMat, [0, 0.15, 0]);
    // Main 2-Story Bistro Building Structure
    addMesh(bRestaurant, new THREE.BoxGeometry(4.2, 3.0, 3.8), stoneMat, [0, 1.75, 0]);

    // Front Bistro Facade: Striped Fabric Awning & French Arched Windows
    addMesh(bRestaurant, new THREE.BoxGeometry(3.6, 1.3, 0.1), glassMat, [0, 1.0, 1.92]);
    const frontAwning = addMesh(bRestaurant, new THREE.BoxGeometry(3.8, 0.14, 1.1), amberBistroMat, [0, 1.95, 2.15], [0.35, 0, 0]);
    // Front Upper French Windows with Juliet Balconies
    addMesh(bRestaurant, new THREE.BoxGeometry(0.7, 0.95, 0.06), glassMat, [-1.2, 2.65, 1.92]);
    addMesh(bRestaurant, new THREE.BoxGeometry(0.7, 0.95, 0.06), glassMat, [0, 2.65, 1.92]);
    addMesh(bRestaurant, new THREE.BoxGeometry(0.7, 0.95, 0.06), glassMat, [1.2, 2.65, 1.92]);
    // Juliet Iron Railings
    addMesh(bRestaurant, new THREE.BoxGeometry(0.8, 0.35, 0.1), darkSteelMat, [-1.2, 2.4, 1.96]);
    addMesh(bRestaurant, new THREE.BoxGeometry(0.8, 0.35, 0.1), darkSteelMat, [0, 2.4, 1.96]);
    addMesh(bRestaurant, new THREE.BoxGeometry(0.8, 0.35, 0.1), darkSteelMat, [1.2, 2.4, 1.96]);

    // Back Facade: Garden Patio Awning & French Doors (Full Backside Detail)
    addMesh(bRestaurant, new THREE.BoxGeometry(3.6, 1.3, 0.1), glassMat, [0, 1.0, -1.92]);
    const backAwning = addMesh(bRestaurant, new THREE.BoxGeometry(3.8, 0.14, 1.1), amberBistroMat, [0, 1.95, -2.15], [-0.35, 0, 0]);
    // Back Upper French Windows with Juliet Balconies
    addMesh(bRestaurant, new THREE.BoxGeometry(0.7, 0.95, 0.06), glassMat, [-1.2, 2.65, -1.92]);
    addMesh(bRestaurant, new THREE.BoxGeometry(0.7, 0.95, 0.06), glassMat, [0, 2.65, -1.92]);
    addMesh(bRestaurant, new THREE.BoxGeometry(0.7, 0.95, 0.06), glassMat, [1.2, 2.65, -1.92]);

    // Side Windows (West & East Elevations)
    for (let sw = -1.0; sw <= 1.0; sw += 0.8) {
      addMesh(bRestaurant, new THREE.BoxGeometry(0.08, 0.9, 0.5), glassMat, [-2.12, 1.0, sw]);
      addMesh(bRestaurant, new THREE.BoxGeometry(0.08, 0.8, 0.45), glassMat, [-2.12, 2.6, sw]);
      addMesh(bRestaurant, new THREE.BoxGeometry(0.08, 0.9, 0.5), glassMat, [2.12, 1.0, sw]);
      addMesh(bRestaurant, new THREE.BoxGeometry(0.08, 0.8, 0.45), glassMat, [2.12, 2.6, sw]);
    }

    // Front Sidewalk Cafe Terrace (2 Round Bistro Tables)
    addMesh(bRestaurant, new THREE.CylinderGeometry(0.35, 0.35, 0.45, 16), darkSteelMat, [-1.5, 0.48, 2.0]);
    addMesh(bRestaurant, new THREE.CylinderGeometry(0.35, 0.35, 0.45, 16), darkSteelMat, [1.5, 0.48, 2.0]);
    // Back Garden Courtyard Cafe Table with Parasol
    addMesh(bRestaurant, new THREE.CylinderGeometry(0.4, 0.4, 0.45, 16), darkSteelMat, [0, 0.48, -2.1]);
    addMesh(bRestaurant, new THREE.ConeGeometry(0.9, 0.35, 16), amberBistroMat, [0, 1.35, -2.1]);
    addMesh(bRestaurant, new THREE.CylinderGeometry(0.03, 0.03, 0.9, 8), darkSteelMat, [0, 0.9, -2.1]);

    // Decorative Roof Cornice & Stone Balustrade (All 4 Sides)
    addMesh(bRestaurant, new THREE.BoxGeometry(4.4, 0.3, 4.0), darkSteelMat, [0, 3.35, 0]);

    // Rooftop Dining Deck with Pergola Trellis & Marquee Sign
    addMesh(bRestaurant, new THREE.BoxGeometry(3.6, 0.12, 3.2), warmWoodMat, [0, 3.55, 0]);
    for (let r = -1.0; r <= 1.0; r += 0.6) {
      addMesh(bRestaurant, new THREE.BoxGeometry(0.06, 0.1, 2.6), warmWoodMat, [r, 4.2, 0]);
    }
    // Rooftop Bistro Illuminated Signs (Front & Back)
    addMesh(bRestaurant, new THREE.BoxGeometry(2.4, 0.55, 0.15), amberBistroMat, [0, 3.9, 1.45]);
    addMesh(bRestaurant, new THREE.BoxGeometry(2.4, 0.55, 0.15), amberBistroMat, [0, 3.9, -1.45]);

    // Authentic Brick Kitchen Chimney Stack (Rear Corner)
    addMesh(bRestaurant, new THREE.BoxGeometry(0.6, 4.2, 0.6), warmWoodMat, [-1.7, 2.3, -1.5]);
    addMesh(bRestaurant, new THREE.CylinderGeometry(0.18, 0.22, 0.4, 12), darkSteelMat, [-1.7, 4.5, -1.5]);
    scene.add(bRestaurant);
    buildingGroups.push(bRestaurant);

    // ==========================================
    // 5. MODERN HOSPITAL COMPLEX (Medical - Full 360° Multi-Wing Medical Center)
    // ==========================================
    const bMedical = new THREE.Group();
    // Base Plinth & Ambulance Driveway
    addMesh(bMedical, new THREE.BoxGeometry(5.8, 0.3, 5.0), stoneMat, [0, 0.15, 0]);

    // Central Diagnostic Medical Core Tower
    addMesh(bMedical, new THREE.BoxGeometry(3.0, 4.6, 3.0), stoneMat, [0, 2.55, 0]);

    // 4 Symmetrical Clinical Wings (Cross/Cruciform Plan: North, South, East, West)
    // East & West Wings
    addMesh(bMedical, new THREE.BoxGeometry(1.6, 3.0, 2.2), stoneMat, [-2.1, 1.75, 0]);
    addMesh(bMedical, new THREE.BoxGeometry(1.6, 3.0, 2.2), stoneMat, [2.1, 1.75, 0]);
    // North & South Wings (Front & Back Extensions)
    addMesh(bMedical, new THREE.BoxGeometry(2.2, 3.0, 1.2), stoneMat, [0, 1.75, 1.9]);
    addMesh(bMedical, new THREE.BoxGeometry(2.2, 3.0, 1.2), stoneMat, [0, 1.75, -1.9]);

    // 360° Continuous Clinical Ribbon Glass Windows on All 4 Wings
    for (let fl = 1.2; fl <= 3.8; fl += 0.9) {
      addMesh(bMedical, new THREE.BoxGeometry(3.12, 0.35, 3.12), glassMat, [0, fl, 0]);
      addMesh(bMedical, new THREE.BoxGeometry(5.9, 0.3, 2.3), glassMat, [0, fl - 0.2, 0]);
      addMesh(bMedical, new THREE.BoxGeometry(2.3, 0.3, 5.1), glassMat, [0, fl - 0.2, 0]);
    }

    // 3D Luminous Red Medical Cross on Front Facade
    addMesh(bMedical, new THREE.BoxGeometry(0.85, 0.28, 0.16), redCrossMat, [0, 4.15, 1.54]);
    addMesh(bMedical, new THREE.BoxGeometry(0.28, 0.85, 0.16), redCrossMat, [0, 4.15, 1.54]);

    // 3D Luminous Red Medical Cross on Back Facade (Full Backside Detail)
    addMesh(bMedical, new THREE.BoxGeometry(0.85, 0.28, 0.16), redCrossMat, [0, 4.15, -1.54]);
    addMesh(bMedical, new THREE.BoxGeometry(0.28, 0.85, 0.16), redCrossMat, [0, 4.15, -1.54]);

    // Emergency Ambulance Entrance Canopy (West Side)
    addMesh(bMedical, new THREE.BoxGeometry(1.8, 0.16, 2.2), glassMat, [-2.2, 1.2, 0], [0, 0, 0.12]);
    addMesh(bMedical, new THREE.BoxGeometry(0.12, 1.2, 0.12), darkSteelMat, [-3.0, 0.6, 0.9]);
    addMesh(bMedical, new THREE.BoxGeometry(0.12, 1.2, 0.12), darkSteelMat, [-3.0, 0.6, -0.9]);

    // Main Patient Entrance Glass Atrium (South/Front Side)
    addMesh(bMedical, new THREE.BoxGeometry(2.2, 1.3, 0.2), glassMat, [0, 0.85, 2.52]);

    // Rooftop Elevator Penthouse with Glowing Cross
    addMesh(bMedical, new THREE.BoxGeometry(1.4, 1.2, 1.4), stoneMat, [0, 5.2, -0.4]);
    addMesh(bMedical, new THREE.BoxGeometry(0.5, 0.18, 0.08), redCrossMat, [0, 5.3, 0.33]);
    addMesh(bMedical, new THREE.BoxGeometry(0.18, 0.5, 0.08), redCrossMat, [0, 5.3, 0.33]);

    // Rooftop Helipad Platform (Elevated with Circular Deck)
    addMesh(bMedical, new THREE.CylinderGeometry(1.5, 1.5, 0.2, 32), darkSteelMat, [0, 5.0, 0.4]);
    // Safety Perimeter Ring
    addMesh(bMedical, new THREE.TorusGeometry(1.52, 0.04, 8, 32), blueAccentMat, [0, 5.12, 0.4], [Math.PI / 2, 0, 0]);
    // Luminous Green Helipad 'H' Marking (Visible 360°)
    addMesh(bMedical, new THREE.BoxGeometry(0.12, 0.06, 0.85), emeraldMat, [-0.28, 5.12, 0.4]);
    addMesh(bMedical, new THREE.BoxGeometry(0.12, 0.06, 0.85), emeraldMat, [0.28, 5.12, 0.4]);
    addMesh(bMedical, new THREE.BoxGeometry(0.56, 0.06, 0.12), emeraldMat, [0, 5.12, 0.4]);

    // Clinical Rooftop HVAC Ventilation Units
    addMesh(bMedical, new THREE.BoxGeometry(0.8, 0.45, 0.8), darkSteelMat, [1.0, 4.95, -0.5]);
    addMesh(bMedical, new THREE.BoxGeometry(0.7, 0.4, 0.7), darkSteelMat, [-1.0, 4.95, -0.5]);
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
