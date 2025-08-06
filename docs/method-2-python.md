# 🐍 **Method 2: Direct Download via Python**

<div style="background: linear-gradient(135deg, #3776ab 0%, #ffd43b 100%); padding: 25px; border-radius: 15px; color: white; margin: 20px 0; box-shadow: 0 8px 32px rgba(55, 118, 171, 0.3);">
<h2 style="color: white; margin-top: 0;">🚀 Perfect for Automated Workflows</h2>
<p style="font-size: 1.2em; margin-bottom: 0;">Ideal for users without Earth Engine access - download pre-processed country-level data</p>
</div>

## 📦 **Prerequisites & Installation**

<div style="background: #f8f9ff; border-radius: 12px; padding: 25px; margin: 20px 0;">

### 🛠️ **Required Libraries**

```bash
# 💻 Install required packages
pip install google-cloud-storage geopandas rasterio matplotlib numpy
```

<div style="background: #e8f5e8; border-left: 4px solid #4caf50; padding: 15px; border-radius: 8px; margin: 15px 0;">
<h4 style="color: #2e7d32; margin-top: 0;">💡 Pro Tip</h4>
<p style="margin-bottom: 0;">Create a virtual environment to avoid conflicts:</p>
<code style="background: #f5f5f5; padding: 2px 6px; border-radius: 3px;">python -m venv building_heights_env</code>
</div>

</div>

---

## 📥 **Step 1: Download Country Data**

### 🌍 **Complete Download Script**

```python
import os
import requests
import zipfile
import geopandas as gpd
import rasterio
from rasterio.plot import show
import matplotlib.pyplot as plt
import numpy as np

def download_country_data(country_code, year, output_dir):
    """
    🌍 Download Open Buildings 2.5D data for a specific country and year
    
    Parameters:
    -----------
    country_code : str
        ISO 3-letter country code (e.g., 'GHA' for Ghana)
    year : int
        Year between 2016-2023
    output_dir : str
        Directory to save downloaded files
        
    Returns:
    --------
    str: Path to downloaded GeoTIFF file
    """
    
    # 📁 Create output directory
    os.makedirs(output_dir, exist_ok=True)
    
    # 🔗 Construct GCS path
    base_url = "gs://open-buildings-temporal/v1"
    gcs_path = f"{base_url}/{country_code}_{year}.tif"
    
    # 📥 Download using gsutil (requires Google Cloud SDK)
    print(f"📥 Downloading {country_code} data for {year}...")
    os.system(f"gsutil cp {gcs_path} {output_dir}/")
    
    downloaded_file = f"{output_dir}/{country_code}_{year}.tif"
    
    if os.path.exists(downloaded_file):
        print(f"✅ Successfully downloaded: {downloaded_file}")
        return downloaded_file
    else:
        print(f"❌ Download failed for {country_code}_{year}")
        return None
```

### 🗂️ **Alternative: HDX Portal Method**

<div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 20px; border-radius: 10px; margin: 20px 0;">
<h4 style="color: #856404; margin-top: 0;">📋 Manual Download Steps</h4>

