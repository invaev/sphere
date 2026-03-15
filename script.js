/* ============================================
   Network Galaxy Explorer
   Countries → Cities → Companies drill-down
   ============================================ */

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const modal = document.getElementById('modal');
const modalText = document.getElementById('modal-text');
const modalTitle = document.getElementById('modalTitle');
const modalStats = document.getElementById('modalStats');
const closeModal = document.querySelector('.close');
const tooltip = document.getElementById('nodeTooltip');
const tooltipId = document.getElementById('tooltipId');
const tooltipPos = document.getElementById('tooltipPos');
const tooltipDepth = document.getElementById('tooltipDepth');

// ─── HIERARCHICAL DATA ───
const DATA = {
    "United States": {
        cities: {
            "San Francisco": [
                { name: "Google", desc: "Search engine and cloud computing giant", url: "https://google.com" },
                { name: "Salesforce", desc: "Cloud-based CRM platform", url: "https://salesforce.com" },
                { name: "Uber", desc: "Ride-sharing and delivery platform", url: "https://uber.com" },
                { name: "Airbnb", desc: "Online marketplace for lodging and tourism", url: "https://airbnb.com" },
                { name: "Stripe", desc: "Online payment processing platform", url: "https://stripe.com" },
                { name: "Cloudflare", desc: "Web security and CDN services", url: "https://cloudflare.com" },
                { name: "Figma", desc: "Collaborative design tool", url: "https://figma.com" },
                { name: "Discord", desc: "Voice, video, and text communication", url: "https://discord.com" },
                { name: "Twitch", desc: "Live streaming platform for gamers", url: "https://twitch.tv" },
                { name: "Dropbox", desc: "Cloud storage and collaboration", url: "https://dropbox.com" },
            ],
            "New York": [
                { name: "Bloomberg", desc: "Financial data and media company", url: "https://bloomberg.com" },
                { name: "JPMorgan", desc: "Global financial services firm", url: "https://jpmorganchase.com" },
                { name: "Goldman Sachs", desc: "Investment banking and securities", url: "https://goldmansachs.com" },
                { name: "Mastercard", desc: "Global payments technology company", url: "https://mastercard.com" },
                { name: "Pfizer", desc: "Pharmaceutical and biotech corporation", url: "https://pfizer.com" },
                { name: "MongoDB", desc: "NoSQL database platform", url: "https://mongodb.com" },
                { name: "Peloton", desc: "Connected fitness platform", url: "https://onepeloton.com" },
                { name: "Etsy", desc: "E-commerce for handmade goods", url: "https://etsy.com" },
                { name: "Oscar Health", desc: "Health insurance technology", url: "https://hioscar.com" },
            ],
            "Seattle": [
                { name: "Amazon", desc: "E-commerce and cloud computing leader", url: "https://amazon.com" },
                { name: "Microsoft", desc: "Software, cloud, and AI technology", url: "https://microsoft.com" },
                { name: "Boeing", desc: "Aerospace and defense manufacturer", url: "https://boeing.com" },
                { name: "Expedia", desc: "Online travel shopping company", url: "https://expedia.com" },
                { name: "Zillow", desc: "Real estate marketplace", url: "https://zillow.com" },
                { name: "Redfin", desc: "Real estate brokerage", url: "https://redfin.com" },
            ],
            "Austin": [
                { name: "Tesla", desc: "Electric vehicles and clean energy", url: "https://tesla.com" },
                { name: "Dell", desc: "Computer technology company", url: "https://dell.com" },
                { name: "Oracle", desc: "Enterprise software and cloud", url: "https://oracle.com" },
                { name: "SpaceX", desc: "Aerospace manufacturer and space transport", url: "https://spacex.com" },
                { name: "Indeed", desc: "Job search engine", url: "https://indeed.com" },
            ],
            "Los Angeles": [
                { name: "Snap", desc: "Camera and social media company", url: "https://snap.com" },
                { name: "Riot Games", desc: "Video game developer and publisher", url: "https://riotgames.com" },
                { name: "Hulu", desc: "Subscription streaming service", url: "https://hulu.com" },
                { name: "TikTok US", desc: "Short-form video platform (US ops)", url: "https://tiktok.com" },
            ],
            "Cupertino": [
                { name: "Apple", desc: "Consumer electronics and software", url: "https://apple.com" },
            ],
            "Menlo Park": [
                { name: "Meta", desc: "Social media and metaverse technology", url: "https://meta.com" },
            ],
            "San Jose": [
                { name: "Cisco", desc: "Networking hardware and telecom", url: "https://cisco.com" },
                { name: "Adobe", desc: "Creative and document software", url: "https://adobe.com" },
                { name: "eBay", desc: "Online auction and shopping", url: "https://ebay.com" },
                { name: "PayPal", desc: "Online payments platform", url: "https://paypal.com" },
                { name: "Zoom", desc: "Video communications platform", url: "https://zoom.us" },
            ],
            "Santa Clara": [
                { name: "Intel", desc: "Semiconductor chip manufacturer", url: "https://intel.com" },
                { name: "NVIDIA", desc: "GPU and AI computing leader", url: "https://nvidia.com" },
                { name: "AMD", desc: "Semiconductor and processor maker", url: "https://amd.com" },
            ],
            "Chicago": [
                { name: "McDonald's", desc: "Global fast food restaurant chain", url: "https://mcdonalds.com" },
                { name: "Grubhub", desc: "Food delivery marketplace", url: "https://grubhub.com" },
                { name: "Groupon", desc: "E-commerce marketplace for deals", url: "https://groupon.com" },
            ],
            "Boston": [
                { name: "HubSpot", desc: "Inbound marketing and sales software", url: "https://hubspot.com" },
                { name: "Wayfair", desc: "Online furniture and home goods", url: "https://wayfair.com" },
                { name: "Toast", desc: "Restaurant technology platform", url: "https://toasttab.com" },
                { name: "DraftKings", desc: "Digital sports entertainment", url: "https://draftkings.com" },
            ],
            "Denver": [
                { name: "Arrow Electronics", desc: "Electronics distribution", url: "https://arrow.com" },
                { name: "Guild Education", desc: "Education benefits platform", url: "https://guildeducation.com" },
            ],
            "Atlanta": [
                { name: "Coca-Cola", desc: "Beverage corporation", url: "https://coca-colacompany.com" },
                { name: "UPS", desc: "Package delivery and logistics", url: "https://ups.com" },
                { name: "Home Depot", desc: "Home improvement retailer", url: "https://homedepot.com" },
                { name: "NCR", desc: "Enterprise technology for restaurants", url: "https://ncr.com" },
            ],
            "Washington DC": [
                { name: "Palantir", desc: "Big data analytics platform", url: "https://palantir.com" },
                { name: "Booz Allen", desc: "IT consulting and defense", url: "https://boozallen.com" },
            ],
            "Detroit": [
                { name: "General Motors", desc: "Automobile manufacturer", url: "https://gm.com" },
                { name: "Ford", desc: "Automobile manufacturer", url: "https://ford.com" },
                { name: "Rivian", desc: "Electric vehicle manufacturer", url: "https://rivian.com" },
            ],
            "Miami": [
                { name: "Citadel", desc: "Hedge fund and financial services", url: "https://citadel.com" },
                { name: "Chewy", desc: "Online pet products retailer", url: "https://chewy.com" },
            ],
            "Minneapolis": [
                { name: "Target", desc: "Retail corporation", url: "https://target.com" },
                { name: "Best Buy", desc: "Consumer electronics retailer", url: "https://bestbuy.com" },
            ],
            "Portland": [
                { name: "Nike", desc: "Athletic footwear and apparel", url: "https://nike.com" },
                { name: "Columbia Sportswear", desc: "Outdoor apparel company", url: "https://columbia.com" },
            ],
            "Pittsburgh": [
                { name: "Duolingo", desc: "Language learning platform", url: "https://duolingo.com" },
                { name: "Argo AI", desc: "Self-driving technology", url: "https://argo.ai" },
            ],
            "Raleigh": [
                { name: "Red Hat", desc: "Enterprise open-source software", url: "https://redhat.com" },
                { name: "Epic Games", desc: "Game developer (Fortnite, Unreal)", url: "https://epicgames.com" },
            ],
            "Salt Lake City": [
                { name: "Qualtrics", desc: "Experience management platform", url: "https://qualtrics.com" },
                { name: "Pluralsight", desc: "Technology skills platform", url: "https://pluralsight.com" },
            ],
            "Phoenix": [
                { name: "GoDaddy", desc: "Domain registrar and web hosting", url: "https://godaddy.com" },
                { name: "Carvana", desc: "Online used car dealer", url: "https://carvana.com" },
            ],
        }
    },
    "United Kingdom": {
        cities: {
            "London": [
                { name: "DeepMind", desc: "AI research laboratory by Alphabet", url: "https://deepmind.com" },
                { name: "Revolut", desc: "Digital banking and financial services", url: "https://revolut.com" },
                { name: "Wise", desc: "International money transfer service", url: "https://wise.com" },
                { name: "ARM", desc: "Semiconductor and software design", url: "https://arm.com" },
                { name: "Monzo", desc: "Digital-first bank", url: "https://monzo.com" },
                { name: "Deliveroo", desc: "Online food delivery platform", url: "https://deliveroo.com" },
                { name: "Starling Bank", desc: "Digital challenger bank", url: "https://starlingbank.com" },
                { name: "Checkout.com", desc: "Payment processing platform", url: "https://checkout.com" },
                { name: "HSBC", desc: "Global banking and financial services", url: "https://hsbc.com" },
                { name: "Barclays", desc: "Multinational investment bank", url: "https://barclays.com" },
            ],
            "Cambridge": [
                { name: "Darktrace", desc: "AI cybersecurity company", url: "https://darktrace.com" },
                { name: "Improbable", desc: "Virtual worlds technology", url: "https://improbable.io" },
                { name: "Raspberry Pi", desc: "Single-board computer maker", url: "https://raspberrypi.com" },
            ],
            "Edinburgh": [
                { name: "Skyscanner", desc: "Travel search engine", url: "https://skyscanner.com" },
                { name: "FanDuel", desc: "Online sports betting platform", url: "https://fanduel.com" },
            ],
            "Manchester": [
                { name: "The Hut Group", desc: "E-commerce and technology", url: "https://thg.com" },
                { name: "Boohoo", desc: "Online fashion retailer", url: "https://boohoo.com" },
                { name: "AO.com", desc: "Online electronics retailer", url: "https://ao.com" },
            ],
            "Bristol": [
                { name: "Graphcore", desc: "AI processor chip maker", url: "https://graphcore.ai" },
                { name: "Ultrahaptics", desc: "Haptic technology company", url: "https://ultraleap.com" },
            ],
            "Oxford": [
                { name: "Oxford Nanopore", desc: "DNA sequencing technology", url: "https://nanoporetech.com" },
                { name: "Sophos", desc: "Cybersecurity company", url: "https://sophos.com" },
            ],
        }
    },
    "Germany": {
        cities: {
            "Berlin": [
                { name: "SAP", desc: "Enterprise software corporation", url: "https://sap.com" },
                { name: "Delivery Hero", desc: "Online food ordering platform", url: "https://deliveryhero.com" },
                { name: "SoundCloud", desc: "Audio streaming platform", url: "https://soundcloud.com" },
                { name: "N26", desc: "Mobile banking platform", url: "https://n26.com" },
                { name: "Zalando", desc: "Online fashion platform", url: "https://zalando.com" },
                { name: "HelloFresh", desc: "Meal kit delivery service", url: "https://hellofresh.com" },
                { name: "Auto1", desc: "Used car trading platform", url: "https://auto1-group.com" },
            ],
            "Munich": [
                { name: "BMW", desc: "Luxury automobile manufacturer", url: "https://bmw.com" },
                { name: "Siemens", desc: "Industrial manufacturing conglomerate", url: "https://siemens.com" },
                { name: "Celonis", desc: "Process mining software company", url: "https://celonis.com" },
                { name: "Allianz", desc: "Insurance and financial services", url: "https://allianz.com" },
                { name: "Lilium", desc: "Electric air taxi manufacturer", url: "https://lilium.com" },
            ],
            "Stuttgart": [
                { name: "Mercedes-Benz", desc: "Premium automobile manufacturer", url: "https://mercedes-benz.com" },
                { name: "Porsche", desc: "Luxury sports car manufacturer", url: "https://porsche.com" },
                { name: "Bosch", desc: "Engineering and technology company", url: "https://bosch.com" },
            ],
            "Hamburg": [
                { name: "Otto Group", desc: "E-commerce and retail group", url: "https://ottogroup.com" },
                { name: "About You", desc: "Online fashion platform", url: "https://aboutyou.com" },
            ],
            "Frankfurt": [
                { name: "Deutsche Bank", desc: "Global banking leader", url: "https://db.com" },
                { name: "Commerzbank", desc: "Major commercial bank", url: "https://commerzbank.com" },
            ],
            "Cologne": [
                { name: "REWE Digital", desc: "Digital grocery retail", url: "https://rewe-digital.com" },
            ],
        }
    },
    "France": {
        cities: {
            "Paris": [
                { name: "Mistral AI", desc: "Frontier AI research company", url: "https://mistral.ai" },
                { name: "Dassault Systèmes", desc: "3D design and engineering software", url: "https://3ds.com" },
                { name: "BlaBlaCar", desc: "Carpooling and bus marketplace", url: "https://blablacar.com" },
                { name: "Datadog", desc: "Cloud monitoring and analytics", url: "https://datadoghq.com" },
                { name: "Ubisoft", desc: "Video game publisher", url: "https://ubisoft.com" },
                { name: "Criteo", desc: "Digital advertising platform", url: "https://criteo.com" },
                { name: "OVHcloud", desc: "Cloud computing provider", url: "https://ovhcloud.com" },
                { name: "Doctolib", desc: "Healthcare appointment platform", url: "https://doctolib.fr" },
                { name: "Contentsquare", desc: "Digital experience analytics", url: "https://contentsquare.com" },
            ],
            "Lyon": [
                { name: "Esker", desc: "Document process automation", url: "https://esker.com" },
                { name: "Sanofi Lyon", desc: "Pharma research facility", url: "https://sanofi.com" },
            ],
            "Toulouse": [
                { name: "Airbus", desc: "Aerospace manufacturer", url: "https://airbus.com" },
            ],
            "Sophia Antipolis": [
                { name: "Amadeus IT", desc: "Travel technology company", url: "https://amadeus.com" },
            ],
        }
    },
    "China": {
        cities: {
            "Beijing": [
                { name: "ByteDance", desc: "Social media and AI technology (TikTok)", url: "https://bytedance.com" },
                { name: "Baidu", desc: "Internet services and AI company", url: "https://baidu.com" },
                { name: "Xiaomi", desc: "Consumer electronics manufacturer", url: "https://mi.com" },
                { name: "JD.com", desc: "E-commerce and technology company", url: "https://jd.com" },
                { name: "Meituan", desc: "Food delivery and services platform", url: "https://meituan.com" },
                { name: "Kuaishou", desc: "Short video and live streaming", url: "https://kuaishou.com" },
                { name: "Didi", desc: "Ride-hailing platform", url: "https://didiglobal.com" },
            ],
            "Shenzhen": [
                { name: "Tencent", desc: "Internet and technology conglomerate", url: "https://tencent.com" },
                { name: "Huawei", desc: "Telecommunications equipment maker", url: "https://huawei.com" },
                { name: "DJI", desc: "Drone and camera technology maker", url: "https://dji.com" },
                { name: "BYD", desc: "Electric vehicle manufacturer", url: "https://byd.com" },
                { name: "OnePlus", desc: "Smartphone manufacturer", url: "https://oneplus.com" },
                { name: "ZTE", desc: "Telecom equipment and systems", url: "https://zte.com.cn" },
            ],
            "Hangzhou": [
                { name: "Alibaba", desc: "E-commerce and cloud computing", url: "https://alibaba.com" },
                { name: "NetEase", desc: "Internet technology company", url: "https://netease.com" },
                { name: "Hikvision", desc: "Video surveillance manufacturer", url: "https://hikvision.com" },
            ],
            "Shanghai": [
                { name: "Pinduoduo", desc: "E-commerce platform", url: "https://pinduoduo.com" },
                { name: "NIO", desc: "Electric vehicle manufacturer", url: "https://nio.com" },
                { name: "Bilibili", desc: "Video sharing and anime platform", url: "https://bilibili.com" },
                { name: "Trip.com", desc: "Online travel agency", url: "https://trip.com" },
            ],
            "Guangzhou": [
                { name: "WeRide", desc: "Autonomous driving technology", url: "https://weride.ai" },
                { name: "SHEIN", desc: "Fast fashion e-commerce", url: "https://shein.com" },
            ],
            "Chengdu": [
                { name: "Tencent Chengdu", desc: "Tencent game development studio", url: "https://tencent.com" },
            ],
            "Wuhan": [
                { name: "Yangtze Memory", desc: "NAND flash memory manufacturer", url: "https://ymtc.com" },
            ],
        }
    },
    "Japan": {
        cities: {
            "Tokyo": [
                { name: "Sony", desc: "Electronics, gaming, and entertainment", url: "https://sony.com" },
                { name: "Toyota", desc: "World's largest automaker", url: "https://toyota.com" },
                { name: "SoftBank", desc: "Telecom and investment conglomerate", url: "https://softbank.com" },
                { name: "Nintendo", desc: "Video game company", url: "https://nintendo.com" },
                { name: "Rakuten", desc: "E-commerce and fintech services", url: "https://rakuten.com" },
                { name: "Honda", desc: "Automobile and motorcycle manufacturer", url: "https://honda.com" },
                { name: "NTT", desc: "Telecommunications company", url: "https://ntt.com" },
                { name: "Line", desc: "Messaging and internet services", url: "https://line.me" },
                { name: "Mercari", desc: "Consumer-to-consumer marketplace", url: "https://mercari.com" },
            ],
            "Osaka": [
                { name: "Panasonic", desc: "Electronics and industrial systems", url: "https://panasonic.com" },
                { name: "Keyence", desc: "Automation sensors and systems", url: "https://keyence.com" },
                { name: "Sharp", desc: "Electronics manufacturer", url: "https://sharp.com" },
            ],
            "Kyoto": [
                { name: "Kyocera", desc: "Ceramics and electronics maker", url: "https://kyocera.com" },
                { name: "Nintendo Kyoto", desc: "Nintendo headquarters", url: "https://nintendo.com" },
                { name: "Omron", desc: "Industrial automation company", url: "https://omron.com" },
            ],
            "Nagoya": [
                { name: "Toyota HQ", desc: "Toyota Motor Corporation HQ", url: "https://toyota.com" },
                { name: "Denso", desc: "Automotive components manufacturer", url: "https://denso.com" },
            ],
        }
    },
    "South Korea": {
        cities: {
            "Seoul": [
                { name: "Samsung", desc: "Electronics and semiconductor giant", url: "https://samsung.com" },
                { name: "LG", desc: "Electronics and chemicals conglomerate", url: "https://lg.com" },
                { name: "Hyundai", desc: "Automotive manufacturer", url: "https://hyundai.com" },
                { name: "Kakao", desc: "Internet and AI services", url: "https://kakaocorp.com" },
                { name: "Naver", desc: "Internet platform and AI company", url: "https://navercorp.com" },
                { name: "Coupang", desc: "E-commerce and delivery platform", url: "https://coupang.com" },
                { name: "SK Hynix", desc: "Semiconductor manufacturer", url: "https://skhynix.com" },
                { name: "Krafton", desc: "Video game developer (PUBG)", url: "https://krafton.com" },
            ],
            "Suwon": [
                { name: "Samsung HQ", desc: "Samsung Electronics headquarters", url: "https://samsung.com" },
            ],
            "Seongnam": [
                { name: "NCSoft", desc: "Video game developer", url: "https://ncsoft.com" },
                { name: "Nexon Korea", desc: "Online game publisher", url: "https://nexon.com" },
            ],
        }
    },
    "India": {
        cities: {
            "Bangalore": [
                { name: "Infosys", desc: "IT consulting and outsourcing", url: "https://infosys.com" },
                { name: "Wipro", desc: "IT services and consulting", url: "https://wipro.com" },
                { name: "Flipkart", desc: "E-commerce marketplace", url: "https://flipkart.com" },
                { name: "Swiggy", desc: "Food and grocery delivery", url: "https://swiggy.com" },
                { name: "Razorpay", desc: "Payment gateway platform", url: "https://razorpay.com" },
                { name: "Zerodha", desc: "Online stock brokerage", url: "https://zerodha.com" },
                { name: "BYJU'S", desc: "EdTech learning platform", url: "https://byjus.com" },
            ],
            "Mumbai": [
                { name: "TCS", desc: "IT services and consulting company", url: "https://tcs.com" },
                { name: "Reliance Jio", desc: "Telecom and digital services", url: "https://jio.com" },
                { name: "Tata Motors", desc: "Automobile manufacturer", url: "https://tatamotors.com" },
                { name: "Zomato", desc: "Food delivery and restaurant guide", url: "https://zomato.com" },
            ],
            "Hyderabad": [
                { name: "Google India", desc: "Google's largest office outside US", url: "https://google.co.in" },
                { name: "Microsoft India", desc: "Microsoft's development center", url: "https://microsoft.com/en-in" },
                { name: "Amazon India", desc: "Amazon's development center", url: "https://amazon.in" },
            ],
            "Delhi NCR": [
                { name: "Paytm", desc: "Digital payments and fintech", url: "https://paytm.com" },
                { name: "Ola", desc: "Ride-hailing and mobility", url: "https://olacabs.com" },
                { name: "PolicyBazaar", desc: "Insurance comparison platform", url: "https://policybazaar.com" },
            ],
            "Pune": [
                { name: "Persistent Systems", desc: "Digital engineering services", url: "https://persistent.com" },
                { name: "Cyient", desc: "Engineering and technology solutions", url: "https://cyient.com" },
            ],
            "Chennai": [
                { name: "Zoho", desc: "Business software suite", url: "https://zoho.com" },
                { name: "Freshworks", desc: "SaaS customer engagement", url: "https://freshworks.com" },
            ],
        }
    },
    "Canada": {
        cities: {
            "Toronto": [
                { name: "Shopify", desc: "E-commerce platform for online stores", url: "https://shopify.com" },
                { name: "Cohere", desc: "Enterprise AI and NLP platform", url: "https://cohere.com" },
                { name: "Wealthsimple", desc: "Automated investing platform", url: "https://wealthsimple.com" },
                { name: "Clio", desc: "Legal practice management software", url: "https://clio.com" },
            ],
            "Montreal": [
                { name: "Ubisoft Montreal", desc: "Major game development studio", url: "https://montreal.ubisoft.com" },
                { name: "Element AI", desc: "AI solutions provider", url: "https://elementai.com" },
                { name: "Lightspeed", desc: "POS and e-commerce platform", url: "https://lightspeedhq.com" },
            ],
            "Vancouver": [
                { name: "EA Vancouver", desc: "Electronic Arts game studio", url: "https://ea.com" },
                { name: "Slack", desc: "Business communication platform", url: "https://slack.com" },
                { name: "Hootsuite", desc: "Social media management", url: "https://hootsuite.com" },
            ],
            "Ottawa": [
                { name: "Shopify Ottawa", desc: "Shopify's headquarters", url: "https://shopify.com" },
                { name: "BlackBerry QNX", desc: "Embedded software for autos", url: "https://blackberry.qnx.com" },
            ],
            "Waterloo": [
                { name: "OpenText", desc: "Enterprise information management", url: "https://opentext.com" },
            ],
            "Calgary": [
                { name: "Benevity", desc: "Corporate social responsibility platform", url: "https://benevity.com" },
            ],
        }
    },
    "Netherlands": {
        cities: {
            "Amsterdam": [
                { name: "Booking.com", desc: "Online travel agency", url: "https://booking.com" },
                { name: "Adyen", desc: "Payment platform for businesses", url: "https://adyen.com" },
                { name: "TomTom", desc: "Navigation and mapping technology", url: "https://tomtom.com" },
                { name: "Elastic", desc: "Search and observability platform", url: "https://elastic.co" },
                { name: "MessageBird", desc: "Cloud communications platform", url: "https://messagebird.com" },
            ],
            "Veldhoven": [
                { name: "ASML", desc: "Semiconductor lithography systems maker", url: "https://asml.com" },
            ],
            "Eindhoven": [
                { name: "Philips", desc: "Health technology company", url: "https://philips.com" },
                { name: "NXP", desc: "Semiconductor manufacturer", url: "https://nxp.com" },
            ],
            "Rotterdam": [
                { name: "Coolblue", desc: "Online electronics retailer", url: "https://coolblue.nl" },
            ],
        }
    },
    "Sweden": {
        cities: {
            "Stockholm": [
                { name: "Spotify", desc: "Music streaming platform", url: "https://spotify.com" },
                { name: "Klarna", desc: "Buy now pay later fintech", url: "https://klarna.com" },
                { name: "King", desc: "Mobile game developer (Candy Crush)", url: "https://king.com" },
                { name: "Ericsson", desc: "Telecom equipment and services", url: "https://ericsson.com" },
                { name: "Mojang", desc: "Game studio (Minecraft)", url: "https://mojang.com" },
                { name: "iZettle", desc: "Mobile payments (now Zettle)", url: "https://zettle.com" },
            ],
            "Gothenburg": [
                { name: "Volvo", desc: "Automobile and truck manufacturer", url: "https://volvo.com" },
                { name: "DICE", desc: "Game studio (Battlefield)", url: "https://dice.se" },
            ],
            "Malmö": [
                { name: "Massive Entertainment", desc: "Ubisoft game studio", url: "https://massive.se" },
            ],
        }
    },
    "Israel": {
        cities: {
            "Tel Aviv": [
                { name: "Wix", desc: "Website builder platform", url: "https://wix.com" },
                { name: "Monday.com", desc: "Work management platform", url: "https://monday.com" },
                { name: "Fiverr", desc: "Freelance services marketplace", url: "https://fiverr.com" },
                { name: "Check Point", desc: "Cybersecurity solutions", url: "https://checkpoint.com" },
                { name: "IronSource", desc: "App monetization platform", url: "https://ironsrc.com" },
                { name: "Taboola", desc: "Content discovery platform", url: "https://taboola.com" },
            ],
            "Haifa": [
                { name: "Intel Israel", desc: "Intel's major R&D center", url: "https://intel.com" },
                { name: "Elbit Systems", desc: "Defense electronics company", url: "https://elbitsystems.com" },
            ],
            "Herzliya": [
                { name: "CyberArk", desc: "Identity security company", url: "https://cyberark.com" },
                { name: "SentinelOne", desc: "Autonomous cybersecurity", url: "https://sentinelone.com" },
            ],
        }
    },
    "Australia": {
        cities: {
            "Sydney": [
                { name: "Atlassian", desc: "Team collaboration software (Jira)", url: "https://atlassian.com" },
                { name: "Canva", desc: "Online graphic design platform", url: "https://canva.com" },
                { name: "Afterpay", desc: "Buy now pay later service", url: "https://afterpay.com" },
                { name: "SafetyCulture", desc: "Workplace safety platform", url: "https://safetyculture.com" },
            ],
            "Melbourne": [
                { name: "REA Group", desc: "Digital property advertising", url: "https://rea-group.com" },
                { name: "SEEK", desc: "Online employment marketplace", url: "https://seek.com.au" },
                { name: "Culture Amp", desc: "Employee experience platform", url: "https://cultureamp.com" },
            ],
            "Brisbane": [
                { name: "Halfbrick", desc: "Game studio (Fruit Ninja)", url: "https://halfbrick.com" },
            ],
            "Perth": [
                { name: "Fortescue", desc: "Iron ore and green energy", url: "https://fortescue.com" },
            ],
        }
    },
    "Singapore": {
        cities: {
            "Singapore": [
                { name: "Grab", desc: "Ride-hailing and delivery superapp", url: "https://grab.com" },
                { name: "Sea Group", desc: "Digital entertainment and e-commerce", url: "https://sea.com" },
                { name: "Razer", desc: "Gaming hardware and software", url: "https://razer.com" },
                { name: "Lazada", desc: "E-commerce platform (SE Asia)", url: "https://lazada.com" },
                { name: "Ninja Van", desc: "Last-mile delivery platform", url: "https://ninjavan.co" },
            ],
        }
    },
    "UAE": {
        cities: {
            "Dubai": [
                { name: "Careem", desc: "Ride-hailing and delivery app", url: "https://careem.com" },
                { name: "Noon", desc: "E-commerce marketplace", url: "https://noon.com" },
                { name: "Emirates", desc: "International airline", url: "https://emirates.com" },
                { name: "Talabat", desc: "Food delivery platform", url: "https://talabat.com" },
                { name: "Property Finder", desc: "Real estate marketplace", url: "https://propertyfinder.ae" },
            ],
            "Abu Dhabi": [
                { name: "G42", desc: "AI and cloud computing company", url: "https://g42.ai" },
                { name: "TII", desc: "AI research (Falcon LLM)", url: "https://tii.ae" },
                { name: "Mubadala", desc: "Sovereign investment company", url: "https://mubadala.com" },
            ],
        }
    },
    "Azerbaijan": {
        cities: {
            "Baku": [
                { name: "VAEVI", desc: "Digital innovation and technology studio", url: "https://vaevi.com" },
                { name: "Kapital Bank", desc: "Leading digital banking in Azerbaijan", url: "https://kapitalbank.az" },
                { name: "Azercell", desc: "Largest mobile operator in Azerbaijan", url: "https://azercell.com" },
                { name: "PASHA Holding", desc: "Diversified investment group", url: "https://pashaholding.az" },
                { name: "ABB Bank", desc: "International Bank of Azerbaijan", url: "https://abb-bank.az" },
                { name: "Bakcell", desc: "Mobile telecommunications operator", url: "https://bakcell.com" },
                { name: "SOCAR", desc: "State oil company of Azerbaijan", url: "https://socar.az" },
                { name: "Bravo", desc: "Supermarket chain", url: "https://bravo.az" },
                { name: "PASHA Bank", desc: "Corporate and investment bank", url: "https://pashabank.az" },
                { name: "Nar Mobile", desc: "Mobile telecom operator (Azerfon)", url: "https://nar.az" },
                { name: "Xalq Bank", desc: "National retail bank", url: "https://xalqbank.az" },
                { name: "AzerTurk Bank", desc: "Joint venture commercial bank", url: "https://azerturkbank.az" },
                { name: "AtaBank", desc: "Commercial bank", url: "https://atabank.az" },
                { name: "Unibank", desc: "Universal commercial bank", url: "https://unibank.az" },
                { name: "Bolt Azerbaijan", desc: "Ride-hailing and delivery", url: "https://bolt.eu" },
                { name: "Wolt Azerbaijan", desc: "Food delivery platform", url: "https://wolt.com" },
                { name: "Uber Azerbaijan", desc: "Ride-hailing platform", url: "https://uber.com" },
                { name: "ABB (ASAN)", desc: "E-government and digital services", url: "https://asan.gov.az" },
                { name: "AzTV", desc: "State television broadcaster", url: "https://aztv.az" },
                { name: "Azerconnect", desc: "Telecom infrastructure and IT services", url: "https://azerconnect.az" },
            ],
            "Ganja": [
                { name: "Ganja Automobile Plant", desc: "Vehicle assembly manufacturer", url: "https://gap.az" },
                { name: "Ganja Agribusiness", desc: "Agricultural processing center", url: "https://ganja.az" },
                { name: "Azersu Ganja", desc: "Regional water utility", url: "https://azersu.az" },
            ],
            "Sumgait": [
                { name: "Sumgait Technologies Park", desc: "Industrial technology zone", url: "https://sumgait.az" },
                { name: "Azerpipe", desc: "Pipe manufacturing plant", url: "https://azerpipe.az" },
                { name: "Sumgait Aluminum", desc: "Aluminum production facility", url: "https://az.com" },
            ],
            "Mingachevir": [
                { name: "Mingachevir Powerplant", desc: "Largest thermal power plant", url: "https://azerenerji.gov.az" },
                { name: "Mingachevir Textile", desc: "Textile manufacturing complex", url: "https://mingachevir.az" },
            ],
            "Lankaran": [
                { name: "Lankaran Tea", desc: "Tea and citrus production", url: "https://lankaran.az" },
                { name: "Lankaran Agriculture", desc: "Subtropical agriculture hub", url: "https://lankaran.az" },
            ],
            "Sheki": [
                { name: "Sheki Silk", desc: "Traditional silk production center", url: "https://sheki.az" },
                { name: "Sheki Tourism", desc: "Heritage and eco-tourism hub", url: "https://sheki.az" },
            ],
            "Nakhchivan": [
                { name: "Nakhchivan Telecom", desc: "Regional telecom services", url: "https://nakhchivan.az" },
                { name: "Araz Supermarket", desc: "Retail chain in Nakhchivan", url: "https://araz.az" },
            ],
            "Shirvan": [
                { name: "Shirvan Oil Refinery", desc: "Oil refining facility", url: "https://socar.az" },
            ],
            "Gabala": [
                { name: "Gabala Tourism", desc: "Mountain tourism and resorts", url: "https://gabala.az" },
                { name: "Tufandag Resort", desc: "Ski and mountain resort", url: "https://tufandag.az" },
            ],
            "Shamakhi": [
                { name: "Shamakhi Astrophysical Observatory", desc: "Astronomical research center", url: "https://shao.az" },
                { name: "Shamakhi Wine", desc: "Traditional winemaking region", url: "https://shamakhi.az" },
            ],
        }
    },
    "Taiwan": {
        cities: {
            "Taipei": [
                { name: "TSMC", desc: "World's largest semiconductor foundry", url: "https://tsmc.com" },
                { name: "ASUS", desc: "Computer hardware and electronics", url: "https://asus.com" },
                { name: "Foxconn", desc: "Electronics contract manufacturing", url: "https://foxconn.com" },
                { name: "MediaTek", desc: "Semiconductor chip designer", url: "https://mediatek.com" },
                { name: "Acer", desc: "Computer hardware manufacturer", url: "https://acer.com" },
                { name: "HTC", desc: "Smartphone and VR headset maker", url: "https://htc.com" },
            ],
            "Hsinchu": [
                { name: "TSMC Fab", desc: "TSMC main fabrication facilities", url: "https://tsmc.com" },
                { name: "UMC", desc: "Semiconductor foundry", url: "https://umc.com" },
                { name: "Realtek", desc: "IC design company", url: "https://realtek.com" },
            ],
        }
    },
    "Ireland": {
        cities: {
            "Dublin": [
                { name: "Accenture", desc: "IT services and consulting", url: "https://accenture.com" },
                { name: "Stripe EU", desc: "Payment infrastructure (EU HQ)", url: "https://stripe.com" },
                { name: "Intercom", desc: "Customer messaging platform", url: "https://intercom.com" },
                { name: "Workhuman", desc: "HR technology platform", url: "https://workhuman.com" },
            ],
            "Cork": [
                { name: "Apple EU", desc: "Apple European headquarters", url: "https://apple.com" },
                { name: "VMware Ireland", desc: "Cloud computing and virtualization", url: "https://vmware.com" },
            ],
            "Galway": [
                { name: "Medtronic", desc: "Medical device company", url: "https://medtronic.com" },
            ],
        }
    },
    "Finland": {
        cities: {
            "Helsinki": [
                { name: "Nokia", desc: "Telecom and network infrastructure", url: "https://nokia.com" },
                { name: "Supercell", desc: "Mobile game developer (Clash of Clans)", url: "https://supercell.com" },
                { name: "Wolt", desc: "Food delivery platform", url: "https://wolt.com" },
                { name: "Rovio", desc: "Game studio (Angry Birds)", url: "https://rovio.com" },
            ],
            "Espoo": [
                { name: "Nokia HQ", desc: "Nokia headquarters", url: "https://nokia.com" },
                { name: "Fortum", desc: "Clean energy company", url: "https://fortum.com" },
            ],
            "Oulu": [
                { name: "Nokia Oulu", desc: "Nokia R&D center", url: "https://nokia.com" },
            ],
        }
    },
    "Switzerland": {
        cities: {
            "Zurich": [
                { name: "Google Zurich", desc: "Google's largest EU engineering office", url: "https://google.ch" },
                { name: "UBS", desc: "Global financial services company", url: "https://ubs.com" },
                { name: "Credit Suisse", desc: "Investment banking (now UBS)", url: "https://ubs.com" },
            ],
            "Geneva": [
                { name: "Rolex", desc: "Luxury watchmaker", url: "https://rolex.com" },
                { name: "CERN", desc: "European nuclear research organization", url: "https://home.cern" },
            ],
            "Basel": [
                { name: "Novartis", desc: "Pharmaceutical company", url: "https://novartis.com" },
                { name: "Roche", desc: "Healthcare and diagnostics", url: "https://roche.com" },
            ],
        }
    },
    "Spain": {
        cities: {
            "Barcelona": [
                { name: "Glovo", desc: "Multi-category delivery platform", url: "https://glovoapp.com" },
                { name: "Typeform", desc: "Online form and survey builder", url: "https://typeform.com" },
                { name: "Factorial", desc: "HR software for SMBs", url: "https://factorialhr.com" },
                { name: "Wallapop", desc: "Second-hand marketplace app", url: "https://wallapop.com" },
            ],
            "Madrid": [
                { name: "Cabify", desc: "Ride-hailing platform", url: "https://cabify.com" },
                { name: "Jobandtalent", desc: "Workforce management platform", url: "https://jobandtalent.com" },
                { name: "Telefonica", desc: "Major telecommunications company", url: "https://telefonica.com" },
            ],
        }
    },
    "Italy": {
        cities: {
            "Milan": [
                { name: "Luxottica", desc: "Eyewear manufacturer (Ray-Ban)", url: "https://luxottica.com" },
                { name: "Pirelli", desc: "Tire manufacturer", url: "https://pirelli.com" },
                { name: "Bending Spoons", desc: "App developer and tech company", url: "https://bendingspoons.com" },
            ],
            "Turin": [
                { name: "Fiat (Stellantis)", desc: "Automobile manufacturer", url: "https://stellantis.com" },
                { name: "Reply", desc: "IT consulting and services", url: "https://reply.com" },
            ],
            "Rome": [
                { name: "Leonardo", desc: "Defense and aerospace", url: "https://leonardo.com" },
            ],
        }
    },
    "Brazil": {
        cities: {
            "São Paulo": [
                { name: "Nubank", desc: "Digital bank and fintech", url: "https://nubank.com.br" },
                { name: "iFood", desc: "Food delivery platform", url: "https://ifood.com.br" },
                { name: "MercadoLibre", desc: "E-commerce and fintech", url: "https://mercadolibre.com" },
                { name: "PagSeguro", desc: "Digital payments company", url: "https://pagseguro.uol.com.br" },
                { name: "TOTVS", desc: "Enterprise software provider", url: "https://totvs.com" },
            ],
            "Florianópolis": [
                { name: "RD Station", desc: "Marketing automation platform", url: "https://rdstation.com" },
            ],
            "Curitiba": [
                { name: "Ebanx", desc: "Payment processing for LatAm", url: "https://ebanx.com" },
            ],
        }
    },
    "Mexico": {
        cities: {
            "Mexico City": [
                { name: "Kavak", desc: "Used car marketplace", url: "https://kavak.com" },
                { name: "Bitso", desc: "Cryptocurrency exchange", url: "https://bitso.com" },
                { name: "Clip", desc: "Digital payments solution", url: "https://clip.mx" },
                { name: "Rappi", desc: "On-demand delivery app", url: "https://rappi.com" },
            ],
            "Monterrey": [
                { name: "CEMEX", desc: "Building materials company", url: "https://cemex.com" },
                { name: "Softtek", desc: "IT services provider", url: "https://softtek.com" },
            ],
        }
    },
    "Argentina": {
        cities: {
            "Buenos Aires": [
                { name: "MercadoLibre HQ", desc: "LatAm's largest e-commerce", url: "https://mercadolibre.com" },
                { name: "Globant", desc: "AI-native digital transformation", url: "https://globant.com" },
                { name: "Auth0", desc: "Identity platform (now Okta)", url: "https://auth0.com" },
                { name: "Ualá", desc: "Fintech and digital banking", url: "https://uala.com.ar" },
            ],
        }
    },
    "Colombia": {
        cities: {
            "Bogotá": [
                { name: "Rappi HQ", desc: "Super app for delivery", url: "https://rappi.com" },
                { name: "Platzi", desc: "Online education platform", url: "https://platzi.com" },
            ],
            "Medellín": [
                { name: "Rutan", desc: "Innovation and business center", url: "https://rfrutan.com" },
            ],
        }
    },
    "Nigeria": {
        cities: {
            "Lagos": [
                { name: "Flutterwave", desc: "Payment infrastructure for Africa", url: "https://flutterwave.com" },
                { name: "Paystack", desc: "Payment gateway (by Stripe)", url: "https://paystack.com" },
                { name: "Andela", desc: "Global talent network", url: "https://andela.com" },
                { name: "Interswitch", desc: "Digital payments and commerce", url: "https://interswitchgroup.com" },
            ],
            "Abuja": [
                { name: "NITDA", desc: "IT development agency", url: "https://nitda.gov.ng" },
            ],
        }
    },
    "South Africa": {
        cities: {
            "Cape Town": [
                { name: "Naspers", desc: "Internet and entertainment group", url: "https://naspers.com" },
                { name: "Takealot", desc: "E-commerce retailer", url: "https://takealot.com" },
            ],
            "Johannesburg": [
                { name: "MTN Group", desc: "Telecom operator", url: "https://mtn.com" },
                { name: "Discovery", desc: "Insurance and fintech", url: "https://discovery.co.za" },
            ],
        }
    },
    "Kenya": {
        cities: {
            "Nairobi": [
                { name: "Safaricom", desc: "Telecom and M-Pesa mobile money", url: "https://safaricom.co.ke" },
                { name: "Twiga Foods", desc: "B2B food distribution platform", url: "https://twiga.com" },
                { name: "Cellulant", desc: "Digital payments platform", url: "https://cellulant.io" },
            ],
        }
    },
    "Egypt": {
        cities: {
            "Cairo": [
                { name: "Swvl", desc: "Mass transit platform", url: "https://swvl.com" },
                { name: "Fawry", desc: "Electronic payment network", url: "https://fawry.com" },
                { name: "MNT-Halan", desc: "Fintech and lending platform", url: "https://halan.com" },
            ],
        }
    },
    "Turkey": {
        cities: {
            "Istanbul": [
                { name: "Trendyol", desc: "E-commerce platform", url: "https://trendyol.com" },
                { name: "Getir", desc: "Ultra-fast grocery delivery", url: "https://getir.com" },
                { name: "Peak Games", desc: "Mobile game developer", url: "https://peak.com" },
                { name: "Hepsiburada", desc: "E-commerce marketplace", url: "https://hepsiburada.com" },
            ],
            "Ankara": [
                { name: "Havelsan", desc: "Defense technology company", url: "https://havelsan.com.tr" },
                { name: "ASELSAN", desc: "Defense electronics", url: "https://aselsan.com.tr" },
            ],
        }
    },
    "Poland": {
        cities: {
            "Warsaw": [
                { name: "Allegro", desc: "E-commerce marketplace", url: "https://allegro.pl" },
                { name: "CD Projekt", desc: "Game studio (Cyberpunk, Witcher)", url: "https://cdprojekt.com" },
                { name: "InPost", desc: "Parcel locker delivery", url: "https://inpost.pl" },
                { name: "PKO Bank Polski", desc: "Largest Polish bank", url: "https://pkobp.pl" },
                { name: "PZU", desc: "Insurance and financial group", url: "https://pzu.pl" },
                { name: "Orlen", desc: "Energy and fuel company", url: "https://orlen.pl" },
                { name: "mBank", desc: "Digital banking pioneer", url: "https://mbank.pl" },
                { name: "Asseco Poland", desc: "Enterprise software solutions", url: "https://asseco.com" },
                { name: "DocPlanner", desc: "Healthcare booking platform", url: "https://docplanner.com" },
                { name: "Booksy", desc: "Beauty & wellness booking app", url: "https://booksy.com" },
            ],
            "Krakow": [
                { name: "Comarch", desc: "IT solutions provider", url: "https://comarch.com" },
                { name: "Brainly", desc: "Online learning community", url: "https://brainly.com" },
                { name: "Estimote", desc: "Beacon & proximity technology", url: "https://estimote.com" },
                { name: "Aptiv", desc: "Autonomous driving technology", url: "https://aptiv.com" },
                { name: "Synerise", desc: "AI-driven growth platform", url: "https://synerise.com" },
                { name: "Nobl9", desc: "Service level objectives platform", url: "https://nobl9.com" },
            ],
            "Wroclaw": [
                { name: "LiveChat", desc: "Customer service software", url: "https://livechat.com" },
                { name: "Nokia R&D", desc: "Telecommunications R&D center", url: "https://nokia.com" },
                { name: "Credit Suisse Tech", desc: "Financial tech hub", url: "https://credit-suisse.com" },
                { name: "Dolby Wroclaw", desc: "Audio & imaging tech lab", url: "https://dolby.com" },
            ],
            "Gdansk": [
                { name: "Energa", desc: "Energy distribution company", url: "https://energa.pl" },
                { name: "Intel Gdansk", desc: "Chip design & engineering", url: "https://intel.com" },
                { name: "Kainos", desc: "Digital services & platforms", url: "https://kainos.com" },
                { name: "Dynatrace Gdansk", desc: "Software intelligence platform", url: "https://dynatrace.com" },
                { name: "Sii Poland", desc: "IT consulting & engineering", url: "https://sii.pl" },
            ],
            "Poznan": [
                { name: "Allegro Tech", desc: "Allegro's tech division", url: "https://allegro.tech" },
                { name: "Netguru", desc: "Software consultancy", url: "https://netguru.com" },
                { name: "Stibo Systems", desc: "Master data management", url: "https://stibosystems.com" },
                { name: "Verint Poznan", desc: "Customer engagement solutions", url: "https://verint.com" },
            ],
            "Lodz": [
                { name: "Fujitsu Lodz", desc: "IT services & consulting", url: "https://fujitsu.com" },
                { name: "Infosys BPM", desc: "Business process management", url: "https://infosysbpm.com" },
                { name: "Ericsson Lodz", desc: "Telecom R&D center", url: "https://ericsson.com" },
                { name: "TomTom Lodz", desc: "Navigation & mapping tech", url: "https://tomtom.com" },
            ],
            "Katowice": [
                { name: "ING Tech Poland", desc: "Banking technology hub", url: "https://ing.pl" },
                { name: "Rockwell Automation", desc: "Industrial automation", url: "https://rockwellautomation.com" },
                { name: "Capgemini Katowice", desc: "IT consulting & services", url: "https://capgemini.com" },
            ],
            "Szczecin": [
                { name: "Tieto Szczecin", desc: "Digital services provider", url: "https://tietoevry.com" },
                { name: "Mobica", desc: "Software engineering services", url: "https://mobica.com" },
                { name: "Ciklum Szczecin", desc: "Product engineering company", url: "https://ciklum.com" },
            ],
            "Lublin": [
                { name: "Asseco BS", desc: "Banking software solutions", url: "https://assecobs.pl" },
                { name: "CompuGroup Medical", desc: "Healthcare IT solutions", url: "https://cgm.com" },
                { name: "Transition Technologies", desc: "IoT & digital solutions", url: "https://ttpsc.com" },
            ],
            "Bydgoszcz": [
                { name: "Atos Bydgoszcz", desc: "Digital transformation services", url: "https://atos.net" },
                { name: "Alcatel-Lucent", desc: "Networking & communications", url: "https://al-enterprise.com" },
            ],
        }
    },
    "Czech Republic": {
        cities: {
            "Prague": [
                { name: "Avast", desc: "Cybersecurity software", url: "https://avast.com" },
                { name: "JetBrains", desc: "Developer tools (IntelliJ, Kotlin)", url: "https://jetbrains.com" },
                { name: "Rohlik", desc: "Online grocery delivery", url: "https://rohlik.cz" },
            ],
            "Brno": [
                { name: "Kiwi.com", desc: "Travel booking platform", url: "https://kiwi.com" },
            ],
        }
    },
    "Romania": {
        cities: {
            "Bucharest": [
                { name: "UiPath", desc: "Robotic process automation", url: "https://uipath.com" },
                { name: "Bitdefender", desc: "Cybersecurity software", url: "https://bitdefender.com" },
                { name: "eMag", desc: "E-commerce platform", url: "https://emag.ro" },
            ],
            "Cluj-Napoca": [
                { name: "Fortech", desc: "Software development company", url: "https://fortech.ro" },
            ],
        }
    },
    "Ukraine": {
        cities: {
            "Kyiv": [
                { name: "Grammarly", desc: "AI writing assistant", url: "https://grammarly.com" },
                { name: "GitLab", desc: "DevOps lifecycle platform", url: "https://gitlab.com" },
                { name: "Ajax Systems", desc: "Security systems manufacturer", url: "https://ajax.systems" },
            ],
            "Dnipro": [
                { name: "PrivatBank", desc: "Largest Ukrainian bank", url: "https://privatbank.ua" },
            ],
        }
    },
    "Estonia": {
        cities: {
            "Tallinn": [
                { name: "Bolt", desc: "Ride-hailing and delivery", url: "https://bolt.eu" },
                { name: "Wise HQ", desc: "Money transfer (global HQ)", url: "https://wise.com" },
                { name: "Pipedrive", desc: "CRM and sales pipeline", url: "https://pipedrive.com" },
                { name: "Veriff", desc: "Online identity verification", url: "https://veriff.com" },
            ],
        }
    },
    "Lithuania": {
        cities: {
            "Vilnius": [
                { name: "Vinted", desc: "Second-hand fashion marketplace", url: "https://vinted.com" },
                { name: "Nord Security", desc: "NordVPN parent company", url: "https://nordsecurity.com" },
            ],
        }
    },
    "Denmark": {
        cities: {
            "Copenhagen": [
                { name: "Maersk", desc: "Shipping and logistics giant", url: "https://maersk.com" },
                { name: "Novo Nordisk", desc: "Pharmaceutical company", url: "https://novonordisk.com" },
                { name: "Trustpilot", desc: "Online review platform", url: "https://trustpilot.com" },
                { name: "Unity", desc: "Game engine platform", url: "https://unity.com" },
            ],
        }
    },
    "Norway": {
        cities: {
            "Oslo": [
                { name: "Opera", desc: "Web browser company", url: "https://opera.com" },
                { name: "Kahoot!", desc: "Game-based learning platform", url: "https://kahoot.com" },
                { name: "Cognite", desc: "Industrial DataOps platform", url: "https://cognite.com" },
            ],
        }
    },
    "Portugal": {
        cities: {
            "Lisbon": [
                { name: "Farfetch", desc: "Luxury fashion marketplace", url: "https://farfetch.com" },
                { name: "Feedzai", desc: "AI for financial crime prevention", url: "https://feedzai.com" },
                { name: "OutSystems", desc: "Low-code application development", url: "https://outsystems.com" },
            ],
        }
    },
    "Austria": {
        cities: {
            "Vienna": [
                { name: "Bitpanda", desc: "Digital asset investment platform", url: "https://bitpanda.com" },
                { name: "GoStudent", desc: "Online tutoring platform", url: "https://gostudent.org" },
            ],
        }
    },
    "Belgium": {
        cities: {
            "Brussels": [
                { name: "Collibra", desc: "Data intelligence platform", url: "https://collibra.com" },
                { name: "Odoo", desc: "Open source ERP and CRM", url: "https://odoo.com" },
            ],
        }
    },
    "Indonesia": {
        cities: {
            "Jakarta": [
                { name: "GoTo", desc: "Tech conglomerate (Gojek+Tokopedia)", url: "https://gotocompany.com" },
                { name: "Traveloka", desc: "Travel and lifestyle platform", url: "https://traveloka.com" },
                { name: "Bukalapak", desc: "E-commerce marketplace", url: "https://bukalapak.com" },
                { name: "Xendit", desc: "Payment infrastructure for SE Asia", url: "https://xendit.co" },
            ],
        }
    },
    "Thailand": {
        cities: {
            "Bangkok": [
                { name: "Agoda", desc: "Online travel booking platform", url: "https://agoda.com" },
                { name: "LINE MAN Wongnai", desc: "Food delivery and reviews", url: "https://lineman.line.me" },
                { name: "Bitkub", desc: "Cryptocurrency exchange", url: "https://bitkub.com" },
            ],
        }
    },
    "Vietnam": {
        cities: {
            "Ho Chi Minh City": [
                { name: "VNG", desc: "Internet and gaming company", url: "https://vng.com.vn" },
                { name: "Tiki", desc: "E-commerce platform", url: "https://tiki.vn" },
                { name: "MoMo", desc: "Mobile wallet and payments", url: "https://momo.vn" },
            ],
            "Hanoi": [
                { name: "FPT", desc: "IT services and telecom", url: "https://fpt.com" },
                { name: "Viettel", desc: "Military-run telecom operator", url: "https://viettel.com.vn" },
            ],
        }
    },
    "Malaysia": {
        cities: {
            "Kuala Lumpur": [
                { name: "Petronas", desc: "Oil and gas multinational", url: "https://petronas.com" },
                { name: "AirAsia", desc: "Low-cost airline", url: "https://airasia.com" },
                { name: "Carsome", desc: "Used car trading platform", url: "https://carsome.com" },
            ],
        }
    },
    "Philippines": {
        cities: {
            "Manila": [
                { name: "Globe Telecom", desc: "Telecommunications company", url: "https://globe.com.ph" },
                { name: "GCash", desc: "Mobile wallet and payments", url: "https://gcash.com" },
                { name: "Maya", desc: "Digital banking platform", url: "https://maya.ph" },
            ],
        }
    },
    "New Zealand": {
        cities: {
            "Auckland": [
                { name: "Xero", desc: "Cloud accounting software", url: "https://xero.com" },
                { name: "Rocket Lab", desc: "Aerospace manufacturer", url: "https://rocketlabusa.com" },
            ],
            "Wellington": [
                { name: "Weta Digital", desc: "VFX and film production", url: "https://wetafx.co.nz" },
                { name: "Trade Me", desc: "Online auction and classifieds", url: "https://trademe.co.nz" },
            ],
        }
    },
    "Saudi Arabia": {
        cities: {
            "Riyadh": [
                { name: "Saudi Aramco", desc: "World's largest oil company", url: "https://aramco.com" },
                { name: "STC", desc: "Saudi telecom company", url: "https://stc.com.sa" },
                { name: "Foodics", desc: "Restaurant management platform", url: "https://foodics.com" },
            ],
            "Jeddah": [
                { name: "NEOM", desc: "Smart city megaproject", url: "https://neom.com" },
                { name: "Jahez", desc: "Food delivery platform", url: "https://jahez.net" },
            ],
        }
    },
    "Qatar": {
        cities: {
            "Doha": [
                { name: "Qatar Airways", desc: "National airline carrier", url: "https://qatarairways.com" },
                { name: "Ooredoo", desc: "Telecommunications company", url: "https://ooredoo.qa" },
            ],
        }
    },
    "Pakistan": {
        cities: {
            "Karachi": [
                { name: "Daraz", desc: "E-commerce marketplace", url: "https://daraz.pk" },
                { name: "JazzCash", desc: "Mobile financial services", url: "https://jazzcash.com.pk" },
            ],
            "Lahore": [
                { name: "Airlift", desc: "Quick commerce platform", url: "https://airliftexpress.com" },
                { name: "Arbisoft", desc: "Software development company", url: "https://arbisoft.com" },
            ],
        }
    },
    "Bangladesh": {
        cities: {
            "Dhaka": [
                { name: "Grameenphone", desc: "Leading mobile operator", url: "https://grameenphone.com" },
                { name: "bKash", desc: "Mobile financial services", url: "https://bkash.com" },
                { name: "Pathao", desc: "Ride-hailing and delivery", url: "https://pathao.com" },
            ],
        }
    },
    "Georgia": {
        cities: {
            "Tbilisi": [
                { name: "TBC Bank", desc: "Leading digital bank in Georgia", url: "https://tbcbank.ge" },
                { name: "Bank of Georgia", desc: "Major banking group", url: "https://bankofgeorgia.ge" },
                { name: "Wissol", desc: "Petroleum and retail group", url: "https://wissol.ge" },
            ],
        }
    },
    "Kazakhstan": {
        cities: {
            "Almaty": [
                { name: "Kaspi.kz", desc: "Super app for payments and commerce", url: "https://kaspi.kz" },
                { name: "Kolesa Group", desc: "Online classifieds platform", url: "https://kolesa.kz" },
            ],
            "Astana": [
                { name: "Aifc", desc: "Astana financial center", url: "https://aifc.kz" },
            ],
        }
    },
    "Uzbekistan": {
        cities: {
            "Tashkent": [
                { name: "Uzum", desc: "E-commerce and fintech group", url: "https://uzum.uz" },
                { name: "Payme", desc: "Mobile payments platform", url: "https://payme.uz" },
            ],
        }
    },
    "Chile": {
        cities: {
            "Santiago": [
                { name: "Cornershop", desc: "Grocery delivery (by Uber)", url: "https://cornershopapp.com" },
                { name: "Betterfly", desc: "Insurtech and wellness platform", url: "https://betterfly.com" },
                { name: "NotCo", desc: "AI-powered food tech", url: "https://notco.com" },
            ],
        }
    },
    "Peru": {
        cities: {
            "Lima": [
                { name: "Crehana", desc: "Online education platform", url: "https://crehana.com" },
            ],
        }
    },
    "Luxembourg": {
        cities: {
            "Luxembourg City": [
                { name: "Amazon EU", desc: "Amazon European headquarters", url: "https://amazon.lu" },
                { name: "Skype", desc: "Video calling platform (EU ops)", url: "https://skype.com" },
            ],
        }
    },
    "Iceland": {
        cities: {
            "Reykjavik": [
                { name: "CCP Games", desc: "Game studio (EVE Online)", url: "https://ccpgames.com" },
                { name: "Marel", desc: "Food processing technology", url: "https://marel.com" },
            ],
        }
    },
    "Morocco": {
        cities: {
            "Casablanca": [
                { name: "Chari", desc: "B2B e-commerce platform", url: "https://chari.ma" },
                { name: "Inwi", desc: "Telecom operator", url: "https://inwi.ma" },
            ],
        }
    },
    "Ghana": {
        cities: {
            "Accra": [
                { name: "mPharma", desc: "Healthcare technology company", url: "https://mpharma.com" },
                { name: "Hubtel", desc: "Digital commerce platform", url: "https://hubtel.com" },
            ],
        }
    },
    "Rwanda": {
        cities: {
            "Kigali": [
                { name: "Zipline", desc: "Drone delivery for medical supplies", url: "https://flyzipline.com" },
            ],
        }
    },
    "Ethiopia": {
        cities: {
            "Addis Ababa": [
                { name: "Ethiopian Airlines", desc: "Africa's largest airline", url: "https://ethiopianairlines.com" },
                { name: "Ride", desc: "Ride-hailing platform", url: "https://ride.com.et" },
            ],
        }
    },
    "Tanzania": {
        cities: {
            "Dar es Salaam": [
                { name: "Vodacom Tanzania", desc: "Mobile telecom operator", url: "https://vodacom.co.tz" },
            ],
        }
    },
    "Sri Lanka": {
        cities: {
            "Colombo": [
                { name: "WSO2", desc: "Open source integration platform", url: "https://wso2.com" },
                { name: "Dialog Axiata", desc: "Mobile telecom operator", url: "https://dialog.lk" },
            ],
        }
    },
    "Nepal": {
        cities: {
            "Kathmandu": [
                { name: "Daraz Nepal", desc: "E-commerce marketplace", url: "https://daraz.com.np" },
                { name: "Khalti", desc: "Digital wallet", url: "https://khalti.com" },
            ],
        }
    },
    "Croatia": {
        cities: {
            "Zagreb": [
                { name: "Infobip", desc: "Cloud communications platform", url: "https://infobip.com" },
                { name: "Rimac", desc: "Electric hypercar manufacturer", url: "https://rimac-automobili.com" },
            ],
        }
    },
    "Serbia": {
        cities: {
            "Belgrade": [
                { name: "Nordeus", desc: "Game studio (Top Eleven)", url: "https://nordeus.com" },
            ],
        }
    },
    "Bulgaria": {
        cities: {
            "Sofia": [
                { name: "Payhawk", desc: "Corporate card and expense platform", url: "https://payhawk.com" },
                { name: "Gtmhub", desc: "OKR management platform", url: "https://gtmhub.com" },
            ],
        }
    },
    "Greece": {
        cities: {
            "Athens": [
                { name: "Viva Wallet", desc: "Cloud-based payment platform", url: "https://vivawallet.com" },
                { name: "Skroutz", desc: "Price comparison marketplace", url: "https://skroutz.gr" },
            ],
        }
    },
    "Hungary": {
        cities: {
            "Budapest": [
                { name: "Prezi", desc: "Presentation software platform", url: "https://prezi.com" },
                { name: "LogMeIn", desc: "Remote access and collaboration", url: "https://logmein.com" },
            ],
            "Debrecen": [
                { name: "IT Services Hungary", desc: "IT outsourcing center", url: "https://itservices.hu" },
            ],
        }
    },
    "Russia": {
        cities: {
            "Moscow": [
                { name: "Yandex", desc: "Internet services and search engine", url: "https://yandex.com" },
                { name: "Kaspersky", desc: "Cybersecurity software company", url: "https://kaspersky.com" },
                { name: "Mail.ru Group", desc: "Internet and social media", url: "https://vk.company" },
                { name: "Sberbank", desc: "Largest bank in Russia", url: "https://sberbank.com" },
                { name: "Ozon", desc: "E-commerce marketplace", url: "https://ozon.ru" },
                { name: "Wildberries", desc: "Online fashion retailer", url: "https://wildberries.ru" },
            ],
            "St. Petersburg": [
                { name: "JetBrains", desc: "Developer tools (IntelliJ, Kotlin)", url: "https://jetbrains.com" },
                { name: "Vkontakte", desc: "Social networking platform", url: "https://vk.com" },
                { name: "Gazprom Neft", desc: "Oil company digital division", url: "https://gazprom-neft.com" },
            ],
            "Novosibirsk": [
                { name: "2GIS", desc: "Maps and business directory", url: "https://2gis.com" },
            ],
            "Kazan": [
                { name: "Innopolis", desc: "IT and technology hub city", url: "https://innopolis.com" },
            ],
        }
    },
    "Iran": {
        cities: {
            "Tehran": [
                { name: "Digikala", desc: "Largest e-commerce platform in Iran", url: "https://digikala.com" },
                { name: "Snapp", desc: "Ride-hailing app", url: "https://snapp.ir" },
                { name: "Cafe Bazaar", desc: "Android app marketplace", url: "https://cafebazaar.ir" },
                { name: "Tapsi", desc: "Ride-hailing platform", url: "https://tapsi.ir" },
            ],
            "Isfahan": [
                { name: "Mobarakeh Steel", desc: "Largest steel producer in MENA", url: "https://msc.ir" },
            ],
            "Shiraz": [
                { name: "Shiraz Electronics", desc: "Electronics industry hub", url: "https://shiraz.ir" },
            ],
        }
    },
    "Jordan": {
        cities: {
            "Amman": [
                { name: "Maktoob", desc: "Internet services (acquired by Yahoo)", url: "https://maktoob.com" },
                { name: "Mawdoo3", desc: "Arabic content platform", url: "https://mawdoo3.com" },
                { name: "Umniah", desc: "Telecom operator", url: "https://umniah.com" },
            ],
        }
    },
    "Lebanon": {
        cities: {
            "Beirut": [
                { name: "Anghami", desc: "Music streaming platform", url: "https://anghami.com" },
                { name: "MEVP", desc: "Venture capital for MENA", url: "https://mevp.com" },
            ],
        }
    },
    "Kuwait": {
        cities: {
            "Kuwait City": [
                { name: "Zain Group", desc: "Telecom operator across MENA", url: "https://zain.com" },
                { name: "Talabat Kuwait", desc: "Food delivery platform", url: "https://talabat.com" },
            ],
        }
    },
    "Bahrain": {
        cities: {
            "Manama": [
                { name: "Rain", desc: "Cryptocurrency exchange", url: "https://rain.bh" },
                { name: "Batelco", desc: "Telecommunications company", url: "https://batelco.com" },
            ],
        }
    },
    "Oman": {
        cities: {
            "Muscat": [
                { name: "Omantel", desc: "Telecom provider", url: "https://omantel.om" },
                { name: "Ooredoo Oman", desc: "Telecommunications company", url: "https://ooredoo.om" },
            ],
        }
    },
    "Iraq": {
        cities: {
            "Baghdad": [
                { name: "Zain Iraq", desc: "Mobile telecommunications", url: "https://iq.zain.com" },
                { name: "Asiacell", desc: "Telecom operator", url: "https://asiacell.com" },
            ],
            "Erbil": [
                { name: "Korek Telecom", desc: "Mobile operator in Kurdistan", url: "https://korektel.com" },
            ],
        }
    },
    "Armenia": {
        cities: {
            "Yerevan": [
                { name: "PicsArt", desc: "Photo and video editing platform", url: "https://picsart.com" },
                { name: "Krisp", desc: "AI-powered noise cancellation", url: "https://krisp.ai" },
                { name: "ServiceTitan", desc: "Software for trades businesses", url: "https://servicetitan.com" },
            ],
        }
    },
    "Moldova": {
        cities: {
            "Chisinau": [
                { name: "Orange Moldova", desc: "Telecom operator", url: "https://orange.md" },
                { name: "Endava Chisinau", desc: "Software development center", url: "https://endava.com" },
            ],
        }
    },
    "Belarus": {
        cities: {
            "Minsk": [
                { name: "EPAM Systems", desc: "Software engineering company", url: "https://epam.com" },
                { name: "Wargaming", desc: "Game developer (World of Tanks)", url: "https://wargaming.com" },
                { name: "Flo Health", desc: "Period and health tracking app", url: "https://flo.health" },
            ],
        }
    },
    "Latvia": {
        cities: {
            "Riga": [
                { name: "Printful", desc: "Print-on-demand fulfillment", url: "https://printful.com" },
                { name: "MikroTik", desc: "Network equipment manufacturer", url: "https://mikrotik.com" },
            ],
        }
    },
    "Slovenia": {
        cities: {
            "Ljubljana": [
                { name: "Bitstamp", desc: "Cryptocurrency exchange", url: "https://bitstamp.net" },
                { name: "Outfit7", desc: "Game studio (Talking Tom)", url: "https://outfit7.com" },
            ],
        }
    },
    "Slovakia": {
        cities: {
            "Bratislava": [
                { name: "ESET", desc: "Cybersecurity software", url: "https://eset.com" },
                { name: "Sygic", desc: "GPS navigation app", url: "https://sygic.com" },
            ],
        }
    },
    "Bosnia and Herzegovina": {
        cities: {
            "Sarajevo": [
                { name: "Mistral Technologies", desc: "Software development", url: "https://mistral.ba" },
                { name: "BH Telecom", desc: "Telecom provider", url: "https://bhtelecom.ba" },
            ],
        }
    },
    "Montenegro": {
        cities: {
            "Podgorica": [
                { name: "Crnogorski Telekom", desc: "Telecom operator", url: "https://telekom.me" },
            ],
        }
    },
    "North Macedonia": {
        cities: {
            "Skopje": [
                { name: "Makedonski Telekom", desc: "Telecom provider", url: "https://telekom.mk" },
                { name: "Seavus", desc: "Software development company", url: "https://seavus.com" },
            ],
        }
    },
    "Albania": {
        cities: {
            "Tirana": [
                { name: "Vodafone Albania", desc: "Telecom operator", url: "https://vodafone.al" },
                { name: "ONE Albania", desc: "Telecom provider", url: "https://one.al" },
            ],
        }
    },
    "Cyprus": {
        cities: {
            "Limassol": [
                { name: "eToro", desc: "Social trading and investing", url: "https://etoro.com" },
                { name: "Exness", desc: "Forex trading platform", url: "https://exness.com" },
            ],
            "Nicosia": [
                { name: "Cyta", desc: "Telecommunications authority", url: "https://cyta.com.cy" },
            ],
        }
    },
    "Malta": {
        cities: {
            "Valletta": [
                { name: "Binance Malta", desc: "Crypto exchange EU hub", url: "https://binance.com" },
                { name: "Tipico", desc: "Sports betting company", url: "https://tipico.com" },
            ],
        }
    },
    "Cuba": {
        cities: {
            "Havana": [
                { name: "ETECSA", desc: "National telecom company", url: "https://etecsa.cu" },
            ],
        }
    },
    "Jamaica": {
        cities: {
            "Kingston": [
                { name: "Digicel", desc: "Telecom provider for Caribbean", url: "https://digicelgroup.com" },
                { name: "GraceKennedy", desc: "Food and financial conglomerate", url: "https://gracekennedy.com" },
            ],
        }
    },
    "Dominican Republic": {
        cities: {
            "Santo Domingo": [
                { name: "Claro Dominicana", desc: "Telecom operator", url: "https://claro.com.do" },
                { name: "Banco Popular", desc: "Major commercial bank", url: "https://popularenlinea.com" },
            ],
        }
    },
    "Trinidad and Tobago": {
        cities: {
            "Port of Spain": [
                { name: "TSTT", desc: "Telecom services", url: "https://tstt.co.tt" },
            ],
        }
    },
    "Costa Rica": {
        cities: {
            "San José": [
                { name: "Intel Costa Rica", desc: "Semiconductor assembly and test", url: "https://intel.com" },
                { name: "Procter & Gamble CR", desc: "Global services center", url: "https://pg.com" },
                { name: "Gorilla Logic", desc: "Nearshore software development", url: "https://gorillalogic.com" },
            ],
        }
    },
    "Panama": {
        cities: {
            "Panama City": [
                { name: "Copa Airlines", desc: "Hub of the Americas airline", url: "https://copaair.com" },
                { name: "Banco General", desc: "Major bank in Central America", url: "https://bgeneral.com" },
            ],
        }
    },
    "Guatemala": {
        cities: {
            "Guatemala City": [
                { name: "Tigo Guatemala", desc: "Telecom operator", url: "https://tigo.com.gt" },
            ],
        }
    },
    "Honduras": {
        cities: {
            "Tegucigalpa": [
                { name: "Tigo Honduras", desc: "Telecom provider", url: "https://tigo.com.hn" },
            ],
        }
    },
    "El Salvador": {
        cities: {
            "San Salvador": [
                { name: "Chivo Wallet", desc: "Government Bitcoin wallet", url: "https://chivowallet.com" },
            ],
        }
    },
    "Ecuador": {
        cities: {
            "Quito": [
                { name: "Banco Pichincha", desc: "Largest private bank", url: "https://pichincha.com" },
                { name: "Kushki", desc: "Payment infrastructure for LatAm", url: "https://kushki.com" },
            ],
            "Guayaquil": [
                { name: "Claro Ecuador", desc: "Major telecom provider", url: "https://claro.com.ec" },
            ],
        }
    },
    "Bolivia": {
        cities: {
            "La Paz": [
                { name: "Tigo Bolivia", desc: "Telecom provider", url: "https://tigo.com.bo" },
            ],
            "Santa Cruz": [
                { name: "Banco Mercantil", desc: "Commercial bank", url: "https://bmsc.com.bo" },
            ],
        }
    },
    "Paraguay": {
        cities: {
            "Asunción": [
                { name: "Tigo Paraguay", desc: "Telecom operator", url: "https://tigo.com.py" },
                { name: "Banco Itaú Paraguay", desc: "Financial services", url: "https://itau.com.py" },
            ],
        }
    },
    "Uruguay": {
        cities: {
            "Montevideo": [
                { name: "dLocal", desc: "Cross-border payment platform", url: "https://dlocal.com" },
                { name: "MercadoLibre Uruguay", desc: "E-commerce marketplace", url: "https://mercadolibre.com.uy" },
                { name: "GeneXus", desc: "Low-code development platform", url: "https://genexus.com" },
            ],
        }
    },
    "Venezuela": {
        cities: {
            "Caracas": [
                { name: "Mercantil Banco", desc: "Major financial institution", url: "https://mercantilbanco.com" },
                { name: "Movistar Venezuela", desc: "Telecom operator", url: "https://movistar.com.ve" },
            ],
        }
    },
    "Tunisia": {
        cities: {
            "Tunis": [
                { name: "Instadeep", desc: "AI and machine learning company", url: "https://instadeep.com" },
                { name: "Ooredoo Tunisia", desc: "Telecom operator", url: "https://ooredoo.tn" },
            ],
        }
    },
    "Algeria": {
        cities: {
            "Algiers": [
                { name: "Djezzy", desc: "Mobile telecom operator", url: "https://djezzy.dz" },
                { name: "Yassir", desc: "Super app for ride-hailing and delivery", url: "https://yassir.com" },
            ],
        }
    },
    "Libya": {
        cities: {
            "Tripoli": [
                { name: "Libyana", desc: "Mobile telecom operator", url: "https://libyana.ly" },
            ],
        }
    },
    "Sudan": {
        cities: {
            "Khartoum": [
                { name: "Zain Sudan", desc: "Mobile operator", url: "https://sd.zain.com" },
            ],
        }
    },
    "Uganda": {
        cities: {
            "Kampala": [
                { name: "MTN Uganda", desc: "Telecom and mobile money", url: "https://mtn.co.ug" },
                { name: "SafeBoda", desc: "Motorcycle ride-hailing", url: "https://safeboda.com" },
            ],
        }
    },
    "Cameroon": {
        cities: {
            "Douala": [
                { name: "MTN Cameroon", desc: "Telecom operator", url: "https://mtn.cm" },
            ],
            "Yaoundé": [
                { name: "Orange Cameroun", desc: "Telecom and mobile money", url: "https://orange.cm" },
            ],
        }
    },
    "Ivory Coast": {
        cities: {
            "Abidjan": [
                { name: "Orange CI", desc: "Telecom and digital services", url: "https://orange.ci" },
                { name: "Wave", desc: "Mobile money platform", url: "https://wave.com" },
            ],
        }
    },
    "Senegal": {
        cities: {
            "Dakar": [
                { name: "Sonatel", desc: "Telecom company", url: "https://sonatel.sn" },
                { name: "Wave Senegal", desc: "Mobile money services", url: "https://wave.com" },
            ],
        }
    },
    "DR Congo": {
        cities: {
            "Kinshasa": [
                { name: "Vodacom Congo", desc: "Telecom and mobile money", url: "https://vodacom.cd" },
            ],
        }
    },
    "Angola": {
        cities: {
            "Luanda": [
                { name: "Unitel", desc: "Largest telecom operator", url: "https://unitel.ao" },
            ],
        }
    },
    "Mozambique": {
        cities: {
            "Maputo": [
                { name: "Vodacom Mozambique", desc: "Telecom operator", url: "https://vm.co.mz" },
            ],
        }
    },
    "Zimbabwe": {
        cities: {
            "Harare": [
                { name: "Econet Wireless", desc: "Telecom and fintech group", url: "https://econet.co.zw" },
                { name: "EcoCash", desc: "Mobile money platform", url: "https://ecocash.co.zw" },
            ],
        }
    },
    "Zambia": {
        cities: {
            "Lusaka": [
                { name: "MTN Zambia", desc: "Telecom operator", url: "https://mtn.zm" },
            ],
        }
    },
    "Botswana": {
        cities: {
            "Gaborone": [
                { name: "Mascom", desc: "Mobile telecom operator", url: "https://mascom.bw" },
            ],
        }
    },
    "Namibia": {
        cities: {
            "Windhoek": [
                { name: "MTC", desc: "Mobile Telecommunications", url: "https://mtc.com.na" },
            ],
        }
    },
    "Madagascar": {
        cities: {
            "Antananarivo": [
                { name: "Orange Madagascar", desc: "Telecom operator", url: "https://orange.mg" },
            ],
        }
    },
    "Mauritius": {
        cities: {
            "Port Louis": [
                { name: "Mauritius Telecom", desc: "National telecom company", url: "https://mauritiustelecom.com" },
            ],
        }
    },
    "Kyrgyzstan": {
        cities: {
            "Bishkek": [
                { name: "Megacom", desc: "Mobile telecom operator", url: "https://megacom.kg" },
            ],
        }
    },
    "Tajikistan": {
        cities: {
            "Dushanbe": [
                { name: "Tcell", desc: "Mobile telecom operator", url: "https://tcell.tj" },
            ],
        }
    },
    "Turkmenistan": {
        cities: {
            "Ashgabat": [
                { name: "Altyn Asyr", desc: "State telecom operator", url: "https://tmcell.tm" },
            ],
        }
    },
    "Mongolia": {
        cities: {
            "Ulaanbaatar": [
                { name: "Mobicom", desc: "Largest telecom operator", url: "https://mobicom.mn" },
                { name: "Khan Bank", desc: "Leading commercial bank", url: "https://khanbank.com" },
            ],
        }
    },
    "Myanmar": {
        cities: {
            "Yangon": [
                { name: "Telenor Myanmar", desc: "Telecom operator", url: "https://telenor.com.mm" },
                { name: "Wave Money", desc: "Mobile financial services", url: "https://wavemoney.com.mm" },
            ],
        }
    },
    "Cambodia": {
        cities: {
            "Phnom Penh": [
                { name: "Smart Axiata", desc: "Mobile telecom operator", url: "https://smart.com.kh" },
                { name: "Wing", desc: "Mobile banking service", url: "https://wingmoney.com" },
            ],
        }
    },
    "Laos": {
        cities: {
            "Vientiane": [
                { name: "Unitel Laos", desc: "Telecom operator", url: "https://unitel.com.la" },
            ],
        }
    },
    "Brunei": {
        cities: {
            "Bandar Seri Begawan": [
                { name: "DST", desc: "Telecom operator", url: "https://dst.com.bn" },
            ],
        }
    },
    "Maldives": {
        cities: {
            "Malé": [
                { name: "Dhiraagu", desc: "Telecom and internet provider", url: "https://dhiraagu.com.mv" },
            ],
        }
    },
    "Bhutan": {
        cities: {
            "Thimphu": [
                { name: "TashiCell", desc: "Mobile telecom operator", url: "https://tashicell.com" },
            ],
        }
    },
    "Papua New Guinea": {
        cities: {
            "Port Moresby": [
                { name: "Digicel PNG", desc: "Telecom and digital services", url: "https://digicelgroup.com" },
            ],
        }
    },
    "Fiji": {
        cities: {
            "Suva": [
                { name: "Vodafone Fiji", desc: "Telecom operator", url: "https://vodafone.com.fj" },
            ],
        }
    },
    "Samoa": {
        cities: {
            "Apia": [
                { name: "Digicel Samoa", desc: "Telecom operator", url: "https://digicelsamoa.com" },
            ],
        }
    },
    "Tonga": {
        cities: {
            "Nukualofa": [
                { name: "Digicel Tonga", desc: "Telecom operator", url: "https://digiceltonga.com" },
            ],
        }
    },
    "Afghanistan": {
        cities: {
            "Kabul": [
                { name: "Roshan", desc: "Telecom operator", url: "https://roshan.af" },
                { name: "Afghan Wireless", desc: "Mobile telecom provider", url: "https://afghan-wireless.com" },
            ],
        }
    },
    "Guyana": {
        cities: {
            "Georgetown": [
                { name: "GTL", desc: "Guyana Telephone and Telegraph", url: "https://gtt.co.gy" },
            ],
        }
    },
    "Suriname": {
        cities: {
            "Paramaribo": [
                { name: "Telesur", desc: "Telecom provider", url: "https://telesur.sr" },
            ],
        }
    },
};

