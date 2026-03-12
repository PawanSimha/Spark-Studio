import os
import re
import urllib.parse

def get_actual_case_path(path):
    path = os.path.normpath(path)
    if not os.path.exists(path):
        return None
    
    parts = path.split(os.sep)
    # Drive letter
    actual_path = parts[0].upper() + os.sep if parts[0].endswith(':') else parts[0]
    
    for part in parts[1:]:
        if not part:
            continue
        try:
            children = os.listdir(actual_path)
            match = next((c for c in children if c.lower() == part.lower()), None)
            if match:
                actual_path = os.path.join(actual_path, match)
            else:
                return None
        except Exception:
            return None
            
    return actual_path

def check_case_sensitivity():
    project_dir = r"c:\Users\pawan\SNPSU\Projects\Spark Studio"
    
    link_pattern = re.compile(r'(?:href|src|poster|data-include)="([^"]+)"')
    
    mismatches = []
    
    for root, _, files in os.walk(project_dir):
        if '.git' in root or '.gemini' in root:
            continue
            
        for file in files:
            if file.endswith(('.html', '.js', '.css')):
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                except UnicodeDecodeError:
                    continue
                    
                matches = link_pattern.findall(content)
                for match in matches:
                    if match.startswith(('http://', 'https://', 'mailto:', 'tel:', '#', 'data:', '{{ROOT}}')):
                        continue
                    
                    if not match:
                        continue
                        
                    unquoted_match = urllib.parse.unquote(match)
                    
                    if unquoted_match.startswith('/'):
                        target_path = os.path.join(project_dir, unquoted_match.lstrip('/'))
                    else:
                        target_path = os.path.normpath(os.path.join(root, unquoted_match))
                        
                    if os.path.exists(target_path):
                        actual_path_on_disk = get_actual_case_path(target_path)
                        
                        # Compare the relevant parts without drive letters
                        if actual_path_on_disk:
                            rel_target = os.path.relpath(target_path, project_dir)
                            rel_actual = os.path.relpath(actual_path_on_disk, project_dir)
                            
                            if rel_target != rel_actual:
                                rel_file_path = os.path.relpath(file_path, project_dir)
                                mismatches.append({
                                    'file': rel_file_path,
                                    'original_link': match,
                                    'target_path': target_path,
                                    'actual_path': actual_path_on_disk,
                                    'rel_actual': rel_actual
                                })

    if not mismatches:
        print("No case sensitivity issues found!")
    else:
        print(f"Found {len(mismatches)} case sensitivity issues:")
        for m in mismatches:
            src_dir = os.path.dirname(os.path.join(project_dir, m['file']))
            
            # The actual path on disk
            actual = m['actual_path']
            # Reconstruct the correct relative link from src_dir to actual
            correct_relative_link = os.path.relpath(actual, src_dir).replace('\\', '/')
            
            if m['original_link'].startswith('./'):
                correct_relative_link = './' + correct_relative_link
                
            print(f"File: {m['file']}")
            print(f"  Link:    {m['original_link']}")
            print(f"  Should be: {correct_relative_link}")
            print("-" * 40)

if __name__ == "__main__":
    check_case_sensitivity()
