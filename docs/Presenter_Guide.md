# Presenter guide

## Before the meeting

Serve the app locally using the command in the README. Run one sample AI scan before presenting so the model can download and cache. Keep the PowerPoint available if the network or device cannot run inference. The hosted demo is owner-private; use the local app when the audience has no site access.

Plan about 6 to 8 minutes for the deck, followed by a short demo and discussion. The slides include editable text and tables, product screenshots, and speaker notes.

## Opening pitch

Thali is an AI-assisted food diary for everyday Indian eating. It brings home cooking, restaurant orders and snacks into one daily view. Photos help start a log, but the user confirms dishes and portions. We want to test whether this reduces the effort of keeping a useful diary and whether it could complement Eternal's existing nutrition discovery.

## Two-minute demo

1. Open My day and show the example breakfast, order and snack in one daily view.
2. Choose Snap your meal, load the sample photo and run AI suggestions. Select Idli, add Sambar manually, and enter 100 g and 150 g respectively. Show the approximate range and confirmation step. A correct match may not rank first.
3. Show a sample Zomato order or label scan. Explain that no account is connected and all orders are fictional.
4. Open Community, view a recipe, then save or log it. Explain that the feed is local in this prototype.

## Slide talking points

### 1. Thali

SUGGESTED SCRIPT

Hello, I’m presenting Thali, an AI-assisted food diary for everyday Indian eating. The idea starts with a simple situation: someone cooks breakfast at home, orders lunch and has a packaged snack later. Those meals belong to the same day, but recording them requires different information. Thali brings them into one diary and uses photos to help start a log. The user still confirms the food and the portion. We have built a working browser prototype to demonstrate that experience. Today, I’ll show the problem, what works, where it could fit in Eternal, and the pilot we would like to run.

TRANSITION
Let me start with the logging problem behind the idea.

PRESENTER CUE
Pause on the title before moving to the everyday example.

REFERENCE AND ACCURACY NOTES
Open with one everyday situation: breakfast at home, lunch ordered, then a packaged snack. Thali proposes keeping all three in one diary. This is a student prototype for discussion, not an official Eternal product. Photo: Sutapa Pal, Idli Sambar-Noida-UP-SP004.jpg, Wikimedia Commons, CC BY-SA 4.0. Source: https://commons.wikimedia.org/wiki/File:Idli_Sambar-Noida-UP-SP004.jpg Licence: https://creativecommons.org/licenses/by-sa/4.0/

### 2. Nutrition logging spans

SUGGESTED SCRIPT

Imagine someone trying to record a complete day of eating. For a homemade meal, they need ingredients, oil and a portion estimate. For an order, they need any available restaurant nutrition and the amount actually eaten. For a snack, they need to read the label and convert it to grams consumed. Even the same homemade dish can differ between households. Our hypothesis is that switching between these steps and repeating the entry makes a complete diary harder to maintain. We have not measured that behaviour yet. This is the problem we want to validate through interviews and a small pilot.

TRANSITION
Thali gives those different sources a shared place to go.

PRESENTER CUE
Use breakfast, lunch and an evening snack as the example. Do not describe this as a completed user study.

REFERENCE AND ACCURACY NOTES
This is our problem hypothesis, not a measured finding. Each source needs a different input method. Household recipes vary, and an order is not the same as the portion actually eaten. Interviews and pilot usage should establish how much this friction matters.

### 3. A shared diary for the whole day

SUGGESTED SCRIPT

Here is the main diary. A user can add a homemade recipe, confirm an order entry, scan a packaged-food label, or start with a meal photo. Each route ends with a review of the food and the portion before it contributes to the daily totals. The value we want to test is whether one view makes consistent logging easier. The screenshot shows example goals and sample entries, including a fictional restaurant order. The working prototype saves entries in the same browser and supports export. It does not connect to a live Zomato account or sync between devices.

TRANSITION
The meal photo flow is one way to reduce the effort of starting an entry.

PRESENTER CUE
Point to the four entry routes, then the calorie and macro summary. Keep the sample-data distinction clear.

REFERENCE AND ACCURACY NOTES
Demonstrate how the same diary accepts four kinds of food entry. The screenshot is from the working prototype. Zomato entries are fictional samples. Goals are editable example preferences, not prescribed targets. Local source: dist/app.js and the supplied prototype screenshot.

### 4. A photo starts the log

SUGGESTED SCRIPT