// ─── Navigation State ───
let currentLevel = 'countries'; // 'countries' | 'cities' | 'companies'
let selectedCountry = null;
let selectedCity = null;

function getCurrentItems() {
    if (currentLevel === 'countries') {
        return Object.keys(DATA).map(name => {
            const cityCount = Object.keys(DATA[name].cities).length;
            let companyCount = 0;
            for (const city of Object.values(DATA[name].cities)) companyCount += city.length;
            return { name, subtitle: `${cityCount} cities · ${companyCount} companies`, type: 'country' };
        });
    }
    if (currentLevel === 'cities' && selectedCountry) {
        const cities = DATA[selectedCountry].cities;
        return Object.keys(cities).map(name => ({
            name,
            subtitle: `${cities[name].length} companies`,
            type: 'city',
        }));
    }
    if (currentLevel === 'companies' && selectedCountry && selectedCity) {
        const companies = DATA[selectedCountry].cities[selectedCity];
        return companies.map(c => ({
            name: c.name,
            subtitle: c.desc,
            url: c.url,
            type: 'company',
        }));
    }
    return [];
}

// ─── Configuration ───
const CONFIG = {
    DOT_RADIUS: 5,
    GLOBE_SCALE: 0.45,
    BASE_SPEED: 0.002,
    HOVER_SPEED: 0.0005,
    HOVER_SCALE: 2.5,
    TRANSITION_SPEED: 0.08,
    LINE_DISTANCE: 150,
    LINE_WIDTH: 0.8,
    MOUSE_INFLUENCE: 0.0008,
    ZOOM_SPEED: 0.05,
    MIN_ZOOM: 0.3,
    MAX_ZOOM: 2.0,
};

