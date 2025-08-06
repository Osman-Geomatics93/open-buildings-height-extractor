# 🏗️ **Applications**

<div style="background: linear-gradient(135deg, #48cae4 0%, #023e8a 100%); padding: 25px; border-radius: 15px; color: white; margin: 20px 0; box-shadow: 0 8px 32px rgba(72, 202, 228, 0.3);">
<h2 style="color: white; margin-top: 0;">🌟 Real-World Building Height Applications</h2>
<p style="font-size: 1.2em; margin-bottom: 0;">Discover powerful ways to leverage building height data for impactful urban analysis and decision-making</p>
</div>

## 🏙️ **Urban Planning & Development**

### 📊 **Building Density Analysis**

<div style="background: #f8f9ff; border-radius: 12px; padding: 25px; margin: 20px 0;">

#### 🎯 **Floor Area Ratio (FAR) Calculation**

<div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #667eea; margin: 10px 0;">

**Floor Area Ratio = Total Floor Area / Plot Area**

```python
# 🏢 Calculate FAR using building height data
def calculate_far(buildings_gdf, plot_polygons_gdf):
    """
    📊 Calculate Floor Area Ratio for urban planning
    """
    results = []
    
    for idx, plot in plot_polygons_gdf.iterrows():
        # 🔍 Find buildings within this plot
        buildings_in_plot = buildings_gdf[
            buildings_gdf.geometry.intersects(plot.geometry)
        ]
        
        if len(buildings_in_plot) > 0:
            # 📐 Calculate total floor area (assuming 3m per floor)
            floor_height = 3.0  # meters per floor
            total_floor_area = sum(
                (building['height'] / floor_height) * building.geometry.area 
                for _, building in buildings_in_plot.iterrows()
            )
            
            # 📊 Calculate FAR
            plot_area = plot.geometry.area
            far = total_floor_area / plot_area
            
            results.append({
                'plot_id': idx,
                'far': far,
                'building_count': len(buildings_in_plot),
                'plot_area': plot_area,
                'total_floor_area': total_floor_area
            })
    
    return pd.DataFrame(results)

# 🎨 Visualization categories
def categorize_far(far_value):
    """🏗️ Categorize FAR for planning purposes"""
    if far_value < 0.5:
        return "🌳 Low Density Residential"
    elif far_value < 1.0:
        return "🏘️ Medium Density Residential" 
    elif far_value < 2.0:
        return "🏢 Commercial/Mixed Use"
    elif far_value < 4.0:
        return "🏬 High Density Commercial"
    else:
        return "🏗️ Ultra High Density"
```

</div>

#### 📈 **Development Potential Assessment**

<div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 15px 0;">

<table style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden;">
<tr style="background: #4caf50; color: white;">
<th style="padding: 12px; border: none;">🎯 Analysis Type</th>
<th style="padding: 12px; border: none;">📊 Metrics</th>
<th style="padding: 12px; border: none;">🏗️ Planning Use</th>
</tr>
<tr>
<td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>🏠 Density Mapping</strong></td>
<td style="padding: 10px; border-bottom: 1px solid #eee;">Buildings/hectare, Average height</td>
<td style="padding: 10px; border-bottom: 1px solid #eee;">Zoning decisions, Infrastructure planning</td>
</tr>
<tr style="background: #f9f9f9;">
<td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>📈 Growth Pattern</strong></td>
<td style="padding: 10px; border-bottom: 1px solid #eee;">Height change over time</td>
<td style="padding: 10px; border-bottom: 1px solid #eee;">Development trends, Future projections</td>
</tr>
<tr>
<td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>🎯 Underutilization</strong></td>
<td style="padding: 10px; border-bottom: 1px solid #eee;">Low height vs. zoning potential</td>
<td style="padding: 10px; border-bottom: 1px solid #eee;">Redevelopment opportunities</td>
</tr>
<tr style="background: #f9f9f9;">
<td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>🌆 Skyline Analysis</strong></td>
<td style="padding: 10px; border-bottom: 1px solid #eee;">Height distribution profiles</td>
<td style="padding: 10px; border-bottom: 1px solid #eee;">Aesthetic planning, View corridors</td>
</tr>
</table>

</div>

</div>

### 🌳 **Shadow Impact Studies**

