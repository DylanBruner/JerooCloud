import sys
from metapensiero.pj.__main__ import transform_string, transform

input_file  = sys.argv[1]

# Read the input file
with open(input_file, "r") as f:
    lines = f.readlines()

# Remove any imports
lines = [line for line in lines if not line.startswith("import") and not line.startswith("from")]

code = "\n".join(lines)
code = transform_string(code)

code += "\n}"
#Reverse the code
code = code[::-1]; code += "\n{\n"; code = code[::-1]
code = code.replace("var jeroo;","")

# loop through all lines and check for new Jeroo
lines = code.split("\n")
for i in range(len(lines)):
    if "Jeroo(" in lines[i]:
        variable_name = lines[i].split(" = ")[0]
        arguments = lines[i].split("Jeroo(")[1].split(")")[0]
        lines[i] = f"Jeroo {variable_name} = new Jeroo({arguments});"

code = "\n".join(lines)

code = f"method main(){code}"

print(code)