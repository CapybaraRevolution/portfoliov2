# GA4 Analytics Setup Guide

Configuration steps for the GA4 dashboard to unlock the insights from the custom events now firing on your portfolio.

---

## 1. Mark Key Events as Conversions

In **GA4 > Admin > Events**, mark these events as key events (conversions):

| Event Name              | Why It Matters                                       |
|-------------------------|------------------------------------------------------|
| `contact_form_submit`   | Primary portfolio conversion -- someone wants to hire |
| `resume_download`       | High-intent action                                   |
| `case_study_entry`      | Visitor engaged with your work                       |
| `highlights_expanded`   | Visitor used the highlights feature                  |

---

## 2. Register Custom Dimensions

In **GA4 > Admin > Custom Definitions > Custom Dimensions**, create:

| Dimension Name     | Scope | Event Parameter   | Description                              |
|--------------------|-------|-------------------|------------------------------------------|
| Case Study         | Event | `case_study`      | Which case study the event relates to    |
| Entry Source       | Event | `entry_source`    | How the user arrived (homepage, LinkedIn, etc.) |
| Event Category     | Event | `event_category`  | Engagement category grouping             |
| Journey Step       | Event | `step`            | Funnel step name                         |
| Scroll Depth       | Event | `depth_percent`   | How far down the user scrolled           |

Without registering these, GA4 ignores custom parameters after 14 days.

---

## 3. Create a "Highlights Impact" Exploration

This is the key analysis for measuring the "In a rush? Get the highlights" feature.

**GA4 > Explore > Free Form**

**Segments to create:**
- **Highlights Users**: Sessions where `highlights_expanded` event fired
- **Non-Highlights Users**: Sessions where `case_study_entry` fired but `highlights_expanded` did NOT

**Metrics to compare across segments:**
- `time_on_page` (average `duration_seconds` from `time_on_page` events)
- `scroll_depth` (max `depth_percent` from `scroll_depth` events)
- `contact_form_submit` conversion rate
- `case_study_entry` count per session (do highlights users view MORE case studies?)

**What to look for:**
- If highlights users have HIGHER time on page and deeper scroll, the feature acts as a hook
- If highlights users have LOWER time on page but SIMILAR contact rates, the feature efficiently delivers value
- If highlights users have LOWER everything, the feature might be "satisfying curiosity" too early

---

## 4. Set Up a Case Study Funnel

**GA4 > Explore > Funnel Exploration**

Steps (in order):
1. `journey_step` where `step` = `homepage_visit`
2. `journey_step` where `step` = `work_overview_visit`
3. `journey_step` where `step` = `case_study_opened`
4. `scroll_depth` where `depth_percent` >= 50
5. `scroll_depth` where `depth_percent` >= 75
6. `contact_opened` (any)

**Breakdown dimension:** `entry_source` to see which traffic sources produce the deepest engagement.

---

## 5. Create Audiences

**GA4 > Admin > Audiences**

| Audience Name           | Condition                                                        | Use Case                        |
|-------------------------|------------------------------------------------------------------|---------------------------------|
| Deep Readers            | `scroll_depth` with `depth_percent` >= 75 on any case study     | Retarget with contact CTA       |
| Highlights Users        | `highlights_expanded` fired in session                           | A/B comparison cohort           |
| Multi-Case-Study Viewers| 2+ `case_study_entry` events in same session                    | Highly engaged prospects        |
| Contact Form Starters   | `contact_form_started` fired but NOT `contact_form_submit`      | Follow up on drop-offs          |

---

## 6. Hotjar Companion Setup

In the **Hotjar dashboard**:

1. Go to **Recordings > Filters > Events**
2. The following custom events are now available to filter by:
   - `highlights_expanded` -- watch how people interact after opening highlights
   - `case_study_deep_read` -- watch sessions where users scrolled 75%+
   - `case_study_entry` -- watch how people navigate case studies
   - `contact_form_started` -- watch form interactions

3. **Recommended saved filters:**
   - "Highlights then bounce" -- sessions with `highlights_expanded` but short duration
   - "Deep readers who contact" -- sessions with `case_study_deep_read` AND pageview on `/contact`

---

## Custom Events Reference

All custom events currently firing:

| Event                     | Location                   | Parameters                                     |
|---------------------------|----------------------------|-------------------------------------------------|
| `highlights_expanded`     | CaseSummaryCard            | `case_study`, `event_category`                  |
| `highlights_collapsed`    | CaseSummaryCard            | `case_study`, `time_expanded_seconds`            |
| `journey_step`            | Homepage, Work Overview, CaseStudyViewer | `step`, `page`                |
| `case_study_entry`        | CaseStudyViewer            | `case_study`, `referrer`, `entry_source`         |
| `case_study_view`         | CaseStudyViewer            | `case_study`                                     |
| `scroll_depth`            | useScrollDepth hook        | `page`, `depth_percent`, `time_to_reach_seconds` |
| `time_on_page`            | useTimeOnPage hook         | `page`, `duration_seconds`                       |
| `section_viewed`          | useSectionVisibility hook  | `section_name`, `page`, `time_visible_seconds`   |
| `nav_click`               | CaseStudyFooterNav, Navigation | `link_name`, `destination`, `source`         |
| `contact_form_submit`     | Contact page               | `engagement_type`, `budget_range`, `timeline`    |
| `contact_form_started`    | Contact page (GA + Hotjar) | (none)                                           |
| `contact_form_abandoned`  | Contact page               | `abandoned_at_step`, `time_spent_seconds`        |
| `contact_step_completed`  | Contact page               | `step_number`, `step_name`, `time_on_step_seconds` |
| `filter_applied`          | PortfolioShell             | `filter_type`, `filter_value`, `results_count`   |
| `portfolio_project_click` | RefactoredProjectCard      | `project_name`                                   |
| `process_drawer_open`     | ProcessFlow + drawers      | `drawer_name`                                    |
| `cta_click`               | TrackedButton              | `cta_name`, `destination`, `location`            |
| `external_link_click`     | Various                    | `url`, `link_text`                               |
| `resume_download`         | Various                    | `source`                                         |