1. **🌐 Visit HDX Portal**: [https://data.humdata.org/dataset/google-open-buildings-temporal](https://data.humdata.org/dataset/google-open-buildings-temporal)

2. **📄 Download Resources**:
   - Country list CSV
   - Download script
   - Documentation

3. **🔧 Setup Google Cloud SDK**:
   ```bash
   # Install Google Cloud SDK
   curl https://sdk.cloud.google.com | bash
   gcloud auth login
   ```

</div>

---

## 🔄 **Step 2: Process Downloaded Data**

### 📊 **Extract Building Heights Function**

```python
def extract_building_heights(tif_path, confidence_threshold=0.5):
    """
    🏗️ Extract building heights from downloaded GeoTIFF
    
    Parameters:
    -----------
    tif_path : str
        Path to the downloaded GeoTIFF file
    confidence_threshold : float
        Minimum confidence for building presence (0-1)
        
    Returns:
    --------
    tuple: (height_array, metadata_profile)
    """
    
    print(f"📖 Processing: {tif_path}")
    
    with rasterio.open(tif_path) as src:
        # 📊 Read all bands
        presence = src.read(1)  # Band 1: building_presence
        height = src.read(2)    # Band 2: building_height  
        count = src.read(3)     # Band 3: building_fractional_count
        
        # 🎯 Apply confidence mask
        height_masked = np.where(presence > confidence_threshold, height, np.nan)
        
        # 📋 Get metadata
        metadata = {
            'crs': src.crs,
            'bounds': src.bounds,
            'resolution': src.res,
            'height': src.height,
            'width': src.width,
            'transform': src.transform
        }
        
        print(f"📍 CRS: {metadata['crs']}")
        print(f"🌍 Bounds: {metadata['bounds']}")
        print(f"📏 Resolution: {metadata['resolution']}")
        print(f"📐 Dimensions: {metadata['height']} x {metadata['width']}")
        
        # 📈 Basic statistics
        valid_heights = height_masked[~np.isnan(height_masked)]
        if len(valid_heights) > 0:
            print(f"📊 Height Statistics:")
            print(f"   Min: {valid_heights.min():.2f}m")
            print(f"   Max: {valid_heights.max():.2f}m")
            print(f"   Mean: {valid_heights.mean():.2f}m")
            print(f"   Buildings detected: {len(valid_heights):,} pixels")
        
        return height_masked, metadata, src.profile
```

---

## 🎨 **Step 3: Visualization Functions**

### 📈 **Advanced Visualization Script**

```python
def create_height_visualization(height_array, metadata, country_code, year):
    """
    🎨 Create stunning building height visualizations
    
    Parameters:
    -----------
    height_array : numpy.ndarray
        Array of building heights
    metadata : dict
        Spatial metadata from rasterio
    country_code : str
        Country code for title
    year : int
        Year for title
    """
    
    # 🎨 Set up the plot style
    plt.style.use('dark_background')
    fig, axes = plt.subplots(2, 2, figsize=(16, 12))
    fig.suptitle(f'🏙️ Building Heights Analysis: {country_code} {year}', 
                 fontsize=20, fontweight='bold', color='white')
    
    # 📊 Main height visualization
    ax1 = axes[0, 0]
    im1 = ax1.imshow(height_array, cmap='viridis', vmin=0, vmax=50, aspect='auto')
    ax1.set_title('🏗️ Building Heights', fontsize=14, color='white')
    ax1.set_xlabel('Longitude →', color='white')
    ax1.set_ylabel('Latitude ↑', color='white')
    plt.colorbar(im1, ax=ax1, label='Height (m)')
    
    # 🔥 Heat map style
    ax2 = axes[0, 1]
    im2 = ax2.imshow(height_array, cmap='hot', vmin=0, vmax=30, aspect='auto')
    ax2.set_title('🔥 Heat Map Style', fontsize=14, color='white')
    ax2.set_xlabel('Longitude →', color='white')
    ax2.set_ylabel('Latitude ↑', color='white')
    plt.colorbar(im2, ax=ax2, label='Height (m)')
    
    # 📈 Height histogram
    ax3 = axes[1, 0]
    valid_heights = height_array[~np.isnan(height_array)]
    if len(valid_heights) > 0:
        ax3.hist(valid_heights, bins=50, color='#00ff7f', alpha=0.7, edgecolor='white')
        ax3.set_title('📊 Height Distribution', fontsize=14, color='white')
        ax3.set_xlabel('Height (m)', color='white')
        ax3.set_ylabel('Frequency', color='white')
        ax3.tick_params(colors='white')
    
    # 🏢 Building categories
    ax4 = axes[1, 1]
    if len(valid_heights) > 0:
        categories = ['Low (0-5m)', 'Mid (5-15m)', 'High (15-30m)', 'Very High (30m+)']
        counts = [
            np.sum((valid_heights >= 0) & (valid_heights < 5)),
            np.sum((valid_heights >= 5) & (valid_heights < 15)),
            np.sum((valid_heights >= 15) & (valid_heights < 30)),
            np.sum(valid_heights >= 30)
        ]
        colors = ['#4CAF50', '#FF9800', '#F44336', '#9C27B0']
        
        wedges, texts, autotexts = ax4.pie(counts, labels=categories, colors=colors, 
                                          autopct='%1.1f%%', startangle=90)
        ax4.set_title('🏢 Building Categories', fontsize=14, color='white')
        
        # Style the text
        for text in texts:
            text.set_color('white')
        for autotext in autotexts:
            autotext.set_color('white')
            autotext.set_fontweight('bold')
    
    plt.tight_layout()
    plt.savefig(f'building_heights_{country_code}_{year}.png', 
                dpi=300, bbox_inches='tight', facecolor='black')
    plt.show()

def export_processed_data(height_array, metadata, output_path):
    """
    💾 Export processed height data as GeoTIFF
    
    Parameters:
    -----------
    height_array : numpy.ndarray
        Processed height array
    metadata : dict
        Spatial metadata
    output_path : str
        Output file path
    """
    
    profile = {
        'driver': 'GTiff',
        'dtype': 'float32',
        'nodata': np.nan,
        'width': metadata['width'],
        'height': metadata['height'],
        'count': 1,
        'crs': metadata['crs'],
        'transform': metadata['transform'],
        'compress': 'lzw'
    }
    
    with rasterio.open(output_path, 'w', **profile) as dst:
        dst.write(height_array.astype('float32'), 1)
    
    print(f"💾 Exported processed data to: {output_path}")
```

---

## 🚀 **Complete Usage Example**

```python
# 🌍 Configuration
country_code = "GHA"  # Ghana
year = 2023
output_dir = "./open_buildings_data"

# 📥 Download data
print("🚀 Starting building heights extraction...")
tif_path = download_country_data(country_code, year, output_dir)

if tif_path:
    # 🔄 Process the data
    heights, metadata, profile = extract_building_heights(tif_path, confidence_threshold=0.6)
    
    # 🎨 Create visualizations
    create_height_visualization(heights, metadata, country_code, year)
    
    # 💾 Export processed data
    export_path = f"{output_dir}/processed_heights_{country_code}_{year}.tif"
    export_processed_data(heights, metadata, export_path)
    
    print("✅ Processing complete! Check the output directory for results.")
else:
    print("❌ Failed to download data. Please check your internet connection and try again.")
```

## 🔧 **Troubleshooting**

<div style="display: grid; grid-template-columns: 1fr; gap: 15px; margin: 25px 0;">

<div style="background: #ffebee; border-left: 4px solid #f44336; padding: 20px; border-radius: 8px;">
<h4 style="color: #c62828; margin-top: 0;">🚨 Common Issues</h4>
<ul>
<li><strong>gsutil not found:</strong> Install Google Cloud SDK</li>
<li><strong>Permission denied:</strong> Run <code>gcloud auth login</code></li>
<li><strong>Large memory usage:</strong> Process smaller regions or reduce resolution</li>
</ul>
</div>

<div style="background: #e8f5e8; border-left: 4px solid #4caf50; padding: 20px; border-radius: 8px;">
<h4 style="color: #2e7d32; margin-top: 0;">💡 Pro Tips</h4>
<ul>
<li><strong>Batch processing:</strong> Loop through multiple countries/years</li>
<li><strong>Memory optimization:</strong> Use chunked processing for large files</li>
<li><strong>Quality control:</strong> Always check confidence thresholds</li>
</ul>
</div>

</div>

---

<div style="background: linear-gradient(45deg, #3776ab, #ffd43b); padding: 3px; border-radius: 12px; margin: 30px 0;">
<div style="background: white; padding: 25px; border-radius: 10px; text-align: center;">
<h3 style="margin: 0; color: #333;">🎉 Python Method Mastered!</h3>
<p style="margin: 10px 0 0 0; color: #666;">You can now automate building height extraction for entire countries!</p>
</div>
</div>
