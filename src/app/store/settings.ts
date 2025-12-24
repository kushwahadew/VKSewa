import { create } from "zustand";
import { firestoreService } from "@/lib/firestoreService";

// --- Homepage Types ---
export type HeroSettings = {
    badge: string;
    title: string;
    titleGradient: string;
    description: string;
    primaryBtn: string;
    secondaryBtn: string;
    announcement?: string;
};

export type MissionItem = {
    title: string;
    description: string;
};

export type MissionSettings = {
    title: string;
    titleGradient: string;
    paragraphs: string[];
    image: string;
    experienceYears: string;
    items: MissionItem[]; // For Transparency, Sustainability, etc.
};

export type StatItem = {
    label: string;
    value: string;
    color: string;
};

export type StatsSettings = {
    items: StatItem[];
};

export type CTASettings = {
    title: string;
    titleGradient: string;
    description: string;
    primaryBtn: string;
    secondaryBtn: string;
};

// --- About Page Types ---
export type AboutHeroSettings = {
    badge: string;
    title: string;
    titleGradient: string;
    description: string;
};

export type AboutStorySettings = {
    title: string;
    titleGradient: string;
    paragraphs: string[];
    image: string;
    foundationYear: string;
    foundationLabel: string;
};

export type AboutMissionVision = {
    missionTitle: string;
    missionDesc: string;
    visionTitle: string;
    visionDesc: string;
};

export type ValueItem = {
    title: string;
    desc: string;
    icon: string;
};

export type TeamMember = {
    name: string;
    role: string;
    image: string;
};

export type AboutContent = {
    hero: AboutHeroSettings;
    story: AboutStorySettings;
    mv: AboutMissionVision;
    values: ValueItem[];
    team: TeamMember[];
};

// --- Contact Page Types ---
export type ContactInfoItem = {
    label: string;
    value: string;
    href: string;
    icon: string; // lucide icon name
    color: string;
};

export type ContactContent = {
    hero: {
        badge: string;
        title: string;
        description: string;
    };
    info: ContactInfoItem[];
    support: {
        title: string;
        description: string;
        btnText: string;
    };
};

export type SettingsState = {
    // Homepage
    hero: HeroSettings;
    mission: MissionSettings;
    stats: StatsSettings;
    cta: CTASettings;

    // Pages
    about: AboutContent;
    contact: ContactContent;

    loading: boolean;
    fetchSettings: () => Promise<void>;
    updateHero: (data: Partial<HeroSettings>) => Promise<void>;
    updateMission: (data: Partial<MissionSettings>) => Promise<void>;
    updateStats: (data: Partial<StatsSettings>) => Promise<void>;
    updateCTA: (data: Partial<CTASettings>) => Promise<void>;
    updateAbout: (data: Partial<AboutContent>) => Promise<void>;
    updateContact: (data: Partial<ContactContent>) => Promise<void>;
    seedSettings: () => Promise<void>;
};

// --- DEFAULTS ---

const DEFAULT_HERO: HeroSettings = {
    badge: "Empowering Communities with Purpose & Technology",
    title: "Transforming Lives",
    titleGradient: "Through Innovation",
    description: "VK Sewa Foundation is a non-profit organization dedicated to bridging the gap between resources and rural needs through transparent, technology-driven social impact initiatives.",
    primaryBtn: "EXPLORE OUR MISSION",
    secondaryBtn: "VIEW IMPACT REPORT",
    announcement: "Our core initiative to showcase and highlight important announcements",
};

const DEFAULT_MISSION: MissionSettings = {
    title: "Why We Do",
    titleGradient: "What We Do",
    paragraphs: [
        "At VK Sewa Foundation, we believe that every individual deserves access to basic necessities and opportunities for growth. Our journey started with a simple observation: the vast disparity in resources between urban and rural India.",
        "We leverage modern technology to ensure that every rupee donated reaches its intended destination. Our transparent tracking systems and community-led approach make us a trusted partner for social change.",
        "From micro-finance to digital literacy, our programs are designed to be sustainable and scalable. We don't just provide aid; we build ecosystems that empower people to help themselves."
    ],
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop",
    experienceYears: "10+",
    items: [
        { title: "Transparency", description: "Real-time tracking of every project and donation." },
        { title: "Sustainability", description: "Long-term solutions that create lasting impact." }
    ]
};

