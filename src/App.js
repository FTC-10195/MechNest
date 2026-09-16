import { useEffect, useState } from 'react';
import './App.css';
import Card from './Card';
import AdminPanel from './AdminPanel';
import { isSupabaseConfigured, supabase } from './supabaseClient';
import MechanismHandler from './MechanismHandler';
import Navbar from './Navbar';
import './index.css';

function App() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);;
  const [selectedTags, setTags] = useState(['N/A']); 
  const [Season, setSeason] = useState('N/A');
  const [Drivetrain, setDrivetrain] = useState('N/A');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterReset, setFilterReset] = useState(0);
  const [customCards, setCustomCards] = useState([]);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isPasswordRecovery, setIsPasswordRecovery] = useState(false);
  const TagsStates = Object.freeze({
    NA: 'N/A',
    //Seasons
    IntoTheDeep: 'INTO THE DEEP',
   CENTERSTAGE: 'CENTERSTAGE',
   POWERPLAY: 'POWERPLAY',
   FreightFrenzy: 'FREIGHT FRENZY',
  UltimateGoal: 'ULTIMATE GOAL',
  SkyStone: 'SKYSTONE',
  RoverRuckus: 'ROVER RUCKUS',
  RelicRevory: 'RELIC RECOVERY',
  VelocityVortex: 'VELOCITY VORTEX',
    //Mechanisms
    Arm: 'Arm',
    Intake: 'Intake Wheel',
    Ascent: 'Ascent',
    VerticalSlides: 'Vertical Slides',
    Claw:'Claw',
    Fourbar: 'Fourbar',
    Bucket: 'Bucket',
    Transfer: 'Transfer System',
    //Sensors
    Webcam: 'Webcam',
    OdometryPods: 'Odometry Pods',
    ColorSensor: 'Color Sensor',
    TouchSensor: 'Touch Sensor',
    DistanceSensor: 'Distance Sensor',
    //DriveTrain
    Mecanum: 'Mecanum Drive',
    Tank: 'Tank Drive',
    Swerve: 'Swerve Drive',
    XDrive: 'X-Drive',
    //Drive-type
    Bevel: 'Bevel Driven',
    Direct: 'Direct Driven',
    Belt: 'Belt Driven',
    Chain: 'Chain Driven',
    //Plates
    HDPE: 'HDPE',
    Aluminum: 'Aluminum',
    PLA: 'PLA'
  });
  const seasonsList = [
    TagsStates.NA,
    TagsStates.IntoTheDeep,
    TagsStates.CENTERSTAGE,
    TagsStates.POWERPLAY,
    TagsStates.FreightFrenzy,
    TagsStates.UltimateGoal,
    TagsStates.SkyStone,
    TagsStates.RoverRuckus,
    TagsStates.RelicRevory,
    TagsStates.VelocityVortex,
  ];
  const drivetrainList = [
    TagsStates.Mecanum,
    TagsStates.Tank,
    TagsStates.Swerve,
    TagsStates.XDrive
  ];
  const mechanismList = [
    TagsStates.NA,
    TagsStates.Arm,
    TagsStates.Intake,
    TagsStates.Ascent,
    TagsStates.VerticalSlides,
    TagsStates.Claw,
    TagsStates.Bucket,
    TagsStates.Fourbar,
    TagsStates.Transfer,
  ];
  const sensorsList = [
    TagsStates.NA,
    TagsStates.Webcam,
    TagsStates.OdometryPods,
    TagsStates.ColorSensor,
    TagsStates.TouchSensor,
    TagsStates.DistanceSensor
  ];
  const driveList = [
    TagsStates.NA,
    TagsStates.Bevel,
    TagsStates.Direct,
    TagsStates.Belt,
    TagsStates.Chain
  ];
  const platesList = [
    TagsStates.NA,
    TagsStates.HDPE,
    TagsStates.Aluminum
  ];
  const TagsList = Object.freeze({
    "Seasons" : seasonsList,
    "Mechanisms": mechanismList,
    "Sensors" : sensorsList,
    "Drivetrain" : drivetrainList,
    "DriveType" : driveList,
    "Plates" : platesList
  });
  const preFilteredCards = [
    { 
      id: 1, title: 'SOAR (V1)',
      description: 'Mechanum chasis ( 2 belt drive and 2 direct driven), Misumi Vertical slide system, Rotating arm powered by axon maxs, Extendo system power by axon mini, Wrist and intake powered by gobilda servos and gecko wheel, 3 Odometry pods Max Score: 63 points solo Max Auto: 16 points', 
      imageLink: './Images/V1Bot.png', 
      teamNumber: '10195', teamName: "Night Owls", teamLink: 'https://ecgrobotics.org/ftc10195/', 
      cadLink: "https://a360.co/4d2JjMT", cadText: "https://a360.co/4d2JjMT", 
      tags: [TagsStates.NA, TagsStates.ColorSensor, TagsStates.VerticalSlides,TagsStates.Arm,TagsStates.OdometryPods,TagsStates.Intake,TagsStates.Direct,TagsStates.Belt,TagsStates.HDPE],
      season: [TagsStates.NA,TagsStates.IntoTheDeep],
      drive: [TagsStates.NA,TagsStates.Mecanum]
    },
    { 
      id: 2, title: 'Otto the Owl',
      description: 'Custom DT, All belt powered, Aluminum Plates, Transfer System, Servo Chained powered intake using flywheels, Outtake powered by axon minis, rotation mech powered by axon maxs', 
      imageLink: './Images/CenterStageBot.png', 
      teamNumber: '10195', teamName: "Night Owls", teamLink: 'https://ecgrobotics.org/ftc10195/', 
      cadLink: "https://a360.co/4gyzBEx", cadText: "https://a360.co/4gyzBEx", 
      tags: [TagsStates.NA, TagsStates.VerticalSlides,TagsStates.Bucket,TagsStates.OdometryPods,TagsStates.Intake,TagsStates.Transfer,TagsStates.Belt,TagsStates.Aluminum],
      season: [TagsStates.NA,TagsStates.CENTERSTAGE],
      drive: [TagsStates.NA,TagsStates.Mecanum]
    }, 
    { 
      id: 3, title: 'Power',
      description: "Belted DT, Virtual Fourbar, Linkage Claw, Virtical Slides", 
      imageLink: './Images/PowerPlayBot.png', 
      teamNumber: '10195', teamName: "Night Owls", teamLink: 'https://ecgrobotics.org/ftc10195/', 
      cadLink: "https://a360.co/41MRQSc", cadText: "https://a360.co/41MRQSc", 
      tags: [TagsStates.NA, TagsStates.VerticalSlides,TagsStates.Bucket,TagsStates.Claw,TagsStates.Arm,TagsStates.Belt,TagsStates.Fourbar,TagsStates.HDPE],
      season: [TagsStates.NA,TagsStates.POWERPLAY],
      drive: [TagsStates.NA,TagsStates.Mecanum]
    }, 
    { 
      id: 4, title: 'Hoot Hoot',
      description: 'Bevel Driven DT, Transfer system, flywheel intake, bucket outtake powered by servo', 
      imageLink: './Images/FreightFrenzyBot.png', 
      teamNumber: '10195', teamName: "Night Owls", teamLink: 'https://ecgrobotics.org/ftc10195/', 
      cadLink: "https://a360.co/4iROovI", cadText: "https://a360.co/4iROovI", 
      tags: [TagsStates.NA, TagsStates.VerticalSlides,TagsStates.Bucket,TagsStates.Intake,TagsStates.Bevel,TagsStates.Transfer,TagsStates.HDPE],
      season: [TagsStates.NA,TagsStates.FreightFrenzy],
      drive: [TagsStates.NA,TagsStates.Mecanum]
    }, 
    { 
      id: 5, title: 'Thor',
      description: 'Early Iteration of the 5795 POWERPLAY Thor Robot. The robot involves a basic grabber mechanism mounted to a single set of vertical SAR330 linear slides. ', 
      imageLink: './Images/POWERPLAY5795.png', 
      teamNumber: '5795', teamName: "Back to the Drawing Board", teamLink: 'https://ecgrobotics.org//ftc5795/', 
      cadLink: "https://a360.co/4a1pKoh", cadText: "https://a360.co/4a1pKoh", 
      tags: [TagsStates.NA, TagsStates.Mecanum, TagsStates.VerticalSlides,TagsStates.Claw,TagsStates.OdometryPods, TagsStates.Webcam,TagsStates.Belt,TagsStates.HDPE],
      season: [TagsStates.NA,TagsStates.POWERPLAY],
      drive: [TagsStates.NA,TagsStates.Mecanum]
    }, 
    { 
      id: 6, title: 'Rush V2.5',
      description: "Worse version of Saket's Intake, Horizantle and Verticle Slides, Wacky Claw Outake, Mechnum Drivetrain.", 
      imageLink: './Images/INTOTHEDEEP16488.png', 
      teamNumber: '16488', teamName: "RAM ROBOTICS", teamLink: '', 
      cadLink: "https://cad.onshape.com/documents/c781844ef4f513717ffb038a/w/b986247c183ac845df1d4956/e/530d7765ef11eea33804886b?renderMode=0&uiState=678adfd49bc48a236ca83875", cadText: "https://a360.co/4a1pKoh", 
      tags: [TagsStates.NA, TagsStates.VerticalSlides,TagsStates.Claw,TagsStates.OdometryPods,TagsStates.Belt,TagsStates.Aluminum],
      season: [TagsStates.NA,TagsStates.IntoTheDeep],
      drive: [TagsStates.NA,TagsStates.Mecanum]
    }, 
    { 
      id: 7, title: 'Omniman',
      description: "Vertical slide, rack and pinion, passive specimen claw, adjustable angle viper rail arm, fully custom active intake, derlin construction", 
      imageLink: './Images/Omniman.PNG', 
      teamNumber: '14943', teamName: "Weber Rambots", teamLink: '', 
      cadLink: "https://a360.co/47TWjDD", cadText: "https://a360.co/47TWjDD", 
      tags: [TagsStates.NA, TagsStates.VerticalSlides, TagsStates.Arm,TagsStates.Intake,TagsStates.OdometryPods,TagsStates.ColorSensor,TagsStates.Bevel,TagsStates.HDPE],
      season: [TagsStates.NA,TagsStates.IntoTheDeep],
      drive: [TagsStates.NA,TagsStates.Mecanum]
    },
    { 
      id: 8, title: 'RipTide',
      description: " Active intake that rotates back into claw deposit, Belt Driven DT, Vertical Slides", 
      imageLink: './Images/Riptide.png', 
      teamNumber: '23511', teamName: "Seattle Solvers", teamLink: 'https://www.seattlesolvers.com/', cadLink:"https://cad.onshape.com/documents/ae5ff79658ff2a51ece82558/w/1babafd80652d7e5216f214c/e/548f3b6bbedc29b9264b1a15", cadText: "https://cad.onshape.com/documents/ae5ff79658ff2a51ece82558/w/1babafd80652d7e5216f214c/e/548f3b6bbedc29b9264b1a15", 
      tags: [TagsStates.NA, TagsStates.VerticalSlides, TagsStates.Arm,TagsStates.Intake,TagsStates.OdometryPods,TagsStates.ColorSensor,TagsStates.Aluminum,TagsStates.Belt,TagsStates.Claw],
      season: [TagsStates.NA,TagsStates.IntoTheDeep],
      drive: [TagsStates.NA,TagsStates.Mecanum]
    },
    {
    id: 9, title: 'Everybot: Into The Deep',
      description: " Practical Robot that uses a rotating arm and a semi-passive intake to score, cheap and reliable and open to all teams to use", 
      imageLink: './Images/FRC-118.png', 
      teamNumber: 'FRC 118', teamName: "Robonauts", teamLink: 'https://www.118everybot.org/', cadLink:"https://cad.onshape.com/documents/a2212ec4d0ff04ecfa468fab/w/de74c2fa846c84827f4ffeb0/e/a069a0c4d53cbe62662539e1", cadText: "https://cad.onshape.com/documents/a2212ec4d0ff04ecfa468fab/w/de74c2fa846c84827f4ffeb0/e/a069a0c4d53cbe62662539e1", 
      tags: [TagsStates.NA, TagsStates.Arm,TagsStates.Intake,TagsStates.Direct,TagsStates.Ascent,TagsStates.Claw],
      season: [TagsStates.NA,TagsStates.IntoTheDeep],
      drive: [TagsStates.NA,TagsStates.Mecanum]
    },
    { 
      id: 10, title: '22581-Into The Deep',
      description: " Efficient robot with a roller intake and a claw outake, belted drive with mecanum", 
      imageLink: './Images/22581IntoTheDeep.png', 
      teamNumber: '22581', teamName: " Red Ring of Death", teamLink: '', cadLink:"https://cad.onshape.com/documents/2edfa749e53c0bb6a0248093/w/a3996554e5950685df89a20d/e/312f2e6e1229b471b8b83c19", cadText: "https://cad.onshape.com/documents/2edfa749e53c0bb6a0248093/w/a3996554e5950685df89a20d/e/312f2e6e1229b471b8b83c19", 
      tags: [TagsStates.NA, TagsStates.Arm,TagsStates.Intake,TagsStates.Belt,TagsStates.VerticalSlides,TagsStates.OdometryPods,TagsStates.Ascent,TagsStates.Aluminum,TagsStates.Claw],
      season: [TagsStates.NA,TagsStates.IntoTheDeep],
      drive: [TagsStates.NA,TagsStates.Mecanum]
    },
    { 
      id: 11, title: 'Orca',
      description: "Optimal Robot with surgical tubing intake and a bucket outtake", 
      imageLink: './Images/Orca.png', 
      teamNumber: '16021', teamName: "Techno Maniacs", teamLink: 'https://technomaniacs.org/', cadLink:"https://cad.onshape.com/documents/d2a761d1667a8220e48ec838/v/d666c8e587965b23325a4a30/e/e57740242c43a75198d9f31b", cadText: "https://cad.onshape.com/documents/d2a761d1667a8220e48ec838/v/d666c8e587965b23325a4a30/e/e57740242c43a75198d9f31b", 
      tags: [TagsStates.NA,TagsStates.Intake,TagsStates.Belt,TagsStates.Transfer,TagsStates.VerticalSlides,TagsStates.OdometryPods,TagsStates.Aluminum],
      season: [TagsStates.NA,TagsStates.IntoTheDeep],
      drive: [TagsStates.NA,TagsStates.Mecanum]
    },
    { 
      id: 12, title: 'McQueen',
      description: "Inspire 3 @ States, Think 1st @ States. 1+5 Autonomous, Turret Sidegame", 
      imageLink: './Images/McQueen.png', 
      teamNumber: '6078', teamName: "Cut the Red Wire", teamLink: 'https://apexmakerclub.org/ctrw', cadLink:"https://cad.onshape.com/documents/63696c036a3b765b3ce31f8d/w/1314b1f7a7d37cb0337a7868/e/cb9d1f2e7ae520b2aaec1d6a?renderMode=0&uiState=67a057ba681f531ce06da52f", cadText: "https://cad.onshape.com/documents/63696c036a3b765b3ce31f8d/w/1314b1f7a7d37cb0337a7868/e/cb9d1f2e7ae520b2aaec1d6a?renderMode=0&uiState=67a057ba681f531ce06da52f", 
      tags: [TagsStates.NA,TagsStates.Direct,TagsStates.Transfer,TagsStates.VerticalSlides,TagsStates.OdometryPods,TagsStates.PLA,TagsStates.Webcam,TagsStates.DistanceSensor],
      season: [TagsStates.NA,TagsStates.POWERPLAY],
      drive: [TagsStates.NA,TagsStates.XDrive]
    },
    { 
      id: 13, title: 'Jeffry',
      description: "7-10 sec Sample cycle, 15-25 sec Specimen cycle", 
      imageLink: '/Images/VOIDBot.png', 
      teamNumber: '24078', teamName: "VOID", teamLink: 'https://voidftc.neocities.org/', cadLink:"https://cad.onshape.com/documents/3213d1cd0459755bd5e78d66/w/064370960b64af026f4de1e3/e/b01c438bef5550ab85a8f0ab", cadText: "https://cad.onshape.com/documents/3213d1cd0459755bd5e78d66/w/064370960b64af026f4de1e3/e/b01c438bef5550ab85a8f0ab", 
      tags: [TagsStates.NA,TagsStates.Claw,TagsStates.TouchSensor,TagsStates.Direct,TagsStates.Bevel,TagsStates.Arm,TagsStates.VerticalSlides,TagsStates.OdometryPods,TagsStates.PLA,TagsStates.Webcam],
      season: [TagsStates.NA,TagsStates.IntoTheDeep],
      drive: [TagsStates.NA,TagsStates.Mecanum]
    }
  ];
  const allCards = [...preFilteredCards, ...customCards];

  useEffect(() => {
    if (isSupabaseConfigured) {
      const loadSupabaseDesigns = async () => {
        const { data, error } = await supabase.from('designs').select('*').order('created_at', { ascending: false });
        if (!error && data) {
          setCustomCards(data.map((design) => ({
            id: design.id,
            title: design.title,
            description: design.description,
            imageLink: design.image_url || './Images/MechNestLogo.png',
            teamNumber: design.team_number,
            teamName: design.team_name,
            teamLink: design.team_url,
            cadLink: design.cad_url,
            cadText: design.cad_url,
            tags: design.tags?.length ? design.tags : ['N/A'],
            season: ['N/A', design.season],
            drive: ['N/A', design.drivetrain],
          })));
        }
      };
      loadSupabaseDesigns();
      supabase.auth.getSession().then(({ data }) => setIsAdminAuthenticated(Boolean(data.session)));
      const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'PASSWORD_RECOVERY') {
          setIsPasswordRecovery(true);
          setIsAdminOpen(true);
        }
        setIsAdminAuthenticated(Boolean(session));
      });
      return () => authListener.subscription.unsubscribe();
    }

    try {
      setCustomCards(JSON.parse(localStorage.getItem('mechnest-custom-designs')) || []);
    } catch {
      setCustomCards([]);
    }
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      localStorage.setItem('mechnest-custom-designs', JSON.stringify(customCards));
    }
  }, [customCards]);

  const handleAdminLogin = async (username, password) => {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.signInWithPassword({ email: username, password });
      if (error || !data.user) return false;
      const { data: profile } = await supabase.from('profiles').select('is_admin').eq('id', data.user.id).single();
      if (!profile?.is_admin) {
        await supabase.auth.signOut();
        return false;
      }
      setIsAdminAuthenticated(true);
      return true;
    }

    return false;
  };

  const handleAdminLogout = async () => {
    if (isSupabaseConfigured) await supabase.auth.signOut();
    setIsAdminAuthenticated(false);
    setIsPasswordRecovery(false);
  };

  const handlePasswordResetRequest = async (email) => {
    if (!isSupabaseConfigured) return false;
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin,
    });
    return !error;
  };

  const handlePasswordUpdate = async (password) => {
    if (!isSupabaseConfigured) return false;
    const { data, error } = await supabase.auth.updateUser({ password });
    if (error || !data.user) return false;
    const { data: profile } = await supabase.from('profiles').select('is_admin').eq('id', data.user.id).single();
    if (!profile?.is_admin) {
      await supabase.auth.signOut();
      return false;
    }
    setIsPasswordRecovery(false);
    setIsAdminAuthenticated(true);
    return true;
  };

  const handleAddDesign = async (design) => {
    if (isSupabaseConfigured) {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error('Please sign in again before adding a design.');

      let cadUrl = design.cadLink;
      if (design.cadFile) {
        const filePath = `${userData.user.id}/${Date.now()}-${design.cadFile.name}`;
        const { error: uploadError } = await supabase.storage.from('cad-files').upload(filePath, design.cadFile, { upsert: false });
        if (uploadError) throw uploadError;
        cadUrl = supabase.storage.from('cad-files').getPublicUrl(filePath).data.publicUrl;
      }

      const { data, error } = await supabase.from('designs').insert({
        title: design.title,
        team_number: design.teamNumber,
        team_name: design.teamName,
        description: design.description,
        image_url: design.imageLink,
        team_url: design.teamLink,
        cad_url: cadUrl,
        season: design.season[1],
        drivetrain: design.drive[1],
        tags: design.tags.filter((tag) => tag !== 'N/A'),
        created_by: userData.user.id,
      }).select().single();
      if (error) throw error;
      setCustomCards((current) => [{ ...design, id: data.id, cadLink: cadUrl, cadFile: undefined }, ...current]);
      return;
    }

    let localCadLink = design.cadLink;
    if (design.cadFile) {
      localCadLink = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(design.cadFile);
      });
    }
    setCustomCards((current) => [...current, { ...design, cadLink: localCadLink, cadFile: undefined }]);
  };
  const handleCardClick = (card) => {
    if (card.id === selectedCard){
      setSelectedCard(null);
    }else {
      setSelectedCard(card.id);
    } 
    };
  const clearFilters = () => {
    setSeason('N/A');
    setDrivetrain('N/A');
    setTags(['N/A']);
    setFilterReset((reset) => reset + 1);
  };
  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);
 // Display cards based on tags and sort them based on team number
 let cards = []; 
 for (let i = 0; i < allCards.length; i++) {
    let Allowed = true; // Whether the card will be displayed
    let CARDTAGS = allCards[i].tags; // Get card data for filtering
    let CARDSEASONS = allCards[i].season;
    let CARDDRIVE = allCards[i].drive;
    const searchText = searchQuery.trim().toLowerCase();
    const matchesSearch = !searchText || [
      allCards[i].title,
      allCards[i].teamName,
      allCards[i].teamNumber,
      allCards[i].description,
      ...CARDTAGS,
      ...CARDSEASONS,
      ...CARDDRIVE,
    ].some((value) => value.toLowerCase().includes(searchText));

    if (!matchesSearch) {
      Allowed = false;
    }

    if (!(CARDSEASONS[1] === Season || Season === 'N/A')) { // Remove card if season doesn't match or isn't N/A
      Allowed = false;
    }
    if (!(CARDDRIVE[1] === Drivetrain || Drivetrain === 'N/A')) { // Remove if drivetrain doesn't match or isn't N/A
      Allowed = false;
    }
    
    // Find how many selectedTags exist in CARDTAGS. If this count is not equal to the total number of selectedTags,
    // the card's tags do not match the selected tags, so the card is removed.
    let tagMatchCount = selectedTags.filter(tag => CARDTAGS.includes(tag)).length;
    if (tagMatchCount !== selectedTags.length) {
      Allowed = false;
    }

    if (Allowed) {
      cards.push(allCards[i]); // Add card to the display list if everything matches
    }
  }
  // Once everything is filtered, sort the cards by team number by comparing them to each other
  cards.sort((a, b) => {
    const numA = parseInt(a.teamNumber);
    const numB = parseInt(b.teamNumber);

    // If any team number contains non-numbers, treat them as greater so they end up at the end
    if (isNaN(numA) && !isNaN(numB)) return 1;
    if (!isNaN(numA) && isNaN(numB)) return -1;
    if (isNaN(numA) && isNaN(numB)) return 0;

    // Normal sort. Smaller team numbers return a negative value and are sorted before larger numbers.
    return numA - numB;
  })

  const activeFilterCount = [
    Season !== 'N/A' ? Season : null,
    Drivetrain !== 'N/A' ? Drivetrain : null,
    ...selectedTags.filter((tag) => tag !== 'N/A'),
  ].length;

  return (
    <div className={`App ${isMobile ? 'mobile' : 'computer'}`}>
      <Navbar isMobile={isMobile} />
      <main className="catalog-shell">
        <section className="catalog-intro">
          <div>
            <p className="eyebrow">FTC mechanism library</p>
            <h1>Find the mechanism behind the match.</h1>
            <p className="intro-copy">Browse proven robot designs, compare build choices, and jump straight into the CAD.</p>
          </div>
          <div className="catalog-stat" aria-label={`${cards.length} designs shown`}>
            <strong>{cards.length}</strong>
            <span>designs shown</span>
          </div>
        </section>

        <section className="catalog-toolbar" aria-label="Catalog controls">
          <label className="search-field">
            <span className="sr-only">Search designs</span>
            <span className="search-icon" aria-hidden="true">⌕</span>
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search robots, teams, or mechanisms"
            />
            {searchQuery && (
              <button className="clear-search" type="button" onClick={() => setSearchQuery('')} aria-label="Clear search">×</button>
            )}
          </label>
          <div className="toolbar-actions">
            <span className="result-count">{cards.length} of {allCards.length} designs</span>
            <MechanismHandler Tags={TagsList} setSeason={setSeason} setDrive={setDrivetrain} setTags={setTags} onClear={clearFilters} clearSignal={filterReset} />
            <button className="admin-trigger" type="button" onClick={() => setIsAdminOpen(true)}>Admin</button>
          </div>
        </section>

        {activeFilterCount > 0 && (
          <div className="active-filters" aria-live="polite">
            <span className="active-label">Filtering by</span>
            <span className="filter-count">{activeFilterCount}</span>
            <button className="clear-all" type="button" onClick={() => document.querySelector('.clear-button')?.click()}>
              Clear filters
            </button>
          </div>
        )}

        {cards.length === 0 && (
          <div className="empty-state">
            <span className="empty-icon" aria-hidden="true">⌕</span>
            <h2>No designs found</h2>
            <p>Try a different search or clear your filters to see more robots.</p>
          </div>
        )}
      <div className={`card-container ${isMobile ? 'mobile' : 'computer'}`}>
        {cards.map((card) => (
          <Card
            key={card.id}
            title={card.title}
            description={card.description}
            imageLink={card.imageLink}
            teamLink={card.teamLink}
            teamName={card.teamName}
            teamNumber={card.teamNumber}
            cadLink={card.cadLink}
            cadText={card.cadText}
            tags={card.tags}
            season = {card.season}
            drivetrain = {card.drive}
            isMobile={isMobile}
            onClick={() => handleCardClick(card)}
            isFullscreen  = {card.id === selectedCard}
          />
        ))}
      </div>
      </main>
        <AdminPanel
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
          onAddDesign={handleAddDesign}
          isAuthenticated={isAdminAuthenticated}
          onLogin={handleAdminLogin}
          onLogout={handleAdminLogout}
          isSupabaseConfigured={isSupabaseConfigured}
          isPasswordRecovery={isPasswordRecovery}
          onRequestPasswordReset={handlePasswordResetRequest}
          onUpdatePassword={handlePasswordUpdate}
        />
    </div>
  );
}

export default App;
