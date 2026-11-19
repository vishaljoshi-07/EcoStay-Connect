const { GoogleGenerativeAI } = require('@google/generative-ai');
const asyncHandler = require('../utils/asyncHandler');

// System prompt definition for EcoStay Connect AI Assistant
const SYSTEM_PROMPT = `You are the EcoStay Connect AI Assistant, an expert consultant in sustainable tourism, eco-friendly homestays, green travel itineraries, carbon footprint reduction, and authentic local cultural experiences.

Your goal is to assist travelers with:
1. Eco-friendly travel suggestions & sustainable destination choices.
2. Custom day-by-day green itineraries with minimal environmental footprint.
3. Practical sustainable travel tips (waste reduction, water conservation, eco-transports).
4. Homestay recommendations matching eco-conscious travelers' values.
5. Local cultural experiences and eco-attraction recommendations.
6. General travel advice focusing on supporting local indigenous communities.

Always provide clear, inspiring, warm, and nicely formatted Markdown responses (using headers, bullet points, and bold text). If the user asks something completely unrelated to travel or sustainability, politely pivot back to eco-travel topics.`;

// Pre-packaged high quality responsive knowledge engine for offline or key-free scenarios
const generateFallbackResponse = (userPrompt) => {
  const p = userPrompt.toLowerCase();

  // Greetings / Identity
  if (p === 'hi' || p === 'hello' || p === 'hey' || p.includes('who are you') || p.includes('what can you do')) {
    return `### 🌿 Hello from EcoStay Connect AI!

I am your personal **Sustainable Travel Assistant**. I am here to help you plan responsible, low-impact, and enriching travel experiences across India and beyond.

Here are a few things you can ask me:
* **Custom Itineraries:** *"Plan a 3-day eco-friendly trip to Coorg or Manali"*
* **Homestay Recommendations:** *"Suggest top eco homestays with solar power & organic food"*
* **Zero-Waste Travel:** *"What should I pack for a plastic-free mountain trek?"*
* **Carbon Footprint:** *"How can I travel sustainably across Himachal Pradesh?"*
* **Destination Guides:** *"What are the best sustainable activities in Wayanad or Rishikesh?"*

What journey can I help you design today?`;
  }

  // Location-specific answers
  if (p.includes('coorg')) {
    return `### ☕ Eco-Travel Guide: Coorg (Kodagu, Karnataka)

Known as the *Scotland of India*, Coorg is famous for misty coffee plantations, rolling hills, and rich Kodava biodiversity.

#### 🏡 Recommended Stay:
* **Cloud-Kissed Mud Haven** (Madikeri, Coorg)
  * **Eco Features:** Vernacular mud construction, biogas energy, solar water heating, organic farm-to-table dining.
  * **Starting Price:** ₹2,800/night | **Sustainability Rating:** 4.7 ★

#### 🌿 3-Day Green Itinerary:
* **Day 1:** Arrive via public EV bus from Mysore. Check into your mud cottage. Afternoon plantation walk learning about shade-grown organic coffee and honey harvesting.
* **Day 2:** Early morning birdwatching at Nagarhole boundary. Visit Abbey Falls with a reusable canteen (avoid plastic water bottles). Evening traditional Kodava dinner.
* **Day 3:** Trek to Mandalpatti peak on designated trails to preserve native soil. Support local women cooperatives selling organic spices before heading home.

💡 *Eco Tip: Choose shade-grown coffee brands — they preserve the rainforest canopy and support bird nesting habitats.*`;
  }

  if (p.includes('manali') || p.includes('himachal')) {
    return `### 🏔️ Sustainable Travel Guide: Manali & Himachal Pradesh

The Himalayan alpine ecosystem is delicate and needs mindful, conscious travelers.

#### 🏡 Recommended Stay:
* **The Whispering Pines Sanctuary** (Manali, HP)
  * **Eco Features:** 100% Solar-powered, on-site organic apple orchard, rainwater harvesting, zero single-use plastics.
  * **Starting Price:** ₹3,500/night | **Sustainability Rating:** 4.9 ★

#### 🌲 Eco Highlights & Green Tips:
1. **Low-Carbon Transport:** Take the Vande Bharat or overnight electric Volvo bus from Delhi/Chandigarh to minimize road emissions.
2. **Alpine Etiquette:** Stay strictly on marked trails in Solang and Rohtang to prevent soil erosion.
3. **Carry a Water Purifier Bottle:** Refill from natural mountain spring taps instead of buying disposable bottles.
4. **Local Support:** Buy hand-knitted woolen shawls directly from artisan weavers in Kullu.`;
  }

  if (p.includes('wayanad') || p.includes('kerala')) {
    return `### 🌴 Green Travel Guide: Wayanad & Kerala

Wayanad is part of the Nilgiri Biosphere Reserve, renowned for bamboo architecture, spice forests, and tranquil backwaters.

#### 🏡 Recommended Stay:
* **Emerald Valley Bamboo Retreat** (Wayanad, Kerala)
  * **Eco Features:** Built entirely from renewable local bamboo, zero concrete footprint, natural stream filtration, traditional Ayurveda herb garden.
  * **Starting Price:** ₹4,200/night | **Sustainability Rating:** 4.8 ★

#### 🌿 Must-Experience Activities:
* **Edakkal Caves Exploration:** Trek to the Neolithic petroglyphs with a licensed local guide.
* **Bamboo Craft Workshop:** Learn weaving techniques from indigenous Uravu artisans.
* **Kuruva Island Nature Walk:** A river delta protected by dense evergreen canopy.`;
  }

  if (p.includes('almora') || p.includes('uttarakhand') || p.includes('nainital')) {
    return `### ⛰️ Eco Travel Guide: Almora & Kumaon Hills

Experience traditional hill architecture, quiet pine ridges, and spectacular panoramic vistas of Nanda Devi.

#### 🏡 Recommended Stay:
* **Himalayan Stone Eco-Cottage** (Almora, Uttarakhand)
  * **Eco Features:** Restored vintage Kumaoni stone architecture, passive solar warmth, recycled greywater for herb beds, zero waste policy.
  * **Starting Price:** ₹3,100/night | **Sustainability Rating:** 4.9 ★

#### 🌿 Green Recommendations:
* **Binsar Wildlife Sanctuary:** Ideal for peaceful walks through oak and rhododendron forests without motor vehicle noise.
* **Support Local Cooperatives:** Purchase natural wild apricot oil and rhododendron squash from Kumaon village societies.`;
  }

  if (p.includes('rishikesh')) {
    return `### 🌊 Mindful Travel Guide: Rishikesh

The spiritual capital situated on the banks of the sacred Ganges river.

#### 🏡 Recommended Stay:
* **Ganges Edge Mud Retreat** (Rishikesh, Uttarakhand)
  * **Eco Features:** Solar energy, vegan zero-oil Ayurvedic kitchen, natural lime & mud cooling, riverside cleanup initiatives.
  * **Starting Price:** ₹2,500/night | **Sustainability Rating:** 4.6 ★

#### 🧘 Conscious Highlights:
* Sunrise yoga sessions using natural jute mats by the river.
* Participation in community clean-up drives along the holy riverbank.
* Organic farm dining along the Tapovan hills.`;
  }

  // Itinerary generation for general trips
  if (p.includes('itinerary') || p.includes('trip') || p.includes('plan') || p.includes('days')) {
    const daysMatch = p.match(/(\d+)\s*day/);
    const numDays = daysMatch ? parseInt(daysMatch[1]) : 3;

    return `### 🌿 Custom ${numDays}-Day Eco-Friendly Travel Itinerary

Here is your tailored blueprint for an environmentally conscious journey:

**Day 1: Arrival, Settling In & Local Immersion**
* **Morning:** Check into your certified eco-homestay. Relax with a welcome herbal infusion sourced from the property garden.
* **Afternoon:** Tour the sustainable infrastructure — observe solar setups, rainwater systems, and composting methods.
* **Evening:** Farm-to-table dinner featuring seasonal local specialties prepared by the host family.

**Day 2: Low-Impact Exploration & Nature Connection**
* **Morning:** Sunrise nature walk or birdwatching led by an indigenous village guide.
* **Afternoon:** Zero-waste picnic using cloth totes, steel lunch containers, and filtered spring water.
* **Evening:** Traditional handicraft demonstration or stargazing under clear, unpolluted mountain skies.

${numDays >= 3 ? `**Day 3: Cultural Exchange & Community Impact**
* **Morning:** Visit local organic farmers or village artisan cooperatives.
* **Afternoon:** Participate in a tree-planting session or local conservation activity.
* **Evening:** Farewell community meal and carbon-offset calculation review for your journey home.` : ''}

---
💡 **Sustainable Checklist:**
1. Carry a reusable water bottle & cloth shopping bag.
2. Decline single-use hotel toiletries; use natural soap bars.
3. Travel by train or shared EV wherever feasible.`;
  }

  // Homestays / Booking queries
  if (p.includes('homestay') || p.includes('recommend') || p.includes('hotel') || p.includes('stay') || p.includes('book')) {
    return `### 🏡 EcoStay Connect: Featured Sustainable Homestays

All properties listed on EcoStay Connect undergo rigorous verification across 5 key ecological pillars: renewable energy, waste management, water conservation, local community employment, and cultural preservation.

1. **The Whispering Pines Sanctuary** — *Manali, HP* (₹3,500/night)
   * 100% Solar-powered, on-site organic orchard, mountain spring water.
2. **Emerald Valley Bamboo Retreat** — *Wayanad, Kerala* (₹4,200/night)
   * Biophilic bamboo design, zero concrete, native Ayurveda herbal gardens.
3. **Cloud-Kissed Mud Haven** — *Coorg, Karnataka* (₹2,800/night)
   * Hand-built mud cottage, biogas cooking fuel, farm-to-table dining.
4. **Himalayan Stone Eco-Cottage** — *Almora, Uttarakhand* (₹3,100/night)
   * Restored vintage stone architecture, passive solar design, zero waste policy.
5. **Ganges Edge Mud Retreat** — *Rishikesh, Uttarakhand* (₹2,500/night)
   * Solar water heating, vegan kitchen, zero single-use plastic.

*To reserve any homestay, simply click "Book Now" on the homestay card, select your dates and guests, and confirm your booking instantly.*`;
  }

  // Packing & Zero Waste Tips
  if (p.includes('pack') || p.includes('waste') || p.includes('plastic') || p.includes('zero')) {
    return `### 🎒 The Ultimate Zero-Waste Travel Packing Checklist

Minimizing non-biodegradable waste is one of the highest impact choices an eco-traveler can make.

#### 🧰 The Essential Eco-Kit:
* **Hydration:** Insulated stainless-steel water bottle + portable UV water purifier or LifeStraw.
* **Dining on the Go:** Compact bamboo cutlery set, collapsible silicone lunchbox, and cloth napkins.
* **Toiletries:** Solid shampoo and conditioner bars, bamboo toothbrush, natural toothpaste tablets, and biodegradable sunscreen.
* **Shopping & Laundry:** 2 compact cotton tote bags and a washable mesh laundry bag.
* **Electronics:** High-capacity solar power bank to recharge your devices sustainably.

#### ⚠️ Single-Use Items to Refuse:
* Plastic straw drinks
* Hotel sample-size shampoo bottles
* Plastic carrier bags
* Disposable plastic cutlery on flights/trains`;
  }

  // Carbon footprint / Transport
  if (p.includes('carbon') || p.includes('transport') || p.includes('footprint') || p.includes('emission')) {
    return `### 🚗 How to Minimize Your Travel Carbon Footprint

Transport accounts for approximately **70% of global tourism emissions**. Here is how to lower your impact:

1. **Prioritize Trains over Flights:** Traveling by train emits up to **80% less carbon** per passenger-kilometer compared to short-haul flights.
2. **Embrace Electric Transport:** Look for electric bus services (e.g., green bus routes in Himachal and Kerala) and shared EV cabs.
3. **Slow Travel:** Spend more days in one destination rather than hopping across multiple towns. You immerse deeper and travel fewer miles.
4. **Eat Seasonally and Locally:** Plant-forward, locally sourced meals drastically reduce the food miles associated with your holiday.
5. **Stay in Passive-Energy Homestays:** EcoStay properties utilize natural ventilation, thermal mass (mud/stone), and solar arrays to cut energy demand.`;
  }

  // General fallback
  return `### 🌱 Sustainable Travel Guide & Recommendations

Thank you for consulting **EcoStay Connect AI**! Here are the core values guiding sustainable travel:

* **Support Local Economies:** When you book an authentic family-run homestay, your money goes directly to local residents rather than multinational hotel chains.
* **Conserve Fragile Ecosystems:** Avoid single-use plastics, stick to designated hiking trails, and respect wildlife buffer zones.
* **Preserve Cultural Heritage:** Learn a few words in the regional language and honor local dress codes and customs.
* **Lower Your Impact:** Choose accommodations certified for renewable energy, composting, and water harvesting.

*Feel free to ask for specific destination advice (e.g., Coorg, Manali, Wayanad), packing checklists, custom itineraries, or homestay recommendations!*`;
};

