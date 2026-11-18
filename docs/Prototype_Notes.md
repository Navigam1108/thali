# Thali

A focused Eternal Hackathon Showcase 2026 prototype for a shared nutrition diary spanning AI meal photo estimates, home cooking, sample Zomato orders, packaged snacks and community recipes.

## Run locally

Serve the `dist` folder with any static HTTP server. With Python available:

```powershell
python -m http.server 4173 --directory dist --bind 127.0.0.1
```

Open http://127.0.0.1:4173. This uses JavaScript modules, so use HTTP rather than opening the HTML directly. The application has no build step and no runtime API key.

## A two minute demo

1. Open My day. Explain that breakfast, an order and a snack contribute to one daily view. Entries are clearly labelled examples.
2. Snap your meal → Try a sample photo → Suggest dishes with AI. The first scan downloads about 155 MB of model weights plus the runtime. Pick the correct dish from the visual alternatives, add any sides, and edit cooked weights. Review the approximate calorie and macro ranges, confirm, then log. The correct match may not rank first; no dish is automatically accepted.
3. Add food → Home cooked. Change oil or portion weight and watch the calculation update. Log a portion.
4. Add a half portion of a fictional Zomato order.
5. Scan a label → Try a sample label. Change the amount eaten, review the basis, tick confirmation and log it. For real OCR, choose a clear English JPG/PNG/WebP, then Read photo. The sample label also works with Read photo.
6. Community → View recipe → Log. Save a recipe. Share a new recipe from Home cooked; the post appears in the local feed.
7. About the demo → Export diary. Data persists across reloads in this browser. Restore samples between presentations if needed.

## Boundaries

- No live Zomato, Blinkit or restaurant integrations. Names and values in sample orders are fictional.
- Meal photo AI runs real CLIP inference in a Web Worker using Transformers.js 3.8.1 and the quantized Xenova/clip-vit-base-patch32 model pinned to revision d15189d7028b43f1d3e65039190477f6af591c2a. It ranks 20 supported dish descriptions plus several unsupported-image alternatives. This is whole-image matching, not segmentation, portion measurement, or direct nutrient measurement. Top matches can be wrong; users explicitly choose dishes and portions. It does not claim a calibrated recognition confidence or complete non-food detection.
- Photos stay on-device. Model and runtime files download from Hugging Face and jsDelivr; weights are cached by the browser. Download, memory or device failures show an honest manual-selection fallback, not fabricated AI output. The AI scan can be stopped. No API key or server is needed.
- Photo macros come from illustrative per-100-g prepared-food references, scaled by user-reviewed cooked portions. Scenario bounds combine 20% portion and 15% recipe variation, with optional known extra oil. These are demonstration assumptions, not validated statistical confidence intervals. The diary retains the bounds and marks affected daily totals approximate.
- Ingredient references are illustrative, not a validated nutrition database. Recipe calculations scale raw ingredient estimates by cooked yield and portion; cooking retention is not modelled.
- Nutrition-label OCR uses Tesseract.js 5.1.1 in the browser. The reader, WebAssembly and English model download from CDNs on first use. Images remain in the browser; photos are not saved. A network connection is needed for first-use OCR. Text entry works as a fallback.
- The conservative label parser targets clear English single-column panels. Review all fields, units and the per-100-g/per-serving basis. Blank values never silently become zero.
- The feed, recipe saves, diary and preferences use localStorage, with no shared backend or account system. Likes, laboratory verification and medical advice are not implemented.
- Example daily goals are editable preferences, not prescribed targets.

## Checks

`node --test tests/*.test.mjs` covers recipe and label portions, invalid inputs, missing fields, conservative parsing, meal scenario ranges, oil adjustments, unsupported matches and diary aggregation. `node --check dist/app.js` checks JavaScript syntax. Browser verification includes real image inference, explicit dish review and the end-to-end demo flows.

## Production path

Validate logging effort with interviews and a 7-day pilot. Obtain permission to use suitable composition datasets and partner data. Add authentication, private diaries, recipe versioning and moderation before shared publishing. Request approved order integrations; do not scrape accounts or assume access to private APIs.

## Reference

- https://www.zomato.com/blog/zomato-healthy-mode-explained-scores-nutrition-info-smart-filters/
- https://www.eternal.com/
- https://nin.res.in/ebooks/IFCT2017_16122024.pdf
- https://github.com/naptha/tesseract.js/tree/v5.1.1
- https://huggingface.co/Xenova/clip-vit-base-patch32
- https://huggingface.co/docs/transformers.js/v3.8.1/en/api/pipelines

## Sample photo attribution

`dist/sample-meal.jpg`: Idli Sambar-Noida-UP-SP004.jpg by Sutapa Pal, via Wikimedia Commons, CC BY-SA 4.0. A 960-pixel resized preview is included; the photo remains under its original licence. Credit and licence are also shown beside the sample in the app.

Source: https://commons.wikimedia.org/wiki/File:Idli_Sambar-Noida-UP-SP004.jpg

Licence: https://creativecommons.org/licenses/by-sa/4.0/
