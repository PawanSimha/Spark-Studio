import os
import re

def validate_links():
    project_dir = r"c:\Users\pawan\SNPSU\Projects\Spark Studio"
    
    # Regex for finding href and src
    link_pattern = re.compile(r'(?:href|src|poster)="([^"]+)"')
    
    broken_links = []
    
    for root, _, files in os.walk(project_dir):
        for file in files:
            if file.endswith(('.html', '.js', '.css')):
                file_path = os.path.join(root, file)
                with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                    
                matches = link_pattern.findall(content)
                for match in matches:
                    # Ignore external links, mailto, tel, hashes
                    if match.startswith(('http://', 'https://', 'mailto:', 'tel:', '#', 'data:')):
                        continue
                    
                    # Ignore empty
                    if not match:
                        continue
                        
                    # Calculate absolute path
                    if match.startswith('/'):
                        # Absolute path from root
                        target_path = os.path.join(project_dir, match.lstrip('/'))
                    else:
                        # Relative path
                        target_path = os.path.join(root, match)
                        
                    # Normalize path
                    target_path = os.path.normpath(target_path)
                    
                    if not os.path.exists(target_path):
                        # Some links have url-encoded spaces, try unquoting
                        import urllib.parse
                        unquoted = urllib.parse.unquote(target_path)
                        if not os.path.exists(unquoted):
                            broken_links.append((file_path.replace(project_dir, ''), match))
                            
    if not broken_links:
        print("No broken links found!")
    else:
        print("Broken links found:")
        # Filter duplicates
        unique_broken = set(broken_links)
        for source, target in sorted(unique_broken):
            print(f"File: {source} -> Broken Link: {target}")

if __name__ == "__main__":
    validate_links()
