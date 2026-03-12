import os

def fix_project():
    project_dir = r"c:\Users\pawan\SNPSU\Projects\Spark Studio"

    # Fix placeholder domain in all files
    for root, _, files in os.walk(project_dir):
        for file in files:
            if file.endswith(('.html', '.js')):
                file_path = os.path.join(root, file)
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                new_content = content.replace("yourdomain.com", "sparkstudio.com")
                
                # If it's a services pages, fix contact relative link
                if "services" in root and file.endswith('.html'):
                    new_content = new_content.replace('href="contact.html"', 'href="../pages/contact.html"')
                    new_content = new_content.replace('action="contact.html"', 'action="../pages/contact.html"')
                
                if new_content != content:
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Fixed {os.path.relpath(file_path, project_dir)}")

if __name__ == "__main__":
    fix_project()
