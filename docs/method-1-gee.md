# ⚙️ **Method 1: Google Earth Engine** 
## 🏆 **(Recommended)**

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 25px; border-radius: 15px; color: white; margin: 20px 0; box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);">
<h2 style="color: white; margin-top: 0;">🛰️ Most Powerful Method</h2>
<p style="font-size: 1.2em; margin-bottom: 0; color: white;">Perfect for processing large areas and combining with other datasets</p>
</div>

![Google Earth Engine](assets/GEE.jpg)

## 🚀 **Prerequisites**

<div style="background: #f8f9ff; border-radius: 12px; padding: 25px; margin: 20px 0; color: #333;">

### ✅ **Step-by-Step Setup**

1. **🔐 Sign up for Google Earth Engine**
   - Visit: [https://earthengine.google.com/signup/](https://earthengine.google.com/signup/)
   - Wait for approval (usually 1-2 days)

2. **💻 Access the Code Editor**
   - Go to: [https://code.earthengine.google.com/](https://code.earthengine.google.com/)

</div>

---

## 🎯 **Step 1: Extract Building Height Raster**

<div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); padding: 3px; border-radius: 12px; margin: 20px 0;">
<div style="background: #f8f9ff; padding: 20px; border-radius: 10px; color: #333;">

[![Open in Google Earth Engine](assets/gee_icon.jpg)](https://code.earthengine.google.com/f90adbd664b59f53dfcaa4530da436c3)

</div>
</div>

### 📝 **Complete Script**

```javascript
// 🎯 Define your area of interest
// Draw a polygon using the drawing tools or use this example
var geometry = ee.Geometry.Rectangle([
  [longitude_min, latitude_min],
  [longitude_max, latitude_max]
]);

// 📡 Load the Open Buildings 2.5D Temporal dataset
var openBuildingsTemporal = ee.ImageCollection(
  'GOOGLE/Research/open-buildings-temporal/v1');

// 📅 Select year of interest
var year = 2023;
var startDate = ee.Date.fromYMD(year, 1, 1);
var endDate = startDate.advance(1, 'year');

// 🔍 Filter collection
var filtered = openBuildingsTemporal
  .filter(ee.Filter.date(startDate, endDate))
  .filter(ee.Filter.bounds(geometry));

// 🗺️ Get projection and create mosaic
var projection = filtered.first().projection();
var buildingsMosaic = filtered.mosaic()
  .setDefaultProjection(projection);

// 🏗️ Select building height band
var buildingHeights = buildingsMosaic
  .select('building_height');

// 🎨 Visualize with beautiful colors
var heightPalette = [
  '1d4877', '1b8a5a', 'fbb021', 'f68838', 'ee3e32'];
var heightVisParams = {min:0, max:50, palette: heightPalette};

Map.centerObject(geometry);
Map.addLayer(buildingHeights.clip(geometry),
  heightVisParams, 'Building Heights');

// 💾 Export as GeoTIFF
Export.image.toDrive({
  image: buildingHeights.clip(geometry),
  description: 'Building_Height_Raster_' + year,
  folder: 'earthengine',
  fileNamePrefix: 'building_height_raster_' + year,
  region: geometry,
  scale: 4  // 4m resolution
});
```

---

## 🗻 **Step 2: Create Digital Surface Model (DSM)**

<div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 3px; border-radius: 12px; margin: 20px 0;">
<div style="background: #f8f9ff; padding: 20px; border-radius: 10px; color: #333;">

[![Open DSM Script](assets/gee_icon.jpg)](https://code.earthengine.google.com/f90adbd664b59f53dfcaa4530da436c3)

</div>
</div>

### 🌳 **Advanced DSM with Trees and Terrain**

```javascript
// 🌲 Add Canopy Height (Meta/WRI 1m resolution)
var canopyHeight = ee.ImageCollection(
  'projects/meta-forest-monitoring-okw37/assets/CanopyHeight')
  .mosaic()
  .rename('canopy_height');

var treeMask = canopyHeight.updateMask(canopyHeight.gte(1));
var treeHeight = treeMask.unmask(0);

// 🏢 Add tree height to building height
var buildingsAndTrees = buildingHeights.add(treeHeight);

// ⛰️ Add Terrain Height (FABDEM 30m)
var fabdem = ee.ImageCollection(
  'projects/sat-io/open-datasets/FABDEM');
var fabdemMosaic = fabdem.mosaic()
  .setDefaultProjection(projection);
var dem = fabdemMosaic.select('b1');

// 🎯 Create complete DSM
var dsm = buildingsAndTrees.add(dem);

// 💾 Export DSM
Export.image.toDrive({
  image: dsm.clip(geometry),
  description: 'DSM_' + year,
  folder: 'earthengine',
  fileNamePrefix: 'dsm_' + year,
  region: geometry,
  scale: 4
});
```

---

## 🏢 **Step 3: Extract Building Footprints with Heights**

<div style="background: linear-gradient(135deg, #ff9a56 0%, #ffad56 100%); padding: 3px; border-radius: 12px; margin: 20px 0;">
<div style="background: #f8f9ff; padding: 20px; border-radius: 10px; color: #333;">

[![Open Footprints Script](assets/gee_icon.jpg)](https://code.earthengine.google.com/f90adbd664b59f53dfcaa4530da436c3)

</div>
</div>

### 📐 **Extract Polygon Data with Height Attributes**

```javascript
// 🏘️ Load Open Buildings V3 Polygons
var openBuildingsPolygons = ee.FeatureCollection(
  'GOOGLE/Research/open-buildings/v3/polygons');

var allBuildings = openBuildingsPolygons
  .filter(ee.Filter.bounds(geometry));

// 📊 Extract temporal data for each building
var temporalBands = buildingsMosaic.select([
  'building_presence', 'building_height']);

// 📈 Zonal statistics to get average height per building
var allBuildingsData = temporalBands.reduceRegions({
  collection: allBuildings,
  reducer: ee.Reducer.mean(),
  scale: 4,
  tileScale: 16,
});

// 🔍 Filter buildings present in selected year
var buildingsFiltered = allBuildingsData
  .filter(ee.Filter.gt('building_presence', 0.5));

// 🗺️ Reproject to UTM for accuracy
var buildingsReprojected = buildingsFiltered
  .map(function(f) {
    return f.transform({
      proj: projection,
      maxError: 0.1});
  });

// 📋 Select properties for export
var selectedProperties = ['area_in_meters', 'building_height'];
var renamedProperties = ['area', 'height'];

var buildingsExport = buildingsReprojected.select(
  selectedProperties, renamedProperties);

// 💾 Export as shapefile
Export.table.toDrive({
  collection: buildingsExport,
  description: 'Building_Polygons_with_Height_' + year,
  folder: 'earthengine',
  fileNamePrefix: 'building_polygons_with_height_' + year,
  fileFormat: 'SHP',
  selectors: renamedProperties
});
```

## 🎨 **Visualization Tips**

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin: 30px 0;">

<div style="background: #e3f2fd; border-left: 4px solid #2196f3; padding: 20px; border-radius: 8px; color: #333;">
<h3 style="color: #1976d2; margin-top: 0;">🎨 Color Palettes</h3>
<p style="color: #333;"><strong>Height Visualization:</strong></p>
<code style="background: #f5f5f5; padding: 2px 6px; border-radius: 3px; color: #333;">['1d4877', '1b8a5a', 'fbb021', 'f68838', 'ee3e32']</code>
</div>

<div style="background: #f3e5f5; border-left: 4px solid #9c27b0; padding: 20px; border-radius: 8px; color: #333;">
<h3 style="color: #7b1fa2; margin-top: 0;">📏 Scale Settings</h3>
<ul style="color: #333;">
<li><strong>Testing:</strong> scale: 16</li>
<li><strong>Production:</strong> scale: 4</li>
<li><strong>High Detail:</strong> scale: 2</li>
</ul>
</div>

</div>

## ⚡ **Performance Optimization**

| Setting | Value | Purpose |
|---------|-------|---------|
| **tileScale** | 16 | Reduces memory usage |
| **maxPixels** | 1e9 | Prevents timeout errors |
| **pyramidingPolicy** | 'mean' | Smooth visualization |

---

<div style="background: linear-gradient(45deg, #667eea, #764ba2); padding: 3px; border-radius: 12px; margin: 30px 0;">
<div style="background: #f8f9ff; padding: 25px; border-radius: 10px; text-align: center; color: #333;">
<h3 style="margin: 0; color: #333;">🎉 Congratulations!</h3>
<p style="margin: 10px 0 0 0; color: #666;">You've mastered the most powerful method for extracting building heights!</p>
</div>
</div>
