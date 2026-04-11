# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

COVID-19 en México is an interactive dashboard and map for monitoring the daily evolution of COVID-19 in Mexico. The interface allows filtering information by state, positive cases, deaths, and viewing historical data through a timeline. This is a fully static Progressive Web App (PWA) that requires no backend.

Website: https://covid19mexico.net

## Technology Stack

- **Framework**: Vue.js 2.x with Vue CLI 5.x
- **Data Visualization**: amCharts 4 (@amcharts/amcharts4)
- **UI Framework**: Bootstrap 5
- **PWA**: Configured with workbox for offline functionality
- **Router**: Vue Router (history mode)
- **Data Source**: External CSV from carranco-sga/Mexico-COVID-19_2022 repository

## Development Commands

### Standard Development
```bash
# Install dependencies
npm install

# Run dev server with hot-reload (port 8080 by default)
npm run serve

# Build for production (outputs to dist/)
npm run build

# Lint code
npm run lint
```

### Data Management
```bash
# Fetch latest COVID-19 data from external source and regenerate JSON files
npm run refresh-source
```

This script (`refresh-data.js`) downloads the CSV from GitHub, processes it, and generates two files:
- `public/data/mx_timeline.json` - Timeline data per state
- `public/data/mx_total_timeline.json` - National totals timeline

## Architecture

### Application Structure
The app follows a standard Vue CLI structure with three main views:
- **Home** (`/`): Interactive map of Mexico showing COVID-19 data by state, with a sidebar list
- **Statistics** (`/statistics`): Detailed charts and statistics
- **About** (`/about`): Information about the project

### Key Components

**Chart Components** (`src/components/charts/`):
- `MexicoMap.vue`: Main interactive map using amCharts MapChart with mexicoLow geodata. Handles data fetching, date slider, and state-level visualization
- `ColumnChart.vue`: Bar/column chart visualizations
- `StatesChart.vue`: State comparison charts

**UI Components** (`src/components/`):
- `Navbar.vue`: Main navigation bar
- `StatesList.vue`: Sidebar list showing state-by-state data with sorting/filtering

### Data Flow
1. On mount, `MexicoMap.vue` fetches JSON data files from `/data/` directory
2. Data is loaded into component state and emitted via `$root.$emit('sendSourceData', data)`
3. Other components listen for this data and update their visualizations
4. Timeline slider updates all visualizations reactively as user changes dates

### amCharts Integration
The project uses amCharts 4 (not 5) with:
- Spanish language (`am4lang_es_ES`)
- Animated theme (`am4themes_animated`)
- `mexicoLow` geodata for map rendering
- Custom color schemes based on COVID-19 metrics (confirmed cases, deaths, recovered)

### PWA Configuration
Configured in `vue.config.js`:
- App name: "COVID-19 MX"
- Workbox plugin in GenerateSW mode
- `skipWaiting: true` for immediate service worker activation
- Custom icon paths for various platforms
- No source maps in production (`productionSourceMap: false`)

### Data Format
The external CSV is processed into two JSON structures:
- **mx_timeline**: Array of date objects, each containing a `list` of all 32 Mexican states with metrics (confirmed, deaths, recovered, suspect)
- **mx_total_timeline**: Array of date objects with national-level aggregated metrics

State IDs use ISO 3166-2:MX format (e.g., "MX-AGU", "MX-CMX", "MX-JAL").

## Important Considerations

### When Modifying Charts
- amCharts 4 instances must be properly disposed in `beforeDestroy()` lifecycle hook to prevent memory leaks
- Chart colors are based on data values using heat map gradients
- Mobile responsiveness is handled via media queries and `isMobile` detection

### When Updating Data
- Date range is currently hardcoded in `refresh-data.js` (minStartDate: "2020-02-28", EndDate: "2022-08-17")
- The data source URL points to the 2022 archive: `carranco-sga/Mexico-COVID-19_2022`
- State key mappings must match the CSV column naming convention

### When Modifying Dependencies
- This project uses Vue 2.x, not Vue 3 (note: `vue-template-compiler` version must match `vue` version)
- amCharts 4 is a commercial library (free with branding) - not to be confused with amCharts 5
- Bootstrap 5 is imported globally in `main.js`