<div style="background: linear-gradient(135deg, #ffd89b 0%, #19547b 100%); padding: 20px; border-radius: 10px; color: white; margin: 20px 0;">

#### ☀️ **Solar Access Analysis**

```python
# ☀️ Shadow analysis for urban planning
import numpy as np
from datetime import datetime, timedelta

def calculate_building_shadows(buildings_gdf, date, latitude, longitude):
    """
    🌤️ Calculate shadow patterns for building height planning
    """
    shadows = []
    
    # ☀️ Solar position calculation
    solar_elevation, solar_azimuth = calculate_solar_position(
        date, latitude, longitude
    )
    
    for idx, building in buildings_gdf.iterrows():
        building_height = building['height']
        building_geom = building.geometry
        
        # 📐 Calculate shadow length
        if solar_elevation > 0:  # Sun is above horizon
            shadow_length = building_height / np.tan(np.radians(solar_elevation))
            
            # 🧭 Shadow direction (opposite to sun azimuth)
            shadow_azimuth = (solar_azimuth + 180) % 360
            
            # 📍 Create shadow polygon
            shadow_polygon = create_shadow_polygon(
                building_geom, shadow_length, shadow_azimuth
            )
            
            shadows.append({
                'building_id': idx,
                'shadow_area': shadow_polygon.area,
                'shadow_geometry': shadow_polygon,
                'building_height': building_height,
                'shadow_length': shadow_length
            })
    
    return gpd.GeoDataFrame(shadows)

# 🎯 Critical times for shadow analysis
critical_times = [
    ("🌅 Morning (9 AM)", datetime(2023, 12, 21, 9, 0)),  # Winter solstice
    ("🌞 Noon (12 PM)", datetime(2023, 12, 21, 12, 0)),
    ("🌇 Afternoon (3 PM)", datetime(2023, 12, 21, 15, 0)),
    ("🌞 Summer Solstice", datetime(2023, 6, 21, 12, 0))   # Summer solstice
]
```

#### 🏢 **Building Height Impact Assessment**

<div style="background: white; padding: 20px; border-radius: 8px; margin: 15px 0; color: black;">

**🎯 Key Shadow Impact Considerations:**

- **🏠 Residential Areas:** Minimum 4 hours of direct sunlight
- **🌳 Public Parks:** Full sun access during peak hours (10 AM - 3 PM)  
- **🏫 Schools:** Playground areas should receive morning sunlight
- **☀️ Solar Installations:** No shadowing on renewable energy systems
- **🚗 Streets:** Ice formation prevention in winter

</div>

</div>

---

## 🚨 **Emergency Response & Safety**

### 🚑 **Evacuation Route Planning**

<div style="background: #ffebee; border-radius: 10px; padding: 20px; margin: 20px 0;">

#### 🏃‍♂️ **Population Estimation for Emergency Planning**

<div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #f44336; margin: 10px 0;">

```python
# 👥 Population estimation using building heights
def estimate_population_from_buildings(buildings_gdf, population_density_per_floor=4):
    """
    👨‍👩‍👧‍👦 Estimate population for emergency planning using building data
    """
    results = []
    
    for idx, building in buildings_gdf.iterrows():
        # 🏢 Estimate number of floors (assuming 3m per floor)
        floor_height = 3.0
        estimated_floors = max(1, int(building['height'] / floor_height))
        
        # 📐 Floor area estimation
        building_footprint_area = building.geometry.area
        
        # 👥 Population estimation
        if building_footprint_area > 200:  # Large building
            # 🏢 Commercial/residential complex
            population_per_floor = building_footprint_area / 25  # 25m² per person
        elif building_footprint_area > 100:  # Medium building
            # 🏘️ Multi-family residential
            population_per_floor = building_footprint_area / 20  # 20m² per person
        else:  # Small building
            # 🏠 Single family
            population_per_floor = min(6, building_footprint_area / 15)
        
        estimated_population = estimated_floors * population_per_floor
        
        results.append({
            'building_id': idx,
            'estimated_population': int(estimated_population),
            'floors': estimated_floors,
            'area': building_footprint_area,
            'height': building['height'],
            'pop_density': estimated_population / building_footprint_area
        })
    
    return pd.DataFrame(results)

# 🚨 Emergency evacuation capacity planning
def plan_evacuation_capacity(buildings_with_population, evacuation_sites):
    """
    🏃‍♂️ Plan evacuation routes based on building populations
    """
    for site in evacuation_sites:
        # 🎯 Find buildings within evacuation radius
        nearby_buildings = buildings_with_population[
            buildings_with_population.geometry.distance(site.geometry) < 1000  # 1km radius
        ]
        
        total_population = nearby_buildings['estimated_population'].sum()
        site_capacity = site['capacity']
        
        if total_population > site_capacity:
            print(f"⚠️ Evacuation site {site['name']} overloaded:")
            print(f"   Population: {total_population:,}")
            print(f"   Capacity: {site_capacity:,}")
            print(f"   Deficit: {total_population - site_capacity:,}")
```