// ─── State ───
let width, height, globeRadius, globeCenterZ, centerX, centerY, fieldOfView;
let rotationX = 0, rotationY = 0;
let dots = [];
let mouse = { x: 0, y: 0, clickX: null, clickY: null };
let currentSpeed = CONFIG.BASE_SPEED;
let targetSpeed = CONFIG.BASE_SPEED;
let anyDotHovered = false;
let isMouseOverCanvas = false;
let isPaused = false;
let showLines = true;
let zoomLevel = 1;
let dragStart = null;
let isDragging = false;
let dragRotX = 0, dragRotY = 0;

// ─── Color Palette ───
const LEVEL_COLORS = {
    countries: [
        { r: 99, g: 102, b: 241 },   // indigo
        { r: 6, g: 182, b: 212 },     // cyan
        { r: 139, g: 92, b: 246 },    // violet
    ],
    cities: [
        { r: 16, g: 185, b: 129 },    // emerald
        { r: 6, g: 182, b: 212 },     // cyan
        { r: 59, g: 130, b: 246 },    // blue
    ],
    companies: [
        { r: 245, g: 158, b: 11 },    // amber
        { r: 236, g: 72, b: 153 },    // pink
        { r: 239, g: 68, b: 68 },     // red
    ],
};

const LINE_COLORS = {
    countries: { r: 99, g: 102, b: 241 },
    cities: { r: 16, g: 185, b: 129 },
    companies: { r: 245, g: 158, b: 11 },
};

