import os
import re

directory = r"c:\Users\pawan\SNPSU\Projects\Spark Studio\assets\images\marquee"

for filename in os.listdir(directory):
    if filename.endswith(".png"):
        # Match '  (1).png'
        match1 = re.match(r'^\s+\((\d+)\)\.png$', filename)
        if match1:
            num = match1.group(1)
            new_name = f"client-logo-{num}.png"
            os.rename(os.path.join(directory, filename), os.path.join(directory, new_name))
            continue
        
        # Match 'Temp (1).png'
        match2 = re.match(r'^Temp\s+\((\d+)\)\.png$', filename)
        if match2:
            num = match2.group(1)
            new_name = f"temp-logo-{num}.png"
            os.rename(os.path.join(directory, filename), os.path.join(directory, new_name))

print("Renaming complete.")