const DEFAULT_STATS: StatsSettings = {
    items: [
        { label: "Lives Impacted", value: "50,000+", color: "text-teal-400" },
        { label: "Villages Reached", value: "200+", color: "text-emerald-400" },
        { label: "Volunteers", value: "1,500+", color: "text-cyan-400" },
        { label: "Projects", value: "12+", color: "text-blue-400" }
    ],
};

const DEFAULT_CTA: CTASettings = {
    title: "Be the Change",
    titleGradient: "You Wish to See",
    description: "Your contribution, no matter how small, can spark a revolution in someone's life. Join us in our mission to create a more equitable world.",
    primaryBtn: "DONATE NOW",
    secondaryBtn: "BECOME A VOLUNTEER",
};

const DEFAULT_ABOUT: AboutContent = {
    hero: {
        badge: "Our Story & Purpose",
        title: "Driven by",
        titleGradient: "Compassion",
        description: "VK Sewa Foundation is more than just a non-profit; it's a movement dedicated to redefining social impact through the lens of technology and radical transparency."
    },
    story: {
        title: "The Journey of",
        titleGradient: "VK Sewa",
        paragraphs: [
            "Founded in 2014, VK Sewa Foundation emerged from a collective desire to address the systemic challenges faced by rural communities in India. What started as a small group of volunteers providing weekend literacy classes has grown into a multi-faceted organization impacting thousands of lives.",
            "We realized early on that traditional charity models often lacked accountability and long-term sustainability. This led us to integrate technology into our core operations, ensuring that every initiative is data-driven and every donation is traceable.",
            "Today, we operate across five states, focusing on education, healthcare, micro-finance, and sustainable agriculture. Our team consists of passionate professionals, tech experts, and dedicated field workers who share a common goal: to build a future where opportunity is not a privilege of the few."
        ],
        image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=1931&auto=format&fit=crop",
        foundationYear: "2014",
        foundationLabel: "Founded"
    },
    mv: {
        missionTitle: "Our Mission",
        missionDesc: "To empower underprivileged communities by providing access to quality education, healthcare, and sustainable livelihood opportunities. We believe in creating a world where every individual has the chance to thrive through self-reliance and dignity.",
        visionTitle: "Our Vision",
        visionDesc: "A future where technology and compassion work hand-in-hand to eliminate poverty and inequality. We envision a society built on transparency, empathy, and collective action, where every child can dream without boundaries."
    },
    values: [
        { title: "Transparency", icon: "Shield", desc: "We maintain radical honesty in our operations. Every rupee donated is tracked, and every project's progress is shared in real-time with our stakeholders." },
        { title: "Innovation", icon: "Zap", desc: "We don't just follow best practices; we create them. By leveraging AI, blockchain, and mobile tech, we solve complex social problems more efficiently." },
        { title: "Empathy", icon: "Heart", desc: "We listen before we act. Our programs are co-created with the communities we serve, ensuring that our solutions are culturally relevant and truly needed." }
    ],
    team: [
        { name: "Team Member 1", role: "Role Title", image: "" },
        { name: "Team Member 2", role: "Role Title", image: "" },
        { name: "Team Member 3", role: "Role Title", image: "" },
        { name: "Team Member 4", role: "Role Title", image: "" }
    ]
};