// ─── Canvas Setup ───
function setCanvasDimensions() {
    width = window.innerWidth;
    height = window.innerHeight;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    globeRadius = Math.min(width, height) * CONFIG.GLOBE_SCALE;
    globeCenterZ = 0; // no Z offset — sphere centered at origin
    centerX = width / 2;
    centerY = height / 2;
    fieldOfView = width * 0.8;
}

// ─── Dot Class ───
class Dot {
    constructor(x, y, z, index, itemData) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.index = index;
        this.xProject = 0;
        this.yProject = 0;
        this.sizeProjection = 0;
        this.isHovered = false;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.colorIndex = index % 3;

        this.itemData = itemData; // { name, subtitle, type, url? }
    }

    getColor(alpha = 1) {
        if (this.isHovered) return `rgba(255, 255, 255, ${alpha})`;
        const c = (LEVEL_COLORS[currentLevel] || LEVEL_COLORS.countries)[this.colorIndex];
        return `rgba(${c.r}, ${c.g}, ${c.b}, ${alpha})`;
    }

    project(sinX, cosX, sinY, cosY) {
        const yRot = cosX * this.y - sinX * this.z;
        const zRotX = sinX * this.y + cosX * this.z;
        const zRotY = cosY * zRotX - sinY * this.x;
        const xRot = sinY * zRotX + cosY * this.x;

        this.sizeProjection = fieldOfView / (fieldOfView - zRotY);
        this.xProject = (xRot * this.sizeProjection) * zoomLevel + centerX;
        this.yProject = (yRot * this.sizeProjection) * zoomLevel + centerY;
    }

    checkInteraction(mouseX, mouseY) {
        if (!isMouseOverCanvas || mouseX === null) return false;
        const dx = this.xProject - mouseX;
        const dy = this.yProject - mouseY;
        const radius = (CONFIG.DOT_RADIUS + 10) * this.sizeProjection * zoomLevel;
        return dx * dx + dy * dy < radius * radius;
    }

    draw(time) {
        const pulse = 1 + Math.sin(time * 3 + this.pulsePhase) * 0.25;
        const baseSize = CONFIG.DOT_RADIUS * this.sizeProjection * zoomLevel;
        const scale = this.isHovered ? CONFIG.HOVER_SCALE : 1;
        const size = baseSize * scale * pulse;

        if (this.isHovered) anyDotHovered = true;

        // Outer glow
        const glowSize = size * (this.isHovered ? 5 : 2.5);
        const glow = ctx.createRadialGradient(this.xProject, this.yProject, 0, this.xProject, this.yProject, glowSize);
        glow.addColorStop(0, this.getColor(this.isHovered ? 0.5 : 0.15));
        glow.addColorStop(1, this.getColor(0));
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(this.xProject, this.yProject, glowSize, 0, Math.PI * 2);
        ctx.fill();

        // Core
        const coreGrad = ctx.createRadialGradient(this.xProject, this.yProject, 0, this.xProject, this.yProject, size);
        coreGrad.addColorStop(0, this.getColor(1));
        coreGrad.addColorStop(0.6, this.getColor(0.8));
        coreGrad.addColorStop(1, this.getColor(0));
        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.arc(this.xProject, this.yProject, size, 0, Math.PI * 2);
        ctx.fill();

        // Bright center
        ctx.fillStyle = `rgba(255, 255, 255, ${this.isHovered ? 0.95 : 0.6})`;
        ctx.beginPath();
        ctx.arc(this.xProject, this.yProject, size * 0.3, 0, Math.PI * 2);
        ctx.fill();

        // Label
        const labelAlpha = this.isHovered ? 1 : Math.max(0, (this.sizeProjection - 0.85) * 2);
        if (labelAlpha > 0.05) {
            const fontSize = this.isHovered ? 14 : Math.max(9, 10 * this.sizeProjection);
            ctx.save();
            ctx.font = `${this.isHovered ? '700' : '400'} ${fontSize}px 'Space Grotesk', 'Inter', sans-serif`;
            ctx.fillStyle = this.isHovered
                ? `rgba(255, 255, 255, ${labelAlpha})`
                : `rgba(200, 200, 220, ${labelAlpha * 0.7})`;
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
            ctx.fillText(this.itemData.name, this.xProject + size + 8, this.yProject);

            // Subtitle on hover
            if (this.isHovered && this.itemData.subtitle) {
                ctx.font = `400 ${fontSize - 2}px 'Inter', sans-serif`;
                ctx.fillStyle = `rgba(160, 160, 190, 0.8)`;
                ctx.fillText(this.itemData.subtitle, this.xProject + size + 8, this.yProject + fontSize + 4);
            }
            ctx.restore();
        }

        // Click
        if (this.checkInteraction(mouse.clickX, mouse.clickY)) {
            handleNodeClick(this);
            mouse.clickX = null;
            mouse.clickY = null;
        }
    }
}

