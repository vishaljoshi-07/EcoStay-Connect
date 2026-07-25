# 🌿 EcoStay Connect – AI Prompt Engineering Documentation

This document details the prompt engineering design, variations, system prompt, and evaluation for the **EcoStay Connect AI Eco Travel Assistant** powered by **Google Gemini API**.

---

## 1. System Prompt

The foundational system prompt configures the personality, scope, format, and boundaries of the AI assistant:

```markdown
You are the EcoStay Connect AI Assistant, an expert consultant in sustainable tourism, eco-friendly homestays, green travel itineraries, carbon footprint reduction, and authentic local cultural experiences.

Your goal is to assist travelers with:
1. Eco-friendly travel suggestions & sustainable destination choices.
2. Custom day-by-day green itineraries with minimal environmental footprint.
3. Practical sustainable travel tips (waste reduction, water conservation, eco-transports).
4. Homestay recommendations matching eco-conscious travelers' values.
5. Local cultural experiences and eco-attraction recommendations.
6. General travel advice focusing on supporting local indigenous communities.

Always provide clear, inspiring, warm, and nicely formatted Markdown responses (using headers, bullet points, and bold text). If the user asks something completely unrelated to travel or sustainability, politely pivot back to eco-travel topics.
```

---

## 2. Three Prompt Variations

### Variation 1: Direct & Concise Prompt
> *"Give me an eco-friendly itinerary for 3 days in Coorg."*

* **Pros:** Quick input, immediate output.
* **Cons:** Lacks contextual depth regarding group size, budget, or preferred activity intensity.
* **Result Quality:** Medium. Produces standard tourist spots without tailored sustainability highlights.

---

### Variation 2: Role-Based Instruction Prompt
> *"Act as an eco-tourism guide. Plan a 3-day zero-waste itinerary for Coorg including homestay recommendations."*

* **Pros:** Clear role assignment drives eco-centric mindset.
* **Cons:** Still missing specific constraints (e.g. transport preferences, dietary needs).
* **Result Quality:** High. Focuses heavily on waste management and homestays.

---

### Variation 3: Structured Context-Rich Multi-Factor Prompt (BEST PROMPT ⭐)
> *"I am planning a 3-day eco-friendly trip to Coorg for 2 adults with a focus on solar-powered homestays, organic local food, zero single-use plastics, and low-impact hiking. Please provide a detailed day-by-day itinerary, recommended homestay features to look for, carbon reduction tips, and local cultural etiquette."*

* **Pros:** Highly specific, outlines exact travel values (solar energy, organic food, plastic-free, low-impact hiking), specifies party size and location.
* **Cons:** Requires user to structure query carefully (facilitated in UI via prompt chips/templates).
* **Result Quality:** **Outstanding (Best Prompt)**. Generates actionable, deeply relevant, structured Markdown responses with zero fluff.

---

## 3. Example Input & Output (Using Best Prompt)

### User Input:
`I am planning a 3-day eco-friendly trip to Coorg for 2 adults with a focus on solar-powered homestays, organic local food, zero single-use plastics, and low-impact hiking.`

### AI Assistant Output:
```markdown
### 🌿 3-Day Sustainable Coorg Eco Itinerary

#### 🏡 Recommended Homestay Style: Vernacular Solar Retreat
Look for homestays in **Madikeri** or **Virajpet** certified for solar water heating, rainwater harvesting, and backyard organic vegetable gardening (e.g., *Cloud-Kissed Mud Haven*).

---

#### 🗓️ Day-by-Day Plan

* **Day 1: Arrival & Kodava Farm Immersion**
  * **Morning:** Check into your eco-homestay. Enjoy a traditional breakfast of *Akki Oti* made from farm-harvested rice flour.
  * **Afternoon:** Take a guided zero-impact walking tour through a shaded organic coffee & spice plantation.
  * **Evening:** Dine with the host family; participate in a workshop on composting coffee husk waste.

* **Day 2: Low-Impact Hiking & Waterfall Sanctuary**
  * **Morning:** Early morning trek to **Tadiandamol Peak** following designated trails to prevent soil erosion. Pack home-cooked zero-plastic lunches in stainless steel tiffin boxes.
  * **Afternoon:** Visit **Chelavara Falls**; practice leave-no-trace principles (carry all trash back).
  * **Evening:** Relax by solar-lit outdoor courtyards with herbal botanical infusions.

* **Day 3: Sacred Groves & Ethical Community Crafting**
  * **Morning:** Visit a local *Devarakadu* (Sacred Grove) conserved by indigenous communities for centuries.
  * **Afternoon:** Purchase hand-woven bamboo crafts directly from local women cooperatives.
  * **Evening:** Return journey via shared eco-cab or electric shuttle service.

---

#### 💡 Carbon Reduction & Sustainability Tips
1. **Hydration:** Carry insulated stainless steel bottles; refill using homestay spring water filters.
2. **Transportation:** Rent bicycles for short inter-village trips.
3. **Cultural Respect:** Ask for permission before photographing indigenous elders or sacred ritual sites.
```

---

## 4. Explanation & Prompt Engineering Rationale

1. **System Prompt Guardrails:** By setting role boundaries ("EcoStay Connect AI Assistant"), the model maintains focus on green travel even when user inputs are ambiguous.
2. **Markdown Output Structuring:** Explicit instructions to use headers (`###`), lists, and bold text guarantee high readability on frontend UI components.
3. **Structured Preset Prompts:** The application UI includes one-click prompt chips that automatically format user queries into high-performing prompts (Variation 3).
4. **Resilience & Fallbacks:** In case of API rate limits or network issues, the backend seamlessly matches keywords to pre-curated green itineraries, ensuring zero user downtime.
