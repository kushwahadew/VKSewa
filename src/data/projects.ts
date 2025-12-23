export interface Project {
    id: string;
    slug: string;
    title: string;
    category: string;
    desc: string;
    fullContent?: string;
    impact: string;
    gradient: string;
    image: string;
    stats?: { label: string; value: string }[];
    timeline?: { date: string; event: string }[];
}

export const projects: Project[] = [
    {
        id: "1",
        slug: "project-vidya",
        title: "Project Vidya",
        category: "Education",
        desc: "Providing digital literacy and quality education resources to rural schools.",
        fullContent: "Project Vidya is our cornerstone initiative aimed at bridging the digital divide in rural India. We believe that access to technology is a basic right that can transform the educational landscape of underdeveloped regions. By setting up Digital Learning Centers within government schools, we provide students with hands-on experience with modern computing tools, high-speed internet, and a curated curriculum that includes coding, digital arts, and STEM subjects. Our approach isn't just about hardware; we invest heavily in pedagogical training for local teachers, ensuring that the technology becomes a tool for creative expression and critical thinking rather than just a passive screen.",
        impact: "5,000+ Students",
        gradient: "from-blue-500 to-cyan-500",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop",
        stats: [
            { label: "Labs Built", value: "50+" },
            { label: "Teachers Trained", value: "150+" },
            { label: "Tablets Provided", value: "1,200+" }
        ],
        timeline: [
            { date: "Jan 2024", event: "Pilot program launched in 5 schools" },
            { date: "May 2024", event: "Expansion to 20 districts" },
            { date: "Oct 2024", event: "Reached milestone of 5,000 students" }
        ]
    },
    {
        id: "2",
        slug: "swasthya-sewa",
        title: "Swasthya Sewa",
        category: "Healthcare",
        desc: "Mobile health clinics providing free checkups and medicines to remote villages.",
        fullContent: "The challenge of rural healthcare in India is often one of accessibility. Swasthya Sewa addresses this head-on by deploying 'Clinics on Wheels'—fully equipped medical vans that travel to the most remote corners of the country. Each unit is staffed with a doctor, a nurse, and a technician, capable of performing basic diagnostics, administering vaccinations, and distributing essential medicines. We prioritize maternal and child health, regular screenings for lifestyle diseases like diabetes and hypertension, and emergency first-aid awareness. Beyond treatment, we focus on community health education, teaching preventative hygiene and nutrition to built resilient, healthy villages.",
        impact: "20,000+ Patients",
        gradient: "from-emerald-500 to-teal-500",
        image: "https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=2070&auto=format&fit=crop",
        stats: [
            { label: "Mobile Units", value: "5" },
            { label: "Free Camps", value: "200+" },
            { label: "Staff Medics", value: "25+" }
        ],
        timeline: [
            { date: "Feb 2024", event: "First mobile unit deployed" },
            { date: "Aug 2024", event: "Tele-medicine integration launched" },
            { date: "Dec 2024", event: "Served 20,000th patient" }
        ]
    },
    {
        id: "3",
        slug: "green-earth",
        title: "Green Earth",
        category: "Environment",
        desc: "Community-led reforestation and waste management programs to promote environmental sustainability.",
        fullContent: "Green Earth is a movement to restore the ecological balance of rural landscapes while creating sustainable livelihoods. Our mission is twofold: massive reforestation through community participation and the implementation of localized circular economies for waste. We provide saplings and training to farmers for agro-forestry, which helps improve soil health and provides additional income. Simultanously, we are setting up village-level waste processing units that convert organic waste into high-quality compost and manage plastic waste responsibly. This project proves that environmental conservation and economic growth can go hand-in-hand.",
        impact: "100,000+ Trees",
        gradient: "from-orange-500 to-red-500",
        image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013&auto=format&fit=crop",
        stats: [
            { label: "Trees Planted", value: "100k+" },
            { label: "Waste Units", value: "10" },
            { label: "Plastic Recycled", value: "5 Tons" }
        ]
    },
    {
        id: "4",
        slug: "skill-up",
        title: "Skill Up",
        category: "Livelihood",
        desc: "Vocational training for youth and women to help them become financially independent and skilled.",
        fullContent: "Skill Up is dedicated to unlocking the economic potential of India's rural workforce. Many talented individuals remain unemployed or underemployed due to a lack of market-relevant skills. Our vocational training centers offer intensive courses in high-demand fields such as computer hardware repair, digital marketing, sustainable tailoring, and modern agricultural techniques. We go beyond training by providing job placement assistance and micro-entrepreneurship support, including guidance on how to secure micro-loans and manage small businesses. Our goal is to create a generation of confident, financially independent individuals who drive the growth of their own communities.",
        impact: "2,500+ Trained",
        gradient: "from-purple-500 to-pink-500",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop",
        stats: [
            { label: "Placed in Jobs", value: "1,200+" },
            { label: "Startups Formed", value: "300+" },
            { label: "Centers Open", value: "8" }
        ]
    }
];
