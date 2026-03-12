import os

def fix_dummy_links():
    project_dir = r"c:\Users\pawan\SNPSU\Projects\Spark Studio"
    
    files_to_update = {
        r"pages\pricing.html": ('href="#"', 'href="/pages/contact.html"'),
        r"pages\branding.html": ('href="#"', 'href="/pages/contact.html"'),
        r"pages\podcast.html": ('href="#"', 'href="/pages/contact.html"'),
        # Blog pagination and items left as # since they don't have distinct pages yet
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
                print(f"Fixed dummy links in {rel_path}")

if __name__ == "__main__":
    fix_dummy_links()
