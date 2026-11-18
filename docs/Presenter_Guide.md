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

Open with one everyday situation: breakfast at home, lunch ordered, then a packaged snack. Thali proposes keeping all three in one diary. This is a student prototype for discussion, not an official Eternal product. Photo: Sutapa Pal, Idli Sambar-Noida-UP-SP004.jpg, Wikimedia Commons, CC BY-SA 4.0. Source: https://commons.wikimedia.org/wiki/File:Idli_Sambar-Noida-UP-SP004.jpg Licence: https://creativecommons.org/licenses/by-sa/4.0/

### 2. Nutrition logging spans

This is our problem hypothesis, not a measured finding. Each source needs a different input method. Household recipes vary, and an order is not the same as the portion actually eaten. Interviews and pilot usage should establish how much this friction matters.

### 3. A shared diary for the whole day

Demonstrate how the same diary accepts four kinds of food entry. The screenshot is from the working prototype. Zomato entries are fictional samples. Goals are editable example preferences, not prescribed targets. Local source: dist/app.js and the supplied prototype screenshot.

### 4. A photo starts the log

Real CLIP inference runs on the device in a Web Worker. It ranks descriptions of supported dishes. It does not segment a mixed plate or measure grams. A correct dish can appear below an incorrect match, so the user explicitly selects foods. Model weights are about 155 MB plus the runtime on first use. Sources: https://huggingface.co/Xenova/clip-vit-base-patch32 and https://huggingface.co/docs/transformers.js/v3.8.1/en/api/pipelines . Screenshot from the prototype. Meal photo credit: Sutapa Pal, Wikimedia Commons, CC BY-SA 4.0, https://commons.wikimedia.org/wiki/File:Idli_Sambar-Noida-UP-SP004.jpg

### 5. Approximation is part of the product

This numerical example is produced by the demo references for 100 g idli plus 150 g sambar, with no added extra oil. The central estimate is 228.5 kcal, shown as 229. Scenario bounds combine 20 percent portion variation with 15 percent recipe variation. These are assumptions, not measured accuracy or a clinical confidence interval. Source: dist/meal-data.js and tests/meal.test.mjs. Better reference data and calibration are required before production.

### 6. Recipes make future logging easier

The longer-term database grows through recipes with quantities and portions, not macro claims alone. In the prototype, publishing and saving happen only in the browser. Shared accounts, versioning, moderation and review are future work. Popularity does not verify nutrition. Screenshot captured from the current local prototype on 18 November 2026.

### 7. Where Thali could fit in Eternal

Do not pitch Thali as if Zomato lacks nutrition features. The proposed extension is the context of the rest of the day. Commercial effects are hypotheses, not measured results. Eternal identifies Zomato and Blinkit among its businesses. Sources: https://www.eternal.com/ and https://www.zomato.com/blog/zomato-healthy-mode-explained-scores-nutrition-info-smart-filters/ . No API access or partnership is currently claimed.

### 8. Implementation and current boundaries

The application has no server or runtime API key. AI ranking and OCR run locally. Approximately 155 MB of model weights plus the runtime download on the first AI scan, subject to browser cache and device support. The prepared-food and ingredient values are illustrative. This architecture proves a workflow, not validated nutritional accuracy. Source: project README and dist/meal-worker.js.

### 9. Prototype evidence and open questions

The 12 passing tests were rerun on 18 November 2026. They verify deterministic calculations and input handling, not clinical validity or model accuracy. Browser checks established that real image inference, explicit selection, logging, storage and export worked in the prototype. We have not run a user pilot or quantified business impact. Source: tests/core.test.mjs and tests/meal.test.mjs.

### 10. A proposed pilot before integration

Start with people who eat across at least two sources, such as home cooking and ordering. Compare a repeated logging task with manual entry and interview participants. The detailed proposal also suggests a 90 percent numeric-field OCR target on 30 clear English labels and weighed-meal evaluation for photo estimates. Do not interpret these as results. Only test conversion or order integration after approval and data access.

### 11. Feedback and a scoped pilot

Close by asking for product feedback and guidance on a small evaluation, not a claim of a production-ready integration. Show the local demo if the hosted private site is inaccessible to the audience. The public GitHub repository contains setup instructions, source, screenshots and presentation materials. The presenter should warm the AI model cache before the meeting and use the sample flow if connectivity is weak.