// @desc    Process prompt with Gemini AI API or Intelligent Knowledge Engine
// @route   POST /api/ai/chat
// @access  Public (Guest & Authenticated friendly)
const handleAiChat = asyncHandler(async (req, res) => {
  const { prompt } = req.body;

  // 1. Input Validation: Check empty prompt
  if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
    res.status(400);
    throw new Error('Please provide a valid text prompt for the AI assistant');
  }

  const trimmedPrompt = prompt.trim();

  // 2. Length check
  if (trimmedPrompt.length > 2000) {
    res.status(400);
    throw new Error('Prompt is too long. Please restrict your prompt to 2000 characters');
  }

  // Check custom header key or environment key
  const customKey = req.headers['x-gemini-api-key'];
  const envKey = process.env.GEMINI_API_KEY;
  const apiKey = (customKey && customKey.trim()) || (envKey && !envKey.startsWith('AIzaSyDemoKey') && envKey !== 'your_gemini_api_key_here' ? envKey : null);

  // 3. If API key is present and not dummy, call Google Gemini API
  if (apiKey) {
    try {
      const genAI = new GoogleGenerativeAI(apiKey.trim());
      const candidateModels = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-2.0-flash', 'gemini-pro'];
      let resultText = null;
      let usedModel = null;

      for (const modelName of candidateModels) {
        try {
          const model = genAI.getGenerativeModel({ model: modelName });
          const fullPrompt = `${SYSTEM_PROMPT}\n\nUser Question: ${trimmedPrompt}`;

          const result = await Promise.race([
            model.generateContent(fullPrompt),
            new Promise((_, reject) =>
              setTimeout(() => reject(new Error('AI Request Timeout')), 15000)
            )
          ]);

          const response = await result.response;
          const text = response.text();
          if (text) {
            resultText = text;
            usedModel = modelName;
            break;
          }
        } catch (mErr) {
          console.warn(`[AI Engine] Model ${modelName} trial error:`, mErr.message);
        }
      }

      if (resultText) {
        return res.status(200).json({
          success: true,
          data: {
            prompt: trimmedPrompt,
            response: resultText,
            reply: resultText,
            source: `Google ${usedModel}`,
            timestamp: new Date()
          }
        });
      }
    } catch (apiError) {
      console.warn('[AI Engine] Gemini API error, falling back to local engine:', apiError.message);
    }
  }

  // 4. Intelligent Knowledge Engine Response (Ensures 100% uptime and smooth experience)
  const fallbackText = generateFallbackResponse(trimmedPrompt);

  return res.status(200).json({
    success: true,
    data: {
      prompt: trimmedPrompt,
      response: fallbackText,
      reply: fallbackText,
      source: 'EcoStay AI Engine',
      timestamp: new Date()
    }
  });
});

module.exports = {
  handleAiChat
};