const DEFAULT_CONTACT: ContactContent = {
    hero: {
        badge: "Get in Touch",
        title: "Let's Connect",
        description: "Questions or collaboration? We're here to help."
    },
    info: [
        { label: "Email", value: "contact@vkseva.org", href: "mailto:contact@vkseva.org", icon: "Mail", color: "bg-teal-500/10 text-teal-500" },
        { label: "Office", value: "Kankarbagh, Bihar, 800020", href: "#", icon: "MapPin", color: "bg-emerald-500/10 text-emerald-500" },
        { label: "Phone", value: "+91 98765 43210", href: "tel:+919876543210", icon: "Phone", color: "bg-cyan-500/10 text-cyan-500" }
    ],
    support: {
        title: "Support Our Cause",
        description: "Your contribution helps us bridge the gap for rural communities.",
        btnText: "DONATE NOW"
    }
};

export const useSettingsStore = create<SettingsState>((set, get) => ({
    hero: DEFAULT_HERO,
    mission: DEFAULT_MISSION,
    stats: DEFAULT_STATS,
    cta: DEFAULT_CTA,
    about: DEFAULT_ABOUT,
    contact: DEFAULT_CONTACT,
    loading: false,

    fetchSettings: async () => {
        if (get().loading) return;
        set({ loading: true });
        try {
            let hero = await firestoreService.getSettings<HeroSettings>("hero");

            // Seed if hero is missing (assume fresh install)
            if (!hero) {
                console.log("Seeding settings...");
                await firestoreService.updateSettings("hero", DEFAULT_HERO);
                await firestoreService.updateSettings("mission", DEFAULT_MISSION);
                await firestoreService.updateSettings("stats", DEFAULT_STATS);
                await firestoreService.updateSettings("cta", DEFAULT_CTA);
                await firestoreService.updateSettings("about", DEFAULT_ABOUT);
                await firestoreService.updateSettings("contact", DEFAULT_CONTACT);
                hero = DEFAULT_HERO;
            }

            const mission = await firestoreService.getSettings<MissionSettings>("mission");
            const stats = await firestoreService.getSettings<StatsSettings>("stats");
            const cta = await firestoreService.getSettings<CTASettings>("cta");
            const about = await firestoreService.getSettings<AboutContent>("about");
            const contact = await firestoreService.getSettings<ContactContent>("contact");

            set({
                hero: hero ? { ...DEFAULT_HERO, ...hero } : DEFAULT_HERO,
                mission: mission ? { ...DEFAULT_MISSION, ...mission } : DEFAULT_MISSION,
                stats: stats ? { ...DEFAULT_STATS, ...stats } : DEFAULT_STATS,
                cta: cta ? { ...DEFAULT_CTA, ...cta } : DEFAULT_CTA,
                about: about ? { ...DEFAULT_ABOUT, ...about } : DEFAULT_ABOUT,
                contact: contact ? { ...DEFAULT_CONTACT, ...contact } : DEFAULT_CONTACT,
                loading: false,
            });
        } catch (err) {
            console.error("Fetch settings failed:", err);
            set({ loading: false });
        }
    },

    updateHero: async (data) => {
        const next = { ...get().hero, ...data };
        await firestoreService.updateSettings("hero", next);
        set({ hero: next });
    },

    updateMission: async (data) => {
        const next = { ...get().mission, ...data };
        await firestoreService.updateSettings("mission", next);
        set({ mission: next });
    },

    updateStats: async (data) => {
        const next = { ...get().stats, ...data };
        await firestoreService.updateSettings("stats", next);
        set({ stats: next });
    },

    updateCTA: async (data) => {
        const next = { ...get().cta, ...data };
        await firestoreService.updateSettings("cta", next);
        set({ cta: next });
    },

    updateAbout: async (data) => {
        const next = { ...get().about, ...data };
        await firestoreService.updateSettings("about", next);
        set({ about: next });
    },

    updateContact: async (data) => {
        const next = { ...get().contact, ...data };
        await firestoreService.updateSettings("contact", next);
        set({ contact: next });
    },

    seedSettings: async () => {
        await get().fetchSettings();
    }
}));