// ─── Node Click Handler ───
function handleNodeClick(dot) {
    const item = dot.itemData;
    if (item.type === 'country') {
        selectedCountry = item.name;
        currentLevel = 'cities';
        rebuildSphere();
        updateBreadcrumb();
    } else if (item.type === 'city') {
        selectedCity = item.name;
        currentLevel = 'companies';
        rebuildSphere();
        updateBreadcrumb();
    } else if (item.type === 'company') {
        showCompanyModal(item);
    }
}

// ─── Breadcrumb ───
function updateBreadcrumb() {
    const el = document.getElementById('breadcrumb');
    let html = `<span class="crumb clickable" data-action="countries">Globe</span>`;
    if (selectedCountry) {
        html += ` <span class="crumb-sep">›</span> <span class="crumb clickable" data-action="cities">${selectedCountry}</span>`;
    }
    if (selectedCity) {
        html += ` <span class="crumb-sep">›</span> <span class="crumb active">${selectedCity}</span>`;
    }
    el.innerHTML = html;

    // Attach click handlers
    el.querySelectorAll('.crumb.clickable').forEach(crumb => {
        crumb.addEventListener('click', () => {
            const action = crumb.dataset.action;
            if (action === 'countries') {
                currentLevel = 'countries';
                selectedCountry = null;
                selectedCity = null;
            } else if (action === 'cities') {
                currentLevel = 'cities';
                selectedCity = null;
            }
            rebuildSphere();
            updateBreadcrumb();
        });
    });

    // Update level indicator
    const levelLabel = document.getElementById('levelLabel');
    if (levelLabel) {
        const labels = { countries: 'Countries', cities: 'Cities', companies: 'Companies' };
        levelLabel.textContent = labels[currentLevel];
    }

    // Update search placeholder to reflect scope
    if (window.updateSearchPlaceholder) window.updateSearchPlaceholder();
}