</div>

#### 🌊 **Flood Impact Modeling**

<div style="background: #e3f2fd; padding: 20px; border-radius: 8px; margin: 15px 0;">

```python
# 🌊 Flood risk assessment using building heights
def assess_flood_vulnerability(buildings_gdf, flood_depth_raster, dem_raster):
    """
    🌊 Assess building vulnerability to flooding
    """
    vulnerable_buildings = []
    
    for idx, building in buildings_gdf.iterrows():
        # 📍 Get building location
        building_centroid = building.geometry.centroid
        
        # 🌊 Extract flood depth at building location
        flood_depth = extract_raster_value(flood_depth_raster, building_centroid)
        ground_elevation = extract_raster_value(dem_raster, building_centroid)
        
        # 🏗️ Building characteristics
        building_height = building['height']
        building_area = building.geometry.area
        
        # 🎯 Vulnerability assessment
        if flood_depth > 0:
            flood_level = ground_elevation + flood_depth
            building_top = ground_elevation + building_height
            
            if flood_level > ground_elevation + 0.5:  # Water > 0.5m above ground
                vulnerability_level = "🔴 High Risk"
                evacuation_priority = 1
            elif flood_level > ground_elevation:  # Any flooding
                vulnerability_level = "🟡 Medium Risk"
                evacuation_priority = 2
            else:
                vulnerability_level = "🟢 Low Risk"
                evacuation_priority = 3
            
            # 🏢 Multi-story buildings can serve as shelters
            if building_height > 6 and building_area > 100:
                shelter_potential = True
                shelter_capacity = int((building_height - flood_depth) / 3 * building_area / 4)
            else:
                shelter_potential = False
                shelter_capacity = 0
            
            vulnerable_buildings.append({
                'building_id': idx,
                'flood_depth': flood_depth,
                'vulnerability': vulnerability_level,
                'evacuation_priority': evacuation_priority,
                'shelter_potential': shelter_potential,
                'shelter_capacity': shelter_capacity,
                'estimated_population': building.get('estimated_population', 0)
            })
    
    return pd.DataFrame(vulnerable_buildings)
```

</div>

</div>

### 📡 **Line-of-Sight Analysis**

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 10px; color: white; margin: 20px 0;">

#### 📶 **Communication Network Planning**

```python
# 📡 Line-of-sight analysis for emergency communications
def calculate_line_of_sight(observer_point, target_points, buildings_gdf, dem_raster):
    """
    👁️ Calculate line-of-sight for emergency communication planning
    """
    los_results = []
    
    for target_id, target_point in target_points.iterrows():
        # 🎯 Create line between observer and target
        line = LineString([observer_point, target_point.geometry])
        
        # 🏗️ Find buildings intersecting the line
        intersecting_buildings = buildings_gdf[
            buildings_gdf.geometry.intersects(line)
        ]
        
        # 📏 Check if buildings block the view
        is_blocked = False
        blocking_height = 0
        
        for _, building in intersecting_buildings.iterrows():
            building_height = building['height']
            
            # 📐 Calculate height at intersection point
            intersection = building.geometry.intersection(line)
            if not intersection.is_empty:
                # 🔍 Get ground elevation at intersection
                ground_elev = extract_raster_value(dem_raster, intersection.centroid)
                total_height = ground_elev + building_height
                
                if total_height > blocking_height:
                    blocking_height = total_height
                    is_blocked = True
        
        los_results.append({
            'target_id': target_id,
            'line_of_sight': not is_blocked,
            'blocking_height': blocking_height,
            'distance': observer_point.distance(target_point.geometry),
            'buildings_in_path': len(intersecting_buildings)
        })
    
    return pd.DataFrame(los_results)

# 🚨 Emergency communication tower placement
def optimize_tower_placement(buildings_gdf, coverage_requirements):
    """
    📡 Optimize emergency communication tower placement
    """
    # 🎯 Find optimal tower locations
    # Consider: High elevation points, minimal building obstruction, maximum coverage
    pass
```

