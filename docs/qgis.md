# 🗺️ **Working with Data in QGIS**

<div style="background: linear-gradient(135deg, #2e8b57 0%, #3cb371 100%); padding: 25px; border-radius: 15px; color: white; margin: 20px 0; box-shadow: 0 8px 32px rgba(46, 139, 87, 0.3);">
<h2 style="color: white; margin-top: 0;">🎯 Transform Your Building Height Data</h2>
<p style="font-size: 1.2em; margin-bottom: 0; color: white;">Create stunning 2.5D and 3D visualizations with professional GIS capabilities</p>
</div>

## 📋 **Prerequisites**

<div style="background: #f8f9ff; border-radius: 12px; padding: 25px; margin: 20px 0; color: #333;">

### 💻 **Software Requirements**

<div style="background: #f0f8ff; padding: 15px; border-radius: 8px; border-left: 4px solid #2e8b57; margin: 10px 0; color: #333;">
<h4 style="color: #2e8b57; margin-top: 0;">🔧 QGIS Installation</h4>
<p style="color: #333;"><strong>Recommended Version:</strong> QGIS 3.16 or later</p>
<p style="color: #333;"><strong>Download:</strong> <a href="https://qgis.org/en/site/forusers/download.html">https://qgis.org/en/site/forusers/download.html</a></p>
</div>

### 📁 **Required Data Files**
- `building_height_raster_2023.tif` (from Earth Engine or Python)
- `building_polygons_with_height_2023.shp` (building footprints)
- `dsm_2023.tif` (Digital Surface Model - optional)

</div>

---

## 📊 **Step 1: Loading Height Raster in QGIS**

### 🗂️ **Import Your Data**

<div style="background: #e8f5e8; border-radius: 10px; padding: 20px; margin: 20px 0; color: #333;">

#### 📥 **Method 1: Drag & Drop**
1. **🖱️ Simple Import**: Drag and drop your `building_height_raster_2023.tif` into QGIS
2. **✅ Automatic Recognition**: QGIS automatically detects the coordinate system

#### 📥 **Method 2: Menu Import**
1. **📂 Layer Menu**: `Layer → Add Layer → Add Raster Layer`
2. **🔍 Browse**: Navigate to your GeoTIFF file
3. **🔗 Add**: Click "Add" to import

</div>

### 🎨 **Style the Height Data**

<div style="background: #fff3e0; border-radius: 10px; padding: 20px; margin: 20px 0; color: #333;">

#### 🖌️ **Styling Steps**
1. **⚙️ Open Properties**: Right-click layer → Properties → Symbology
2. **🎨 Render Type**: Change to "Singleband pseudocolor"
3. **🌈 Configure Colors**:

```
📊 Styling Configuration:
├── 🎨 Color ramp: Viridis or Spectral
├── 📏 Min value: 0
├── 📏 Max value: 50 (adjust based on your area)
├── 📊 Mode: Equal Interval or Quantile  
├── 🔢 Classes: 10
└── 🎯 Interpolation: Linear
```

<div style="background: #fff8f0; padding: 15px; border-radius: 8px; margin: 15px 0; border: 2px solid #ff9800; color: #333;">
<h4 style="color: #e65100; margin-top: 0;">🎨 Recommended Color Schemes</h4>

| Purpose | Color Ramp | Description |
|---------|------------|-------------|
| **📊 General Analysis** | Viridis | Blue → Green → Yellow |
| **🔥 Heat Map Style** | Hot | Black → Red → Yellow |
| **🌊 Topographic** | Spectral | Blue → Green → Red |
| **🎯 High Contrast** | RdYlBu | Red → Yellow → Blue |

</div>

</div>

---

## 🏢 **Step 2: Loading Building Polygons with Heights**

### 📐 **Import Vector Data**

<div style="background: #f3e5f5; border-radius: 10px; padding: 20px; margin: 20px 0; color: #333;">

#### 📥 **Load Shapefile**
1. **🖱️ Drag & Drop**: Import `building_polygons_with_height_2023.shp`
2. **✅ Verify Import**: Check that all associated files (.shx, .dbf, .prj) are present

