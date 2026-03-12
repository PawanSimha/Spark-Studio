import os

def fix_placehold_images():
    project_dir = r"c:\Users\pawan\SNPSU\Projects\Spark Studio"
    
    files_to_update = {
        r"pages\podcast.html": ('https://placehold.co/100x100/FF6F00/FFFFFF?text=E1', 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=100&h=100&fit=crop'),
        r"pages\branding.html": ('https://placehold.co/600x400/FF6F00/FFFFFF?text=Branding+Importance', 'https://images.unsplash.com/photo-1493612276216-ee3925520721?w=600&h=400&fit=crop'),
        r"index.html": ('https://placehold.co/800x450/00223E/FFFFFF?text=Our+Creative+Process', 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=450&fit=crop'),
    }
    
    for rel_path, (old, new) in files_to_update.items():
        file_path = os.path.join(project_dir, rel_path)
        if os.path.exists(file_path):
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content = content.replace(old, new)
            
            if new_content != content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Fixed placehold links in {rel_path}")

if __name__ == "__main__":
    fix_placehold_images()