</div>

---

## 🔬 **Urban Research & Analysis**

### 🌡️ **Urban Heat Island Assessment**

<div style="background: #fff3e0; border-radius: 10px; padding: 20px; margin: 20px 0;">

#### 🏙️ **Building Density vs Temperature Analysis**

<div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #ff9800; margin: 10px 0;">

```python
# 🌡️ Urban heat island analysis using building heights
def analyze_urban_heat_correlation(buildings_gdf, temperature_raster):
    """
    🔥 Analyze correlation between building density/height and temperature
    """
    # 📊 Create analysis grid (e.g., 500m x 500m cells)
    grid = create_analysis_grid(buildings_gdf.total_bounds, cell_size=500)
    
    heat_analysis = []
    
    for idx, cell in grid.iterrows():
        # 🏢 Buildings within this cell
        cell_buildings = buildings_gdf[
            buildings_gdf.geometry.intersects(cell.geometry)
        ]
        
        if len(cell_buildings) > 0:
            # 📊 Calculate building metrics
            total_building_area = cell_buildings.geometry.area.sum()
            avg_building_height = cell_buildings['height'].mean()
            max_building_height = cell_buildings['height'].max()
            building_count = len(cell_buildings)
            
            # 📐 Calculate building coverage ratio
            cell_area = cell.geometry.area
            building_coverage_ratio = total_building_area / cell_area
            
            # 🏗️ Calculate floor area ratio
            total_floor_area = sum(
                building['height'] / 3.0 * building.geometry.area 
                for _, building in cell_buildings.iterrows()
            )
            floor_area_ratio = total_floor_area / cell_area
            
            # 🌡️ Extract temperature data
            avg_temperature = extract_raster_statistics(
                temperature_raster, cell.geometry, 'mean'
            )
            
            heat_analysis.append({
                'cell_id': idx,
                'avg_temperature': avg_temperature,
                'building_coverage': building_coverage_ratio,
                'avg_height': avg_building_height,
                'max_height': max_building_height,
                'building_count': building_count,
                'floor_area_ratio': floor_area_ratio,
                'geometry': cell.geometry
            })
    
    return gpd.GeoDataFrame(heat_analysis)

# 📈 Statistical analysis and visualization
def create_heat_correlation_analysis(heat_data):
    """📊 Create correlation analysis and visualizations"""
    import matplotlib.pyplot as plt
    import seaborn as sns
    
    # 🎨 Correlation matrix
    correlation_vars = ['avg_temperature', 'building_coverage', 'avg_height', 
                       'max_height', 'floor_area_ratio']
    corr_matrix = heat_data[correlation_vars].corr()
    
    plt.figure(figsize=(10, 8))
    sns.heatmap(corr_matrix, annot=True, cmap='RdYlBu_r', center=0)
    plt.title('🌡️ Urban Heat Island - Building Correlation Matrix')
    plt.tight_layout()
    plt.show()
```

</div>

</div>

### 🌱 **Climate Change Impact Studies**

<div style="background: #e8f5e8; border-radius: 10px; padding: 20px; margin: 20px 0;">

#### 📈 **Building Stock Resilience Assessment**