The user takes or chooses a meal photo, and the model suggests likely dishes. In this prototype, it ranks twenty supported dish types. These are alternative matches for the image, so the user chooses the correct food, adds any sides, and enters the cooked portion weight. That review is important because a correct match may not rank first. The model does not measure grams or reveal hidden ingredients. Recognition runs on-device and requires an initial model download. Once the dishes and portions are reviewed, the calculator can produce an approximate nutrient range and save it with the meal.

TRANSITION
That brings us to how we communicate uncertainty.

PRESENTER CUE
Point to the sample photo and alternative matches. Warm the model cache before any live demonstration.

REFERENCE AND ACCURACY NOTES
Real CLIP inference runs on the device in a Web Worker. It ranks descriptions of supported dishes. It does not segment a mixed plate or measure grams. A correct dish can appear below an incorrect match, so the user explicitly selects foods. Model weights are about 155 MB plus the runtime on first use. Sources: https://huggingface.co/Xenova/clip-vit-base-patch32 and https://huggingface.co/docs/transformers.js/v3.8.1/en/api/pipelines . Screenshot from the prototype. Meal photo credit: Sutapa Pal, Wikimedia Commons, CC BY-SA 4.0, https://commons.wikimedia.org/wiki/File:Idli_Sambar-Noida-UP-SP004.jpg

### 5. Approximation is part of the product

SUGGESTED SCRIPT

This example uses one hundred grams of idli and one hundred and fifty grams of sambar. The demonstration references produce a central estimate of about two hundred and twenty-nine calories, with a scenario range of one hundred and fifty-five to three hundred and fifteen. The range is deliberately visible because both portion size and recipes can vary. Users can correct the weights and add extra oil when they know more was used. These bounds come from assumptions in the prototype. They are not a validated confidence interval, and the underlying nutrient references are illustrative. Calibration against weighed meals is part of the next stage.

TRANSITION
Reusable recipes offer another way to make later entries easier.

PRESENTER CUE
Say “about 229 calories.” Explain that the range is a demonstration scenario, not a measured accuracy result.

REFERENCE AND ACCURACY NOTES
This numerical example is produced by the demo references for 100 g idli plus 150 g sambar, with no added extra oil. The central estimate is 228.5 kcal, shown as 229. Scenario bounds combine 20 percent portion variation with 15 percent recipe variation. These are assumptions, not measured accuracy or a clinical confidence interval. Source: dist/meal-data.js and tests/meal.test.mjs. Better reference data and calibration are required before production.

### 6. Recipes make future logging easier

SUGGESTED SCRIPT

A useful recipe record includes more than a dish name or a claimed calorie count. It needs ingredient quantities, the cooked batch weight, a portion size and a preparation note. Once that record exists, a person can save it and reuse it for future logs. Other users could eventually adapt the recipe for their own kitchen. The current prototype demonstrates sharing, saving and logging inside a local browser feed. A shared production library would require recipe versions, moderation and suitable nutrition references. Popularity alone would not verify a recipe. The opportunity is a more reusable record of everyday Indian dishes.

TRANSITION
That recipe and diary context is also where the Eternal connection becomes relevant.

PRESENTER CUE
Point to the recipe entries and their save or log actions. Describe shared accounts and moderation as future work.

REFERENCE AND ACCURACY NOTES
The longer-term database grows through recipes with quantities and portions, not macro claims alone. In the prototype, publishing and saving happen only in the browser. Shared accounts, versioning, moderation and review are future work. Popularity does not verify nutrition. Screenshot captured from the current local prototype on 18 November 2026.

### 7. Where Thali could fit in Eternal

SUGGESTED SCRIPT

Eternal is a relevant setting because Zomato and Blinkit touch different parts of how people eat. Zomato already describes dish nutrition and goal-based discovery through Healthy Mode. Thali proposes adding the context of home cooking and snacks to a wider daily diary. With approved access, that context could help test more relevant meal discovery. Saved recipes could also lead to optional Blinkit ingredient baskets. Those are product opportunities to evaluate, rather than integrations we have built. We would want explicit user choices and a permitted data pathway before connecting any real account or order information.

TRANSITION
For the MVP, we kept the implementation small enough to demonstrate the workflow.

PRESENTER CUE
Distinguish the existing Healthy Mode feature from Thali’s proposed extension. No commercial lift has been measured.

REFERENCE AND ACCURACY NOTES
Do not pitch Thali as if Zomato lacks nutrition features. The proposed extension is the context of the rest of the day. Commercial effects are hypotheses, not measured results. Eternal identifies Zomato and Blinkit among its businesses. Sources: https://www.eternal.com/ and https://www.zomato.com/blog/zomato-healthy-mode-explained-scores-nutrition-info-smart-filters/ . No API access or partnership is currently claimed.

