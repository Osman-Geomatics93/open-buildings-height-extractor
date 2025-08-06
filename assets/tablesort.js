/* ==========================================
   📊 TABLE SORTING FUNCTIONALITY
   Enhanced table interactions
   ========================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize table sorting with animations
    const tables = document.querySelectorAll('.md-typeset table');
    
    tables.forEach((table, index) => {
        // Add sorting capability
        if (table.querySelector('thead th')) {
            // Add visual feedback for sortable columns
            table.querySelectorAll('thead th').forEach(th => {
                th.style.position = 'relative';
                th.style.cursor = 'pointer';
                th.style.userSelect = 'none';
                th.style.transition = 'all 0.3s ease';
                
                // Add sort indicator
                const indicator = document.createElement('span');
                indicator.innerHTML = ' ⇅';
                indicator.style.opacity = '0.5';
                indicator.style.fontSize = '0.8em';
                th.appendChild(indicator);
                
                // Add hover effects
                th.addEventListener('mouseenter', function() {
                    this.style.backgroundColor = 'rgba(102, 126, 234, 0.1)';
                    indicator.style.opacity = '1';
                });
                
                th.addEventListener('mouseleave', function() {
                    this.style.backgroundColor = '';
                    if (!this.classList.contains('sort-up') && !this.classList.contains('sort-down')) {
                        indicator.style.opacity = '0.5';
                    }
                });
                
                // Add click animation
                th.addEventListener('click', function() {
                    // Remove previous sort indicators
                    table.querySelectorAll('th').forEach(header => {
                        header.classList.remove('sort-up', 'sort-down');
                        header.querySelector('span').innerHTML = ' ⇅';
                    });
                    
                    // Add animation
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = 'scale(1)';
                    }, 100);
                    
                    // Determine sort direction
                    const currentOrder = this.getAttribute('data-sort-order') || 'none';
                    let newOrder = 'asc';
                    
                    if (currentOrder === 'asc') {
                        newOrder = 'desc';
                        this.classList.add('sort-down');
                        indicator.innerHTML = ' ▼';
                    } else {
                        this.classList.add('sort-up');
                        indicator.innerHTML = ' ▲';
                    }
                    
                    this.setAttribute('data-sort-order', newOrder);
                    
                    // Perform sort
                    sortTable(table, Array.from(th.parentNode.children).indexOf(th), newOrder);
                });
            });
        }
        
        // Add table enhancements
        table.style.position = 'relative';
        table.style.overflow = 'hidden';
        
        // Add loading state for large tables
        if (table.rows.length > 20) {
            table.style.opacity = '0.8';
            setTimeout(() => {
                table.style.opacity = '1';
            }, 100 * index);
        }
    });
});

function sortTable(table, columnIndex, order) {
    const tbody = table.querySelector('tbody') || table;
    const rows = Array.from(tbody.rows);
    
    // Determine data type for sorting
    const sampleValue = rows[0]?.cells[columnIndex]?.textContent.trim() || '';
    const isNumeric = !isNaN(parseFloat(sampleValue)) && isFinite(sampleValue);
    
    // Sort rows
    rows.sort((a, b) => {
        const aVal = a.cells[columnIndex]?.textContent.trim() || '';
        const bVal = b.cells[columnIndex]?.textContent.trim() || '';
        
        let comparison = 0;
        
        if (isNumeric) {
            const aNum = parseFloat(aVal) || 0;
            const bNum = parseFloat(bVal) || 0;
            comparison = aNum - bNum;
        } else {
            comparison = aVal.localeCompare(bVal);
        }
        
        return order === 'desc' ? -comparison : comparison;
    });
    
    // Animate row reordering
    rows.forEach((row, index) => {
        row.style.transition = 'transform 0.3s ease';
        row.style.transform = `translateY(${index * 2}px)`;
        
        setTimeout(() => {
            tbody.appendChild(row);
            row.style.transform = '';
        }, 50 * index);
    });
    
    // Add visual feedback
    table.style.animation = 'pulse 0.3s ease-in-out';
    setTimeout(() => {
        table.style.animation = '';
    }, 300);
}

// Enhanced table features
function initTableEnhancements() {
    const tables = document.querySelectorAll('.md-typeset table');
    
    tables.forEach(table => {
        // Add row hover effects
        const rows = table.querySelectorAll('tr');
        rows.forEach(row => {
            row.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.01)';
                this.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
            });
            
            row.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.boxShadow = '';
            });
        });
        
        // Add table statistics
        if (table.rows.length > 5) {
            const statsDiv = document.createElement('div');
            statsDiv.innerHTML = `
                <small style="color: #666; font-style: italic;">
                    📊 ${table.rows.length - 1} rows • Click headers to sort
                </small>
            `;
            statsDiv.style.marginTop = '0.5rem';
            statsDiv.style.textAlign = 'right';
            table.parentNode.appendChild(statsDiv);
        }
    });
}

// Initialize enhancements after DOM is loaded
setTimeout(initTableEnhancements, 500);