<table style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden;">
<tr style="background: linear-gradient(135deg, #4caf50, #8bc34a); color: white;">
<th style="padding: 12px; border: none;">🎯 Climate Factor</th>
<th style="padding: 12px; border: none;">📊 Building Height Relevance</th>
<th style="padding: 12px; border: none;">📈 Analysis Method</th>
<th style="padding: 12px; border: none;">🛠️ Planning Response</th>
</tr>
<tr>
<td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>🌊 Sea Level Rise</strong></td>
<td style="padding: 10px; border-bottom: 1px solid #eee;">Ground floor elevation critical</td>
<td style="padding: 10px; border-bottom: 1px solid #eee;">Building height + DEM analysis</td>
<td style="padding: 10px; border-bottom: 1px solid #eee;">Elevation requirements, flood barriers</td>
</tr>
<tr style="background: #f9f9f9;">
<td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>💨 Extreme Winds</strong></td>
<td style="padding: 10px; border-bottom: 1px solid #eee;">Tall buildings more vulnerable</td>
<td style="padding: 10px; border-bottom: 1px solid #eee;">Height vs. wind exposure</td>
<td style="padding: 10px; border-bottom: 1px solid #eee;">Building codes, wind barriers</td>
</tr>
<tr>
<td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>🔥 Urban Heat</strong></td>
<td style="padding: 10px; border-bottom: 1px solid #eee;">Building density affects temperature</td>
<td style="padding: 10px; border-bottom: 1px solid #eee;">FAR vs. temperature correlation</td>
<td style="padding: 10px; border-bottom: 1px solid #eee;">Green roofs, building spacing</td>
</tr>
<tr style="background: #f9f9f9;">
<td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>⛈️ Extreme Precipitation</strong></td>
<td style="padding: 10px; border-bottom: 1px solid #eee;">Runoff from building density</td>
<td style="padding: 10px; border-bottom: 1px solid #eee;">Surface coverage analysis</td>
<td style="padding: 10px; border-bottom: 1px solid #eee;">Stormwater management</td>
</tr>
</table>

</div>

### 🏘️ **Informal Settlement Mapping**

<div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 20px; border-radius: 10px; color: white; margin: 20px 0;">

#### 🎯 **Building Pattern Recognition**

```python
# 🏘️ Identify informal settlements using building characteristics
def identify_informal_settlements(buildings_gdf):
    """
    🔍 Identify informal settlements based on building height patterns
    """
    settlement_indicators = []
    
    # 📊 Create spatial clusters for analysis
    building_clusters = create_spatial_clusters(buildings_gdf, cluster_radius=100)
    
    for cluster_id, cluster_buildings in building_clusters.groupby('cluster_id'):
        if len(cluster_buildings) >= 10:  # Minimum cluster size
            
            # 📏 Calculate cluster characteristics
            avg_height = cluster_buildings['height'].mean()
            height_std = cluster_buildings['height'].std()
            avg_area = cluster_buildings.geometry.area.mean()
            area_std = cluster_buildings.geometry.area.std()
            
            # 🏗️ Density calculations
            cluster_area = cluster_buildings.geometry.unary_union.convex_hull.area
            building_density = len(cluster_buildings) / (cluster_area / 10000)  # buildings per hectare
            
            # 🎯 Informal settlement indicators
            informal_indicators = {
                'low_height': avg_height < 4.0,  # Predominantly single-story
                'height_uniformity': height_std < 1.5,  # Similar heights
                'small_buildings': avg_area < 80,  # Small footprints
                'high_density': building_density > 50,  # Dense packing
                'irregular_pattern': calculate_pattern_irregularity(cluster_buildings)
            }
            
            # 📊 Score informal settlement likelihood
            informal_score = sum(informal_indicators.values()) / len(informal_indicators)
            
            settlement_indicators.append({
                'cluster_id': cluster_id,
                'building_count': len(cluster_buildings),
                'avg_height': avg_height,
                'avg_area': avg_area,
                'density': building_density,
                'informal_score': informal_score,
                'likely_informal': informal_score > 0.6,
                'geometry': cluster_buildings.geometry.unary_union.convex_hull
            })
    
    return gpd.GeoDataFrame(settlement_indicators)

# 🎨 Visualization of informal settlement probability
informal_settlements = identify_informal_settlements(buildings_gdf)
informal_settlements['category'] = informal_settlements['informal_score'].apply(
    lambda x: '🔴 High Probability' if x > 0.7 
              else '🟡 Medium Probability' if x > 0.4 
              else '🟢 Low Probability'
)
```

</div>

---

## 💰 **Economic & Real Estate Applications**

### 🏠 **Property Valuation Support**

<div style="background: #f8f9ff; border-radius: 12px; padding: 25px; margin: 20px 0;">

#### 💵 **Building Volume-Based Valuation**

<div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #9c27b0; margin: 10px 0;">