### 8. Implementation and current boundaries

SUGGESTED SCRIPT

The interface is built with HTML, CSS and JavaScript. Background workers handle meal-image matching and label OCR, while deterministic calculations scale ingredients and portions. Records stay in browser storage. That makes the prototype easy to run without a server or an API key, and photos remain on-device. It also creates clear limits. The first AI use needs a substantial download, device support can vary, and there is no account system or shared database. Production work would include cross-device sync, reviewed nutrition references, recipe moderation and broader evaluation on Indian meals. We would add those around an experience that users first find useful.

TRANSITION
The current evidence shows what the prototype can do and what we still need to establish.

PRESENTER CUE
Use the table to separate implemented components from production work. Mention the first-use model download if asked about performance.

REFERENCE AND ACCURACY NOTES
The application has no server or runtime API key. AI ranking and OCR run locally. Approximately 155 MB of model weights plus the runtime download on the first AI scan, subject to browser cache and device support. The prepared-food and ingredient values are illustrative. This architecture proves a workflow, not validated nutritional accuracy. Source: project README and dist/meal-worker.js.

### 9. Prototype evidence and open questions

SUGGESTED SCRIPT

We currently have twelve automated tests passing. They cover portion scaling, recipe yield, per-serving versus per-hundred-gram labels, missing values, scenario ranges and diary aggregation. Browser checks also showed that the core image, review, logging and export flows work. These checks support the software calculations. They do not establish nutritional accuracy or prove that users will keep returning. The main open questions are dish recognition across different Indian meals, nutrient error against weighed references, and repeated use over time. We want to be precise about that distinction so the next evaluation answers the questions that matter.

TRANSITION
Our next step would be a small, measurable pilot.

PRESENTER CUE
Emphasize that twelve is the software-test count, not a participant count or an AI accuracy percentage.

REFERENCE AND ACCURACY NOTES
The 12 passing tests were rerun on 18 November 2026. They verify deterministic calculations and input handling, not clinical validity or model accuracy. Browser checks established that real image inference, explicit selection, logging, storage and export worked in the prototype. We have not run a user pilot or quantified business impact. Source: tests/core.test.mjs and tests/meal.test.mjs.

### 10. A proposed pilot before integration

SUGGESTED SCRIPT

We propose starting with twenty participants over seven days, ideally people who eat across more than one food source. First, we would compare the effort of logging a saved meal with manual entry. A proposed target is a median of thirty seconds or less for that saved-meal task. We would also compare OCR fields and photo-based estimates with reviewed references and weighed portions. Usage measures would include repeat logging, the mix of meal sources and recipe reuse. These are proposed criteria, not achieved results. The pilot would help us decide what to improve and whether approved ecosystem integrations are worth exploring.

TRANSITION
We would like your feedback on how to make that first pilot useful.

PRESENTER CUE
Keep “saved meal” in the timing claim. The first model download is a separate setup step.

REFERENCE AND ACCURACY NOTES
Start with people who eat across at least two sources, such as home cooking and ordering. Compare a repeated logging task with manual entry and interview participants. The detailed proposal also suggests a 90 percent numeric-field OCR target on 30 clear English labels and weighed-meal evaluation for photo estimates. Do not interpret these as results. Only test conversion or order integration after approval and data access.

### 11. Feedback and a scoped pilot

SUGGESTED SCRIPT

Thali is a working prototype of a shared food diary, with AI-assisted meal entry, label reading and reusable recipes. The next question is whether that experience is useful enough for people to return to. We are looking for product feedback and guidance on a scoped pilot: which users should we test with, and what data could we use with permission? The public GitHub repository contains the source, setup instructions and presentation materials. We can demonstrate the app locally if the hosted private demo is inaccessible. Thank you. I’d be happy to discuss the user experience, nutrition assumptions or implementation.

TRANSITION
Pause and invite questions.

PRESENTER CUE
Keep the public GitHub link available. Offer the short local demo and avoid implying that a partnership or integration has been agreed.

REFERENCE AND ACCURACY NOTES
Close by asking for product feedback and guidance on a small evaluation, not a claim of a production-ready integration. Show the local demo if the hosted private site is inaccessible to the audience. The public GitHub repository contains setup instructions, source, screenshots and presentation materials. The presenter should warm the AI model cache before the meeting and use the sample flow if connectivity is weak.