#### 📋 **Inspect Attributes**
1. **📊 Open Table**: Right-click → Open Attribute Table
2. **🔍 Find Heights**: Look for the 'height' column with building heights in meters
3. **📈 Data Quality**: Check for NULL values or unrealistic heights

</div>

### 🎭 **Create 2.5D Visualization**

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 10px; color: white; margin: 20px 0;">

#### ✨ **2.5D Renderer Setup**

1. **⚙️ Layer Properties**: Right-click layer → Properties → Symbology
2. **🔄 Change Renderer**: Switch from "Single Symbol" to **"2.5D"**
3. **📐 Configure Settings**:

```css
🏗️ 2.5D Configuration:
├── 📏 Height: Click ε button → Field type → Select "height"
├── 🔄 Angle: 135 degrees (optimal viewing angle)
├── 🏠 Roof Color: #b3b3b3 (light gray)
├── 🧱 Wall Color: #787878 (dark gray)  
├── 💡 Wall Shading: Enabled
└── 📊 Height Scale: 1.0 (adjust if needed)
```

</div>

### 🌈 **Advanced Styling Options**

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin: 30px 0;">

<div style="background: #e3f2fd; border-left: 4px solid #2196f3; padding: 20px; border-radius: 8px; color: #333;">
<h4 style="color: #1976d2; margin-top: 0;">🎨 Color by Height</h4>
<p style="color: #333;"><strong>Gradient Colors:</strong></p>
<ul style="color: #333;">
<li>0-5m: 🟢 #4CAF50 (Green)</li>
<li>5-15m: 🟡 #FFEB3B (Yellow)</li> 
<li>15-30m: 🟠 #FF9800 (Orange)</li>
<li>30m+: 🔴 #F44336 (Red)</li>
</ul>
</div>

<div style="background: #f3e5f5; border-left: 4px solid #9c27b0; padding: 20px; border-radius: 8px; color: #333;">
<h4 style="color: #7b1fa2; margin-top: 0;">⚡ Performance Tips</h4>
<ul style="color: #333;">
<li>Simplify geometries for large datasets</li>
<li>Use scale-dependent rendering</li>
<li>Create spatial index for faster loading</li>
<li>Limit features in dense areas</li>
</ul>
</div>

</div>

---

## 🌟 **Step 3: Creating 3D Views**

### 🔌 **Install Qgis2threejs Plugin**

<div style="background: #fff8f0; border-radius: 10px; padding: 20px; margin: 20px 0; color: #333;">

#### 📦 **Plugin Installation**
1. **🔌 Plugin Manager**: `Plugins → Manage and Install Plugins`
2. **🔍 Search**: Type "Qgis2threejs" 
3. **⬇️ Install**: Click "Install Plugin"
4. **🔄 Restart**: Restart QGIS to activate

<div style="background: #fff8f0; padding: 15px; border-radius: 8px; margin: 15px 0; border: 2px solid #ff9800; color: #333;">
<h4 style="color: #e65100; margin-top: 0;">⚠️ Alternative Plugins</h4>
<ul style="color: #333;">
<li><strong>Qgis2threejs:</strong> Web-based 3D visualization</li>
<li><strong>3D Map View:</strong> Built-in QGIS 3D (QGIS 3.0+)</li>
<li><strong>DEMto3D:</strong> 3D printing preparation</li>
</ul>
</div>

</div>

### 🎬 **Create 3D Scene**

<div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); padding: 20px; border-radius: 10px; color: white; margin: 20px 0;">

#### 🏗️ **3D Scene Configuration**

1. **🚀 Launch Tool**: `Web → Qgis2threejs → Qgis2threejs Exporter`

2. **🏔️ DEM Layer Setup**:
   - Select your DSM or terrain layer as base
   - Set appropriate vertical exaggeration (1-3x)
   - Choose texture from satellite imagery

3. **🏢 Building Layer Setup**:
   - Add your building polygon layer
   - Enable height extrusion using "height" field
   - Configure building materials and colors

4. **⚙️ Scene Settings**:
   ```
   🎬 3D Scene Configuration:
   ├── 📐 Vertical Exaggeration: 1.5x
   ├── 🎨 Background: Sky gradient
   ├── ☀️ Lighting: Natural (sun position)
   ├── 📷 Camera: Perspective view
   └── 🎯 Controls: Orbit navigation
   ```