```python
# 💰 Property valuation using building characteristics
def estimate_property_values(buildings_gdf, price_per_sqm_by_height):
    """
    🏠 Estimate property values using building height and area data
    """
    valuations = []
    
    for idx, building in buildings_gdf.iterrows():
        building_height = building['height']
        building_area = building.geometry.area
        
        # 🏗️ Estimate number of floors
        floors = max(1, int(building_height / 3.0))
        
        # 📊 Total floor area estimation
        total_floor_area = floors * building_area
        
        # 💵 Price determination by building type
        if building_height <= 5:  # Single story
            price_category = 'residential_low'
            base_price = price_per_sqm_by_height.get(price_category, 500)
        elif building_height <= 15:  # Low-rise
            price_category = 'residential_mid'
            base_price = price_per_sqm_by_height.get(price_category, 800)
        elif building_height <= 30:  # Mid-rise
            price_category = 'commercial_low'  
            base_price = price_per_sqm_by_height.get(price_category, 1200)
        else:  # High-rise
            price_category = 'commercial_high'
            base_price = price_per_sqm_by_height.get(price_category, 2000)
        
        # 🎯 Calculate estimated value
        estimated_value = total_floor_area * base_price
        
        valuations.append({
            'building_id': idx,
            'floors': floors,
            'total_floor_area': total_floor_area,
            'price_category': price_category,
            'price_per_sqm': base_price,
            'estimated_value': estimated_value,
            'building_height': building_height,
            'footprint_area': building_area
        })
    
    return pd.DataFrame(valuations)

# 📊 Market analysis by area
def analyze_market_by_district(buildings_with_values, district_boundaries):
    """💹 Analyze real estate market by district"""
    market_analysis = []
    
    for idx, district in district_boundaries.iterrows():
        district_buildings = buildings_with_values[
            buildings_with_values.geometry.intersects(district.geometry)
        ]
        
        if len(district_buildings) > 0:
            total_value = district_buildings['estimated_value'].sum()
            avg_price_per_sqm = district_buildings['price_per_sqm'].mean()
            total_floor_area = district_buildings['total_floor_area'].sum()
            
            market_analysis.append({
                'district_name': district.get('name', f'District_{idx}'),
                'total_market_value': total_value,
                'avg_price_per_sqm': avg_price_per_sqm,
                'total_floor_area': total_floor_area,
                'building_count': len(district_buildings),
                'value_density': total_value / district.geometry.area
            })
    
    return pd.DataFrame(market_analysis)
```

</div>

</div>

### 📊 **Investment Opportunity Analysis**

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin: 30px 0;">

<div style="background: #e8f5e8; border-left: 4px solid #4caf50; padding: 20px; border-radius: 8px;">
<h4 style="color: #2e7d32; margin-top: 0;">🏗️ Development Potential</h4>
<ul>
<li><strong>📏 Underbuilt Areas:</strong> Low FAR vs zoning allowance</li>
<li><strong>🔄 Redevelopment Sites:</strong> Old/low buildings in prime locations</li>
<li><strong>📈 Growth Corridors:</strong> Areas with increasing building heights</li>
<li><strong>🎯 Mixed-Use Opportunities:</strong> Transition zones between uses</li>
</ul>
</div>

<div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 20px; border-radius: 8px;">
<h4 style="color: #856404; margin-top: 0;">💰 Investment Metrics</h4>
<ul>
<li><strong>📊 Price per Cubic Meter:</strong> Value efficiency analysis</li>
<li><strong>🏢 Rent Potential:</strong> Floor area vs market rates</li>
<li><strong>📈 Value Growth:</strong> Height increase correlation</li>
<li><strong>⚡ ROI Estimation:</strong> Development cost vs returns</li>
</ul>
</div>

</div>

---

## 🌐 **Smart City Integration**

### 📡 **IoT Network Planning**

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 10px; color: white; margin: 20px 0;">

#### 📶 **Sensor Placement Optimization**