// ─── Company Modal ───
function showCompanyModal(item) {
    modalTitle.textContent = item.name;
    modalText.textContent = item.subtitle;
    modalStats.innerHTML = `
        <div class="modal-stat"><span class="modal-stat-val">${selectedCountry}</span><span class="modal-stat-label">Country</span></div>
        <div class="modal-stat"><span class="modal-stat-val">${selectedCity}</span><span class="modal-stat-label">City</span></div>
        <div class="modal-link-wrap">
            <a href="${item.url}" target="_blank" rel="noopener" class="modal-link-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                Visit Website
            </a>
        </div>
    `;
    modal.classList.add('show');
    modal.style.display = 'flex';
}

closeModal.addEventListener('click', () => {
    modal.classList.remove('show');
    modal.style.display = 'none';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
    }
});

// ─── Create Dots from current level ───
function createDots() {
    dots = [];
    const items = getCurrentItems();
    const count = items.length;

    for (let i = 0; i < count; i++) {
        const phi = Math.acos(1 - 2 * (i + 0.5) / count);
        const theta = Math.PI * (1 + Math.sqrt(5)) * i;
        const x = globeRadius * Math.sin(phi) * Math.cos(theta);
        const y = globeRadius * Math.sin(phi) * Math.sin(theta);
        const z = globeRadius * Math.cos(phi) + globeCenterZ;
        dots.push(new Dot(x, y, z, i, items[i]));
    }

    document.getElementById('nodeCount').textContent = count;
}

