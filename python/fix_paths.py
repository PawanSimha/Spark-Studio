import os

def fix_absolute_paths():
    project_dir = r"c:\Users\pawan\SNPSU\Projects\Spark Studio"
    
    for root, _, files in os.walk(project_dir):
        for file in files:
            if not file.endswith('.html'):
                continue
                
            file_path = os.path.join(root, file)
            rel_path = os.path.relpath(file_path, project_dir)
            
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                
            new_content = content
            
            # Determine prefix
            if "components" in rel_path:
                prefix = "{{ROOT}}/"
            elif "pages" in rel_path or "services" in rel_path:
                prefix = "../"
            else:
                prefix = "./"
                
            # Perform replacements
            replacements = [
                ('src="/', f'src="{prefix}'),
                ('href="/', f'href="{prefix}'),
                ('data-include="/', f'data-include="{prefix}'),
                ('action="/', f'action="{prefix}'),
                ("src='/", f"src='{prefix}"),
                ("href='/", f"href='{prefix}"),
            ]
            
            for old, new in replacements:
                new_content = new_content.replace(old, new)
                
            if new_content != content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated paths in {rel_path} with {prefix}")

if __name__ == "__main__":
    fix_absolute_paths()