```python
# 📡 Smart city sensor network planning using building heights
def optimize_sensor_placement(buildings_gdf, coverage_requirements):
    """
    📶 Optimize IoT sensor placement using building height data
    """
    optimal_locations = []
    
    # 🎯 Potential sensor locations (tall buildings, good coverage)
    candidate_buildings = buildings_gdf[
        (buildings_gdf['height'] > 10) &  # Minimum height for good coverage
        (buildings_gdf.geometry.area > 50)  # Sufficient building size
    ].copy()
    
    for sensor_type, requirements in coverage_requirements.items():
        coverage_radius = requirements['range']
        min_height = requirements.get('min_height', 5)
        
        # 🔍 Filter suitable buildings
        suitable_buildings = candidate_buildings[
            candidate_buildings['height'] >= min_height
        ]
        
        # 📊 Coverage optimization
        selected_locations = []
        uncovered_area = buildings_gdf.geometry.unary_union
        
        while not uncovered_area.is_empty and len(suitable_buildings) > 0:
            # 🎯 Find building providing maximum new coverage
            best_coverage = 0
            best_building_idx = None
            
            for idx, building in suitable_buildings.iterrows():
                coverage_circle = building.geometry.centroid.buffer(coverage_radius)
                new_coverage = coverage_circle.intersection(uncovered_area).area
                
                if new_coverage > best_coverage:
                    best_coverage = new_coverage
                    best_building_idx = idx
            
            if best_building_idx is not None:
                selected_building = suitable_buildings.loc[best_building_idx]
                coverage_area = selected_building.geometry.centroid.buffer(coverage_radius)
                
                selected_locations.append({
                    'building_id': best_building_idx,
                    'sensor_type': sensor_type,
                    'coverage_area': coverage_area.area,
                    'building_height': selected_building['height'],
                    'location': selected_building.geometry.centroid
                })
                
                # 📊 Update uncovered area
                uncovered_area = uncovered_area.difference(coverage_area)
                suitable_buildings = suitable_buildings.drop(best_building_idx)
        
        optimal_locations.extend(selected_locations)
    
    return gpd.GeoDataFrame(optimal_locations)

# 🌐 Smart city applications by sensor type
sensor_requirements = {
    '📡 Air Quality': {'range': 500, 'min_height': 15},
    '🔊 Noise Monitoring': {'range': 200, 'min_height': 8},
    '📶 WiFi/5G': {'range': 300, 'min_height': 20},
    '📹 Traffic Cameras': {'range': 150, 'min_height': 6},
    '🌡️ Weather Stations': {'range': 1000, 'min_height': 25}
}
```

</div>

### 🚇 **Infrastructure Planning**

<div style="background: #e3f2fd; border-radius: 10px; padding: 20px; margin: 20px 0;">

#### 🚌 **Public Transit Demand Estimation**

<table style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden;">
<tr style="background: #2196f3; color: white;">
<th style="padding: 12px; border: none;">🚇 Infrastructure Type</th>
<th style="padding: 12px; border: none;">📊 Building Height Use</th>
<th style="padding: 12px; border: none;">📈 Planning Metric</th>
</tr>
<tr>
<td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>🚌 Bus Routes</strong></td>
<td style="padding: 10px; border-bottom: 1px solid #eee;">Population density estimation</td>
<td style="padding: 10px; border-bottom: 1px solid #eee;">Passengers per km²</td>
</tr>
<tr style="background: #f9f9f9;">
<td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>🚇 Metro Stations</strong></td>
<td style="padding: 10px; border-bottom: 1px solid #eee;">Catchment area analysis</td>
<td style="padding: 10px; border-bottom: 1px solid #eee;">Daily ridership potential</td>
</tr>
<tr>
<td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>🚗 Parking Facilities</strong></td>
<td style="padding: 10px; border-bottom: 1px solid #eee;">Commercial floor area</td>
<td style="padding: 10px; border-bottom: 1px solid #eee;">Parking spaces required</td>
</tr>
<tr style="background: #f9f9f9;">
<td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>⚡ Utilities</strong></td>
<td style="padding: 10px; border-bottom: 1px solid #eee;">Total building volume</td>
<td style="padding: 10px; border-bottom: 1px solid #eee;">Power/water demand</td>
</tr>
</table>

</div>

---

<div style="background: linear-gradient(45deg, #48cae4, #023e8a); padding: 3px; border-radius: 12px; margin: 30px 0;">
<div style="background: white; padding: 25px; border-radius: 10px; text-align: center;">
<h3 style="margin: 0; color: #333;">🌟 Applications Expert Achieved!</h3>
<p style="margin: 10px 0 0 0; color: #666;">You now understand the vast potential of building height data across multiple domains!</p>
</div>
</div>
