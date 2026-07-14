# 🌤️ Pokémon Weather App — Design Specification

> Version: 2.0
>
> Status: Design Locked
>
> Framework: Vanilla HTML • CSS • JavaScript
>
> Goal: Transform the existing Pokémon Weather App into a premium dashboard experience while preserving its original concept.

---

# Vision

The current application is a simple weather app that displays a Pokémon based on the weather.

Version 2 should feel like a polished product instead of a beginner project.

The experience should communicate:

> "This is a modern weather dashboard with a Pokémon companion."

The Pokémon should no longer feel like a decorative image.

It should become the centerpiece of the application.

---

# Core Principles

- Keep the project Vanilla HTML/CSS/JavaScript.
- Keep the application as a single page.
- Do not introduce React, Vue, Angular or any framework.
- Preserve the Pokémon concept.
- Preserve the weather → Pokémon mapping.
- Preserve WeatherAPI integration.
- Focus heavily on UI/UX quality.
- Every component should feel intentional.

---

# Design References

The primary design inspiration comes from premium weather and dashboard references.

Primary inspirations:

- Modern dashboard layouts
- Large rounded cards
- Soft pastel color palette
- Generous spacing
- Layered information hierarchy
- Minimal shadows
- Premium typography
- Soft gradients
- Clean iconography

Do NOT copy the references.

Use them only as inspiration.

---

# Color Palette

## Base Background

```css
#F7F3EC
```

---

## Primary Text

```css
#111111
```

---

## Secondary Text

```css
#666666
```

---

## Borders

```css
#E8DED3
```

---

## Cards

```css
#FFF9F2
```

---

## Accent Colors

Sunny

```css
#F4D35E
```

Rain

```css
#BFDDF5
```

Cloudy

```css
#D7D7D7
```

Thunder

```css
#FFD56A
```

Snow

```css
#EEF5FF
```

Mist

```css
#DCCFF5
```

Grass

```css
#CFE8C6
```

Soft Pink

```css
#F4D9E5
```

---

# Typography

## Headings

Sora

Fallback

sans-serif

---

## Body

Inter

Fallback

sans-serif

---

## Temperature

Space Grotesk

Extra Bold

---

# Border Radius

Cards

32px

Buttons

18px

Inputs

20px

Small Tags

999px

---

# Shadows

Very soft.

Avoid heavy neumorphism.

Example:

```
0 12px 40px rgba(0,0,0,.06)
```

---

# Application Layout

Desktop layout

```
-----------------------------------------------------

Logo

Search Bar

Action Icons

-----------------------------------------------------

Weather Card

Pokemon Card

Side Widgets

-----------------------------------------------------

Forecast

Weather Details

-----------------------------------------------------

Pokemon Encyclopedia

-----------------------------------------------------

Footer

-----------------------------------------------------
```

Everything should exist on one page.

No scrolling between different views.

---

# Navbar

Contains

- Pokémon Weather logo
- Search bar
- Search button
- Settings icon
- Favorites icon

Minimal.

Clean.

---

# Hero Section

This section is split into two major cards.

## Left Card

Weather Overview

Contains

- City
- Region
- Local Time
- Current Temperature
- Weather Condition
- Animated Weather Illustration
- Feels Like

Bottom Row

Small metric cards

- Wind
- Humidity
- Visibility
- UV Index

---

## Right Card

Today's Weather Partner

This is the most important section.

Contains

- Large Pokémon artwork
- Pokémon Name
- Pokémon Type badges
- Small description
- Pokémon stats
- Ability
- Height
- Weight

The Pokémon should visually dominate this card.

---

# Side Widgets

Small floating cards.

Examples

Trainer Tip

Air Quality

Sunrise / Sunset

Weather Alerts

These should feel like dashboard widgets.

---

# Forecast

Replace the fake forecast completely.

Use WeatherAPI Forecast endpoint.

Display

5 Days

Each card contains

- Day
- Weather Icon
- Temperature
- Matching Pokémon

Hover animation.

---

# Weather Details

Dedicated card.

Contains

- Pressure
- Dew Point
- UV Index
- Cloud Cover
- Wind
- Sunrise
- Sunset

---

# Pokémon Weather Guide

This section remains.

However redesign it.

Instead of simple images,

every Pokémon becomes a card.

Card contains

- Sprite
- Name
- Weather Type

Hover

- Lift animation
- Glow
- Border highlight

---

# Footer

Simple.

Contains

Built with ❤️ by Aman Kumar

Powered by WeatherAPI

Pokémon belongs to Nintendo/Game Freak

Social Icons

- GitHub
- LinkedIn
- Portfolio

---

# Dynamic Weather Themes

Entire application changes slightly depending on weather.

Sunny

Warm yellow highlights

Rain

Soft blue accents

Snow

Cool white palette

Cloudy

Neutral gray

Mist

Lavender

Thunderstorm

Golden accents

Transitions should be animated.

---

# Motion Design

Every interaction should feel alive.

Search

↓

Loading animation

↓

Cards fade

↓

Temperature counts upward

↓

Weather illustration animates

↓

Pokémon fades and scales

↓

Forecast slides upward

Avoid excessive animations.

Everything should feel smooth.

---

# UI Components

Required

- Rounded Cards
- Pill Buttons
- Soft Badges
- Dashboard Widgets
- Search Input
- Forecast Cards
- Pokémon Cards
- Weather Detail List
- Footer

---

# Icons

Use Lucide Icons.

Avoid emoji inside the UI.

Only Pokémon artwork should provide personality.

---

# Responsiveness

Desktop First.

Then tablet.

Then mobile.

No horizontal scrolling.

Cards should stack naturally.

Forecast should become horizontally scrollable on phones.

---

# Accessibility

- Proper form labels
- Keyboard navigation
- Visible focus states
- Semantic HTML
- aria-live for weather updates

---

# Technical Rules

- No CSS framework.
- No Bootstrap.
- No Tailwind CSS.
- No UI libraries.
- No jQuery.
- Vanilla JavaScript only.

---

# Assets

Use the existing Pokémon sprites from the current project.

Replace them with higher-quality artwork only if licensing and consistency allow.

External dashboard references are inspiration only.

Never replicate them.

---

# Success Criteria

The redesign should make someone think:

> "This looks like a polished product."

instead of

> "This looks like a college HTML project."

The application should still immediately communicate that it is a **Pokémon Weather Dashboard**, while feeling modern, premium, playful, and memorable.