</div>

### 📤 **Export Options**

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 15px; margin: 25px 0;">

<div style="background: #e8f5e8; border-left: 4px solid #4caf50; padding: 20px; border-radius: 8px; color: #333;">
<h4 style="color: #2e7d32; margin-top: 0;">🌐 Web Export</h4>
<ul style="color: #333;">
<li>Interactive HTML file</li>
<li>Share via web browser</li>
<li>Mobile-friendly viewing</li>
<li>Embed in websites</li>
</ul>
</div>

<div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 20px; border-radius: 8px; color: #333;">
<h4 style="color: #856404; margin-top: 0;">📱 Scene Export</h4>
<ul style="color: #333;">
<li>GLB/GLTF format</li>
<li>Use in AR/VR applications</li>
<li>3D printing preparation</li>
<li>Game engine import</li>
</ul>
</div>

</div>

---

## 🛠️ **Troubleshooting Common Issues**

<div style="display: grid; grid-template-columns: 1fr; gap: 15px; margin: 25px 0;">

<div style="background: #ffebee; border-left: 4px solid #f44336; padding: 20px; border-radius: 8px; color: #333;">
<h4 style="color: #c62828; margin-top: 0;">🚨 Buildings appear stretched in 2.5D view</h4>
<p style="color: #333;"><strong>Solutions:</strong></p>
<ul style="color: #333;">
<li>Ensure data is in projected coordinate system (UTM)</li>
<li>Check height field units (should be meters)</li>
<li>Adjust vertical exaggeration factor in symbology</li>
<li>Verify CRS matches across all layers</li>
</ul>
</div>

<div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 20px; border-radius: 8px; color: #333;">
<h4 style="color: #856404; margin-top: 0;">⚠️ Missing height values</h4>
<p style="color: #333;"><strong>Solutions:</strong></p>
<ul style="color: #333;">
<li>Filter buildings by `building_presence > 0.5`</li>
<li>Check for NULL values in attribute table</li>
<li>Use Field Calculator: <code>COALESCE("height", 5)</code> for default values</li>
<li>Verify data export settings from source</li>
</ul>
</div>

<div style="background: #e3f2fd; border-left: 4px solid #2196f3; padding: 20px; border-radius: 8px; color: #333;">
<h4 style="color: #1976d2; margin-top: 0;">⚡ Performance issues with large datasets</h4>
<p style="color: #333;"><strong>Solutions:</strong></p>
<ul style="color: #333;">
<li>Simplify geometries: Vector → Geometry Tools → Simplify</li>
<li>Create spatial index: Vector → Data Management → Create Spatial Index</li>
<li>Use scale-dependent rendering</li>
<li>Enable on-the-fly CRS transformation only when necessary</li>
</ul>
</div>

</div>

## 🎯 **Best Practices Summary**

<div style="background: #f8f9ff; border-radius: 12px; padding: 25px; margin: 20px 0; color: #333;">

### ✅ **Data Management**
- Keep all data in the same coordinate system (preferably UTM)
- Create backup copies before processing
- Use descriptive layer names and organize in groups
- Document data sources and processing steps

### 🎨 **Visualization**
- Choose color schemes appropriate for your audience
- Use consistent symbolization across similar datasets
- Include legends and scale bars in map outputs
- Test visibility at different zoom levels

### ⚡ **Performance**
- Enable pyramids for large rasters
- Use appropriate scale ranges for different layer details
- Optimize styling for your computer's capabilities
- Save projects regularly to prevent data loss

</div>

---

<div style="background: linear-gradient(45deg, #2e8b57, #3cb371); padding: 3px; border-radius: 12px; margin: 30px 0;">
<div style="background: #f8f9ff; padding: 25px; border-radius: 10px; text-align: center; color: #333;">
<h3 style="margin: 0; color: #333;">🎉 QGIS Mastery Complete!</h3>
<p style="margin: 10px 0 0 0; color: #666;">You can now create professional building height visualizations and analyses!</p>
</div>
</div>