function rebuildSphere() {
    // Reset rotation for smooth transition feel
    rotationX = 0;
    rotationY = 0;
    dragRotX = 0;
    dragRotY = 0;
    zoomLevel = 1;
    createDots();
}

// ─── Draw Lines ───
function drawLines() {
    if (!showLines) return;
    const lineColor = LINE_COLORS[currentLevel] || LINE_COLORS.countries;
    const len = dots.length;

    for (let i = 0; i < len; i++) {
        const d1 = dots[i];
        for (let j = i + 1; j < len; j++) {
            const d2 = dots[j];
            const dx = d1.xProject - d2.xProject;
            const dy = d1.yProject - d2.yProject;
            const distSq = dx * dx + dy * dy;
            const avgProjection = (d1.sizeProjection + d2.sizeProjection) * 0.5;
            const maxDist = CONFIG.LINE_DISTANCE * avgProjection * zoomLevel;

            if (distSq < maxDist * maxDist) {
                const distance = Math.sqrt(distSq);
                const alpha = (1 - distance / maxDist) * 0.5;
                const isHov = d1.isHovered || d2.isHovered;

                ctx.strokeStyle = isHov
                    ? `rgba(255, 255, 255, ${alpha * 1.5})`
                    : `rgba(${lineColor.r}, ${lineColor.g}, ${lineColor.b}, ${alpha})`;
                ctx.lineWidth = isHov ? CONFIG.LINE_WIDTH * 2 : CONFIG.LINE_WIDTH;

                ctx.beginPath();
                ctx.moveTo(d1.xProject, d1.yProject);
                ctx.lineTo(d2.xProject, d2.yProject);
                ctx.stroke();
            }
        }
    }
}

// ─── Animate ───
function animate() {
    const time = performance.now() * 0.001;

    ctx.clearRect(0, 0, width, height);

    if (!isPaused) {
        targetSpeed = anyDotHovered ? CONFIG.HOVER_SPEED : CONFIG.BASE_SPEED;
        currentSpeed = lerp(currentSpeed, targetSpeed, CONFIG.TRANSITION_SPEED);
        rotationX += currentSpeed;
        rotationY += currentSpeed;
    }

    const sinX = Math.sin(rotationX + dragRotX);
    const cosX = Math.cos(rotationX + dragRotX);
    const sinY = Math.sin(rotationY + dragRotY);
    const cosY = Math.cos(rotationY + dragRotY);

    let closestDot = null;
    let closestDistSq = Infinity;

    for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        dot.isHovered = false;
        dot.project(sinX, cosX, sinY, cosY);

        if (isMouseOverCanvas) {
            const dx = dot.xProject - mouse.x;
            const dy = dot.yProject - mouse.y;
            const distSq = dx * dx + dy * dy;
            const radius = (CONFIG.DOT_RADIUS + 10) * dot.sizeProjection * zoomLevel;
            if (distSq < radius * radius && distSq < closestDistSq) {
                closestDistSq = distSq;
                closestDot = dot;
            }
        }
    }

    if (closestDot) {
        closestDot.isHovered = true;
        showTooltip(closestDot);
    } else {
        hideTooltip();
    }

    anyDotHovered = closestDot !== null;
    canvas.style.cursor = closestDot ? 'pointer' : (isDragging ? 'grabbing' : 'default');

    drawLines();

    const sorted = [...dots].sort((a, b) => a.sizeProjection - b.sizeProjection);
    for (let i = 0; i < sorted.length; i++) {
        if (!sorted[i].isHovered) sorted[i].draw(time);
    }
    for (let i = 0; i < sorted.length; i++) {
        if (sorted[i].isHovered) sorted[i].draw(time);
    }

    // Cursor glow
    glowX += (targetGlowX - glowX) * 0.06;
    glowY += (targetGlowY - glowY) * 0.06;
    cursorGlow.style.left = glowX + 'px';
    cursorGlow.style.top = glowY + 'px';

    requestAnimationFrame(animate);
}

function lerp(a, b, t) { return a + (b - a) * t; }

// ─── Tooltip ───
function showTooltip(dot) {
    tooltip.classList.add('visible');
    tooltip.style.left = (dot.xProject + 20) + 'px';
    tooltip.style.top = (dot.yProject - 30) + 'px';

    const rect = tooltip.getBoundingClientRect();
    if (rect.right > width) tooltip.style.left = (dot.xProject - rect.width - 20) + 'px';
    if (rect.bottom > height) tooltip.style.top = (dot.yProject - rect.height - 10) + 'px';

    tooltipId.textContent = dot.itemData.name;
    tooltipPos.textContent = dot.itemData.subtitle;

    const actionHints = { country: 'Click to explore cities', city: 'Click to see companies', company: 'Click for details' };
    tooltipDepth.textContent = actionHints[dot.itemData.type] || '';
}

function hideTooltip() {
    tooltip.classList.remove('visible');
}

// ─── Controls ───
function setupControls() {
    const toggleBtn = document.getElementById('toggleRotation');
    toggleBtn.addEventListener('click', () => {
        isPaused = !isPaused;
        toggleBtn.classList.toggle('active', isPaused);
        toggleBtn.innerHTML = isPaused
            ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>'
            : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>';
    });

    const lineBtn = document.getElementById('toggleLines');
    lineBtn.classList.add('active');
    lineBtn.addEventListener('click', () => {
        showLines = !showLines;
        lineBtn.classList.toggle('active', showLines);
        lineBtn.style.opacity = showLines ? '1' : '0.4';
    });

    document.getElementById('particleSlider').addEventListener('input', (e) => {
        CONFIG.LINE_DISTANCE = parseInt(e.target.value);
        document.getElementById('particleValue').textContent = e.target.value;
    });

    document.getElementById('speedSlider').addEventListener('input', (e) => {
        CONFIG.BASE_SPEED = parseInt(e.target.value) * 0.0005;
        document.getElementById('speedValue').textContent = e.target.value;
    });

    document.getElementById('sizeSlider').addEventListener('input', (e) => {
        CONFIG.GLOBE_SCALE = parseInt(e.target.value) / 100;
        document.getElementById('sizeValue').textContent = e.target.value;
        globeRadius = Math.min(width, height) * CONFIG.GLOBE_SCALE;
        globeCenterZ = 0;
        createDots();
    });
}

// ─── Search ───
function initSearch() {
    const input = document.getElementById('searchInput');
    const results = document.getElementById('searchResults');
    const kbd = document.getElementById('searchKbd');
    let activeIndex = -1;

    // Build scoped search index based on current navigation level
    function buildScopedIndex() {
        const items = [];

        if (currentLevel === 'countries') {
            // Global scope: search everything
            for (const [country, cData] of Object.entries(DATA)) {
                items.push({ name: country, type: 'country', path: '', country, city: null });
                for (const [city, companies] of Object.entries(cData.cities)) {
                    items.push({ name: city, type: 'city', path: country, country, city });
                    for (const comp of companies) {
                        items.push({ name: comp.name, type: 'company', path: `${country} › ${city}`, country, city, url: comp.url, desc: comp.desc });
                    }
                }
            }
        } else if (currentLevel === 'cities' && selectedCountry && DATA[selectedCountry]) {
            // Country scope: search cities and companies within this country
            const cData = DATA[selectedCountry];
            for (const [city, companies] of Object.entries(cData.cities)) {
                items.push({ name: city, type: 'city', path: selectedCountry, country: selectedCountry, city });
                for (const comp of companies) {
                    items.push({ name: comp.name, type: 'company', path: `${selectedCountry} › ${city}`, country: selectedCountry, city, url: comp.url, desc: comp.desc });
                }
            }
        } else if (currentLevel === 'companies' && selectedCountry && selectedCity && DATA[selectedCountry]) {
            // City scope: search companies within this city
            const companies = DATA[selectedCountry].cities[selectedCity] || [];
            for (const comp of companies) {
                items.push({ name: comp.name, type: 'company', path: `${selectedCountry} › ${selectedCity}`, country: selectedCountry, city: selectedCity, url: comp.url, desc: comp.desc });
            }
        }

        return items;
    }

    function highlight(text, query) {
        if (!query) return text;
        const re = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        return text.replace(re, '<mark>$1</mark>');
    }

    function search(query) {
        if (!query || query.length < 1) { hide(); return; }
        const q = query.toLowerCase();
        const index = buildScopedIndex();
        const matches = index.filter(item =>
            item.name.toLowerCase().includes(q) ||
            item.path.toLowerCase().includes(q)
        ).slice(0, 30);

        if (matches.length === 0) {
            results.innerHTML = '<div class="search-empty">No results found</div>';
            results.classList.add('visible');
            return;
        }

        // Group by type
        const groups = { country: [], city: [], company: [] };
        matches.forEach(m => groups[m.type].push(m));

        let html = '';
        for (const [type, items] of Object.entries(groups)) {
            if (items.length === 0) continue;
            const labels = { country: 'Countries', city: 'Cities', company: 'Companies' };
            html += `<div class="search-group-label">${labels[type]}</div>`;
            items.forEach((item) => {
                html += `<div class="search-item" data-type="${item.type}" data-country="${item.country || ''}" data-city="${item.city || ''}" ${item.url ? `data-url="${item.url}"` : ''} ${item.desc ? `data-desc="${item.desc}"` : ''} data-name="${item.name}">
                    <span class="search-item-dot ${item.type}"></span>
                    <div class="search-item-info">
                        <div class="search-item-name">${highlight(item.name, query)}</div>
                        ${item.path ? `<div class="search-item-path">${highlight(item.path, query)}</div>` : ''}
                    </div>
                    <span class="search-item-type ${item.type}">${item.type}</span>
                </div>`;
            });
        }

        results.innerHTML = html;
        results.classList.add('visible');
        activeIndex = -1;

        // Click handlers
        results.querySelectorAll('.search-item').forEach(el => {
            el.addEventListener('click', () => handleSearchSelect(el));
        });
    }

    function handleSearchSelect(el) {
        const type = el.dataset.type;
        const country = el.dataset.country;
        const city = el.dataset.city;

        if (type === 'country') {
            selectedCountry = country;
            selectedCity = null;
            currentLevel = 'cities';
        } else if (type === 'city') {
            selectedCountry = country;
            selectedCity = city;
            currentLevel = 'companies';
        } else if (type === 'company') {
            selectedCountry = country;
            selectedCity = city;
            currentLevel = 'companies';
            rebuildSphere();
            updateBreadcrumb();
            // Show company modal
            setTimeout(() => {
                showCompanyModal({
                    name: el.dataset.name,
                    subtitle: el.dataset.desc || '',
                    url: el.dataset.url || '#',
                });
            }, 100);
            hide();
            input.value = '';
            input.blur();
            return;
        }

        rebuildSphere();
        updateBreadcrumb();
        hide();
        input.value = '';
        input.blur();
    }

    function hide() {
        results.classList.remove('visible');
        activeIndex = -1;
    }

    // Update placeholder based on current scope
    function updatePlaceholder() {
        if (currentLevel === 'countries') {
            input.placeholder = 'Search countries, cities, companies...';
        } else if (currentLevel === 'cities' && selectedCountry) {
            input.placeholder = `Search in ${selectedCountry}...`;
        } else if (currentLevel === 'companies' && selectedCity) {
            input.placeholder = `Search in ${selectedCity}...`;
        }
    }

    // Expose updatePlaceholder globally so breadcrumb nav can call it
    window.updateSearchPlaceholder = updatePlaceholder;
    updatePlaceholder();

    input.addEventListener('input', () => search(input.value.trim()));

    input.addEventListener('focus', () => {
        if (input.value.trim()) search(input.value.trim());
        if (kbd) kbd.style.display = 'none';
    });

    input.addEventListener('blur', () => {
        setTimeout(hide, 200);
        if (kbd && !input.value) kbd.style.display = '';
    });

    // Keyboard navigation
    input.addEventListener('keydown', (e) => {
        const items = results.querySelectorAll('.search-item');
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            activeIndex = Math.min(activeIndex + 1, items.length - 1);
            items.forEach((el, i) => el.classList.toggle('active', i === activeIndex));
            if (items[activeIndex]) items[activeIndex].scrollIntoView({ block: 'nearest' });
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            activeIndex = Math.max(activeIndex - 1, 0);
            items.forEach((el, i) => el.classList.toggle('active', i === activeIndex));
            if (items[activeIndex]) items[activeIndex].scrollIntoView({ block: 'nearest' });
        } else if (e.key === 'Enter' && activeIndex >= 0 && items[activeIndex]) {
            e.preventDefault();
            handleSearchSelect(items[activeIndex]);
        } else if (e.key === 'Escape') {
            hide();
            input.blur();
        }
    });

    // Global "/" shortcut to focus search
    document.addEventListener('keydown', (e) => {
        if (e.key === '/' && document.activeElement !== input && !modal.classList.contains('show')) {
            e.preventDefault();
            input.focus();
        }
    });
}

// ─── Auto-locate user ───
function autoLocate() {
    return fetch('https://ipapi.co/json/')
        .then(r => r.json())
        .then(data => {
            const country = data.country_name;
            const city = data.city;
            if (country && DATA[country]) {
                selectedCountry = country;
                currentLevel = 'cities';
                if (city && DATA[country].cities[city]) {
                    selectedCity = city;
                    currentLevel = 'companies';
                }
                rebuildSphere();
                updateBreadcrumb();
            }
        })
        .catch(() => {}); // silently fail, stay on globe view
}

// ─── Hide Loader ───
function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
}

// ─── Init ───
function init() {
    setCanvasDimensions();
    createDots();
    setupControls();
    initSearch();
    updateBreadcrumb();
    autoLocate().then(hideLoader);
}

// ─── Event Listeners ───
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        setCanvasDimensions();
        createDots();
    }, 200);
});

canvas.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    isMouseOverCanvas = true;
    if (isDragging && dragStart) {
        dragRotY = (e.clientX - dragStart.x) * CONFIG.MOUSE_INFLUENCE * 2;
        dragRotX = (e.clientY - dragStart.y) * CONFIG.MOUSE_INFLUENCE * 2;
    }
});

canvas.addEventListener('mousedown', e => {
    isDragging = true;
    dragStart = { x: e.clientX, y: e.clientY };
});

canvas.addEventListener('mouseup', e => {
    if (isDragging && dragStart) {
        const dx = e.clientX - dragStart.x;
        const dy = e.clientY - dragStart.y;
        if (Math.abs(dx) < 5 && Math.abs(dy) < 5) {
            mouse.clickX = e.clientX;
            mouse.clickY = e.clientY;
        }
        rotationY += dragRotY;
        rotationX += dragRotX;
        dragRotX = 0;
        dragRotY = 0;
    }
    isDragging = false;
    dragStart = null;
});

canvas.addEventListener('mouseleave', () => {
    isMouseOverCanvas = false;
    isDragging = false;
    dragStart = null;
    dragRotX = 0;
    dragRotY = 0;
});

canvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -CONFIG.ZOOM_SPEED : CONFIG.ZOOM_SPEED;
    zoomLevel = Math.max(CONFIG.MIN_ZOOM, Math.min(CONFIG.MAX_ZOOM, zoomLevel + delta));
}, { passive: false });

// Touch
canvas.addEventListener('touchstart', (e) => {
    const t = e.touches[0];
    isDragging = true;
    dragStart = { x: t.clientX, y: t.clientY };
    mouse.x = t.clientX;
    mouse.y = t.clientY;
    isMouseOverCanvas = true;
}, { passive: true });

canvas.addEventListener('touchmove', (e) => {
    const t = e.touches[0];
    mouse.x = t.clientX;
    mouse.y = t.clientY;
    if (isDragging && dragStart) {
        dragRotY = (t.clientX - dragStart.x) * CONFIG.MOUSE_INFLUENCE * 2;
        dragRotX = (t.clientY - dragStart.y) * CONFIG.MOUSE_INFLUENCE * 2;
    }
}, { passive: true });

canvas.addEventListener('touchend', () => {
    rotationY += dragRotY;
    rotationX += dragRotX;
    dragRotX = 0;
    dragRotY = 0;
    isDragging = false;
    dragStart = null;
});

// Cursor glow
const cursorGlow = document.getElementById('cursorGlow');
let glowX = 0, glowY = 0, targetGlowX = 0, targetGlowY = 0;
window.addEventListener('mousemove', (e) => { targetGlowX = e.clientX; targetGlowY = e.clientY; });

// ─── Start ───
init();
animate();
